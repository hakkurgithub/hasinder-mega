import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  color: 'blue' | 'gold' | 'green' | 'orange';
}

const colorVariants = {
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  gold: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

export default function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <div className={`p-6 rounded-xl border ${colorVariants[color]} backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend && <p className="text-sm mt-2 text-green-400">↑ {trend} <span className="text-gray-500">bu ay</span></p>}
        </div>
        <div className="p-3 rounded-lg bg-white/5"><Icon size={24} /></div>
      </div>
    </div>
  );
}
