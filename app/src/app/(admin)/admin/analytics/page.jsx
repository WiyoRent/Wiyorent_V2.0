export const dynamic =  'force-dynamic'

import { getAdminAnalytics } from '@/services/admin/analytics.service';
import AnalyticsDashboard from '@/components/admin/analytics/AnalyticsDashboard';

export const metadata = {
  title: 'Analytics — WiyoRent Admin',
};

// Fetches platform-wide analytics (server-side) and hands the raw data to the
// client dashboard component for charting/display.
export default async function AdminAnalyticsPage() {
  const data = await getAdminAnalytics();
  return <AnalyticsDashboard data={data} />;
}
