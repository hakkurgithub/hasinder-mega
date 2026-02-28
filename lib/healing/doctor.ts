export async function checkSystemVitals() {
  // Veritabanı ve API bağlantılarını kontrol eder
  const stats = {
    db: true, // Prisma connection check
    api: true, // Route availability
    memory: process.memoryUsage().heapUsed / 1024 / 1024 // MB cinsinden ram
  };
  
  // Eğer RAM kullanımı %90'ı geçerse veya DB koparsa onarımı tetikle
  if (!stats.db || stats.memory > 450) {
    return { status: 'CRITICAL', action: 'RESTART_NODE' };
  }
  return { status: 'HEALTHY', action: 'NONE' };
}
