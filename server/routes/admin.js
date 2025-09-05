import express from 'express';
import { addProduct } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/auth.js';
import { uploadProductImage } from "../middleware/multer-upload.js";

const router = express.Router();

router.post('/new',requireAdmin, uploadProductImage.single("imageUrl"), addProduct);

export default router;