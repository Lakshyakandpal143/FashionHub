import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import { notFound, errorHandler } from './middleware/error.js';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Copy .env.example to .env and fill it in.');
}

const app = express();

const origins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map((s) => s.trim()) : true;
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
