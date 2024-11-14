'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { Stack } from '@mui/material';
import Drawer from '@/components/Drawer';
import Header from '@/components/Header';
import { Box } from '@mui/system';
import { header_height } from '@/constants';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Stack direction={'row'} sx={{ height: '100vh' }}>
              <Drawer />
              <Stack direction={'column'} flex={1}>
                <Header />
                <Box
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
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
