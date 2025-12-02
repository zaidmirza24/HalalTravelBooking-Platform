/**
 * API Endpoints Configuration
 * Centralized definition of all LiteAPI endpoints
 */

export const API_ENDPOINTS = {
  // Hotel Data
  HOTELS_LIST: '/data/hotels',
  HOTEL_DETAILS: '/data/hotel',
  HOTEL_REVIEWS: '/data/reviews',
  HOTEL_FACILITIES: '/data/facilities',
  HOTEL_TYPES: '/data/hotelTypes',
  HOTEL_CHAINS: '/data/hotelChains',

  // Search
  HOTEL_RATES: '/hotels/rates',
  HOTEL_MIN_RATES: '/hotels/min-rates',

  // Booking
  PREBOOK: '/rates/prebook',
  BOOK: '/rates/book',
  BOOKINGS_LIST: '/bookings',
  BOOKING_DETAILS: (id: string) => `/bookings/${id}`,
  CANCEL_BOOKING: (id: string) => `/bookings/${id}`,

  // Supporting Data
  CITIES: '/data/cities',
  COUNTRIES: '/data/countries',
  CURRENCIES: '/data/currencies',
  PLACES: '/data/places',
} as const;

export default API_ENDPOINTS;
