import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnızca POST destekleniyor' });
  }

  try {
    const { email, name, password } = req.body;

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // JWT’den admin bilgisini al
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ error: 'Admin token bulunamadı' });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const currentAdminId = decoded.id;

    // Log ekle
    await prisma.adminLog.create({
      data: {
        action: 'Yeni kullanıcı oluşturuldu',
        details: email,
        adminId: currentAdminId,
      },
    });

    return res.status(200).json({ message: 'Kullanıcı başarıyla oluşturuldu', user: newUser });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
}
