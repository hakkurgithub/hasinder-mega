import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Kayıt ve Giriş sayfalarına her zaman izin ver (Döngü Kırıcı)
  if (pathname === '/giris' || pathname === '/kayit') {
    if (token) return NextResponse.redirect(new URL('/panel', request.url));
    return NextResponse.next();
  }

  // Panel koruması
  if (!token && (pathname.startsWith('/panel') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/giris', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/panel/:path*', '/admin/:path*', '/giris', '/kayit'],
};
