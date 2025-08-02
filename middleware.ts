import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // ❗ Validasi role jika perlu, misal hanya admin boleh
    if ((decoded as any).role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden: admin only' }, { status: 403 });
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}

export const config = {
  matcher: ['/api/admin/:path*'], // misalnya hanya proteksi route admin
};
