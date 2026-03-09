import { execSync } from 'child_process';
import path from 'path';

console.log('[v0] Starting Prisma setup...');

try {
  // Step 1: Generate Prisma Client
  console.log('[v0] Generating Prisma Client...');
  execSync('npx prisma generate', {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
  console.log('[v0] ✓ Prisma Client generated');

  // Step 2: Push schema to database
  console.log('[v0] Pushing schema to database...');
  execSync('npx prisma db push --skip-generate', {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
  console.log('[v0] ✓ Database schema pushed');

  console.log('[v0] ✓ All done! Prisma is ready.');
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
