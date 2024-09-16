import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargar el archivo de variables de entorno estándar
dotenv.config({ path: '.env' });

// Verificar las variables de entorno necesarias
const requiredEnvVariables = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_NAME'];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: falta la variable de entorno ${key}`);
    process.exit(1);
  }
});

// Verificar si estamos en entorno de producción o desarrollo
const isProduction = process.env.NODE_ENV === 'production';

// Crear la instancia de Pool para la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isProduction
    ? {
        rejectUnauthorized: false, // Permitir conexiones SSL en producción
      }
    : false, // Deshabilitar SSL en entornos de desarrollo/local
});

export default pool;
