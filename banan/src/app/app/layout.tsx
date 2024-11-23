'use client';

import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import { Box } from '@mui/system';
import { drawer_width, header_height } from '@/constants';
import { NotificationsProvider } from '@/app/app/context/NotificationsContext';

function AppLayout({ children }: { children: ReactNode }) {
  return (
    <NotificationsProvider>
      <Stack direction="row" sx={{ height: '100vh', width: '100%' }}>
        <Drawer sx={{ width: drawer_width, flexShrink: 0 }} />
        <Stack direction="column" flex={1} p={1} gap={1}>
          <Box px={1}>
            <Header />
          </Box>
          <Box
            sx={{
              p: 1,
              px: 10,
              flex: 1,
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            {children}
          </Box>
        </Stack>
      </Stack>
    </NotificationsProvider>
  );
}

export default AppLayout;
