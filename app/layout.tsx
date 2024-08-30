import {Box, CssBaseline, Stack, ThemeProvider} from '@mui/material';
import './global.css';
import theme from "@/app/theme";
import React from "react";
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import './global.css';

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const loaderComponent = (<Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center"}}>
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  </Stack>);

  return (

      <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={loaderComponent}>
            {children}
          </Suspense>
      </ThemeProvider>
      </body>
      </html>


  );
}
