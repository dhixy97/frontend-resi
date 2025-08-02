import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resi from '@/models/Resi';

export async function GET(_, { params }) {
  await dbConnect();

  const resi = await Resi.findOne({ resi: params.noresi });
  if (!resi) {
    return NextResponse.json({ message: "Resi tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(resi);
}
