import React from 'react';
import { Leaf, Users, Wine, Moon, Sparkles } from 'lucide-react';

interface BadgeProps {
  type: 'halal' | 'no-alcohol' | 'prayer-room' | 'family-friendly' | 'women-only' | 'featured' | 'new';
}

const badgeConfig = {
  'halal': {
    label: 'Halal',
    icon: Leaf,
    className: 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200',
  },
  'prayer-room': {
    label: 'Prayer Room',
    icon: Moon,
    className: 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border border-purple-200',
  },
  'family-friendly': {
    label: 'Family',
    icon: Users,
    className: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200',
  },
  'no-alcohol': {
    label: 'No Alcohol',
    icon: Wine,
    className: 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border border-rose-200',
  },
  'women-only': {
    label: 'Women Only',
    icon: Sparkles,
    className: 'bg-gradient-to-r from-pink-50 to-fuchsia-50 text-pink-700 border border-pink-200',
  },
  'featured': {
    label: 'Featured',
    icon: Sparkles,
    className: 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200',
  },
  'new': {
    label: 'New',
    icon: Sparkles,
    className: 'bg-gradient-to-r from-cyan-50 to-sky-50 text-cyan-700 border border-cyan-200',
  },
};

export function Badge({ type }: BadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105 ${config.className}`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
}
