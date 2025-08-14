import { Empresa, Prisma } from '@prisma/client';
import prisma from '../database';

export class CompanyRepository {
  async create(data: Prisma.EmpresaCreateInput): Promise<Empresa> {
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

  async update(id: number, data: Prisma.EmpresaUpdateInput) {

   const company = await prisma.empresa.update({
      where: { id },
      data,
      include: {
        usuario: true,
        criterios: true,
        apoios: true,
      },
    });
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  async delete(id: number) {
    return prisma.empresa.delete({ where: { id } });
  }
}