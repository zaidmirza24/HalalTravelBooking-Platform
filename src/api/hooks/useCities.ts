/**
 * useCities Hook
 * Fetch cities for autocomplete
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { dataService } from '../services/dataService';
import type { City, CitiesParams } from '../types/data.types';
import type { ApiError } from '../types';

export const useCities = (
  params?: CitiesParams,
  options?: Omit<UseQueryOptions<City[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<City[], ApiError>({
    queryKey: ['cities', params],
    queryFn: () => dataService.getCities(params),
    staleTime: 30 * 60 * 1000, // 30 minutes (cities don't change often)
    enabled: params?.search ? params.search.length >= 2 : true, // Only search if 2+ chars
    ...options,
  });
};
