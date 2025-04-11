import express from 'express';
import { getAllProducts, getProductBySlug, removeProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.delete('/remove/:id', removeProduct);

export default router;