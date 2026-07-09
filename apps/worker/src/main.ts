import { PrismaClient } from '@codecanvas/database';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 CodeCanvas AI Worker started');

  process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error('Worker failed:', err);
  process.exit(1);
});
