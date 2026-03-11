import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'Sunucu yapılandırma hatası: JWT_SECRET eksik' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Geçersiz bilgiler' });

    const isValid = await bcrypt.compare(password, user.password);
    // İlk kurulum için düz metin kontrolü (isteğe bağlı)
    const isPlainValid = password === user.password; 

    if (!isValid && !isPlainValid) {
      return res.status(401).json({ error: 'Geçersiz bilgiler' });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.setHeader('Set-Cookie', serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
      path: '/',
    }));

    return res.status(200).json({ success: true, isAdmin: user.isAdmin });
  } catch (error) {
    return res.status(500).json({ error: 'İşlem başarısız' });
  }
}
