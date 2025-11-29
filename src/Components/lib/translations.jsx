
export const translations = {
    ko: {
      // Hero
      hero_title_1: "증상을 말하면,",
      hero_title_2: "맞는 {dynamic}을 바로.",
      keyword_symptom: "증상",
      keyword_doctor: "의사",
      keyword_hospital: "병원",
      ai_thinking: "AI가 생각 중…",
      ai_summary_box: "{count}개 병원을 분석했습니다.",
      hero_subtitle: "AI가 증상을 분석해 전문과, 근처 병원, 예상 진료비를 안내합니다.",
      chat_placeholder: "무릎이 붓고 물이 찬 것 같아요…",
      chat_prompt_detail: "증상, 시작 시기, 강도 등을 자세히 적어주세요",
      chat_start_button: "지금 시작하기",
      chat_analyzing_button: "분석 중...",
      symptom_suggestion_headache: "두통",
      symptom_suggestion_stomachache: "복통",
      symptom_suggestion_fever: "발열",
      symptom_suggestion_cough: "기침",
  
      // New translation keys for symptom template
      symptom_template_title: "더 자세히 입력하기",
      symptom_template_less: "간단히 입력",
      symptom_summary_preview: "자동 요약",
  
      // Disclaimer
      disclaimer_title: "의료 정보 제공 서비스입니다.",
      disclaimer_content: "이 서비스는 진단이 아닌 병원 방문을 돕기 위한 정보만 제공합니다. 정확한 진단과 치료는 반드시 의료 전문가와 상담하세요.",
  
      // Conversation
      my_symptoms: "나의 증상",
  
      // Analysis Results
      analysis_loading: "AI가 증상을 분석 중입니다...",
      analysis_result_title: "AI 분석 결과",
      estimated_disease: "추정 질환",
      no_info: "정보 없음",
      recommended_specialty: "추천 진료과",
      recommendation_reason: "추천 이유:",
      find_hospitals_prompt: "병원 추천도 받아보시겠어요?",
      find_emergency_room_prompt: "가까운 응급실 정보를 확인하시겠습니까?",
      yes: "예",
      no: "아니오",
      view_emergency_rooms: "응급실 보기",
  
      // Emergency Alert
      emergency_alert_title: "응급 상황일 수 있습니다!",
      emergency_alert_content: "AI 분석 결과, 응급 처치가 필요할 수 있는 증상이 포함되어 있습니다.",
      emergency_alert_contact_119: "가장 안전한 방법은 즉시 119에 연락하는 것입니다.",
  
      // Price Info
      price_info_title: "예상 진료비 정보",
      price_item: "항목",
      price_range: "예상 비용 범위",
      price_total: "총 예상 비용",
      price_disclaimer: "실제 비용은 건강보험 적용 여부, 병원 정책, 환자 상태에 따라 크게 달라질 수 있으므로 참고용으로만 확인해주세요.",
      
      // Hospitals
      hospitals_loading: "주변 병원을 찾고 있습니다...",
      hospital_recommendation: "병원 추천",
      hospital_recommendation_subtitle: "AI가 추천하는 {specialty} 병원 목록입니다.",
      back_button: "이전으로",
      university_hospitals: "대학병원",
      local_clinics: "동네병원",
      nearby_hospitals: "가까운 대학병원",
      renowned_hospitals: "이 질환으로 유명한 병원",
      no_nearby_university: "주변에 가까운 대학병원이 없습니다.",
      no_renowned_university: "이 질환으로 유명한 병원 정보를 찾을 수 없습니다.",
      no_nearby_local: "주변에 가까운 동네병원이 없습니다.",
      nearby_local_clinics: "가까운 동네병원",
      distance_away: "{distance}km",
      no_distance_info: "거리 정보 없음",
      
      // Emergency Hospitals
      nearby_emergency_rooms: "가까운 응급실",
      nearby_emergency_rooms_subtitle: "AI가 추천하는 가까운 응급실 목록입니다.",
      emergency_important_notice_title: "매우 중요!",
      emergency_important_notice_content: "이 정보는 참고용이며, 위급 상황 시에는 즉시 119에 연락하세요.",
      nearby_emergency_rooms_list: "가까운 응급실",
      no_emergency_room_info: "주변에 응급실 정보를 찾을 수 없습니다.",
  
      // Hospital Card
      select_hospital: "병원 선택",
      hospital_details: "자세히 보기",
      check_location_on_map: "지도에서 위치 확인",
  
      // Sticky Bottom Bar
      view_on_map: "선택한 {count}곳 지도에서 보기",
      
      // Map Modal
      map_modal_title_single: "{name}",
      map_modal_title_multiple: "선택한 {count}곳 병원 위치",
      close_button: "닫기",
      my_location: "내 위치",
      open_directions: "길찾기 열기",
  
      // Feedback
      was_this_helpful: "이 정보가 도움이 되었나요?",
      comment_placeholder: "피드백을 남겨주시면 서비스 개선에 큰 도움이 됩니다.",
      submit_feedback: "피드백 제출",
      feedback_thanks: "소중한 의견 감사합니다!",
  
      // Layout
      nav_intro: "소개",
      nav_features: "기능",
      nav_safety: "안전",
      nav_contact: "연락",
      features_title: "주요 기능",
      features_tagline: "MediQ는 단순한 검색이 아닌, AI 기반의 의료 추천 플랫폼입니다.",
      feature_security_title: "데이터 보안",
      feature_security_description: "모든 사용자의 증상과 위치 정보는 암호화되어 안전하게 보호됩니다.",
      feature_speed_title: "빠른 분석",
      feature_speed_description: "AI가 입력된 증상을 수 초 내에 분석하여 적절한 진료과와 의사를 추천합니다.",
      feature_navigation_title: "병원 길잡이",
      feature_navigation_description: "위치 기반으로 가까운 병원을 찾고, 지도에서 바로 경로를 안내합니다.",
      feature_care_title: "맞춤 정보",
      feature_care_description: "증상에 맞는 전문과, 병원 평판, 예상 진료비 정보를 한눈에 제공합니다.",
      // New for sidebar
      sidebar: {
          home: "홈",
          introduction: "소개",
          new_chat: "새 채팅",
          close_sidebar: "사이드바 접기",
          theme: "테마",
          language: "언어",
      },
      specialty_explanations: {
        "정형외과": "관절, 뼈, 근육, 인대 등의 통증과 손상을 진단하고 수술 또는 비수술적 방법으로 치료하는 전문 분야입니다.",
        "소화기내과": "식도, 위, 장, 간 등 소화기관 전반에 발생하는 질환을 진단하고 내시경 검사 및 약물로 치료합니다.",
        "심장내과": "가슴 통증, 두근거림, 호흡곤란 등 심장과 혈관 관련 질환을 진단하고 약물치료, 시술 등을 통해 관리합니다.",
        "호흡기내과": "기침, 가래, 호흡곤란 등 폐와 기관지에 발생하는 질환(폐렴, 천식 등)을 진단하고 치료합니다.",
        "내분비내과": "당뇨, 갑상선 질환 등 우리 몸의 호르몬 균형과 관련된 문제를 진단하고 치료합니다.",
        "신경과": "두통, 어지럼증, 손발 저림, 뇌졸중 등 뇌와 신경계에 발생하는 문제를 진단하고 치료합니다.",
        "이비인후과": "귀, 코, 목(인후두)에 발생하는 질환(비염, 중이염, 편도염 등)을 진단하고 치료합니다.",
        "피부과": "여드름, 아토피, 습진, 두드러기 등 다양한 피부 질환과 알레르기 문제를 진단하고 치료합니다.",
        "비뇨기과": "소변 문제, 전립선 질환, 요로 감염 등 신장, 방광, 요도와 관련된 질환을 다룹니다.",
        "산부인과": "여성 생식기 건강, 임신, 출산 등 여성에게 특화된 질환과 건강 문제를 진료합니다.",
        "내과": "우리 몸 내부 장기(소화기, 순환기, 호흡기 등)에 발생하는 질환을 종합적으로 진단하고 치료하는 기본 진료과입니다.",
        "감염내과": "원인 불명의 발열이나 세균, 바이러스 등으로 인한 감염 질환을 전문적으로 진단하고 치료합니다.",
        "안과": "시력 문제, 안구 건조증, 결막염, 백내장 등 눈에 관련된 모든 질환을 진단하고 치료합니다."
      },
      about: {
        title: "AI가 증상을 분석하고, 최적의 의료 선택을 돕습니다.",
        subtitle: "MediQ는 인공지능이 증상 데이터를 분석해 관련 진료과를 분류하고, 위치·비용·평판 데이터를 함께 고려해 가장 적합한 병원을 추천합니다.",
        process_title: "MediQ의 AI 분석 과정",
        step1_title: "Step 1 · 증상 입력",
        step1_desc: "사용자가 증상을 간단히 입력하면, 분석에 적합한 데이터로 정리됩니다.",
        step2_title: "Step 2 · AI 해석",
        step2_desc: "ChatGPT / Gemini / Claude 2.5 중 선택된 모델이 증상을 이해하고 진료과를 분류합니다.",
        step3_title: "Step 3 · 병원 매칭",
        step3_desc: "병원 위치, 평판, 진료비 데이터를 매칭해 최적의 의료 경로를 제시합니다.",
        samples_title: "AI 사용 예시",
        samples_subtitle: "아래는 MediQ의 실제 UI 예시로, 증상 입력부터 분석 결과, 병원 추천까지의 흐름을 보여줍니다.",
        sample1_title: "증상 입력창",
        sample2_title: "AI 분석 결과 화면",
        sample3_title: "병원 추천 카드 UI",
        closing_line: "MediQ는 단순한 검색이 아니라, 당신의 건강 여정을 함께 설계하는 AI 헬스 내비게이터입니다."
      }
    },
    en: {
      // Hero
      hero_title_1: "Tell us your symptoms,",
      hero_title_2: "Find the right {dynamic} instantly.",
      keyword_symptom: "symptoms",
      keyword_doctor: "doctor",
      keyword_hospital: "hospital",
      ai_thinking: "AI is thinking…",
      ai_summary_box: "Analyzed {count} hospitals.",
      hero_subtitle: "AI analyzes your symptoms to recommend specialties, nearby hospitals, and estimated costs.",
      chat_placeholder: "My knee is swollen and feels watery...",
      chat_prompt_detail: "Please describe your symptoms, when they started, intensity, etc.",
      chat_start_button: "Get Started Now",
      chat_analyzing_button: "Analyzing...",
      symptom_suggestion_headache: "Headache",
      symptom_suggestion_stomachache: "Stomachache",
      symptom_suggestion_fever: "Fever",
      symptom_suggestion_cough: "Cough",
  
      // New translation keys for symptom template
      symptom_template_title: "More details",
      symptom_template_less: "Less details",
      symptom_summary_preview: "Summary preview",
  
      // Disclaimer
      disclaimer_title: "This is a medical information service.",
      disclaimer_content: "This service only provides information to help you visit a hospital, not a diagnosis. For an accurate diagnosis and treatment, you must consult a medical professional.",
  
      // Conversation
      my_symptoms: "My Symptoms",
  
      // Analysis Results
      analysis_loading: "AI is analyzing your symptoms...",
      analysis_result_title: "AI Analysis Results",
      estimated_disease: "Estimated Condition",
      no_info: "No Information",
      recommended_specialty: "Recommended Specialty",
      recommendation_reason: "Reason for Recommendation:",
      find_hospitals_prompt: "Would you like to get hospital recommendations?",
      find_emergency_room_prompt: "Would you like to see information on nearby emergency rooms?",
      yes: "Yes",
      no: "No",
      view_emergency_rooms: "View E.R.",
  
      // Emergency Alert
      emergency_alert_title: "This may be an emergency!",
      emergency_alert_content: "The AI analysis includes symptoms that may require immediate medical attention.",
      emergency_alert_contact_119: "The safest option is to contact emergency services (119 in Korea) immediately.",
  
      // Price Info
      price_info_title: "Estimated Medical Costs",
      price_item: "Item",
      price_range: "Estimated Cost Range",
      price_total: "Total Estimated Cost",
      price_disclaimer: "Please note that actual costs can vary greatly depending on insurance coverage, hospital policies, and the patient's condition. Use this for reference only.",
      
      // Hospitals
      hospitals_loading: "Finding nearby hospitals...",
      hospital_recommendation: "Hospital Recommendation",
      hospital_recommendation_subtitle: "Here is a list of {specialty} hospitals recommended by the AI.",
      back_button: "Back",
      university_hospitals: "University Hospitals",
      local_clinics: "Local Clinics",
      nearby_hospitals: "Nearby University Hospitals",
      renowned_hospitals: "Renowned Hospitals for this Condition",
      no_nearby_university: "No nearby university hospitals found.",
      no_renowned_university: "No renowned hospitals for this condition found.",
      no_nearby_local: "No nearby local clinics found.",
      nearby_local_clinics: "Nearby Local Clinics",
      distance_away: "{distance}km away",
      no_distance_info: "No distance info",
  
      // Emergency Hospitals
      nearby_emergency_rooms: "Nearby Emergency Rooms",
      nearby_emergency_rooms_subtitle: "List of nearby emergency rooms recommended by the AI.",
      emergency_important_notice_title: "Very Important!",
      emergency_important_notice_content: "This information is for reference only. In a critical situation, call 119 immediately.",
      nearby_emergency_rooms_list: "Nearby Emergency Rooms",
      no_emergency_room_info: "Could not find information on nearby emergency rooms.",
  
      // Hospital Card
      select_hospital: "Select hospital",
      hospital_details: "View Details",
      check_location_on_map: "Check location on map",
  
      // Sticky Bottom Bar
      view_on_map: "View {count} selected on map",
      
      // Map Modal
      map_modal_title_single: "{name}",
      map_modal_title_multiple: "{count} selected hospital locations",
      close_button: "Close",
      my_location: "My Location",
      open_directions: "Open Directions",
  
      // Feedback
      was_this_helpful: "Was this information helpful?",
      comment_placeholder: "Your feedback is valuable for improving our service.",
      submit_feedback: "Submit Feedback",
      feedback_thanks: "Thank you for your valuable feedback!",
      
      // Layout & Features
      nav_intro: "Intro",
      nav_features: "Features",
      nav_safety: "Safety",
      nav_contact: "Contact",
      features_title: "Key Features",
      features_tagline: "MediQ is not just search — it’s an AI-powered medical recommendation platform.",
      feature_security_title: "Data Security",
      feature_security_description: "All symptom and location data are encrypted and protected safely.",
      feature_speed_title: "Fast Analysis",
      feature_speed_description: "AI analyzes your input in seconds to recommend the right specialty and doctors.",
      feature_navigation_title: "Hospital Navigator",
      feature_navigation_description: "Find nearby hospitals by location and get directions on the map instantly.",
      feature_care_title: "Personalized Info",
      feature_care_description: "See specialty, hospital reputation, and estimated costs at a glance.",
      // New for sidebar
      sidebar: {
        home: "Home",
        introduction: "Introduction",
        new_chat: "New Chat",
        close_sidebar: "Close Sidebar",
        theme: "Theme",
        language: "Language",
    },
      specialty_explanations: {
        "Orthopedics": "Diagnoses and treats pain and injuries in joints, bones, muscles, and ligaments through surgical or non-surgical methods.",
        "Gastroenterology": "Diagnoses and treats diseases of the digestive system, including the esophagus, stomach, intestines, and liver, using endoscopy and medication.",
        "Cardiology": "Diagnoses and manages heart and blood vessel-related conditions like chest pain, palpitations, and shortness of breath through medication and procedures.",
        "Pulmonology": "Diagnoses and treats diseases of the lungs and bronchial tubes, such as pneumonia and asthma, which cause symptoms like coughing and difficulty breathing.",
        "Endocrinology": "Diagnoses and treats issues related to hormonal balance in the body, such as diabetes and thyroid disorders.",
        "Neurology": "Evaluates and treats problems arising from the brain and nervous system, including headaches, dizziness, numbness, and stroke.",
        "Otolaryngology (ENT)": "Diagnoses and treats diseases related to the ear, nose, and throat, such as rhinitis, otitis media, and tonsillitis.",
        "Dermatology": "Diagnoses and treats a variety of skin conditions and allergies, including acne, atopic dermatitis, eczema, and hives.",
        "Urology": "Deals with diseases related to the kidneys, bladder, and urethra, such as urinary problems, prostate issues, and urinary tract infections.",
        "Obstetrics & Gynecology (OB/GYN)": "Focuses on health issues specific to women, including reproductive health, pregnancy, and childbirth.",
        "Internal Medicine": "A primary specialty that comprehensively diagnoses and treats diseases occurring in the body's internal organs (digestive, circulatory, respiratory systems).",
        "Infectious Disease": "Specializes in diagnosing and treating infectious diseases caused by bacteria, viruses, or unknown fevers.",
        "Ophthalmology": "Diagnoses and treats all eye-related conditions, including vision problems, dry eye syndrome, conjunctivitis, and cataracts."
      },
      about: {
        title: "AI analyzes your symptoms and guides the best medical choices.",
        subtitle: "MediQ analyzes symptom data, classifies specialties, and recommends the most suitable hospitals by considering distance, cost, and reputation.",
        process_title: "MediQ’s AI Analysis Flow",
        step1_title: "Step 1 · Enter Symptoms",
        step1_desc: "Your symptoms are structured into data suitable for analysis.",
        step2_title: "Step 2 · AI Interpretation",
        step2_desc: "A selected model (ChatGPT / Gemini / Claude 2.5) understands symptoms and classifies specialties.",
        step3_title: "Step 3 · Hospital Matching",
        step3_desc: "We match location, reputation, and cost data to propose the optimal medical path.",
        samples_title: "AI Usage Examples",
        samples_subtitle: "Below are real UI examples of MediQ: from symptom input to analysis and hospital recommendations.",
        sample1_title: "Symptom Input",
        sample2_title: "AI Analysis Result",
        sample3_title: "Hospital Recommendation Cards",
        closing_line: "MediQ isn’t just a search — it’s an AI health navigator that designs your health journey with you."
      }
    }
  };
  