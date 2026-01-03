import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Navigation, MapPin } from 'lucide-react';
import { useAppContext } from '@/Components/contexts/AppContext'; // Added import
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Blue marker for hospitals
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Red marker for user location
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapModal(props) {
  const { isOpen, onClose, hospitals, userLocation } = props;
  const mapRef = useRef();
  const { theme } = useAppContext(); // Added useAppContext hook
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { language } = useAppContext();

  useEffect(() => {
    if (isOpen && mapRef.current && hospitals.length > 0) {
      setTimeout(() => { // Delay to ensure map is visible and sized correctly
        const map = mapRef.current;
        const hospitalBounds = hospitals.map(h => [h.lat, h.lng]);
        const allBounds = userLocation ? [...hospitalBounds, userLocation] : hospitalBounds;
        
        if (allBounds.length > 0) {
          map.fitBounds(allBounds, { padding: [50, 50] });
        }
      }, 100);
    }
  }, [isOpen, hospitals, userLocation]);
  
  const handleOpenDirections = (hospital) => {
    const { lat, lng } = hospital;

    let url;
    if (isIOS) {
      // Apple Maps URL
      url = `https://maps.apple.com/?daddr=${lat},${lng}`;
    } else {
      // Google Maps URL
      url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    }
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const validHospitals = Array.isArray(hospitals)
    ? hospitals.filter(h => Number.isFinite(h?.lat) && Number.isFinite(h?.lng))
    : [];
  if (!validHospitals || validHospitals.length === 0) return null;

  const isSingle = hospitals.length === 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl w-[90vw] md:w-[80vw] h-[80vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b">
          {/* DialogClose button is often handled implicitly by Dialog or custom positioned */}
          <DialogTitle className="text-xl font-bold pr-8">
            {isSingle ? hospitals[0].name : `선택한 ${hospitals.length}곳 병원 위치`}
          </DialogTitle>
          {!isSingle && (
             <p className="text-sm text-muted-foreground pt-2 truncate pr-8">
              {hospitals.map(h => h.name).join(', ')}
            </p>
          )}
        </DialogHeader>

        <div className="flex-1 min-h-0 relative">
          <MapContainer
            ref={mapRef}
            center={userLocation || [validHospitals[0].lat, validHospitals[0].lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap & CARTO'
              url={theme === 'dark'
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"}
            />
            {validHospitals.map((hospital) => (
              <Marker key={hospital.name} position={[hospital.lat, hospital.lng]} icon={blueIcon}>
                <Popup>
                  <div className="text-center font-semibold">{hospital.name}</div>
                </Popup>
              </Marker>
            ))}
            {userLocation && (
              <Marker position={userLocation} icon={redIcon}>
                <Popup>내 위치</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <div className="p-6 pt-4 border-t overflow-y-auto max-h-[40%]">
          {validHospitals.map((hospital) => (
            <div key={hospital.name} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold truncate">{hospital.name}</h4>
                  {hospital.distance && <Badge variant="secondary">{hospital.distance} m</Badge>}
                </div>
                <p className="text-sm text-foreground flex items-start gap-2 mt-1">
                  <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                  <span className="truncate">{hospital.address}</span>
                </p>
              </div>
              <Button
                onClick={() => handleOpenDirections(hospital)}
                size="sm"
                variant="outline"
                className="ml-4 flex-shrink-0"
              >
                <Navigation className="w-3 h-3 mr-2" />
                {language === 'en' ? 'Directions' : '길찾기'}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
