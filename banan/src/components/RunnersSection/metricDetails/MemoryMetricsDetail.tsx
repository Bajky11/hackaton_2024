import { MetricsDetailProps } from '@/components/RunnersSection/metricDetails/types';
import { MetricsDetailCard } from '@/components/RunnersSection/metricDetails/MetricsDetailCard';
import { MemoryUsageHistory } from '@/components/RunnersSection/graphs/MemoryUsageHistory';

export function MemoryMetricsDetail({ data }: MetricsDetailProps) {
  if (!data) return 'No data found';

  return (
    <MetricsDetailCard>
      <MemoryUsageHistory data={data} />
    </MetricsDetailCard>
  );
}
