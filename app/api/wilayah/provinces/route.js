import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.API_KEY;

  if (apiKey !== validApiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const provinceList = Object.keys(wilayah);
  return NextResponse.json(provinceList);
}
