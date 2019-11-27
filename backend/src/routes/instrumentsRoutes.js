import { Router } from 'express';

import * as instrumentsHistoryController from '../controllers/instrumentsHistory';
import * as walletController from '../controllers/wallet';

import jwtVerify from '../middlewares/jwtVerify';

const router = Router();

/**
 * GET /api/instruments/history
 */
router.get('/history', jwtVerify, instrumentsHistoryController.historicalPrices);

/**
 * GET /api/instruments/wallet
 */
router.get('/wallet', jwtVerify, walletController.getUserWallet);

export default router;
