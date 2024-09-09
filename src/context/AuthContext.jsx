import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwt_decode(token);
        setUser(decodedUser);  // Almacena el usuario decodificado en el contexto
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token inválido o expirado', error);
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = jwt_decode(token);
    setUser(decodedUser);  // Almacena el usuario decodificado en el contexto
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
