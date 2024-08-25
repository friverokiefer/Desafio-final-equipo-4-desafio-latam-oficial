import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function HomePage() {
  const [instruments, setInstruments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const instrumentsPerPage = 6;

  useEffect(() => {
    // Aseguramos la ruta relativa para el fetch
    fetch("/src/data/instruments.json")
      .then((response) => response.json())
      .then((data) => setInstruments(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  // Obtener los instrumentos para la página actual
  const indexOfLastInstrument = currentPage * instrumentsPerPage;
  const indexOfFirstInstrument = indexOfLastInstrument - instrumentsPerPage;
  const currentInstruments = instruments.slice(
    indexOfFirstInstrument,
    indexOfLastInstrument
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Bienvenido a la Tienda de Música</h1>
      <p>Explora nuestra colección de instrumentos musicales por categorías.</p>

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
        totalInstruments={instruments.length}
        paginate={paginate}
      />
    </div>
  );
}

export default HomePage;
