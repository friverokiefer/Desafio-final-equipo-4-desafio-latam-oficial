const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Registrar una compra
router.post("/", async (req, res) => {
  const { purchases } = req.body;

  try {
    for (let purchase of purchases) {
      const { userId, productId, productName, quantity } = purchase;

      await pool.query(
        "INSERT INTO historial_compras (user_id, producto_id, nombre_producto, cantidad) VALUES ($1, $2, $3, $4)",
        [userId, productId, productName, quantity]
      );
    }

    res.status(201).json({ message: "Compras registradas exitosamente" });
  } catch (error) {
    console.error("Error al registrar las compras:", error);
    res.status(500).json({ error: "Hubo un problema al registrar las compras" });
  }
});

module.exports = router;
