import express from 'express';
import User from '../models/User.js';
import { protect, signToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

const router = express.Router();

const userPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// POST /api/users/register
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    // role is never taken from the request body
    const user = await User.create({ name, email, password });
    res.status(201).json({ user: userPayload(user), token: signToken(user._id) });
  })
);

// POST /api/users/login
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ user: userPayload(user), token: signToken(user._id) });
  })
);

// GET /api/users/profile
router.get('/profile', protect, (req, res) => {
  res.json(userPayload(req.user));
});

export default router;
