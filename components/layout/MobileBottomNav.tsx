import React from 'react';
import Link from 'next/link';
import { Home, Search, Heart, Briefcase, User } from 'lucide-react';

export function MobileBottomNav({ activePage = 'home' }: { activePage?: string }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'search', icon: Search, label: 'Search', path: '/search' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist', path: '/dashboard' },
    { id: 'trips', icon: Briefcase, label: 'Trips', path: '/dashboard' },
    { id: 'profile', icon: User, label: 'Profile', path: '/dashboard' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-emerald-600' : 'text-neutral-600'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-emerald-600/20' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
