import { Router } from 'express';

import * as instrumentsHistoryController from '../controllers/instrumentsHistory';
import * as walletController from '../controllers/wallet';
import * as transactionController from '../controllers/transaction';
import * as instrumentController from '../controllers/instrument';

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

router.get('/details', jwtVerify, instrumentController.getInstrumentCodeAndId);

/**
 * POST /api/instruments/buy
 */
router.post('/buy', jwtVerify, transactionController.buy);

/**
 * POST /api/instruments/sell
 */
router.post('/sell', jwtVerify, transactionController.sell);

export default router;
