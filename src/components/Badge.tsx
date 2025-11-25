import React from 'react';
import { Check, Ban, Building2, Users, Shield } from 'lucide-react';

interface BadgeProps {
  type: 'halal' | 'no-alcohol' | 'prayer-room' | 'family-friendly' | 'women-only' | 'featured' | 'new';
  className?: string;
}

export function Badge({ type, className = '' }: BadgeProps) {
  const badges = {
    'halal': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      icon: <Check className="w-3 h-3" />,
      label: 'Halal Certified'
    },
    'no-alcohol': {
      bg: 'bg-red-50',
      text: 'text-red-900',
      icon: <Ban className="w-3 h-3" />,
      label: 'No Alcohol'
    },
    'prayer-room': {
      bg: 'bg-teal-50',
      text: 'text-teal-900',
      icon: <Building2 className="w-3 h-3" />,
      label: 'Prayer Room'
    },
    'family-friendly': {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      icon: <Users className="w-3 h-3" />,
      label: 'Family Friendly'
    },
    'women-only': {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      icon: <Shield className="w-3 h-3" />,
      label: 'Women Only'
    },
    'featured': {
      bg: 'bg-emerald-600',
      text: 'text-white',
      icon: null,
      label: 'Featured'
    },
    'new': {
      bg: 'bg-blue-600',
      text: 'text-white',
      icon: null,
      label: 'New'
    }
  };
  
  const badge = badges[type];
  
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs ${badge.bg} ${badge.text} ${className}`}>
      {badge.icon}
      {badge.label}
    </span>
  );
}
