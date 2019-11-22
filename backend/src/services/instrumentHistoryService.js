import Boom from '@hapi/boom';

import InstrumentHistory from '../models/instrumentsHistory';
import Instrument from '../models/instrument';

/**
 * Get whole instruments history.
 *
 * @returns {Promise}
 */
export function getWholeHistory() {
  return InstrumentHistory.fetchAll();
}

/**
 * Create new instrument history.
 *
 * @param   {Object}  data
 * @returns {Promise}
 */
export function logHistory(data) {
  return new Instrument().count('id').then(instrumentsCount => {
    if (instrumentsCount <= 0) return;

    return new InstrumentHistory()
      .where({ publicationdate: data.date })
      .count('publicationdate')
      .then(publicationDateCount => {
        if (publicationDateCount >= instrumentsCount) return;

        return new InstrumentHistory({
          publicationdate: data.date,
          instrument_id: data.id,
          price: data.price
        }).save();
      });
  });
}

/**
 * Get historical prices of given instruments.
 */
export function getHistoricalPrices() {
  return new Instrument().count('id').then(instrumentsCount => {
    if (instrumentsCount <= 0) throw Boom.notFound('No instrument was found.');

    return new Instrument()
      .fetchAll({
        withRelated: [
          {
            instrumentHistory: qb => {
              qb.orderBy('publicationdate', 'DESC');
              qb.limit(instrumentsCount * 20);
            }
          }
        ],
        columns: ['id', 'name', 'code']
      })
      .then(data => {
        return data;
      });
  });
}
