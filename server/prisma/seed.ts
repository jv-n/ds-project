import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seed completo...');
  // --- 1. Limpeza Completa do Banco (na ordem 100% correta) ---
  console.log('Limpando dados antigos...');
  // Apagamos os "filhos" e dependentes primeiro
  await prisma.documento.deleteMany();
  await prisma.doacao.deleteMany();
  await prisma.acaoEmpresa.deleteMany();
  await prisma.selo.deleteMany();
  
  // Agora podemos apagar os "pais"
  await prisma.empresa.deleteMany();
  await prisma.usuario.deleteMany();
  console.log('Dados antigos limpos com sucesso.');

  // --- 2. Criação de um Usuário e Empresa de Teste ---
  console.log('Criando usuário e empresa de teste...');
  const senhaHash = await hash('senha.forte123', 6);

  const empresaCriada = await prisma.empresa.create({
    data: {
      nome: 'Tech for Good Brasil',
      pontuacao: 120,
      numColaboradores: 42,
      odsId: [4, 8, 10],
      usuario: {
        create: {
          cnpj: '12.345.678/0001-99',
          email: 'contato@techforgood.com.br',
          senha: senhaHash,
          telefone: '11987654321',
          perfil: 'empresa',
        },
      },
    },
    include: { usuario: true },
  });
  console.log(`Empresa "${empresaCriada.nome}" criada.`);

  // --- 3. Criação de uma Ação de Teste para a Empresa ---
  console.log('Criando ação de doação...');
  const acaoCriada = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 1, // se isso referenciar outra tabela, crie esse registro primeiro
      nome: 'Campanha do Agasalho 2025',
      descricao: 'Arrecadação de fundos para a compra de cobertores.',
      nomeOng: 'ONG Noites Felizes',
      emailOng: 'contato@noitesfelizes.org',
      telefoneOng: '21912345678',
      odsAcao: [1, 10],
      empresaId: empresaCriada.id,
    },
  });
  console.log(`Ação "${acaoCriada.nome}" criada.`);

  // --- 4. Criação de Selos, Doações Aprovadas, Reprovadas e Pendentes ---
  console.log('Criando selos e doações de teste...');

  await prisma.selo.create({
    data: {
      nivel: 'Bronze',
      descricao: 'Selo de Compromisso',
      pontuacaoMin: 100,
      empresaId: empresaCriada.id,
    },
  });

  // Doação já Aprovada
  await prisma.doacao.create({
    data: {
      data: new Date('2025-08-14T10:00:00Z'),
      valor: 75.5,
      tipo: 'Cartão',
      status: 'Aprovada',
      empresaId: empresaCriada.id,
      acaoId: acaoCriada.acaoId,
      documentos: {
        create: {
          storedName: 'doc_aprovado.pdf',
          mimetype: 'application/pdf',
          size: 123,
          path: 'uploads/doc.pdf',
        },
      },
    },
  });

  // Doação já Reprovada
  await prisma.doacao.create({
    data: {
      data: new Date('2025-08-13T11:00:00Z'),
      valor: 200.0,
      tipo: 'TED',
      status: 'Reprovada',
      motivoReprovacao: 'Comprovante ilegível.',
      empresaId: empresaCriada.id,
      acaoId: acaoCriada.acaoId,
      documentos: {
        create: {
          storedName: 'doc_reprovado.jpg',
          mimetype: 'image/jpeg',
          size: 123,
          path: 'uploads/doc.jpg',
        },
      },
    },
  });

  // 5 Doações Pendentes (gera um array e usa Promise.all para evitar await in loop)
  const pendingDonations = Array.from({ length: 5 }, (_, index) => {
    const i = index + 1;
    return {
      data: new Date(),
      valor: 100 + i * 10,
      tipo: 'PIX',
      status: 'Pendente',
      empresaId: empresaCriada.id,
      acaoId: acaoCriada.acaoId,
      documentos: {
        create: {
          storedName: `doc_pendente_${i}.png`,
          mimetype: 'image/png',
          size: 123,
          path: `uploads/doc_${i}.png`,
        },
      },
    };
  });
  console.log(`Empresa "${empresaCriada.nome}" criada.`);

  await Promise.all(
    pendingDonations.map((d) => prisma.doacao.create({ data: d })),
  );

  // --- 3. Criação de uma Ação de Teste para a Empresa ---
  console.log('Criando ação de doação...');
  const acaoCriada = await prisma.acaoEmpresa.create({
    data: {
      acaoId: 1, // ID fixo para a campanha
      nome: 'Campanha do Agasalho 2025',
      descricao: 'Arrecadação de fundos para a compra de cobertores.',
      nomeOng: 'ONG Noites Felizes',
      emailOng: 'contato@noitesfelizes.org',
      telefoneOng: '21912345678',
      odsAcao: [1, 10],
      empresaId: empresaCriada.id,
    },
  });
  console.log(`Ação "${acaoCriada.nome}" criada.`);

  // --- 4. Criação de Selos, Doações Aprovadas, Reprovadas e Pendentes ---
  console.log('Criando selos e doações de teste...');

  await prisma.selo.create({
    data: { nivel: 'Bronze', descricao: 'Selo de Compromisso', pontuacaoMin: 100, empresaId: empresaCriada.id },
  });
  
  // Doação já Aprovada
  await prisma.doacao.create({
    data: { data: new Date('2025-08-14T10:00:00Z'), valor: 75.5, tipo: 'Cartão', status: 'Aprovada', empresaId: empresaCriada.id, acaoId: acaoCriada.acaoId, documentos: { create: { storedName: 'doc_aprovado.pdf', mimetype: 'application/pdf', size: 123, path: 'uploads/doc.pdf' } } },
  });

  // Doação já Reprovada
  await prisma.doacao.create({
    data: { data: new Date('2025-08-13T11:00:00Z'), valor: 200.0, tipo: 'TED', status: 'Reprovada', motivoReprovacao: 'Comprovante ilegível.', empresaId: empresaCriada.id, acaoId: acaoCriada.acaoId, documentos: { create: { storedName: 'doc_reprovado.jpg', mimetype: 'image/jpeg', size: 123, path: 'uploads/doc.jpg' } } },
  });

  // 5 Doações Pendentes
  for (let i = 1; i <= 5; i++) {
    await prisma.doacao.create({
      data: {
        data: new Date(),
        valor: 100 + i * 10,
        tipo: 'PIX',
        status: 'Pendente',
        empresaId: empresaCriada.id,
        acaoId: acaoCriada.acaoId,
        documentos: { create: { storedName: `doc_pendente_${i}.png`, mimetype: 'image/png', size: 123, path: `uploads/doc_${i}.png` } },
      },
    });
  }
  console.log('Selos e 7 doações (1 aprovada, 1 reprovada, 5 pendentes) criadas com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed finalizado com sucesso. Banco de dados populado do zero.');
  })
  .catch(async (e) => {
    console.error('Ocorreu um erro durante o processo de seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
