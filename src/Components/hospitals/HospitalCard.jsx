import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

export default function HospitalCard({ hospital, onViewMap, onSelect, isSelected }) {
  if (!hospital) return null;
  const { name, address, phone, distance, url, category, lat, lng } = hospital;

  const km = typeof distance === 'number' ? (distance >= 1000 ? `${(distance/1000).toFixed(1)} km` : `${distance} m`) : null;
  const badgeText = category?.split('>')?.pop()?.trim() || '병원';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border bg-white/70 shadow-sm ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
            <Badge variant="secondary">{badgeText}</Badge>
            {km && <span className="text-xs text-gray-500">{km}</span>}
          </div>
          <p className="text-sm text-gray-700 flex items-center gap-1"><MapPin className="w-4 h-4" />{address}</p>
          {phone && <p className="text-sm text-gray-700 flex items-center gap-1"><Phone className="w-4 h-4" />{phone}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" onClick={() => onSelect?.(hospital)}>
            {isSelected ? '선택 해제' : '선택'}
          </Button>
          <Button size="sm" onClick={() => onViewMap?.([{ ...hospital }])}>
            지도에서 보기
          </Button>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm inline-flex items-center gap-1">
              상세보기 <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}