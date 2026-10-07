import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

const router = express.Router();
router.use(protect, admin);

// GET /api/admin/stats
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const [users, products, orders, revenueAgg, recentOrders] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name'),
    ]);
    res.json({ users, products, orders, revenue: revenueAgg[0]?.total || 0, recentOrders });
  })
);

// ---- Products (includes unpublished) ----
router.get(
  '/products',
  asyncHandler(async (req, res) => {
    res.json(await Product.find().sort({ createdAt: -1 }));
  })
);

// ---- Orders ----
router.get(
  '/orders',
  asyncHandler(async (req, res) => {
    res.json(await Order.find().sort({ createdAt: -1 }).populate('user', 'name email'));
  })
);

router.put(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'A cancelled order cannot be changed' });
    }

    if (status === 'Cancelled') {
      // put the stock back
      await Promise.all(
        order.orderItems.map((i) =>
          Product.updateOne({ _id: i.productId }, { $inc: { countInStock: i.quantity, sold: -i.quantity } })
        )
      );
    }
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
      if (!order.isPaid) {
        order.isPaid = true; // cash collected on delivery
        order.paidAt = new Date();
      }
    }
    order.status = status;
    await order.save();
    res.json(order);
  })
);

router.delete(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.deleteOne();
    res.json({ message: 'Order removed' });
  })
);

// ---- Users ----
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    res.json(await User.find().select('-password').sort({ createdAt: -1 }));
  })
);

router.put(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { role } = req.body;
    if (!['customer', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    res.json(user);
  })
);

router.delete(
  '/users/:id',
  asyncHandler(async (req, res) => {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.deleteOne();
    res.json({ message: 'User removed' });
  })
);

export default router;
