import HttpStatus from 'http-status-codes';
import { verifyJWTToken } from '../utils/jwt';

/**
 * Middleware to verify JSON Web Token.
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
export default async function jwtVerify(request, response, next) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      error: 'No authorization'
    });
  }

  try {
    const tokenData = await verifyJWTToken(token).catch(e => {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        error: e.message
      });
    });

    if (tokenData) {
      if (
        tokenData.name === 'JsonWebTokenError' ||
        tokenData.name === 'NotBeforeError' ||
        tokenData.name === 'TokenExpiredError'
      ) {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          error: tokenData.message || 'No authorization'
        });
      }
      next();
    }
  } catch (e) {
    return response.status(HttpStatus.UNAUTHORIZED).json({
      error: e.message
    });
  }
}
