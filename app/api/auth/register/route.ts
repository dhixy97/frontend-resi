import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, password, role } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();

    return NextResponse.json({
      message: 'Registrasi berhasil',
      user: { username: newUser.username, role: newUser.role },
    });
  } catch (err) {
    console.error('Register Error:', err);
    return NextResponse.json(
      { error: 'Gagal registrasi user' },
      { status: 500 }
    );
  }
}
