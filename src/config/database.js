// src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',      // Cambia 'tu_usuario' por tu nombre de usuario de PostgreSQL
  host: 'localhost',       // Mantén 'localhost' si tu base de datos está en tu máquina local
  database: 'proyecto',    // Asegúrate de que 'proyecto' sea el nombre correcto de tu base de datos
  password: 'tu_contrasena', // Cambia 'tu_contrasena' por tu contraseña de PostgreSQL
  port: 5432,              // Puerto por defecto de PostgreSQL
});

module.exports = pool;
