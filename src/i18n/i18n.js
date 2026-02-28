import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslations from './ar.json';
import enTranslations from './en.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translations: enTranslations
            },
            ar: {
                translations: arTranslations
            }
        },
        lng: 'ar',
        fallbackLng: 'ar',
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
