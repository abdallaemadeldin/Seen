import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'

import * as en from './langs/en.json'
import * as ar from './langs/ar.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: en,
            ar: ar
        },
        lng: Localization.locale,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n