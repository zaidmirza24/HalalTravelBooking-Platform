/**
 * Hotel Service
 * Handles all hotel-related API operations
 */

import { apiClient } from '../client/apiClient';
import { API_ENDPOINTS } from '../client/apiConfig';
import type {
  Hotel,
  HotelDetails,
  HotelListParams,
  HotelDetailsParams,
  HotelReview,
  HotelReviewsParams,
} from '../types/hotel.types';

/**
 * Get list of hotels
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
 * Get single hotel details
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
  getHotels,
  getHotelDetails,
  getHotelReviews,
};

export default hotelService;
