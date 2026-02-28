export interface AnnualXRay {
  totalTurnover: number;    // Toplam Ticaret Hacmi
  collectedCommissions: number; // Kasaya Giren Komisyon
  accruedPayouts: number;   // Teslimatı Onaylanmış, Ödeme Bekleyen
  netOperationalProfit: number; // Platform Net Kârı
}

export function generateXRayReport(data: any[]): AnnualXRay {
  // 28.02.2026 Mali denetim kurallarina gore hesaplama yapar
  const totalTurnover = data.reduce((s, c) => s + c.amount, 0);
  const collectedCommissions = totalTurnover * 0.03; // Örn: %3 brüt komisyon
  const netOperationalProfit = collectedCommissions * 0.25; // %25 Şirket payı
  
  return {
    totalTurnover,
    collectedCommissions,
    accruedPayouts: collectedCommissions - netOperationalProfit,
    netOperationalProfit
  };
}
