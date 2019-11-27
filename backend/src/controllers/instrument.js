import * as instrumentService from '../services/instrumentService';

/**
 * Get instruments codes and ids.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function getInstrumentCodeAndId(req, res) {
  return instrumentService
    .getInstrumentCodeAndId()
    .then(data => res.json(data))
    .catch(() => res.json([]));
}
