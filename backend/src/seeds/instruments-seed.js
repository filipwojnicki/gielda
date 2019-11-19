/**
 * Delete existing entries and seed values for `instruments`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('instruments')
    .del()
    .then(() => {
      return knex('instruments').insert([
        {
          name: 'Future Processing',
          code: 'FP',
          count: 0
        },
        {
          name: 'FP Lab',
          code: 'FPL',
          count: 0
        },
        {
          name: 'Progress Bar',
          code: 'PGB',
          count: 0
        },
        {
          name: 'FP Coin',
          code: 'FPC',
          count: 0
        },
        {
          name: 'FP Adventure',
          code: 'FPA',
          count: 0
        },
        {
          name: 'Deadline 24',
          code: 'DL24',
          count: 0
        }
      ]);
    });
}
