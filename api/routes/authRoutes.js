import { Router } from 'express';
import { authenticateUser} from '../controllers/authController.js';

const routerAuth = Router();

routerAuth.post('/login', authenticateUser);

export default routerAuth;