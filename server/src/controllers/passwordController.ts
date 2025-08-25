import { Request, Response } from 'express';
import crypto from 'crypto';
import { hash } from 'bcryptjs';
import UserRepository from '../repositories/userRepository';
import { restartEmail } from '../services/mailService';

export class PasswordController {
    private repository; 
    
    constructor() {
        this.repository = UserRepository;
    }
    
    public forgotPassword = async (req: Request, res: Response): Promise<Response> => {
        const { email } = req.body;

        try {
            const user = await this.repository.findByEmail(email);

            if (!user) {
                console.error("Nenhum usuário encontrado para o email:", email);
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            const resetToken = crypto.randomBytes(32).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1); 
    
            await this.repository.update(user.id, {
                resetPasswordToken: resetToken,
                resetPasswordExpires: now,
            });
    
            const resetURL = `http://localhost:3000/auth/pages/new-password?token=${resetToken}`;
    
            try {
                await restartEmail({
                  to: user.email,
                  subject: "Recuperação de Senha",
                  text: `Você solicitou a redefinição de senha. Clique neste link ${resetURL}`
                });

            } catch (err) {
                console.error("Erro ao enviar e-mail:", err);
                await this.repository.update(user.id, {
                    resetPasswordToken: null,
                    resetPasswordExpires: null,
                });

                return res.status(500).json({ error: 'Internal server error1.' });
            }
    
            return res.status(200).json();
        } catch (error) {
            console.error("Erro ao processar forgot-password:", error); 
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }

     public resetPassword = async (req: Request, res: Response): Promise<Response> => {
      const { token } = req.query;
      const { password } = req.body;

      if (!token) {
          return res.status(400).json({ error: 'Token não fornecido.' });
      }

      try {
        const user = await this.repository.findByResetToken(token as string);
      
        if (!user) {
          return res.status(400).json({ error: 'Token inválido ou expirado.' });
        }
    
        const hashedPassword = await hash(password, 8);
    
        await this.repository.update(user.id, {
          senha: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        });
    
        return res.status(200).json({ message: 'Senha alterada com sucesso!' });
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error3.' });
      }
    }
}