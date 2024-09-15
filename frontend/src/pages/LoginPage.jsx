// frontend/src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password,
      });

      if (response.data.token) {
        await login(response.data.token);
        navigate('/profile'); // Navegamos aquí después de iniciar sesión
      } else {
        setErrorMessage('Error: No se recibió un token.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Correo o contraseña incorrectos. Inténtalo nuevamente.');
      } else {
        setErrorMessage('Error en el servidor. Inténtalo más tarde.');
      }
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu correo electrónico"
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
            placeholder="Ingresa tu contraseña"
          />
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
