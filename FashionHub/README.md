# FashionHub – Full-Stack E-Commerce Platform

FashionHub is a full-stack MERN e-commerce app: browse and filter products, manage a cart, register/login, place orders, and manage the store from an admin panel.

## 🚀 Features

**Shop**
- Register / login with JWT authentication
- Home page with new arrivals, best seller and featured collections (live data)
- Collection page with filters (category, gender, size, color, material, brand, price), sorting and search
- Product page with size/colour/quantity selection, stock awareness and "You may also like"
- Cart drawer (persisted in localStorage) with quantity controls
- Checkout with shipping address and payment method (Cash on Delivery, or demo online payment)
- Order confirmation, order history and order details
- Responsive design

**Admin** (`/admin`, admin accounts only)
- Dashboard: revenue, orders, products, users, recent orders
- Product management: add / edit / delete / unpublish
- Order management: Processing → Shipped → Delivered / Cancelled (cancelling restores stock)
- User management: change role, delete

**Backend**
- REST API with Express + MongoDB (Mongoose)
- Passwords hashed with bcrypt, JWT auth, admin-only routes
- Order totals are always recalculated on the server from database prices
- Stock is reserved atomically when an order is placed

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4, React Router 7, Sonner
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

## 📁 Project Structure

```text
FashionHub/
├── backend/
│   ├── config/db.js
│   ├── middleware/        # auth (protect/admin), error handling
│   ├── models/            # User, Product, Order
│   ├── routes/            # users, products, orders, admin
│   ├── seed.js            # sample products + admin user
│   └── server.js
└── frontend/
    └── src/
        ├── api.js         # fetch wrapper
        ├── context/       # AuthContext, CartContext
        ├── hooks/         # useFetch
        ├── components/    # common, layout, products, cart, orders, admin
        └── pages/         # Home, CollectionPage, ProductPage, Checkout, ... + admin/
```

## ▶️ Running locally

You need Node 18+ and a MongoDB instance (local, or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI and JWT_SECRET
npm run seed              # creates sample products + the admin account
npm run dev               # http://localhost:5000
```

Default admin (change in `.env` before seeding): `admin@fashionhub.com` / `Admin@123`

> `npm run seed` **deletes all existing products and orders** before inserting sample data.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

In development Vite proxies `/api` to `http://localhost:5000`. For production set `VITE_API_URL` to your API's URL (and `CLIENT_URL` on the backend for CORS).

## 🔌 API overview

| Method | Route | Access |
| --- | --- | --- |
| POST | `/api/users/register`, `/api/users/login` | public |
| GET | `/api/users/profile` | user |
| GET | `/api/products` (filters: `gender, category, size, color, brand, material, minPrice, maxPrice, search, sortBy, limit`) | public |
| GET | `/api/products/best-seller`, `/new-arrivals`, `/similar/:id`, `/:id` | public |
| POST / PUT / DELETE | `/api/products`, `/api/products/:id` | admin |
| POST | `/api/orders` | user |
| GET | `/api/orders/my-orders`, `/api/orders/:id` | user (owner/admin) |
| GET | `/api/admin/stats`, `/products`, `/orders`, `/users` | admin |
| PUT / DELETE | `/api/admin/orders/:id`, `/api/admin/users/:id` | admin |

## 📝 Notes / ideas for later

- "Online payment" is a **demo** that marks the order paid. Plug in a real gateway (e.g. Razorpay) in `backend/routes/orders.js`.
- Product images are URLs. Add Cloudinary/multer if you want file uploads.
- Not implemented yet: reviews, wishlist, password reset, coupon codes.
