import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { useAppContext } from '@/Components/contexts/AppContext';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

export default function HospitalCard({ hospital, onViewMap, onSelect, isSelected }) {
  if (!hospital) return null;
  const { name, address, phone, distance, url, category, lat, lng } = hospital;

  const km = typeof distance === 'number' ? (distance >= 1000 ? `${(distance/1000).toFixed(1)} km` : `${distance} m`) : null;
  const badgeText = category?.split('>')?.pop()?.trim() || '병원';
  const { language } = useAppContext();
  const { t } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 transition-all duration-300 rounded-2xl overflow-hidden border transform ${isSelected ? 'border-blue-500 shadow-lg scale-[1.01]' : 'border-gray-200 hover:shadow-md hover:scale-[1.02]'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-semibold text-foreground">{name}</h4>
            <Badge variant="secondary">{badgeText}</Badge>
            {km && <span className="text-xs text-foreground">{km}</span>}
          </div>
          <p className="text-sm text-foreground flex items-center gap-1"><MapPin className="w-4 h-4" />{address}</p>
          {phone && <p className="text-sm text-foreground flex items-center gap-1"><Phone className="w-4 h-4" />{phone}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <div 
          className="w-full flex justify-end"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hospital);
          }}
        >
          <Checkbox
            checked={isSelected}
            className="w-full h-7 justify-center gap-1 rounded-sm p-1 data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:bg-black data-[state=checked]:border-black"
            aria-label="병원 선택"
          />
        </div>
        <Button
            size="sm"
            className="h-7 rounded-sm bg-black text-white"
            onClick={async () => {
              // If coords already exist, just show
              if (Number.isFinite(hospital?.lat) && Number.isFinite(hospital?.lng)) {
                onViewMap?.([{ ...hospital }]);
                return;
              }

              try {
                // Ask backend to geocode this hospital name (and optionally address)
                const params = new URLSearchParams({
                  q: hospital?.name || "",
                  address: hospital?.address || "",
                });

                const res = await fetch(`/api/kakao/geocode?${params.toString()}`);
                const data = await res.json();

                if (!res.ok || !data?.lat || !data?.lng) {
                  alert("이 병원은 지도 좌표를 찾을 수 없습니다.");
                  return;
                }

                onViewMap?.([{ ...hospital, lat: data.lat, lng: data.lng }]);
              } catch (e) {
                alert("좌표를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
              }
            }}
          >
        <span className="text-white">
          {language === "en" ? "View on map" : "지도에서 보기"}
        </span>
      </Button>
      
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="w-full h-7 text-blue-300 text-sm inline-flex justify-center gap-1 bg-black rounded-sm p-1">
              {language === 'en' ? 'View details' : '상세보기'} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}