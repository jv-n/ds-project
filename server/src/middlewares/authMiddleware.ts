// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Definindo um tipo customizado para a requisição que inclui o empresaId
export interface AuthenticatedRequest extends Request {
  empresaId?: number;
}

/**
 * Middleware para simular a autenticação do usuário.
 * Na sua aplicação real, essa lógica verificaria um token JWT.
 */
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Neste exemplo, estamos apenas atribuindo um ID fixo (ex: 1) para simular um usuário logado.
  // Substitua esta linha com a lógica de extração do ID do usuário a partir do token de autenticação.
  req.empresaId = 2; 

  // Continue para a próxima função na cadeia de middlewares
  next();
};
