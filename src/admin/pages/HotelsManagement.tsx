import { useState, useMemo } from 'react';
import { Search, Filter, Plus, MoreVertical, Eye, Edit, Trash2, Star, MapPin } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PageHeader } from '../components/shared/PageHeader';
import { DataTable, Column } from '../components/shared/DataTable';
import { Pagination } from '../components/shared/Pagination';
import { StatusBadge, AdminStatus } from '../components/shared/StatusBadge';
import { mockHotels, Hotel, hotelStats } from '../data/hotelsMockData';

type FilterStatus = 'all' | AdminStatus;

export function HotelsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search hotels
  const filteredHotels = useMemo(() => {
    let filtered = mockHotels;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((hotel) => hotel.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query) ||
          hotel.address.toLowerCase().includes(query) ||
          hotel.certificateNumber?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
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
  const columns: Column<Hotel>[] = [
    {
      key: 'name',
      header: 'Hotel',
      sortable: true,
      render: (hotel) => (
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="font-semibold text-neutral-900 flex items-center gap-2">
              {hotel.name}
              {hotel.featured && (
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              )}
            </div>
            <div className="text-sm text-neutral-600 mt-0.5">{hotel.location}</div>
            {hotel.halalCertified && (
              <div className="text-xs text-emerald-600 mt-1">
                ✓ Halal Certified: {hotel.certificateNumber}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      width: '100px',
      render: (hotel) => (
        <div className="text-center">
          <div className="flex items-center gap-1 text-amber-600">
            <Star className="w-4 h-4 fill-amber-600" />
            <span className="font-semibold">{hotel.rating}</span>
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            {hotel.reviewCount} reviews
          </div>
        </div>
      ),
    },
    {
      key: 'pricePerNight',
      header: 'Price/Night',
      sortable: true,
      width: '120px',
      render: (hotel) => (
        <div className="font-semibold text-neutral-900">
          ${hotel.pricePerNight}
        </div>
      ),
    },
    {
      key: 'rooms',
      header: 'Rooms',
      sortable: false,
      width: '120px',
      render: (hotel) => (
        <div>
          <div className="text-sm">
            <span className="font-semibold text-emerald-600">{hotel.availableRooms}</span>
            <span className="text-neutral-500"> / {hotel.totalRooms}</span>
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">available</div>
        </div>
      ),
    },
    {
      key: 'amenities',
      header: 'Amenities',
      sortable: false,
      render: (hotel) => (
        <div className="flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-700"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-700">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '120px',
      render: (hotel) => <StatusBadge status={hotel.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      width: '80px',
      render: (hotel) => (
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
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md cursor-pointer outline-none">
                <Edit className="w-4 h-4" />
                Edit Hotel
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center gap-3 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer outline-none"
              >
                <Star className="w-4 h-4" />
                {hotel.featured ? 'Remove from Featured' : 'Add to Featured'}
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-neutral-200 my-1" />
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none">
                <Trash2 className="w-4 h-4" />
                Delete Hotel
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  // Filter tabs
  const filterTabs = [
    { value: 'all' as FilterStatus, label: 'All Hotels', count: mockHotels.length },
    { value: 'active' as FilterStatus, label: 'Active', count: hotelStats.active },
    { value: 'inactive' as FilterStatus, label: 'Inactive', count: hotelStats.inactive },
    { value: 'pending-review' as FilterStatus, label: 'Pending Review', count: hotelStats.pendingReview },
  ];

  return (
    <div>
      <PageHeader
        title="Hotels Management"
        description="Manage hotels, rooms, and availability"
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
          <div className="text-sm text-neutral-600 mb-1">Total Hotels</div>
          <div className="text-3xl font-bold text-neutral-900">{hotelStats.total}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Featured Hotels</div>
          <div className="text-3xl font-bold text-amber-600">{hotelStats.featured}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Total Rooms</div>
          <div className="text-3xl font-bold text-neutral-900">{hotelStats.totalRooms}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Available Rooms</div>
          <div className="text-3xl font-bold text-emerald-600">{hotelStats.availableRooms}</div>
        </div>
      </div>

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
            placeholder="Search by hotel name, location, address, or certificate number..."
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
        data={paginatedHotels}
        keyExtractor={(hotel) => hotel.id}
        emptyMessage="No hotels found"
      />

      {/* Pagination */}
      {filteredHotels.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredHotels.length}
          />
        </div>
      )}
    </div>
  );
}
