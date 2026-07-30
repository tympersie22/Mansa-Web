import { AdminRole, PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const displayName = process.env.ADMIN_NAME?.trim() || 'Mansa OS Administrator';

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required.');
  }
  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: displayName, passwordHash: await hash(password, 12), active: true },
    create: { email, name: displayName, passwordHash: await hash(password, 12), active: true },
  });

  await prisma.adminProfile.upsert({
    where: { userId: user.id },
    update: { companyId: 'mansa', role: AdminRole.super_admin, displayName },
    create: { userId: user.id, companyId: 'mansa', role: AdminRole.super_admin, displayName },
  });

  console.log(`Provisioned ${email} as a Mansa super administrator.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
