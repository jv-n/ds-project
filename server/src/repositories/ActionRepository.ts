import prisma from '@database';

interface CreateActionDTO {
  data: Date;
  valor: number;
  tipoAjuda: string;
  documentacao: string;
  empresaId: number;
  ongId: number;
  prefeituraId?: number;
}

interface UpdateActionDTO {
  data?: Date;
  valor?: number;
  tipoAjuda?: string;
  documentacao?: string;
  empresaId?: number;
  ongId?: number;
  prefeituraId?: number;
}

export class ActionRepository {
  async create(data: CreateActionDTO) {
    return prisma.apoio.create({ data });
  }

  async findAll() {
    return prisma.apoio.findMany({
      include: {
        empresa: true,
        ong: true,
        prefeitura: true,
      },
    });
  }

   async findByCompanyId(empresaId: number) {
    return prisma.apoio.findMany({
      where: { empresaId },
      include: {
        ong: true,
        prefeitura: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.apoio.findUnique({
      where: { id },
      include: {
        empresa: true,
        ong: true,
        prefeitura: true,
      },
    });
  }

  async update(id: number, data: UpdateActionDTO) {
    return prisma.apoio.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.apoio.delete({ where: { id } });
  }
}