import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV !== 'production' ? ['warn', 'error'] : [],
  errorFormat: process.env.NODE_ENV !== 'production' ? 'pretty' : 'colorless',
});

prisma
  .$connect()
  .then(() => {
    console.log('📦 Conectado com sucesso ao banco de dados');
  })
  .catch((error: Error) => {
    console.log('❌ Erro ao conectar ao banco de dados', error);
  });

export default prisma;
