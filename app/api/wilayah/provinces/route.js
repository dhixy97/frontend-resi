import wilayah from '@/data/nestedWilayah.json';
import { NextResponse } from 'next/server';

const allowedOrigin = 'https://www.cekresidakotacargo.com';

export async function GET() {
  try {
    const provinsiList = Object.entries(wilayah).map(([code, prov]) => ({
      code,
      name: prov.province_name,
    }));

    return new NextResponse(JSON.stringify(provinsiList), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Gagal mengambil data provinsi:', error);
    return new NextResponse(JSON.stringify({ message: 'Gagal membaca data provinsi' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
      },
    });
  }
}

// WAJIB ADA: menangani CORS preflight request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
