import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  const { provinceCode } = params;

  // Pastikan provinceCode valid
  if (!provinceCode) {
    return NextResponse.json({ message: 'Kode provinsi diperlukan' }, { status: 400 });
  }

  const apiRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/wilayah/cities/${encodeURIComponent(provinceCode)}`,
    {
      headers: {
        'x-api-key': process.env.API_KEY, // 🔒 disisipkan secara aman di server
      },
    }
  );

  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
}
