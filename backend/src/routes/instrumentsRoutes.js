import { Router } from 'express';

import * as instrumentsHistoryController from '../controllers/instrumentsHistory';
import jwtVerify from '../middlewares/jwtVerify';

const router = Router();

/**
 * GET /api/instruments/history
 */
router.get('/history', jwtVerify, instrumentsHistoryController.historicalPrices);

export default router;
