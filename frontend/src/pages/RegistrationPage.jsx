// frontend/src/pages/RegistrationPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario
import '../App.css'; // Asegúrate de importar desde el directorio correcto

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // Para previsualizar la imagen
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Hook para redirigir

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await axios.post(`${backendUrl}/api/users/register`, {
        name,
        email,
        password,
        profile_image_url: profileImageUrl,
      });
      console.log('Usuario registrado:', response.data);
      setSuccessMessage('Usuario registrado con éxito'); // Mensaje de éxito

      // Redirigir al inicio de sesión después de 1.5 segundos
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error al registrar el usuario');
      }
    }
  };

  // Función para actualizar la previsualización de la imagen
  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setProfileImageUrl(imageUrl);
    setImagePreview(imageUrl);
  };

  return (
    <div className="registration-container mt-4">
      <h2>Registrarse</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            value={profileImageUrl}
            onChange={handleImageChange}
            placeholder="URL de la imagen de perfil"
          />
        </div>
        {/* Previsualización de la imagen */}
        {imagePreview && (
          <div className="image-preview-container mb-3">
            <img
              src={imagePreview}
              alt="Previsualización de la imagen"
              className="image-preview rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
        {/* Mostrar mensajes de éxito o error */}
        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;
