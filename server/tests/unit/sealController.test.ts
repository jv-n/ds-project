// tests/unit/sealController.test.ts

import { Request, Response } from 'express';
import { SealController } from '../../src/controllers/sealController';
import { SealService } from '../../src/services/sealService';
import { SealRepository } from '../../src/repositories/sealRepository';

jest.mock('../../src/services/sealService');
jest.mock('../../src/repositories/sealRepository');

const MockSealService = SealService as jest.MockedClass<typeof SealService>;
const MockSealRepository = SealRepository as jest.MockedClass<typeof SealRepository>;

describe('SealController Unit Tests', () => {
  let sealController: SealController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    sealController = new SealController();
    mockRequest = { params: {} };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test('DEVE retornar 200 e os dados do selo quando a empresa é encontrada', async () => {
    mockRequest.params = { id: '1' };
    const mockCompany = { id: 1, nome: 'Empresa Feliz' };
    const mockSealResult = {
      nivelSelo: 'goldenmedal',
      criterios: [
        { pontuacao: '33' }, { pontuacao: '30' }, { pontuacao: '21' }, { pontuacao: '16' },
      ],
    };
    (MockSealRepository.prototype.getEmpresaComAcoesEDoacoes as jest.Mock).mockResolvedValue(mockCompany);
    (MockSealService.prototype.calcularPontuacao as jest.Mock).mockReturnValue(mockSealResult);
    (MockSealRepository.prototype.findByEmpresaId as jest.Mock).mockResolvedValue(null);

    await sealController.getCompanySeal(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      nivel: 'goldenmedal',
      ptsodsscomatuacao: '33',
      ptsongsatingidas: '30',
      ptscolaboradoresengajados: '21',
      ptsorcamentodestinado: '16',
    });
  });

  test('DEVE chamar o método de update quando um selo para a empresa já existe', async () => {
    mockRequest.params = { id: '2' };
    const mockCompany = { id: 2 };
    const mockSealResult = {
      nivelSelo: 'silvermedal',
      criterios: [ { pontuacao: 0 }, { pontuacao: 0 }, { pontuacao: 0 }, { pontuacao: 0 } ]
    };
    (MockSealRepository.prototype.getEmpresaComAcoesEDoacoes as jest.Mock).mockResolvedValue(mockCompany);
    (MockSealService.prototype.calcularPontuacao as jest.Mock).mockReturnValue(mockSealResult);
    (MockSealRepository.prototype.findByEmpresaId as jest.Mock).mockResolvedValue({ id: 10, nivel: 'bronze' });

    await sealController.getCompanySeal(mockRequest as Request, mockResponse as Response);

    expect(MockSealRepository.prototype.update).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).not.toHaveBeenCalledWith(500);
  });
  
  test('DEVE retornar 404 se a empresa não for encontrada', async () => {
    mockRequest.params = { id: '999' };
    (MockSealRepository.prototype.getEmpresaComAcoesEDoacoes as jest.Mock).mockResolvedValue(null);

    await sealController.getCompanySeal(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Empresa não encontrada' });
  });

  test('DEVE retornar 500 se ocorrer um erro inesperado', async () => {
    mockRequest.params = { id: '1' };
    (MockSealRepository.prototype.getEmpresaComAcoesEDoacoes as jest.Mock).mockRejectedValue(new Error('Erro de BD'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await sealController.getCompanySeal(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro interno ao calcular selo' });
    consoleSpy.mockRestore();
  });
});