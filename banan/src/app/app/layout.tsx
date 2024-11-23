'use client';

import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import { Box } from '@mui/system';
import { header_height } from '@/constants';

function AppLayout({
  children,
}: {
  children: ReactNode; // Typ ReactNode umožňuje JSX, string, null atd.
}) {
  return (
    <Stack direction={'row'} sx={{ height: '100vh' }}>
      <Drawer />
      <Stack direction={'column'} flex={1} p={1} gap={1}>
        <Box px={1}>
          <Header />
        </Box>
        <Box
          sx={{
            p: 1,
            flex: 1,
            overflowY: 'auto',
            height: `calc(100vh - ${header_height}px)`,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}

export default AppLayout;
