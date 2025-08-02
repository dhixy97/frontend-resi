import { NextResponse } from 'next/server';
import cabangList from "../../../data/cabang"

export async function GET() {
  try {
    return NextResponse.json(cabangList);
  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal mengambil data cabang', error },
      { status: 500 }
    );
  }
}
