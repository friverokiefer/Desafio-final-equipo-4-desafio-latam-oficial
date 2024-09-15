// frontend/src/context/CartContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantityToAdd = 1) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    let updatedCart = [];

    if (existingItemIndex !== -1) {
      const existingItem = cart[existingItemIndex];
      const newQuantity = existingItem.quantity + quantityToAdd;

      if (newQuantity > item.stock) {
        // No hay suficiente stock disponible
        return false;
      }

      updatedCart = [...cart];
      updatedCart[existingItemIndex] = { ...existingItem, quantity: newQuantity };
    } else {
      if (quantityToAdd > item.stock) {
        // No hay suficiente stock disponible
        return false;
      }
      updatedCart = [...cart, { ...item, quantity: quantityToAdd }];
    }

    setCart(updatedCart);
    return true;
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const completePurchase = async () => {
    if (isAuthenticated) {
      try {
        const totalAmount = calculateTotal();
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

        await axios.post(
          `${backendUrl}/api/compras`,
          { cart, totalAmount },
          { withCredentials: true }
        );

        clearCart();
      } catch (error) {
        console.error('Error al registrar la compra:', error);
        throw new Error('Hubo un problema al registrar la compra.');
      }
    } else {
      clearCart();
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, completePurchase, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
