import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import LoginController from '../../src/controllers/LoginController';
import { UserRepository, TokenRepository, CookieRepository } from '@repositories';

jest.mock('@repositories');

const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
const mockTokenRepository = TokenRepository as jest.Mocked<typeof TokenRepository>;
const mockCookieRepository = CookieRepository as jest.Mocked<typeof CookieRepository>;

describe('LoginController - loginCompany', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response> & { locals: Record<string, any> };
  let nextFunction: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = { body: {} };
    mockResponse = { locals: {} };
    nextFunction = jest.fn();
  });

  it('deve autenticar com sucesso e preencher res.locals corretamente', async () => {
    const cnpj = '12345678000199';
    const password = 'senhaForte123';
    const hashedPassword = await hash(password, 10);

    const mockUser = {
      id: 1,
      cnpj,
      password: hashedPassword,
      email: 'contato@ongteste.com',
      company: { id: 10, name: 'ONG de Teste' },
    };

    mockUserRepository.findUserWithCompanyByCnpj.mockResolvedValue(mockUser);
    mockTokenRepository.generateAccessToken.mockReturnValue('fake-access-token');
    mockTokenRepository.generateRefreshToken.mockReturnValue('fake-refresh-token');

    mockRequest.body = { cnpj, password };

    await LoginController.loginCompany(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.locals.status).toBe(200);
    expect(mockResponse.locals.message).toBe('Company user logged in');
    expect(mockResponse.locals.data.accessToken).toBe('fake-access-token');
    expect(mockResponse.locals.data.loggedUser.password).toBeUndefined();
    expect(mockResponse.locals.data.loggedUser.company.name).toBe('ONG de Teste');
    expect(mockCookieRepository.setCookie).toHaveBeenCalledWith(
      mockResponse,
      'refresh_token',
      'fake-refresh-token'
    );
    expect(nextFunction).toHaveBeenCalledWith();
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('deve chamar next com erro se as credenciais forem inválidas', async () => {
    mockUserRepository.findUserWithCompanyByCnpj.mockResolvedValue(null);

    mockRequest.body = {
      cnpj: '00000000000000',
      password: 'senhaQualquer',
    };

    await LoginController.loginCompany(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith({
      status: 400,
      message: 'Invalid credentials.',
    });
  });

  it('deve chamar next com erro se a senha estiver incorreta', async () => {
    const cnpj = '12345678000199';
    const password = 'senhaForte123';
    const hashedPassword = await hash(password, 10);

    const mockUser = {
      id: 1,
      cnpj,
      password: hashedPassword,
      email: 'contato@ongteste.com',
      company: { id: 10, name: 'ONG de Teste' },
    };

    mockUserRepository.findUserWithCompanyByCnpj.mockResolvedValue(mockUser);

    mockRequest.body = { cnpj, password: 'senha-errada' };

    await LoginController.loginCompany(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith({
      status: 400,
      message: 'Invalid credentials.',
    });
  });

  it('deve chamar next com erro se o CNPJ ou a senha não forem fornecidos', async () => {
    mockRequest.body = { cnpj: '12345678000199' };
    
    await LoginController.loginCompany(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith({
      status: 400,
      message: 'CNPJ and password are required.',
    });
    
    mockRequest.body = { password: 'senhaForte123' };
    
    await LoginController.loginCompany(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith({
      status: 400,
      message: 'CNPJ and password are required.',
    });
  });
});