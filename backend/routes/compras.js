// backend/routes/compras.js

import express from 'express';
import pool from '../config/database.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registrar una compra
router.post('/', async (req, res) => {
  const { cart, totalAmount } = req.body;

  let userId = null;
  let email = 'Desconocido';

  try {
    // Obtener el token del encabezado Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
      // Decodificar el token para obtener el userId y email
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      userId = decoded.id;
      email = decoded.email;
    }

    // Insertar la compra en la tabla purchases
    const purchaseResult = await pool.query(
      'INSERT INTO purchases (user_id, email, total_amount) VALUES ($1, $2, $3) RETURNING id',
      [userId, email, totalAmount]
    );

    const purchaseId = purchaseResult.rows[0].id;

    // Insertar los items en la tabla purchase_items
    for (let item of cart) {
      const { id: productId, name: productName, category, description, imageUrl, price, quantity } = item;
      const subtotal = price * quantity;

      await pool.query(
        'INSERT INTO purchase_items (purchase_id, product_id, product_name, category, description, image_url, price, quantity, subtotal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [purchaseId, productId, productName, category, description, imageUrl, price, quantity, subtotal]
      );
    }

    res.status(201).json({ message: 'Compra registrada exitosamente' });
  } catch (error) {
    console.error('Error al registrar la compra:', error);
    res.status(500).json({ error: 'Hubo un problema al registrar la compra' });
  }
});

// Obtener historial de compras del usuario autenticado
router.get('/historial', async (req, res) => {
  try {
    // Obtener el token del encabezado Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Obtener las compras del usuario
    const purchasesResult = await pool.query(
      'SELECT * FROM purchases WHERE user_id = $1 ORDER BY purchase_date DESC',
      [userId]
    );

    const purchases = [];

    for (let purchase of purchasesResult.rows) {
      const itemsResult = await pool.query(
        'SELECT * FROM purchase_items WHERE purchase_id = $1',
        [purchase.id]
      );

      purchases.push({
        ...purchase,
        items: itemsResult.rows
      });
    }

    res.json(purchases);
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener el historial de compras' });
  }
});

export default router;
