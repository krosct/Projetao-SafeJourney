
import React from 'react';
import { FeatureIcon } from './FeatureIcons';

interface WomenGoSafeSealProps {
  agencyCertifications: string[];
  programVerifications?: string[];
  className?: string;
  showDetails?: boolean;
}

export const WomenGoSafeSeal: React.FC<WomenGoSafeSealProps> = ({ 
  agencyCertifications = [], 
  className = "",
  showDetails = false
}) => {
  // Se não houver certificações, não renderizamos nada (remove o antigo selo "Padrão")
  if (!agencyCertifications || agencyCertifications.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
        {agencyCertifications.map((cert) => (
            <div key={cert} title={cert} className="transform transition-transform hover:scale-105">
                {/* Reutiliza o FeatureIcon que já aponta para /seals/X.png */}
                <FeatureIcon name={cert} />
            </div>
        ))}
    </div>
  );
};
