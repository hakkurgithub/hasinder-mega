import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// HAS İNSAN DER - TİB Ağı Güvenlik Bekçisi
export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Panel ve Admin Sayfaları Koruması
  if (!token && (pathname.startsWith('/panel') || pathname.startsWith('/admin'))) {
    // Eğer token yoksa kullanıcıyı girişe fırlat
    return NextResponse.redirect(new URL('/giris', request.url));
  }

  // 2. Mükerrer Giriş Engeli
  if (token && pathname === '/giris') {
    // Zaten giriş yapmışsa panele yönlendir
    return NextResponse.redirect(new URL('/panel', request.url));
  }

  return NextResponse.next();
}

// Sadece bu sayfalarda kontrol yap (Performans için kritik)
export const config = {
  matcher: [
    '/panel/:path*', 
    '/admin/:path*', 
    '/giris'
  ],
};
