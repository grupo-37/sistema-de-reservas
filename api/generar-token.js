// generar-token.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const payload = {
  id: '123',
  email: 'test@test.com'
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('Token JWT generado:\n\nBearer ' + token);

