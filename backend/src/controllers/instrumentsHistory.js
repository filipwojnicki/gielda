import * as InstrumentService from '../services/instrumentService';
import * as InstrumentHistoryService from '../services/instrumentHistoryService';

/**
 * Log actual prices.
 *
 * @param {Object} items
 * @param {String} date
 */
export function logPrices(items, date) {
  return InstrumentService.getAllInstruments().then(data => {
    const instruments = data.toJSON();

    if (!instruments) return;

    return instruments.map(instrument => {
      const currentItem = items.find(item => item.Code === instrument.code);

      return InstrumentHistoryService.logHistory({
        date: date,
        id: instrument.id,
        price: currentItem.Price
      });
    });
  });
}
