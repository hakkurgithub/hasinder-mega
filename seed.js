const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@hasinsan.org' },
    update: {},
    create: {
      email: 'admin@hasinsan.org',
      name: 'Admin Has İnsan',
      password: 'has-insan-2026', // Canlıda mutlaka değiştirilmeli
      isAdmin: true,
      role: 'ADMIN'
    }
  });

  await prisma.demand.create({
    data: {
      title: 'TİB Ağı İlk Test Talebi',
      amount: 1000,
      status: 'BEKLEMEDE',
      creatorId: user.id
    }
  });

  console.log('✅ Has İnsan verisi mühürlendi!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
