const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin', // El usuario que acabas de crear
  host: 'localhost', // El host, generalmente localhost si es local
  database: 'proyecto', // El nombre de la base de datos que creaste
  password: 'desafiolatam', // La contraseña que asignaste al usuario admin
  port: 5432, // Puerto por defecto de PostgreSQL
});

module.exports = pool;
