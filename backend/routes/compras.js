// backend/routes/compras.js

import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Registrar una compra
router.post('/', async (req, res) => {
  const { userId, products } = req.body;

  try {
    for (let product of products) {
      const { instrumentoId, cantidad } = product;

      await pool.query(
        'INSERT INTO historial_compras (user_id, producto_id, cantidad) VALUES ($1, $2, $3)',
        [userId, instrumentoId, cantidad]
      );
    }

    // Eliminar productos del carrito después de la compra
    await pool.query('DELETE FROM detalle_carrito WHERE user_id = $1', [userId]);

    res.status(201).json({ message: 'Compras registradas exitosamente' });
  } catch (error) {
    console.error('Error al registrar las compras:', error);
    res.status(500).json({ error: 'Hubo un problema al registrar las compras' });
  }
});

export default router;
