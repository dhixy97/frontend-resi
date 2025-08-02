import { NextResponse } from "next/server";
import nestedWilayah from "@/app/data/nestedWilayah.json";
import { verifyApiKey } from "@/lib/verifyApiKey";

export async function GET(req, { params }) {
  const apiKey = req.headers.get("x-api-key");
  if (!verifyApiKey(apiKey)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { provinceCode, cityName, districtName, villageName } = params;

  const prov = nestedWilayah[provinceCode];
  if (!prov) return NextResponse.json({ message: "Provinsi tidak ditemukan" }, { status: 404 });

  const cityKey = Object.keys(prov.cities).find((k) => k.toLowerCase() === decodeURIComponent(cityName).toLowerCase());
  if (!cityKey) return NextResponse.json({ message: "Kota tidak ditemukan" }, { status: 404 });
  const city = prov.cities[cityKey];

  const districtKey = Object.keys(city).find((k) => k.toLowerCase() === decodeURIComponent(districtName).toLowerCase());
  if (!districtKey) return NextResponse.json({ message: "Kecamatan tidak ditemukan" }, { status: 404 });
  const district = city[districtKey];

  const villageKey = Object.keys(district).find((k) => k.toLowerCase() === decodeURIComponent(villageName).toLowerCase());
  if (!villageKey) return NextResponse.json({ message: "Kelurahan tidak ditemukan" }, { status: 404 });

  const kodepos = district[villageKey];

  return NextResponse.json({ kodepos });
}
