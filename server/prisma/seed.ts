import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
// Importe o enum StatusApoio do Prisma Client
// O caminho pode variar dependendo da sua configuração, use o que funciona no seu projeto
import { StatusApoio } from '@prisma/client'; // Ou '../../generated/prisma/client' se for o caso

const prisma = new PrismaClient();

async function seed() {
  const saltRounds = 6;

  // 1. Criação de Usuários (já existente, mas ajustado para incluir CNPJ)
  const usersData = [
    {
      // Alice Johnson - Usuário da ONG Social Brasil
      id: 'c1a5e3c8-8240-41c1-8b0b-8cfd94b50d3a',
      cnpj: '00.000.000/0001-01',
      email: 'alice@ongsocial.com',
      senha: await hash('alicepassword123', saltRounds),
      telefone: '555-1234',
    },
    {
      // Bob Smith - Usuário da ONG Amigos da Natureza
      id: 'd9f2e709-9b6f-4e3b-b8d5-218b3b6f9d8d',
      cnpj: '00.000.000/0001-02',
      email: 'bob@amigosdanatureza.com',
      senha: await hash('bobpassword456', saltRounds),
      telefone: null,
    },
    {
      // Charlie Davis - Usuário da Empresa Tech Solutions
      id: 'ec69f192-6d5e-49f6-a09b-6a57c3282dcf',
      cnpj: '10.000.000/0001-01',
      email: 'charlie@techsolutions.com',
      senha: await hash('charliepassword789', saltRounds),
      telefone: '555-5678',
    },
    {
      // Diana Prince - Usuário da Empresa Global Corp
      id: 'f3a61b62-e1d6-42d2-9bbf-f1e6c0e52b91',
      cnpj: '20.000.000/0001-01',
      email: 'diana@globalcorp.com',
      senha: await hash('dianapassword321', saltRounds),
      telefone: '555-9876',
    },
    {
      // Eve Thompson - Usuário da Prefeitura Municipal
      id: 'a2d67db2-6d5e-49f6-a19b-6a57c3283dac',
      cnpj: '30.000.000/0001-01',
      email: 'eve@prefeitura.com',
      senha: await hash('evepassword654', saltRounds),
      telefone: '555-4321',
    },
  ];
  await prisma.usuario.createMany({ data: usersData });
  console.log('Users created successfully');

  // 2. Criação de ONGs
  const ong1 = await prisma.oNG.create({
    data: {
      nome: 'ONG Social Brasil',
      causa: 'Apoio Social',
      ods: 'ODS 1, ODS 2',
      usuarioId: usersData[0].id, // Alice Johnson
    },
  });

  const ong2 = await prisma.oNG.create({
    data: {
      nome: 'Amigos da Natureza',
      causa: 'Meio Ambiente',
      ods: 'ODS 13, ODS 15',
      usuarioId: usersData[1].id, // Bob Smith
    },
  });
  console.log('ONGs created successfully');

  // 3. Criação de Empresas
  const empresa1 = await prisma.empresa.create({
    data: {
      nome: 'Tech Solutions Ltda.',
      usuarioId: usersData[2].id, // Charlie Davis
      pontos: 100,
    },
  });

  const empresa2 = await prisma.empresa.create({
    data: {
      nome: 'Global Corp S.A.',
      usuarioId: usersData[3].id, // Diana Prince
      pontos: 50,
    },
  });
  console.log('Empresas created successfully');

  // 4. Criação de Prefeituras (se necessário para Apoio)
  const prefeitura1 = await prisma.prefeitura.create({
    data: {
      nome: 'Prefeitura Municipal de Exemplo',
      usuarioId: usersData[4].id, // Eve Thompson
    },
  });
  console.log('Prefeituras created successfully');

  // 5. Criação de Ações (Oportunidades de Doação)
  const acao1 = await prisma.acao.create({
    data: {
      nome: 'Campanha Inverno Solidário',
      descricao: 'Ajude famílias em situação de vulnerabilidade com roupas e cobertores.',
      ongId: ong1.id,
    },
  });

  const acao2 = await prisma.acao.create({
    data: {
      nome: 'Projeto Verde Esperança',
      descricao: 'Foco na sustentabilidade e plantio de árvores em áreas urbanas.',
      ongId: ong2.id,
    },
  });

  const acao3 = await prisma.acao.create({
    data: {
      nome: 'Alimento para Todos',
      descricao: 'Distribuição de cestas básicas para comunidades carentes.',
      ongId: ong1.id,
    },
  });

  const acao4 = await prisma.acao.create({
    data: {
      nome: 'Projeto Ajuda Animal',
      descricao: 'Foco na proteção e cuidado de animais em situação de risco.',
      ongId: ong2.id,
    },
  });
  console.log('Acoes created successfully');

  // 6. Criação de Apoios (Doações Detalhadas)
  await prisma.apoio.createMany({
    data: [
      // Apoio 1: Empresa 1 para Acao 1 - PENDENTE (primeira doação)
      {
        data: new Date('2024-07-01T10:00:00Z'),
        valor: 150.00,
        tipoAjuda: 'Dinheiro',
        empresaId: empresa1.id,
        ongId: ong1.id,
        acaoId: acao1.id,
        status: StatusApoio.PENDENTE,
        prefeituraId: null,
      },
      // Apoio 2: Empresa 1 para Acao 1 - APROVADO (segunda doação)
      {
        data: new Date('2024-07-15T11:30:00Z'),
        valor: 200.00,
        tipoAjuda: 'Roupas',
        empresaId: empresa1.id,
        ongId: ong1.id,
        acaoId: acao1.id,
        status: StatusApoio.APROVADO,
        prefeituraId: null,
      },
      // Apoio 3: Empresa 1 para Acao 1 - APROVADO (terceira doação)
      {
        data: new Date('2024-07-20T14:00:00Z'),
        valor: 50.00,
        tipoAjuda: 'Alimento',
        empresaId: empresa1.id,
        ongId: ong1.id,
        acaoId: acao1.id,
        status: StatusApoio.APROVADO,
        prefeituraId: null,
      },
      // Apoio 4: Empresa 2 para Acao 2 - CONTATO_INICIAL (apenas iniciou contato)
      {
        data: new Date('2024-07-25T09:00:00Z'),
        valor: 0.00, // Valor 0 para contato inicial
        tipoAjuda: 'Contato',
        empresaId: empresa2.id,
        ongId: ong2.id,
        acaoId: acao2.id,
        status: StatusApoio.CONTATO_INICIAL,
        prefeituraId: null,
      },
      
      // Apoio 5: Empresa 1 para Acao 3 - REJEITADO
      {
        data: new Date('2024-07-28T16:00:00Z'),
        valor: 100.00,
        tipoAjuda: 'Serviço',
        empresaId: empresa1.id,
        ongId: ong1.id,
        acaoId: acao3.id,
        status: StatusApoio.REJEITADO,
        prefeituraId: null,
      },
      // Apoio 6: Empresa 2 para Acao 3 - PENDENTE
      {
        data: new Date('2024-08-01T08:00:00Z'),
        valor: 75.00,
        tipoAjuda: 'Dinheiro',
        empresaId: empresa2.id,
        ongId: ong1.id,
        acaoId: acao3.id,
        status: StatusApoio.PENDENTE,
        prefeituraId: null,
      },
      // Apoio 7: Empresa 1 para Acao 2 - APROVADO
      {
        data: new Date('2024-08-05T10:00:00Z'),
        valor: 300.00,
        tipoAjuda: 'Dinheiro',
        empresaId: empresa1.id,
        ongId: ong2.id,
        acaoId: acao2.id,
        status: StatusApoio.APROVADO,
        prefeituraId: null,
      },
      // Apoio 8: Empresa 2 para Acao 4 - APROVADO
      {
        data: new Date('2024-07-25T09:00:00Z'),
        valor: 340.00, 
        tipoAjuda: 'Dinheiro',
        empresaId: empresa2.id,
        ongId: ong2.id,
        acaoId: acao4.id,
        status: StatusApoio.APROVADO,
        prefeituraId: null,
      },
      // Apoio 9: Empresa 2 para Acao 4 - CONTATO_INICIAL
      {
        data: new Date('2024-07-25T09:00:00Z'),
        valor: 340.00, 
        tipoAjuda: 'Dinheiro',
        empresaId: empresa2.id,
        ongId: ong2.id,
        acaoId: acao4.id,
        status: StatusApoio.APROVADO,
        prefeituraId: null,
      },
    ],
  });
  console.log('Apoios created successfully');
}

seed()
  .then(() => {
    console.log('Database successfully seeded');
  })
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

