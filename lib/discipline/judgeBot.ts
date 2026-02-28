export function checkDiscipline(trustScore: number, disputeCount: number): 'NORMAL' | 'GOZLEM' | 'KARA_LISTE' {
  // Robotik Karar Mekanizması
  if (disputeCount >= 3 || trustScore < 20) {
    return 'KARA_LISTE'; // Otomatik askıya alma önerisi
  }
  if (disputeCount >= 1 || trustScore < 40) {
    return 'GOZLEM'; // Yakın takip
  }
  return 'NORMAL';
}
