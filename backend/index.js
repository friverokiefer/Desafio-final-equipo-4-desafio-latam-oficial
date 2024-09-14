// backend/index.js

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pool from './config/database.js';
import usersRouter from './routes/users.js';
import carritoRouter from './routes/carrito.js';
import comprasRouter from './routes/compras.js'; // Importar el router de compras
import instrumentosRouter from './routes/instrumentos.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // Ajustar según la URL del frontend
    credentials: true,
  })
);

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/compras', comprasRouter); // Usar el router de compras
app.use('/api/instrumentos', instrumentosRouter);

// Verificar la conexión a la base de datos
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
