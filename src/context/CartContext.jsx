import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item, quantity) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...item, id: item.id, quantity }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const completePurchase = async () => {
    if (isAuthenticated) {
      try {
        const purchases = cart.map(item => ({
          userId: user.id,
          productId: item.id,
          productName: item.nombre,
          quantity: item.quantity,
        }));

        // Registrar compras en el backend
        await axios.post("/api/compras", { purchases });

        clearCart();  // Vacía el carrito
      } catch (error) {
        console.error("Error al registrar la compra:", error);
      }
    } else {
      clearCart();  // Vacía el carrito si no está autenticado
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, completePurchase }}>
      {children}
    </CartContext.Provider>
  );
};
