import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';
import { verifyToken } from '@/lib/auth';

// 🔐 Fungsi buat kode petugas acak
function generateKodePetugas(): string {
  const random = Math.floor(1000 + Math.random() * 9000); // 4 digit
  return `KD-${random}`;
}

export async function PUT(req: NextRequest, context: { params: { noresi: string } }) {
  try {
    await dbConnect();

    const user = verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { noresi } = context.params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status wajib diisi' }, { status: 400 });
    }

    const resi = await Resi.findOne({ resi: noresi });

    if (!resi) {
      return NextResponse.json({ error: 'Resi tidak ditemukan' }, { status: 404 });
    }

    const now = new Date();
    const kodePetugas = generateKodePetugas();

    let keterangan = '';
    if (status === 'Diterima') {
      keterangan = `Barang diterima oleh ${resi.namaPenerima}`;
    } else {
      keterangan = `Barang Diloper Oleh Petugas : ${kodePetugas}`;
    }

    resi.posisiBarang.push({
      tanggal: now,
      keterangan,
      status,
    });

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
    console.error('❌ Gagal update posisi:', err);
    return NextResponse.json(
      { error: 'Gagal update posisi barang' },
      { status: 500 }
    );
  }
}
