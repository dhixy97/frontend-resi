import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = Object.entries(wilayah).map(([code, prov]) => ({
      code,
      name: prov.province_name,
    }));
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: 'Gagal membaca data provinsi' }, { status: 500 });
  }
}
