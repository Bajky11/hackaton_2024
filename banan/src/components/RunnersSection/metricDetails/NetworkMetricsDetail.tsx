import { MetricsDetailProps } from '@/components/RunnersSection/metricDetails/types';
import { MetricsDetailCard } from '@/components/RunnersSection/metricDetails/MetricsDetailCard';
import { NetworkRecieveHistory } from '@/components/RunnersSection/graphs/NetworkRecieveHistory';
import { NetworkTransmitHistory } from '@/components/RunnersSection/graphs/NetworkTransmitHistory';

export function NetworkMetricsDetail({ data }: MetricsDetailProps) {
  if (!data) return 'No data found';

  return (
    <MetricsDetailCard direction={'column'}>
      <NetworkRecieveHistory data={data} />
      <NetworkTransmitHistory data={data} />
    </MetricsDetailCard>
  );
}
