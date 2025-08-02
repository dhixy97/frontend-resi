import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();
  const { username, password, role } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: 'Username sudah dipakai' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashed,
    role: role || 'user', // default ke user jika tidak dikirim
  });

  await newUser.save();

  return NextResponse.json({ message: 'Registrasi berhasil' }, { status: 201 });
}
