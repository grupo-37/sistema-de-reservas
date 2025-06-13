import express from 'express';
import { registerHost } from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/register/host', registerHost)

export default authRoutes;