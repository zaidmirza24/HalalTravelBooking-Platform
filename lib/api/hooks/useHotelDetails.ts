/**
 * useHotelDetails Hook
 * Fetch single hotel details with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { HotelDetails, HotelDetailsParams } from '../types/hotel.types';
import type { ApiError } from '../types';

export const useHotelDetails = (
  params: HotelDetailsParams,
  options?: Omit<UseQueryOptions<HotelDetails, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelDetails, ApiError>({
    queryKey: ['hotel', params.hotelId],
    queryFn: () => hotelService.getHotelDetails(params),
    enabled: !!params.hotelId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
