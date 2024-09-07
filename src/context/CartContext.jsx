// src/context/CartContext.js

import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto que maneja el estado global del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Añadir un producto al carrito
  // src/context/CartContext.js

const addToCart = (item, quantity) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  
    if (existingItemIndex !== -1) {
      // Si el producto ya existe, incrementa la cantidad
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Si el producto no existe, agrégalo al carrito con el id incluido
      const updatedCart = [...cart, { ...item, id: item.id, quantity }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  

  // Eliminar un producto del carrito
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Actualizar la cantidad de un producto específico
  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
