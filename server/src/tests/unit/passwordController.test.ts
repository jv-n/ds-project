import { PasswordController } from '../../controllers/passwordController';
import { UserRepository } from '../../repositories/userRepository';
import { restartEmail } from '../../../src/services/mailService';
import { hash } from 'bcryptjs';

jest.mock('../../src/repositories/userRepository');
jest.mock('../../src/services/mailService');
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

const mockRequest = (body = {}, query = {}) => ({
  body,
  query,
} as any);

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('PasswordController - Recuperação de Senha', () => {
  let controller: PasswordController;
  let repo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new UserRepository() as jest.Mocked<UserRepository>;
    controller = new PasswordController();
    (controller as any).repository = repo;
  });

  describe('forgotPassword', () => {
    it('deve retornar 401 se o usuário não for encontrado', async () => {
      const req = mockRequest({ email: 'naoexiste@teste.com' });
      const res = mockResponse();

      repo.findByEmail.mockResolvedValue(null);

      await controller.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('deve enviar e-mail de recuperação se o usuário existir', async () => {
      const req = mockRequest({ email: 'teste@empresa.com' });
      const res = mockResponse();

      const mockUser = { id: 1, email: 'teste@empresa.com' };
      repo.findByEmail.mockResolvedValue(mockUser);
      repo.update.mockResolvedValue({});
      (restartEmail as jest.Mock).mockResolvedValue({});

      await controller.forgotPassword(req, res);

      expect(repo.update).toHaveBeenCalled();
      expect(restartEmail).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve limpar token se falhar ao enviar e-mail', async () => {
      const req = mockRequest({ email: 'teste@empresa.com' });
      const res = mockResponse();

      const mockUser = { id: 1, email: 'teste@empresa.com' };
      repo.findByEmail.mockResolvedValue(mockUser);
      repo.update.mockResolvedValue({});
      (restartEmail as jest.Mock).mockRejectedValue(new Error('Falha no envio'));

      await controller.forgotPassword(req, res);

      expect(repo.update).toHaveBeenCalledWith(1, {
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error1.' });
    });
  });

  describe('resetPassword', () => {
    it('deve retornar erro se token não for fornecido', async () => {
      const req = mockRequest({ password: 'novaSenha123' }, {});
      const res = mockResponse();

      await controller.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido.' });
    });

    it('deve retornar erro se token for inválido ou expirado', async () => {
      const req = mockRequest({ password: 'novaSenha123' }, { token: 'tokenInvalido' });
      const res = mockResponse();

      repo.findByResetToken.mockResolvedValue(null);

      await controller.resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido ou expirado.' });
    });

    it('deve atualizar senha se token for válido', async () => {
      const req = mockRequest({ password: 'novaSenha123' }, { token: 'tokenValido' });
      const res = mockResponse();

      const mockUser = { id: 1 };
      repo.findByResetToken.mockResolvedValue(mockUser);
      (hash as jest.Mock).mockResolvedValue('senhaHasheada');
      repo.update.mockResolvedValue({});

      await controller.resetPassword(req, res);

      expect(hash).toHaveBeenCalledWith('novaSenha123', 8);
      expect(repo.update).toHaveBeenCalledWith(1, {
        senha: 'senhaHasheada',
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Senha alterada com sucesso!' });
    });
  });
});