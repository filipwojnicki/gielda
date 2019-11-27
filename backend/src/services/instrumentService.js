import Instrument from '../models/instrument';

/**
 * Get all Instruments.
 *
 * @returns {Promise}
 */
export function getAllInstruments() {
  return Instrument.fetchAll();
}

/**
 * Return all instruments, ids and codes.
 */
export function getInstrumentCodeAndId() {
  return Instrument.fetchAll({ columns: ['id', 'code'] });
}

/**
 * @param {Integer} id
 */
export function getCurrentInstrument(id) {
  return new Instrument({ id }).fetch();
}

/**
 * @param {Integer} id
 * @param {Integer} count
 */
export function reduceInstrumentCount(id, count) {
  return new Instrument({ id }).save(
    {
      count
    },
    {
      method: 'update',
      patch: true
    }
  );
}
