/**
 * useHotelById Hook
 * Fetch single hotel details using SDK-based API with TanStack Query
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { hotelService } from '../services/hotelService';
import type { HotelDetails } from '../types/hotel.types';
import type { ApiError } from '../types';

/**
 * Hook to fetch hotel details by ID using the new SDK-based route
 * @param hotelId - Hotel ID
 * @param options - React Query options
 */
export const useHotelById = (
  hotelId: string | undefined | null,
  options?: Omit<UseQueryOptions<HotelDetails, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<HotelDetails, ApiError>({
    queryKey: ['hotel', hotelId],
    queryFn: () => {
      if (!hotelId) {
        throw new Error('Hotel ID is required');
      }
      return hotelService.getHotelById(hotelId);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (hotel details change less frequently)
    enabled: !!hotelId, // Only run if we have a hotel ID
    ...options,
  });
};

export default useHotelById;
