import { Router } from 'express';
import { PasswordController } from '../controllers/passwordController';

const routes = Router();
const resetPasswordController = new PasswordController();

routes.post('/forgot-password', resetPasswordController.forgotPassword);
routes.post('/reset-password', resetPasswordController.resetPassword);

export default routes;