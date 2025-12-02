/**
 * Search Service
 * Handles hotel search and rates operations
 */

import { apiClient } from '../client/apiClient';
import { API_ENDPOINTS } from '../client/apiConfig';
import type {
  HotelRateParams,
  HotelRate,
  MinRateParams,
  MinRate,
  RatesResponse,
  MinRatesResponse,
} from '../types/search.types';

/**
 * Get hotel rates with full details
 */
export const getHotelRates = async (
  params: HotelRateParams
): Promise<HotelRate[]> => {
  try {
    const response = await apiClient.post<RatesResponse>(
      API_ENDPOINTS.HOTEL_RATES,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('[SearchService] Failed to fetch hotel rates:', error);
    throw error;
  }
};

/**
 * Get minimum rates for quick price comparison
 */
export const getMinimumRates = async (
  params: MinRateParams
): Promise<MinRate[]> => {
  try {
    const response = await apiClient.post<MinRatesResponse>(
      API_ENDPOINTS.HOTEL_MIN_RATES,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('[SearchService] Failed to fetch minimum rates:', error);
    throw error;
  }
};

export const searchService = {
  getHotelRates,
  getMinimumRates,
};

export default searchService;
