import { AdminStatus } from '../components/shared/StatusBadge';

export interface Booking {
  id: string;
  bookingRef: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  type: 'hotel' | 'package' | 'flight';
  title: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: AdminStatus;
  createdAt: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    bookingRef: 'HT-2025-001',
    user: {
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
    },
    type: 'hotel',
    title: 'Luxury Hotel Istanbul',
    destination: 'Istanbul, Turkey',
    checkIn: '2025-12-01',
    checkOut: '2025-12-07',
    guests: 2,
    totalAmount: 1250,
    status: 'confirmed',
    createdAt: '2025-11-20',
    paymentStatus: 'paid',
  },
  {
    id: 'BK002',
    bookingRef: 'HT-2025-002',
    user: {
      name: 'Fatima Ali',
      email: 'fatima.ali@email.com',
    },
    type: 'package',
    title: 'Umrah Package - Mecca & Medina',
    destination: 'Saudi Arabia',
    checkIn: '2025-12-15',
    checkOut: '2025-12-25',
    guests: 4,
    totalAmount: 5600,
    status: 'pending',
    createdAt: '2025-11-22',
    paymentStatus: 'pending',
  },
  {
    id: 'BK003',
    bookingRef: 'HT-2025-003',
    user: {
      name: 'Mohammed Khan',
      email: 'mohammed.khan@email.com',
    },
    type: 'hotel',
    title: 'Halal Resort Dubai',
    destination: 'Dubai, UAE',
    checkIn: '2025-11-28',
    checkOut: '2025-12-05',
    guests: 3,
    totalAmount: 2100,
    status: 'completed',
    createdAt: '2025-11-10',
    paymentStatus: 'paid',
  },
  {
    id: 'BK004',
    bookingRef: 'HT-2025-004',
    user: {
      name: 'Aisha Rahman',
      email: 'aisha.rahman@email.com',
    },
    type: 'package',
    title: 'Malaysia Cultural Tour',
    destination: 'Kuala Lumpur, Malaysia',
    checkIn: '2026-01-10',
    checkOut: '2026-01-20',
    guests: 2,
    totalAmount: 3200,
    status: 'confirmed',
    createdAt: '2025-11-18',
    paymentStatus: 'paid',
  },
  {
    id: 'BK005',
    bookingRef: 'HT-2025-005',
    user: {
      name: 'Ibrahim Yusuf',
      email: 'ibrahim.yusuf@email.com',
    },
    type: 'hotel',
    title: 'Marrakech Riad',
    destination: 'Marrakech, Morocco',
    checkIn: '2025-12-20',
    checkOut: '2025-12-27',
    guests: 5,
    totalAmount: 1800,
    status: 'cancelled',
    createdAt: '2025-11-15',
    paymentStatus: 'refunded',
  },
  {
    id: 'BK006',
    bookingRef: 'HT-2025-006',
    user: {
      name: 'Zainab Ahmed',
      email: 'zainab.ahmed@email.com',
    },
    type: 'package',
    title: 'Indonesia Island Hopping',
    destination: 'Bali, Indonesia',
    checkIn: '2026-02-01',
    checkOut: '2026-02-14',
    guests: 2,
    totalAmount: 4500,
    status: 'pending',
    createdAt: '2025-11-23',
    paymentStatus: 'pending',
  },
  {
    id: 'BK007',
    bookingRef: 'HT-2025-007',
    user: {
      name: 'Omar Abdullah',
      email: 'omar.abdullah@email.com',
    },
    type: 'hotel',
    title: 'Cairo Heritage Hotel',
    destination: 'Cairo, Egypt',
    checkIn: '2025-12-10',
    checkOut: '2025-12-17',
    guests: 4,
    totalAmount: 1400,
    status: 'confirmed',
    createdAt: '2025-11-19',
    paymentStatus: 'paid',
  },
  {
    id: 'BK008',
    bookingRef: 'HT-2025-008',
    user: {
      name: 'Layla Hassan',
      email: 'layla.hassan@email.com',
    },
    type: 'package',
    title: 'Halal Family Cruise Mediterranean',
    destination: 'Mediterranean Sea',
    checkIn: '2026-03-01',
    checkOut: '2026-03-15',
    guests: 6,
    totalAmount: 8900,
    status: 'confirmed',
    createdAt: '2025-11-21',
    paymentStatus: 'paid',
  },
  {
    id: 'BK009',
    bookingRef: 'HT-2025-009',
    user: {
      name: 'Bilal Mahmood',
      email: 'bilal.mahmood@email.com',
    },
    type: 'hotel',
    title: 'Antalya Beach Resort',
    destination: 'Antalya, Turkey',
    checkIn: '2026-01-05',
    checkOut: '2026-01-12',
    guests: 2,
    totalAmount: 950,
    status: 'pending',
    createdAt: '2025-11-24',
    paymentStatus: 'pending',
  },
  {
    id: 'BK010',
    bookingRef: 'HT-2025-010',
    user: {
      name: 'Mariam Khalil',
      email: 'mariam.khalil@email.com',
    },
    type: 'package',
    title: 'Jordan Historical Journey',
    destination: 'Petra, Jordan',
    checkIn: '2025-12-28',
    checkOut: '2026-01-04',
    guests: 3,
    totalAmount: 2700,
    status: 'confirmed',
    createdAt: '2025-11-17',
    paymentStatus: 'paid',
  },
];

export const bookingStats = {
  total: mockBookings.length,
  pending: mockBookings.filter((b) => b.status === 'pending').length,
  confirmed: mockBookings.filter((b) => b.status === 'confirmed').length,
  completed: mockBookings.filter((b) => b.status === 'completed').length,
  cancelled: mockBookings.filter((b) => b.status === 'cancelled').length,
};
