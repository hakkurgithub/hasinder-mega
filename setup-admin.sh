#!/bin/bash

# 1. Gerekli paketleri kur
echo "📦 Paketler yükleniyor..."
npm install bcryptjs jsonwebtoken cookie prisma @prisma/client

# 2. Prisma şeması güncelle (AdminLog tablosu ekle)
echo "🗂 Prisma şeması güncelleniyor..."
cat <<EOT >> prisma/schema.prisma

model AdminLog {
  id        String   @id @default(cuid())
  action    String
  details   String?
  createdAt DateTime @default(now())
  adminId   String
  Admin     User     @relation(fields: [adminId], references: [id])
}
EOT

# 3. Prisma migrate çalıştır
echo "🔄 Prisma migrate çalıştırılıyor..."
npx prisma migrate dev --name add_admin_log

# 4. Login API route oluştur
echo "🛠 Login API route ekleniyor..."
mkdir -p pages/api
cat <<EOT > pages/api/login.ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Şifre hatalı' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.setHeader(
    'Set-Cookie',
    serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })
  );

  return res.status(200).json({ message: 'Giriş başarılı' });
}
EOT

# 5. Middleware ekle (sadece admin erişimi)
echo "🛡 Middleware ekleniyor..."
cat <<EOT > middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded.isAdmin) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/panel/:path*'],
};
EOT

# 6. Protected API route ekle
echo "🔒 Protected API route ekleniyor..."
cat <<EOT > pages/api/protected.ts
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: 'Token yok' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: 'Yetkili erişim', user: decoded });
  } catch (err) {
    return res.status(403).json({ error: 'Token geçersiz' });
  }
}
EOT

echo "✅ Kurulum tamamlandı! Şimdi .env.local dosyana JWT_SECRET eklemeyi unutma."
