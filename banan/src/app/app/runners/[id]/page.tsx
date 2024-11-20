'use client';

import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import {
  useGetJobListQuery,
  useGetMetricWithRunnerDetailQuery,
} from '@/services/runner';
import { useParams } from 'next/navigation';
import { MetricsCard } from '@/components/RunnersSection/MetricsCard';
import { CpuMetricsDetail } from '@/components/RunnersSection/metricDetails/CpuMetricsDetail';
import { MemoryMetricsDetail } from '@/components/RunnersSection/metricDetails/MemoryMetricsDetail';
import { NetworkMetricsDetail } from '@/components/RunnersSection/metricDetails/NetworkMetricsDetail';
import { DiskMetricsDetail } from '@/components/RunnersSection/metricDetails/DiskMetricsDetail';
import { JobsTable } from '@/components/tables/JobsTable';

export default function Page() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>('cpu');
  const { id } = useParams();
  const {
    data: runnerDetailData,
    error,
    isLoading,
  } = useGetMetricWithRunnerDetailQuery(id);

  console.log(id);

  const {
    data: runnerJobsData,
    error: runnerJobsError,
    isLoading: isRunnerJobsLoading,
  } = useGetJobListQuery({ search: id, limit: 10 });

  if (error) return <Typography>Chyba při načítání dat</Typography>;
  if (isLoading || !runnerDetailData || !runnerDetailData.metrics) {
    return <Typography>Loading...</Typography>;
  }

  if (runnerJobsError) return <Typography>Chyba při načítání dat</Typography>;
  if (isRunnerJobsLoading || !runnerJobsData) {
    return <Typography>Loading...</Typography>;
  }

  const lastMetric =
    runnerDetailData.metrics[runnerDetailData.metrics.length - 1];
  const currentCpuUtilization = (lastMetric.cpu * 100).toFixed(2);

  const metrics = [
    {
      id: 'cpu',
      name: 'cpu usage',
      value: `${currentCpuUtilization} %`,
      color: '#BE3B2B',
    },
    {
      id: 'memory',
      name: 'memory usage',
      value: `${(lastMetric.memory / (1024 * 1024)).toFixed(1)} MB`,
      color: '#9E51AE',
    },
    {
      id: 'network',
      name: 'download',
      value: `${(lastMetric.network_receive / 1024).toFixed(2)} KB/s`,
      color: '#499AF2',
    },
    {
      id: 'network',
      name: 'upload',
      value: `${(lastMetric.network_transmit / 1024).toFixed(2)} KB/s`,
      color: '#499AF2',
    },
    {
      id: 'disk',
      name: 'disk read',
      value: lastMetric.fs_reads.toLocaleString(),
      color: '#4BA43A',
    },
    {
      id: 'disk',
      name: 'disk write',
      value: lastMetric.fs_writes.toLocaleString(),
      color: '#4BA43A',
    },
  ];

  function displaySelectedMetrics() {
    switch (selectedMetric) {
      case 'cpu': {
        return <CpuMetricsDetail data={runnerDetailData.metrics} />;
      }
      case 'memory': {
        return <MemoryMetricsDetail data={runnerDetailData.metrics} />;
      }
      case 'network': {
        return <NetworkMetricsDetail data={runnerDetailData.metrics} />;
      }
      case 'disk': {
        return <DiskMetricsDetail data={runnerDetailData.metrics} />;
      }
      default:
        return null;
    }
  }

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={1}>
        {metrics.map(({ id, name, value, color }) => (
          <MetricsCard
            key={name}
            name={name}
            value={value}
            color={color}
            selected={selectedMetric === id}
            onClick={() => setSelectedMetric(selectedMetric === id ? null : id)}
          />
        ))}
      </Stack>
      {displaySelectedMetrics()}
      <JobsTable data={runnerJobsData} />
    </Stack>
  );
}
