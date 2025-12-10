
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Card } from '@/Components/ui/card';
import { Loader2, Zap, Camera, X, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '@/Components/contexts/AppContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SymptomTemplate from './SymptomTemplate';
import AnalysisResult from './AnalysisResult';
import HospitalList from '@/Components/hospitals/HospitalList';

const hostpitalDummyData = [
  {
      "name": "참좋은 정형외과",
      "type": "local",
      "specialty": "정형외과",
      "address": "서울 강남구 일원로 50",
      "lat": 37.4891,
      "lng": 127.0811,
      "phone": "02-459-7588",
      "hours_text": "평일 09:00-18:30, 토 09:00-13:00",
      "description": "초음파 유도 주사 치료와 체외충격파 치료에 경험이 많습니다.",
      "renown_score": 68.0,
      "tags": [
          "체외충격파",
          "초음파"
      ],
      "id": "68e1032876522e702d961c15",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "삼성서울병원",
      "type": "university",
      "specialty": "정형외과",
      "address": "서울 강남구 일원로 81",
      "lat": 37.4883,
      "lng": 127.0854,
      "phone": "02-3410-2114",
      "hours_text": "평일 08:00-17:00",
      "description": "관절 질환, 스포츠 손상 분야에서 높은 전문성을 갖추고 있습니다.",
      "renown_score": 95.0,
      "tags": [
          "관절내시경",
          "어깨질환"
      ],
      "id": "68e1032876522e702d961c10",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "안암정형외과의원",
      "type": "local",
      "specialty": "정형외과",
      "address": "서울 성북구 고려대로 88",
      "lat": 37.5855,
      "lng": 127.029,
      "phone": "02-921-8275",
      "hours_text": "평일 09:00-18:00, 토 09:00-13:00",
      "description": "통증 치료 및 물리치료에 강점이 있는 동네 의원입니다.",
      "renown_score": 65.0,
      "tags": [
          "물리치료",
          "통증클리닉"
      ],
      "id": "68e1032876522e702d961c13",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "서울아산병원",
      "type": "university",
      "specialty": "정형외과",
      "address": "서울 송파구 올림픽로43길 88",
      "lat": 37.5273,
      "lng": 127.1079,
      "phone": "1688-7575",
      "hours_text": "평일 08:30-17:00",
      "description": "고관절 및 슬관절 치환술 분야에서 국내 최고 수준의 수술 건수를 기록하고 있습니다.",
      "renown_score": 96.0,
      "tags": [
          "고관절",
          "슬관절"
      ],
      "id": "68e1032876522e702d961c11",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "강남세브란스병원",
      "type": "university",
      "specialty": "척추신경외과",
      "address": "서울 강남구 언주로 211",
      "lat": 37.4939,
      "lng": 127.048,
      "phone": "1599-6114",
      "hours_text": "평일 08:30-17:30",
      "description": "척추 질환에 특화된 전문 센터를 운영하고 있습니다.",
      "renown_score": 91.0,
      "tags": [
          "척추내시경",
          "디스크"
      ],
      "id": "68e1032876522e702d961c12",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "고려대학교 안암병원",
      "type": "university",
      "specialty": "정형외과",
      "address": "서울 성북구 고려대로 73",
      "lat": 37.5871,
      "lng": 127.0256,
      "phone": "1577-0083",
      "hours_text": "평일 08:30-17:00",
      "description": "최첨단 로봇수술을 포함한 정형외과 수술 분야에서 명성이 높습니다.",
      "renown_score": 92.0,
      "tags": [
          "로봇수술",
          "스포츠의학"
      ],
      "id": "68e1032876522e702d961c0e",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "연세대학교 세브란스병원",
      "type": "university",
      "specialty": "정형외과",
      "address": "서울 서대문구 연세로 50-1",
      "lat": 37.5623,
      "lng": 126.9472,
      "phone": "1599-1004",
      "hours_text": "평일 08:30-17:30",
      "description": "국내 최초의 서양식 병원으로, 관절 및 척추 질환 치료에 오랜 역사를 가지고 있습니다.",
      "renown_score": 93.0,
      "tags": [
          "인공관절",
          "재활의학"
      ],
      "id": "68e1032876522e702d961c0f",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "대학로 서울내과",
      "type": "local",
      "specialty": "내과",
      "address": "서울 종로구 대학로 12길 1",
      "lat": 37.5823,
      "lng": 127.0019,
      "phone": "02-741-1155",
      "hours_text": "평일 08:30-18:00, 토 08:30-13:00",
      "description": "만성질환 관리와 종합검진을 전문으로 하는 내과입니다.",
      "renown_score": 60.0,
      "tags": [
          "건강검진",
          "만성질환"
      ],
      "id": "68e1032876522e702d961c16",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "서울대학교병원",
      "type": "university",
      "specialty": "정형외과",
      "address": "서울 종로구 대학로 101",
      "lat": 37.5794,
      "lng": 126.9996,
      "phone": "02-2072-2114",
      "hours_text": "평일 09:00-17:00",
      "description": "국내 최고의 의료 수준을 자랑하는 국가중앙병원입니다.",
      "renown_score": 98.0,
      "tags": [
          "무릎관절",
          "척추센터"
      ],
      "id": "68e1032876522e702d961c0d",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "신촌연세정형외과",
      "type": "local",
      "specialty": "정형외과",
      "address": "서울 서대문구 신촌로 99",
      "lat": 37.5577,
      "lng": 126.9405,
      "phone": "02-333-7582",
      "hours_text": "평일 09:00-19:00, 토 09:00-14:00",
      "description": "도수치료 및 비수술적 치료를 전문으로 합니다.",
      "renown_score": 70.0,
      "tags": [
          "도수치료",
          "비수술"
      ],
      "id": "68e1032876522e702d961c14",
      "created_date": "2025-10-04T11:21:12.863000",
      "updated_date": "2025-10-04T11:21:12.863000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "삼성서울병원 내과",
      "type": "university",
      "specialty": "내과",
      "address": "서울 강남구 일원로 81",
      "lat": 37.4883,
      "lng": 127.0854,
      "phone": "02-3410-2114",
      "hours_text": "평일 08:00-17:00",
      "description": "각 분과별 내과 전문의들이 협진하여 최상의 진료를 제공합니다.",
      "renown_score": 94.0,
      "tags": [
          "소화기센터",
          "순환기센터",
          "호흡기센터"
      ],
      "id": "68e10792220320f5f9958376",
      "created_date": "2025-10-04T11:40:02.971000",
      "updated_date": "2025-10-04T11:40:02.971000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "강남베스트내과",
      "type": "local",
      "specialty": "내과",
      "address": "서울 강남구 강남대로 438",
      "lat": 37.5008,
      "lng": 127.0272,
      "phone": "02-555-1175",
      "hours_text": "평일 08:30-18:30, 토 08:30-14:00",
      "description": "소화기 질환 및 내과 전반에 대한 전문적인 진료와 검진을 제공합니다.",
      "renown_score": 80.0,
      "tags": [
          "위내시경",
          "대장내시경",
          "건강검진"
      ],
      "id": "68e10792220320f5f9958374",
      "created_date": "2025-10-04T11:40:02.971000",
      "updated_date": "2025-10-04T11:40:02.971000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "연세가정의원",
      "type": "local",
      "specialty": "가정의학과",
      "address": "서울 서대문구 연세로 5",
      "lat": 37.5587,
      "lng": 126.9368,
      "phone": "02-313-0975",
      "hours_text": "평일 09:00-18:00, 토 09:00-13:00",
      "description": "다양한 초기 증상에 대한 포괄적인 진료를 제공합니다.",
      "renown_score": 75.0,
      "tags": [
          "만성질환",
          "예방접종"
      ],
      "id": "68e10792220320f5f9958373",
      "created_date": "2025-10-04T11:40:02.971000",
      "updated_date": "2025-10-04T11:40:02.971000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  },
  {
      "name": "서울대학교병원 가정의학과",
      "type": "university",
      "specialty": "가정의학과",
      "address": "서울 종로구 대학로 101",
      "lat": 37.5794,
      "lng": 126.9996,
      "phone": "02-2072-2114",
      "hours_text": "평일 09:00-17:00",
      "description": "대학병원 수준의 심층적인 가정의학 진료 및 건강 상담을 제공합니다.",
      "renown_score": 90.0,
      "tags": [
          "건강증진",
          "노인의학"
      ],
      "id": "68e10792220320f5f9958375",
      "created_date": "2025-10-04T11:40:02.971000",
      "updated_date": "2025-10-04T11:40:02.971000",
      "created_by_id": "68e0d796ec7a59133faf7039",
      "created_by": "mathlete4312@gmail.com",
      "is_sample": false
  }
]
export default function ChatInterface({ onSubmit, isLoading }) {
  const {t, language } = useAppContext();
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [template, setTemplate] = useState({
    symptom: '',
    onset: '',
    severity: '',
    body_part: '',
    associated_symptoms: [],
    associated_notes: ''
  });

  const [isRecommendHospitalStatus, setIsRecommendHospitalStatus] = useState(false)

  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFile(f ?? null);
  };
  
  const [previewUrl, setPreviewUrl] = useState(null);
  
  React.useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
  
    // create preview for images
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
  
      return () => URL.revokeObjectURL(url);
    }
  
    setPreviewUrl(null);
    return;
  }, [file]);
  

  const buildSummary = () => {
    const desc = template.symptom || symptoms; // Prioritize structured symptom, then free text
    const parts = [];
    if (language === 'en') {
      if (template.onset && desc) parts.push(`Since ${template.onset}, ${desc}.`);
      else if (desc) parts.push(`${desc}.`);
      if (template.severity) parts.push(`Severity: ${template.severity}`);
      if (template.body_part) parts.push(`Location: ${template.body_part}`);
      const assocList = [...(template.associated_symptoms || [])].filter(Boolean).join(', ');
      const assoc = [assocList, template.associated_notes].filter(Boolean).join(', ');
      if (assoc) parts.push(`Associated: ${assoc}`);
    } else { // Korean
      if (template.onset && desc) parts.push(`${template.onset}부터 ${desc} 있습니다.`);
      else if (desc) parts.push(`${desc} 있습니다.`);
      if (template.severity) parts.push(`정도: ${template.severity}`);
      if (template.body_part) parts.push(`부위: ${template.body_part}`);
      const assocList = [...(template.associated_symptoms || [])].filter(Boolean).join(', ');
      const assoc = [assocList, template.associated_notes].filter(Boolean).join(', ');
      if (assoc) parts.push(`동반: ${assoc}`);
    }
    if (parts.length === 0) return '';
    return `⚡ ${parts.join(' · ')}`;
  };

  const handleSubmit = async () => {
    const hasTemplateData = template.symptom || template.onset || template.severity || template.body_part || (template.associated_symptoms?.length || 0) > 0 || template.associated_notes;

    // Build payload
    let payload;
    let displaySymptom;
    if (showAdvanced && hasTemplateData) {
      payload = { ...template, free_text: symptoms?.trim() || '' };
      displaySymptom = buildSummary() || JSON.stringify(payload);
    } else if (symptoms.trim()) {
      payload = { symptom: symptoms.trim() };
      displaySymptom = symptoms.trim();
    } else {
      return; // nothing to send
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const res = await axios.post('http://localhost:8000/analyze', payload);
      const data = res.data || {};
      console.log(data)
      setAnalysisResult({
        department: data.department || data.recommended_department || data.department_name || '내과',
        description: data.description || data.explanation || data.details || '분석 결과를 가져올 수 없습니다.',
        symptom: displaySymptom,
        icd10code: data.icd_10_code,
        estimatedDisease: data.estimated_disease,
        isEmergency: data.is_emergency
      });
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Request failed';
      setAnalysisResult({
        department: '오류',
        description: `오류가 발생했습니다: ${msg}`,
        symptom: displaySymptom,
        icd10code: "아이시디 코드가 없습니다",
        estimatedDisease: "추청 질환이 없습니다",
        isEmergency: "응급사황이 없습니다"
      });
    } finally {
      setLoading(false);
      setSymptoms('');
    }
  };

  const handleFileSelect = async (e) => {
    
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    // Only submit on Enter if advanced input is NOT shown
    if (e.key === 'Enter' && !e.shiftKey && !showAdvanced) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full"
    >
      {/* Analysis Result */}
      {analysisResult && (
        <div className="mb-6">
                {/* Symptom Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">
          {language === 'en' ? 'Your Symptoms' : '나의 증상'}
        </p>
        <p className="text-base font-medium text-gray-900">{analysisResult.symptom}</p>
      </div>
          {!isRecommendHospitalStatus &&
          <AnalysisResult 
            department={analysisResult.department}
            description={analysisResult.description}
            icd10code={analysisResult.icd10code}
            estimatedDisease={analysisResult.estimatedDisease}
            isEmergency={analysisResult.isEmergency}
            goHospitalRecommend= {()=>{setIsRecommendHospitalStatus(true)}}
            onBack = {()=>setAnalysisResult(null)}
          />}
          {isRecommendHospitalStatus &&
          <HospitalList
            hospitals = {hostpitalDummyData}
            onViewMap
            onBack = {()=>{setIsRecommendHospitalStatus(false); setAnalysisResult(null)}}
            specialty
            isEmergency={analysisResult.isEmergency}
            locationStatus
          />}
        </div>
      )}

      {!analysisResult && (<Card className="p-6 shadow-xl border-0 bg-card backdrop-blur-sm rounded-2xl">
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('chat_placeholder')}
          className="min-h-[120px] text-base resize-none border-border focus:ring-2 focus:ring-primary rounded-lg"
          disabled={loading}
        />
        

        <div className="mt-3 flex justify-between items-center">
      {/* LEFT AREA — 사진 추가 */}
      <div className="flex items-center gap-3">
        {previewUrl && (
          <img
            src={previewUrl}
            alt={file?.name}
            className="h-20 w-20 object-cover rounded-lg border"
          />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="hidden"
          disabled={isLoading || isUploading}
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || isUploading}
          className="text-sm flex items-center gap-1"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {language === 'en' ? 'Uploading...' : '업로드 중...'}
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              {language === 'en' ? 'Add Photo' : '사진 추가'}
            </>
          )}
        </Button>
      </div>

      {/* RIGHT AREA — 더 자세히 입력하기 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm flex items-center gap-1"
      >
        {language === 'en' ? 'More details' : '더 자세히 입력하기'}
        {showAdvanced ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      </div>


        {showAdvanced && (
          <div className="mt-4">
            <SymptomTemplate value={template} onChange={setTemplate} />
            {/* Summary preview */}
            {buildSummary() && (
              <div className="mt-4 p-3 bg-gray-50 text-gray-700 rounded-lg text-sm border">
                {buildSummary()}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm white text-center sm:text-left">
            {t('chat_prompt_detail')}
          </p>
          <Button
            onClick={handleSubmit}
            disabled={(!symptoms.trim() && !(template.symptom || template.onset || template.severity || template.body_part || (template.associated_symptoms?.length || 0) > 0 || template.associated_notes)) || loading}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-6 text-lg rounded-xl text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('chat_analyzing_button')}
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                {t('chat_start_button')}
              </>
            )}
          </Button>
        </div>
      </Card>)}

        {!analysisResult && <div className="mt-6 flex flex-wrap justify-center gap-3">
        {[t('symptom_suggestion_headache'), t('symptom_suggestion_stomachache'), t('symptom_suggestion_fever'), t('symptom_suggestion_cough')].map((symptom) => (
          <button
            key={symptom}
            onClick={() => setSymptoms(symptom)}
            className="px-4 py-2 bg-card/70 hover:bg-card rounded-lg text-sm text-foreground transition-colors backdrop-blur-sm border"
            disabled={loading}
          >
            {symptom}
          </button>
        ))}
      </div>}
    </motion.div>
  );
}
