import { Router } from 'express';

import * as userController from '../controllers/users';
import { signUpValidator, signInValidator } from '../validators/userValidator';

const router = Router();

/**
 * GET /api/users
 */
// router.get('/', jsonVerify, userController.fetchAll);

/**
 * GET /api/users/:id
 */
// router.get('/:id', jsonVerify, userController.fetchById);

/**
 * POST /api/users
 */
router.post('/', signUpValidator, userController.create);

/**
 * POST /api/users/signin
 */
router.post('/signin', signInValidator, userController.signIn);

/**
 * POST /api/users/verifyjwt
 */
router.post('/verifyjwt', userController.verifyJWT);

/**
 * PUT /api/users/:id
 */
// router.put('/:id', findUser, userValidator, userController.update);

/**
 * DELETE /api/users/:id
 */
// router.delete('/:id', findUser, userController.deleteUser);

export default router;
