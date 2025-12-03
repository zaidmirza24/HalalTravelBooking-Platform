/**
 * Hotel Types
 * TypeScript interfaces for LiteAPI hotel-related data
 */

export interface Hotel {
  id: string;
  name: string;
  hotelDescription?: string;
  checkinCheckoutTimes?: {
    checkout: string;
    checkin: string;
  };
  hotelImages?: HotelImage[];
  // LiteAPI actual fields
  main_photo?: string;
  thumbnail?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  zip?: string;
  city?: string;
  countryCode?: string;
  country?: string;
  starRating?: number;
  stars?: number; // LiteAPI uses 'stars' instead of 'starRating'
  rating?: number; // User rating (different from stars)
  reviewCount?: number;
  facilities?: Facility[];
  facilityIds?: number[];
  currency?: string;
  chain?: string;
  chainId?: number;
  hotelTypeId?: number;
  primaryHotelId?: string | null;
  deletedAt?: string | null;
  accessibilityAttributes?: any;
}

export interface HotelImage {
  url: string;
  urlHd?: string;
  thumbnailUrl?: string;
  caption?: string;
  order?: number;
  defaultImage?: boolean;
}

export interface Facility {
  id?: string;
  facilityId?: number;
  name: string;
  category?: string;
}

export interface BedType {
  quantity: number;
  bedType: string;
  bedSize?: string;
  id?: number;
}

export interface RoomAmenity {
  amenitiesId: number;
  name: string;
  sort?: number;
}

export interface RoomPhoto {
  url: string;
  hd_url?: string;
  imageDescription?: string;
  imageClass1?: string;
  imageClass2?: string;
  failoverPhoto?: string;
  mainPhoto?: boolean;
  score?: number;
  classId?: number;
  classOrder?: number;
}

export interface Room {
  id: number | string;
  roomName: string;
  name?: string;
  description?: string;
  roomSizeSquare?: number;
  roomSizeUnit?: string;
  hotelId?: string;
  maxAdults?: number;
  maxChildren?: number;
  maxOccupancy?: number;
  bedTypes?: BedType[];
  roomAmenities?: RoomAmenity[];
  photos?: RoomPhoto[];
  views?: any[];
  bedRelation?: string;
  facilities?: Facility[];
}

export interface HotelDetails extends Hotel {
  hotelImportantInformation?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  reviews?: HotelReview[];
  rooms?: Room[];
  amenities?: Facility[];
  hotelFacilities?: string[];
}

export interface HotelReview {
  id?: string;
  hotelId?: string;
  averageScore: number;
  name: string;
  country: string;
  type: string;
  headline?: string;
  pros?: string;
  cons?: string;
  date: string;
  language?: string;
  source?: string;
  // Legacy fields for backward compatibility
  title?: string;
  description?: string;
  rating?: number;
  reviewDate?: string;
  guestName?: string;
}

export interface HotelListParams {
  countryCode?: string;
  cityName?: string;
  offset?: number;
  limit?: number;
  longitude?: number;
  latitude?: number;
  distance?: number;
}

export interface HotelDetailsParams {
  hotelId: string;
}

export interface HotelReviewsParams {
  hotelId: string;
  limit?: number;
  offset?: number;
}
