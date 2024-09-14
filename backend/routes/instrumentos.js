import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Obtener todos los instrumentos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM instruments');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los instrumentos:', error);
    res.status(500).json({ error: 'Error al obtener los instrumentos' });
  }
});

// Obtener un instrumento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM instruments WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instrumento no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el instrumento:', error);
    res.status(500).json({ error: 'Error al obtener el instrumento' });
  }
});

export default router;
