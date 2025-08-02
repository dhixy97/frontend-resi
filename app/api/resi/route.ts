import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';
import { verifyToken } from '@/lib/auth';

const toUpperSafe = (str?: string): string => (str ? str.toUpperCase() : '');

function generateNomorResiAngka(): string {
  const now = new Date();
  const random9Digit = Math.floor(100000000 + Math.random() * 900000000);
  const date = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
  return `${random9Digit}-${date}`;
}

// =======================
// 🔐 Proteksi di GET
// =======================
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const semuaResi = await Resi.find().sort({ createdAt: -1 });
    return NextResponse.json(semuaResi, { status: 200 });
  } catch (err) {
    console.error('GET /api/resi error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// =======================
// 🔐 Proteksi di POST
// =======================
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const user = verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const {
      cabang,
      nama,
      alamat,
      namaBarang,
      wilayah,
      jumlah,
      berat,
      jenis,
      status,
    } = body;

    if (!cabang?.nama || !cabang?.noTelp || !cabang?.alamat) {
      return NextResponse.json(
        { error: 'Data cabang tidak lengkap' },
        { status: 400 }
      );
    }

    const noResi = generateNomorResiAngka();

    const newResi = new Resi({
      resi: noResi,
      cabang: {
        nama: toUpperSafe(cabang.nama),
        noTelp: toUpperSafe(cabang.noTelp),
        alamat: toUpperSafe(cabang.alamat),
      },
      nama: toUpperSafe(nama),
      alamat: toUpperSafe(alamat),
      namaBarang: toUpperSafe(namaBarang),
      wilayah: {
        provinsi: toUpperSafe(wilayah?.provinsi),
        kota: toUpperSafe(wilayah?.kota),
        kecamatan: toUpperSafe(wilayah?.kecamatan),
        kelurahan: toUpperSafe(wilayah?.kelurahan),
        kodepos: wilayah?.kodepos || '',
      },
      jumlah,
      berat,
      jenis,
      status: status || 'Pending',
      posisiBarang: [
        {
          status: 'Pending',
          keterangan: 'Menunggu proses pengiriman.',
        },
      ],
    });

    await newResi.save();

    return NextResponse.json(
      { message: 'Resi berhasil disimpan', resi: newResi },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/resi error:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Gagal menyimpan resi' },
      { status: 500 }
    );
  }
}
