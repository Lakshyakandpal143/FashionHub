// Keep in sync with backend/routes/orders.js
export const FREE_SHIPPING_ABOVE = 1999;
export const SHIPPING_FEE = 99;

export const formatPrice = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export const shippingFor = (subtotal) => (subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE);
