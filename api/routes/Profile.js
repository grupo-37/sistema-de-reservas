import { Router } from 'express';
import auth from '../middleware/auth.js';
import { updateProfile } from '../controllers/profileController.js';

const router = Router();

router.put('/profile', auth, updateProfile);

export default router;