import bookshelf from '../db';

import InstrumentHistory from './instrumentsHistory';

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
}

export default Instrument;
