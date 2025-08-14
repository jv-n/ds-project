import prisma from '../database';


interface CreateDonationDTO {
  data: Date;
  valor: number;
  tipo: string;
  status?: string;
  empresaId: number;
  acaoId: number;
  documentos?: {
    storedName: string;
    mimetype: string;
    size: number;
    path: string
  }[];
}

export class DonationRepository {
  async create(data: CreateDonationDTO) {
    const { documentos, ...donationData } = data;

    return prisma.doacao.create({
      data: {
        ...donationData,
        documentos: documentos ? {
          create: documentos,
        } : undefined,
      },
      include: {
        documentos: true,
      },
    });
  }

  async findAll() {
    return prisma.doacao.findMany({
      include: {
        documentos: true,
      },
      orderBy: {
        data: 'desc',
      },
    });
  }

  async findByStatus(status: string) {
    return prisma.doacao.findMany({
      where: { status },
      include: {
        documentos: true,
      },
      orderBy: {
        data: 'desc',
      },
    });
  }

  async findDocumentsByDonationId(donationId: number) {
    return prisma.documento.findMany({
      where: { doacaoId: donationId },
    });
  }

  async findDocumentById(documentId: string) {
    return prisma.documento.findUnique({
      where: { id: documentId },
    });
  }

  async updateStatus(donationId: number, status: string, motivoReprovacao?: string) {
    return prisma.doacao.update({
      where: { id: donationId },
      data: { status, motivoReprovacao },
      include: {
        documentos: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.doacao.findUnique({
      where: { id },
      include: { documentos: true },
    });
  }

  async delete(id: number) {
    return prisma.doacao.delete({
      where: { id },
    });
  }
}

export default new DonationRepository();