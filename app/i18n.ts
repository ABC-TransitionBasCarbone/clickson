'use client';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";

if (!i18n.isInitialized) {
    i18n
        .use(HttpBackend)
        .use(initReactI18next)
        .init<HttpBackendOptions>({
            ns: ["translations"],
            backend: {
                loadPath: `http://localhost:4000/translations/{{lng}}/{{ns}}.json`,
            },
            preload: ["en", "fr", "it", "es", "hr", "gr", "ro", "hu"],
            interpolation: {
                escapeValue: true,
            },
            fallbackLng: "fr",
            react: {
                useSuspense: false,
            },
        });
}
export default i18n;