'use client';

import { Card, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  MetricWithRunner,
  useGetJobListQuery,
  useGetMetricWithRunnerDetailQuery,
} from '@/services/runner';
import { useParams } from 'next/navigation';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import CustomTable from '@/components/CustomTable';

export default function Page() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
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

  const columns = [
    { field: 'id', headerName: 'Id' },
    { field: 'state', headerName: 'State' },
    { field: 'organization', headerName: 'Organization' },
    { field: 'SAS', headerName: 'Sas' },
    { field: 'runner', headerName: 'Runner' },
    { field: 'timestamp', headerName: 'Timestamp' },
  ];

  function displaySelectedMetrics() {
    switch (selectedMetric) {
      case 'cpu': {
        return <CpuMetricsDetail data={runnerDetailData.metrics} />;
      }
      case 'memory': {
        return 'memory';
      }
      case 'network': {
        return 'network';
      }
      case 'disk': {
        return 'disk';
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
      <CustomTable
        columns={columns}
        data={runnerJobsData}
        onRowClick={() => {}}
      />
    </Stack>
  );
}

interface MetricsCardProps {
  name: string;
  value: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

function MetricsCard({
  name,
  value,
  color,
  selected,
  onClick,
}: MetricsCardProps) {
  const [hovered, setHovered] = useState(false);

  const headingTextColor = hovered ? 'black' : selected ? 'black' : color;
  const valueTextColor = hovered ? 'black' : selected ? 'black' : '#3F3F3F';
  const backgroundColor = hovered ? color : selected ? color : 'white';

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px',
        backgroundColor,
        flex: 1,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize={20}
        color={headingTextColor}
        textTransform={'uppercase'}
      >
        {name}
      </Typography>
      <Typography fontWeight="bold" fontSize={36} color={valueTextColor}>
        {value}
      </Typography>
    </Card>
  );
}

interface CpuMetricsDetailProps {
  data: MetricWithRunner | undefined;
}

function CpuMetricsDetail({ data }: CpuMetricsDetailProps) {
  if (!data) return 'No data found';

  const cpuSeries = data.map((item) => item.cpu * 100);
  const maxCpu = 100;
  const lastCpuValue = data[data.length - 1].cpu * 100;
  const utilizedCpu = (lastCpuValue / maxCpu) * 100;
  const freeCpu = 100 - utilizedCpu;

  return (
    <Stack
      direction={'row'}
      gap={1}
      sx={{
        opacity: 0,
        transform: 'translateY(-20px)',
        animation: 'fadeInSlideDown 0.5s forwards',
        '@keyframes fadeInSlideDown': {
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Stack component={Paper} p={1} width={300} height={300} flex={1}>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'pie',
            },
            title: {
              text: '',
            },
            plotOptions: {
              pie: {
                innerSize: '60%', // Donut efekt
                dataLabels: {
                  enabled: true,
                  distance: 30, // Vzdálenost popisků od grafu
                  format: '{point.name}: {point.y:.1f}%',
                  style: {
                    color: '#000000', // Barva textu popisků
                  },
                },
              },
            },
            series: [
              {
                name: 'CPU Využití',
                data: [
                  { name: 'Využito', y: utilizedCpu, color: 'red' }, // Oranžová barva
                  { name: 'Volné', y: freeCpu, color: 'lightgray' }, // Zelená barva
                ],
              },
            ],
            // Přidání textu doprostřed grafu
            subtitle: {
              text: `${utilizedCpu.toFixed(1)}%`,
              align: 'center',
              verticalAlign: 'middle',
              style: {
                fontSize: '32px',
                fontWeight: 'bold',
                color: 'black',
              },
            },
          }}
        />
      </Stack>

      <Stack component={Paper} p={1} width={600} height={300} flex={2}>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'area',
            },
            title: {
              text: '',
            },
            xAxis: {
              labels: {
                enabled: false, // Odebere popisky na ose X
              },
              tickLength: 0, // Odebere značky (ticks) na ose X
            },
            yAxis: {
              max: 100, // Nastaví maximální hodnotu na ose Y na 100
              title: {
                text: 'Využití (%)',
              },
            },
            series: [
              {
                name: `CPU (${cpuSeries[cpuSeries.length - 1]}%)`,
                data: cpuSeries,
              },
            ],
          }}
        />
      </Stack>
    </Stack>
  );
}
