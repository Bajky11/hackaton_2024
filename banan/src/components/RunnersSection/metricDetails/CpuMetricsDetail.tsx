import { CpuUsageHistory } from '@/components/RunnersSection/graphs/CpuUsageHistory';
import { CpuUsageCurrent } from '@/components/RunnersSection/graphs/CpuUsageCurrent';
import { MetricsDetailProps } from '@/components/RunnersSection/metricDetails/types';
import { MetricsDetailCard } from '@/components/RunnersSection/metricDetails/MetricsDetailCard';
import { Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export function CpuMetricsDetail({ data }: MetricsDetailProps) {
  const isMobile = useMediaQuery('(max-width:1250px)');

  if (!data) return 'No data found';

  return (
    <MetricsDetailCard direction={isMobile ? 'column' : 'row'}>
      <CpuUsageCurrent data={data.metrics} />
      <CpuUsageHistory data={data.metrics} />
    </MetricsDetailCard>
  );
}
