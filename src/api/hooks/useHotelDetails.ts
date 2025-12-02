/**
 * useHotelDetails Hook
 * Fetch single hotel details with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { HotelDetails } from '../types/hotel.types';
import type { ApiError } from '../types';

export const useHotelDetails = (
  hotelId: string,
  options?: Omit<UseQueryOptions<HotelDetails, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelDetails, ApiError>({
    queryKey: ['hotel', hotelId],
    queryFn: () => hotelService.getHotelDetails({ hotelId }),
    enabled: !!hotelId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
