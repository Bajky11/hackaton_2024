'use client';

import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import React from 'react';

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}

export default RootLayout;
