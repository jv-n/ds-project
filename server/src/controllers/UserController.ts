import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { UserRepository } from '../repositories';
import { User, UpdateUser } from '../DTOs';
import { TierService } from '../services/TierService';
import HttpException from '../DTOs/middlewares/httpException';

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = User.parse(req.body);

      const existingUserByEmail = await UserRepository.findByEmail(userData.email);
      if (existingUserByEmail) {
        throw new HttpException(409, 'Um usuário com este email já existe.');
      }

      const existingUserByCnpj = await UserRepository.findByCnpj(userData.cnpj);
      if (existingUserByCnpj) {
        throw new HttpException(409, 'Um usuário com este CNPJ já existe.');
      }

      const hashedPassword = await hash(userData.senha, 10);

      const newUser = await UserRepository.create({
        ...userData,
        senha: hashedPassword,
      });

      const { senha: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }


  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const usuarios = await UserRepository.findAll();
      const usersWithoutPassword = usuarios.map((usuario) => {
        const { senha: _, ...userWithoutPass } = usuario;
        return userWithoutPass;
      });
      res.status(200).json(usersWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usuario = await UserRepository.findById(Number(id));

      if (!usuario) {
        throw new HttpException(404, 'Usuário não encontrado.');
      }

      const { senha: _, ...userWithoutPassword } = usuario;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userDataToUpdate = UpdateUser.parse(req.body);

      if (userDataToUpdate.senha) {
        userDataToUpdate.senha = await hash(userDataToUpdate.senha, 10);
      }

      if (Object.keys(userDataToUpdate).length === 0) {
        throw new HttpException(400, 'Nenhum dado fornecido para atualização.');
      }

      const updatedUser = await UserRepository.update(
        Number(id),
        userDataToUpdate
      );

      const { senha: _, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usuario = await UserRepository.findById(Number(id));
      if (!usuario) {
        throw new HttpException(404, 'Usuário não encontrado.');
      }

      await UserRepository.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ## havendo conflito essa parte a baixo entra

 public async getTier(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = Number(id);

      if (isNaN(userId)) {
        const error: any = new Error('Invalid user ID');
        error.statusCode = 400;
        return next(error);
      }

      const user = await UserRepository.findById(userId);
      if (!user) {
        const error: any = new Error('User not found');
        error.statusCode = 404;
        return next(error);
      }

      const impactData = await UserRepository.getImpactData(userId);
      
      const tierService = new TierService();
      const tierResult = tierService.calculateTier(impactData);

      res.status(200).json(tierResult);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();