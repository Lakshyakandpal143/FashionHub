import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

const router = express.Router();

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const list = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);

const EDITABLE = [
  'name', 'description', 'price', 'originalPrice', 'countInStock', 'sku', 'category',
  'gender', 'brand', 'material', 'sizes', 'colors', 'images', 'isPublished',
];
const pickEditable = (body) =>
  EDITABLE.reduce((acc, key) => (body[key] !== undefined ? { ...acc, [key]: body[key] } : acc), {});

// GET /api/products?gender=&category=&size=&color=&minPrice=&maxPrice=&search=&sortBy=&limit=
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { gender, category, size, color, brand, material, minPrice, maxPrice, search, sortBy } = req.query;
    const query = { isPublished: true };

    if (gender && gender !== 'all') query.gender = { $in: [gender, 'Unisex'] };
    if (category && category !== 'all') query.category = category;
    if (list(size).length) query.sizes = { $in: list(size) };
    if (list(color).length) query.colors = { $in: list(color) };
    if (list(brand).length) query.brand = { $in: list(brand) };
    if (list(material).length) query.material = { $in: list(material) };

    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (minPrice !== undefined && !Number.isNaN(min)) query.price = { ...query.price, $gte: min };
    if (maxPrice !== undefined && !Number.isNaN(max)) query.price = { ...query.price, $lte: max };

    if (search?.trim()) {
      const rx = new RegExp(escapeRegex(search.trim()), 'i');
      query.$or = [{ name: rx }, { description: rx }, { brand: rx }];
    }

    const sorts = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      popularity: { sold: -1, rating: -1 },
    };
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 60, 1), 100);

    const products = await Product.find(query).sort(sorts[sortBy] || { createdAt: -1 }).limit(limit);
    res.json(products);
  })
);

// GET /api/products/best-seller
router.get(
  '/best-seller',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ isPublished: true }).sort({ sold: -1, rating: -1 });
    if (!product) return res.status(404).json({ message: 'No products found' });
    res.json(product);
  })
);

// GET /api/products/new-arrivals
router.get(
  '/new-arrivals',
  asyncHandler(async (req, res) => {
    res.json(await Product.find({ isPublished: true }).sort({ createdAt: -1 }).limit(8));
  })
);

// GET /api/products/similar/:id
router.get(
  '/similar/:id',
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Product not found' });
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const similar = await Product.find({
      _id: { $ne: product._id },
      isPublished: true,
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similar);
  })
);

// GET /api/products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: 'Product not found' });
    const product = await Product.findById(req.params.id);
    if (!product || !product.isPublished) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  })
);

// ---- Admin-only ----
router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.create(pickEditable(req.body));
    res.status(201).json(product);
  })
);

router.put(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.set(pickEditable(req.body));
    await product.save();
    res.json(product);
  })
);

router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  })
);

export default router;
