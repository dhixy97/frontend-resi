import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { provinceCode } = params;
  const province = wilayah[provinceCode];

  if (!province) {
    return NextResponse.json({ message: 'Provinsi tidak ditemukan' }, { status: 404 });
  }

  const cities = Object.keys(province.cities);
  return NextResponse.json(cities);
}
