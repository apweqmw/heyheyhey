import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const accountSize = searchParams.get('accountSize');
    const platform = searchParams.get('platform');
    const maxPayoutDays = searchParams.get('maxPayoutDays');
    const sort = searchParams.get('sort') || 'name';

    const filters = {
      accountSize: accountSize ? parseInt(accountSize) : undefined,
      platform: platform || undefined,
      maxPayoutDays: maxPayoutDays ? parseInt(maxPayoutDays) : undefined,
      sort,
    };

    const firms = await storage.getFirms(filters);
    
    return NextResponse.json(firms);
  } catch (error) {
    console.error('Error fetching firms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch firms' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newFirm = await storage.createFirm(body);
    
    return NextResponse.json(newFirm, { status: 201 });
  } catch (error) {
    console.error('Error creating firm:', error);
    return NextResponse.json(
      { error: 'Failed to create firm' },
      { status: 500 }
    );
  }
}