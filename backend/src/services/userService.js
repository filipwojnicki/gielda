import Boom from '@hapi/boom';
import crypto from 'crypto';

import User from '../models/user';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function getUser(id) {
  return new User({ id })
    .fetch()
    .then(user => user)
    .catch(User.NotFoundError, () => {
      throw Boom.notFound('User not found');
    });
}

/**
 * Check if user exist by email.
 *
 * @param   {String}  email
 * @returns {Promise}
 */
export function checkUserByEmail(email) {
  return new User()
    .where({ email })
    .fetchAll()
    .then(user => {
      return user.toArray().length ? true : false;
    });
}

/**
 * Get a user by email and password.
 *
 * @param   {Number|String}  email
 * @param   {Number|String}  password
 * @returns {Promise}
 */
export function getUserByEmailAndPassword(email, password) {
  return new User({
    email,
    password: crypto
      .createHash('sha256')
      .update(password)
      .digest('base64')
  })
    .fetch()
    .then(user => {
      if (!user) {
        throw Boom.notFound('User not found');
      }

      return user;
    })
    .catch(() => {
      return null;
    });
}

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(user) {
  return new User({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: crypto
      .createHash('sha256')
      .update(user.password)
      .digest('base64'),
    credits: user.credits || 0
  }).save();
}

/**
 * Update a user.
 *
 * @param   {Number|String}  id
 * @param   {Object}         user
 * @returns {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
