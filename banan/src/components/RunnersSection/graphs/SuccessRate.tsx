import React from 'react';
import { PieChartWithCenterLabel } from '@/components/RunnersSection/graphs/PieChartWithCenterLabel';

interface SuccessRateProps {
  data: SuccessRateCounts;
  title: string;
  onFailureClick: () => void;
  onSuccessClick: () => void;
}

interface SuccessRateCounts {
  successCount: number;
  failureCount: number;
}

export function SuccessRate({
  data,
  title,
  onFailureClick,
  onSuccessClick,
}: SuccessRateProps) {
  const totalCount = data.successCount + data.failureCount;
  const failureRate = (data.failureCount / totalCount) * 100;

  const chartData = [
    {
      name: 'Failure',
      value: data.failureCount,
      color: '#BE3B2B',
      onClick: onFailureClick,
    },
    {
      name: 'Success',
      value: data.successCount,
      color: 'green',
      onClick: onSuccessClick,
    },
  ];

  return (
    <PieChartWithCenterLabel
      data={chartData}
      centerLabel={`${failureRate.toFixed(2)}%`}
      title={title}
      backgroundColor="#F6F6F6"
      borderColor="#D7D7D7"
    />
  );
}
