
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Building2, Home, ArrowLeft, Siren, AlertTriangle } from 'lucide-react';
import HospitalCard from './HospitalCard';
import StickyBottomBar from './StickyBottomBar';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { useAppContext } from '@/Components/contexts/AppContext';

const HospitalSubList = ({ title, hospitals, onViewMap, onSelect, selectedHospitals, emptyMessage }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
    <div className="space-y-4">
      {hospitals && hospitals.length > 0 ? (
        hospitals.map((hospital, index) => (
          <HospitalCard
            key={hospital.id || index}
            hospital={hospital}
            onViewMap={onViewMap}
            onSelect={onSelect}
            isSelected={selectedHospitals.some(h => h.id === hospital.id)}
          />
        ))
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-100 rounded-lg">
          {emptyMessage}
        </div>
      )}
    </div>
  </div>
);

export default function HospitalList({ 
  hospitals, 
  onViewMap,
  onBack,
  specialty,
  isEmergency,
  locationStatus
}) {
  const { t } = useAppContext();
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [autoHospitals, setAutoHospitals] = useState(null);
  const [loadingAuto, setLoadingAuto] = useState(false);
  const [autoError, setAutoError] = useState(null);

  const effectiveHospitals = useMemo(() => hospitals || autoHospitals, [hospitals, autoHospitals]);
  const totalCount = (effectiveHospitals?.university?.nearby?.length || 0) + (effectiveHospitals?.university?.renowned?.length || 0) + (effectiveHospitals?.local?.nearby?.length || 0);

  const toggleSelect = (hospital) => {
    setSelectedHospitals(prev => 
      prev.some(h => h.id === hospital.id)
        ? prev.filter(h => h.id !== hospital.id)
        : [...prev, hospital]
    );
  };

  const LocationWarning = () => {
    if (locationStatus === 'denied' || locationStatus === 'error') {
      return (
        <Alert variant="warning" className="mb-6 bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="font-semibold text-yellow-800">위치 정보 오류</AlertTitle>
          <AlertDescription className="text-yellow-700">
            정확한 위치 정보를 가져올 수 없어 거리 기반 추천이 제한됩니다. 브라우저의 위치 정보 접근 권한을 확인해주세요.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  // Auto-fetch top 3 hospitals by current location if no hospitals prop provided
  useEffect(() => {
    if (hospitals) return; // External data provided
    if (!specialty) return; // Need specialty for renowned query
    setLoadingAuto(true);
    setAutoError(null);

    const getPosition = () => new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => reject(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });

    getPosition()
      .then(({ lat, lng }) => {
        const params = new URLSearchParams({ lat: String(lat), lng: String(lng), specialty: String(specialty) });
        return fetch(`/api/kakao/search?${params.toString()}`);
      })
      .then(async (res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setAutoHospitals(data);
      })
      .catch((err) => setAutoError(err?.message || 'Failed to fetch hospitals'))
      .finally(() => setLoadingAuto(false));
  }, [hospitals, specialty]);

  if (isEmergency) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-2 flex items-center gap-3">
              <Siren className="w-8 h-8" />
              {t('nearby_emergency_rooms')}
            </h2>
            <p className="text-gray-600">
              {t('nearby_emergency_rooms_subtitle')}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back_button')}
          </Button>
        </div>
        <LocationWarning />
        <Alert variant="destructive" className="mb-8">
          <AlertTitle className="font-bold">{t('emergency_important_notice_title')}</AlertTitle>
          <AlertDescription>
            {t('emergency_important_notice_content')}
          </AlertDescription>
        </Alert>
        <HospitalSubList
          title={t('nearby_emergency_rooms_list')}
          hospitals={hospitals.emergency}
          onViewMap={onViewMap}
          onSelect={toggleSelect}
          selectedHospitals={selectedHospitals}
          emptyMessage={t('no_emergency_room_info')}
        />
        <StickyBottomBar 
          count={selectedHospitals.length}
          onShowMap={() => onViewMap(selectedHospitals)}
        />
      </motion.div>
    );
  }

  // Pre-process hospital lists for University Hospitals
  const universityNearbyHospitals = effectiveHospitals?.university?.nearby || [];
  const renownedUniversityHospitals = effectiveHospitals?.university?.renowned || [];

  // Filter out hospitals from the renowned list that are already present in the nearby list
  const nearbyHospitalIds = new Set(universityNearbyHospitals.map(h => h.id));
  const universityRenownedHospitalsFiltered = renownedUniversityHospitals.filter(
    h => !nearbyHospitalIds.has(h.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('hospital_recommendation')}
          </h2>
          <p className="text-gray-600">
            {t('hospital_recommendation_subtitle', { specialty })}
          </p>
          {!hospitals && (
            <p className="text-xs text-gray-500 mt-1">
              {loadingAuto ? t('loading') : autoError ? t('failed_to_load') : t('auto_location_based_fetch')}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back_button')}
        </Button>
      </div>

      {/* AI Summary Box */}
      <div className="mb-6 p-4 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-sm shadow-sm">
        <span className="text-sm">⚡ {t('ai_summary_box', { count: totalCount })}</span>
      </div>

      <LocationWarning />

      <Tabs defaultValue="university" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger 
            value="university"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg py-2"
          >
            <Building2 className="w-4 h-4" />
            {t('university_hospitals')}
          </TabsTrigger>
          <TabsTrigger 
            value="local"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg py-2"
          >
            <Home className="w-4 h-4" />
            {t('local_clinics')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="university" className="space-y-12">
          <HospitalSubList
            title={t('nearby_hospitals')}
            hospitals={universityNearbyHospitals}
            onViewMap={onViewMap}
            onSelect={toggleSelect}
            selectedHospitals={selectedHospitals}
            emptyMessage={t('no_nearby_university')}
          />
          <div className="border-b border-gray-200" />
          <HospitalSubList
            title={t('renowned_hospitals')}
            hospitals={universityRenownedHospitalsFiltered} // Use the filtered list
            onViewMap={onViewMap}
            onSelect={toggleSelect}
            selectedHospitals={selectedHospitals}
            emptyMessage={t('no_renowned_university')}
          />
        </TabsContent>

        <TabsContent value="local">
          <HospitalSubList
            title={t('nearby_local_clinics')}
            hospitals={effectiveHospitals?.local?.nearby}
            onViewMap={onViewMap}
            onSelect={toggleSelect}
            selectedHospitals={selectedHospitals}
            emptyMessage={t('no_nearby_local')}
          />
        </TabsContent>
      </Tabs>
      
      <StickyBottomBar 
        count={selectedHospitals.length}
        onShowMap={() => {
          const valid = selectedHospitals.filter(h => Number.isFinite(h?.lat) && Number.isFinite(h?.lng));
          if (selectedHospitals.length > 0 && valid.length === 0) {
            alert('선택한 병원에 위치 정보가 없습니다. 위치 좌표가 있는 병원을 선택해주세요.');
            return;
          }
          onViewMap(valid);
        }}
      />
    </motion.div>
  );
}
