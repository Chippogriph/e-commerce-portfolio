import express from 'express';
import { getAllCategories, getCategoryWithProducts} from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getAllCategories)

router.get('/:slug', getCategoryWithProducts);

export default router;