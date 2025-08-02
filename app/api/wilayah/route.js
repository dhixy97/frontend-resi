import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json(wilayah);
  } catch (err) {
    return NextResponse.json(
      { message: 'Gagal membaca data wilayah', error: String(err) },
      { status: 500 }
    );
  }
}
