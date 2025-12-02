
import React from 'react';
import { Program } from '../types';
import { VerifiedSeal } from './VerifiedSeal';
import { MapPinIcon } from './icons/MapPinIcon';
import { WomanGoSafeSeal } from './WomanGoSafeSeal';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  const agencyCertifications = program.agency.certifications || [];
  const programVerifications = program.verifications || [];

  return (
    <div className="bg-white rounded-xl shadow-md transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden" onClick={() => onSelect(program)}>
      <div className="relative">
        <img className="h-48 w-full object-cover" src={program.image} alt={program.name} />
        
        {/* Design de Logo em Camadas (Escadinha) - Elementos Irmãos com Z-Index Explícito */}
        
        {/* Camada 1: Círculo Fundo (Maior) - Aumentado levemente para acomodar a logo maior */}
        <div className="absolute -top-6 -left-6 z-10 w-[86px] h-[86px] bg-rose-200 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] opacity-90 pointer-events-none"></div>
        
        {/* Camada 2: Círculo Meio (Médio) - Aumentado levemente */}
        <div className="absolute -top-5 -left-5 z-20 w-[78px] h-[78px] bg-rose-400 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)] opacity-90 pointer-events-none"></div>
        
        {/* Camada 3: Logo da Agência (Frente) - Aumentado de w-16 (64px) para w-[70px] */}
        <div className="absolute -top-4 -left-4 z-30 pointer-events-none">
          <img 
              src={program.agency.logo} 
              alt={`Logo ${program.agency.name}`} 
              className="w-[70px] h-[70px] object-cover rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.6)] border-2 border-white"
          />
        </div>

        {program.agency.isVerified && (
          <div className="absolute top-3 right-3 z-30">
            <VerifiedSeal />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow pt-10">
        <div className="uppercase tracking-wide text-sm text-rose-500 font-semibold pl-2">{program.agency.name}</div>
        <h3 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">{program.name}</h3>
        <p className="mt-2 text-gray-500 flex-grow">{program.shortDescription}</p>
        
        <div className="mt-auto pt-4 flex justify-center">
            <WomanGoSafeSeal 
                agencyCertifications={agencyCertifications}
                programVerifications={programVerifications}
            />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-1 text-gray-400" />
                <span>{program.destinationCity}, {program.destinationCountry}</span>
            </div>
            <p className="text-lg font-bold text-gray-900">${program.price}</p>
        </div>
      </div>
    </div>
  );
};
