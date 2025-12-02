import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '../../liteapi-proxy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await liteApiClient.post('/rates/prebook', body);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Prebook API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to prebook' },
      { status: error.response?.status || 500 }
    );
  }
}
