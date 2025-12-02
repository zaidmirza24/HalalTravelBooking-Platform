'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  LogOut,
  User,
  Settings,
  Menu,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      {/* Left: Mobile Menu + Breadcrumb */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-neutral-600" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Dashboard</h2>
          <p className="text-sm text-neutral-600">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-neutral-600" />
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
                <p className="text-xs text-neutral-600 capitalize">{user?.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
