import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { AppProvider, useAppContext } from "@/Components/contexts/AppContext";
import Sidebar from "./Components/common/Sidebar";

/* ✅ NEW: 라우터 import */
import { Routes, Route } from "react-router-dom";

/* ✅ NEW: 페이지 import (파일명에 맞춰 경로 수정) */
import Home from "./pages/Home.jsx";

const DarkThemeStyles = () => (
  <style jsx global>{`
    /* ===== Dark Theme Tokens ===== */
    .dark {
      --background: #0E1422;   /* page base */
      --surface:    #121A2A;   /* card/sidebar */
      --surface-2:  #0B111C;   /* big sections (hero next) */
      --foreground: #E8EDF5;   /* main text */
      --muted-foreground: #000000; /* description */
      --border: #1F2A3D;

      --primary: #39A1FF;
      --primary-foreground: #05101E;
      --secondary: #00C2B8;
      --secondary-foreground: #041313;
      --accent: #FFB700;
      --ring: #00C2FF;
      --white: #FFFFFF;
      --black: #000000;

      --hero-grad-dark: linear-gradient(180deg,#0E1422 0%, #0B111C 60%);
    }

    /* ===== Base colors ===== */
    .dark .bg-background { background-color: var(--background); }
    .dark .text-foreground { color: var(--foreground); }
    .dark .text-muted-foreground { color: var(--muted-foreground); }
    .dark .border-gray-200, .dark .border-slate-200 { border-color: var(--border); }

    /* ===== Surfaces ===== */
    .dark .bg-card, .dark .bg-surface { background: var(--surface); }
    .dark .bg-surface-2 { background: var(--surface-2); }

    /* ===== Buttons & links ===== */
    .dark .bg-primary { background: var(--primary); color: var(--primary-foreground); }
    .dark .bg-secondary { background: var(--secondary); color: var(--secondary-foreground); }
    .dark .text-primary { color: var(--primary); }

    /* ===== HERO: dark 전용 그라디언트 사용 ===== */
    .dark .hero { background: var(--hero-grad-dark); }

    /* ⚠ 라이트 유틸의 어두운 오버레이를 완전 제거 (글씨/버튼 가림 원인) */
    .dark .from-blue-50,
    .dark .bg-blue-50,
    .dark .bg-white\\/70,
    .dark .bg-secondary\\/50 { background: unset !important; }

    /* ===== Sections / Cards / Images (마지막 두 섹션 톤 고정) ===== */
    .dark .section-muted { 
      background: var(--surface-2) !important; 
      border: 1px solid var(--border) !important; 
      box-shadow: 0 8px 24px rgba(0,0,0,.25) !important;
    }
    .dark .section-muted .heading,
    .dark .card .heading { color: var(--foreground) !important; }
    .dark .section-muted .subtext,
    .dark .card .subtext { color: var(--muted-foreground) !important; }

    .dark .card { 
      background: var(--surface) !important; 
      border: 1px solid var(--border) !important; 
      box-shadow: 0 10px 30px rgba(0,0,0,.3) !important; 
      border-radius: 0.75rem;
    }

    .dark .image-frame { 
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      overflow: hidden;
    }
    .dark .image-frame img { filter: none !important; opacity: 1 !important; }

    /* 섹션 구분 민트 라인 */
    .dark .section-accent { 
      height: 4px; width: 56px; margin-inline:auto; 
      background: var(--secondary); border-radius: 999px;
    }

    /* 히어로→다음 섹션 경계 부자연스러움 보정 */
    .dark .hero + .section-muted { 
      margin-top: -24px;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      padding-top: 40px;
    }

    /* ===== Theme Toggle (ON/OFF 확실히 보이게) ===== */
    .dark .theme-toggle,
    .light .theme-toggle {
      width: 50px; height: 28px; border-radius: 999px;
      display: inline-flex; align-items: center; position: relative;
      border: 1px solid var(--border);
      background: var(--surface);    /* off bg */
      transition: background .2s ease, border-color .2s ease;
    }
    .dark .theme-handle,
    .light .theme-handle {
      width: 22px; height: 22px; border-radius: 999px;
      background: var(--foreground);
      position: absolute; left: 3px; top: 3px;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
      transition: transform .2s ease, background .2s ease;
    }
    .theme-toggle[data-state="on"] { 
      background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
      border-color: transparent;
    }
    .theme-toggle[data-state="on"] .theme-handle { 
      transform: translateX(22px); background: #fff;
    }
    .theme-toggle:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
    .theme-label { margin-left: 10px; font-size: 13px; color: var(--muted-foreground); }
    .theme-toggle[data-state="on"] ~ .theme-label { color: var(--foreground); font-weight: 600; }

    /* ===== Helpers / Typography ===== */
    .hover-glow { position: relative; }
    .hover-glow::after { content:''; position:absolute; inset:0; border-radius:0.75rem;
      box-shadow: 0 0 0 rgba(0,194,255,0); transition: box-shadow .25s ease; }
    .hover-glow:hover::after { box-shadow: 0 10px 24px rgba(0,194,255,0.18); }

    html, body {
      font-family: Inter, Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', Arial, sans-serif;
      letter-spacing: .3px;
    }
  `}</style>
);

function AppLayout({ children }) {
  const { theme, viewMode, isSidebarCollapsed } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // 페이지 타이틀/메타 설명 설정 (브랜드 교체)
  useEffect(() => {
    const title = 'MedIQ — Find Smarter, Heal Faster.';
    const desc = 'MedIQ is an AI medical assistant that analyzes symptoms and guides you to the right specialty, nearby hospitals, and estimated costs.';
    if (document.title !== title) document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, []);

  // Close mobile sidebar when view changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [viewMode]);

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <DarkThemeStyles />
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-72'}`}>
        <header className="sticky top-0 z-30 flex items-center justify-end h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
        </header>
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        {viewMode === 'landing' && (
          <footer className="bg-gray-800 text-white">
            <div className="max-w-[1200px] mx-auto px-6 py-8 text-center space-y-1">
              <p className="font-semibold tracking-wide">MedIQ — Find Smarter, Heal Faster.</p>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} MedIQ. All Rights Reserved.
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <AppProvider>
      <AppLayout currentPageName={currentPageName}>{children}</AppLayout>
    </AppProvider>
  );
}
