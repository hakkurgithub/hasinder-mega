export interface MarketStats {
  sector: string;
  demandCount: number;
  totalVolume: number; // Ton veya Adet bazlı hacim
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export function analyzeTrends(demands: any[]): MarketStats[] {
  const sectors = ["INSAAT", "GIDA", "TEKSTIL", "ENERJI"];
  
  return sectors.map(sector => {
    const sectorDemands = demands.filter(d => d.sector === sector);
    return {
      sector,
      demandCount: sectorDemands.length,
      totalVolume: sectorDemands.reduce((acc, curr) => acc + (curr.amount || 0), 0),
      trend: sectorDemands.length > 5 ? 'UP' : 'STABLE'
    };
  });
}
