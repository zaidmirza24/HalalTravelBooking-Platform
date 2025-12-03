/**
 * useRates Hook
 * Check hotel rates and availability with TanStack Query
 */

import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ratesService, RatesParams, HotelRates } from '../services/ratesService';
import type { ApiError } from '../types';

/**
 * Hook to check rates using mutation (POST request)
 * Use this for on-demand rate checking (e.g., when user clicks "Check Availability")
 */
export const useCheckRates = (
  options?: UseMutationOptions<HotelRates[], ApiError, RatesParams>
) => {
  return useMutation<HotelRates[], ApiError, RatesParams>({
    mutationFn: (params: RatesParams) => ratesService.checkRates(params),
    ...options,
  });
};

/**
 * Hook to check rates using query (for automatic fetching)
 * Use this when you want rates to be fetched automatically and cached
 * @param params - Rates parameters
 * @param options - React Query options
 */
export const useRatesQuery = (
  params: RatesParams | null,
  options?: Omit<UseQueryOptions<HotelRates[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelRates[], ApiError>({
    queryKey: ['rates', params],
    queryFn: () => {
      if (!params) {
        throw new Error('Rates parameters are required');
      }
      return ratesService.checkRates(params);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (rates change frequently)
    enabled: !!params && params.hotelIds.length > 0, // Only run if we have hotel IDs
    ...options,
  });
};

export default useCheckRates;
