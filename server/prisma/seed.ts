import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const saltRounds = 6;

  await prisma.usuario.createMany({
    data: [
      {
       
        cnpj: '12345678000195',
        telefone: '555-1234',
        email: 'alice@example.com',
        senha: await hash('alicepassword123', saltRounds), // Senha real: 'alicepassword123'
      },
      {
        cnpj: '98765432000198',
        telefone: '555-5678',
        email: 'bob@example.com',
        senha: await hash('bobpassword456', saltRounds), // Senha real: 'bobpassword456'
      },
      {
        cnpj: '28127263000185',
        telefone: '555-1234',
        email: 'charlie@example.com',
        senha: await hash('charliepassword789', saltRounds), // Senha real: 'charliepassword789'
      },
      {
        cnpj: '34321763000156',
        telefone: '555-5678',
        email: 'diana@example.com',
        senha: await hash('dianapassword321', saltRounds), // Senha real: 'dianapassword321'
      },
      {
        cnpj: '93.668.151/0001-01',
        telefone: '555-1234',
        email: 'eve@example.com',
        senha: await hash('evepassword654', saltRounds), // Senha real: 'evepassword654'
      },
      {
        cnpj: '73.911.534/0001-43',
        telefone: '555-5678',
        email: 'frank@example.com',
        senha: await hash('frankpassword987', saltRounds), // Senha real: 'frankpassword987'
      },
      {
        cnpj: '59.061.499/0001-90',
        telefone: '555-1234',
        email: 'grace@example.com',
        senha: await hash('gracepassword852', saltRounds), // Senha real: 'gracepassword852'
      },
      {
        cnpj: '21.218.535/0001-03',
        telefone: '555-5678',
        email: 'henry@example.com',
        senha: await hash('henrypassword963', saltRounds), // Senha real: 'henrypassword963'
      },
      {
        cnpj: '43.806.737/0001-09',
        telefone: '555-1234',
        email: 'irene@example.com',
        senha: await hash('irenepassword741', saltRounds), // Senha real: 'irenepassword741'
      },
      {
        cnpj: '74.813.623/0001-10',
        telefone: '555-5678',
        email: 'john@example.com',
        senha: await hash('johnpassword369', saltRounds), // Senha real: 'johnpassword369'
      },
    ],
  });

  console.log('Users created successfully');
}

seed().then(() => {
  console.log('Database successfully seeded');
  prisma.$disconnect();
});
