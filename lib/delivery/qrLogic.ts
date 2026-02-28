export function generateDeliveryToken(mediationId: string) {
  // İşlem ID ve Zaman Damgası ile eşsiz bir token üretir
  const timestamp = Math.floor(Date.now() / 60000); // 1 dakikalık geçerlilik
  return `TIB-QR-${mediationId}-${timestamp}`;
}

export function verifyDelivery(token: string, currentToken: string) {
  // Mahkemede kanıt olacak doğrulama mantığı
  return token === currentToken;
}
