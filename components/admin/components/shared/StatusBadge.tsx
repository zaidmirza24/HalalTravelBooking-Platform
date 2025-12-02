import React from 'react';

export type AdminStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'verified'
  | 'pending-review'
  | 'rejected'
  | 'active'
  | 'inactive'
  | 'draft'
  | 'archived'
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

interface StatusBadgeProps {
  status: AdminStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<AdminStatus, { bg: string; text: string; label: string }> = {
  // Booking statuses
  pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending' },
  confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Confirmed' },
  completed: { bg: 'bg-teal-100', text: 'text-teal-800', label: 'Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },

  // Verification statuses
  verified: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Verified' },
  'pending-review': { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pending Review' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },

  // General statuses
  active: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Active' },
  inactive: { bg: 'bg-neutral-100', text: 'text-neutral-800', label: 'Inactive' },
  draft: { bg: 'bg-neutral-100', text: 'text-neutral-800', label: 'Draft' },
  archived: { bg: 'bg-neutral-100', text: 'text-neutral-800', label: 'Archived' },

  // Priority levels
  low: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Low' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Medium' },
  high: { bg: 'bg-red-100', text: 'text-red-800', label: 'High' },
  urgent: { bg: 'bg-red-600', text: 'text-white', label: 'Urgent' },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export function StatusBadge({ status, size = 'md', className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium ${config.bg} ${config.text} ${sizeClasses[size]} ${className}`}
    >
      {config.label}
    </span>
  );
}
