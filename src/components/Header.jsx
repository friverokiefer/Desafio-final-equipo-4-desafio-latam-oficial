// src/components/Header.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Importa el contexto del carrito
import { FaShoppingCart } from "react-icons/fa"; // Importa el icono del carrito

function Header() {
  const { cart } = useContext(CartContext); // Obtén el contexto del carrito para mostrar la cantidad de elementos

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand me-auto" to="/">
          Music Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/cart">
                Carrito <span className="ms-1">({cart.length})</span> <FaShoppingCart className="ms-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

