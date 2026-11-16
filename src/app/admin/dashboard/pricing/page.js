import { dbFind } from '../../../../lib/dbService.js';
import PricingCMSClient from './PricingCMSClient.js';

export const revalidate = 0;

export default async function PricingAdminPage() {
  const pricing = await dbFind('pricing', {});
  return <PricingCMSClient initialPricing={pricing || []} />;
}

