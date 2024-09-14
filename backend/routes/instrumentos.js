// backend/routes/instrumentos.js

import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Obtener todos los instrumentos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM instrumentos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener instrumentos:', err);
    res.status(500).json({ error: 'Error al obtener los instrumentos' });
  }
});

// Filtrar por categoría y ordenar por precio
router.get('/filter', async (req, res) => {
  const { category, orderBy } = req.query;
  let query = 'SELECT * FROM instrumentos';
  let queryParams = [];

  if (category) {
    query += ' WHERE category = $1';
    queryParams.push(category);
  }

  if (orderBy === 'price') {
    query += ' ORDER BY price';
  } else if (orderBy === 'name') {
    query += ' ORDER BY name';
  }

  try {
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al filtrar instrumentos:', err);
    res.status(500).json({ error: 'Error al filtrar los instrumentos' });
  }
});

export default router;
