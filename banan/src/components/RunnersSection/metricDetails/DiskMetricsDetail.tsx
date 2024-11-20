import { MetricsDetailProps } from '@/components/RunnersSection/metricDetails/types';
import { MetricsDetailCard } from '@/components/RunnersSection/metricDetails/MetricsDetailCard';
import { NetworkTransmitHistory } from '@/components/RunnersSection/graphs/NetworkTransmitHistory';
import { NetworkRecieveHistory } from '@/components/RunnersSection/graphs/NetworkRecieveHistory';
import { DiskWritesHistory } from '@/components/RunnersSection/graphs/DiskWritesHistory';
import { DiskReadsHistory } from '@/components/RunnersSection/graphs/DiskReadsHistory';

export function DiskMetricsDetail({ data }: MetricsDetailProps) {
  if (!data) return 'No data found';

  return (
    <MetricsDetailCard direction={'column'}>
      <DiskWritesHistory data={data} />
      <DiskReadsHistory data={data} />
    </MetricsDetailCard>
  );
}
