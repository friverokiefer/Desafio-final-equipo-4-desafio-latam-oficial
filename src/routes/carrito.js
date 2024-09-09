// src/routes/carrito.js

const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// Obtener elementos del carrito
router.get("/cart", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Detalle_Carrito");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener el carrito:", err);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// Añadir un producto al carrito
router.post("/cart", async (req, res) => {
  const { instrumento_id, cantidad } = req.body;
  try {
    await pool.query(
      "INSERT INTO Detalle_Carrito (instrumento_id, cantidad) VALUES ($1, $2)",
      [instrumento_id, cantidad]
    );
    res.status(201).json({ message: "Producto añadido al carrito" });
  } catch (err) {
    console.error("Error al añadir al carrito:", err);
    res.status(500).json({ error: "Error al añadir al carrito" });
  }
});

// Eliminar un producto del carrito
router.delete("/cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Detalle_Carrito WHERE id = $1", [id]);
    res.json({ message: "Producto eliminado del carrito" });
  } catch (err) {
    console.error("Error al eliminar del carrito:", err);
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
});

// Registrar una compra (mover productos del carrito al historial de compras)
router.post("/compras", async (req, res) => {
  const { purchases } = req.body;

  try {
    // Insertar cada compra en el historial de compras
    for (let purchase of purchases) {
      const { userId, productId, productName, quantity } = purchase;

      // Suponiendo que tienes una tabla 'historial_compras'
      await pool.query(
        "INSERT INTO historial_compras (user_id, producto_id, nombre_producto, cantidad) VALUES ($1, $2, $3, $4)",
        [userId, productId, productName, quantity]
      );
    }

    // Limpiar el carrito después de completar la compra
    await pool.query("DELETE FROM Detalle_Carrito WHERE user_id = $1", [purchases[0].userId]);

    res.status(201).json({ message: "Compra registrada exitosamente" });
  } catch (err) {
    console.error("Error al registrar la compra:", err);
    res.status(500).json({ error: "Error al registrar la compra" });
  }
});

module.exports = router;
