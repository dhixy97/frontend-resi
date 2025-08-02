import { NextResponse } from 'next/server';
import nestedWilayah from '@/data/nestedWilayah.json';
import { verifyApiKey } from '@/lib/verifyApiKey';

export async function GET(req, { params }) {
  const apiKey = req.headers.get('x-api-key');
  const { provinceCode, cityName } = params;

  if (!verifyApiKey(apiKey)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const province = nestedWilayah[provinceCode];
  if (!province) {
    return NextResponse.json({ message: 'Provinsi tidak ditemukan' }, { status: 404 });
  }

  const city = province.cities[decodeURIComponent(cityName)];
  if (!city) {
    return NextResponse.json({ message: 'Kota tidak ditemukan' }, { status: 404 });
  }

  const districts = Object.keys(city); // Ambil daftar nama kecamatan
  return NextResponse.json(districts);
}
