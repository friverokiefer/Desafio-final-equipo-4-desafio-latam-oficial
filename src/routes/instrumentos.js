// src/routes/instrumentos.js
const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Obtener todos los instrumentos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Instrumentos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener instrumentos:', err);
    res.status(500).json({ error: 'Ocurrió un error al obtener los instrumentos' });
  }
});

// Filtrar por categoría y ordenar por precio
router.get('/filter', async (req, res) => {
  const { category, orderBy } = req.query;
  let query = 'SELECT * FROM Instrumentos';
  let queryParams = [];

  if (category) {
    query += ' WHERE categoria_id = $1';
    queryParams.push(category);
  }

  if (orderBy === 'price') {
    query += ' ORDER BY precio';
  } else if (orderBy === 'name') {
    query += ' ORDER BY nombre';
  }

  try {
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al filtrar instrumentos:', err);
    res.status(500).json({ error: 'Ocurrió un error al filtrar los instrumentos' });
  }
});

module.exports = router;
