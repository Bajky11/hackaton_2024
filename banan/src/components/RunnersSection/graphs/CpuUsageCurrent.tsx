import React from 'react';
import { PieChartWithCenterLabel } from '@/components/RunnersSection/graphs/PieChartWithCenterLabel';
import { Stack } from '@mui/material';
import { Metric } from '@/services/runner';
import { useTheme } from '@mui/material/styles';
import {
  getBackgroundColor,
  getBorderColor,
} from '@/components/RunnersSection/graphs/functions';

export function CpuUsageCurrent({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const maxCpu = 100;
  const lastCpuValue = data[data.length - 1].cpu * 100;
  const utilizedCpu = (lastCpuValue / maxCpu) * 100;
  const freeCpu = 100 - utilizedCpu;

  const chartData = [
    { name: 'Utilized', value: utilizedCpu, color: '#BE3B2B' },
    { name: 'Free', value: freeCpu, color: 'lightgray' },
  ];

  return (
    <PieChartWithCenterLabel
      data={chartData}
      centerLabel={`${utilizedCpu.toFixed(1)}%`}
      title="CPU Usage"
      backgroundColor={getBackgroundColor(theme)}
      borderColor={getBorderColor(theme)}
    />
  );
}
