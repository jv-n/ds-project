import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { User, UpdateUser } from '../DTOs';
import { TierService } from '../services/TierService';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = User.parse(req.body);

      const existsUserWithEmail = await UserRepository.findByEmail(userData.email);
      if (existsUserWithEmail) {
        return next({ status: 400, message: 'This email is already registered' });
      }

      const userDataWithHashedPassword = {
        ...userData,
        password: await hash(userData.password, 6),
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
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) return next({ status: 400, message: 'Invalid user ID' });

      const user = await UserRepository.findById(userId);
      if (!user) return next({ status: 404, message: 'User not found' });

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
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) return next({ status: 400, message: 'Invalid user ID' });

      const userData = UpdateUser.parse(req.body);
      const user = await UserRepository.update(userId, userData);

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
      const userId = parseInt(req.params.userId, 10);
      if (isNaN(userId)) return next({ status: 400, message: 'Invalid user ID' });

      await UserRepository.delete(userId);

      res.locals = {
        status: 200,
        message: 'User deleted',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

//  async getTier(req: Request, res: Response, next: NextFunction) {
//    try {
//      const userId = parseInt(req.params.userId, 10);
//      if (isNaN(userId)) return next({ status: 400, message: 'Invalid user ID' });
//
//      const user = await UserRepository.findById(userId);
//      if (!user) return next({ status: 404, message: 'User not found' });
//
//      const impactData = await UserRepository.getImpactData(userId);
//      const tierResult = new TierService().calculateTier(impactData);
//
//      res.locals = {
//        status: 200,
//        data: tierResult,
//      };
//
//      return next();
//    } catch (error) {
//      return next(error);
//    }
//  }
//
}

export default new UserController();
