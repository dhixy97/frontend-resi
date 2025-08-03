// app/api/wilayah-proxy/all/route.ts
import { NextResponse } from "next/server";
import wilayah from "@/app/data/nestedWilayah.json";
import { verifyApiKey } from "@/lib/verifyApiKey";

export async function GET(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey || !verifyApiKey(apiKey)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(wilayah);
}
