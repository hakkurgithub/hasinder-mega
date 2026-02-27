export interface TrustFactors {
  completedDeals: number;    // Tamamlanan iş sayısı
  documentAccuracy: number;  // Belge yükleme hızı ve doğruluğu (1-10)
  disputeCount: number;      // İtiraz/Sorun sayısı
  memberSinceMonths: number; // Üyelik süresi
}

export function calculateTrustScore(factors: TrustFactors): number {
  const baseScore = 50;
  const dealBonus = factors.completedDeals * 5;
  const accuracyBonus = factors.documentAccuracy * 2;
  const penalty = factors.disputeCount * 20;
  
  const finalScore = baseScore + dealBonus + accuracyBonus - penalty;
  return Math.max(0, Math.min(100, finalScore)); // 0-100 arası skor
}

export function getTrustBadge(score: number) {
  if (score >= 90) return { label: "PLATINUM", color: "#E5E4E2" };
  if (score >= 75) return { label: "GOLD", color: "#D4AF37" };
  if (score >= 50) return { label: "GÜMÜŞ", color: "#C0C0C0" };
  return { label: "STANDART", color: "#CD7F32" };
}
