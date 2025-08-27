import { Router } from 'express';
import { LoginController } from '../controllers';

const AuthRouter = Router();

AuthRouter.route('/empresa')
  .post(
    LoginController.loginEmpresa,
  );

  AuthRouter.route('/prefeitura')
  .post(
    LoginController.loginPrefeitura,
  );

AuthRouter.route('/')
  .patch(
    LoginController.refresh,
  );

AuthRouter.route('/')
  .delete(
    LoginController.logout,
  );

export default AuthRouter;
