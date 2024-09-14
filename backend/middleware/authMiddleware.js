import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No se proporcionó un token.' });
  }

  const token = authHeader.split(' ')[1]; // El token se envía en formato 'Bearer <token>'

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Decodificar el token usando la clave secreta
    req.user = decoded;  // Añadir los datos del usuario decodificados a la solicitud
    next();  // Continuar al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};

export default authMiddleware;
