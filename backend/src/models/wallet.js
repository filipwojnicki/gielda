import bookshelf from '../db';

import Instrument from './instrument';
import User from './user';

const TABLE_NAME = 'wallets';

/**
 * Wallet model.
 */
class Wallet extends bookshelf.Model {
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
    return this.belongsTo(Instrument);
  }

  /**
   * Relation with user model.
   */
  user() {
    return this.belongsTo(User);
  }

  /**
   * @param {Object} selectData
   * @param {Object} updateData
   * @returns {Promise}
   */
  async upsert(selectData, updateData) {
    const existingModel = await this.findOne(selectData);

    if (existingModel) {
      return existingModel.set(updateData).save();
    } else {
      return new this(updateData).save();
    }
  }
}

export default Wallet;
