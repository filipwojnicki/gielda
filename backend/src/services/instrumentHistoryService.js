import InstrumentHistory from '../models/instrumentsHistory';

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
  return new InstrumentHistory({
    publicationdate: data.date,
    instrument_id: data.id,
    price: data.price
  }).save();
}
