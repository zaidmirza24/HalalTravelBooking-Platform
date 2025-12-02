/**
 * Data Types
 * TypeScript interfaces for LiteAPI supporting data (cities, countries, etc.)
 */

export interface City {
  id: string;
  name: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
}

export interface Country {
  code: string;
  name: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

export interface HotelType {
  id: string;
  name: string;
}

export interface HotelChain {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
  cityId?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface CitiesParams {
  countryCode?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface FacilitiesResponse {
  data: Facility[];
}

export interface Facility {
  id: string;
  name: string;
  category?: string;
}
