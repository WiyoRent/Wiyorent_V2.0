import { getAdminAnalytics } from '@/services/admin/analytics.service';
import AnalyticsDashboard from '@/components/admin/analytics/AnalyticsDashboard';

export const metadata = {
  title: 'Analytics — WiyoRent Admin',
};

export default async function AdminAnalyticsPage() {
  const data = await getAdminAnalytics();
  return <AnalyticsDashboard data={data} />;
}
