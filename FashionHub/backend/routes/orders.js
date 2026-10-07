import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

const router = express.Router();

export const FREE_SHIPPING_ABOVE = 1999;
export const SHIPPING_FEE = 99;

// POST /api/orders  — prices are always recalculated from the database
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }
    const required = ['fullName', 'phone', 'address', 'city', 'postalCode', 'country'];
    if (!shippingAddress || required.some((f) => !String(shippingAddress[f] || '').trim())) {
      return res.status(400).json({ message: 'Please fill in the complete shipping address' });
    }
    if (!['COD', 'Demo Online'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // 1. validate every line against the DB
    const lines = [];
    for (const item of orderItems) {
      const qty = parseInt(item.quantity, 10);
      if (!mongoose.isValidObjectId(item.productId) || !(qty >= 1)) {
        return res.status(400).json({ message: 'Invalid item in cart' });
      }
      const product = await Product.findById(item.productId);
      if (!product || !product.isPublished) {
        return res.status(400).json({ message: 'A product in your cart is no longer available' });
      }
      if (item.size && !product.sizes.includes(item.size)) {
        return res.status(400).json({ message: `Size ${item.size} is not available for ${product.name}` });
      }
      if (item.color && !product.colors.includes(item.color)) {
        return res.status(400).json({ message: `Color ${item.color} is not available for ${product.name}` });
      }
      lines.push({ product, qty, size: item.size, color: item.color });
    }

    // 2. reserve stock atomically per product (roll back if any line fails)
    const reserved = [];
    for (const l of lines) {
      const ok = await Product.findOneAndUpdate(
        { _id: l.product._id, countInStock: { $gte: l.qty } },
        { $inc: { countInStock: -l.qty, sold: l.qty } }
      );
      if (!ok) {
        await Promise.all(
          reserved.map((r) => Product.updateOne({ _id: r.product._id }, { $inc: { countInStock: r.qty, sold: -r.qty } }))
        );
        return res.status(400).json({ message: `Not enough stock for ${l.product.name}` });
      }
      reserved.push(l);
    }

    const items = lines.map((l) => ({
      productId: l.product._id,
      name: l.product.name,
      image: l.product.images?.[0]?.url,
      price: l.product.price,
      size: l.size,
      color: l.color,
      quantity: l.qty,
    }));
    const itemsPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shippingPrice = itemsPrice >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;

    // "Demo Online" simulates a successful payment. Replace with a real gateway (e.g. Razorpay) later.
    const paidNow = paymentMethod === 'Demo Online';

    try {
      const order = await Order.create({
        user: req.user._id,
        orderItems: items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice: itemsPrice + shippingPrice,
        isPaid: paidNow,
        paidAt: paidNow ? new Date() : undefined,
      });
      res.status(201).json(order);
    } catch (err) {
      await Promise.all(
        reserved.map((r) => Product.updateOne({ _id: r.product._id }, { $inc: { countInStock: r.qty, sold: -r.qty } }))
      );
      throw err;
    }
  })
);

// GET /api/orders/my-orders
router.get(
  '/my-orders',
  protect,
  asyncHandler(async (req, res) => {
    res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }));
  })
);

// GET /api/orders/:id (owner or admin)
router.get(
  '/:id',
  protect,
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Order not found' });
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const ownerId = order.user?._id?.toString();
    if (ownerId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to view this order' });
    }
    res.json(order);
  })
);

export default router;
