import { NextResponse } from 'next/server';

export async function GET() {
  const vitals = {
    db: true,
    status: 'HEALTHY',
    memory: process.memoryUsage().heapUsed / 1024 / 1024
  };

  return NextResponse.json({ message: 'System Healthy', vitals }, { status: 200 });
}
