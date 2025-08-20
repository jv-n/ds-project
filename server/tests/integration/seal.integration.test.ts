import request from 'supertest';

import prisma from '../../src/database';

// Criamos a instância do app aqui, uma única vez, usando nossa factory
import app from '../../src/app';


describe('Integration Test: GET /selo/empresa/:id', () => {

  // Antes de CADA teste, garantimos que o banco esteja limpo
  beforeEach(async () => {
    jest.setTimeout(20000); // Timeout generoso para operações de banco
    await prisma.selo.deleteMany();
    await prisma.documento.deleteMany();
    await prisma.doacao.deleteMany();
    await prisma.acaoEmpresa.deleteMany();
    await prisma.empresa.deleteMany();
    await prisma.usuario.deleteMany();
  });

  // No final de TODOS os testes, desconectamos o Prisma
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // --- Cenário 1: Criação de um novo selo (Caminho Feliz) ---
  it('DEVE calcular o selo, criar um novo registro no banco e retornar 200', async () => {
    // ARRANGE
    const usuario = await prisma.usuario.create({ data: { cnpj: '001', email: 'c1@test.com', senha: '123' } });
    const empresa = await prisma.empresa.create({ data: { nome: 'Empresa Bronze', numColaboradores: 10, usuarioId: usuario.id, odsId: [1, 2, 3] } }); // 10 pts
    const acao = await prisma.acaoEmpresa.create({ data: { empresaId: empresa.id, acaoId: 1, nome: 'Ação 1', nomeOng: 'ONG 1', descricao: '...', emailOng: '...', telefoneOng: '...', odsAcao: [] } }); // 7 pts
    // Pontuação total: 10 + 7 = 17 -> Bronze

    // ACT
    const response = await request(app).get(`/selo/empresa/${empresa.id}`);
    
    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body.nivel).toBe('bronzemedal');
    const seloNoBanco = await prisma.selo.findUnique({ where: { empresaId: empresa.id } });
    expect(seloNoBanco).not.toBeNull();
    expect(seloNoBanco?.nivel).toBe('bronzemedal');
  });

  // --- Cenário 2: Atualização de um selo existente ---
  it('DEVE atualizar um selo existente se a pontuação da empresa mudar', async () => {
    // ARRANGE
    const usuario = await prisma.usuario.create({ data: { cnpj: '002', email: 'c2@test.com', senha: '123' } });
    const empresa = await prisma.empresa.create({
      data: {
        nome: 'Empresa Prata', numColaboradores: 100, usuarioId: usuario.id,
        selos: { create: { nivel: 'bronzemedal', descricao: '...', pontuacaoMin: 5 } },
        odsId: [1,2,3,4,5,6,7,8,9,10], // 33 pts
      },
    });
    const acao = await prisma.acaoEmpresa.create({ data: { empresaId: empresa.id, acaoId: 2, nome: 'Ação 2', nomeOng: 'ONG 2', descricao: '...', emailOng: '...', telefoneOng: '...', odsAcao: [] } }); // 7 pts
    await prisma.doacao.create({ data: { status: 'aprovado', valor: 50000, tipo: 'DINHEIRO', data: new Date(), empresaId: empresa.id, acaoId: acao.acaoId } }); // 16 pts
    // Pontuação esperada: 33 + 7 + 16 = 56 pts -> Selo Prata

    // ACT
    const response = await request(app).get(`/selo/empresa/${empresa.id}`);
    
    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body.nivel).toBe('silvermedal');
    const selosDaEmpresa = await prisma.selo.findMany({ where: { empresaId: empresa.id } });
    expect(selosDaEmpresa.length).toBe(1); // Garante que não criou um selo novo
    expect(selosDaEmpresa[0].nivel).toBe('silvermedal'); // Garante que o selo existente foi ATUALIZADO
  });

  // --- Cenário 3: Lógica de Negócio (Ignorar doações reprovadas) ---
  it('DEVE ignorar doações reprovadas e pendentes no cálculo de ponta a ponta', async () => {
    // ARRANGE
    const usuario = await prisma.usuario.create({ data: { cnpj: '003', email: 'c3@test.com', senha: '123' } });
    const empresa = await prisma.empresa.create({ data: { nome: 'Empresa Mista', numColaboradores: 10, usuarioId: usuario.id, odsId: [1] } }); // 5 pts
    const acao = await prisma.acaoEmpresa.create({ data: { empresaId: empresa.id, acaoId: 3, nome: 'Ação 3', nomeOng: 'ONG 3', descricao: '...', emailOng: '...', telefoneOng: '...', odsAcao: [] } }); // 7 pts
    await prisma.doacao.createMany({ data: [
        { status: 'aprovado', valor: 1, tipo: 'DINHEIRO', data: new Date(), empresaId: empresa.id, acaoId: acao.acaoId }, // 0 pts
        { status: 'reprovado', valor: 100000, tipo: 'DINHEIRO', data: new Date(), empresaId: empresa.id, acaoId: acao.acaoId },
        { status: 'pendente', valor: 100000, tipo: 'DINHEIRO', data: new Date(), empresaId: empresa.id, acaoId: acao.acaoId },
    ]});
    // Pontuação esperada: 5 + 7 + 0 = 12 pts -> Bronze
    
    // ACT
    const response = await request(app).get(`/selo/empresa/${empresa.id}`);
    
    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body.nivel).toBe('bronzemedal');
    expect(response.body.ptsorcamentodestinado).toBe('0'); // Confirma que as doações de alto valor foram ignoradas
  });

  // --- Cenário 4: Não Encontrado (Caminho Triste) ---
  it('DEVE retornar 404 para um ID de empresa que não existe', async () => {
    // ACT
    const response = await request(app).get('/selo/empresa/999999');

    // ASSERT
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Empresa não encontrada' });
  });
});

// É ESSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE