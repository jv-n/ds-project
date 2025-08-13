import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const AuthRouter = Router();
const controller = new AuthController();

AuthRouter.route('/')
  .post(
    controller.login,
  );

AuthRouter.route('/')
  .patch(
    controller.refresh,
  );

AuthRouter.route('/')
  .delete(
    controller.logout,
  );

export default AuthRouter;
