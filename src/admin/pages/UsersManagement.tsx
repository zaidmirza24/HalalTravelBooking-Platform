import { useState, useMemo } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, Edit, Shield, Ban, CheckCircle } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PageHeader } from '../components/shared/PageHeader';
import { DataTable, Column } from '../components/shared/DataTable';
import { Pagination } from '../components/shared/Pagination';
import { StatusBadge, AdminStatus } from '../components/shared/StatusBadge';
import { mockUsers, User, userStats } from '../data/usersMockData';

type FilterStatus = 'all' | AdminStatus;

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query) ||
          user.country.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
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
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-emerald-700">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium text-neutral-900 flex items-center gap-2">
              {user.name}
              {user.role === 'admin' && (
                <Shield className="w-3.5 h-3.5 text-amber-600" />
              )}
              {user.role === 'superadmin' && (
                <Shield className="w-3.5 h-3.5 text-red-600" />
              )}
              {user.verified && (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              )}
            </div>
            <div className="text-sm text-neutral-600">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      sortable: false,
      width: '150px',
      render: (user) => (
        <div className="text-sm text-neutral-700">{user.phone}</div>
      ),
    },
    {
      key: 'country',
      header: 'Country',
      sortable: true,
      width: '140px',
      render: (user) => (
        <div className="text-sm text-neutral-700">{user.country}</div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      width: '100px',
      render: (user) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${
          user.role === 'superadmin'
            ? 'bg-red-100 text-red-800'
            : user.role === 'admin'
            ? 'bg-amber-100 text-amber-800'
            : 'bg-neutral-100 text-neutral-800'
        }`}>
          {user.role}
        </span>
      ),
    },
    {
      key: 'totalBookings',
      header: 'Bookings',
      sortable: true,
      width: '100px',
      render: (user) => (
        <div className="text-center">
          <div className="font-semibold text-neutral-900">{user.totalBookings}</div>
          <div className="text-xs text-neutral-500">bookings</div>
        </div>
      ),
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      sortable: true,
      width: '120px',
      render: (user) => (
        <div className="font-semibold text-neutral-900">
          ${user.totalSpent.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      sortable: true,
      width: '120px',
      render: (user) => (
        <div className="text-sm text-neutral-700">
          {new Date(user.lastLogin).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '120px',
      render: (user) => <StatusBadge status={user.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      width: '80px',
      render: (user) => (
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
                View Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-md cursor-pointer outline-none">
                <Edit className="w-4 h-4" />
                Edit User
              </DropdownMenu.Item>
              {!user.verified && (
                <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer outline-none">
                  <CheckCircle className="w-4 h-4" />
                  Verify User
                </DropdownMenu.Item>
              )}
              <DropdownMenu.Separator className="h-px bg-neutral-200 my-1" />
              {user.status === 'active' ? (
                <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none">
                  <Ban className="w-4 h-4" />
                  Suspend User
                </DropdownMenu.Item>
              ) : (
                <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer outline-none">
                  <CheckCircle className="w-4 h-4" />
                  Activate User
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  // Filter tabs
  const filterTabs = [
    { value: 'all' as FilterStatus, label: 'All Users', count: mockUsers.length },
    { value: 'active' as FilterStatus, label: 'Active', count: userStats.active },
    { value: 'inactive' as FilterStatus, label: 'Inactive', count: userStats.inactive },
    { value: 'pending-review' as FilterStatus, label: 'Pending Review', count: userStats.pendingReview },
  ];

  return (
    <div>
      <PageHeader
        title="Users Management"
        description="Manage user accounts and permissions"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Export Users
          </button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-neutral-900">{userStats.total}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Verified Users</div>
          <div className="text-3xl font-bold text-emerald-600">{userStats.verified}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Total Bookings</div>
          <div className="text-3xl font-bold text-neutral-900">{userStats.totalBookings}</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="text-sm text-neutral-600 mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-emerald-600">
            ${userStats.totalRevenue.toLocaleString()}
          </div>
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
            placeholder="Search by name, email, phone, or country..."
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
        data={paginatedUsers}
        keyExtractor={(user) => user.id}
        emptyMessage="No users found"
      />

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
          />
        </div>
      )}
    </div>
  );
}
