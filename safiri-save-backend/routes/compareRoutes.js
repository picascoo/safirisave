import express from 'express';
import { getPriceComparisons } from '../controllers/compareController.js';

const router = express.Router();

router.post('/', getPriceComparisons);

export default router;