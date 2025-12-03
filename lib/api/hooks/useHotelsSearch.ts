/**
 * useHotelsSearch Hook
 * Search hotels using SDK-based API with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { Hotel, HotelListParams } from '../types/hotel.types';
import type { ApiError } from '../types';

/**
 * Hook to search hotels using the new SDK-based route
 * @param params - Search parameters (countryCode or cityName required)
 * @param options - React Query options
 */
export const useHotelsSearch = (
  params: HotelListParams,
  options?: Omit<UseQueryOptions<Hotel[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Hotel[], ApiError>({
    queryKey: ['hotels-search', params],
    queryFn: () => hotelService.searchHotels(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!(params.countryCode || params.cityName), // Only run if we have search criteria
    ...options,
  });
};

export default useHotelsSearch;
