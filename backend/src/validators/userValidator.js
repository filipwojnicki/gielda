import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as userService from '../services/userService';

// Sign Up schema
const signUpSchema = Joi.object({
  name: Joi.string()
    .label('name')
    .min(3)
    .max(30)
    .required(),
  lastname: Joi.string()
    .label('lastname')
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .label('email')
    .email({
      minDomainSegments: 2
    }),
  password: Joi.string()
    .label('password')
    .min(5)
    .max(30)
    .required(),
  credits: Joi.number()
    .label('credits')
    .required()
});

// Sign In schema
const signInSchema = Joi.object({
  email: Joi.string()
    .label('email')
    .email({
      minDomainSegments: 2
    }),
  password: Joi.string()
    .label('password')
    .min(5)
    .max(30)
    .required()
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function signUpValidator(req, res, next) {
  return validate(req.body, signUpSchema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate sign in user request.
 *
 * @param   {Object} req
 * @param   {Object} res
 * @param   {Function} next
 * @returns {Promise}
 */
function signInValidator(req, res, next) {
  return validate(req.body, signInSchema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, signUpValidator, signInValidator };
