const bcrypt = require('bcryptjs');

// La contraseña que el usuario está introduciendo
const plainPassword = 'admin2';

// El hash almacenado en la base de datos
const storedHash = '$2a$10$8hykP9bpz8lcPU8RZjOGIOqw2E08KMCDx2CiQPHtKo.ztu1.gf0X.';

bcrypt.compare(plainPassword, storedHash, (err, isMatch) => {
  if (err) throw err;
  if (isMatch) {
    console.log('Las contraseñas coinciden');
  } else {
    console.log('Contraseña incorrecta');
  }
});

