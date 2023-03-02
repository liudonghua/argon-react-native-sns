import i18next from 'i18next';
import english from './en';
import chinese from './zh';
import { initReactI18next } from 'react-i18next';
// import i18nextDetector from 'i18next-react-native-language-detector';
import i18nextDetector from '@os-team/i18next-react-native-language-detector';

i18next.use(i18nextDetector)
        .use(initReactI18next).init(
  {
    compatibilityJSON: 'v3', 
    fallbackLng: 'en',
    resources: {
      en: english,
      zh: chinese,
    },
   // have a common namespace used around the full app
   // ns: ["components","common"],

   interpolation: {
     escapeValue: false
   },
  });

export default i18next;