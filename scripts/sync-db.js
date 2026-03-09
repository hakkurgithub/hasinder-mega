import { execSync } from 'child_process';

console.log('Starting Prisma database sync...');

try {
  // Prisma schema'sını veritabanına push et
  console.log('Running: prisma db push');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
  
  // Prisma Client'ı generate et
  console.log('Running: prisma generate');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('✅ Database sync completed successfully!');
} catch (error) {
  console.error('❌ Error during database sync:', error);
  process.exit(1);
}
