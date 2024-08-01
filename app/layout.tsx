import {CssBaseline, ThemeProvider} from '@mui/material';
import './global.css';
import theme from "@/app/theme";
import React from "react";

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
  return (

      <html lang="en">
      <body>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
      </ThemeProvider>
      </body>
      </html>


  );
}
