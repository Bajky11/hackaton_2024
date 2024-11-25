import { Stack } from '@mui/material';
import React from 'react';

interface MetricsDetailCardProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
}

export function MetricsDetailCard({
  children,
  direction = 'row',
  gap = 1,
}: MetricsDetailCardProps) {
  return (
    <Stack
      direction={direction}
      gap={gap}
      flex={1}
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
      {children}
    </Stack>
  );
}
