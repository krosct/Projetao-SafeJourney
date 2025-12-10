
import React from 'react';
import { Program } from '../types';
import { VerifiedSeal } from './VerifiedSeal';
import { MapPinIcon } from './icons/MapPinIcon';
import { WomenGoSafeSeal } from './WomenGoSafeSeal';

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
        
        {/* {program.agency.isVerified && (
          <div className="absolute top-3 right-3 z-30">
            <VerifiedSeal />
          </div>
        )} */}
        <img 
            src={program.agency.logo} 
            alt={program.agency.name}
            className="absolute -bottom-6 left-6 w-24 h-24 rounded-full border-4 border-white shadow-md z-20 bg-gray-50 object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow pt-10">
        <h3 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">{program.name}</h3>
        <div className="flex flex-row">
          <div className="uppercase tracking-wide text-sm text-gray-500 font-semibold pl-2"> Oferecido por</div>
          <div className="uppercase tracking-wide text-sm text-rose-500 font-semibold pl-2">{program.agency.name}</div>
        </div>
        <p className="mt-2 text-gray-500 flex-grow">{program.shortDescription}</p>
        
        <div className="mt-auto pt-4 flex justify-center">
            <WomenGoSafeSeal 
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
