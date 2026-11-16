import { dbFind } from '../../../../lib/dbService.js';
import ClientsCMSClient from './ClientsCMSClient.js';

export const revalidate = 0;

export default async function ClientsAdminPage() {
  const clients = await dbFind('clients', {});
  return <ClientsCMSClient initialClients={clients || []} />;
}

