import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generatePrisma() {
  try {
    console.log('[v0] Generating Prisma Client from schema...');
    const { stdout, stderr } = await execAsync('npx prisma generate');
    console.log('[v0] Prisma generate output:', stdout);
    if (stderr) console.log('[v0] Warnings:', stderr);
    console.log('[v0] Prisma Client generated successfully!');
  } catch (error) {
    console.error('[v0] Failed to generate Prisma Client:', error.message);
    process.exit(1);
  }
}

generatePrisma();
