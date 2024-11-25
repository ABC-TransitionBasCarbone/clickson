import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import theme from "@/src/app/theme";
import {CssBaseline, ThemeProvider} from '@mui/material';

import './global.css'
import Head from 'next/head'
import Providers from './Providers'

export const metadata: Metadata = {
    title: "Clickson PEBC",
    description: "Calculate",
};

interface Props {
    children: React.ReactNode
}

const RootLayout = async ({ children }: Readonly<Props>) => {
    const locale = await getLocale()

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <Head>
                <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/gilroy-bold" />
            </Head>

            <body>
                <ThemeProvider theme={theme}>
                <CssBaseline/>

                    <AppRouterCacheProvider>
                        <NextIntlClientProvider messages={messages}>
                            <Providers>{children}</Providers>
                        </NextIntlClientProvider>
                    </AppRouterCacheProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
