// app/api/auth/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await User.find({ username: { $ne: 'admin' } }).select('username role');
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error('GET /users error:', err);
    return NextResponse.json({ error: 'Gagal mengambil data user' }, { status: 500 });
  }
}
