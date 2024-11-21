import { MetricsDetailProps } from '@/components/RunnersSection/metricDetails/types';
import { MetricsDetailCard } from '@/components/RunnersSection/metricDetails/MetricsDetailCard';
import { NetworkTransmitHistory } from '@/components/RunnersSection/graphs/NetworkTransmitHistory';
import { NetworkRecieveHistory } from '@/components/RunnersSection/graphs/NetworkRecieveHistory';

export function NetworkMetricsDetail({ data }: MetricsDetailProps) {
  if (!data) return 'No data found';

  return (
    <MetricsDetailCard direction={'column'}>
      <NetworkRecieveHistory data={data.metrics} />
      <NetworkTransmitHistory data={data.metrics} />
    </MetricsDetailCard>
  );
}
