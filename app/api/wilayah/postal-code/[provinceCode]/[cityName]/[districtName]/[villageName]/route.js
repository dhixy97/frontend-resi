import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { provinceCode, cityName, districtName, villageName } = params;
  const province = wilayah[provinceCode];
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey !== validApiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  if (!province) {
    return NextResponse.json({ message: 'Provinsi tidak ditemukan' }, { status: 404 });
  }

  const city = province.cities[decodeURIComponent(cityName)];
  if (!city) {
    return NextResponse.json({ message: 'Kota tidak ditemukan' }, { status: 404 });
  }

  const district = city[decodeURIComponent(districtName)];
  if (!district) {
    return NextResponse.json({ message: 'Kecamatan tidak ditemukan' }, { status: 404 });
  }

  const postalCode = district[decodeURIComponent(villageName)];
  if (!postalCode) {
    return NextResponse.json({ message: 'Kelurahan tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json({ kodepos: postalCode });
}
