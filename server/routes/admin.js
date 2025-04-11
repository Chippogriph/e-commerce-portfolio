import express from 'express';
import { addProduct } from '../controllers/adminController.js';

const router = express.Router();

router.post('/new', addProduct);

export default router;