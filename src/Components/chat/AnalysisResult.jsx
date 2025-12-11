import React from 'react';
import { Card } from '@/Components/ui/card';
import { Brain, Feedback, Check, X, ArrowRight, Stethoscope, Lightbulb, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/Components/contexts/AppContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AnalysisResult({ department, description, estimatedDisease, icd10code, isEmergency, goHospitalRecommend, onBack}) {
  const { language } = useAppContext();
  const { t } = useAppContext();
  
  // Department description mapping (can be moved to a separate file later)
  const departmentInfo = {
    '정형외과': {
      name: language === 'en' ? 'Orthopedics' : '정형외과',
      description: language === 'en' 
        ? 'Orthopedics diagnoses and treats conditions related to bones, joints, ligaments, and muscles through non-surgical or surgical methods.'
        : '관절, 뼈, 근육, 인대 등의 통증과 손상을 진단하고 수술 또는 비수술적 방법으로 치료하는 전문 분야입니다.',
    },
    '내과': {
      name: language === 'en' ? 'Internal Medicine' : '내과',
      description: language === 'en'
        ? 'Internal medicine diagnoses and treats diseases of internal organs through medication and lifestyle management.'
        : '내부 장기의 질환을 약물 치료와 생활 관리를 통해 진단하고 치료하는 전문 분야입니다.',
    },
    '신경과': {
      name: language === 'en' ? 'Neurology' : '신경과',
      description: language === 'en'
        ? 'Neurology diagnoses and treats diseases of the brain, spinal cord, and nerves through medication and physical therapy.'
        : '뇌, 척수, 신경의 질환을 약물 치료와 물리 치료를 통해 진단하고 치료하는 전문 분야입니다.',
    },
    '이비인후과': {
      name: language === 'en' ? 'Otolaryngology' : '이비인후과',
      description: language === 'en'
        ? 'Otolaryngology diagnoses and treats diseases of the ears, nose, and throat.'
        : '귀, 코, 목의 질환을 진단하고 치료하는 전문 분야입니다.',
    },
    // Add more departments as needed
  };

  const deptInfo = departmentInfo[department] || {
    name: department,
    description: language === 'en' 
      ? 'Please consult with a medical professional for accurate diagnosis and treatment.'
      : '정확한 진단과 치료를 위해 의료기관 방문을 권장합니다.',
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 shadow-lg border rounded-2xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'en' ? '🧠 AI Analysis Result' : '🧠 AI 분석 결과'}
        </h2>
      </div>

        {/* Estimated Disease */}
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Estimated Disease' : '추정 질환'}</p>
              <h4 className="text-lg font-bold text-gray-900">
                {estimatedDisease || t('no_info')}
                {icd10code && <Badge variant="outline" className="ml-2 font-mono">{icd10code}</Badge>}
              </h4>
            </div>
            {/* Recommended Department */}
            <div className="bg-cyan-50/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{deptInfo.name}</p>
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-cyan-700" />
                {deptInfo.name}
              </h4>
            </div>
          </div>


      {/* Recommendation Reason */}
      <div className="bg-gray-50/70 p-5 rounded-xl border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-5 h-5 text-gray-600"/>
              </div>
                <h4 className="font-semibold text-gray-800">{language === 'en' ? 'Recommendation Reason:' : '추천 이유:'}</h4>
          </div>
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
          </div>


{/* Department Information */}
      {
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-5 h-5 text-blue-600"/>
                  </div>
                  <h4 className="font-semibold text-blue-800">{deptInfo.name}는 어떤 곳인가요?</h4>
              </div>
              <p className="text-blue-700 leading-relaxed text-sm">{deptInfo.description}</p>
            </div>
          }

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {language === 'en' 
            ? '💡 This is an AI-based recommendation. Please visit a medical institution for accurate diagnosis.' 
            : '💡 이 분석은 AI 기반 추천이며, 정확한 진단을 위해 의료기관 방문이 필요합니다.'}
        </p>
      </div>
      <Card className="flex-col items-stretch bg-gray-50/50 p-6 rounded-b-2xl mt-6">
          <div className="w-full text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              {isEmergency ? t('find_emergency_room_prompt') : t('find_hospitals_prompt')}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
              <Button variant="outline" className="w-32 bg-white" onClick={onBack}>
                <X className="w-4 h-4 mr-2" />
                {t('no')}
              </Button></Link>
              <Button className={`w-32 ${isEmergency ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={goHospitalRecommend}>
                <Check className="w-4 h-4 mr-2" />
                {isEmergency ? t('view_emergency_rooms') : t('yes')}
              </Button>
            </div>
          </div>
          {/* <Feedback context="specialty_recommendation" /> */}
        </Card>
    </Card>
  );
}
