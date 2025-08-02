import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { provinceCode, cityName } = params;

  const apiKey = process.env.API_KEY;
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  try {
    const res = await fetch(
      `${backendUrl}/api/wilayah/districts/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}`,
      {
        headers: {
          'x-api-key': apiKey,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Gagal mengambil data kecamatan dari API wilayah' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan internal', error: error.message },
      { status: 500 }
    );
  }
}
