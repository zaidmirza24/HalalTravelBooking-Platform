// Dashboard KPIs
export const dashboardStats = {
  totalRevenue: { value: 245680, trend: 12.5 },
  activeBookings: { value: 156, trend: 8.3 },
  pendingVerifications: { value: 12, trend: -5.2 },
  totalUsers: { value: 3420, trend: 15.7 },
};

// Revenue data (12 months)
export const revenueData = [
  { month: 'Jan', value: 18500 },
  { month: 'Feb', value: 21200 },
  { month: 'Mar', value: 19800 },
  { month: 'Apr', value: 23400 },
  { month: 'May', value: 25100 },
  { month: 'Jun', value: 22900 },
  { month: 'Jul', value: 26800 },
  { month: 'Aug', value: 24500 },
  { month: 'Sep', value: 21700 },
  { month: 'Oct', value: 23900 },
  { month: 'Nov', value: 27200 },
  { month: 'Dec', value: 29600 },
];

// Bookings by status
export const bookingsByStatus = [
  { name: 'Upcoming', value: 85, color: '#059669' },
  { name: 'Completed', value: 234, color: '#0D9488' },
  { name: 'Cancelled', value: 12, color: '#EF4444' },
];

// Popular destinations
export const popularDestinations = [
  { name: 'Istanbul', bookings: 145 },
  { name: 'Dubai', bookings: 132 },
  { name: 'Makkah', bookings: 98 },
  { name: 'Maldives', bookings: 87 },
  { name: 'Marrakech', bookings: 76 },
  { name: 'Kuala Lumpur', bookings: 65 },
];

// Recent bookings
export const recentBookings = [
  {
    id: 'HT-2024-12345',
    customer: {
      name: 'Amina Khan',
      email: 'amina.khan@example.com',
      avatar: 'AK',
    },
    package: 'Luxury Istanbul Discovery',
    date: '2024-12-15',
    status: 'confirmed',
    amount: 2846,
  },
  {
    id: 'HT-2024-12346',
    customer: {
      name: 'Mohammed Ali',
      email: 'm.ali@example.com',
      avatar: 'MA',
    },
    package: 'Maldives Paradise Retreat',
    date: '2025-01-10',
    status: 'pending',
    amount: 4997,
  },
  {
    id: 'HT-2024-12347',
    customer: {
      name: 'Fatima Rahman',
      email: 'f.rahman@example.com',
      avatar: 'FR',
    },
    package: 'Premium Umrah Package',
    date: '2024-12-20',
    status: 'confirmed',
    amount: 4097,
  },
  {
    id: 'HT-2024-12348',
    customer: {
      name: 'Yusuf Ahmed',
      email: 'yusuf.ahmed@example.com',
      avatar: 'YA',
    },
    package: 'Dubai Modern Luxury',
    date: '2025-01-05',
    status: 'confirmed',
    amount: 1799,
  },
  {
    id: 'HT-2024-12349',
    customer: {
      name: 'Aisha Hassan',
      email: 'aisha.h@example.com',
      avatar: 'AH',
    },
    package: 'Marrakech Cultural Adventure',
    date: '2024-12-28',
    status: 'pending',
    amount: 1099,
  },
];

// Pending verifications
export const pendingVerifications = [
  {
    id: 'verify-1',
    type: 'hotel',
    name: 'Marrakech Riad Resort',
    submittedBy: 'hotel.manager@example.com',
    submittedDate: '2024-11-15',
    priority: 'medium',
  },
  {
    id: 'verify-2',
    type: 'package',
    name: 'Jordan Heritage Tour',
    submittedBy: 'tour.operator@example.com',
    submittedDate: '2024-11-18',
    priority: 'high',
  },
  {
    id: 'verify-3',
    type: 'hotel',
    name: 'Cairo Nile View Hotel',
    submittedBy: 'cairo.hotels@example.com',
    submittedDate: '2024-11-20',
    priority: 'low',
  },
];
