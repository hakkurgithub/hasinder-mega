export function generateOTP(): string {
  // 6 haneli güvenli doğrulama kodu üretir
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function validateAction(userOTP: string, systemOTP: string): boolean {
  // KVKK İlke Kararı gereği kodların eşleşmesi şarttır
  return userOTP === systemOTP;
}
