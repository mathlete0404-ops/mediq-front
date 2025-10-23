import React from 'react';

export default function HeroPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EAF4FF] via-[#ECFFFB] to-transparent dark:from-[#0E1422] dark:via-[#0E1422] opacity-90" />
      {/* Animated waves */}
      <svg className="absolute bottom-0 left-0 w-[140%] h-64 opacity-60 text-[#A7D6FF] dark:text-[#0F2A44]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,160L48,160C96,160,192,160,288,149.3C384,139,480,117,576,117.3C672,117,768,139,864,170.7C960,203,1056,245,1152,250.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <svg className="absolute bottom-6 left-0 w-[140%] h-56 opacity-50 text-[#B7FFE7] dark:text-[#0C253A]" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,288L80,272C160,256,320,224,480,224C640,224,800,256,960,245.3C1120,235,1280,181,1360,154.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
      </svg>
      {/* Floating medical particles */}
      <div className="pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-[#00C2B8]/30 dark:bg-[#00C2FF]/30 rounded-full blur-[1px] animate-float"
            style={{
              top: `${10 + (i * 6) % 80}%`,
              left: `${(i * 7 * 9) % 100}%`,
              animationDuration: `${8 + (i % 5)}s`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}