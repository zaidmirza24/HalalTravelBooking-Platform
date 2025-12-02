/**
 * Booking Types
 * TypeScript interfaces for LiteAPI booking operations
 */

export interface PrebookParams {
  offerId: string;
  usePaymentSdk?: boolean;
}

export interface PrebookResponse {
  transactionId: string;
  hotelId: string;
  roomId: string;
  offerId: string;
  totalPrice: {
    amount: number;
    currency: string;
  };
  cancellationPolicies?: CancellationPolicy[];
  session?: string;
}

export interface CancellationPolicy {
  from: string;
  to?: string;
  amount?: number;
  type?: string;
}

export interface BookingParams {
  transactionId: string;
  holder: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  payment: {
    method: string;
    cardNumber?: string;
    cardHolderName?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvv?: string;
  };
  guests?: Guest[];
  specialRequest?: string;
}

export interface Guest {
  firstName: string;
  lastName: string;
  email?: string;
}

export interface Booking {
  bookingId: string;
  bookingReference: string;
  hotelId: string;
  hotelName: string;
  hotelConfirmationCode?: string;
  checkin: string;
  checkout: string;
  guestName: string;
  roomType: string;
  status: BookingStatus;
  totalPrice: {
    amount: number;
    currency: string;
  };
  holder: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt?: string;
  cancellationPolicies?: CancellationPolicy[];
}

export type BookingStatus =
  | 'CONFIRMED'
  | 'PENDING'
  | 'CANCELLED'
  | 'FAILED'
  | 'REJECTED';

export interface BookingListParams {
  status?: BookingStatus;
  guestEmail?: string;
  limit?: number;
  offset?: number;
}

export interface CancelBookingParams {
  bookingId: string;
}

export interface CancelBookingResponse {
  bookingId: string;
  status: 'CANCELLED';
  refundAmount?: {
    amount: number;
    currency: string;
  };
}
