import bookshelf from '../db';

import Instrument from './instrument';

const TABLE_NAME = 'instruments_history';

/**
 * Instrument model.
 */
class InstrumentHistory extends bookshelf.Model {
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
   * Relation with instrument model.
   */
  instrument() {
    return this.hasMany(Instrument);
  }
}

export default InstrumentHistory;
