// backend/config/database.js

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

// Crear la instancia de Pool para la conexión a la base de datos productiva
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
