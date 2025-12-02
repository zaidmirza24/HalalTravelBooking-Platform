import { DollarSign, Calendar, ShieldCheck, Users } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { StatsCard } from '../components/shared/StatsCard';
import { dashboardStats } from '../data/adminMockData';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${dashboardStats.totalRevenue.value.toLocaleString()}`,
      trend: dashboardStats.totalRevenue.trend,
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      iconBgColor: 'bg-emerald-100',
    },
    {
      title: 'Active Bookings',
      value: dashboardStats.activeBookings.value,
      trend: dashboardStats.activeBookings.trend,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      iconBgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Verifications',
      value: dashboardStats.pendingVerifications.value,
      trend: dashboardStats.pendingVerifications.trend,
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      iconBgColor: 'bg-amber-100',
    },
    {
      title: 'Total Users',
      value: dashboardStats.totalUsers.value.toLocaleString(),
      trend: dashboardStats.totalUsers.trend,
      icon: <Users className="w-6 h-6 text-teal-600" />,
      iconBgColor: 'bg-teal-100',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Overview of your admin panel"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

      {/* Quick Info */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Welcome to the Admin Panel</h2>
        <p className="text-neutral-600 mb-4">
          This is your centralized hub for managing the Halal Travel & Booking Platform.
        </p>
        <p className="text-sm text-neutral-500">
          More features and detailed analytics coming soon...
        </p>
      </div>
    </div>
  );
}
