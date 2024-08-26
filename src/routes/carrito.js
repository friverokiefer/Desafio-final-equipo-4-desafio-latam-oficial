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

module.exports = router;
