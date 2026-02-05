 import { useState, useEffect } from 'react';
 import { getLangFromStorage, type LangKey } from '@/i18n/strings';
 
 /**
  * Hook that returns the correct text based on current language setting.
  * Updates automatically when language changes.
  */
 export function useBilingualText(en: string, ar: string): string {
   const [lang, setLang] = useState<LangKey>(() => {
     if (typeof window === 'undefined') return 'ar';
     return getLangFromStorage();
   });
 
   useEffect(() => {
     const storedLang = getLangFromStorage();
     setLang(storedLang);
     
     // Poll for language changes (syncs with language toggle)
     const interval = setInterval(() => {
       const currentLang = getLangFromStorage();
       setLang(prev => prev !== currentLang ? currentLang : prev);
     }, 500);
     
     return () => clearInterval(interval);
   }, []);
 
   return lang === 'ar' ? ar : en;
 }
 
 /**
  * Hook that returns current language state.
  * Useful when you need conditional logic based on language.
  */
 export function useLang(): { lang: LangKey; isArabic: boolean } {
   const [lang, setLang] = useState<LangKey>(() => {
     if (typeof window === 'undefined') return 'ar';
     return getLangFromStorage();
   });
 
   useEffect(() => {
     const storedLang = getLangFromStorage();
     setLang(storedLang);
     
     const interval = setInterval(() => {
       const currentLang = getLangFromStorage();
       setLang(prev => prev !== currentLang ? currentLang : prev);
     }, 500);
     
     return () => clearInterval(interval);
   }, []);
 
   return { lang, isArabic: lang === 'ar' };
 }