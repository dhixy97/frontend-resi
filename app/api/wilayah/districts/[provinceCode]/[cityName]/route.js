import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { provinceCode, cityName } = params;

  const province = wilayah[provinceCode];
  if (!province) {
    return NextResponse.json({ message: 'Provinsi tidak ditemukan' }, { status: 404 });
  }

  const cityData = province.cities[decodeURIComponent(cityName)];
  if (!cityData) {
    return NextResponse.json({ message: 'Kota tidak ditemukan' }, { status: 404 });
  }

  const districts = Object.keys(cityData);
  return NextResponse.json(districts);
}
