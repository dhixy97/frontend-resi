import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';

export async function GET(
  _req: NextRequest,
  { params }: { params: { noresi: string } }
) {
  try {
    await dbConnect();

    const rawResi = params.noresi;
    const cleanedResi = rawResi.trim(); // buang spasi jika ada

    console.log('🔍 PARAM DARI URL:', rawResi);
    console.log('🧼 DICARI DENGAN:', cleanedResi);

    const resi = await Resi.findOne({ resi: cleanedResi });

    if (!resi) {
      console.log('❌ Resi tidak ditemukan di DB.');
      return NextResponse.json(
        { message: 'Resi tidak ditemukan' },
        { status: 404 }
      );
    }

    console.log('✅ Resi ditemukan:', resi.resi);

    return NextResponse.json(resi, { status: 200 });
  } catch (err) {
    console.error('❗ GET /api/resi/[noresi] error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Gagal mengambil detail resi' },
      { status: 500 }
    );
  }
}
