import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const provinsiList = Object.entries(wilayah).map(([code, prov]) => ({
      code,
      name: prov.province_name,
    }));

    return NextResponse.json(provinsiList);
  } catch (error) {
    console.error('Gagal mengambil data provinsi:', error);
    return NextResponse.json({ message: 'Gagal membaca data provinsi' }, { status: 500 });
  }
}
