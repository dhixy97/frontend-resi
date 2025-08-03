import { NextResponse } from "next/server";
import wilayah from "@/app/data/nestedWilayah.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("apiKey");

  // Proteksi API Key
  const validKey = process.env.API_KEY || "your-default-api-key";
  if (apiKey !== validKey) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid API Key" },
      { status: 401 }
    );
  }

  // Ambil semua provinsi
  const provinces = Object.keys(wilayah);

  return NextResponse.json(provinces);
}
