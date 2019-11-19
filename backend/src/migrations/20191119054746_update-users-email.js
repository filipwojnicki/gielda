/**
 * Update users table.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('users', table => {
    table.string('email');
  });
}

/**
 * Drop `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('users');
}
