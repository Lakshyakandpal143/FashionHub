import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "sonner";
import UserLayout from './components/layout/UserLayout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import ScrollToTop from './components/common/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import OrderDetailsPage from './pages/OrderDetailsPage'
import AdminHomePage from './pages/admin/AdminHomePage'
import ProductManagement from './pages/admin/ProductManagement'
import EditProduct from './pages/admin/EditProduct'
import OrderManagement from './pages/admin/OrderManagement'
import UserManagement from './pages/admin/UserManagement'

const NotFound = () => (
  <div className='py-20 text-center'>
    <h2 className='text-3xl font-bold mb-2'>404</h2>
    <p className='text-gray-500'>This page does not exist.</p>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='collections/:collection' element={<CollectionPage />} />
              <Route path='product/:id' element={<ProductPage />} />
              <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path='order-confirmation/:id' element={<ProtectedRoute><OrderDetailsPage confirmation /></ProtectedRoute>} />
              <Route path='order/:id' element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
              <Route path='*' element={<NotFound />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminHomePage />} />
              <Route path='products' element={<ProductManagement />} />
              <Route path='products/new' element={<EditProduct />} />
              <Route path='products/:id/edit' element={<EditProduct />} />
              <Route path='orders' element={<OrderManagement />} />
              <Route path='users' element={<UserManagement />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
