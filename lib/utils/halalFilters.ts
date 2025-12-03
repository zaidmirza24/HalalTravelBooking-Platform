/**
 * Halal Filters
 * Filter and score hotels based on halal-friendly criteria
 */

import type { Hotel, Facility } from '../api/types/hotel.types';

export const HALAL_FACILITY_KEYWORDS = [
  'prayer room',
  'prayer facility',
  'muslim prayer',
  'halal restaurant',
  'halal food',
  'halal dining',
  'halal kitchen',
  'no alcohol',
  'alcohol-free',
  'islamic',
  'muslim-friendly',
  'muslim friendly',
  'women-only pool',
  'women-only spa',
  'women only',
  'separate swimming',
  'qibla',
  'mosque nearby',
  'halal certified',
];

/**
 * Check if a hotel is halal certified based on facilities and description
 */
export const isHalalCertified = (hotel: Hotel): boolean => {
  const facilities = hotel.facilities?.map(f => f.name.toLowerCase()) || [];
  const description = hotel.hotelDescription?.toLowerCase() || '';

  return HALAL_FACILITY_KEYWORDS.some(keyword =>
    facilities.some(f => f.includes(keyword)) ||
    description.includes(keyword)
  );
};

/**
 * Filter hotels to show only halal-friendly ones
 */
export const filterHalalHotels = (hotels: Hotel[]): Hotel[] => {
  return hotels.filter(isHalalCertified);
};

/**
 * Get halal-specific facilities from a hotel
 */
export const getHalalFacilities = (hotel: Hotel): Facility[] => {
  if (!hotel.facilities) return [];

  return hotel.facilities.filter(facility =>
    HALAL_FACILITY_KEYWORDS.some(keyword =>
      facility.name.toLowerCase().includes(keyword)
    )
  );
};

/**
 * Score hotel's halal-friendliness (0-100)
 */
export const scoreHalalFriendliness = (hotel: Hotel): number => {
  let score = 0;

  const facilities = hotel.facilities?.map(f => f.name.toLowerCase()) || [];
  const description = hotel.hotelDescription?.toLowerCase() || '';
  const allText = `${facilities.join(' ')} ${description}`;

  // Prayer facilities (40 points)
  if (allText.includes('prayer')) score += 40;

  // Halal food (40 points)
  if (allText.includes('halal')) score += 40;

  // No alcohol (20 points)
  if (allText.includes('no alcohol') || allText.includes('alcohol-free')) {
    score += 20;
  }

  // Women-only facilities (bonus 10 points)
  if (allText.includes('women-only') || allText.includes('women only')) {
    score = Math.min(100, score + 10);
  }

  // Mosque nearby (bonus 10 points)
  if (allText.includes('mosque')) {
    score = Math.min(100, score + 10);
  }

  return score;
};

/**
 * Sort hotels by halal-friendliness score (descending)
 */
export const sortByHalalScore = (hotels: Hotel[]): Hotel[] => {
  return [...hotels].sort((a, b) => {
    const scoreA = scoreHalalFriendliness(a);
    const scoreB = scoreHalalFriendliness(b);
    return scoreB - scoreA;
  });
};

/**
 * Check if hotel has specific halal feature
 */
export const hasHalalFeature = (
  hotel: Hotel,
  feature: 'prayer' | 'halal-food' | 'alcohol-free' | 'women-only'
): boolean => {
  const facilities = hotel.facilities?.map(f => f.name.toLowerCase()) || [];
  const description = hotel.hotelDescription?.toLowerCase() || '';
  const allText = `${facilities.join(' ')} ${description}`;

  switch (feature) {
    case 'prayer':
      return allText.includes('prayer');
    case 'halal-food':
      return allText.includes('halal');
    case 'alcohol-free':
      return allText.includes('no alcohol') || allText.includes('alcohol-free');
    case 'women-only':
      return allText.includes('women-only') || allText.includes('women only');
    default:
      return false;
  }
};
