import {CssBaseline, Stack, ThemeProvider} from '@mui/material';
import './global.css';
import theme from "@/app/theme";
import {ReactNode, Suspense} from "react";
import I18nProvider from './i18nProvider';

import './global.css';
import './i18n';
import React from 'react';

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({children, params}: { children: ReactNode, params: { locale: string } }) {

  return (

      <html lang={params.locale}>
      <body>
      <ThemeProvider theme={theme}>
          <CssBaseline />
              <I18nProvider locale={params.locale}>
                  {children}
              </I18nProvider>
      </ThemeProvider>
      </body>
      </html>


    );
}
