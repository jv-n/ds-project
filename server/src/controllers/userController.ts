// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';

 class UserController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  create = async (req: Request, res: Response) => {
    try {
      const { cnpj, email, senha, telefone } = req.body;

      if (!cnpj || !email || !senha) {
        return res.status(400).json({ error: 'CNPJ, email and password are required' });
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
        telefone
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.repository.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.repository.findById(Number(id));

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getByCnpj = async (req: Request, res: Response) => {
    try {
      const cnpj = req.query.value as string;
      const perfil = req.query.perfil as string | undefined; // perfil opcional

      if (!cnpj) {
        return res.status(400).json({ error: "CNPJ não fornecido" });
      }

      // Busca pelo CNPJ e, se informado, pelo perfil
      const user = await this.repository.findByCnpj(cnpj, perfil);

      if (!user) {
        return res.status(404).json({ error: perfil ? `Nenhum usuário do tipo ${perfil} encontrado com este CNPJ` : "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  getByEmail = async (req: Request, res: Response) => {
    try {
      const email = req.query.value as string;
      const perfil = req.query.perfil as string | undefined; // perfil opcional

      if (!email) {
        return res.status(400).json({ error: "Email não fornecido" });
      }

      // Busca pelo email e, se informado, pelo perfil
      const user = await this.repository.findByEmail(email, perfil);

      if (!user) {
        return res.status(404).json({ error: perfil ? `Nenhum usuário do tipo ${perfil} encontrado com este email` : "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  read = async (req: Request, res: Response) => {
      try {
        const { userId } = req.params;

        const id = Number(userId);

        const user = await this.repository.findById(Number(id));

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.locals = {
          status: 200,
          data: user,
        };

        return;
      } catch (error) {
        console.error('Error reading user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { senha, ...rest } = req.body;

      const existingUser = await this.repository.findById(Number(id));
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updateData = { ...rest } as any;

      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        updateData.senha = hashedPassword;
      }

      const updatedUser = await this.repository.update(Number(id), updateData);
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingUser = await this.repository.findById(Number(id));
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      await this.repository.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default new UserController();