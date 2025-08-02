import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey !== validApiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json(wilayah);
  } catch (err) {
    return NextResponse.json({ message: 'Gagal membaca data wilayah', err }, { status: 500 });
  }
}
