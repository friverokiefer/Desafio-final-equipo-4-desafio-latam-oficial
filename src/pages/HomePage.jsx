import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    fetch("/src/data/instruments.json")
      .then((response) => response.json())
      .then((data) => setInstruments(data))
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  return (
    <div>
      <h1>Bienvenido a la Tienda de Música</h1>
      <p>Explora nuestra colección de instrumentos musicales.</p>

      <h2>Nuestros Instrumentos</h2>
      <div className="row">
        {instruments.map((instrument, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={`/product/${index}`}>
              <div className="card">
                <img
                  src={instrument.imageUrl}
                  alt={instrument.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{instrument.name}</h5>
                  {instrument.price && (
                    <p className="card-text">
                      <strong>Precio:</strong> {instrument.price}
                    </p>
                  )}
                  {instrument.category && (
                    <p className="card-text">
                      <strong>Categoría:</strong> {instrument.category}
                    </p>
                  )}
                  {instrument.description && (
                    <p className="card-text">
                      <strong>Descripción:</strong> {instrument.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
