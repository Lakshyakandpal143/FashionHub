import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export const cartKey = (i) => `${i.productId}|${i.size}|${i.color}`;

const readStoredCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem('fh_cart') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('fh_cart', JSON.stringify(items));
  }, [items]);

  // item: { productId, name, image, price, size, color, quantity, stock }
  const addItem = (item) => {
    setItems((prev) => {
      const key = cartKey(item);
      const existing = prev.find((i) => cartKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          cartKey(i) === key ? { ...i, quantity: Math.min(i.quantity + item.quantity, item.stock || 99), stock: item.stock } : i
        );
      }
      return [...prev, { ...item, quantity: Math.min(item.quantity, item.stock || 99) }];
    });
  };

  const updateQuantity = (key, quantity) =>
    setItems((prev) =>
      prev.map((i) => (cartKey(i) === key ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock || 99)) } : i))
    );

  const removeItem = (key) => setItems((prev) => prev.filter((i) => cartKey(i) !== key));
  const clearCart = () => setItems([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.price * i.quantity, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, addItem, updateQuantity, removeItem, clearCart, cartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}
