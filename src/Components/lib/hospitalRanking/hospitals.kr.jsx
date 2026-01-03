// src/lib/hospitalRanking/hospitals.kr.jsx

export const UNIVERSITY_HOSPITALS_KR = [
    {
      id: "snu",
      name: "서울대학교병원",
      city: "서울",
      tier: "TERTIARY", // tertiary / university
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: [
        "내과","외과","정형외과","신경과","신경외과","혈액종양내과",
        "소아청소년과","심장내과","흉부외과","응급의학과","영상의학과"
      ],
    },
    {
      id: "samsung",
      name: "삼성서울병원",
      city: "서울",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: false,
      specialtiesStrong: [
        "내과","혈액종양내과","소화기내과","심장내과","신경과","정형외과",
        "영상의학과","방사선종양학과"
      ],
    },
    {
      id: "asan",
      name: "서울아산병원",
      city: "서울",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: [
        "내과","외과","정형외과","심장내과","흉부외과","신경외과",
        "소아청소년과","응급의학과","영상의학과"
      ],
    },
    {
      id: "severance",
      name: "세브란스병원(연세대)",
      city: "서울",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: [
        "내과","외과","정형외과","신경외과","혈액종양내과",
        "산부인과","소아청소년과","이비인후과"
      ],
    },
    {
      id: "catholic_seoul",
      name: "서울성모병원(가톨릭대)",
      city: "서울",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: false,
      specialtiesStrong: [
        "혈액종양내과","내과","소화기내과","신장내과","류마티스내과",
        "외과","산부인과"
      ],
    },
    {
      id: "ku_anam",
      name: "고려대학교 안암병원",
      city: "서울",
      tier: "UNIVERSITY",
      hasCancerCenter: true,
      hasTraumaCenter: false,
      specialtiesStrong: [
        "내과","외과","정형외과","신경외과","소아청소년과","응급의학과"
      ],
    },
    {
      id: "kyunghee",
      name: "경희대학교병원",
      city: "서울",
      tier: "UNIVERSITY",
      hasCancerCenter: false,
      hasTraumaCenter: false,
      specialtiesStrong: ["내과","정형외과","이비인후과","피부과"],
    },
    {
      id: "cau",
      name: "중앙대학교병원",
      city: "서울",
      tier: "UNIVERSITY",
      hasCancerCenter: false,
      hasTraumaCenter: false,
      specialtiesStrong: ["내과","외과","정형외과","신경과","응급의학과"],
    },
    {
      id: "ajou",
      name: "아주대학교병원",
      city: "수원",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: ["응급의학과","외과","정형외과","신경외과","내과"],
    },
    {
      id: "snubh",
      name: "분당서울대학교병원",
      city: "성남",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: false,
      specialtiesStrong: ["내과","정형외과","신경과","신경외과","소화기내과"],
    },
  
    // --- 부산/영남 ---
    {
      id: "pusan_univ",
      name: "부산대학교병원",
      city: "부산",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: ["내과","외과","정형외과","응급의학과","소아청소년과"],
    },
    {
      id: "kyungpook",
      name: "경북대학교병원",
      city: "대구",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: ["내과","외과","정형외과","신경외과","응급의학과"],
    },
  
    // --- 호남 ---
    {
      id: "chonnam",
      name: "전남대학교병원",
      city: "광주",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: ["내과","외과","정형외과","응급의학과","신경외과"],
    },
  
    // --- 충청 ---
    {
      id: "cnu",
      name: "충남대학교병원",
      city: "대전",
      tier: "TERTIARY",
      hasCancerCenter: true,
      hasTraumaCenter: true,
      specialtiesStrong: ["내과","외과","정형외과","응급의학과"],
    },
  ];
  