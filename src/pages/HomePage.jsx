import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function HomePage() {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const instrumentsPerPage = 6;

  useEffect(() => {
    fetch("/src/data/instruments.json")
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
        setFilteredInstruments(data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  useEffect(() => {
    let filtered = instruments;

    if (selectedCategory !== "All") {
      filtered = instruments.filter(
        (instrument) => instrument.category === selectedCategory
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) =>
        parseFloat(a.price.replace(/[^\d.-]/g, "")) >
        parseFloat(b.price.replace(/[^\d.-]/g, ""))
          ? 1
          : -1
      );
    } else {
      filtered.sort((a, b) =>
        parseFloat(a.price.replace(/[^\d.-]/g, "")) <
        parseFloat(b.price.replace(/[^\d.-]/g, ""))
          ? 1
          : -1
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

  return (
    <div>
      <h1>Bienvenido a la Tienda de Música</h1>
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
        {currentInstruments.map((instrument, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={`/product/${index}`}>
              <div className="card h-100">
                <img
                  src={instrument.imageUrl}
                  alt={instrument.name}
                  className="card-img-top"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{instrument.name}</h5>
                  <p className="card-text">
                    <strong>Precio:</strong> {instrument.price}
                  </p>
                  <p className="card-text">
                    <strong>Categoría:</strong> {instrument.category}
                  </p>
                  <p className="card-text">
                    <strong>Descripción:</strong> {instrument.description}
                  </p>
                </div>
              </div>
            </Link>
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
