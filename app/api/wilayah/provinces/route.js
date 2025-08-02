import { NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/verifyApiKey';
import wilayah from '@/data/nestedWilayah.json';

export async function GET(req) {
  const apiKey = req.headers.get('x-api-key');
  console.log('apinya adalah:', apiKey)

  if (!verifyApiKey(apiKey)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const result = Object.entries(wilayah).map(([code, prov]) => ({
    code,
    name: prov.province_name,
  }));

  return NextResponse.json(result);
}
