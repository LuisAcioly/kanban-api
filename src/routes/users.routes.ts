import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const userRoutes = Router();

userRoutes.post('/sign-up', UsersController.store);
userRoutes.get('/get-users', AuthMiddleware, UsersController.getUsers);

export default userRoutes;