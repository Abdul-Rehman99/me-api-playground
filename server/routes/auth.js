import express from 'express';
import {
  register,
  login,
  getMe
} from '../controllers/authController.js';
import {
  validateRegistration,
  validateLogin
} from '../middleware/validation.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/me', auth, getMe);

export default router;