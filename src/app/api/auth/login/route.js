import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbFindOne, dbUpdate } from '../../../../lib/dbService.js';
import { signToken, setAdminSession } from '../../../../lib/auth.js';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const admin = await dbFindOne('admin', { email: email.toLowerCase().trim() });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
    }

    // Generate JWT
    const token = signToken({
      id: admin._id,
      email: admin.email,
      role: admin.role,
      mustChangePassword: admin.mustChangePassword,
    });

    await setAdminSession(token);

    // Update lastLogin
    await dbUpdate('admin', { _id: admin._id }, { lastLogin: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      mustChangePassword: admin.mustChangePassword,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

