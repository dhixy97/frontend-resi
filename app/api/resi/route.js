import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';
import { toUpperSafe } from '@/utils/toUpperSafe';
import generateNomorResiAngka from '@/utils/generateResi';

export async function POST(req) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: Cek role admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden: Admin only' }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    const { cabang, nama, alamat, namaBarang, wilayah, jumlah, berat, jenis, status } = body;

    if (!cabang?.nama || !cabang?.noTelp || !cabang?.alamat) {
      return NextResponse.json({ error: "Data cabang tidak lengkap" }, { status: 400 });
    }

    const noResi = await generateNomorResiAngka();

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
        provinsi: toUpperSafe(wilayah.provinsi),
        kota: toUpperSafe(wilayah.kota),
        kecamatan: toUpperSafe(wilayah.kecamatan),
        kelurahan: toUpperSafe(wilayah.kelurahan),
        kodepos: wilayah.kodePos,
      },
      jumlah,
      berat,
      jenis,
      status: status || "Pending",
      posisiBarang: [
        {
          status: "Pending",
          keterangan: "Resi berhasil dibuat, menunggu proses pengiriman.",
        },
      ],
    });

    await newResi.save();
    return NextResponse.json({ message: "Resi berhasil disimpan", resi: newResi }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ message: 'Invalid token', err }, { status: 403 });
  }
}
