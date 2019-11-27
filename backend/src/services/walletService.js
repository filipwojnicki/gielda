import Wallet from '../models/wallet';

/**
 * Get user wallet.
 *
 * @param {Integer} userId
 */
export function getUserWallet(userId) {
  return new Wallet().where({ ['user_id']: userId }).fetchAll({ withRelated: ['instrument'] });
}
