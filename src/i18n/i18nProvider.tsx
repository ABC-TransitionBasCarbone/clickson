"use client";

import { useEffect, useState } from "react";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export default function I18nProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        i18n.changeLanguage(locale).then(() => {
            setIsReady(true);
        }).catch((error) => {
            setIsReady(true);
            throw new Error('Failed to initialize i18n:' + error);
        });
    }, [locale]);

    if (!isReady) {
        return <Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
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
        </Stack>;
    }

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
