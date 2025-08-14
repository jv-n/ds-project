import { Prisma, Usuario } from '@prisma/client';
import prisma from '@database';

class UserRepository {
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return prisma.usuario.create({ data });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    return prisma.usuario.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Usuario> {
    return prisma.usuario.delete({ where: { id } });
  }

  async findAll(): Promise<Usuario[]> {
    return prisma.usuario.findMany();
  }

  async getImpactData(userId: number) {
    const totalDonatedAggregation = await prisma.apoio.aggregate({
      _sum: { valor: true },
      where: {
        empresa: { usuarioId: userId },
        tipoAjuda: 'DINHEIRO',
      },
    });

    const totalServiceAggregation = await prisma.apoio.aggregate({
      _sum: { valor: true },
      where: {
        empresa: { usuarioId: userId },
        tipoAjuda: 'SERVICO',
      },
    });

    const apoios = await prisma.apoio.findMany({
      where: {
        empresa: { usuarioId: userId },
      },
      select: { ongId: true },
    });

    const supportedNgos = new Set(apoios.map(a => a.ongId)).size;

    const distinctSdgsCount = await prisma.oNG.count({
      where: {
        apoiosRecebidos: {
          some: { empresa: { usuarioId: userId } },
        },
        ods: { not: null },
      },
    });

    return {
      totalDonated: totalDonatedAggregation._sum.valor || 0,
      totalService: totalServiceAggregation._sum.valor || 0,
      supportedNgos,
      supportedSdgs: distinctSdgsCount,
    };
  }

  async findByCnpj(cnpj: string) {
    return prisma.usuario.findUnique({ where: { cnpj } });
  }

  async findUserByCnpj(cnpj: string) {
    return prisma.usuario.findUnique({
      where: { cnpj },
      include: { empresa: true },
    });
  }
}

export default new UserRepository();
