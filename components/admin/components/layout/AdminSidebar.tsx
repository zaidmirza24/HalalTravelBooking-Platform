'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Building2,
  Package,
  Users,
  ShieldCheck,
  FileText,
  MessageSquare,
  Settings,
  Star,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, href: '/admin/bookings' },
  { id: 'hotels', label: 'Hotels', icon: Building2, href: '/admin/hotels' },
  { id: 'packages', label: 'Packages', icon: Package, href: '/admin/packages' },
  { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
  { id: 'compliance', label: 'Halal Compliance', icon: ShieldCheck, href: '/admin/compliance' },
  { id: 'content', label: 'Content', icon: FileText, href: '/admin/content' },
  { id: 'support', label: 'Support', icon: MessageSquare, href: '/admin/support' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-neutral-200 flex-col">
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-emerald-600 fill-emerald-600" />
          <div>
            <h1 className="text-lg font-bold text-neutral-900">HalalTravel</h1>
            <p className="text-xs text-neutral-600">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  active
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 -ml-1 pl-3'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">Admin User</p>
            <p className="text-xs text-neutral-600 truncate">admin@halaltravel.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
