import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const img = (slug, n = 2) =>
  Array.from({ length: n }, (_, i) => ({
    url: `https://picsum.photos/seed/${slug}-${i + 1}/600/800`,
    altText: `${slug.replace(/-/g, ' ')} ${i + 1}`,
  }));

const TOP = ['S', 'M', 'L', 'XL'];
const BOTTOM = ['28', '30', '32', '34', '36'];

const products = [
  { name: 'Denim Jacket', price: 2499, originalPrice: 2999, category: 'Top Wear', gender: 'Men', brand: 'UrbanThread', material: 'Denim', sizes: TOP, colors: ['Blue', 'Black'], countInStock: 25, sold: 40, rating: 4.5 },
  { name: 'Casual Hoodie', price: 1799, originalPrice: 2199, category: 'Top Wear', gender: 'Men', brand: 'UrbanThread', material: 'Cotton', sizes: TOP, colors: ['Gray', 'Black', 'Navy'], countInStock: 40, sold: 65, rating: 4.4 },
  { name: 'Bomber Jacket', price: 3299, originalPrice: 3999, category: 'Top Wear', gender: 'Men', brand: 'FashionBrand', material: 'Leather', sizes: TOP, colors: ['Red', 'Black'], countInStock: 15, sold: 95, rating: 4.7 },
  { name: 'Classic White Shirt', price: 1299, category: 'Top Wear', gender: 'Men', brand: 'Formalia', material: 'Cotton', sizes: TOP, colors: ['White', 'Blue'], countInStock: 50, sold: 30, rating: 4.2 },
  { name: 'Graphic T-Shirt', price: 799, originalPrice: 999, category: 'Top Wear', gender: 'Men', brand: 'StreetKit', material: 'Cotton', sizes: TOP, colors: ['Black', 'White', 'Red'], countInStock: 80, sold: 120, rating: 4.1 },
  { name: 'Wool Overcoat', price: 5499, originalPrice: 6499, category: 'Top Wear', gender: 'Men', brand: 'Formalia', material: 'Wool', sizes: TOP, colors: ['Gray', 'Navy'], countInStock: 10, sold: 12, rating: 4.6 },
  { name: 'Slim Fit Jeans', price: 1999, originalPrice: 2499, category: 'Bottom Wear', gender: 'Men', brand: 'UrbanThread', material: 'Denim', sizes: BOTTOM, colors: ['Blue', 'Black'], countInStock: 45, sold: 70, rating: 4.3 },
  { name: 'Chino Trousers', price: 1599, category: 'Bottom Wear', gender: 'Men', brand: 'Formalia', material: 'Cotton', sizes: BOTTOM, colors: ['Beige', 'Navy', 'Green'], countInStock: 35, sold: 25, rating: 4.0 },
  { name: 'Floral Summer Dress', price: 2299, originalPrice: 2799, category: 'Top Wear', gender: 'Women', brand: 'Bloom', material: 'Rayon', sizes: ['XS', ...TOP], colors: ['Pink', 'Yellow'], countInStock: 30, sold: 85, rating: 4.6 },
  { name: 'Trench Coat', price: 4299, originalPrice: 4999, category: 'Top Wear', gender: 'Women', brand: 'Bloom', material: 'Polyester', sizes: ['XS', ...TOP], colors: ['Beige', 'Black'], countInStock: 12, sold: 18, rating: 4.5 },
  { name: 'Knit Cardigan', price: 1899, category: 'Top Wear', gender: 'Women', brand: 'Bloom', material: 'Wool', sizes: ['XS', ...TOP], colors: ['Gray', 'Pink', 'White'], countInStock: 28, sold: 33, rating: 4.3 },
  { name: 'Oversized Fleece Pullover', price: 1699, originalPrice: 1999, category: 'Top Wear', gender: 'Women', brand: 'StreetKit', material: 'Fleece', sizes: ['XS', ...TOP], colors: ['Purple', 'Gray'], countInStock: 38, sold: 52, rating: 4.4 },
  { name: 'High-Waist Jeans', price: 2099, originalPrice: 2599, category: 'Bottom Wear', gender: 'Women', brand: 'Bloom', material: 'Denim', sizes: BOTTOM, colors: ['Blue', 'Black'], countInStock: 42, sold: 60, rating: 4.5 },
  { name: 'Pleated Midi Skirt', price: 1499, category: 'Bottom Wear', gender: 'Women', brand: 'Bloom', material: 'Polyester', sizes: ['XS', ...TOP], colors: ['Black', 'Green'], countInStock: 22, sold: 20, rating: 4.1 },
  { name: 'Jogger Pants', price: 1199, category: 'Bottom Wear', gender: 'Unisex', brand: 'StreetKit', material: 'Cotton', sizes: TOP, colors: ['Black', 'Gray', 'Navy'], countInStock: 60, sold: 90, rating: 4.2 },
  { name: 'Puffer Jacket', price: 3799, originalPrice: 4599, category: 'Top Wear', gender: 'Unisex', brand: 'UrbanThread', material: 'Polyester', sizes: TOP, colors: ['Black', 'Red', 'Blue'], countInStock: 18, sold: 45, rating: 4.6 },
].map((p, i) => ({
  ...p,
  description: `${p.name} from ${p.brand}. Made from ${p.material.toLowerCase()} for all-day comfort and a clean, modern fit that works for any occasion.`,
  sku: `FH-${String(i + 1).padStart(3, '0')}`,
  images: img(p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
}));

const run = async () => {
  await connectDB();

  await Promise.all([Product.deleteMany(), Order.deleteMany()]);
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  const email = (process.env.ADMIN_EMAIL || 'admin@fashionhub.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';
  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'admin';
    await existing.save();
    console.log(`Existing user ${email} promoted to admin`);
  } else {
    await User.create({ name: 'Admin', email, password, role: 'admin' });
    console.log(`Admin created: ${email} / ${password}`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
