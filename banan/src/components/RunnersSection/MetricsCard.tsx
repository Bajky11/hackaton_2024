import { useState } from 'react';
import { Card, Typography } from '@mui/material';

interface MetricsCardProps {
  name: string;
  value: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function MetricsCard({
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
