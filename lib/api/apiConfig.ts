/**
 * API Endpoints Configuration
 * Centralized definition of all LiteAPI endpoints
 */

export const API_ENDPOINTS = {
  // ===== NEW SDK-BASED ROUTES (Recommended) =====
  // Hotel Search & Details
  HOTELS_SEARCH: '/hotels', // GET - Search hotels (SDK-based)
  HOTEL_BY_ID: (id: string) => `/hotel/${id}`, // GET - Hotel details (SDK-based)
  RATES_CHECK: '/rates', // POST - Check rates & availability (SDK-based)

  // ===== LEGACY ROUTES (Old Implementation) =====
  // Hotel Data (Legacy - keeping for backward compatibility)
  HOTELS_LIST: '/data/hotels',
  HOTEL_DETAILS: '/data/hotel',
  HOTEL_REVIEWS: '/data/reviews',
  HOTEL_FACILITIES: '/data/facilities',
  HOTEL_TYPES: '/data/hotelTypes',
  HOTEL_CHAINS: '/data/hotelChains',

  // Search (Legacy)
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
