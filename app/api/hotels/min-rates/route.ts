import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '../../liteapi-proxy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await liteApiClient.post('/hotels/min-rates', body);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Minimum rates API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch minimum rates' },
      { status: error.response?.status || 500 }
    );
  }
}
