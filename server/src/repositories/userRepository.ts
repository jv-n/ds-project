import { Prisma, Usuario } from '@prisma/client';
import prisma from '@database';

class UserRepository {
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const usuario = await prisma.usuario.create({ data });
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    return usuario;
  }

  async findById(id: number): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    return usuario;
  }

  async update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    const usuario = await prisma.usuario.update({ where: { id }, data });
    return usuario;
  }

  async delete(id: number): Promise<Usuario> {
    const usuario = await prisma.usuario.delete({ where: { id } });
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await prisma.usuario.findMany();
    return usuarios;
  }

  // ## havendo conflito essa parte a baixo entra
  async getImpactData(userId: number) {
    const totalDonatedAggregation = await prisma.apoio.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        empresa: {
          usuarioId: userId,
        },
      },
    });

    // 1. Buscamos todos os registros de apoio para o usuário
    const apoios = await prisma.apoio.findMany({
      where: {
        empresa: {
          usuarioId: userId,
        },
      },
      select: {
        ongId: true, // Selecionamos apenas o ID da ONG para otimizar
      },
    });

    // ✅ CORREÇÃO: Contamos as ONGs únicas a partir do resultado anterior
    const supportedNgos = new Set(apoios.map(apoio => apoio.ongId)).size;

    const distinctSdgsCount = await prisma.oNG.count({
      where: {
        apoiosRecebidos: {
          some: {
            empresa: {
              usuarioId: userId,
            },
          },
        },
        ods: {
          not: null,
        },
      },
    });

    return {
      totalDonated: totalDonatedAggregation._sum.valor || 0,
      supportedNgos: supportedNgos, // Usamos a contagem correta aqui
      supportedSdgs: distinctSdgsCount,
    };
  }
}

export default new UserRepository();
