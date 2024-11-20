import { Stack } from '@mui/material';
import React from 'react';

export function MetricsDetailCard({
  children,
  direction = 'row',
}: {
  children: React.ReactNode;
  direction?: 'row' | 'column';
}) {
  return (
    <Stack
      direction={direction}
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
      {children}
    </Stack>
  );
}
