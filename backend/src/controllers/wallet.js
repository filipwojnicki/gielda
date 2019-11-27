import HttpStatus from 'http-status-codes';

import * as walletService from '../services/walletService';

/**
 * Get user wallet.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getUserWallet(req, res, next) {
  return walletService.getUserWallet(req.userId).then(data => res.status(HttpStatus.OK).json(data));
}
