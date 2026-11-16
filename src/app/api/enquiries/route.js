import { NextResponse } from 'next/server';
import { dbCreate, dbFind } from '../../../lib/dbService.js';
import { getAdminSession } from '../../../lib/auth.js';

export async function GET(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const enquiries = await dbFind('enquiries', {});
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, businessName, whatsappNumber, email, service, requirement } = body;

    if (!name || !whatsappNumber || !requirement) {
      return NextResponse.json(
        { error: 'Name, WhatsApp number and requirements are required.' },
        { status: 400 }
      );
    }

    const newEnquiry = await dbCreate('enquiries', {
      name,
      businessName: businessName || '',
      whatsappNumber,
      email: email || '',
      service: service || 'General Enquiry',
      requirement,
      status: 'new',
    });

    return NextResponse.json({ success: true, enquiry: newEnquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

