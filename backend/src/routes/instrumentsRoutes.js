import { Router } from 'express';

import * as instrumentsHistoryController from '../controllers/instrumentsHistory';

const router = Router();

/**
 * GET /api/instruments/history
 */
router.get('/history', instrumentsHistoryController.historicalPrices);

export default router;
