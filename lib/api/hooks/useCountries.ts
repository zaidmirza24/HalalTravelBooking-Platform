/**
 * useCountries Hook
 * Test hook to verify API connectivity
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { dataService } from '../services/dataService';
import type { Country } from '../types/data.types';
import type { ApiError } from '../types';

export const useCountries = (
  options?: Omit<UseQueryOptions<Country[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Country[], ApiError>({
    queryKey: ['countries'],
    queryFn: () => dataService.getCountries(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  });
};
