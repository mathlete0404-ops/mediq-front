// src/lib/hospitalRanking/scoringRules.jsx

const BASE_TIER_SCORE = {
    TERTIARY: 40,
    UNIVERSITY: 25,
    OTHER: 10,
  };
  
  export function calculateHospitalScore(hospital, specialty, options = {}) {
    const {
      cityBoost = 0,  // you can add distance-based boost later
    } = options;
  
    let score = 0;
  
    // 1) Base tier
    score += BASE_TIER_SCORE[hospital.tier] ?? BASE_TIER_SCORE.OTHER;
  
    // 2) Specialty strength list gives bigger boost
    if (hospital.specialtiesStrong?.includes(specialty)) score += 45;
  
    // 3) General capability (if not in strong list, still allow smaller relevance)
    // (optional: you can add a "specialtiesAvailable" later)
    // score += hospital.specialtiesAvailable?.includes(specialty) ? 20 : 0;
  
    // 4) Center bonuses
    if (hospital.hasCancerCenter) {
      // cancer-related specialties
      if (specialty === "혈액종양내과" || specialty === "방사선종양학과") score += 15;
      else score += 5;
    }
  
    if (hospital.hasTraumaCenter) {
      if (specialty === "응급의학과" || specialty === "외과" || specialty === "정형외과") score += 15;
      else score += 5;
    }
  
    // 5) Small city boost placeholder (distance/region logic can go here)
    score += cityBoost;
  
    return score;
  }
  