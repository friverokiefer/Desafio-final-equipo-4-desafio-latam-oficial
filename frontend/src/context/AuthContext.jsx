// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

// Función para decodificar el token JWT sin necesidad de importar jwt-decode
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token'); // Eliminar token del almacenamiento local
    delete axios.defaults.headers.common['Authorization']; // Eliminar encabezado de autorización
    setUser(null); // Eliminar información del usuario
    setIsAuthenticated(false); // Cambiar estado de autenticación
    navigate('/login'); // Redirigir al usuario a la página de login
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = parseJwt(token); // Decodificación del token
        if (decodedUser) {
          setUser(decodedUser); // Guardar usuario decodificado
          setIsAuthenticated(true); // Cambiar estado de autenticación
          // Configurar el token en el encabezado de autorización de axios
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          throw new Error('No se pudo decodificar el token');
        }
      } catch (error) {
        console.error('Token inválido o expirado', error);
        logout(); // Si hay un error, forzar cierre de sesión
      }
    }
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem('token', token); // Guardar token en almacenamiento local
      const decodedUser = parseJwt(token); // Decodificar token
      if (decodedUser) {
        setUser(decodedUser); // Guardar usuario decodificado
        setIsAuthenticated(true); // Cambiar estado de autenticación
        // Configurar el token en el encabezado de autorización de axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/profile'); // Redirigir al perfil
      } else {
        throw new Error('No se pudo decodificar el token');
      }
    } catch (error) {
      console.error('Error al procesar el token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
