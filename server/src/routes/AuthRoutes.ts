import { Router } from 'express';
import { LoginController } from '../controllers';
import { requestHandler } from '../middlewares';
import auth from '../middlewares/auth';

const authRouter = Router();


authRouter.post('/login', requestHandler(LoginController.login));
authRouter.post('/login/company', requestHandler(LoginController.loginCompany));
authRouter.post('/refresh', requestHandler(LoginController.refresh));
authRouter.get('/logout', 
    auth, 
    requestHandler(LoginController.logout)
);

export default authRouter;