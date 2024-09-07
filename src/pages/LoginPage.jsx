// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Inicio de sesión exitoso");
      navigate("/profile");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Correo o contraseña incorrectos. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Dirección de correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
