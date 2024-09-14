// frontend/src/pages/CartPage.jsx

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    }
  };

  const handleIncreaseQuantity = (item) => {
    addToCart(item, 1);
  };

  const handleCheckout = async () => {
    try {
      const totalAmount = calculateTotal();

      await axios.post('http://localhost:5000/api/compras', {
        cart,
        totalAmount,
      });

      alert('Compra exitosa. Se ha registrado en el historial.');
      clearCart();
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      alert('Hubo un problema al registrar la compra.');
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                  />
                </Link>
                <div className="flex-grow-1">
                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                    <h5>{item.name}</h5>
                  </Link>
                  <p>Precio: {formatPrice(item.price)}</p>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 me-2">Cantidad: {item.quantity}</p>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(index)} className="btn btn-danger ms-3">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: {formatPrice(calculateTotal())}</h3>
          <button onClick={handleCheckout} className="btn btn-primary">
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
