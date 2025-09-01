import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import { UserRepository } from "../repositories/userRepository";
import { UpdateUser } from "../DTOs";

class UserController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  create = async (req: Request, res: Response) => {
      try {
        const { cnpj, email, senha, telefone, perfil } = req.body;

        if (!cnpj || !email || !senha || !perfil) {
          return res.status(400).json({ error: 'CNPJ, email, password and perfil are required' });
        }

        const existingUser = await this.repository.findByCnpj(cnpj);
        if (existingUser) {
          return res.status(409).json({ error: 'CNPJ already registered' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const user = await this.repository.create({
          cnpj,
          email,
          senha: hashedPassword,
          telefone,
          perfil
        });

        res.status(201).json(user);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.repository.findAll();

      res.locals = {
        status: 200,
        data: users,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this.repository.findById(Number(id));

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
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
  };

  getByCnpj = async (req: Request, res: Response) => {
    try {
      const cnpj = req.query.value as string;
      const perfil = req.query.perfil as string | undefined;

      if (!cnpj) {
        return res.status(400).json({ message: 'CNPJ não fornecido' });
      }

      // Usa apenas findByCnpj, sem chamar findById
      const user = await this.repository.findByCnpj(cnpj, perfil);

      if (!user) {
        return res.status(404).json({
          message: perfil
            ? `Nenhum usuário do tipo ${perfil} encontrado com este CNPJ`
            : 'Usuário não encontrado',
        });
      }

      return res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  getByEmail = async (req: Request, res: Response) => {
    try {
      const email = req.query.value as string;
      const perfil = req.query.perfil as string | undefined;

      if (!email) {
        return res.status(400).json({ message: 'Email não fornecido' });
      }

      // Usa apenas findByEmail
      const user = await this.repository.findByEmail(email, perfil);

      if (!user) {
        return res.status(404).json({
          message: perfil
            ? `Nenhum usuário do tipo ${perfil} encontrado com este email`
            : 'Usuário não encontrado',
        });
      }

      return res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const id = Number(userId);

      const user = await this.repository.findById(id);

      if (!user) {
        return next({
          status: 404,
          message: "User not found",
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
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userData = UpdateUser.parse(req.body); // validação DTO

      // se tiver senha no update → faz hash
      let updateData = { ...userData };
      if (userData.senha) {
        updateData.senha = await hash(userData.senha, 10);
      }

      const user = await this.repository.update(Number(id), updateData);

      res.locals = {
        status: 200,
        data: user,
        message: "User updated",
      };

      return next();
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.repository.delete(Number(id));

      res.locals = {
        status: 200,
        message: "User deleted",
      };

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

export default new UserController();

