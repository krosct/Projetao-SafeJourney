
import React from 'react';

// --- Mapeamento de Imagens para os Selos ---
// SUBSTITUA OS CAMINHOS ABAIXO PELAS SUAS IMAGENS REAIS
const sealImages: { [key: string]: string } = {
  "Suporte 24/7": "/seals/suporte.png", // Ex: "/assets/selo-suporte.png"
  "Female-Only": "/seals/female.png",   // Ex: "/assets/selo-female.png"
  "Women's Health": "/seals/saude.png", // Ex: "/assets/selo-health.png"
};

// --- Componente de Ícone Único ---
export const FeatureIcon: React.FC<{ name: string }> = ({ name }) => {
  const imageUrl = sealImages[name];

  // Se não tiver imagem mapeada (ou nome errado), não renderiza nada
  if (!imageUrl) return null;

  return (
    <div className="relative group inline-block">
      {/* Renderiza a Imagem do Selo */}
      <img 
        src={imageUrl} 
        alt={name} 
        // Aumentado de w-12 (48px) para w-[72px] (aprox +50%)
        className="w-[72px] h-[72px] object-contain hover:scale-110 transition-transform duration-300" 
      />
      
      {/* Tooltip com o nome do selo ao passar o mouse */}
      <div 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
        role="tooltip"
      >
        {name}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
      </div>
    </div>
  );
};

// --- Main Exported Component ---

export const ProgramFeatures: React.FC<{ features: string[] }> = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {features.map((featureName) => (
        <FeatureIcon key={featureName} name={featureName} />
      ))}
    </div>
  );
};
