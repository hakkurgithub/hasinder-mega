export interface FinancialSummary {
  totalVolume: number;    // Toplam İşlem Hacmi
  grossCommission: number; // Brüt Komisyon Kazancı
  payoutsPending: number; // Dağıtılacak Hakedişler
  netProfit: number;      // Platform Net Kârı
}

export function generateMonthlyReport(transactions: any[]): FinancialSummary {
  const totalVolume = transactions.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
  const grossCommission = transactions.reduce((acc, curr) => acc + (curr.commissionAmount || 0), 0);
  
  // Platformun kestiği % hizmet bedeli sonrası net kâr analizi (Örn: %20 platform payı)
  const netProfit = grossCommission * 0.20; 
  const payoutsPending = grossCommission - netProfit;

  return { totalVolume, grossCommission, payoutsPending, netProfit };
}
