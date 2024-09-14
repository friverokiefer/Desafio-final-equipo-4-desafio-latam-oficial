import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [instrument, setInstrument] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstrument = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/instruments/${id}`);
        if (response.status === 200) {
          setInstrument(response.data);
        }
      } catch (error) {
        console.error('Error al cargar el instrumento:', error);
        setError('Hubo un problema al cargar el instrumento.');
      }
    };

    fetchInstrument();
  }, [id, backendUrl]);

  const handleAddToCart = () => {
    if (quantity > instrument.stock) {
      alert('No hay suficiente stock disponible.');
      return;
    }
    addToCart({ ...instrument, quantity: parseInt(quantity) });
    alert(`${quantity} unidad(es) de ${instrument.name} añadida(s) al carrito`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!instrument) {
    return <p>Cargando...</p>;
  }

  const imageUrl = `${backendUrl}${instrument.image_url}`;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{instrument.name}</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={imageUrl}
            alt={instrument.name}
            className="img-fluid mb-3"
            style={{ maxWidth: '100%' }}
          />
        </div>
        <div className="col-md-8">
          <p className="mb-2" style={{ fontSize: '1.2rem' }}>
            <strong>Descripción:</strong> {instrument.description}
          </p>
          <p className="mb-2">
            <strong>Categoría:</strong>{' '}
            <Link
              to={`/?category=${encodeURIComponent(instrument.category)}`}
              className="text-decoration-none text-primary"
            >
              {instrument.category}
            </Link>
          </p>
          <p className="mb-2 text-end" style={{ fontSize: '1.5rem' }}>
            <strong>Precio:</strong> {formatPrice(instrument.price)}
          </p>
          <p className="mb-2">
            <strong>Stock:</strong> {instrument.stock}
          </p>
          <div className="d-flex align-items-center mb-3" style={{ maxWidth: '160px' }}>
            <label htmlFor="quantity" className="form-label me-2">
              Cantidad
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max={instrument.stock}
              style={{ maxWidth: '70px' }}
            />
          </div>
          <div className="d-flex">
            <button
              className="btn btn-primary me-2"
              onClick={handleAddToCart}
              disabled={instrument.stock === 0 || quantity > instrument.stock}
            >
              {instrument.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito'}
            </button>
            <button
              className="btn btn-success"
              onClick={handleBuyNow}
              disabled={instrument.stock === 0 || quantity > instrument.stock}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
    </div>
  );
}

export default ProductPage;
