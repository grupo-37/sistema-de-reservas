import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
const { verify } = jwt;

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'No token, acceso denegado.'
    });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      error: 'Token inválido o expirado'
    });
  }
};

export default auth;