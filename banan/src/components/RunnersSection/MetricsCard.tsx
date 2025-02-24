import { useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { useColorScheme, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface MetricsCardProps {
  name: string;
  value: string;
  color: string;
  selected: boolean;
  onClick: () => void;
  isMobile: boolean;
}

export function MetricsCard({
  name,
  value,
  color,
  selected,
  onClick,
  isMobile,
}: MetricsCardProps) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  const headingTextColor = hovered ? 'black' : selected ? 'black' : color;
  const valueTextColor = hovered ? 'black' : selected ? 'black' : '#3F3F3F';

  //  Tohle je už i na mě moc :D
  const backgroundColor =
    theme.palette.mode === 'light'
      ? hovered
        ? color
        : selected
          ? color
          : theme.palette.background.default
      : hovered
        ? color
        : selected
          ? color
          : "#1e1e1e";

  return (
    <Stack
      direction={isMobile ? 'row' : 'column'}
      gap={isMobile ? 2 : 0}
      border={`0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`}
      borderRadius={2}
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
        textAlign='center'
        variant={isMobile ? 'h7' : 'h6'}
        color={headingTextColor}
        textTransform={'uppercase'}
      >
        {name}
      </Typography>
      <Typography
        fontWeight="bold"
        color={valueTextColor}
        variant={isMobile ? 'h5' : 'h5'}
      >
        {value}
      </Typography>
    </Stack>
  );
}
