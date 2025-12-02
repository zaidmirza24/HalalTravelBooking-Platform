import { useState } from 'react';
import { Plus, Search, MapPin, Star, Edit, Eye, Trash2, MoreVertical, Hotel as HotelIcon } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PageHeader } from '../../admin/components/shared/PageHeader';
import { EmptyState } from '../../admin/components/shared/EmptyState';
import { useAuth } from '../../contexts/AuthContext';
import { mockHotels } from '../../admin/data/hotelsMockData';

export function VendorHotels() {
  const { user } = useAuth();
  const vendorId = user?.vendorId;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter hotels by vendorId
  const vendorHotels = mockHotels.filter((hotel) => hotel.vendorId === vendorId);

  // Apply search filter
  const filteredHotels = vendorHotels.filter((hotel) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(query) ||
      hotel.location.toLowerCase().includes(query) ||
      hotel.address.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <PageHeader
        title="My Hotels"
        description="Manage your hotel properties and room availability"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" />
            Add New Hotel
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Total Properties</div>
          <div className="text-3xl font-bold text-neutral-900">{vendorHotels.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Total Rooms</div>
          <div className="text-3xl font-bold text-neutral-900">
            {vendorHotels.reduce((sum, h) => sum + h.totalRooms, 0)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Available Rooms</div>
          <div className="text-3xl font-bold text-emerald-600">
            {vendorHotels.reduce((sum, h) => sum + h.availableRooms, 0)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Average Rating</div>
          <div className="text-3xl font-bold text-amber-600">
            {vendorHotels.length > 0
              ? (vendorHotels.reduce((sum, h) => sum + h.rating, 0) / vendorHotels.length).toFixed(1)
              : '0.0'}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Hotels Grid */}
      {filteredHotels.length === 0 ? (
        <EmptyState
          icon={<HotelIcon className="w-12 h-12" />}
          title={searchQuery ? 'No hotels found' : 'No hotels yet'}
          description={
            searchQuery
              ? 'Try adjusting your search query'
              : 'Add your first hotel to start accepting bookings'
          }
          action={
            !searchQuery && (
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                <Plus className="w-4 h-4" />
                Add New Hotel
              </button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-2xl hover:border-emerald-200 transition-all duration-300"
            >
              {/* Hotel Image */}
              <div className="relative h-56 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-white/80 drop-shadow-lg" />
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {hotel.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-lg backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      Featured
                    </span>
                  )}
                  {hotel.halalCertified && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-lg backdrop-blur-sm">
                      ✓ Halal Certified
                    </span>
                  )}
                </div>

                {/* Actions Menu */}
                <div className="absolute top-4 right-4">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="p-2.5 bg-white/95 hover:bg-white rounded-xl transition-all shadow-lg hover:shadow-xl">
                        <MoreVertical className="w-4 h-4 text-neutral-700" />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[200px] bg-white rounded-xl border border-neutral-200 shadow-xl p-1.5"
                        sideOffset={5}
                        align="end"
                      >
                        <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg cursor-pointer outline-none transition-colors">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg cursor-pointer outline-none transition-colors">
                          <Edit className="w-4 h-4" />
                          Edit Hotel
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="h-px bg-neutral-200 my-1.5" />
                        <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer outline-none transition-colors">
                          <Trash2 className="w-4 h-4" />
                          Delete Hotel
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                      hotel.status === 'active'
                        ? 'bg-emerald-500/90 text-white'
                        : hotel.status === 'inactive'
                        ? 'bg-neutral-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}
                  >
                    {hotel.status === 'active' ? '● Active' : hotel.status === 'inactive' ? '● Inactive' : '● Pending'}
                  </span>
                </div>
              </div>

              {/* Hotel Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-xl text-neutral-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-neutral-600 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {hotel.location}
                  </p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-sm text-amber-700">{hotel.rating}</span>
                  </div>
                  <span className="text-sm text-neutral-600">{hotel.reviewCount} reviews</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <p className="text-xs text-emerald-700 font-medium mb-1">Available</p>
                    <p className="font-bold text-2xl text-emerald-700">
                      {hotel.availableRooms}
                      <span className="text-sm text-neutral-500 font-normal">/{hotel.totalRooms}</span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-700 font-medium mb-1">Price/Night</p>
                    <p className="font-bold text-2xl text-blue-700">${hotel.pricePerNight}</p>
                  </div>
                </div>

                {/* Amenities Preview */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-700"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-700">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <button className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 group">
                  Manage Hotel
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
