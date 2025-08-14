import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const saltRounds = 6;

  console.log('Iniciando o seeding do banco de dados...');

  // 1. Criação de Usuários
  const user1 = await prisma.usuario.create({
    data: {
      cnpj: '00.000.000/0001-01',
      email: 'alice@empresa.com',
      senha: await hash('alicepassword123', saltRounds),
      telefone: '555-1234',
      perfil: 'empresa',
    },
  });

  const user2 = await prisma.usuario.create({
    data: {
      cnpj: '10.000.000/0001-01',
      email: 'charlie@empresa.com',
      senha: await hash('charliepassword789', saltRounds),
      telefone: '555-5678',
      perfil: 'empresa',
    },
  });

  const user3 = await prisma.usuario.create({
    data: {
      cnpj: '20.000.000/0001-01',
      email: 'eve@prefeitura.com',
      senha: await hash('evepassword654', saltRounds),
      telefone: '555-4321',
      perfil: 'prefeitura',
    },
  });

  const user4 = await prisma.usuario.create({
    data: {
      cnpj: '30.000.000/0001-01',
      email: 'frank@empresa.com',
      senha: await hash('frankpassword123', saltRounds),
      telefone: '555-9876',
      perfil: 'empresa',
    },
  });

  const user5 = await prisma.usuario.create({
    data: {
      cnpj: '40.000.000/0001-01',
      email: 'grace@empresa.com',
      senha: await hash('gracepassword456', saltRounds),
      telefone: '555-3210',
      perfil: 'empresa',
    },
  });
  console.log('Usuários criados com sucesso!');

  // 2. Criação de Empresas
  const empresa1 = await prisma.empresa.create({
    data: {
      nome: 'Tech Solutions Ltda.',
      usuarioId: user1.id,
      pontuacao: 150,
      numColaboradores: 50,
      odsId: [1, 2, 13],
    },
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      nome: 'Global Corp S.A.',
      usuarioId: user2.id,
      pontuacao: 75,
      numColaboradores: 20,
      odsId: [1, 15],
    },
  });

  const empresa3 = await prisma.empresa.create({
    data: {
      nome: 'Eco-Soluções Ambientais',
      usuarioId: user4.id,
      pontuacao: 200,
      numColaboradores: 100,
      odsId: [6, 7, 13],
    },
  });

  const empresa4 = await prisma.empresa.create({
    data: {
      nome: 'Finanças do Futuro',
      usuarioId: user5.id,
      pontuacao: 120,
      numColaboradores: 80,
      odsId: [8, 9, 10],
    },
  });
  console.log('Empresas criadas com sucesso!');

  // 3. Criação de Ações das Empresas (AcaoEmpresa)
  // Ações para a Empresa 1
  const acaoEmpresa1 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 1,
      empresaId: empresa1.id,
      nome: 'Campanha Inverno Solidário',
      descricao: 'Ajude famílias com roupas e cobertores.',
      nomeOng: 'ONG Social Brasil',
      emailOng: 'ongsocial@email.com',
      telefoneOng: '111-1111',
      odsAcao: [1, 2],
    },
  });

  const acaoEmpresa3 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 3,
      empresaId: empresa1.id,
      nome: 'Apoio Alimentar para Refugiados',
      descricao: 'Doe alimentos não perecíveis para famílias refugiadas.',
      nomeOng: 'Pão e Esperança',
      emailOng: 'paoeesperanca@email.com',
      telefoneOng: '333-3333',
      odsAcao: [2],
    },
  });

  const acaoEmpresa6 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 6,
      empresaId: empresa1.id,
      nome: 'Tecnologia para Escolas Públicas',
      descricao: 'Doe computadores e equipamentos para escolas de baixa renda.',
      nomeOng: 'Educação para Todos',
      emailOng: 'eduforall@email.com',
      telefoneOng: '666-6666',
      odsAcao: [4, 9],
    },
  });

  // Ações para a Empresa 2
  const acaoEmpresa2 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 2,
      empresaId: empresa2.id,
      nome: 'Projeto Verde Esperança',
      descricao: 'Foco em sustentabilidade e plantio de árvores.',
      nomeOng: 'Amigos da Natureza',
      emailOng: 'amigosdanatureza@email.com',
      telefoneOng: '222-2222',
      odsAcao: [13, 15],
    },
  });

  const acaoEmpresa4 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 4,
      empresaId: empresa2.id,
      nome: 'Programa de Reciclagem Comunitária',
      descricao: 'Apoio a iniciativas de coleta e reciclagem em bairros carentes.',
      nomeOng: 'EcoCidade Limpa',
      emailOng: 'ecocidade@email.com',
      telefoneOng: '444-4444',
      odsAcao: [11, 12],
    },
  });

  const acaoEmpresa7 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 7,
      empresaId: empresa2.id,
      nome: 'Limpeza de Praias Locais',
      descricao: 'Ajude na organização de mutirões de limpeza de praias.',
      nomeOng: 'Mares Limpos',
      emailOng: 'mareslimpos@email.com',
      telefoneOng: '777-7777',
      odsAcao: [14],
    },
  });

  // Ações para a Empresa 3
  const acaoEmpresa5 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 5,
      empresaId: empresa3.id,
      nome: 'Fundo para Pesquisa de Energia Limpa',
      descricao: 'Contribua para o desenvolvimento de novas tecnologias de energia renovável.',
      nomeOng: 'Inovação Verde',
      emailOng: 'inovacao.verde@email.com',
      telefoneOng: '555-5555',
      odsAcao: [7],
    },
  });

  const acaoEmpresa8 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 8,
      empresaId: empresa3.id,
      nome: 'Proteção de Nascentes',
      descricao: 'Apoie a conservação de nascentes em áreas de mata nativa.',
      nomeOng: 'Guardiões das Águas',
      emailOng: 'guardiaodaagua@email.com',
      telefoneOng: '888-8888',
      odsAcao: [6, 15],
    },
  });

  // NOVA AÇÃO: Empresa 3 com múltiplas doações
  const acaoEmpresa11 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 11,
      empresaId: empresa3.id,
      nome: 'Reflorestamento de Áreas Desmatadas',
      descricao: 'Voluntariado para plantio de mudas em áreas de preservação.',
      nomeOng: 'Verde Vale',
      emailOng: 'verdevale@email.com',
      telefoneOng: '111-2222',
      odsAcao: [13, 15],
    },
  });

  // Ações para a Empresa 4
  const acaoEmpresa9 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 9,
      empresaId: empresa4.id,
      nome: 'Microcrédito para Empreendedores',
      descricao: 'Ofereça microcréditos para pequenos empreendedores em comunidades.',
      nomeOng: 'Giro Solidário',
      emailOng: 'girosolidario@email.com',
      telefoneOng: '999-9999',
      odsAcao: [8, 10],
    },
  });

  const acaoEmpresa10 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 10,
      empresaId: empresa4.id,
      nome: 'Mentoria para Startups de Impacto',
      descricao: 'Apoie startups que visam resolver problemas sociais e ambientais.',
      nomeOng: 'Nós por Eles',
      emailOng: 'nos_por_eles@email.com',
      telefoneOng: '101-1010',
      odsAcao: [9, 17],
    },
  });

  // NOVA AÇÃO: Empresa 4 com uma única doação
  const acaoEmpresa12 = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 12,
      empresaId: empresa4.id,
      nome: 'Workshop de Educação Financeira',
      descricao: 'Ofereça workshops sobre finanças pessoais para jovens.',
      nomeOng: 'Saber e Crescer',
      emailOng: 'saberecrescer@email.com',
      telefoneOng: '121-1212',
      odsAcao: [4, 8],
    },
  });
  console.log('Ações de Empresa criadas com sucesso!');

  // 4. Criação de Doações
  await prisma.doacao.createMany({
    data: [
      // Doações para a Ação 1 (Empresa 1)
      {
        data: new Date('2024-07-01T10:00:00Z'),
        valor: 150.00,
        tipo: 'Dinheiro',
        empresaId: empresa1.id,
        acaoId: acaoEmpresa1.acaoId,
        status: 'Pendente',
      },
      {
        data: new Date('2024-07-15T11:30:00Z'),
        valor: 200.00,
        tipo: 'Roupas',
        empresaId: empresa1.id,
        acaoId: acaoEmpresa1.acaoId,
        status: 'Aprovado',
      },
      {
        data: new Date('2024-07-28T16:00:00Z'),
        valor: 100.00,
        tipo: 'Serviço',
        empresaId: empresa1.id,
        acaoId: acaoEmpresa1.acaoId,
        status: 'Reprovado',
        motivoReprovacao: 'Documentação incompleta.',
      },
      // Doações para a Ação 3 (Empresa 1)
      {
        data: new Date('2024-08-01T09:00:00Z'),
        valor: 50.00,
        tipo: 'Dinheiro',
        empresaId: empresa1.id,
        acaoId: acaoEmpresa3.acaoId,
        status: 'Pendente',
      },
      // Doação para a Ação 6 (Empresa 1)
      {
        data: new Date('2024-08-25T14:00:00Z'),
        valor: 0.00,
        tipo: 'Tecnologia',
        empresaId: empresa1.id,
        acaoId: acaoEmpresa6.acaoId,
        status: 'Pendente',
      },
      // Doações para a Ação 2 (Empresa 2)
      {
        data: new Date('2024-08-05T10:00:00Z'),
        valor: 300.00,
        tipo: 'Dinheiro',
        empresaId: empresa2.id,
        acaoId: acaoEmpresa2.acaoId,
        status: 'Aprovado',
      },
      {
        data: new Date('2024-08-10T14:00:00Z'),
        valor: 0.00,
        tipo: 'Materiais',
        empresaId: empresa2.id,
        acaoId: acaoEmpresa2.acaoId,
        status: 'Pendente',
      },
      // Doações para a Ação 4 (Empresa 2)
      {
        data: new Date('2024-08-12T16:30:00Z'),
        valor: 250.00,
        tipo: 'Serviço',
        empresaId: empresa2.id,
        acaoId: acaoEmpresa4.acaoId,
        status: 'Reprovado',
        motivoReprovacao: 'Serviço não solicitado no momento.',
      },
      // Doação para a Ação 7 (Empresa 2)
      {
        data: new Date('2024-08-27T10:00:00Z'),
        valor: 100.00,
        tipo: 'Dinheiro',
        empresaId: empresa2.id,
        acaoId: acaoEmpresa7.acaoId,
        status: 'Pendente',
      },
      // Doações para a Ação 5 (Empresa 3)
      {
        data: new Date('2024-08-20T12:00:00Z'),
        valor: 500.00,
        tipo: 'Dinheiro',
        empresaId: empresa3.id,
        acaoId: acaoEmpresa5.acaoId,
        status: 'Pendente',
      },
      // Doação para a Ação 8 (Empresa 3)
      {
        data: new Date('2024-08-22T08:00:00Z'),
        valor: 0.00,
        tipo: 'Serviço',
        empresaId: empresa3.id,
        acaoId: acaoEmpresa8.acaoId,
        status: 'Aprovado',
      },
      // Doações para a NOVA AÇÃO 11 (Empresa 3 - Múltiplas doações)
      {
        data: new Date('2024-09-01T10:00:00Z'),
        valor: 0.00,
        tipo: 'Voluntariado',
        empresaId: empresa3.id,
        acaoId: acaoEmpresa11.acaoId,
        status: 'Aprovado',
      },
      {
        data: new Date('2024-09-05T15:30:00Z'),
        valor: 200.00,
        tipo: 'Dinheiro',
        empresaId: empresa3.id,
        acaoId: acaoEmpresa11.acaoId,
        status: 'Pendente',
      },
      {
        data: new Date('2024-09-10T11:00:00Z'),
        valor: 0.00,
        tipo: 'Materiais',
        empresaId: empresa3.id,
        acaoId: acaoEmpresa11.acaoId,
        status: 'Reprovado',
        motivoReprovacao: 'Tipo de material incorreto.',
      },
      // Doação para a Ação 9 (Empresa 4)
      {
        data: new Date('2024-08-29T11:00:00Z'),
        valor: 1000.00,
        tipo: 'Dinheiro',
        empresaId: empresa4.id,
        acaoId: acaoEmpresa9.acaoId,
        status: 'Pendente',
      },
      // Doação para a Ação 10 (Empresa 4)
      {
        data: new Date('2024-08-30T15:00:00Z'),
        valor: 0.00,
        tipo: 'Serviço',
        empresaId: empresa4.id,
        acaoId: acaoEmpresa10.acaoId,
        status: 'Aprovado',
      },
      // Doação para a NOVA AÇÃO 12 (Empresa 4 - Única doação)
      {
        data: new Date('2024-09-15T10:00:00Z'),
        valor: 0.00,
        tipo: 'Voluntariado',
        empresaId: empresa4.id,
        acaoId: acaoEmpresa12.acaoId,
        status: 'Aprovado',
      },
    ],
  });
  console.log('Doações criadas com sucesso!');
}

seed()
  .then(() => {
    console.log('Banco de dados populado com sucesso!');
  })
  .catch((e) => {
    console.error('Erro ao popular o banco de dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

