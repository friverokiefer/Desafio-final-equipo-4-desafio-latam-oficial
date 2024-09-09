// config/database.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin', // Asegúrate de que estas credenciales sean correctas
  host: 'localhost',
  database: 'proyecto',
  password: 'desafiolatam',
  port: 5432,
});

module.exports = pool;
