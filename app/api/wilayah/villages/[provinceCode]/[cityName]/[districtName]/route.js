import { NextResponse } from 'next/server';
import nestedWilayah from '@/data/nestedWilayah.json';
import { verifyApiKey } from '@/lib/verifyApiKey';

export async function GET(req, { params }) {
  const apiKey = req.headers.get('x-api-key');

  if (!verifyApiKey(apiKey)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { provinceCode, cityName, districtName } = params;

  const province = nestedWilayah[provinceCode];
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

  const villages = Object.entries(district).map(([name, postal]) => ({
    name,
    postalCode: postal,
  }));

  return NextResponse.json(villages);
}
