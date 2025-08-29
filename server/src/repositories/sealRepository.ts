import { Empresa, AcaoEmpresa, Doacao } from '@prisma/client';
import prisma from '../database';

export type EmpresaComAcoesEDoacoes = Empresa & {
  acoes: (AcaoEmpresa & { doacoes: Doacao[] })[];
};

export class SealRepository {
  async getEmpresaComAcoesEDoacoes(id: number): Promise<EmpresaComAcoesEDoacoes | null> {
    return prisma.empresa.findUnique({
      where: { id },
      include: {
        acoes: {
          include: {
            doacoes: true
          }
        }
      }
    }) as Promise<EmpresaComAcoesEDoacoes | null>;
  }

async create(data: {
  empresaId: number;
  nivel: string;
  pontuacaoMin: number;
  descricao: string;
}) {
  return prisma.selo.create({ data });
}


  async update(empresaId: number, data: {
    nivel: string;
    pontuacaoMin: number;
    descricao: string;
  }) {
    return prisma.selo.update({
      where: { empresaId },
      data
    });
  }

  async findByEmpresaId(empresaId: number) {
    return prisma.selo.findUnique({
      where: { empresaId }
    });
  }
}
