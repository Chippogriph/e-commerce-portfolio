import express from 'express';
import { getCart, addToCart, updateCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:id', updateCart);
router.delete('/remove/:id', removeFromCart);

export default router;
