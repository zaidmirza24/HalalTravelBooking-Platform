import { NextRequest, NextResponse } from 'next/server';
import { liteApiClient } from '../../liteapi-proxy';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const response = await liteApiClient.get(`/bookings/${id}`);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Booking details API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch booking details' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const response = await liteApiClient.delete(`/bookings/${id}`);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Cancel booking API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to cancel booking' },
      { status: error.response?.status || 500 }
    );
  }
}
