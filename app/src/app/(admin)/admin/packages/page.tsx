export const dynamic =  'force-dynamic'

import PackagesClient from '@/components/admin/packages/PackagesClient';
import { getPackages } from '@/services/admin/package.service';

// Fetches the settling-in packages server-side and passes them to the client
// component, which handles editing/creating packages interactively.
export default async function SettlementPage() {
  const packages = await getPackages();

  return <PackagesClient initial_packages={packages} />;
}
