import { useState, useMemo } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, CheckCircle, XCircle } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PageHeader } from '../components/shared/PageHeader';
import { DataTable, Column } from '../components/shared/DataTable';
import { Pagination } from '../components/shared/Pagination';
import { StatusBadge, AdminStatus } from '../components/shared/StatusBadge';
import { mockBookings, Booking, bookingStats } from '../data/bookingsMockData';

type FilterStatus = 'all' | AdminStatus;

export function BookingsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    let filtered = mockBookings;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((booking) => booking.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.bookingRef.toLowerCase().includes(query) ||
          booking.user.name.toLowerCase().includes(query) ||
          booking.user.email.toLowerCase().includes(query) ||
          booking.title.toLowerCase().includes(query) ||
          booking.destination.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Table columns
  const columns: Column<Booking>[] = [
    {
      key: 'bookingRef',
      header: 'Booking Ref',
      sortable: true,
      width: '120px',
      render: (booking) => (
        <span className="font-mono text-xs font-semibold text-emerald-600">
          {booking.bookingRef}
        </span>
      ),
    },
    {
      key: 'user',
      header: 'Guest',
      sortable: false,
      render: (booking) => (
        <div>
          <div className="font-medium text-neutral-900">{booking.user.name}</div>
          <div className="text-xs text-neutral-500">{booking.user.email}</div>
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Booking Details',
      sortable: true,
      render: (booking) => (
        <div>
          <div className="font-medium text-neutral-900">{booking.title}</div>
          <div className="text-xs text-neutral-500">{booking.destination}</div>
          <div className="text-xs text-neutral-400 mt-0.5">
            {new Date(booking.checkIn).toLocaleDateString()} -{' '}
            {new Date(booking.checkOut).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      width: '100px',
      render: (booking) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-neutral-100 text-neutral-800 capitalize">
          {booking.type}
        </span>
      ),
    },
    {
      key: 'guests',
      header: 'Guests',
      sortable: true,
      width: '80px',
      render: (booking) => (
        <span className="text-neutral-700">{booking.guests}</span>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Amount',
      sortable: true,
      width: '120px',
      render: (booking) => (
        <div>
          <div className="font-semibold text-neutral-900">
            ${booking.totalAmount.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-500 capitalize">{booking.paymentStatus}</div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '120px',
      render: (booking) => <StatusBadge status={booking.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      width: '80px',
      render: (booking) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-neutral-600" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[200px] bg-white rounded-lg border border-neutral-200 shadow-lg p-1"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md cursor-pointer outline-none">
                <Eye className="w-4 h-4" />
                View Details
              </DropdownMenu.Item>
              {booking.status === 'pending' && (
                <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer outline-none">
                  <CheckCircle className="w-4 h-4" />
                  Confirm Booking
                </DropdownMenu.Item>
              )}
              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none">
                  <XCircle className="w-4 h-4" />
                  Cancel Booking
                </DropdownMenu.Item>
              )}
              <DropdownMenu.Separator className="h-px bg-neutral-200 my-1" />
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md cursor-pointer outline-none">
                <Download className="w-4 h-4" />
                Export Details
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  // Filter tabs
  const filterTabs = [
    { value: 'all' as FilterStatus, label: 'All Bookings', count: mockBookings.length },
    { value: 'pending' as FilterStatus, label: 'Pending', count: bookingStats.pending },
    { value: 'confirmed' as FilterStatus, label: 'Confirmed', count: bookingStats.confirmed },
    { value: 'completed' as FilterStatus, label: 'Completed', count: bookingStats.completed },
    { value: 'cancelled' as FilterStatus, label: 'Cancelled', count: bookingStats.cancelled },
  ];

  return (
    <div>
      <PageHeader
        title="Bookings Management"
        description="View and manage all customer bookings"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Export All
          </button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-200">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab.value)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              filterStatus === tab.value
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filterStatus === tab.value
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by booking ref, guest name, email, or destination..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 h-11 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-sm text-neutral-700">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedBookings}
        keyExtractor={(booking) => booking.id}
        emptyMessage="No bookings found"
      />

      {/* Pagination */}
      {filteredBookings.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredBookings.length}
          />
        </div>
      )}
    </div>
  );
}
