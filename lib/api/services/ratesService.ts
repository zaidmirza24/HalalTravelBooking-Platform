/**
 * Rates Service
 * Handles hotel rates and availability checking
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../apiConfig';

/**
 * Rates Request Parameters
 */
export interface RatesParams {
  hotelIds: string[];
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
  currency: string;
  guestNationality: string;
  occupancies: Array<{
    rooms: number;
    adults: number;
    children?: number[];
  }>;
  guestId?: string;
}

/**
 * Rate Information
 */
export interface Rate {
  rateId: string;
  occupancyNumber: number;
  name: string;
  maxOccupancy: number;
  adultCount: number;
  childCount: number;
  childrenAges: number[];
  boardType: string;
  boardName: string;
  remarks?: string;
  priceType: string;
  commission?: Array<{ amount: number; currency: string }>;
  retailRate: {
    total: Array<{ amount: number; currency: string }>;
    suggestedSellingPrice?: Array<{ amount: number; currency: string; source?: string }>;
    initialPrice: Array<{ amount: number; currency: string }>;
    taxesAndFees: Array<{
      included: boolean;
      description: string;
      amount: number;
      currency: string;
    }>;
  };
  cancellationPolicies: {
    cancelPolicyInfos: Array<{
      cancelTime: string;
      amount: number;
      currency: string;
      type: string;
      timezone?: string;
    }>;
    hotelRemarks: string[];
    refundableTag: string; // 'RFN' | 'NRFN'
  };
  paymentTypes: string[];
  providerCommission?: { amount: number; currency: string };
  perks?: any[];
}

/**
 * Room Type with Rates
 */
export interface RoomType {
  roomTypeId: string;
  offerId: string;
  supplier: string;
  supplierId: number;
  rates: Rate[];
  offerRetailRate: { amount: number; currency: string };
  suggestedSellingPrice?: { amount: number; currency: string; source?: string };
  offerInitialPrice: { amount: number; currency: string };
  priceType: string;
  rateType: string;
  paymentTypes: string[];
}

/**
 * Hotel Rates Response
 */
export interface HotelRates {
  hotelId: string;
  roomTypes: RoomType[];
}

/**
 * Rates API Response
 */
export interface RatesResponse {
  status: string;
  data: {
    data: HotelRates[];
  };
}

/**
 * Check hotel rates and availability
 * @param params - Rates parameters
 * @returns Array of hotel rates with room types
 */
export const checkRates = async (params: RatesParams): Promise<HotelRates[]> => {
  try {
    const response = await apiClient.post<RatesResponse>(
      API_ENDPOINTS.RATES_CHECK,
      params
    );
    return response.data.data.data;
  } catch (error) {
    console.error('[RatesService] Failed to check rates:', error);
    throw error;
  }
};

/**
 * Get minimum rate for a hotel
 * Helper function to extract the cheapest rate
 */
export const getMinimumRate = (hotelRates: HotelRates): Rate | null => {
  if (!hotelRates.roomTypes || hotelRates.roomTypes.length === 0) {
    return null;
  }

  let minRate: Rate | null = null;
  let minAmount = Infinity;

  for (const roomType of hotelRates.roomTypes) {
    for (const rate of roomType.rates) {
      const totalAmount = rate.retailRate.total[0]?.amount || 0;
      if (totalAmount < minAmount) {
        minAmount = totalAmount;
        minRate = rate;
      }
    }
  }

  return minRate;
};

/**
 * Format date to YYYY-MM-DD
 */
export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ratesService = {
  checkRates,
  getMinimumRate,
  formatDateForAPI,
};

export default ratesService;
