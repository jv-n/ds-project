const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // List all users
    const users = await prisma.user.findMany();
    console.log('✅ Users table exists, found:', users.length, 'users');
    
    // Test File table
    const files = await prisma.file.findMany();
    console.log('✅ File table exists, found:', files.length, 'files');
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
