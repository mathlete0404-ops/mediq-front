// src/lib/hospitalRanking/specialties.jsx

export const MEDICAL_SPECIALTIES = [
    "내과",
    "외과",
    "정형외과",
    "신경과",
    "신경외과",
    "심장내과",
    "흉부외과",
    "혈액종양내과",
    "소화기내과",
    "호흡기내과",
    "신장내과",
    "내분비내과",
    "감염내과",
    "류마티스내과",
    "정신건강의학과",
    "재활의학과",
    "마취통증의학과",
    "영상의학과",
    "방사선종양학과",
    "비뇨의학과",
    "산부인과",
    "소아청소년과",
    "이비인후과",
    "안과",
    "피부과",
    "응급의학과",
  ];
  
  // Optional: normalize specialty strings coming from AI
  export function normalizeSpecialty(input) {
    if (!input) return "";
    const s = String(input).trim();
  
    // common variants mapping
    const map = {
      "소아과": "소아청소년과",
      "정신과": "정신건강의학과",
      "마취과": "마취통증의학과",
      "비뇨기과": "비뇨의학과",
      "흉부외과/심장혈관외과": "흉부외과",
      "영상의학과(방사선과)": "영상의학과",
    };
  
    return map[s] || s;
  }
  