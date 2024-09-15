// frontend/src/pages/CartPage.jsx

import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, addToCart, clearCart, calculateTotal } = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleDecreaseQuantity = (item) => {
    addToCart(item, -1);
  };

  const handleIncreaseQuantity = (item) => {
    if (item.quantity < item.stock) {
      addToCart(item, 1);
    } else {
      setErrorMessage('No hay más stock disponible de este producto.');
    }
  };

  const handleCheckout = async () => {
    try {
      const totalAmount = calculateTotal();

      await axios.post(`${backendUrl}/api/compras`, {
        cart,
        totalAmount,
      }, { withCredentials: true });

      clearCart();
      navigate('/purchase-history');
      setSuccessMessage('Compra exitosa. Se ha registrado en el historial.');
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      setErrorMessage('Hubo un problema al registrar la compra.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Carrito de Compras</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={`${backendUrl}${item.image_url}`}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
                  />
                </Link>
                <div className="flex-grow-1 ms-3">
                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                    <h5>{item.name}</h5>
                  </Link>
                  <p>Precio: {formatPrice(item.price)}</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    <p className="mb-0 me-2">Cantidad: {item.quantity}</p>
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
