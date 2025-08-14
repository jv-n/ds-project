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
      const usersWithoutPassword = usuarios.map(({ senha, ...rest }) => rest);
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

      const { senha, ...userWithoutPassword } = usuario;
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

      const updatedUser = await UserRepository.update(Number(id), userDataToUpdate);

      const { senha, ...userWithoutPassword } = updatedUser;
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

  public async getTier(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = Number(id);

      if (isNaN(userId)) {
        return next(new HttpException(400, 'Invalid user ID'));
      }

      const user = await UserRepository.findById(userId);
      if (!user) {
        return next(new HttpException(404, 'User not found'));
      }

      const impactData = await UserRepository.getImpactData(userId);
      const tierResult = new TierService().calculateTier(impactData);

      res.status(200).json(tierResult);
    } catch (error) {
      next(error);
    }
  }

  public async getImpact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = Number(id);

      if (isNaN(userId)) {
        return next(new HttpException(400, 'ID de usuário inválido.'));
      }

      const user = await UserRepository.findById(userId);
      if (!user) {
        return next(new HttpException(404, 'Usuário não encontrado.'));
      }

      const impactData = await UserRepository.getImpactData(userId);
      res.status(200).json(impactData);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
