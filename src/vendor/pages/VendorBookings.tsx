import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, User, CheckCircle, XCircle, Clock, DollarSign, Eye, Download, MoreVertical } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PageHeader } from '../../admin/components/shared/PageHeader';
import { StatusBadge, AdminStatus } from '../../admin/components/shared/StatusBadge';
import { EmptyState } from '../../admin/components/shared/EmptyState';
import { Pagination } from '../../admin/components/shared/Pagination';
import { useAuth } from '../../contexts/AuthContext';
import { mockBookings } from '../../admin/data/bookingsMockData';
import { mockHotels } from '../../admin/data/hotelsMockData';

type FilterStatus = 'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled';

export function VendorBookings() {
  const { user } = useAuth();
  const vendorId = user?.vendorId;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter bookings by vendor's hotels
  const vendorHotels = mockHotels.filter((hotel) => hotel.vendorId === vendorId);
  const vendorBookings = mockBookings.filter((booking) =>
    vendorHotels.some((hotel) => hotel.id === booking.hotelId)
  );

  // Apply filters
  const filteredBookings = useMemo(() => {
    let filtered = vendorBookings;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((booking) => booking.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (booking) =>
          booking.guestName.toLowerCase().includes(query) ||
          booking.bookingId.toLowerCase().includes(query) ||
          booking.guestEmail.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [vendorBookings, searchQuery, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: vendorBookings.length,
    confirmed: vendorBookings.filter((b) => b.status === 'confirmed').length,
    pending: vendorBookings.filter((b) => b.status === 'pending').length,
    completed: vendorBookings.filter((b) => b.status === 'completed').length,
    cancelled: vendorBookings.filter((b) => b.status === 'cancelled').length,
    totalRevenue: vendorBookings.reduce((sum, b) => sum + b.totalAmount, 0),
  };

  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const getHotelName = (hotelId: string) => {
    return vendorHotels.find((h) => h.id === hotelId)?.name || 'Unknown Hotel';
  };

  const filterTabs = [
    { value: 'all' as FilterStatus, label: 'All Bookings', count: stats.total },
    { value: 'confirmed' as FilterStatus, label: 'Confirmed', count: stats.confirmed },
    { value: 'pending' as FilterStatus, label: 'Pending', count: stats.pending },
    { value: 'completed' as FilterStatus, label: 'Completed', count: stats.completed },
    { value: 'cancelled' as FilterStatus, label: 'Cancelled', count: stats.cancelled },
  ];

  return (
    <div>
      <PageHeader
        title="Bookings"
        description="Manage all bookings for your properties"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.confirmed}</div>
          <div className="text-emerald-100 text-sm font-medium">Confirmed Bookings</div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.pending}</div>
          <div className="text-amber-100 text-sm font-medium">Pending Review</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.total}</div>
          <div className="text-blue-100 text-sm font-medium">Total Bookings</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">${stats.totalRevenue.toLocaleString()}</div>
          <div className="text-purple-100 text-sm font-medium">Total Revenue</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-200 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab.value)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
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
            placeholder="Search by guest name, booking ID, or email..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 h-11 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-sm text-neutral-700">
          <Filter className="w-4 h-4" />
          More Filters
        </button>
        <button className="inline-flex items-center gap-2 px-4 h-11 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-12 h-12" />}
          title={searchQuery || filterStatus !== 'all' ? 'No bookings found' : 'No bookings yet'}
          description={
            searchQuery || filterStatus !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Your bookings will appear here once guests start booking'
          }
        />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Hotel
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Check-in / Check-out
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {paginatedBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-neutral-900">{booking.bookingId}</div>
                          <div className="text-sm text-neutral-600">
                            {booking.guests} guest{booking.guests > 1 ? 's' : ''} · {booking.nights} night{booking.nights > 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
                            {booking.guestName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-neutral-900">{booking.guestName}</div>
                            <div className="text-sm text-neutral-600">{booking.guestEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-900">{getHotelName(booking.hotelId)}</div>
                        <div className="text-sm text-neutral-600">{booking.roomType}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          <div>
                            <div className="text-neutral-900">{booking.checkIn}</div>
                            <div className="text-neutral-600">{booking.checkOut}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-neutral-900">${booking.totalAmount.toLocaleString()}</div>
                        <div className="text-xs text-neutral-500">
                          Commission: ${(booking.totalAmount * 0.15).toFixed(0)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status as AdminStatus} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-neutral-600" />
                            </button>
                          </DropdownMenu.Trigger>

                          <DropdownMenu.Portal>
                            <DropdownMenu.Content
                              className="min-w-[180px] bg-white rounded-lg border border-neutral-200 shadow-lg p-1"
                              sideOffset={5}
                              align="end"
                            >
                              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md cursor-pointer outline-none">
                                <Eye className="w-4 h-4" />
                                View Details
                              </DropdownMenu.Item>
                              {booking.status === 'pending' && (
                                <>
                                  <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer outline-none">
                                    <CheckCircle className="w-4 h-4" />
                                    Confirm Booking
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none">
                                    <XCircle className="w-4 h-4" />
                                    Decline Booking
                                  </DropdownMenu.Item>
                                </>
                              )}
                              <DropdownMenu.Separator className="h-px bg-neutral-200 my-1" />
                              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md cursor-pointer outline-none">
                                <Download className="w-4 h-4" />
                                Download Invoice
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}
