import bookshelf from '../db';

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
}

export default Instrument;
