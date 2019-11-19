import jwt from 'jsonwebtoken';

/**
 * Create and sign a new json web token.
 *
 * @param {Object} details
 */
export function createJWToken(details) {
  if (typeof details !== 'object') {
    details = {};
  }

  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600;
  }

  // details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
  //   if (typeof val !== "function" && key !== "password") {
  //     memo[key] = val
  //   }

  //   return memo
  // }, {})

  const token = jwt.sign(
    {
      data: details.sessionData
    },
    process.env.JWT_SECRET,
    {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    }
  );

  return token;
}

/**
 * Verify a json web token.
 *
 * @param {String} token
 */
export function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  }).catch(err => {
    return err;
  });
}

export default {
  verifyJWTToken,
  createJWToken
};
