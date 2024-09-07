// src/index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./config/database'); // Conexión a PostgreSQL
const instrumentosRouter = require('./routes/instrumentos');
const carritoRouter = require('./routes/carrito');
const usersRouter = require('./routes/users'); // Importar la ruta de usuarios

// Configurar la aplicación de Express
const app = express();

// Middleware para habilitar CORS y parsear las solicitudes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Verificar la conexión a la base de datos
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Salir si no se puede conectar
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Incluir las rutas
app.use('/api/instrumentos', instrumentosRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/users', usersRouter); // Usar la ruta de los usuarios

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Algo salió mal, inténtelo de nuevo más tarde.' });
});

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const bcrypt = require('bcryptjs');

bcrypt.hash('admin', 10, (err, hash) => {
  if (err) throw err;
  console.log(hash); // Copia este hash y úsalo para actualizar la contraseña en tu base de datos
});

