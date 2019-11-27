import bookshelf from '../db';

import InstrumentHistory from './instrumentsHistory';
import Wallet from './wallet';

const TABLE_NAME = 'instruments';

/**
 * Instrument model.
 */
class Instrument extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * Instrument history model.
   */
  instrumentHistory() {
    return this.hasMany(InstrumentHistory);
  }

  /**
   * Wallet model.
   */
  wallet() {
    return this.hasMany(Wallet);
  }
}

export default Instrument;
