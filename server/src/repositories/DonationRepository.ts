import prisma from '@database';
import { StatusApoio } from '@prisma/client';

interface CreateDonationDTO {
  data: Date;
  valor: number;
  tipoAjuda: string;
  documentacao: string;
  empresaId: number;
  ongId: number;
  acaoId: number;
  prefeituraId?: number;
  status: StatusApoio;
}

interface UpdateDonationDTO {
  data?: Date;
  valor?: number;
  tipoAjuda?: string;
  documentacao?: string;
  empresaId?: number;
  ongId?: number;
  acaoId?: number;
  prefeituraId?: number;
  status?: StatusApoio;
}

export class DonationRepository {
  async create(data: CreateDonationDTO) {
    return prisma.apoio.create({ data });
  }

  /**
   * Busca as Ações (Oportunidades de Doação) para as quais a empresa logada
   * já iniciou algum tipo de apoio (contato, doação pendente, aprovada, rejeitada).
   * Para cada Ação, calcula a contagem total de apoios da empresa e o status do apoio mais recente.
   * Inclui o ID do apoio mais recente para cada ação.
   * @param loggedEmpresaId O ID da empresa logada.
   * @returns Uma lista de objetos Acao, cada um com a contagem de apoios da empresa,
   * o status do apoio mais recente e o ID do apoio mais recente.
   * Retorna um array vazio se não houver empresa logada.
   */
  async findAll(loggedEmpresaId?: number) {
    if (!loggedEmpresaId) {
      return []; // Retorna vazio se não houver empresa logada
    }

    // 1. Busca todos os Apoios (doações detalhadas) feitos pela empresa logada.
    // Inclui os dados da Ação e da ONG (com detalhes do usuário) para cada Apoio.
    const apoiosDaEmpresa = await prisma.apoio.findMany({
      where: {
        empresaId: loggedEmpresaId,
      },
      include: {
        acao: {
          include: {
            ong: {
              select: {
                id: true,
                nome: true,
                causa: true,
                ods: true,
                usuario: {
                  select: {
                    email: true,
                    telefone: true,
                  },
                },
              },
            },
          },
        },
      },
      // Ordena por data decrescente para que o primeiro apoio de cada ação seja o mais recente
      orderBy: {
        data: 'desc',
      },
    });

    // 2. Processa os apoios para agrupar por Ação e extrair os dados necessários.
    // Usamos um Map para garantir que cada Acao apareça apenas uma vez e para agregar os dados.
    const acoesProcessadas = new Map<number, {
      acao: any; // Armazenará o objeto Acao completo
      latestStatus: StatusApoio | null;
      latestApoioId: number | null; // NOVO: Armazenará o ID do apoio mais recente
      donationCount: number;
    }>();

    for (const apoio of apoiosDaEmpresa) {
      const acaoId = apoio.acao.id;

      if (!acoesProcessadas.has(acaoId)) {
        // Se esta é a primeira vez que encontramos esta Acao para a empresa,
        // inicializa seus dados agregados. Como a lista está ordenada por data 'desc',
        // o primeiro 'apoio' encontrado para uma 'acaoId' específica será o mais recente.
        acoesProcessadas.set(acaoId, {
          acao: apoio.acao, // Objeto Acao completo
          latestStatus: apoio.status, // Status do apoio mais recente
          latestApoioId: apoio.id, // NOVO: ID do apoio mais recente
          donationCount: 1, // Inicia a contagem
        });
      } else {
        // Se a Acao já foi processada, apenas incrementa a contagem.
        // O 'latestStatus' e 'latestApoioId' já estarão corretos devido à ordenação inicial.
        const currentAcaoData = acoesProcessadas.get(acaoId)!;
        currentAcaoData.donationCount++;
      }
    }

    // 3. Converte o Map de volta para um array no formato esperado pelo frontend.
    const result: any[] = [];
    for (const [acaoId, data] of acoesProcessadas.entries()) {
      result.push({
        id: data.acao.id, // Este é o ID da Acao
        nome: data.acao.nome,
        descricao: data.acao.descricao,
        ongId: data.acao.ongId,
        ong: data.acao.ong, // Inclui o objeto ONG completo
        currentUserDonationCount: data.donationCount,
        currentUserDonationStatus: data.latestStatus,
        latestApoioId: data.latestApoioId, // NOVO: ID do apoio mais recente
      });
    }

    return result;
  }

  async findById(id: number) {
    return prisma.apoio.findUnique({
      where: { id },
      include: {
        empresa: true,
        ong: true,
        prefeitura: true,
        acao: true,
      },
    });
  }

  async update(id: number, data: UpdateDonationDTO) {
    return prisma.apoio.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.apoio.delete({ where: { id } });
  }
}