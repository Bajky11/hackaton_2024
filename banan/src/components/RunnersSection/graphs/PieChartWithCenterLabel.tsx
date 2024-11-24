import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { Stack } from '@mui/material';

interface PieChartWithCenterLabelProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
    onClick?: () => void;
  }>;
  centerLabel: string;
  title?: string;
  backgroundColor?: string;
  borderColor?: string;
  width?: number;
  height?: number;
}

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export const PieChartWithCenterLabel = ({
  data,
  centerLabel,
  title,
  backgroundColor = '#F6F6F6',
  borderColor = '#D7D7D7',
  width = 350,
  height = 200,
}: PieChartWithCenterLabelProps) => {
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Stack
      p={1}
      maxHeight={300}
      flex={1}
      bgcolor={backgroundColor}
      border={`0.5px solid ${borderColor}`}
      borderRadius={1}
    >
      {title && (
        <h3 style={{ textAlign: 'center', marginBottom: 16 }}>{title}</h3>
      )}
      <PieChart
        series={[
          {
            data: data.map((item) => ({
              value: item.value,
              label: item.name,
              color: item.color,
              onClick: item.onClick,
            })),
            innerRadius: 80,
            paddingAngle: 1,
            cornerRadius: 3,
          },
        ]}
        width={width}
        height={height}
        onItemClick={(event, d) => data[d.dataIndex].onClick?.()}
      >
        <PieCenterLabel>{centerLabel}</PieCenterLabel>
      </PieChart>
    </Stack>
  );
};
