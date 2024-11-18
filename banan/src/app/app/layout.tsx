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
          <Stack direction={'column'} flex={1} p={1} gap={1}>
            {/* Padding for whole page next to Drawer */}
            <Box px={1}>
              {/* Pading for Header, centralized here to match content at the
              bottom {children} */}
              <Header />
            </Box>
            <Box
              sx={{
                p: 1, // Padding to see whole Card displayed
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
