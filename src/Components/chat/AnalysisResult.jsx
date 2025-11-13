import React from 'react';
import { Card } from '@/Components/ui/card';
import { Brain, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/Components/contexts/AppContext';

export default function AnalysisResult({ department, description, symptom }) {
  const { language } = useAppContext();

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
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-lg border rounded-2xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <Brain className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {language === 'en' ? 'AI Analysis Result' : 'AI 분석 결과'}
        </h2>
      </div>

      {/* Symptom Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">
          {language === 'en' ? 'Your Symptoms' : '나의 증상'}
        </p>
        <p className="text-base font-medium text-gray-900">{symptom}</p>
      </div>

      {/* Recommended Department */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Recommended Department' : '추천 진료과'}
          </p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <ArrowRight className="w-5 h-5 text-blue-600" />
          <span className="text-xl font-bold text-blue-700">{deptInfo.name}</span>
        </div>
      </div>

      {/* Recommendation Reason */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">ℹ️</span>
          {language === 'en' ? 'Recommendation Reason:' : '추천 이유:'}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed pl-8">
          {description}
        </p>
      </div>

      {/* Department Information */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs">🏥</span>
          {language === 'en' ? `What is ${deptInfo.name}?` : `${deptInfo.name}는 어떤 곳인가요?`}
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed pl-8">
          {deptInfo.description}
        </p>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {language === 'en' 
            ? '💡 This is an AI-based recommendation. Please visit a medical institution for accurate diagnosis.' 
            : '💡 이 분석은 AI 기반 추천이며, 정확한 진단을 위해 의료기관 방문이 필요합니다.'}
        </p>
      </div>
    </Card>
  );
}
