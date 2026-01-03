import React from 'react';
import Link from 'next/link';
import { Stethoscope, Home, Sparkles, MessageSquarePlus, Settings, Sun, Moon, Languages, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Switch } from '@/Components/ui/switch';
import { useAppContext } from '@/Components/contexts/AppContext';
import Logo from './Logo';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { viewMode, setViewMode, t, language, setLanguage, theme, setTheme, resetChat, scrollToSection, isSidebarCollapsed, setIsSidebarCollapsed } = useAppContext();

  const handleNavClick = (sectionId) => {
    if (viewMode !== 'landing') {
      setViewMode('landing');
      // Wait for landing page to render before scrolling
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
    if (mobileOpen) setMobileOpen(false);
  };

  const handleNewChat = () => {
    resetChat();
    setViewMode('chat');
    if (mobileOpen) setMobileOpen(false);
  };
  
  const handleHomeClick = () => {
    setViewMode('landing');
    if (mobileOpen) setMobileOpen(false);
  }

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <aside className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-50 flex flex-col transition-all duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isSidebarCollapsed ? 'w-20' : 'w-72'} ${theme === 'dark' ? 'bg-[#0E1422]' : ''}`}>
        <div className="p-6 border-b border-gray-700">
        <Link
          href="/"
          onClick={handleHomeClick}
          title="MedIQ — Find Smarter, Heal Faster."
          className={`flex items-center group ${isSidebarCollapsed ? "justify-center" : "gap-3"}`}
        >
          {/* ✅ Prevent shrinking + keep centered */}
          <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className="w-14 h-14 object-contain transition-transform group-hover:scale-110"
            />
          </div>

          {/* ✅ Don't use w-0; remove it when collapsed */}
          {!isSidebarCollapsed && (
            <span className="text-xl font-bold whitespace-nowrap">
              MedIQ
            </span>
          )}
        </Link>

        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-2">
          <Button variant="ghost" className={`w-full text-base ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`} onClick={handleHomeClick}>
            <Home className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
            <span className={isSidebarCollapsed ? 'hidden' : ''}>{t("sidebar.home")}</span>
          </Button>
          <Button variant="ghost" className={`w-full text-base ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`} onClick={() => handleNavClick('about')}>
            <Sparkles className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
            <span className={isSidebarCollapsed ? 'hidden' : ''}>{t("sidebar.introduction")}</span>
          </Button>
          <Button variant="ghost" className={`w-full text-base ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`} onClick={handleNewChat}>
            <MessageSquarePlus className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
            <span className={isSidebarCollapsed ? 'hidden' : ''}>{t("sidebar.new_chat")}</span>
          </Button>
        </nav>

        <div className="px-3 py-6 mt-auto border-t border-gray-700 space-y-4">
           <Button variant="ghost" className={`w-full text-base hidden md:flex ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`} onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
              {isSidebarCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5 mr-3" />}
              <span className={isSidebarCollapsed ? 'hidden' : ''}>{t("sidebar.close_sidebar")}</span>
          </Button>
          <div className={`px-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <label htmlFor="theme-toggle" className={`flex items-center gap-3 text-white ${isSidebarCollapsed ? 'hidden' : ''}`}>
              <Sun className="w-5 h-5" />
              <span>{t("sidebar.theme")}</span>
            </label>
             <div className={isSidebarCollapsed ? 'flex items-center justify-center w-full' : ''}>
              <Switch
                id="theme-toggle"
                checked={theme === 'dark'}
                onCheckedChange={(isDark) => setTheme(isDark ? 'dark' : 'light')}
                aria-label="테마 전환"
              />
            </div>
          </div>
          <div className={`px-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <label htmlFor="lang-toggle" className={`flex items-center gap-3 text-white ${isSidebarCollapsed ? 'hidden' : ''}`}>
              <Languages className="w-5 h-5" />
              <span>{t("sidebar.language")}</span>
            </label>
            <div className={isSidebarCollapsed ? 'flex items-center justify-center w-full' : ''}>
              <Switch
                id="lang-toggle"
                checked={language === 'en'}
                onCheckedChange={(isEn) => setLanguage(isEn ? 'en' : 'ko')}
                aria-label="언어 전환"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
