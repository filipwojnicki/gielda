import HttpStatus from 'http-status-codes';

import { createJWToken, verifyJWTToken } from '../utils/jwt';
import * as userService from '../services/userService';

/**
 * Get all users.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchAll(req, res, next) {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a user by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchById(req, res, next) {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Get a user credits by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function fetchCredits(req, res, next) {
  userService
    .getUserCredits(req.userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function create(req, res, next) {
  const userExist = await userService.checkUserByEmail(req.body.email).catch(err => next(err));

  if (userExist) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, text: 'This email is used.' });
  }

  return userService
    .createUser(req.body)
    .then(() => res.status(HttpStatus.CREATED).json({ success: true, text: 'Your account has been created.' }))
    .catch(err => next(err));
}

/**
 * Sign in a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function signIn(req, res, next) {
  const { email, password } = req.body;

  return userService
    .getUserByEmailAndPassword(email, password)
    .then(user => {
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ success: false, text: 'User not found' });
      }

      return res.json({
        token: createJWToken({
          sessionData: user.toJSON(),
          maxAge: 3600
        })
      });
    })
    .catch(err => next(err));
}

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function update(req, res, next) {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
}

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function deleteUser(req, res, next) {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
}

/**
 * Verify user json web token.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function verifyJWT(req, res, next) {
  const tokenData = await verifyJWTToken(req.body.token);

  /**
   * Function for preparing resolve of token for public usage.
   *
   * @param {String} token
   */
  const serializeTokenForPublic = token => {
    const { email, id, name, lastname, credits } = token;

    if (!email || !id || !name || !lastname || !credits) return { success: false };

    return {
      success: true,
      email,
      id,
      name,
      lastname,
      credits
    };
  };

  return res.status(200).json({
    data: tokenData.data
      ? serializeTokenForPublic(tokenData.data)
      : {
          success: false
        }
  });
}
