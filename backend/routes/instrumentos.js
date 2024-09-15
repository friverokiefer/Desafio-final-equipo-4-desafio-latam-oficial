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

// Crear un nuevo instrumento
router.post('/', async (req, res) => {
  const { name, price, category, description, image_url, stock } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO instruments (name, price, category, description, image_url, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, category, description, image_url, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear el instrumento:', error);
    res.status(500).json({ error: 'Error al crear el instrumento' });
  }
});

// Actualizar un instrumento (solo los campos enviados en la solicitud)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, category, description, image_url, stock } = req.body;

  try {
    // Obtenemos el instrumento actual
    const existingInstrument = await pool.query('SELECT * FROM instruments WHERE id = $1', [id]);

    if (existingInstrument.rows.length === 0) {
      return res.status(404).json({ error: 'Instrumento no encontrado' });
    }

    // Mantener los valores actuales si no se envían nuevos valores
    const updatedInstrument = {
      name: name || existingInstrument.rows[0].name,
      price: price || existingInstrument.rows[0].price,
      category: category || existingInstrument.rows[0].category,
      description: description || existingInstrument.rows[0].description,
      image_url: image_url || existingInstrument.rows[0].image_url,
      stock: stock || existingInstrument.rows[0].stock,
    };

    const result = await pool.query(
      'UPDATE instruments SET name = $1, price = $2, category = $3, description = $4, image_url = $5, stock = $6 WHERE id = $7 RETURNING *',
      [updatedInstrument.name, updatedInstrument.price, updatedInstrument.category, updatedInstrument.description, updatedInstrument.image_url, updatedInstrument.stock, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar el instrumento:', error);
    res.status(500).json({ error: 'Error al actualizar el instrumento' });
  }
});

// Eliminar un instrumento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM instruments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instrumento no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    console.error('Error al eliminar el instrumento:', error);
    res.status(500).json({ error: 'Error al eliminar el instrumento' });
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
