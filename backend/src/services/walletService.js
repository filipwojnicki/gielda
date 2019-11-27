import Wallet from '../models/wallet';

/**
 * Get user wallet.
 *
 * @param {Integer} userId
 */
export function getUserWallet(userId) {
  return new Wallet()
    .query(qb => {
      qb.where({ ['user_id']: userId });
      qb.andWhere('count', '>', 0);
    })
    .fetchAll({ withRelated: ['instrument'] });
}

/**
 * @param {Integer} instrumentId
 * @param {Integer} userId
 */
export function getCurrentInstrument(instrumentId, userId) {
  return new Wallet({
    instrument_id: instrumentId,
    user_id: userId
  })
    .fetch()
    .then(instrument => instrument);
}

/**
 * @param {Integer} instrumentId
 * @param {Integer} userId
 * @param {Integer} value
 */
export function changeInstrumentValue(instrumentId, userId, value) {
  return new Wallet({
    user_id: userId,
    instrument_id: instrumentId
  })
    .fetch()
    .then(wData => {
      wData = wData.toJSON();
      if (wData) {
        return new Wallet({
          id: wData.id
        }).save(
          {
            count: wData.count + value
          },
          { method: 'update', patch: true }
        );
      }
    })
    .catch(e => {
      if (e.message === 'EmptyResponse') {
        return new Wallet({
          user_id: userId,
          instrument_id: instrumentId,
          count: value
        }).save();
      }

      return { error: 'Server error' };
    });
}
