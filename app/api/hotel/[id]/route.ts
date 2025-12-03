/**
 * GET /api/hotel/[id]
 *
 * Get detailed information about a single hotel
 *
 * Path Parameters:
 * - id: string (hotel ID from LiteAPI)
 *
 * Example: /api/hotel/lp3803c
 */

import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '@/lib/liteapi-client';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js 15: params is now a Promise
    const { id } = await context.params;

    // Validate hotel ID
    if (!id) {
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Hotel ID is required',
        },
        { status: 400 }
      );
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🏨 Fetching hotel details for ID:', id);
    }

    // Call LiteAPI SDK
    const result = await liteApiClient.getHotelDetails(id);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Error fetching hotel details:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error.message || 'Failed to fetch hotel details',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: error.status || 500 }
    );
  }
}
