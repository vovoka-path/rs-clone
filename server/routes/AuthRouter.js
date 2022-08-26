import Router from 'express';
import Validator  from 'express-validator';
import AuthController from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleWare.js';
const { check } = Validator;
const router = new Router();

router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({min: 6}),
], AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', [authMiddleware, roleMiddleware('manager')], AuthController.getUsers);
router.put('/users', [authMiddleware, roleMiddleware('manager')], AuthController.updateUser);
router.delete('/users/:id', [authMiddleware, roleMiddleware('manager')], AuthController.deleteUser);

export default router;

