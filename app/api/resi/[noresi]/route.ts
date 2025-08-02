import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';

export async function GET(
  _req: NextRequest,
  { params }: { params: { noresi: string } }
) {
  try {
    await dbConnect();

    const resi = await Resi.findOne({ resi: params.noresi });

    if (!resi) {
      return NextResponse.json({ message: "Resi tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(resi, { status: 200 });
  } catch (err) {
    console.error('❌ Error GET /api/resi/[noresi]:', err);
    return NextResponse.json(
      {
        message: "Gagal mengambil detail resi",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
