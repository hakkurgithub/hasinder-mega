import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ status: "UP", memory: process.memoryUsage().heapUsed });
}
