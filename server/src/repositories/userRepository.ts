import { Prisma, Usuario } from '@prisma/client';
import prisma from '@database';

class UserRepository {
  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const user = await prisma.usuario.create({ data });
    return user;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({ where: { email } });
    return user;
  }

  async findById(id: number): Promise<Usuario | null> {
    const user = await prisma.usuario.findUnique({ where: { id } });
    return user;
  }

  async update(id: number, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    const user = await prisma.usuario.update({ where: { id }, data });
    return user;
  }

  async delete(id: number): Promise<Usuario> {
    const user = await prisma.usuario.delete({ where: { id } });
    return user;
  }

  async findAll(): Promise<Usuario[]> {
    const users = await prisma.usuario.findMany();
    return users;
  }

    async findUserWithCompanyByCnpj(cnpj: string) {
    return prisma.user.findUnique({
      where: {
        cnpj,
      },
      include: {
        company: true,
      },
    });
  }

}

export default new UserRepository();
