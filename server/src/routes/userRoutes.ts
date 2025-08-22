import { Router } from 'express';
import auth from '../middlewares/auth';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.route('/')
  .post(
    UserController.create,
  );

userRouter.route('/cnpj')
  .get(
    UserController.getByCnpj,
  );

userRouter.route('/email')
  .get(
    UserController.getByEmail,
  );

userRouter.route('/:userId')
  .get(
    UserController.read,
  );

userRouter.route('/:userId')
  .patch(
    [auth],
    UserController.update,
  );

userRouter.route('/:userId')
  .delete(
    [auth],
    UserController.delete,
  );

export default userRouter;
