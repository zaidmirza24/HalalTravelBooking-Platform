import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '../liteapi-proxy';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());

    const response = await liteApiClient.get('/bookings', { params });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Bookings list API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch bookings' },
      { status: error.response?.status || 500 }
    );
  }
}
