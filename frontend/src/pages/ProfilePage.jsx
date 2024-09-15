// frontend/src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_image_url: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/users/profile`, { withCredentials: true });

        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          profile_image_url: response.data.profile_image_url || '',
        });
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        setError('Hubo un problema al cargar el perfil. Verifica tu conexión.');
      }
    };

    fetchProfile();
  }, [backendUrl]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${backendUrl}/api/users/profile`, formData, { withCredentials: true });
      setMessage('Perfil actualizado exitosamente.');
      setError('');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError('Hubo un problema al actualizar el perfil. Intenta de nuevo.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Tu Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profile_image_url" className="form-label">URL de la imagen de perfil</label>
          <input
            type="text"
            className="form-control"
            id="profile_image_url"
            name="profile_image_url"
            placeholder="URL de la imagen"
            value={formData.profile_image_url}
            onChange={handleChange}
          />
        </div>
        {formData.profile_image_url && (
          <div className="text-center mb-3">
            <img
              src={formData.profile_image_url}
              alt="Perfil"
              style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Actualizar Perfil
        </button>
      </form>
      <div className="text-center mt-4">
        <Link to="/purchase-history" className="btn btn-secondary">
          Ver Historial de Compras
        </Link>
      </div>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default ProfilePage;
