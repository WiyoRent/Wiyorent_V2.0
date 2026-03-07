import PackagesClient from '@/components/admin/packages/PackagesClient';
import { getPackages } from '@/services/admin/package.service';

export default async function SettlementPage() {
  const packages = await getPackages();

  return <PackagesClient initial_packages={packages} />;
}
