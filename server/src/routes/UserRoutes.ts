import { Router } from 'express';
import  UserController  from '../controllers/UserController';
import { requestHandler } from '../DTOs/middlewares';
import auth from '../DTOs/middlewares/auth';

const userRoutes = Router();

userRoutes.post(
  '/',
  requestHandler(UserController.create)
);

userRoutes.get(
  '/',
  auth,
  requestHandler(UserController.getAll)
);

// ## havendo conflito essa unica rota abaixo deve entrar

userRoutes.get(
  '/me/tier',
  auth,       
  requestHandler(UserController.getMyTier)
);

userRoutes.get(
  '/:id',
  auth,
  requestHandler(UserController.getById)
);

userRoutes.put(
  '/:id',
  auth,
  requestHandler(UserController.update)
);

userRoutes.delete(
  '/:id',
  auth,
  requestHandler(UserController.delete)
);

export default userRoutes;