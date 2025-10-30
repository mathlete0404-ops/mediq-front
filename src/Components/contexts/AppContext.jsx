
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { translations } from '@/components/lib/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('ko');
  const [viewMode, setViewMode] = useState('landing'); // 'landing' or 'chat'
  const [theme, setTheme] = useState('light');
  const [chatKey, setChatKey] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check for user's manual selection first
    const savedLang = localStorage.getItem('app-lang');
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      // Auto-detect browser language if no manual selection is saved
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLanguage('en');
        localStorage.setItem('app-lang', 'en');
      } else {
        setLanguage('ko'); // Default to Korean for 'ko' and others
        localStorage.setItem('app-lang', 'ko');
      }
    }
  }, []);

  const handleSetLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('app-lang', newLang);
  };
  
  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  const t = useMemo(() => (key, params = {}) => {
    let text = key.split('.').reduce((obj, k) => obj?.[k], translations[language]) || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  }, [language]);
  
  const resetChat = () => {
    setChatKey(prev => prev + 1);
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const value = {
    language, setLanguage: handleSetLanguage,
    t,
    viewMode, setViewMode,
    theme, setTheme: handleSetTheme,
    chatKey, resetChat,
    scrollToSection,
    isSidebarCollapsed, setIsSidebarCollapsed,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
