// index.cjs

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./config/database');
const instrumentosRouter = require('./routes/instrumentos');
const carritoRouter = require('./routes/carrito');
const usersRouter = require('./routes/users');
const comprasRouter = require('./routes/compras'); 

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Verificación de conexión a la base de datos
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Rutas
app.use('/api/instrumentos', instrumentosRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/users', usersRouter);  // Ruta para usuarios
app.use('/api/compras', comprasRouter);  // Ruta para compras

// Inicializar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
