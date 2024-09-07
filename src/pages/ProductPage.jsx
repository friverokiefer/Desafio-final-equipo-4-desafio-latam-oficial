// src/pages/ProductPage.jsx

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Importa el contexto

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Usa la función addToCart del contexto
  const [instrument, setInstrument] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("/src/data/instruments.json")
      .then((response) => response.json())
      .then((data) => {
        // Busca el producto por su id
        const product = data.find((item) => item.id === parseInt(id));
        setInstrument(product);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(instrument, parseInt(quantity)); // Usa la función del contexto para añadir al carrito
    alert(`${quantity} unidad(es) de ${instrument.name} añadido(s) al carrito`);
  };

  if (!instrument) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{instrument.name}</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={instrument.imageUrl}
            alt={instrument.name}
            className="img-fluid mb-3"
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <p className="mb-2" style={{ fontSize: "1.2rem" }}>
            <strong>Descripción:</strong> {instrument.description}
          </p>
          <p className="mb-2">
            <strong>Categoría:</strong>{" "}
            <Link
              to={`/?category=${encodeURIComponent(instrument.category)}`}
              className="text-decoration-none text-primary"
            >
              {instrument.category}
            </Link>
          </p>
          <p className="mb-2 text-end" style={{ fontSize: "1.5rem" }}>
            <strong>Precio:</strong> {instrument.price}
          </p>
          <div className="d-flex align-items-center mb-3" style={{ maxWidth: "160px" }}>
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
              style={{ maxWidth: "70px" }}
            />
          </div>
          <button className="btn btn-primary mb-3" onClick={handleAddToCart}>
            Añadir al Carrito
          </button>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
    </div>
  );
}

export default ProductPage;
