import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const odsList = [
  { titulo: 'Erradicação da pobreza' },
  { titulo: 'Fome zero e agricultura sustentável' },
  { titulo: 'Saúde e bem-estar' },
  { titulo: 'Educação de qualidade' },
  { titulo: 'Igualdade de gênero' },
  { titulo: 'Água potável e saneamento' },
  { titulo: 'Energia limpa e acessível' },
  { titulo: 'Trabalho decente e crescimento econômico' },
  { titulo: 'Indústria, inovação e infraestrutura' },
  { titulo: 'Redução das desigualdades' },
  { titulo: 'Cidades e comunidades sustentáveis' },
  { titulo: 'Consumo e produção responsáveis' },
  { titulo: 'Ação contra a mudança global do clima' },
  { titulo: 'Vida na água' },
  { titulo: 'Vida terrestre' },
  { titulo: 'Paz, justiça e instituições eficazes' },
  { titulo: 'Parcerias e meios de implementação' }
];

async function main() {
  for (const ods of odsList) {
    await prisma.oDS.upsert({
      where: { titulo: ods.titulo },
      update: {},
      create: ods,
    });
  }
  console.log('✅ Seed executado com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
