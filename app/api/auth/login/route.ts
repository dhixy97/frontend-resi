import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret123';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    console.error('Login Error:', err);
    return NextResponse.json({ error: 'Login gagal' }, { status: 500 });
  }
}
