// src/components/ui/NepalMap.tsx
import React from 'react';
import { serviceStations } from '@/data/serviceStations';
import { MapPin } from 'lucide-react';

export function NepalMap() {
  // Approximate relative coordinates for SVGs (0 to 100 percentages)
  // This is a stylistic representation
  const getCoordinates = (city: string) => {
    switch(city.toLowerCase()) {
      case 'kathmandu': return { x: 55, y: 45 };
      case 'pokhara': return { x: 42, y: 42 };
      case 'chitwan': return { x: 48, y: 56 };
      case 'biratnagar': return { x: 80, y: 68 };
      case 'gaighat': return { x: 74, y: 58 };
      default: return { x: 50, y: 50 };
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-8">
      {/* Stylized Nepal service coverage silhouette */}
      <svg viewBox="0 0 800 400" className="w-full h-full text-blue-50/50" fill="currentColor">
        <path d="M50 150 Q200 100 400 150 T750 200 Q700 300 500 350 T100 250 Z" />
      </svg>
      
      {/* Map Pins overlay */}
      {serviceStations.map((station) => {
        const coords = getCoordinates(station.city);
        return (
          <div 
            key={station.id}
            className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
          >
            <div className={`relative z-10 flex flex-col items-center justify-end transition-transform duration-300 group-hover:scale-110 ${station.isHQ ? 'text-[var(--color-primary)]' : 'text-[var(--color-accent)]'}`}>
              <MapPin className={`${station.isHQ ? 'w-8 h-8' : 'w-6 h-6'} fill-current text-white`} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3 w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-white shadow-lg rounded-lg text-xs font-bold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-100">
              {station.isHQ && <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Headquarters</span>}
              {station.city}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-100"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
