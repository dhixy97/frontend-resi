import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

export async function GET() {
  const provinceList = Object.keys(wilayah);
  return NextResponse.json(provinceList);
}
