import express from 'express';
import {
  getDashboardData,
  addFavoriteRoute,
  deleteFavoriteRoute,
  logSearchHistory,
  getSearchHistory,
  getPriceTrends,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/dashboard', getDashboardData);
router.post('/favorites', addFavoriteRoute);
router.delete('/favorites/:id', deleteFavoriteRoute);
router.get('/history', getSearchHistory);
router.post('/history', logSearchHistory);
router.get('/trends', getPriceTrends);

export default router;