import prisma from '../database';

interface CreateCompanyDTO {
  nome: string;
  usuarioId: number;
  odsId: number[];
  numColaboradores: number;
}

interface UpdateCompanyDTO {
  pontuacao?: number;
  odsId?: number[];
  numColaboradores?: number;
}

export default class CompanyRepository {
  async create(data: CreateCompanyDTO) {
    return prisma.empresa.create({
      data,
      include: {
        usuario: true
      },
    });
  }

  async findAll() {
    return prisma.empresa.findMany({
      include: {
        usuario: true
      },
    });
  }

  async findById(id: number) {
    return prisma.empresa.findUnique({
      where: { id },
      include: {
        usuario: true
      },
    });
  }

  async update(id: number, data: UpdateCompanyDTO) {
    const prismaData: any = {};
    if (data.pontuacao !== undefined) prismaData.pontuacao = data.pontuacao;
    if (data.odsId !== undefined) prismaData.odsId = { set: data.odsId.map(odsId => ({ id: odsId })) };
    if (data.numColaboradores !== undefined) prismaData.numColaboradores = data.numColaboradores;

    return prisma.empresa.update({
      where: { id },
      data: prismaData,
      include: {
        usuario: true
      },
    });
  }

  async delete(id: number) {
    return prisma.empresa.delete({ where: { id } });
  }
}