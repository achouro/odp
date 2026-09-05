const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Clear tables using exact Prisma model names (adjust if your schema uses different casing)
  try {
    await prisma.message.deleteMany();
  } catch (e) {
    // Fallback if model name is plural or lowercase
  }
  
  try {
    await prisma.participant.deleteMany();
  } catch (e) {}
  
  try {
    await prisma.conversation.deleteMany();
  } catch (e) {}
  
  try {
    await prisma.user.deleteMany();
  } catch (e) {}

  const password_hash = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      username: 'Alice',
      email: 'alice@example.com',
      passwordHash: password_hash,
      profilePicture: 'https://api.dicebear.com/7.x/critters/svg?seed=Alice'
    }
  });

  const bob = await prisma.user.create({
    data: {
      username: 'Bob',
      email: 'bob@example.com',
      passwordHash: password_hash,
      profilePicture: 'https://api.dicebear.com/7.x/critters/svg?seed=Bob'
    }
  });

  const charlie = await prisma.user.create({
    data: {
      username: 'Charlie',
      email: 'charlie@example.com',
      passwordHash: password_hash,
      profilePicture: 'https://api.dicebear.com/7.x/critters/svg?seed=Charlie'
    }
  });

  console.log('Seeded users:', { alice: alice.id, bob: bob.id, charlie: charlie.id });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });