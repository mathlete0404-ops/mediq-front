
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Textarea } from '@/Components/ui/textarea';
import { Card } from '@/Components/ui/card';
import { Loader2, Zap } from 'lucide-react';
import { useAppContext } from '@/Components/contexts/AppContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SymptomTemplate from './SymptomTemplate';
import AnalysisResult from './AnalysisResult';

export default function ChatInterface({ onSubmit, isLoading }) {
  const {t, language } = useAppContext();
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [template, setTemplate] = useState({
    symptom: '',
    onset: '',
    severity: '',
    body_part: '',
    associated_symptoms: [],
    associated_notes: ''
  });

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
      
      setAnalysisResult({
        department: data.department || data.recommended_department || data.department_name || '내과',
        description: data.description || data.explanation || data.details || '분석 결과를 가져올 수 없습니다.',
        symptom: displaySymptom
      });
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Request failed';
      setAnalysisResult({
        department: '오류',
        description: `오류가 발생했습니다: ${msg}`,
        symptom: displaySymptom
      });
    } finally {
      setLoading(false);
      setSymptoms('');
    }
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
          <AnalysisResult 
            department={analysisResult.department}
            description={analysisResult.description}
            symptom={analysisResult.symptom}
          />
        </div>
      )}

      <Card className="p-6 shadow-xl border-0 bg-card backdrop-blur-sm rounded-2xl">
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('chat_placeholder')}
          className="min-h-[120px] text-base resize-none border-border focus:ring-2 focus:ring-primary rounded-lg"
          disabled={loading}
        />
        
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm"
          >
            {showAdvanced ? (language === 'en' ? 'Less details' : '간단히 입력') : (language === 'en' ? 'More details' : '더 자세히 입력하기')}
            {showAdvanced ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
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
          <p className="text-sm text-muted-foreground text-center sm:text-left">
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
      </Card>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
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
      </div>
    </motion.div>
  );
}
