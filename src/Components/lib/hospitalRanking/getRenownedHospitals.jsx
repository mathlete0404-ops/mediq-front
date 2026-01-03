// src/lib/hospitalRanking/getRenownedHospitals.jsx

import { UNIVERSITY_HOSPITALS_KR } from "./hospitals.kr";
import { calculateHospitalScore } from "./scoringRules";
import { normalizeSpecialty } from "./specialties";

export function getRenownedHospitalsKRBySpecialty(rawSpecialty, limit = 10) {
  const specialty = normalizeSpecialty(rawSpecialty);

  if (!specialty) return [];

  const ranked = UNIVERSITY_HOSPITALS_KR
    .map((h) => ({
      id: h.id,
      name: h.name,
      // HospitalCard expects these fields; fill minimal placeholders:
      address: `${h.city} (대표 병원)`,
      phone: "",
      distance: null,
      url: "",
      category: `대학병원 > ${specialty}`,
      lat: null,
      lng: null,

      // scoring metadata
      rankScore: calculateHospitalScore(h, specialty),
      _meta: h,
    }))
    .filter((h) => h.rankScore > 0)
    .sort((a, b) => b.rankScore - a.rankScore);

  return ranked.slice(0, limit);
}
