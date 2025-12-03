/**
 * useHotelSearch Hook
 * Search hotels with rates using TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { searchService } from '../services/searchService';
import type { HotelRate, HotelRateParams } from '../types/search.types';
import type { ApiError } from '../types';

export const useHotelSearch = (
  params: HotelRateParams,
  enabled = true,
  options?: Omit<UseQueryOptions<HotelRate[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelRate[], ApiError>({
    queryKey: ['hotelRates', params],
    queryFn: () => searchService.getHotelRates(params),
    enabled: enabled && params.hotelIds.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes (rates change frequently)
    ...options,
  });
};
