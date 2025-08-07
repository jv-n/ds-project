import { Prisma, User } from '@prisma/client';
import prisma from '@database';

class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }


  async getImpactData(userId: number) {
    const totalDonatedAggregation = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
      },
    });
    const totalDonated = totalDonatedAggregation._sum.amount || 0;

    const supportedNgos = await prisma.donation.count({
      where: {
        userId: userId,
      },
      distinct: ['ngoId'],
    });

    const distinctSdgsCount = await prisma.sDG.count({
      where: {
        ngos: {
          some: {
            ngo: {
              donations: {
                some: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
    });

    return {
      totalDonated,
      supportedNgos,
      supportedSdgs: distinctSdgsCount,
    };
  }
}

export default new UserRepository();
