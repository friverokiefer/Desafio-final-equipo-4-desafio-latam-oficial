// frontend/src/components/InstrumentCard.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function InstrumentCard({ instrument }) {
  const { addToCart } = useContext(CartContext);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const imageUrl = `${backendUrl}${instrument.image_url}`;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({ ...instrument, quantity: 1 });
    alert(`1 unidad de ${instrument.name} añadida al carrito`);
  };

  return (
    <div className="card mb-4">
      <Link to={`/product/${instrument.id}`}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={instrument.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{instrument.name}</h5>
        <p className="card-text">{formatPrice(instrument.price)}</p>
        <p className="card-text">Stock: {instrument.stock}</p>
        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
          disabled={instrument.stock === 0}
        >
          {instrument.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}

export default InstrumentCard;
