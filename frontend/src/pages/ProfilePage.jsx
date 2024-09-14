// frontend/src/pages/ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_image_url: '', // Foto de perfil
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // La configuración del token ya se hace en AuthContext
        const response = await axios.get('http://localhost:5000/api/users/profile');

        // Asegúrate de que los datos del perfil se establezcan correctamente
        setFormData({
          name: response.data.name || '', // Asignar nombre de usuario
          email: response.data.email || '', // Asignar correo electrónico
          profile_image_url: response.data.profile_image_url || '', // Asignar la URL de la imagen
        });
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        setError('Hubo un problema al cargar el perfil. Verifica tu conexión.');
      }
    };

    fetchProfile(); // Cargar el perfil cuando se monta el componente
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Actualizar el estado en tiempo real mientras el usuario escribe
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página
    try {
      // Enviar la solicitud para actualizar el perfil
      await axios.patch('http://localhost:5000/api/users/profile', formData);
      setMessage('Perfil actualizado exitosamente.');
      setError(''); // Limpiar cualquier mensaje de error
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setError('Hubo un problema al actualizar el perfil. Intenta de nuevo.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tu Perfil</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
        </div>
        <div>
          <label htmlFor="profile_image_url">URL de la imagen de perfil</label>
          <input
            type="text"
            id="profile_image_url"
            name="profile_image_url"
            placeholder="URL de la imagen"
            value={formData.profile_image_url}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
          />
        </div>
        {formData.profile_image_url && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={formData.profile_image_url}
              alt="Perfil"
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
            />
          </div>
        )}
        <button
          type="submit"
          style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Actualizar Perfil
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/purchase-history" className="btn btn-secondary">
          Ver Historial de Compras
        </Link>
      </div>
      {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ProfilePage;
