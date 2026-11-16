import { dbFind } from '../../../../lib/dbService.js';
import PortfolioCMSClient from './PortfolioCMSClient.js';

export const revalidate = 0;

export default async function PortfolioAdminPage() {
  const portfolio = await dbFind('portfolio', {});
  return <PortfolioCMSClient initialPortfolio={portfolio || []} />;
}

