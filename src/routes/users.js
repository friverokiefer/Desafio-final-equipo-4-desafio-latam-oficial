// src/routes/users.js

// src/routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); // Conexión a PostgreSQL
const authMiddleware = require('../middleware/authMiddleware'); // Importar el middleware de autenticación
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'claveTemporal123!';

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password, direccion, telefono } = req.body; // Cambiado a username
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password, direccion, telefono, fecha_registro) 
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) 
       RETURNING id`,
      [username, email, hashedPassword, direccion, telefono] // Cambiado a username
    );
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.rows[0].id });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario. Verifique los datos e intente nuevamente.' });
  }
});


// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparar la contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error("Error en el proceso de login:", error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Ruta para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.user.userId; // Asegúrate de que req.user esté configurado correctamente por el middleware de autenticación
  try {
    const result = await pool.query(
      'SELECT username, email, direccion, telefono, fecha_registro FROM users WHERE id = $1',
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener los datos del perfil:', error);
    res.status(500).json({ error: 'Error al obtener los datos del perfil.' });
  }
});

// Obtener el carrito
router.get('/cart', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query('SELECT * FROM carrito WHERE user_id = $1', [userId]);
    res.json(result.rows || []); // Devolver un array vacío si no hay resultados
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito.' });
  }
});

// Obtener compras pasadas
router.get('/orders', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query('SELECT * FROM compras WHERE user_id = $1', [userId]);
    res.json(result.rows || []); // Devolver un array vacío si no hay resultados
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras.' });
  }
});

module.exports = router;
