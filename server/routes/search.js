import express from 'express';
import { getSearchResults } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', getSearchResults);

export default router;
