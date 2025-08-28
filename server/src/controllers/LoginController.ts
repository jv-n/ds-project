import { NextFunction, Request, Response } from 'express';
import {
  UserRepository,
  TokenRepository,
  CookieRepository,
  CompanyRepository
} from '../repositories';
import { compare } from 'bcryptjs';
const companyRepository = new CompanyRepository();
export class LoginController {

  // Login Empresa
  loginEmpresa = async (req: Request, res: Response) => {
    try {
      const { cnpj, senha, perfil } = req.body;

      if (!cnpj || !senha || perfil !== "empresa") {
        return res.status(400).json({ error: "CNPJ, senha e perfil 'empresa' são obrigatórios" });
      }

      const user = await UserRepository.findByCnpj(cnpj, "empresa");
      if (!user) {
        return res.status(401).json({ error: "CNPJ inválido" });
      }

      const isPasswordValid = await compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      const company = await companyRepository.findById(parseInt(user.id, 10));

      const accessToken = TokenRepository.generateAccessToken(user.id.toString());
      const refreshToken = TokenRepository.generateRefreshToken(user.id.toString());
      CookieRepository.setCookie(res, 'refresh_token', refreshToken)
      

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
  loginPrefeitura = async (req: Request, res: Response) => {
    try {
      const { email, senha, perfil } = req.body;

      if (!email || !senha || perfil !== "prefeitura") {
        return res.status(400).json({ error: "Email, senha e perfil 'prefeitura' são obrigatórios" });
      }

      const user = await UserRepository.findByEmail(email, "prefeitura");
      if (!user) {
        return res.status(401).json({ error: "Email inválido" });
      }

      const isPasswordValid = await compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }


      const accessToken = TokenRepository.generateAccessToken(user.id.toString());
      const refreshToken = TokenRepository.generateRefreshToken(user.id.toString());
      CookieRepository.setCookie(res, 'refresh_token', refreshToken)

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
  async refresh(req: Request, res: Response, next: NextFunction) {
      try {
        const refreshToken = req.cookies.refresh_token;
  
        console.log(refreshToken);
  
        if (!refreshToken) {
          delete req.headers.authorization;
  
          return next({
            status: 401,
            message: 'Invalid token',
          });
        }
  
        const decodedRefreshToken =
          TokenRepository.verifyRefreshToken(refreshToken);
  
        if (!decodedRefreshToken) {
          delete req.headers.authorization;
  
          return next({
            status: 401,
            message: 'Invalid token',
          });
        }
  
        const user = await UserRepository.findById(decodedRefreshToken.id);
  
        if (!user) {
          return next({
            status: 400,
            message: 'User not found',
          });
        }
  
        CookieRepository.clearCookies(res, 'refresh_token');
  
        const newRefreshToken = TokenRepository.generateRefreshToken(
          user.id.toString()
        );
        const acessToken = TokenRepository.generateAccessToken(user.id.toString());
  
        CookieRepository.setCookie(res, 'refresh_token', newRefreshToken);
  
        const { senha: _, ...loggedUser } = user;
  
        res.locals = {
          status: 200,
          message: 'Token refreshed',
          data: {
            loggedUser,
            acessToken,
          },
        };
  
        return next();
      } catch (error) {
        return next(error);
      }
    }

  // Logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      CookieRepository.clearCookies(res, 'refresh_token');
      delete req.headers.authorization;

      res.locals = {
        status: 200,
        message: 'User logged out',
      };

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

export default new LoginController();
