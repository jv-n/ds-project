import prisma from '../database';

interface CreateActionCompanyDTO {
  nome: string;
  descricao: string;
  nomeOng: string;
  emailOng: string;
  telefoneOng: string;
  acaoId: number;
  empresaId: number;
  odsAcao: number[];
}


export default class ActionCompanyRepository {
  async create(data: CreateActionCompanyDTO) {
    return prisma.acaoEmpresa.create({
      data,
      include: {
        empresa: true,
        doacoes: {
          include: {
            documentos: true,
          },
        },
      },
    });
  }

  async getByCompanyId(id: number) {
    return prisma.acaoEmpresa.findMany({
      where: { empresaId: id },
      include: { doacoes: true }
    });
  }

  async getDonationsById(companyId: number, actionId: number) {
    return prisma.doacao.findMany({
      where: { empresaId: companyId, acaoId: actionId },
      include: { documentos: true }
    });
  }

  async findById(companyId: number, actionId: number) {
    return prisma.acaoEmpresa.findUnique({
      where: {
        acaoEmpresaId: {
          empresaId: companyId,
          acaoId: actionId
        }
      }
    });
  }
}