/**
 * Search Types
 * TypeScript interfaces for LiteAPI search and rates
 */

export interface HotelRateParams {
  hotelIds: string[];
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  currency: string;
  guestNationality: string;
  adults: number;
  children?: number;
  childrenAges?: number[];
  rooms?: number;
}

export interface HotelRate {
  hotelId: string;
  hotelName?: string;
  currency: string;
  rooms: RoomRate[];
  cheapestRate?: number;
}

export interface RoomRate {
  roomId: string;
  roomName: string;
  roomTypeId?: string;
  mealPlan?: string;
  cancellationPolicies?: CancellationPolicy[];
  price: {
    amount: number;
    currency: string;
  };
  totalPrice?: {
    amount: number;
    currency: string;
  };
  offerId?: string;
  session?: string;
}

export interface CancellationPolicy {
  from: string;
  to?: string;
  amount?: number;
  type?: 'FULL_CHARGE' | 'PERCENTAGE' | 'NIGHTS';
}

export interface MinRateParams {
  hotelIds: string[];
  checkin: string;
  checkout: string;
  currency: string;
  guestNationality: string;
  adults: number;
  children?: number;
}

export interface MinRate {
  hotelId: string;
  currency: string;
  price: number;
}

export interface RatesResponse {
  data: HotelRate[];
}

export interface MinRatesResponse {
  data: MinRate[];
}
