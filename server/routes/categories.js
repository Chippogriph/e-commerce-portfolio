import express from 'express';

import { getAllCategories, getCategoryWithProducts, addCategory, uploadCategoryImage} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getAllCategories)

router.get('/:slug', getCategoryWithProducts);
router.post("/new", uploadCategoryImage.single('imageUrl'), addCategory);

export default router;