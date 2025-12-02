/**
 * useBooking Hooks
 * Manage booking operations with TanStack Query mutations
 */

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { bookingService } from '../services/bookingService';
import type {
  PrebookParams,
  PrebookResponse,
  BookingParams,
  Booking,
  BookingListParams,
  CancelBookingParams,
  CancelBookingResponse,
} from '../types/booking.types';
import type { ApiError } from '../types';

/**
 * Prebook mutation
 */
export const usePrebook = () => {
  return useMutation<PrebookResponse, ApiError, PrebookParams>({
    mutationFn: (params) => bookingService.prebook(params),
  });
};

/**
 * Create booking mutation
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, ApiError, BookingParams>({
    mutationFn: (params) => bookingService.createBooking(params),
    onSuccess: () => {
      // Invalidate bookings list to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

/**
 * Get bookings list
 */
export const useBookings = (
  params?: BookingListParams,
  options?: Omit<UseQueryOptions<Booking[], ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Booking[], ApiError>({
    queryKey: ['bookings', params],
    queryFn: () => bookingService.getBookings(params),
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options,
  });
};

/**
 * Get single booking details
 */
export const useBookingDetails = (
  bookingId: string,
  options?: Omit<UseQueryOptions<Booking, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<Booking, ApiError>({
    queryKey: ['booking', bookingId],
    queryFn: () => bookingService.getBookingDetails(bookingId),
    enabled: !!bookingId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

/**
 * Cancel booking mutation
 */
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<CancelBookingResponse, ApiError, CancelBookingParams>({
    mutationFn: (params) => bookingService.cancelBooking(params),
    onSuccess: () => {
      // Invalidate bookings to refetch updated list
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
