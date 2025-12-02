/**
 * useHotelReviews Hook
 * Fetch hotel reviews with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { HotelReview, HotelReviewsParams } from '../types/hotel.types';
import type { ApiError } from '../types';

export const useHotelReviews = (
  params: HotelReviewsParams,
  options?: Omit<UseQueryOptions<HotelReview[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelReview[], ApiError>({
    queryKey: ['hotelReviews', params.hotelId, params.limit, params.offset],
    queryFn: () => hotelService.getHotelReviews(params),
    enabled: !!params.hotelId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
