import { Router } from 'express';
import auth from '../middlewares/auth';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/')
  .post(UserController.create);

userRouter.route('/:userId')
  .get(UserController.read)
  .patch(auth, UserController.update)
  .delete(auth, UserController.delete);

userRouter.route('/:userId/tier')
  .get(UserController.getTier);

export default userRouter;
