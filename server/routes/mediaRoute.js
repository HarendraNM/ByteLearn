import express from 'express';
import { singleupload } from '../middleware/multer.js';
import { uploadVideo } from '../controllers/mediaController.js';

const router = express.Router();

router.post('/upload-video',singleupload,uploadVideo);

export default router;