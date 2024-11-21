'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';
import it from './it.json';
import hu from './hu.json';
import gr from './gr.json';
import ro from './ro.json';
import hr from './hr.json';

const resources = {
    en: { translation: en, },
    fr: { translation: fr, },
    es: { translation: es, },
    it: { translation: it, },
    hu: { translation: hu, },
    gr: { translation: gr, },
    ro: { translation: ro, },
    hr: { translation: hr, }
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
        throw ('Error initializing i18n:' + error);
    });

export default i18nPromise;
