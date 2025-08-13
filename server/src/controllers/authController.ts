// src/controllers/authController.ts
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const refreshTokens: string[] = []; // em produção, usar banco/redis

export class AuthController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  private generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret', { expiresIn: '15m' });
  }

  private generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'default-refresh-secret', { expiresIn: '7d' });
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await this.repository.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const payload = { id: user.id, email: user.email };

      const accessToken = this.generateAccessToken(payload);
      const refreshToken = this.generateRefreshToken(payload);

      refreshTokens.push(refreshToken);

      res.json({
        message: 'Login successful',
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  refresh = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(401).json({ error: 'Refresh token is required' });
      }

      if (!refreshTokens.includes(token)) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }

      jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
        {},
        (err: jwt.VerifyErrors | null, user: any) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
          }

          const accessToken = this.generateAccessToken({ id: user.id, email: user.email });
          res.json({ accessToken });
        }
      );
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: 'Refresh token is required' });
      }

      const index = refreshTokens.indexOf(token);
      if (index === -1) {
        return res.status(400).json({ error: 'Invalid refresh token' });
      }

      refreshTokens.splice(index, 1);
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
