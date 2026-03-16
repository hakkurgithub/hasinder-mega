import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Sadece admin path'lerini kontrol et
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // /admin/login sayfasına erişime izin ver (herkese açık)
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Token yoksa admin login sayfasına yönlendir
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    
    if (!payload.isAdmin) {
      // Admin değilse ana sayfaya
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token geçersizse admin login sayfasına
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*']
};
