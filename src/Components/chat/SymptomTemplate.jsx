import React from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { MessageSquare, Clock, Flame, Crosshair, PlusCircle } from 'lucide-react';
import { useAppContext } from '@/Components/contexts/AppContext';

export default function SymptomTemplate({ value, onChange }) {
  const {t, language } = useAppContext();

  const quickSymptoms = language === 'en'
    ? ["Headache", "Stomachache", "Indigestion", "Cough", "Knee pain", "Back pain", "Skin rash"]
    : ["두통", "복통", "소화불량", "기침", "무릎 통증", "허리 통증", "피부 발진"];

  const onsetOptions = language === 'en'
    ? ["Today", "3 days ago", "1 week ago", "Over 1 month"]
    : ["오늘", "3일 전", "1주 전", "1개월 이상 전"];

  const severityOptions = language === 'en'
    ? ["Mild", "Moderate", "Severe, Very severe"]
    : ["약함", "보통", "심함", "매우 심함"];

  const bodyParts = language === 'en'
    ? ["Head", "Chest", "Abdomen", "Arm", "Knee", "Foot", "Back", "Skin", "Eye", "Ear"]
    : ["머리", "가슴", "복부", "팔", "무릎", "발", "허리", "피부", "눈", "귀"];

  const assocOptions = language === 'en'
    ? ["Fever", "Cough", "Vomiting", "Loss of appetite", "Dizziness", "Fatigue"]
    : ["열", "기침", "구토", "식욕저하", "어지럼", "피로감"];

  const setField = (k, v) => onChange({ ...value, [k]: v });
  const toggleArray = (k, v) => {
    const arr = new Set(value[k] || []);
    if (arr.has(v)) arr.delete(v); else arr.add(v);
    setField(k, Array.from(arr));
  };

  return (
    <div className="space-y-5">
      {/* 1. 주요 증상 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold">{language === 'en' ? 'Main Symptom' : '주요 증상'}</span>
        </div>
        <Input
          value={value.symptom || ''}
          onChange={(e) => setField('symptom', e.target.value)}
          placeholder={language === 'en' ? 'e.g., My knee is swollen and painful' : '예: 무릎이 붓고 통증이 있어요'}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {quickSymptoms.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={value.symptom === s ? 'default' : 'outline'}
              onClick={() => setField('symptom', s)}
              className="rounded-full"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* 2. 시작 시기 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold">{language === 'en' ? 'Onset' : '증상 시작 시기'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {onsetOptions.map((o) => (
            <Button
              key={o}
              size="sm"
              variant={value.onset === o ? 'default' : 'outline'}
              onClick={() => setField('onset', o)}
              className="rounded-full"
            >
              {o}
            </Button>
          ))}
        </div>
        <Input
          value={value.onset || ''}
          onChange={(e) => setField('onset', e.target.value)}
          placeholder={language === 'en' ? 'When did it start?' : '언제부터 증상이 시작되었나요?'}
          className="mt-2"
        />
      </div>

      {/* 3. 강도 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold">{language === 'en' ? 'Severity' : '증상 강도'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(language === 'en'
            ? ["Mild", "Moderate", "Severe", "Very severe"]
            : ["약함", "보통", "심함", "매우 심함"]).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={value.severity === s ? 'default' : 'outline'}
              onClick={() => setField('severity', s)}
              className="rounded-full"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* 4. 부위 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Crosshair className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold">{language === 'en' ? 'Body Part' : '증상 부위'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {bodyParts.map((b) => (
            <Button
              key={b}
              size="sm"
              variant={value.body_part === b ? 'default' : 'outline'}
              onClick={() => setField('body_part', b)}
              className="rounded-full"
            >
              {b}
            </Button>
          ))}
        </div>
        <Input
          value={value.body_part || ''}
          onChange={(e) => setField('body_part', e.target.value)}
          placeholder={language === 'en' ? 'Where does it hurt?' : '어느 부위에 증상이 있나요?'}
          className="mt-2"
        />
      </div>

      {/* 5. 동반 증상 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <PlusCircle className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold">{language === 'en' ? 'Associated Symptoms' : '기타/동반 증상'}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {assocOptions.map((a) => (
            <Button
              key={a}
              size="sm"
              variant={value.associated_symptoms?.includes(a) ? 'default' : 'outline'}
              onClick={() => toggleArray('associated_symptoms', a)}
              className="rounded-full"
            >
              {a}
            </Button>
          ))}
        </div>
        <Textarea
          value={value.associated_notes || ''}
          onChange={(e) => setField('associated_notes', e.target.value)}
          placeholder={language === 'en' ? 'Other symptoms? (e.g., fever, vomiting, dizziness)' : '다른 증상이 있나요? (예: 열, 구토, 어지러움)'}
          className="mt-2 min-h-[80px]"
        />
      </div>
    </div>
  );
}