'use client';

import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import React, { Suspense } from 'react';
import Head from 'next/head';
import AppInitializer from '@/components/UserSection/AppInitializer';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            <AppInitializer />
            {children}
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}

export default RootLayout;
