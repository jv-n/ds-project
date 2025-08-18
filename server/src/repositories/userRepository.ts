import { Prisma, Usuario } from '@prisma/client';
import prisma from '@database';

interface CreateUserDTO {
  cnpj: string;           
  email: string;           
  senha: string;      
  telefone: string; 
  resetPasswordToken?: string | null; 
  resetPasswordExpires?: Date | null;
}

interface UpdateUserDTO {
  cnpj?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  resetPasswordToken?: string | null; 
  resetPasswordExpires?: Date | null;
}

export class UserRepository {
  async create(data: CreateUserDTO): Promise<Usuario> {
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

  async update(id: number, data: UpdateUserDTO): Promise<Usuario> {
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

  async findByResetToken(token: string): Promise<Usuario | null> {
    return prisma.usuario.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(), 
        },
      },
    });
  }
}

