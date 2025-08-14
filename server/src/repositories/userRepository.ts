import { Prisma, Usuario } from '@prisma/client';
import prisma from '../database';

class UsuarioRepository {
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
}

export default new UsuarioRepository();
