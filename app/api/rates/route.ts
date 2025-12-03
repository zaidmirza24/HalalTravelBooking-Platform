/**
 * POST /api/rates
 *
 * Get live prices & availability for hotels
 *
 * Request Body:
 * {
 *   "hotelIds": ["lp3803c", "lp24a8"],           // Array of hotel IDs
 *   "checkin": "2024-12-20",                      // Check-in date (YYYY-MM-DD)
 *   "checkout": "2024-12-22",                     // Check-out date (YYYY-MM-DD)
 *   "currency": "USD",                            // Currency code
 *   "guestNationality": "US",                     // Guest country code
 *   "occupancies": [                              // Rooms and guests
 *     {
 *       "rooms": 1,
 *       "adults": 2,
 *       "children": [5, 7]                        // Optional: children ages
 *     }
 *   ],
 *   "guestId": "guest123"                         // Optional: guest identifier
 * }
 *
 * Example: POST /api/rates
 */

import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '@/lib/liteapi-client';

interface RatesRequestBody {
  hotelIds: string[];
  checkin: string;
  checkout: string;
  currency: string;
  guestNationality: string;
  occupancies: Array<{
    rooms: number;
    adults: number;
    children?: number[];
  }>;
  guestId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RatesRequestBody = await request.json();

    // Validate required fields
    const requiredFields = [
      'hotelIds',
      'checkin',
      'checkout',
      'currency',
      'guestNationality',
      'occupancies',
    ];

    for (const field of requiredFields) {
      if (!body[field as keyof RatesRequestBody]) {
        return NextResponse.json(
          {
            error: 'Bad Request',
            message: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // Validate hotel IDs is an array
    if (!Array.isArray(body.hotelIds) || body.hotelIds.length === 0) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'hotelIds must be a non-empty array',
        },
        { status: 400 }
      );
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('💰 Fetching rates for hotels:', {
        hotels: body.hotelIds,
        dates: `${body.checkin} to ${body.checkout}`,
        occupancies: body.occupancies,
      });
    }

    // Call LiteAPI SDK
    const result = await liteApiClient.getFullRates(body);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Error fetching rates:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message || 'Failed to fetch rates',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: error.status || 500 }
    );
  }
}
