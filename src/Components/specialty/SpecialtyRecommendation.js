
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Stethoscope, Lightbulb, Check, X, AlertTriangle, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import PriceInfo from './PriceInfo';
import Feedback from '../common/Feedback';
import { useAppContext } from '@/Components/contexts/AppContext';

export default function SpecialtyRecommendation({ 
  recommendation,
  priceBundle,
  onFindHospitals,
  onReset 
}) {
  const { t } = useAppContext();
  const { 
    specialty,
    broad_specialty,
    sub_specialty,
    reason, 
    explanation,
    is_emergency, 
    estimated_disease,
    icd_10_code
  } = recommendation;

  const displaySpecialty = sub_specialty 
    ? `${broad_specialty} (${sub_specialty})`
    : specialty;
  
  const specialtyForExplanation = broad_specialty || specialty;
  const explanationText = t(`specialty_explanations.${specialtyForExplanation}`);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-8"
    >
      {is_emergency && (
        <Alert variant="destructive" className="mb-6 border-2 border-red-500 bg-red-50">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-extrabold text-lg">{t('emergency_alert_title')}</AlertTitle>
          <AlertDescription>
            {t('emergency_alert_content')}
            <br />
            <strong className="mt-2 block">{t('emergency_alert_contact_119')}</strong>
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm rounded-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              🧠 {t('analysis_result_title')}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{t('estimated_disease')}</p>
              <h4 className="text-lg font-bold text-gray-900">
                {estimated_disease || t('no_info')}
                {icd_10_code && <Badge variant="outline" className="ml-2 font-mono">{icd_10_code}</Badge>}
              </h4>
            </div>
            <div className="bg-cyan-50/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{t('recommended_specialty')}</p>
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-cyan-700" />
                {displaySpecialty}
              </h4>
            </div>
          </div>
          
          <div className="bg-gray-50/70 p-5 rounded-xl border">
             <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-gray-600"/>
                </div>
                <h4 className="font-semibold text-gray-800">{t('recommendation_reason')}</h4>
             </div>
             <p className="text-gray-600 leading-relaxed text-sm">{explanation || reason}</p>
          </div>
          
          {explanationText !== `specialty_explanations.${specialtyForExplanation}` && (
            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-5 h-5 text-blue-600"/>
                  </div>
                  <h4 className="font-semibold text-blue-800">{specialtyForExplanation}는 어떤 곳인가요?</h4>
              </div>
              <p className="text-blue-700 leading-relaxed text-sm">{explanationText}</p>
            </div>
          )}

          <PriceInfo priceBundle={priceBundle} />
        </CardContent>

        <CardFooter className="flex-col items-stretch bg-gray-50/50 p-6 rounded-b-2xl mt-6">
          <div className="w-full text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              {is_emergency ? t('find_emergency_room_prompt') : t('find_hospitals_prompt')}
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="w-32 bg-white" onClick={onReset}>
                <X className="w-4 h-4 mr-2" />
                {t('no')}
              </Button>
              <Button className={`w-32 ${is_emergency ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={onFindHospitals}>
                <Check className="w-4 h-4 mr-2" />
                {is_emergency ? t('view_emergency_rooms') : t('yes')}
              </Button>
            </div>
          </div>
          <Feedback context="specialty_recommendation" />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
