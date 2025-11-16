
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Map, Circle } from 'leaflet';
import { CitySafetyData, Program } from '../types';
import { programs as allPrograms } from '../data/mockData';

interface InteractiveMapPageProps {
  cities: CitySafetyData[];
  onProgramSelect: (program: Program) => void;
}

const statusStyles = {
    Green: { color: '#5f9ea0', fillColor: '#66cdaa', bgClass: 'bg-[#66cdaa]/20', textClass: 'text-[#5f9ea0]', borderClass: 'border-[#66cdaa]', name: 'Seguro' },
    Yellow: { color: '#b8860b', fillColor: '#daa520', bgClass: 'bg-[#daa520]/20', textClass: 'text-[#b8860b]', borderClass: 'border-[#daa520]', name: 'Atenção' },
    Red: { color: '#c53030', fillColor: '#f56565', bgClass: 'bg-red-400/20', textClass: 'text-red-500', borderClass: 'border-red-500', name: 'Alto Risco' },
    Neutral: { color: '#718096', fillColor: '#a0aec0', bgClass: 'bg-gray-500/20', textClass: 'text-gray-500', borderClass: 'border-gray-400', name: 'Dados Insuficientes' },
};

export const InteractiveMapPage: React.FC<InteractiveMapPageProps> = ({ cities, onProgramSelect }) => {
  const [selectedCity, setSelectedCity] = useState<CitySafetyData | null>(cities[0] || null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const circlesRef = useRef<Record<number, Circle>>({});

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [30, 10],
        zoom: 2,
        minZoom: 2,
        maxBounds: [[-85, -180], [85, 180]],
        maxBoundsViscosity: 1.0,
        worldCopyJump: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update circles when cities data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous circles
    Object.values(circlesRef.current).forEach(circle => circle.remove());
    const newCircles: Record<number, Circle> = {};

    cities.forEach(city => {
      const style = statusStyles[city.safetyStatus];
      const circle = L.circle([city.coords.lat, city.coords.lng], {
        radius: city.radius,
        color: style.color,
        fillColor: style.fillColor,
        fillOpacity: 0.6,
        weight: 1,
      }).addTo(map);

      circle.bindTooltip(city.cityName, { direction: 'top' });
      circle.on('click', () => {
        setSelectedCity(city);
      });
      newCircles[city.id] = circle;
    });
    circlesRef.current = newCircles;
  }, [cities]);

  // Fly to selected city
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && selectedCity) {
      map.flyTo([selectedCity.coords.lat, selectedCity.coords.lng], 6, {
        animate: true,
        duration: 1.5
      });
    }
  }, [selectedCity]);
  
  const cityPrograms = selectedCity ? allPrograms.filter(p => p.destinationCity === selectedCity.cityName) : [];
  const currentStyle = selectedCity ? statusStyles[selectedCity.safetyStatus] : null;

  return (
    <div className="bg-gray-100">
       <div className="bg-white border-b border-gray-200 p-3 text-center">
          <p className="text-sm text-gray-700 container mx-auto">
              O mapa de avaliações é baseado em feedbacks agregados e anônimos de usuárias. Todas as informações passam por um processo de verificação antes de serem publicadas.
          </p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Map Area */}
            <div className="w-full md:flex-grow h-[600px] rounded-lg overflow-hidden shadow-lg">
                <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} className="leaflet-container" />
            </div>

            {/* Sidebar */}
            <div className={`w-full md:w-96 lg:w-1/3 bg-white text-gray-800 shadow-lg p-6 rounded-lg md:max-h-[600px] md:overflow-y-auto hide-scrollbar transition-all duration-300`}>
                {selectedCity && currentStyle ? (
                <div>
                    <div className={`p-4 rounded-lg border-l-4 ${currentStyle.borderClass} bg-gray-50`}>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCity.cityName}, {selectedCity.countryName}</h2>
                    <div className={`mt-2 inline-flex items-center text-sm font-semibold px-3 py-1 rounded-full ${currentStyle.bgClass} ${currentStyle.textClass}`}>
                        {currentStyle.name}
                    </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                    <div className={`p-3 rounded-lg ${currentStyle.bgClass}`}>
                        <p className={`text-2xl font-bold ${currentStyle.textClass}`}>{selectedCity.positiveFeedbackPercentage}%</p>
                        <p className={`text-sm ${currentStyle.textClass}`}>Feedbacks Positivos</p>
                    </div>
                    <div className={`p-3 rounded-lg ${currentStyle.bgClass}`}>
                        <p className={`text-2xl font-bold ${currentStyle.textClass}`}>{selectedCity.totalFeedbacks}</p>
                        <p className={`text-sm ${currentStyle.textClass}`}>Total de Feedbacks</p>
                    </div>
                    </div>

                    <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Programas e Agências na Cidade</h3>
                    {cityPrograms.length > 0 ? (
                        <div className="space-y-4">
                        {cityPrograms.map(program => (
                            <div key={program.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => onProgramSelect(program)}>
                            <p className="font-bold text-gray-800">{program.name}</p>
                            <p className="text-sm text-gray-500">por {program.agency.name}</p>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Nenhum programa encontrado para esta cidade.</p>
                    )}
                    </div>
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <svg className="w-16 h-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p className="text-gray-500 text-center">Selecione uma cidade no mapa<br/>para ver os detalhes.</p>
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};