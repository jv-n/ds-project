const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testUserRepository() {
  try {
    console.log('Testing User repository operations...');
    
    // Test findAll - this should work if the table exists
    const users = await prisma.user.findMany();
    console.log('✅ prisma.user.findMany() works, found:', users.length, 'users');
    
    // Test finding a specific user by id
    if (users.length > 0) {
      const firstUser = await prisma.user.findUnique({ where: { id: users[0].id } });
      console.log('✅ prisma.user.findUnique() works, found user:', firstUser?.email);
    }
    
  } catch (error) {
    console.error('❌ User repository error:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testUserRepository();
