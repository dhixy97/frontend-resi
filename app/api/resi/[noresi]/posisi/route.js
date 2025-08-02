import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';

const generateKodePetugas = () => {
  const now = new Date();
  const kodeAcak = Math.floor(100000000 + Math.random() * 900000000);
  const tanggal = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
  return `${kodeAcak}/${tanggal}/LA`;
};

export async function PUT(req, { params }) {
  await dbConnect();
  const { status } = await req.json();

  if (!status) {
    return NextResponse.json({ error: "Status wajib diisi" }, { status: 400 });
  }

  const resi = await Resi.findOne({ resi: params.noresi });
  if (!resi) {
    return NextResponse.json({ error: "Resi tidak ditemukan" }, { status: 404 });
  }

  const kodePetugas = generateKodePetugas();
  const now = new Date();

  let keterangan = status === "Diterima"
    ? `Barang diterima oleh ${resi.nama}`
    : `Barang Diloper Oleh Petugas : ${kodePetugas}`;

  resi.posisiBarang.push({ tanggal: now, keterangan, status });
  resi.status = status;
  await resi.save();

  return NextResponse.json({
    message: "Posisi barang berhasil diupdate",
    posisiBaru: {
      status,
      keterangan,
      tanggal: now,
      kodePetugas: status === "Diterima" ? null : kodePetugas,
    },
  });
}
