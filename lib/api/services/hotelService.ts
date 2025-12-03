/**
 * Hotel Service
 * Handles all hotel-related API operations
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../apiConfig';
import type {
  Hotel,
  HotelDetails,
  HotelListParams,
  HotelDetailsParams,
  HotelReview,
  HotelReviewsParams,
} from '../types/hotel.types';
import type {
  RatesRequestParams,
  RatesResponse,
  HotelRates,
} from '../types/rates.types';

// ===== NEW SDK-BASED METHODS (Recommended) =====

/**
 * Search hotels using SDK-based route
 * @param params - Search parameters (countryCode, cityName, limit, offset)
 * @returns Array of hotels
 */
export const searchHotels = async (params: HotelListParams): Promise<Hotel[]> => {
  try {
    const response = await apiClient.get<{ status: string; data: Hotel[] }>(
      API_ENDPOINTS.HOTELS_SEARCH,
      { params }
    );
    return response.data.data;
  } catch (error) {
    console.error('[HotelService] SDK: Failed to search hotels:', error);
    throw error;
  }
};

/**
 * Get hotel by ID using SDK-based route
 * @param hotelId - Hotel ID
 * @returns Hotel details
 */
export const getHotelById = async (hotelId: string): Promise<HotelDetails> => {
  try {
    const response = await apiClient.get<{ status: string; data: HotelDetails }>(
      API_ENDPOINTS.HOTEL_BY_ID(hotelId)
    );
    return response.data.data;
  } catch (error) {
    console.error('[HotelService] SDK: Failed to fetch hotel by ID:', error);
    throw error;
  }
};

/**
 * Get rates and availability for hotels
 * @param params - Rates request parameters
 * @returns Hotel rates and pricing information
 */
export const getRates = async (params: RatesRequestParams): Promise<HotelRates[]> => {
  try {
    const response = await apiClient.post<RatesResponse>(
      API_ENDPOINTS.RATES_CHECK,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('[HotelService] SDK: Failed to fetch rates:', error);
    throw error;
  }
};

// ===== LEGACY METHODS (Backward Compatibility) =====

/**
 * Get list of hotels (Legacy)
 */
export const getHotels = async (params: HotelListParams): Promise<Hotel[]> => {
  try {
    const response = await apiClient.get<{ data: Hotel[] }>(
      API_ENDPOINTS.HOTELS_LIST,
      { params }
    );
    return response.data.data;
  } catch (error) {
    console.error('[HotelService] Failed to fetch hotels:', error);
    throw error;
  }
};

/**
 * Get single hotel details (Legacy)
 */
export const getHotelDetails = async (
  params: HotelDetailsParams
): Promise<HotelDetails> => {
  try {
    const response = await apiClient.get<{ data: HotelDetails }>(
      API_ENDPOINTS.HOTEL_DETAILS,
      { params }
    );
    return response.data.data;
  } catch (error) {
    console.error('[HotelService] Failed to fetch hotel details:', error);
    throw error;
  }
};

/**
 * Get hotel reviews
 */
export const getHotelReviews = async (
  params: HotelReviewsParams
): Promise<HotelReview[]> => {
  try {
    const response = await apiClient.get<{ data: HotelReview[] }>(
      API_ENDPOINTS.HOTEL_REVIEWS,
      { params }
    );
    return response.data.data;
  } catch (error) {
    console.error('[HotelService] Failed to fetch reviews:', error);
    throw error;
  }
};

export const hotelService = {
  // New SDK methods
  searchHotels,
  getHotelById,
  getRates,
  // Legacy methods
  getHotels,
  getHotelDetails,
  getHotelReviews,
};

export default hotelService;
