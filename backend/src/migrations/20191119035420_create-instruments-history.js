/**
 * Create table `instruments_history`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('instruments_history', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table
      .timestamp('updated_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.string('publicationdate').notNull();
    table.integer('instrument_id').notNull();
    table.float('price').notNull();
  });
}

/**
 * Drop `instruments_history`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('instruments_history');
}
