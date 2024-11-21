import { CpuUsageHistory } from '@/components/RunnersSection/graphs/CpuUsageHistory';
import { CpuUsageCurrent } from '@/components/RunnersSection/graphs/CpuUsageCurrent';
import { MetricsDetailProps } from '@/components/RunnersSection/metricDetails/types';
import { MetricsDetailCard } from '@/components/RunnersSection/metricDetails/MetricsDetailCard';

export function CpuMetricsDetail({ data }: MetricsDetailProps) {
  if (!data) return 'No data found';

  return (
    <MetricsDetailCard>
      <CpuUsageCurrent data={data.metrics} />
      <CpuUsageHistory data={data.metrics} />
    </MetricsDetailCard>
  );
}
