import { NextResponse } from 'next/server';
import { dbFind, dbCreate } from '../../../../lib/dbService.js';
import { getAdminSession } from '../../../../lib/auth.js';

export async function GET(request, { params }) {
  try {
    const { module } = await params;
    const items = await dbFind(module, {});
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { module } = await params;
    const body = await request.json();

    const created = await dbCreate(module, body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

