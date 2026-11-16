import { dbFind } from '../../../../lib/dbService.js';
import EnquiriesCMSClient from './EnquiriesCMSClient.js';

export const revalidate = 0;

export default async function EnquiriesAdminPage() {
  const enquiries = await dbFind('enquiries', {});
  return <EnquiriesCMSClient initialEnquiries={enquiries || []} />;
}

