import { dbFind } from '../../../../lib/dbService.js';
import ServicesCMSClient from './ServicesCMSClient.js';

export const revalidate = 0;

export default async function ServicesAdminPage() {
  const services = await dbFind('services', {});
  return <ServicesCMSClient initialServices={services || []} />;
}

