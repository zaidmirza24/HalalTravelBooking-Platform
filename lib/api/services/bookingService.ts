/**
 * Booking Service
 * Handles all booking-related operations
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../apiConfig';
import type {
  PrebookParams,
  PrebookResponse,
  BookingParams,
  Booking,
  BookingListParams,
  CancelBookingParams,
  CancelBookingResponse,
} from '../types/booking.types';

/**
 * Pre-validate booking before final confirmation
 */
export const prebook = async (
  params: PrebookParams
): Promise<PrebookResponse> => {
  try {
    const response = await apiClient.post<{ data: PrebookResponse }>(
      API_ENDPOINTS.PREBOOK,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('[BookingService] Prebook failed:', error);
    throw error;
  }
};

/**
 * Confirm and create booking
 */
export const createBooking = async (
  params: BookingParams
): Promise<Booking> => {
  try {
    const response = await apiClient.post<{ data: Booking }>(
      API_ENDPOINTS.BOOK,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('[BookingService] Booking creation failed:', error);
    throw error;
  }
};

/**
 * Get list of bookings
 */
export const getBookings = async (
  params?: BookingListParams
): Promise<Booking[]> => {
  try {
    const response = await apiClient.get<{ data: Booking[] }>(
      API_ENDPOINTS.BOOKINGS_LIST,
      params
    );
    return response.data.data;
  } catch (error) {
    console.error('[BookingService] Failed to fetch bookings:', error);
    throw error;
  }
};

/**
 * Get single booking details
 */
export const getBookingDetails = async (
  bookingId: string
): Promise<Booking> => {
  try {
    const response = await apiClient.get<{ data: Booking }>(
      API_ENDPOINTS.BOOKING_DETAILS(bookingId)
    );
    return response.data.data;
  } catch (error) {
    console.error('[BookingService] Failed to fetch booking details:', error);
    throw error;
  }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (
  params: CancelBookingParams
): Promise<CancelBookingResponse> => {
  try {
    const response = await apiClient.delete<{ data: CancelBookingResponse }>(
      API_ENDPOINTS.CANCEL_BOOKING(params.bookingId)
    );
    return response.data.data;
  } catch (error) {
    console.error('[BookingService] Failed to cancel booking:', error);
    throw error;
  }
};

export const bookingService = {
  prebook,
  createBooking,
  getBookings,
  getBookingDetails,
  cancelBooking,
};

export default bookingService;
