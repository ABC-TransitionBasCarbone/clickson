'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/common.json';
import frTranslation from './locales/fr/common.json';
import esTranslation from './locales/es/common.json';
import itTranslation from './locales/it/common.json';
import roTranslation from './locales/ro/common.json';
import hrTranslation from './locales/hr/common.json';
import grTranslation from './locales/gr/common.json';
import huTranslation from './locales/hu/common.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    fr: {
        translation: frTranslation,
    },
    es: {
        translation: esTranslation,
    },
    it: {
        translation: itTranslation,
    },
    hu: {
        translation: huTranslation,
    },
    gr: {
        translation: grTranslation,
    },
    ro: {
        translation: roTranslation,
    },
    hr: {
        translation: hrTranslation,
    }
};

const i18nPromise = i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
    })
    .catch((error) => {
        console.error('Error initializing i18n:', error);
    });

export default i18nPromise;