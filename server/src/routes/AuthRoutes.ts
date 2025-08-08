import { Router } from 'express';
import { LoginController } from '../controllers';

const authRouter = Router();

authRouter.post('/login', LoginController.login);
authRouter.post('/login/company', LoginController.loginCompany);
authRouter.post('/refresh', LoginController.refresh);
authRouter.get('/logout', LoginController.logout);

export const AuthRoutes = authRouter;