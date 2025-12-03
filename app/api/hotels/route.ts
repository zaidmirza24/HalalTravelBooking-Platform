/**
 * GET /api/hotels
 *
 * Search hotels by city name or country code
 *
 * Query Parameters:
 * - cityName: string (e.g., "Dubai", "Istanbul")
 * - countryCode: string (e.g., "AE", "TR")
 * - limit: number (optional, default: 100)
 * - offset: number (optional, default: 0)
 *
 * Example: /api/hotels?cityName=Dubai
 */

import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '@/lib/liteapi-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cityName = searchParams.get('cityName');
    const countryCode = searchParams.get('countryCode');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    // Validate required parameters
    if (!cityName && !countryCode) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Either cityName or countryCode is required',
        },
        { status: 400 }
      );
    }

    // Build query parameters object
    const queryParams: Record<string, string> = {};
    if (cityName) queryParams.cityName = cityName;
    if (countryCode) queryParams.countryCode = countryCode;
    if (limit) queryParams.limit = limit;
    if (offset) queryParams.offset = offset;

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Searching hotels with params:', queryParams);
    }

    // Call LiteAPI SDK
    const result = await liteApiClient.getHotels(queryParams);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Error fetching hotels:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message || 'Failed to fetch hotels',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: error.status || 500 }
    );
  }
}
