/**
 * Mock Data Adapters
 * Transform between LiteAPI format and internal mock data format
 * This allows seamless switching between real and mock data
 */

import type { Hotel, HotelDetails } from '../api/types/hotel.types';
import type { HotelRate } from '../api/types/search.types';

/**
 * Map LiteAPI Hotel to internal Package format
 */
export const mapHotelToPackage = (hotel: Hotel | HotelDetails) => {
  // LiteAPI uses different field names than our original mock data
  const image = hotel.main_photo || hotel.hotelImages?.[0]?.url || '';
  const starRating = hotel.stars || hotel.starRating || 4.0;
  const userRating = hotel.rating || starRating;
  const reviewCount = hotel.reviewCount || 0;

  return {
    id: hotel.id,
    title: hotel.name,
    location: hotel.city && (hotel.countryCode || hotel.country)
      ? `${hotel.city}, ${hotel.countryCode || hotel.country}`
      : hotel.address || 'Unknown location',
    rating: userRating,
    reviews: reviewCount,
    description: hotel.hotelDescription || '',
    image: image,
    badges: determineBadges(hotel) as Array<'halal' | 'prayer-room' | 'family-friendly' | 'no-alcohol' | 'women-only'>,
    price: 0, // Will be populated from rates API
    priceLabel: 'per night' as const,
  };
};

/**
 * Map LiteAPI Hotel to internal Destination format
 */
export const mapHotelToDestination = (hotel: Hotel) => {
  const image = hotel.main_photo || hotel.hotelImages?.[0]?.url || '';
  const starRating = hotel.stars || hotel.starRating || 3;

  return {
    id: parseInt(hotel.id) || hotel.id,
    name: hotel.city || hotel.name,
    country: hotel.countryCode || hotel.country || 'Unknown',
    image: image,
    badge: starRating >= 4 ? ('featured' as const) : undefined,
  };
};

/**
 * Map Hotel Rate to Package with pricing
 */
export const mapHotelRateToPackage = (rate: HotelRate, hotel?: Hotel) => {
  const cheapestRoom = rate.rooms.reduce((min, room) =>
    room.price.amount < min.price.amount ? room : min
  );

  return {
    id: rate.hotelId,
    title: rate.hotelName || hotel?.name || 'Hotel',
    location: hotel?.city || 'Unknown',
    rating: hotel?.starRating || 4.0,
    reviews: 0,
    description: hotel?.hotelDescription || '',
    image: hotel?.hotelImages?.[0]?.url || '',
    badges: hotel ? determineBadges(hotel) : ['halal' as const],
    price: cheapestRoom.price.amount,
    priceLabel: 'per night' as const,
  };
};

/**
 * Determine halal-related badges based on hotel facilities
 */
const determineBadges = (hotel: Hotel | HotelDetails): Array<'halal' | 'prayer-room' | 'family-friendly' | 'no-alcohol' | 'women-only'> => {
  const badges: Array<'halal' | 'prayer-room' | 'family-friendly' | 'no-alcohol' | 'women-only'> = [];

  const facilitiesText = hotel.facilities?.map(f => f.name.toLowerCase()).join(' ') || '';
  const descriptionText = hotel.hotelDescription?.toLowerCase() || '';

  const allText = `${facilitiesText} ${descriptionText}`;

  // Check for prayer room
  if (allText.includes('prayer') || allText.includes('muslim')) {
    badges.push('prayer-room');
  }

  // Check for halal food
  if (allText.includes('halal')) {
    badges.push('halal');
  }

  // Check for family friendly
  if (allText.includes('family')) {
    badges.push('family-friendly');
  }

  // Check for no alcohol
  if (allText.includes('alcohol-free') || allText.includes('no alcohol')) {
    badges.push('no-alcohol');
  }

  // Check for women-only facilities
  if (allText.includes('women-only') || allText.includes('women only')) {
    badges.push('women-only');
  }

  // Default badge if no specific halal features found
  if (badges.length === 0) {
    badges.push('halal');
  }

  return badges;
};

/**
 * Map internal search params to LiteAPI format
 */
export const mapSearchParamsToLiteAPI = (params: {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}) => {
  return {
    checkin: params.checkIn || new Date().toISOString().split('T')[0],
    checkout: params.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    currency: 'USD',
    guestNationality: 'US',
    adults: params.guests || 2,
    rooms: params.rooms || 1,
  };
};
