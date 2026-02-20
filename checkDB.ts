import { prisma } from './src/lib/prisma';

async function checkDB() {
  try {
    const categories = await prisma.category.findMany();
    console.log('Categories:', categories);

    const users = await prisma.user.findMany();
    console.log('Users:', users);

    console.log('Database check completed successfully!');
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDB();
