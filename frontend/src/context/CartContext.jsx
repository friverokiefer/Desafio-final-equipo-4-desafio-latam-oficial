// frontend/src/context/CartContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
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

  // Corrección del método addToCart
  const addToCart = (item, quantityChange = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const updatedItem = { ...updatedCart[existingItemIndex] }; // Copia del item

        // Actualizar cantidad sin duplicar el cambio
        updatedItem.quantity += quantityChange;

        // Validación para evitar cantidades negativas o superiores al stock
        if (updatedItem.quantity <= 0) {
          updatedCart.splice(existingItemIndex, 1); // Eliminar si la cantidad es cero
        } else if (updatedItem.quantity <= item.stock) {
          updatedCart[existingItemIndex] = updatedItem; // Actualizar la cantidad
        } else {
          alert('No hay suficiente stock disponible.');
          return prevCart; // No hacer cambios si la cantidad es superior al stock
        }

        return updatedCart;
      } else {
        // Agregar nuevo producto si no está en el carrito
        if (quantityChange > 0 && quantityChange <= item.stock) {
          return [...prevCart, { ...item, quantity: quantityChange }];
        } else {
          alert('No hay suficiente stock disponible.');
          return prevCart;
        }
      }
    });
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
        const purchases = cart.map((item) => ({
          userId: user.id,
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
        }));

        await axios.post('/api/compras', { purchases });
        clearCart();
      } catch (error) {
        console.error('Error al registrar la compra:', error);
      }
    } else {
      clearCart();
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, completePurchase, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};
