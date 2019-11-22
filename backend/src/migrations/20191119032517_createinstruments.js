/**
 * Create table `instruments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('instruments', table => {
    table.increments('id').primary();
    table
      .timestamp('updated_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.string('name').notNull();
    table.string('code').notNull();
    table.integer('count').defaultTo(0);
  });
}

/**
 * Drop `instruments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('instruments').dropTable('instruments_history');
}
