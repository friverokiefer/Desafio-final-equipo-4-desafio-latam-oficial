import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Verificar las variables de entorno necesarias
const requiredEnvVariables = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_NAME'];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: falta la variable de entorno ${key}`);
    process.exit(1);
  }
});

// Crear la instancia de Pool para la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,  // Nombre de la base de datos desde las variables de entorno
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Verificar la conexión a la base de datos
pool.connect((err) => {
  if (err) {
    console.error('Error al conectarse a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

export default pool;
