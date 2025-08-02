import { NextResponse } from 'next/server';
import cabangList from "../../../data/cabang"

export async function GET() {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey !== validApiKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    return NextResponse.json(cabangList);
  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal mengambil data cabang', error },
      { status: 500 }
    );
  }
}
