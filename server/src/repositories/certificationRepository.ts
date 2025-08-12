import prisma from '../database';

export class CertificationRepository {
  async create(data: { nivel: string; descricao: string; pontuacaoMin: number; empresaId: number }) {
    return prisma.selo.create({
      data
    });
  }

  async getByCompanyId(companyId: number) {
    return prisma.selo.findMany({
      where: { empresaId: companyId },
      include: {
        empresa: {
          select: { id: true, nome: true, pontuacao: true }
        }
      }
    });
  }

  async getById(id: number) {
    return prisma.selo.findUnique({
      where: { id },
      include: {
        empresa: {
          select: { id: true, nome: true, pontuacao: true }
        }
      }
    });
  }
}
