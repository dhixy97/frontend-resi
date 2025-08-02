import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  // Ambil API Key dari Header
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (apiKey !== validApiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Ambil parameter provinsi
  const { provinceCode } = context.params;
  const province = wilayah[provinceCode];

  if (!province) {
    return NextResponse.json({ message: 'Provinsi tidak ditemukan' }, { status: 404 });
  }

  const cities = Object.keys(province.cities);
  return NextResponse.json(cities);
}
