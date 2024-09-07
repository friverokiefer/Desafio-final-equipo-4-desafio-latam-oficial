// src/pages/CartPage.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Importa Link para los enlaces
import { CartContext } from "../context/CartContext"; // Importa el contexto

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext); // Usa el contexto

  // Función para calcular el total y formatearlo como el resto de los precios
  const calculateTotal = () => {
    const total = cart.reduce(
      (total, item) =>
        total +
        parseFloat(
          item.price
            .replace(/[^\d,]/g, "") // Remueve símbolos excepto dígitos y comas
            .replace(",", ".") // Reemplaza la coma por un punto para manejar correctamente la separación de miles
        ) * item.quantity,
      0
    );

    // Formatea el total con separadores de miles y sin decimales
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(total);
  };

  const handleDecreaseQuantity = (index) => {
    if (cart[index].quantity > 1) {
      updateQuantity(index, cart[index].quantity - 1);
    }
  };

  const handleIncreaseQuantity = (index) => {
    updateQuantity(index, cart[index].quantity + 1);
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                </Link>
                <div className="flex-grow-1">
                  <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                    <h5>{item.name}</h5>
                  </Link>
                  <p>Precio: {item.price}</p>
                  <div className="d-flex align-items-center">
                    <p className="mb-0 me-2">Cantidad: {item.quantity}</p>
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => handleDecreaseQuantity(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleIncreaseQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="btn btn-danger ms-3"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: {calculateTotal()}</h3>
          <button className="btn btn-primary">Proceder al Pago</button>
        </div>
      )}
      <hr className="mt-4 mb-4" /> {/* Espacio entre el contenido y el footer */}
    </div>
  );
}

export default CartPage;
