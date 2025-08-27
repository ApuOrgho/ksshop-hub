import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, qty = 1) => {
    setCart((prev) => {
      // If same product+size exists, increase qty
      const idx = prev.findIndex(
        (item) => item.id === product.id && item.size === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += qty;
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images ? product.images[0] : product.image,
          size,
          qty,
        },
      ];
    });
  };

  const updateQty = (id, size, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  // count = number of unique items in cart
  const count = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
} 