import { NextResponse } from 'next/server';
import nestedWilayah from '@/data/nestedWilayah.json';
import { verifyApiKey } from '@/lib/verifyApiKey';

export async function GET(_, { params }) {
  const apiKey = _.headers.get('x-api-key');

  // Validasi API Key
  if (!verifyApiKey(apiKey)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { provinceCode } = params;

  const prov = nestedWilayah[provinceCode];
  if (!prov) {
    return NextResponse.json({ message: 'Provinsi tidak ditemukan' }, { status: 404 });
  }

  const cityList = Object.keys(prov.cities);
  return NextResponse.json(cityList);
}
