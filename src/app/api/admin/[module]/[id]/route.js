import { NextResponse } from 'next/server';
import { dbUpdate, dbDelete, dbFindOne } from '../../../../../lib/dbService.js';
import { getAdminSession } from '../../../../../lib/auth.js';

export async function GET(request, { params }) {
  try {
    const { module, id } = await params;
    const item = await dbFindOne(module, { _id: id });
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { module, id } = await params;
    const body = await request.json();

    const updated = await dbUpdate(module, { _id: id }, body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { module, id } = await params;
    await dbDelete(module, { _id: id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

