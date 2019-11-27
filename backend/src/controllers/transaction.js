import HttpStatus from 'http-status-codes';

import * as transactionService from '../services/transactionService';

/**
 * Buy instrument function.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function buy(req, res, next) {
  if (!req.body.instrumentId) {
    return res.status(HttpStatus.NOT_FOUND).json({
      error: 'Instrument not found'
    });
  }

  const instrumentId = parseInt(req.body.instrumentId, 10);

  return transactionService.makeBuy(instrumentId, req.userId).then(data => {
    return res.json(data);
  });
}

/**
 * Sell instrument function.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function sell(req, res, next) {
  if (!req.body.instrumentId) {
    return res.status(HttpStatus.NOT_FOUND).json({
      error: 'Instrument not found'
    });
  }

  const instrumentId = parseInt(req.body.instrumentId, 10);

  return transactionService.makeSell(instrumentId, req.userId).then(data => {
    return res.json(data);
  });
}
