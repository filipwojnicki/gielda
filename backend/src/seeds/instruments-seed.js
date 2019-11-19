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
          code: 'FP'
        },
        {
          name: 'FP Lab',
          code: 'FPL'
        },
        {
          name: 'Progress Bar',
          code: 'PGB'
        },
        {
          name: 'FP Coin',
          code: 'FPC'
        },
        {
          name: 'FP Adventure',
          code: 'FPA'
        },
        {
          name: 'Deadline 24',
          code: 'DL24'
        }
      ]);
    });
}
