import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';
import { verifyToken } from '@/lib/auth';

const toUpperSafe = (str?: string): string => (str ? str.toUpperCase() : '');

function generateNomorResiAngka(): string {
  const now = new Date();
  const random9Digit = Math.floor(100000000 + Math.random() * 900000000);
  const date = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
  return `${random9Digit}${date}`;    
}

// =======================
// 🔐 GET /api/resi
// =======================
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = verifyToken(req);
    const allowedRoles = ['admin', 'user'];

    if (!user || !allowedRoles.includes(user.role)) {
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
// 🔐 POST /api/resi
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
      showroom,
      cabang,
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      namaBarang,
      wilayah,
      jumlah,
      berat,
      jenis,
      status,
    } = body;

    // Validasi field cabang
    if (!cabang?.nama || !cabang?.telepon || !cabang?.alamat) {
      return NextResponse.json(
        { error: 'Data cabang tidak lengkap' },
        { status: 400 }
      );
    }

    // Validasi field wajib lainnya
    if (
      !showroom ||
      !namaPengirim ||
      !namaPenerima ||
      !alamatPenerima ||
      !namaBarang ||
      !wilayah?.provinsi ||
      !wilayah?.kota ||
      !wilayah?.kecamatan ||
      !wilayah?.kelurahan
    ) {
      return NextResponse.json(
        { error: 'Data wajib tidak lengkap' },
        { status: 400 }
      );
    }

    const noResi = generateNomorResiAngka();

    const newResi = new Resi({
      resi: noResi,
      showroom: toUpperSafe(showroom),
      cabang: {
        nama: toUpperSafe(cabang.nama),
        telepon: toUpperSafe(cabang.telepon),
        alamat: toUpperSafe(cabang.alamat),
      },
      namaPengirim: toUpperSafe(namaPengirim),
      namaPenerima: toUpperSafe(namaPenerima),
      alamatPenerima: toUpperSafe(alamatPenerima),
      namaBarang: toUpperSafe(namaBarang),
      wilayah: {
        provinsi: toUpperSafe(wilayah.provinsi),
        kota: toUpperSafe(wilayah.kota),
        kecamatan: toUpperSafe(wilayah.kecamatan),
        kelurahan: toUpperSafe(wilayah.kelurahan),
        kodepos: wilayah?.kodepos || '',
      },
      jumlah: Number(jumlah),
      berat: Number(berat),
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
