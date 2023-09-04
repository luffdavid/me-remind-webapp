import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import StartTranslationEN from './English/StartTranslation.json'
import StartTranslationDE from './German/StartTranslation.json'
import AddButtonTranslationEN from './English/AddButtonTranslation.json'
import AddButtonTranslationDE from './German/AddButtonTranslation.json'
const resources = {
    en: {
        start: StartTranslationEN,
        addButton:  AddButtonTranslationEN
    },
    de: {
        start: StartTranslationDE,
        addButton:  AddButtonTranslationDE
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"en", //default language
});

export default i18next;