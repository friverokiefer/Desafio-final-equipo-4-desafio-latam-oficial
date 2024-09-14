import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';  // Asegúrate de importar desde el directorio correcto

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');  // Para previsualizar la imagen
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        profile_image_url: profileImageUrl
      });
      console.log('Usuario registrado:', response.data);
      setErrorMessage('Usuario registrado con éxito');  // Mensaje de éxito
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Error al registrar el usuario');  // Mensaje de error
    }
  };

  // Función para actualizar la previsualización de la imagen
  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setProfileImageUrl(imageUrl);
    setImagePreview(imageUrl);
  };

  return (
    <div className="registration-container">
      <h2>Registrarse</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={profileImageUrl}
            onChange={handleImageChange}
            placeholder="URL de la imagen de perfil"
          />
        </div>
        {/* Previsualización de la imagen */}
        {imagePreview && (
          <div className="image-preview-container">
            <img src={imagePreview} alt="Previsualización de la imagen" className="image-preview" />
          </div>
        )}
        <button type="submit">Registrarse</button>
        {/* Mostrar mensaje de error o éxito */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegistrationPage;
