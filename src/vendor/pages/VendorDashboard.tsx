import { DollarSign, CalendarCheck, Hotel, Star, TrendingUp, Users } from 'lucide-react';
import { PageHeader } from '../../admin/components/shared/PageHeader';
import { useAuth } from '../../contexts/AuthContext';
import { mockHotels } from '../../admin/data/hotelsMockData';
import { mockBookings } from '../../admin/data/bookingsMockData';

export function VendorDashboard() {
  const { user } = useAuth();
  const vendorId = user?.vendorId;

  // Filter data by vendorId
  const vendorHotels = mockHotels.filter((hotel) => hotel.vendorId === vendorId);
  const vendorBookings = mockBookings.filter((booking) =>
    vendorHotels.some((hotel) => hotel.id === booking.hotelId)
  );

  // Calculate stats
  const totalProperties = vendorHotels.length;
  const activeBookings = vendorBookings.filter((b) => b.status === 'confirmed').length;
  const totalRevenue = vendorBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const averageRating = vendorHotels.length > 0
    ? vendorHotels.reduce((sum, hotel) => sum + hotel.rating, 0) / vendorHotels.length
    : 0;
  const totalReviews = vendorHotels.reduce((sum, hotel) => sum + hotel.reviewCount, 0);
  const totalRooms = vendorHotels.reduce((sum, hotel) => sum + hotel.totalRooms, 0);
  const availableRooms = vendorHotels.reduce((sum, hotel) => sum + hotel.availableRooms, 0);

  // Recent bookings (last 5)
  const recentBookings = vendorBookings.slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your properties."
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-neutral-900">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Active Bookings</p>
              <p className="text-3xl font-bold text-neutral-900">{activeBookings}</p>
              <p className="text-xs text-neutral-500 mt-2">
                {vendorBookings.length} total bookings
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">My Properties</p>
              <p className="text-3xl font-bold text-neutral-900">{totalProperties}</p>
              <p className="text-xs text-neutral-500 mt-2">
                {totalRooms} rooms total
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Hotel className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-neutral-900">{averageRating.toFixed(1)}</p>
              <p className="text-xs text-neutral-500 mt-2">
                {totalReviews} reviews
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Properties Overview */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">My Properties</h3>
          <div className="space-y-4">
            {vendorHotels.length === 0 ? (
              <div className="text-center py-8">
                <Hotel className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">No properties yet</p>
                <button className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Add your first property
                </button>
              </div>
            ) : (
              vendorHotels.map((hotel) => (
                <div key={hotel.id} className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Hotel className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">{hotel.name}</p>
                    <p className="text-sm text-neutral-600">{hotel.location}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-neutral-500">
                        <span className="font-semibold text-emerald-600">{hotel.availableRooms}</span>/{hotel.totalRooms} available
                      </span>
                      <span className="text-xs text-amber-600 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-600" />
                        {hotel.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm text-neutral-500">No bookings yet</p>
              </div>
            ) : (
              recentBookings.map((booking) => {
                const hotel = vendorHotels.find((h) => h.id === booking.hotelId);
                return (
                  <div key={booking.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900">{booking.guestName}</p>
                      <p className="text-sm text-neutral-600">{hotel?.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {booking.checkIn} - {booking.checkOut}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">${booking.totalAmount}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : booking.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Room Availability */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Room Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600 mb-1">Total Rooms</p>
            <p className="text-3xl font-bold text-neutral-900">{totalRooms}</p>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <p className="text-sm text-emerald-700 mb-1">Available</p>
            <p className="text-3xl font-bold text-emerald-600">{availableRooms}</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-700 mb-1">Occupied</p>
            <p className="text-3xl font-bold text-amber-600">{totalRooms - availableRooms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
