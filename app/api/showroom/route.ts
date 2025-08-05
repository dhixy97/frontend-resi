// app/api/cabang/route.ts
import { NextRequest, NextResponse } from 'next/server';
import showroom from "@/app/data/showroom"

const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const apiKeyFromHeader = req.headers.get('x-api-key');

  if (!apiKeyFromHeader || apiKeyFromHeader !== API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid API Key' },
      { status: 401 }
    );
  }

  return NextResponse.json(showroom, { status: 200 });
}
