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
