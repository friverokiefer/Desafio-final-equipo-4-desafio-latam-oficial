// frontend/src/pages/LoginPage.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // Obtenemos la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiamos errores anteriores
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      // Si se recibe un token, lo pasamos a la función de login
      if (response.data.token) {
        console.log('Token recibido:', response.data.token);
        await login(response.data.token); // Llamamos a la función de login
        // No es necesario navegar aquí, ya que la función login lo hace
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
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
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
