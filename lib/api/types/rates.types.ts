/**
 * Rates Types
 * TypeScript interfaces for LiteAPI rates and pricing data
 */

export interface RatesRequestParams {
  hotelIds: string[];
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  currency: string;
  guestNationality: string;
  occupancies: Occupancy[];
  guestId?: string;
}

export interface Occupancy {
  rooms: number;
  adults: number;
  children?: number[];
}

export interface RoomRate {
  roomId: string;
  roomName: string;
  roomTypeId?: number;
  rateKey: string;
  rateType: string;
  boardType?: string;
  boardName?: string;
  priceBeforeDiscount?: number;
  price: number;
  taxes?: number;
  currency: string;
  cancellationPolicy?: CancellationPolicy;
  amenities?: string[];
  bedGroups?: BedGroup[];
  maxOccupancy?: number;
  remainingRooms?: number;
  roomDescription?: string;
  dailyRates?: DailyRate[];
}

export interface BedGroup {
  id: string;
  description: string;
  configuration?: BedConfiguration[];
}

export interface BedConfiguration {
  type: string;
  size: string;
  quantity: number;
}

export interface DailyRate {
  date: string;
  price: number;
}

export interface CancellationPolicy {
  cancelPolicyInfos?: CancellationInfo[];
  hotelRemarks?: string[];
  refundable: boolean;
}

export interface CancellationInfo {
  fromDate: string;
  toDate?: string;
  percentage?: number;
  amount?: number;
}

export interface HotelRates {
  hotelId: string;
  hotelName?: string;
  currency: string;
  rooms: RoomRate[];
  minRate?: number;
  maxRate?: number;
  taxes?: number;
  totalPrice?: number;
}

export interface RatesResponse {
  status: string;
  data: HotelRates[];
}
