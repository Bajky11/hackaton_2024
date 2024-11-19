'use client';

import { Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function Page() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics = [
    { id: 'cpu', name: 'cpu usage', value: '86 %', color: '#BE3B2B' },
    { id: 'memory', name: 'memory usage', value: '119.2 MB', color: '#9E51AE' },
    { id: 'network', name: 'download', value: '156 MB/s', color: '#499AF2' },
    { id: 'network', name: 'upload', value: '223 MB/s', color: '#499AF2' },
    { id: 'disk', name: 'disk read', value: '2564', color: '#4BA43A' },
    { id: 'disk', name: 'disk write', value: '5,839,093', color: '#4BA43A' },
  ];

  function displaySelectedMetrics() {
    switch (selectedMetric) {
      case 'cpu': {
        return <CpuMetricsDetail />;
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
    <Stack>
      <Stack direction="row" gap={1}>
        {metrics.map(({ id, name, value, color }) => (
          <MetricsCard
            key={name}
            id={id}
            name={name}
            value={value}
            color={color}
            selected={selectedMetric === id}
            onClick={() => setSelectedMetric(selectedMetric === id ? null : id)}
          />
        ))}
      </Stack>
      {displaySelectedMetrics()}
    </Stack>
  );
}

interface MetricsCardProps {
  id: string;
  name: string;
  value: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

function MetricsCard({
  id,
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
      <Typography fontWeight="bold" fontSize={20} color={headingTextColor}>
        {name}
      </Typography>
      <Typography fontWeight="bold" fontSize={36} color={valueTextColor}>
        {value}
      </Typography>
    </Card>
  );
}

function CpuMetricsDetail() {
  return 'cpu metrics detail';
}
