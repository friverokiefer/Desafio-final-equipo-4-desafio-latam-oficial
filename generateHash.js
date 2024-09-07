// generateHash.js
const bcrypt = require('bcryptjs');

// La contraseña que deseas hashear
const password = 'admin2';

// Generar el hash con 10 rondas de sal (puedes ajustar la cantidad de rondas según necesites)
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash generado:', hash);
});
