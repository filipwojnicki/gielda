import Instrument from '../models/instrument';

/**
 * Get all Instruments.
 *
 * @returns {Promise}
 */
export function getAllInstruments() {
  return Instrument.fetchAll();
}
