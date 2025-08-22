// src/controllers/authController.ts
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { CompanyRepository } from '../repositories/companyRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const refreshTokens: string[] = []; // em produção, usar banco/redis

export class AuthController {
  private repository: UserRepository;
  private companyRepository: CompanyRepository;

  constructor() {
    this.repository = new UserRepository();
    this.companyRepository = new CompanyRepository();
  }

  // Métodos privados para geração de tokens
  private generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret', { expiresIn: '15m' });
  }

  private generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'default-refresh-secret', { expiresIn: '7d' });
  }

  // Login Empresa
  public loginEmpresa = async (req: Request, res: Response) => {
    try {
      const { cnpj, senha, perfil } = req.body;

      if (!cnpj || !senha || perfil !== "empresa") {
        return res.status(400).json({ error: "CNPJ, senha e perfil 'empresa' são obrigatórios" });
      }

      const user = await this.repository.findByCnpj(cnpj, "empresa");
      if (!user) {
        return res.status(401).json({ error: "CNPJ ou senha inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "CNPJ ou senha inválidos" });
      }

      const payload = { id: user.id, cnpj: user.cnpj };
      const company = await this.companyRepository.findById(parseInt(user.id, 10));

      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);
      refreshTokens.push(refreshToken);

      res.json({
        message: "Login Empresa realizado com sucesso",
        accessToken,
        refreshToken,
        user: { id: user.id, cnpj: user.cnpj },
        company: company ? { id: company.id } : null,
      });
    } catch (error) {
      console.error("Erro no login Empresa:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Login Prefeitura
  public loginPrefeitura = async (req: Request, res: Response) => {
    try {
      const { email, senha, perfil } = req.body;

      if (!email || !senha || perfil !== "prefeitura") {
        return res.status(400).json({ error: "Email, senha e perfil 'prefeitura' são obrigatórios" });
      }

      const user = await this.repository.findByEmail(email, "prefeitura");
      if (!user) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Email ou senha inválidos" });
      }

      const payload = { id: user.id, email: user.email };
      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);
      refreshTokens.push(refreshToken);

      res.json({
        message: "Login Prefeitura realizado com sucesso",
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      console.error("Erro no login Prefeitura:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Refresh token
  public refresh = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      if (!token) return res.status(401).json({ error: 'Refresh token is required' });

      if (!refreshTokens.includes(token)) return res.status(403).json({ error: 'Invalid refresh token' });

      jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
        {},
        (err: jwt.VerifyErrors | null, user: any) => {
          if (err) return res.status(403).json({ error: 'Invalid refresh token' });

          const payload: any = user.cnpj ? { id: user.id, cnpj: user.cnpj } : { id: user.id, email: user.email };
          const accessToken = this.generateAccessToken(payload);
          res.json({ accessToken });
        }
      );
    } catch (error) {
      console.error('Erro ao atualizar token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Logout
  public logout = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      if (!token) return res.status(400).json({ error: 'Refresh token is required' });

      const index = refreshTokens.indexOf(token);
      if (index === -1) return res.status(400).json({ error: 'Invalid refresh token' });

      refreshTokens.splice(index, 1);
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
