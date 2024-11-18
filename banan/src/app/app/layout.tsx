'use client';

import { Stack } from '@mui/material';
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import { Box } from '@mui/system';
import { header_height } from '@/constants';

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Stack direction={'row'} sx={{ height: '100vh' }}>
          <Drawer />
          <Stack direction={'column'} flex={1}>
            <Header />
            <Box
              p={1}
              sx={{
                flex: 1,
                overflowY: 'auto',
                height: `calc(100vh - ${header_height}px)`,
              }}
            >
              {children}
            </Box>
          </Stack>
        </Stack>
      </body>
    </html>
  );
}

export default AppLayout;
