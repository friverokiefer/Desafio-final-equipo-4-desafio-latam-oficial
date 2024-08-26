// src/index.js

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/database");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Incluir rutas
const instrumentosRouter = require("./routes/instrumentos");
const carritoRouter = require("./routes/carrito"); // Importar la ruta del carrito

app.use("/api", instrumentosRouter);
app.use("/api", carritoRouter); // Usar la ruta del carrito

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
