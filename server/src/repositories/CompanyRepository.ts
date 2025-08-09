import prisma from '../database';

interface CreateCompanyDTO {
  nome: string;
  usuarioId: number;
}

interface UpdateCompanyDTO {
  nome?: string;
  pontos?: number;
}

export class CompanyRepository {
  async create(data: CreateCompanyDTO) {
    return prisma.empresa.create({
      data,
      include: {
        usuario: true,
        criterios: true,
        apoios: true,
      },
    });
  }

  async findAll() {
    return prisma.empresa.findMany({
      include: {
        usuario: true,
        criterios: true,
        apoios: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.empresa.findUnique({
      where: { id },
      include: {
        usuario: true,
        criterios: true,
        apoios: true,
      },
    });
  }

  async update(id: number, data: UpdateCompanyDTO) {
    const prismaData: any = {};
    if (data.nome !== undefined) prismaData.nome = data.nome;
    if (data.pontos !== undefined) prismaData.pontos = data.pontos;

    return prisma.empresa.update({
      where: { id },
      data: prismaData,
      include: {
        usuario: true,
        criterios: true,
        apoios: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.empresa.delete({ where: { id } });
  }
}