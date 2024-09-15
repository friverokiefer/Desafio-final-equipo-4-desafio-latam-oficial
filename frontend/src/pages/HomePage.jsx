// frontend/src/pages/HomePage.jsx

import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import * as bootstrap from 'bootstrap'; // Importamos bootstrap para usarlo en el componente

function HomePage() {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const instrumentsPerPage = 6;

  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Referencia para el Toast
  const toastRef = useRef(null);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/instruments`);
        setInstruments(response.data);
        setFilteredInstruments(response.data);
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error);
        setError('Hubo un problema al cargar los instrumentos.');
      }
    };

    fetchInstruments();
  }, [backendUrl]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (category) {
      setSelectedCategory(category);
    } else if (location.pathname === '/') {
      setSelectedCategory('All');
    }
  }, [location]);

  useEffect(() => {
    let filtered = instruments;

    if (selectedCategory !== 'All') {
      filtered = instruments.filter(
        (instrument) => instrument.category === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredInstruments([...filtered]);
    setCurrentPage(1); // Reiniciar a la primera página cuando cambie el filtro o el orden
  }, [selectedCategory, sortOrder, instruments]);

  const indexOfLastInstrument = currentPage * instrumentsPerPage;
  const indexOfFirstInstrument = indexOfLastInstrument - instrumentsPerPage;
  const currentInstruments = filteredInstruments.slice(
    indexOfFirstInstrument,
    indexOfLastInstrument
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const showToast = () => {
    const toast = new bootstrap.Toast(toastRef.current);
    toast.show();
  };

  const handleAddToCart = (instrument) => {
    const success = addToCart(instrument, 1);
    if (success) {
      setSuccessMessage(`${instrument.name} añadido al carrito`);
      setError('');
      showToast();
    } else {
      setError('No hay suficiente stock disponible.');
      setSuccessMessage('');
      showToast();
    }
  };

  const handleBuyNow = (instrument) => {
    const success = addToCart(instrument, 1);
    if (success) {
      navigate('/cart');
    } else {
      setError('No hay suficiente stock disponible.');
      setSuccessMessage('');
      showToast();
    }
  };

  const goToHome = () => {
    navigate('/');
    setSelectedCategory('All');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mt-4 position-relative">
      <h1>
        <span onClick={goToHome} style={{ cursor: 'pointer' }}>
          Music Store
        </span>
      </h1>
      <p>Explora nuestra colección de instrumentos musicales por categorías.</p>

      {/* Toast de Bootstrap */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={toastRef}
        >
          <div
            className={`toast-header ${error ? 'bg-danger' : 'bg-success'} text-white`}
          >
            <strong className="me-auto">Notificación</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            {successMessage || error}
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="categorySelect" className="form-label">
            Filtrar por Categoría:
          </label>
          <select
            id="categorySelect"
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">Todas las Categorías</option>
            <option value="Guitarras Eléctricas">Guitarras Eléctricas</option>
            <option value="Guitarras Clásicas">Guitarras Clásicas</option>
            <option value="Guitarras & Bajos">Guitarras & Bajos</option>
            <option value="Bajos">Bajos</option>
            <option value="Pianos & Teclados">Pianos & Teclados</option>
            <option value="Baterías / Percusión">Baterías / Percusión</option>
            <option value="Vientos">Vientos</option>
            <option value="Accesorios">Accesorios</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="sortOrderSelect" className="form-label">
            Ordenar por Precio:
          </label>
          <select
            id="sortOrderSelect"
            className="form-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <h2>Nuestros Instrumentos</h2>
      <div className="row">
        {currentInstruments.map((instrument) => (
          <div key={instrument.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <Link
                to={`/product/${instrument.id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={`${backendUrl}${instrument.image_url}`}
                  alt={instrument.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{instrument.name}</h5>
                <p className="card-text">
                  <strong>Precio:</strong> {formatPrice(instrument.price)}
                </p>
                <p className="card-text">
                  <strong>Categoría:</strong>{' '}
                  <Link
                    to={`/?category=${encodeURIComponent(instrument.category)}`}
                    className="text-decoration-none text-primary"
                  >
                    {instrument.category}
                  </Link>
                </p>
                <p className="card-text text-dark">
                  <strong>Descripción:</strong> {instrument.description}
                </p>
                <div className="mt-auto">
                  <p className="card-text">
                    <strong>Stock:</strong> {instrument.stock}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary me-2 w-50"
                      onClick={() => handleAddToCart(instrument)}
                      disabled={instrument.stock === 0}
                    >
                      {instrument.stock === 0 ? 'Sin Stock' : 'Agregar a Carrito'}
                    </button>
                    <button
                      className="btn btn-success w-50"
                      onClick={() => handleBuyNow(instrument)}
                      disabled={instrument.stock === 0}
                    >
                      Comprar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        instrumentsPerPage={instrumentsPerPage}
        totalInstruments={filteredInstruments.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default HomePage;
