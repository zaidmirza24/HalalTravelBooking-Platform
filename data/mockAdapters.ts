/**
 * Mock Data Adapters
 * Transform between LiteAPI format and internal mock data format
 * This allows seamless switching between real and mock data
 */

import type { Hotel, HotelDetails } from '../api/types/hotel.types';
import type { HotelRate } from '../api/types/search.types';

/**
 * Validates and returns a safe image URL
 * Returns null if invalid, which will trigger the placeholder in ImageWithFallback
 */
const getSafeImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';

  // Check if it's a valid URL format
  try {
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    // If it's a relative URL, return it as-is
    if (trimmed.startsWith('/')) {
      return trimmed;
    }
  } catch {
    // Invalid URL, return empty string to trigger placeholder
  }

  return '';
};

/**
 * Get the best available image from hotel data with fallback chain
 */
const getBestHotelImage = (hotel: Hotel | HotelDetails): string => {
  // Try multiple image sources in order of preference
  const imageOptions = [
    hotel.main_photo,
    hotel.thumbnail,
    hotel.hotelImages?.[0]?.url,
    hotel.hotelImages?.[1]?.url, // Try second image as backup
  ];

  for (const imageUrl of imageOptions) {
    const safeUrl = getSafeImageUrl(imageUrl);
    if (safeUrl) return safeUrl;
  }

  // Return empty string to let ImageWithFallback handle the placeholder
  return '';
};

/**
 * Map LiteAPI Hotel to internal Package format
 */
export const mapHotelToPackage = (hotel: Hotel | HotelDetails) => {
  // Extract fields from LiteAPI response
  const image = getBestHotelImage(hotel);
  const userRating = hotel.rating || 0;
  const reviewCount = hotel.reviewCount || 0;

  // Build location string
  const location = hotel.city && hotel.country
    ? `${hotel.city}, ${hotel.country}`
    : hotel.city || hotel.address || 'Location not specified';

  // Clean description (remove HTML tags, limit length)
  const rawDescription = hotel.hotelDescription || '';
  const cleanDescription = rawDescription
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  return {
    id: hotel.id,
    title: hotel.name || 'Hotel',
    location,
    rating: userRating,
    reviews: reviewCount,
    description: cleanDescription || 'Comfortable accommodation with modern amenities',
    image,
    badges: determineBadges(hotel) as Array<'halal' | 'prayer-room' | 'family-friendly' | 'no-alcohol' | 'women-only'>,
    price: 0, // Will be populated from rates API
    priceLabel: 'per night' as const,
  };
};

/**
 * Map LiteAPI Hotel to internal Destination format
 */
export const mapHotelToDestination = (hotel: Hotel) => {
  const image = getBestHotelImage(hotel);
  const starRating = hotel.stars || hotel.starRating || 3;

  return {
    id: parseInt(hotel.id) || hotel.id,
    name: hotel.city || hotel.name,
    country: hotel.countryCode || hotel.country || 'Unknown',
    image,
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
