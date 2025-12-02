/**
 * useHotels Hook
 * Fetch list of hotels with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { Hotel, HotelListParams } from '../types/hotel.types';
import type { ApiError } from '../types';

export const useHotels = (
  params: HotelListParams,
  options?: Omit<UseQueryOptions<Hotel[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Hotel[], ApiError>({
    queryKey: ['hotels', params],
    queryFn: () => hotelService.getHotels(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
