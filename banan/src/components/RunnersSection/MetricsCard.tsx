import { useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  const headingTextColor = hovered ? 'black' : selected ? 'black' : color;
  const valueTextColor = hovered ? 'black' : selected ? 'black' : '#3F3F3F';

  //  Tohle je už i na mě moc :D
  const backgroundColor =
    theme.palette.mode === 'light'
      ? hovered
        ? color
        : selected
          ? color
          : '#F6F6F6'
      : hovered
        ? color
        : selected
          ? color
          : '#111111';

  return (
    <Stack
      border={`0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`}
      borderRadius={1}
      alignItems={'center'}
      justifyContent={'center'}
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
        variant={'h6'}
        color={headingTextColor}
        textTransform={'uppercase'}
      >
        {name}
      </Typography>
      <Typography fontWeight="bold" color={valueTextColor} variant={'h4'}>
        {value}
      </Typography>
    </Stack>
  );
}
