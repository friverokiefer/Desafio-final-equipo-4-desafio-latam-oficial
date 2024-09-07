// src/pages/HomePage.jsx

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { CartContext } from "../context/CartContext"; // Importa el contexto del carrito

function HomePage() {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const instrumentsPerPage = 6;

  const { addToCart } = useContext(CartContext); // Usa la función addToCart desde el contexto
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/src/data/instruments.json")
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
        setFilteredInstruments(data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  // Detecta cambios en la URL y restablece la categoría cuando la ruta es "/"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setSelectedCategory(category);
    } else if (location.pathname === "/") {
      setSelectedCategory("All");
    }
  }, [location]);

  useEffect(() => {
    let filtered = instruments;

    // Aplica el filtro de categoría si no es "All"
    if (selectedCategory !== "All") {
      filtered = instruments.filter(
        (instrument) => instrument.category === selectedCategory
      );
    }

    // Ordena los instrumentos según el orden seleccionado
    if (sortOrder === "asc") {
      filtered.sort((a, b) =>
        parseFloat(a.price.replace(/[^\d.-]/g, "")) -
        parseFloat(b.price.replace(/[^\d.-]/g, ""))
      );
    } else {
      filtered.sort((a, b) =>
        parseFloat(b.price.replace(/[^\d.-]/g, "")) -
        parseFloat(a.price.replace(/[^\d.-]/g, ""))
      );
    }

    setFilteredInstruments(filtered);
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

  const handleAddToCart = (instrument) => {
    addToCart(instrument, 1); // Agrega el producto al carrito con cantidad 1
    alert(`${instrument.name} añadido al carrito`);
  };

  const handleBuyNow = (instrument) => {
    handleAddToCart(instrument); // Añade al carrito
    window.location.href = "/cart"; // Redirige al usuario a la página del carrito
  };

  // Función para ir a Inicio y resetear filtros
  const goToHome = () => {
    navigate("/");
    setSelectedCategory("All");
  };

  return (
    <div>
      <h1>
        <span onClick={goToHome} style={{ cursor: "pointer" }}>
          Music Store
        </span>
      </h1>
      <p>Explora nuestra colección de instrumentos musicales por categorías.</p>

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
                  src={instrument.imageUrl}
                  alt={instrument.name}
                  className="card-img-top"
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{instrument.name}</h5>
                <p className="card-text">
                  <strong>Precio:</strong> {instrument.price}
                </p>
                <p className="card-text">
                  <strong>Categoría:</strong> {instrument.category}
                </p>
                <p className="card-text text-dark">
                  <strong>Descripción:</strong> {instrument.description}
                </p>
                <div className="d-flex justify-content-between mt-auto">
                  <button
                    className="btn btn-primary me-2 w-50"
                    onClick={() => handleAddToCart(instrument)}
                  >
                    Agregar a Carrito
                  </button>
                  <button
                    className="btn btn-success w-50"
                    onClick={() => handleBuyNow(instrument)}
                  >
                    Comprar Ahora
                  </button>
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
      />
    </div>
  );
}

export default HomePage;

