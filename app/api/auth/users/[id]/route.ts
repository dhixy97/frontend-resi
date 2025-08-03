// app/api/auth/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const user = verifyToken(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userToDelete = await User.findById(params.id);
    if (!userToDelete) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    if (userToDelete.role === 'admin' || userToDelete.username === 'admin') {
      return NextResponse.json(
        { error: 'Tidak bisa menghapus user admin' },
        { status: 403 }
      );
    }

    await User.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'User berhasil dihapus' }, { status: 200 });
  } catch (err) {
    console.error('DELETE /users/:id error:', err);
    return NextResponse.json({ error: 'Gagal menghapus user' }, { status: 500 });
  }
}
