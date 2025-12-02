/**
 * useHotelReviews Hook
 * Fetch hotel reviews with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { HotelReview } from '../types/hotel.types';
import type { ApiError } from '../types';

export const useHotelReviews = (
  hotelId: string,
  limit = 10,
  offset = 0,
  options?: Omit<UseQueryOptions<HotelReview[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelReview[], ApiError>({
    queryKey: ['hotelReviews', hotelId, limit, offset],
    queryFn: () => hotelService.getHotelReviews({ hotelId, limit, offset }),
    enabled: !!hotelId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
