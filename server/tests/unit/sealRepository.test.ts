// tests/unit/sealRepository.test.ts

import { SealRepository } from '../../src/repositories/sealRepository';
import prisma from '../../src/database';

jest.mock('../../src/database', () => ({
  __esModule: true,
  default: {
    empresa: {
      findUnique: jest.fn(),
    },
    selo: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe('SealRepository Unit Tests', () => {
  let sealRepository: SealRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    sealRepository = new SealRepository();
  });

  describe('getEmpresaComAcoesEDoacoes', () => {
    const empresaId = 123;
    const expectedPrismaArgs = {
      where: { id: empresaId },
      include: { acoes: { include: { doacoes: true } } },
    };

    it('DEVE chamar prisma.empresa.findUnique com os argumentos corretos', async () => {
      prismaMock.empresa.findUnique.mockResolvedValue({ id: empresaId, nome: 'Empresa Mockada' });
      await sealRepository.getEmpresaComAcoesEDoacoes(empresaId);
      expect(prismaMock.empresa.findUnique).toHaveBeenCalledWith(expectedPrismaArgs);
    });

    it('DEVE retornar null se o Prisma não encontrar a empresa', async () => {
      prismaMock.empresa.findUnique.mockResolvedValue(null);

      const result = await sealRepository.getEmpresaComAcoesEDoacoes(empresaId);

      expect(result).toBeNull();
      expect(prismaMock.empresa.findUnique).toHaveBeenCalledWith(expectedPrismaArgs);
    });

    it('DEVE propagar o erro se o Prisma lançar uma exceção', async () => {
      const dbError = new Error('Database connection lost');
      prismaMock.empresa.findUnique.mockRejectedValue(dbError);

      await expect(sealRepository.getEmpresaComAcoesEDoacoes(empresaId)).rejects.toThrow(dbError);
    });
  });

  describe('create', () => {
    const seloData = {
        empresaId: 1, nivel: 'goldenmedal', valorTotal: 100000, descricao: 'Selo de ouro',
    };

    it('DEVE chamar prisma.selo.create com os dados fornecidos', async () => {
      await sealRepository.create(seloData);
      expect(prismaMock.selo.create).toHaveBeenCalledWith({ data: seloData });
    });
    
    it('DEVE propagar o erro se o prisma.selo.create falhar', async () => {
        const dbError = new Error('Constraint violation');
        prismaMock.selo.create.mockRejectedValue(dbError);

        await expect(sealRepository.create(seloData)).rejects.toThrow(dbError);
    });
  });

  describe('update', () => {
    const empresaId = 1;
    const seloData = {
        empresaId: 1, nivel: 'silvermedal', valorTotal: 50000, descricao: 'Selo de prata',
    };
    const expectedArgs = { where: { empresaId }, data: seloData };

    it('DEVE chamar prisma.selo.update com os argumentos corretos', async () => {
      await sealRepository.update(empresaId, seloData);
      expect(prismaMock.selo.update).toHaveBeenCalledWith(expectedArgs);
    });

    it('DEVE propagar o erro se o prisma.selo.update falhar', async () => {
        const dbError = new Error('Record to update not found');
        prismaMock.selo.update.mockRejectedValue(dbError);

        await expect(sealRepository.update(empresaId, seloData)).rejects.toThrow(dbError);
    });
  });
  
  describe('findByEmpresaId', () => {
    const empresaId = 456;
    const expectedArgs = { where: { empresaId } };

    it('DEVE chamar prisma.selo.findUnique com o ID da empresa', async () => {
        prismaMock.selo.findUnique.mockResolvedValue({ id: 1, nivel: 'bronze' }); // Retorno mockado
        await sealRepository.findByEmpresaId(empresaId);
        expect(prismaMock.selo.findUnique).toHaveBeenCalledWith(expectedArgs);
    });

    it('DEVE retornar null se o Prisma não encontrar o selo', async () => {
        prismaMock.selo.findUnique.mockResolvedValue(null);
        const result = await sealRepository.findByEmpresaId(empresaId);
        expect(result).toBeNull();
    });
  });
});