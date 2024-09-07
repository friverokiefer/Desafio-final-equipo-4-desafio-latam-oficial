// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'claveTemporal123!';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verificar si el encabezado de autorización está presente
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token proporcionado.' });
  }

  // Extraer el token del encabezado
  const token = authHeader.split(' ')[1];

  // Verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Agregar los datos del usuario al req.user
    next(); // Continuar a la siguiente función
  } catch (error) {
    res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};

module.exports = authMiddleware;
