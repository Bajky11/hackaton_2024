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
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: When initial state of redux is changed, the redux-persist wont allow app to use it. So it needs to be purged. But this behavior is not wanted.
  useEffect(() => {
    // Purge the persisted state once
    //persistor.purge();
  }, []);

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
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
