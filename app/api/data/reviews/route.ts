import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '../../liteapi-proxy';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());

    const response = await liteApiClient.get('/data/reviews', { params });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Reviews API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: error.response?.status || 500 }
    );
  }
}
