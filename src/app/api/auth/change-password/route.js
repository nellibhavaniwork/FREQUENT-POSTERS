import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbFindOne, dbUpdate } from '../../../../lib/dbService.js';
import { getAdminSession } from '../../../../lib/auth.js';

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword, newEmail } = await request.json();

    const admin = await dbFindOne('admin', { email: session.email });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const updates = {};
    if (newPassword && newPassword.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
      updates.mustChangePassword = false;
    }

    if (newEmail && newEmail.includes('@')) {
      updates.email = newEmail.toLowerCase().trim();
    }

    await dbUpdate('admin', { _id: admin._id }, updates);

    return NextResponse.json({ success: true, message: 'Account updated successfully.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

