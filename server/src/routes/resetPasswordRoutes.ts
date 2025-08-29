import { Router } from 'express';
import  resetPasswordController from 'src/controllers/resetPasswordController';   

const resetPasswordRouter = Router();

resetPasswordRouter.route('/forgot-password')
    .post(resetPasswordController.forgotPassword);

resetPasswordRouter.route('/reset-password')
    .post(resetPasswordController.resetPassword);


export default resetPasswordRouter;