// src/routes/users.js

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener el perfil de usuario por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(result.rows[0]); // Devuelve el perfil del usuario
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
});

// Actualizar el perfil de usuario
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, direccion, telefono, imageUrl } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET username = $1, email = $2, direccion = $3, telefono = $4, imageUrl = $5 
       WHERE id = $6 RETURNING *`,
      [username, email, direccion, telefono, imageUrl, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json(result.rows[0]); // Devuelve los datos actualizados del usuario
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ error: 'Error al actualizar el perfil.' });
  }
});

module.exports = router;
