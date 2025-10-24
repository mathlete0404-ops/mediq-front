import React, { useState, useEffect, useRef } from 'react';
import { InvokeLLM } from '@/integrations/Core';
import Consultation from '@/entities/Consultation';
import DisclaimerBanner from '@/Components/common/DisclaimerBanner.jsx';
// ChatInterface는 아래 6번에서 추가한 컴포넌트
import ChatInterface from '@/Components/chat/ChatInterface.jsx';
import ConversationView from '@/Components/common/chat/ConversationView';
import SpecialtyRecommendation from '@/Components/specialty/SpecialtyRecommendation.jsx';
import HospitalList from '@/Components/hospitals/HospitalList.jsx';
import dynamic from 'next/dynamic';
const MapModal = dynamic(() => import('@/Components/map/MapModal.jsx'), { ssr: false });
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import Provider from '@/Entities/Provider';
import PriceBundle from '@/Entities/PriceBundle';
import ConditionMap from '@/Entities/ConditionMap';
import SpecialtyRanking from '@/Entities/SpecialtyRanking';
import { useAppContext } from '@/Components/contexts/AppContext';
import HeroPattern from '@/Components/visual/HeroPattern.jsx';
import AboutSection from '@/Components/about/AboutSection.jsx'; // Added import
import { MessageSquarePlus, Shield, Zap, Map as MapIcon, Heart, LifeBuoy, Loader2 } from 'lucide-react';

const haversineDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return null;
  const [lat1, lon1] = coords1.map(Number);
  const [lat2, lon2] = coords2.map(Number);

  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return null;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c; // Distance in kilometers
  return parseFloat(distance.toFixed(1));
};

function ChatFlowContent() {
  const { t, language, setViewMode } = useAppContext();
  const [step, setStep] = useState('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [priceBundle, setPriceBundle] = useState(null);
  const [hospitals, setHospitals] = useState({ emergency: [], university: { nearby: [], renowned: [] }, local: { nearby: [] } });
  const [hospitalsToShowOnMap, setHospitalsToShowOnMap] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'requesting', 'success', 'denied', 'error'
  const resultsRef = useRef(null);
  
  useEffect(() => {
    if ((step === 'analyzed' || step === 'hospitals') && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const summarizeInput = (input) => {
    if (!input || typeof input !== 'object') return `${input}`;
    const desc = input.symptom || input.free_text || '';
    const parts = [];
    if (language === 'en') {
      if (input.onset && desc) parts.push(`Since ${input.onset}, ${desc}.`);
      else if (desc) parts.push(`${desc}.`);
      if (input.severity) parts.push(`Severity: ${input.severity}`);
      if (input.body_part) parts.push(`Location: ${input.body_part}`);
      const assocList = [...(input.associated_symptoms || [])].join(', ');
      const assoc = [assocList, input.associated_notes].filter(Boolean).join(', ');
      if (assoc) parts.push(`Associated: ${assoc}`);
    } else { // Korean
      if (input.onset && desc) parts.push(`${input.onset}부터 ${desc} 있습니다.`);
      else if (desc) parts.push(`${desc} 있습니다.`);
      if (input.severity) parts.push(`정도: ${input.severity}`);
      if (input.body_part) parts.push(`부위: ${input.body_part}`);
      const assocList = [...(input.associated_symptoms || [])].join(', ');
      const assoc = [assocList, input.associated_notes].filter(Boolean).join(', ');
      if (assoc) parts.push(`동반: ${assoc}`);
    }
    if (parts.length === 0 && desc) return `⚡ ${desc}`; // Fallback if no structured parts, but there's a description
    if (parts.length === 0) return '';
    return `⚡ ${parts.join(' · ')}`;
  };

  const analyzeSymptoms = async (userInput) => {
    setIsLoading(true);
    setViewMode('chat');

    const isStructured = typeof userInput === 'object' && userInput !== null;
    const summaryText = isStructured ? summarizeInput(userInput) : userInput;
    const rawText = isStructured ? (userInput.free_text || userInput.symptom || '') : userInput;

    setSymptoms(summaryText);
    setRecommendation(null);
    setPriceBundle(null);

    try {
      const promptLang = language === 'en' ? 'English' : 'Korean';

      const structuredBlock = isStructured
        ? `\nStructured data (JSON):\n${JSON.stringify(userInput, null, 2)}\n`
        : '';

      const prompt = `You are a medical navigation AI. Analyze the user's symptoms and recommend an appropriate medical specialty. Respond in ${promptLang}.

User symptoms (summary): "${summaryText}"
Raw user text: "${rawText}"${structuredBlock}

Respond in the following JSON format:
- specialty: Recommended broad specialty (e.g., Internal Medicine, Orthopedics)
- reason: Reason for recommending the specialty (2-3 sentences)
- is_emergency: Whether it is an emergency situation (true/false)
- estimated_disease: Estimated disease name (1-2 most likely, use a canonical medical term)
- icd_10_code: ICD-10 code for the estimated disease (optional, "" if unknown)

Emergency criteria:
- Severe chest pain, difficulty breathing
- Decreased consciousness, severe headache, paralysis
- Severe bleeding, vomiting blood
- Severe abdominal pain
- High fever (over 39°C) with seizures`;

      const llmResult = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: 'object',
          properties: {
            specialty: { type: 'string' },
            reason: { type: 'string' },
            is_emergency: { type: 'boolean' },
            estimated_disease: { type: 'string' },
            icd_10_code: { type: 'string' }
          }
        }
      });

      let finalRecommendation = { ...llmResult };

      // Enrich with ConditionMap data
      if (llmResult.estimated_disease) {
        const conditionMaps = await ConditionMap.filter({ canonical_condition: llmResult.estimated_disease });
        if (conditionMaps.length > 0) {
          const mappedData = conditionMaps[0];
          finalRecommendation = {
            ...finalRecommendation,
            broad_specialty: mappedData.broad_specialty,
            sub_specialty: mappedData.sub_specialty,
            explanation: mappedData.explanation,
            // Override LLM specialty with more precise data if available
            specialty: mappedData.broad_specialty || llmResult.specialty,
          };
        }
        
        const bundles = await PriceBundle.filter({ condition_key: llmResult.estimated_disease });
        if (bundles.length > 0) setPriceBundle(bundles[0]);
      }
      
      setRecommendation(finalRecommendation);

      await Consultation.create({
        symptoms: summaryText, // Use summaryText for Consultation record
        recommended_specialty: finalRecommendation.sub_specialty || finalRecommendation.specialty,
        is_emergency: finalRecommendation.is_emergency,
        specialty_reason: finalRecommendation.explanation || finalRecommendation.reason
      });
      setStep('analyzed');
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      alert('증상 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
    setIsLoading(false);
  };

  const requestLocationAndFindHospitals = () => {
    if (userLocation) {
      findHospitals(userLocation);
      return;
    }
    
    setLocationStatus('requesting');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setLocationStatus('success');
          findHospitals(location);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationStatus('denied');
          alert('위치 정보 접근이 거부되었습니다. 위치 기반 추천 없이 병원을 검색합니다.');
          findHospitals(null); // Proceed without location
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 30000,
        }
      );
    } else {
      setLocationStatus('error');
      alert('이 브라우저에서는 위치 정보를 사용할 수 없습니다. 위치 기반 추천 없이 병원을 검색합니다.');
      findHospitals(null);
    }
  };

  const findHospitals = async (location) => {
    setIsLoading(true);
    if (!recommendation) {
        setIsLoading(false);
        return;
    }
  
    try {
        let allProviders = await Provider.list();
        if (allProviders.length === 0) throw new Error("No providers found.");

        const providersWithDistance = allProviders.map(p => ({
            ...p,
            distance: location ? haversineDistance(location, [p.lat, p.lng]) : null
        })).sort((a, b) => {
            // Handle null distances by placing them at the end
            if (a.distance === null && b.distance === null) return 0;
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
        });

        let finalHospitals = { emergency: [], university: { nearby: [], renowned: [] }, local: { nearby: [] } };

        if (recommendation.is_emergency) {
            // Filter providers relevant for emergency
            const emergencyProviders = providersWithDistance.filter(p => p.type === 'university' || p.tags?.includes('응급실'));
            finalHospitals.emergency = emergencyProviders.slice(0, 3); // Take top 3 closest
        } else {
            // --- Specialty & Keyword Setup ---
            const specialtyToSearch = recommendation.broad_specialty || recommendation.specialty;
            const specialtyKeyMap = {
                '소화기내과': 'gastro', '심장내과': 'cardio', '호흡기내과': 'pulmo', '신경과': 'neuro', '정형외과': 'ortho', '내분비내과': 'endo', '신장내과': 'nephro', '이비인후과': 'ent', '피부과': 'derma', '안과': 'oph', '비뇨기과': 'uro', '산부인과': 'obgyn', '정신건강의학과': 'psy', '외과': 'gs', '흉부외과': 'cs', '신경외과': 'ns',
                '가정의학과': 'fm', '내과': 'im' // Added for broader search
            };
            // Use sub_specialty for ranking if available, else broad_specialty
            const specialtyKeyForRanking = recommendation.sub_specialty ? specialtyKeyMap[recommendation.sub_specialty] : specialtyKeyMap[specialtyToSearch];

            // Filter university providers by specialty for nearby and potentially for renowned list
            const universityProvidersForSpecialty = providersWithDistance.filter(p => p.type === 'university' && p.specialty?.includes(specialtyToSearch));
            
            // 1. Nearby University Hospitals (Top 3) - based on filtered university providers
            const near3 = universityProvidersForSpecialty.slice(0, 3);
            const near3_ids = new Set(near3.map(p => p.id));

            // 2. Best University Hospitals by Rank (Top 3) - based on SpecialtyRanking, de-duplicated
            let best3_ranked_providers = [];
            if (specialtyKeyForRanking) {
                // Fetch top 10 rankings to ensure we can pick 3 unique ones after de-duplication
                const rankings = await SpecialtyRanking.filter({ specialty_key: specialtyKeyForRanking }, 'rank', 10); 
                
                const best_candidates_from_ranking = [];
                for (const rankItem of rankings) { // Renamed from 'rank' to 'rankItem' for clarity
                    if (best_candidates_from_ranking.length >= 3) break;
                    // Add if not already in the 'nearby' list
                    if (!near3_ids.has(rankItem.hospital_id)) {
                        best_candidates_from_ranking.push(rankItem);
                    }
                }
                
                // Fetch full provider details for the ranked hospitals
                if (best_candidates_from_ranking.length > 0) {
                    const best_ids = best_candidates_from_ranking.map(r => r.hospital_id);
                    // Filter allProviders to ensure we get the original objects
                    const providerDetailsForRanked = allProviders.filter(p => best_ids.includes(p.id));

                    // Map details back to rankings, adding distance
                    best3_ranked_providers = best_candidates_from_ranking.map(rankItem => {
                        const detail = providerDetailsForRanked.find(p => p.id === rankItem.hospital_id);
                        return detail ? { 
                            ...detail, 
                            specialty_rank: rankItem.rank, // Rank from SpecialtyRanking
                            specialty_ranking_score: rankItem.score, // Score from SpecialtyRanking
                            distance: location ? haversineDistance(location, [detail.lat, detail.lng]) : null
                        } : null;
                    }).filter(Boolean);

                    // Sort ranked providers by their specialty rank (ascending)
                    best3_ranked_providers.sort((a,b) => (a.specialty_rank || Infinity) - (b.specialty_rank || Infinity));
                }
            }
            
            // 3. Nearby Local Hospitals (Top 3)
            const localProviders = providersWithDistance.filter(p => 
                p.type === 'local' && p.specialty?.includes(specialtyToSearch)
            );
            const local3 = localProviders.slice(0, 3);
            
            finalHospitals.university = { nearby: near3, renowned: best3_ranked_providers };
            finalHospitals.local = { nearby: local3 };
        }

        setHospitals(finalHospitals);
        setStep('hospitals');

    } catch (error) {
        console.error('Error finding hospitals:', error);
        alert('병원 검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
    setViewMode('landing');
    setLocationStatus('idle'); // Reset location status
  };

  if (step === 'chat') {
    return (
       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-6">
        <div className="w-full max-w-3xl">
          <DisclaimerBanner />
          <ChatInterface onSubmit={analyzeSymptoms} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div ref={resultsRef} className="pt-8">
        {(step === 'analyzed' || step === 'hospitals') && (
          <section className="py-10 bg-background min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
              <ConversationView symptoms={symptoms} />

              {isLoading && step === 'analyzed' && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  <p className="ml-4 text-muted-foreground">{t('analysis_loading')}</p>
                </div>
              )}

              {!isLoading && step === 'analyzed' && recommendation && (
                <SpecialtyRecommendation
                  recommendation={recommendation}
                  priceBundle={priceBundle}
                  onFindHospitals={requestLocationAndFindHospitals}
                  onReset={handleReset}
                />
              )}
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12">
               {isLoading && step === 'hospitals' && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  <p className="ml-4 text-muted-foreground">{t('hospitals_loading')}</p>
                </div>
              )}
              {!isLoading && step === 'hospitals' && (
                <HospitalList
                  hospitals={hospitals}
                  onViewMap={(hospitals) => setHospitalsToShowOnMap(hospitals)}
                  onBack={() => setStep('analyzed')}
                  specialty={recommendation?.broad_specialty || recommendation?.specialty}
                  isEmergency={recommendation?.is_emergency}
                  locationStatus={locationStatus}
                />
              )}
            </div>
          </section>
        )}
      </div>
      <MapModal
        isOpen={hospitalsToShowOnMap.length > 0}
        onClose={() => setHospitalsToShowOnMap([])}
        hospitals={hospitalsToShowOnMap}
        userLocation={userLocation}
      />
    </div>
  );
}

export default function Home() {
  const { viewMode, chatKey, t, setViewMode } = useAppContext();

  const LandingPage = () => {
    // Typing animation for keywords
    const [wordIndex, setWordIndex] = React.useState(0);
    const [typed, setTyped] = React.useState('');
    const [phase, setPhase] = React.useState('typing'); // typing | pause | deleting
    const words = React.useMemo(() => [
      t('keyword_symptom'),
      t('keyword_doctor'),
      t('keyword_hospital')
    ], [t]);

    React.useEffect(() => {
      let timer;
      const current = words[wordIndex] || '';
      if (phase === 'typing') {
        if (typed.length < current.length) {
          timer = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 60);
        } else {
          setPhase('pause');
        }
      } else if (phase === 'pause') {
        timer = setTimeout(() => setPhase('deleting'), 900);
      } else if (phase === 'deleting') {
        if (typed.length > 0) {
          timer = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
        } else {
          setWordIndex((prev) => (prev + 1) % words.length);
          setPhase('typing');
        }
      }
      return () => clearTimeout(timer);
    }, [typed, phase, wordIndex, words]);

    return (
      <div className="bg-background relative overflow-hidden">
        <section id="intro" className="relative pt-28 pb-20 md:pt-36 md:pb-24 hero">
          <HeroPattern />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center mb-4 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md text-sm text-gray-700 dark:text-gray-200 shadow-sm">
              AI Medical Assistant
            </div>
            <div
              className="motion-safe:animate-fadeSlideIn"
              style={{ animationDuration: '0.8s' }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                {t('hero_title_1')}
                <br />
                {t('hero_title_2').split('{dynamic}')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#00C2B8]">
                  {typed}
                </span>
                <span className="ml-0.5 border-r-2 border-[#00C2B8] animate-caret" />
                {t('hero_title_2').split('{dynamic}')[1] || ''}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                {t('hero_subtitle')}
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl bg-[#007AFF] hover:bg-[#00C2B8] transition-colors duration-300 hover:shadow-[0_12px_30px_rgba(0,194,184,0.25)] hover-glow"
                onClick={() => setViewMode('chat')}
              >
                <MessageSquarePlus className="w-5 h-5 mr-2" />
                {t('chat_start_button')}
              </Button>
            </div>
          </div>
        </section>

      <section id="features" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="inline-block h-1 w-12 bg-[#00C2B8] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t('features_title')}</h2>
          <p className="text-muted-foreground mb-10">{t('features_tagline')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center p-6 text-center bg-white/80 border border-gray-200 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">{t('feature_security_title')}</h3>
                <p className="text-muted-foreground">{t('feature_security_description')}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center bg-white/80 border border-gray-200 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">{t('feature_speed_title')}</h3>
                <p className="text-muted-foreground">{t('feature_speed_description')}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center bg-white/80 border border-gray-200 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform">
              <MapIcon className="w-12 h-12 text-primary mb-4" />
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">{t('feature_navigation_title')}</h3>
                <p className="text-muted-foreground">{t('feature_navigation_description')}</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center bg-white/80 border border-gray-200 rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">{t('feature_care_title')}</h3>
                <p className="text-muted-foreground">{t('feature_care_description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* New About section */}
      <AboutSection />

      <section id="safety" className="py-20 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">{t('nav_safety')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-left p-6 bg-card">
              <CardContent className="flex items-start gap-4 p-0">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LifeBuoy className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('disclaimer_title')}</h3>
                  <p className="text-muted-foreground">{t('disclaimer_content')}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="text-left p-6 bg-card">
              <CardContent className="flex items-start gap-4 p-0">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('feature_security_title')}</h3>
                  <p className="text-muted-foreground">{t('feature_security_description')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    );
  };
  
  if (viewMode === 'landing') {
    return <LandingPage />;
  }
  
  return <ChatFlowContent key={chatKey} />;
}
