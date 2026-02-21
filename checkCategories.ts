import { prisma } from './src/lib/prisma';

async function checkCategories() {
  try {
    const categories = await prisma.category.findMany();
    console.log('Categories in database:');
    categories.forEach(cat => {
      console.log(`- ${cat.id}: ${cat.name}`);
    });

    console.log(`\nTotal categories: ${categories.length}`);
  } catch (error) {
    console.error('Error checking categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategories();
