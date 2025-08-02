import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';
import { verifyToken } from '@/lib/auth';

function generateKodePetugas(): string {
  const now = new Date();
  const kodeAcak = Math.floor(100000000 + Math.random() * 900000000); // 9 digit
  const tanggal = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  return `${kodeAcak}/${tanggal}/LA`;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { noresi: string } }
) {
  await dbConnect();

  const user = verifyToken(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await req.json();
    const { noresi } = params;

    if (!status) {
      return NextResponse.json({ error: 'Status wajib diisi' }, { status: 400 });
    }

    const resi = await Resi.findOne({ resi: noresi });
    if (!resi) {
      return NextResponse.json({ error: 'Resi tidak ditemukan' }, { status: 404 });
    }

    const now = new Date();
    const kodePetugas = generateKodePetugas();

    const keterangan =
      status === 'Diterima'
        ? `Barang diterima oleh ${resi.nama}`
        : `Barang Diloper Oleh Petugas : ${kodePetugas}`;

    resi.posisiBarang.push({ tanggal: now, keterangan, status });
    resi.status = status;

    await resi.save();

    return NextResponse.json(
      {
        message: 'Posisi barang berhasil diupdate',
        posisiBaru: {
          status,
          keterangan,
          tanggal: now,
          kodePetugas: status === 'Diterima' ? null : kodePetugas,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('PUT /api/resi/[noresi]/posisi error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Gagal update posisi barang' },
      { status: 500 }
    );
  }
}
