import  prisma  from '../database';
import { Empresa, AcaoEmpresa, Doacao, Selo } from '@prisma/client';

export type EmpresaComAcoesEDoacoes = Empresa & {
  acoes: (AcaoEmpresa & { doacoes: Doacao[] })[];
};

type SeloData = Omit<Selo, 'id' | 'createdAt' | 'empresaId'>;

export class SealRepository {

  async getEmpresaComAcoesEDoacoes(id: number, ano: number): Promise<EmpresaComAcoesEDoacoes | null> {
    const startDate = new Date(ano, 0, 1); 
    const endDate = new Date(ano + 1, 0, 1); 

    return prisma.empresa.findUnique({
      where: { id },
      include: {
        acoes: {
          include: {
            doacoes: {
              where: {
                data: {
                  gte: startDate,
                  lt: endDate,  
                },
              },
            },
          },
        },
      },
    });
  }


async findByEmpresaIdAndAno(empresaId: number, ano: number): Promise<Selo | null> {
  return prisma.selo.findFirst({
    where: {
      empresaId,
      ano: { equals: ano },
    },
  });
}


  async create(data: SeloData & { empresaId: number }): Promise<Selo> {
    return prisma.selo.create({
      data,
    });
  }

  async findAllByEmpresaId(empresaId: number): Promise<Selo[]> {
    return prisma.selo.findMany({
      where: {
        empresaId,
      },
      orderBy: [{
        ano: 'desc',
      }],
    });
  }

  async update(seloId: number, data: SeloData): Promise<Selo> {
    return prisma.selo.update({
      where: { id: seloId },
      data,
    });
  }
}