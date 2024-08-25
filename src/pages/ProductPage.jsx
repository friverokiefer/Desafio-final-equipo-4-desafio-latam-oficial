import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [instrument, setInstrument] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("/src/data/instruments.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data[id];
        setInstrument(product);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, [id]);

  const handleAddToCart = () => {
    alert(`${quantity} unidad(es) de ${instrument.name} añadido(s) al carrito`);
    // Aquí puedes añadir lógica para manejar el carrito
  };

  if (!instrument) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{instrument.name}</h1>
      <img src={instrument.imageUrl} alt={instrument.name} className="img-fluid mb-3" />
      {instrument.price && (
        <p>
          <strong>Precio:</strong> {instrument.price}
        </p>
      )}
      {instrument.category && (
        <p>
          <strong>Categoría:</strong> {instrument.category}
        </p>
      )}
      {instrument.description && (
        <p>
          <strong>Descripción:</strong> {instrument.description}
        </p>
      )}
      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Cantidad
        </label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddToCart}>
        Añadir al Carrito
      </button>
    </div>
  );
}

export default ProductPage;
