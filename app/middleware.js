import { NextResponse } from 'next/server';

const PUBLIC_API = ['/api/auth/login', '/api/auth/register'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Izinkan akses ke auth tanpa token/apiKey
  if (PUBLIC_API.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const apiKey = request.headers.get('x-api-key');
  const bearerToken = request.headers.get('authorization');

  const validApiKey = process.env.API_KEY;
  const jwtSecret = process.env.JWT_SECRET;

  // Cek API Key
  if (apiKey && apiKey === validApiKey) {
    return NextResponse.next();
  }

  // Cek Token JWT
  if (bearerToken) {
    const token = bearerToken.replace('Bearer ', '');
    try {
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      if (payload?.exp * 1000 > Date.now()) {
        return NextResponse.next();
      }
    } catch (err) {
      return NextResponse.json({ message: 'Token tidak valid', err }, { status: 403 });
    }
  }

  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

export const config = {
  matcher: ['/api/:path*'],
};
