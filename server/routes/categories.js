import express from 'express';
import { uploadCategoryImage } from "../middleware/multer-upload.js";
import { getAllCategories, getCategoryWithProducts, addCategory, removeCategory} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getAllCategories)
router.get('/:slug', getCategoryWithProducts);
router.post("/new", uploadCategoryImage.single('imageUrl'), addCategory);
router.delete('/remove/:id', removeCategory);

export default router;