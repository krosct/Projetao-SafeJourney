

import React from 'react';
import { Program } from '../types';
import { VerifiedSeal } from './VerifiedSeal';
import { MapPinIcon } from './icons/MapPinIcon';
import { CheckmarkIcon } from './icons/CheckmarkIcon';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col" onClick={() => onSelect(program)}>
      <div className="relative">
        <img className="h-48 w-full object-cover rounded-t-xl" src={program.image} alt={program.name} />
        {program.agency.isVerified && (
          <div className="absolute top-3 right-3 z-10">
            <VerifiedSeal />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="uppercase tracking-wide text-sm text-[#66CDAA] font-semibold">{program.agency.name}</div>
        <h3 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">{program.name}</h3>
        <p className="mt-2 text-gray-500 flex-grow">{program.shortDescription}</p>
        
        <div className="mt-auto pt-4">
          {program.agency.certifications && program.agency.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {program.agency.certifications.map((cert) => (
                <span key={cert} className="inline-flex items-center text-xs font-medium bg-[#66CDAA]/20 text-[#5F9EA0] px-2 py-0.5 rounded-full">
                  <CheckmarkIcon className="w-3 h-3 mr-1.5" />
                  {cert}
                </span>
              ))}
            </div>
          )}

          {program.verifications && program.verifications.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {program.verifications.slice(0, 4).map((verification) => (
                  <span key={verification} className="inline-flex items-center text-xs font-medium bg-[#DAA520]/20 text-[#b8860b] px-2 py-0.5 rounded-full">
                    {verification}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
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