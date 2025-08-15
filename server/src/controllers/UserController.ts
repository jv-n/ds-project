import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { User, UpdateUser } from '../DTOs';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = User.parse(req.body);

      const existsUserWithEmail = await UserRepository.findByEmail(
        userData.email,
      );

      if (existsUserWithEmail) {
        return next({
          status: 400,
          message: 'Esse email já está cadastrado',
        });
      }

      const userDataWithHashedPassword = {
        ...userData,
        senha: await hash(userData.senha, 6),
      };

      const user = await UserRepository.create(userDataWithHashedPassword);

      res.locals = {
        status: 201,
        message: 'User created',
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const id = Number(userId);

      const user = await UserRepository.findById(id);

      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
        });
      }

      res.locals = {
        status: 200,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userData = UpdateUser.parse(req.body);

      const id = Number(userId);

      const user = await UserRepository.update(id, userData);

      res.locals = {
        status: 200,
        data: user,
        message: 'User updated',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const id = Number(userId);
      await UserRepository.delete(id);
      res.locals = {
        status: 200,
        message: 'User deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
