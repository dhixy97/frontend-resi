import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { provinceCode, cityName, districtName } = params;
  const province = wilayah[provinceCode];
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
    postalCode: postal
  }));

  return NextResponse.json(villages);
}
