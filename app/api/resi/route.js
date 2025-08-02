import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';
import { toUpperSafe } from '@/utils/toUpperSafe';
import generateNomorResiAngka from '@/utils/generateResi';

export async function GET() {
  await dbConnect();

  const resiList = await Resi.find().sort({ createdAt: -1 });
  return NextResponse.json(resiList);
}

export async function POST(req) {
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
}
