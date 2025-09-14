import express from 'express';
import {
  getProfile,
  updateProfile,
  getProjects,
  getTopSkills,
  searchProfile
} from '../controllers/profileController.js';
import { validateProfile } from '../middleware/validation.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes protected by auth middleware
router.use(auth);

router.get('/', getProfile);
router.put('/', validateProfile, updateProfile);
router.get('/projects', getProjects);
router.get('/skills/top', getTopSkills);
router.get('/search', searchProfile);

export default router;