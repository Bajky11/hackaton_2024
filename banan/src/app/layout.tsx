'use client';

import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import React from 'react';
import Head from 'next/head'; // Správný import pro metadata

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
