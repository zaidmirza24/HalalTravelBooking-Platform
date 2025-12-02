/**
 * Data Service
 * Handles supporting data (cities, countries, facilities, etc.)
 */

import { apiClient } from '../client/apiClient';
import { API_ENDPOINTS } from '../client/apiConfig';
import type {
  City,
  Country,
  Currency,
  HotelType,
  HotelChain,
  Place,
  CitiesParams,
  Facility,
  FacilitiesResponse,
} from '../types/data.types';

/**
 * Get list of cities
 */
export const getCities = async (params?: CitiesParams): Promise<City[]> => {
  try {
    const response = await apiClient.get<{ data: City[] }>(
      API_ENDPOINTS.CITIES,
      { params }
    );
    return response.data.data;
  } catch (error) {
    console.error('[DataService] Failed to fetch cities:', error);
    throw error;
  }
};

/**
 * Get list of countries
 */
export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await apiClient.get<{ data: Country[] }>(
      API_ENDPOINTS.COUNTRIES
    );
    return response.data.data;
  } catch (error) {
    console.error('[DataService] Failed to fetch countries:', error);
    throw error;
  }
};

/**
 * Get list of currencies
 */
export const getCurrencies = async (): Promise<Currency[]> => {
  try {
    const response = await apiClient.get<{ data: Currency[] }>(
      API_ENDPOINTS.CURRENCIES
    );
    return response.data.data;
  } catch (error) {
    console.error('[DataService] Failed to fetch currencies:', error);
    throw error;
  }
};

/**
 * Get list of hotel types
 */
export const getHotelTypes = async (): Promise<HotelType[]> => {
  try {
    const response = await apiClient.get<{ data: HotelType[] }>(
      API_ENDPOINTS.HOTEL_TYPES
    );
    return response.data.data;
  } catch (error) {
    console.error('[DataService] Failed to fetch hotel types:', error);
    throw error;
  }
};

/**
 * Get list of facilities
 */
export const getFacilities = async (): Promise<Facility[]> => {
  try {
    const response = await apiClient.get<FacilitiesResponse>(
      API_ENDPOINTS.HOTEL_FACILITIES
    );
    return response.data.data;
  } catch (error) {
    console.error('[DataService] Failed to fetch facilities:', error);
    throw error;
  }
};

export const dataService = {
  getCities,
  getCountries,
  getCurrencies,
  getHotelTypes,
  getFacilities,
};

export default dataService;
