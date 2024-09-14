import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "./AuthContext";
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...item, quantity }];
      setCart(updatedCart);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const completePurchase = async () => {
    if (isAuthenticated) {
      try {
        const purchases = cart.map(item => ({
          userId: user.id,
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
        }));

        await axios.post("/api/compras", { purchases });
        clearCart();
      } catch (error) {
        console.error("Error al registrar la compra:", error);
      }
    } else {
      clearCart();
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, completePurchase }}>
      {children}
    </CartContext.Provider>
  );
};
