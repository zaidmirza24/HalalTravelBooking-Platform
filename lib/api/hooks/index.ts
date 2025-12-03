/**
 * Hooks Index
 * Export all custom hooks from a single location
 */

// Legacy hooks
export * from './useHotels';
export * from './useHotelDetails';
export * from './useHotelReviews';
export * from './useHotelSearch';
export * from './useBooking';
export * from './useCities';

// New SDK-based hooks (Recommended)
export * from './useHotelsSearch';
export * from './useHotelById';
export * from './useRates';
