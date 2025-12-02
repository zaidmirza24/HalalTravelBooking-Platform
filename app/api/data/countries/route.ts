import { NextResponse } from 'next/server';
import { liteApiClient } from '../../liteapi-proxy';

export async function GET() {
  try {
    const response = await liteApiClient.get('/data/countries');
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Countries API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch countries' },
      { status: error.response?.status || 500 }
    );
  }
}
