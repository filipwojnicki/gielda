import bookshelf from '../db';
import Wallet from './wallet';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
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
   * Wallet model.
   */
  wallet() {
    return this.hasMany(Wallet);
  }
}

export default User;
