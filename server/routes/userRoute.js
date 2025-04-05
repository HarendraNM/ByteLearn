import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { singleupload } from '../middleware/multer.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.put('/profile/update',isAuthenticated,singleupload,updateProfile);

export default router;