import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export function StatsCard({
  title,
  value,
  trend,
  icon,
  iconBgColor = 'bg-emerald-100'
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-600">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm mt-2 ${
                trend > 0 ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBgColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
