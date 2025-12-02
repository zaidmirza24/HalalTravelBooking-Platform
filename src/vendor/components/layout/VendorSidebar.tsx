import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  LayoutDashboard,
  Hotel,
  CalendarDays,
  BookOpen,
  Star,
  BarChart3,
  Wallet,
  User,
  Settings,
  Store,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/vendor/dashboard' },
  { id: 'hotels', label: 'My Hotels', icon: Hotel, href: '/vendor/hotels' },
  { id: 'bookings', label: 'Bookings', icon: BookOpen, href: '/vendor/bookings' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '/vendor/calendar' },
  { id: 'reviews', label: 'Reviews', icon: Star, href: '/vendor/reviews' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/vendor/analytics' },
  { id: 'payouts', label: 'Payouts', icon: Wallet, href: '/vendor/payouts' },
  { id: 'profile', label: 'Profile', icon: User, href: '/vendor/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/vendor/settings' },
];

export function VendorSidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-neutral-200 flex-col">
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-emerald-600" />
          <div>
            <h1 className="text-lg font-bold text-neutral-900">HalalTravel</h1>
            <p className="text-xs text-neutral-600">Vendor Portal</p>
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
                to={item.href}
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
            {user?.name?.charAt(0).toUpperCase() || 'V'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">{user?.name || 'Vendor'}</p>
            <p className="text-xs text-neutral-600 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
