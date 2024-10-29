import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from "@/src/app/theme";
import {ReactNode} from "react";
import I18nProvider from './i18nProvider';

import './global.css';
import './i18n';
import React from 'react';

export const metadata = {
    title: "Clickson PEBC",
    description: "Calculate",
};

export default function RootLayout({children, params}: { children: ReactNode, params: { locale: string } }) {

    return (
        <html lang={params.locale}>
        <body>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <I18nProvider locale={params.locale}>
                {children}
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
