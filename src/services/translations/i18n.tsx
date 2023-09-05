import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { useState } from 'react'

// Importieren Sie alle Übersetzungsdateien
import StartTranslationEN from './English/StartTranslation.json'
import StartTranslationDE from './German/StartTranslation.json'
import AddButtonTranslationEN from './English/AddButtonTranslation.json'
import AddButtonTranslationDE from './German/AddButtonTranslation.json'
import TaskListTranslationEN from './English/TaskListTranslation.json'
import TaskListTranslationDE from './German/TaskListTranslation.json'

const resources = {
  en: {
    start: StartTranslationEN,
    addButton: AddButtonTranslationEN,
    tasklist: TaskListTranslationEN
  },
  de: {
    start: StartTranslationDE,
    addButton: AddButtonTranslationDE,
    tasklist: TaskListTranslationDE
  },
}

const getLanguage = () => {
  const storedLanguage = localStorage.getItem('language');
  if (storedLanguage !== null) {
    return storedLanguage; // Gibt die im localStorage gespeicherte Sprache zurück
  }
  return 'en'; // Standardwert, falls keine Sprache im localStorage gefunden wird
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguage(), // Verwenden Sie die getLanguage-Funktion, um die Sprache aus dem localStorage zu erhalten
  });

export default i18next;
