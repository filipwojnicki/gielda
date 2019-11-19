/**
 * Create table `instruments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('instruments', table => {
    table.increments('id');
    table
      .timestamp('updated_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.string('name').notNull();
    table.string('code').notNull();
  });
}

/**
 * Drop `instruments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('instruments');
}
