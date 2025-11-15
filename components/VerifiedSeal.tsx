import React from 'react';
import { CheckmarkIcon } from './icons/CheckmarkIcon';

export const VerifiedSeal: React.FC = () => {
  return (
    <div className="inline-flex items-center bg-[#66CDAA]/30 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
      <CheckmarkIcon className="w-4 h-4 mr-1.5" />
      Verificado pela SafeJourney
    </div>
  );
};
