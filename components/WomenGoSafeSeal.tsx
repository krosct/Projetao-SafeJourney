
import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface WomenGoSafeSealProps {
  agencyCertifications: string[];
  programVerifications: string[];
  className?: string;
  showDetails?: boolean;
}

export const WomenGoSafeSeal: React.FC<WomenGoSafeSealProps> = ({ 
  agencyCertifications = [], 
  programVerifications = [],
  className = "",
  showDetails = false
}) => {
  const totalScore = agencyCertifications.length + programVerifications.length;
  // Total possible items: 5 agency + 5 program (4 static + 1 dynamic rating) = 10.
  const maxScore = 10;
  
  let tier: 'Bronze' | 'Prata' | 'Ouro' | 'Padrão';

  // Logic:
  // Gold: >= 10 (95%)
  // Silver: >= 8 (75%) AND < 10
  // Bronze: >= 5 (50%) AND < 8
  // Standard (Padrão): < 5
  
  if (totalScore >= 10) {
    tier = 'Ouro';
  } else if (totalScore >= 8) {
    tier = 'Prata';
  } else if (totalScore >= 5) {
    tier = 'Bronze';
  } else {
    tier = 'Padrão';
  }

  // Configuração de cores para os Escudos (Bronze, Prata, Ouro)
  const shieldColors = {
    'Ouro': {
        fill: "text-yellow-50",
        stroke: "#CA8A04", // yellow-600
        icon: "text-yellow-600",
        ribbon: "bg-yellow-600",
        ribbonFold: "bg-yellow-800"
    },
    'Prata': {
        fill: "text-slate-50",
        stroke: "#64748B", // slate-500
        icon: "text-slate-500",
        ribbon: "bg-slate-500",
        ribbonFold: "bg-slate-700"
    },
    'Bronze': {
        fill: "text-orange-50",
        stroke: "#9A3412", // orange-800
        icon: "text-orange-800",
        ribbon: "bg-orange-700",
        ribbonFold: "bg-orange-900"
    }
  };

  // Renderização 1: Selo Padrão (Modelo "Pílula" Horizontal Aumentado)
  if (tier === 'Padrão') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div 
            className="relative flex items-center justify-center gap-3 px-8 py-3 rounded-full border bg-gray-50 border-gray-300 text-gray-500 shadow-sm transition-transform hover:scale-105"
            title={`Pontuação de Segurança: ${totalScore}/${maxScore}`}
        >
            <ShieldCheckIcon className="w-8 h-8 text-gray-400" />
            <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 mb-0.5">Verificação</span>
                <span className="text-lg font-bold uppercase tracking-tight">Padrão</span>
            </div>
        </div>
        
        {showDetails && (
            <p className="mt-3 text-sm text-gray-500 font-medium">
                {totalScore} verificações de segurança ativas
            </p>
        )}
      </div>
    );
  }

  // Renderização 2: Selos Premium (Escudo com Faixa)
  const colors = shieldColors[tier];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
        {/* Reduzi o tamanho de w-28 h-32 para w-20 h-24 para ficar mais elegante */}
        <div className="relative w-20 h-24 flex items-center justify-center transition-transform hover:scale-105 filter drop-shadow-md group">
          
          {/* SVG do Escudo Rebuscado */}
          {/* ViewBox ajustado para -2 -2 104 124 para evitar corte do stroke no topo */}
          <svg 
            viewBox="-2 -2 104 124" 
            className={`absolute inset-0 w-full h-full ${colors.fill}`}
            fill="currentColor"
            stroke={colors.stroke}
            strokeWidth="3"
          >
            <path d="M50 0 C 20 0, 5 15, 5 35 V 55 C 5 85, 25 105, 50 115 C 75 105, 95 85, 95 55 V 35 C 95 15, 80 0, 50 0 Z" />
            <path d="M15 40 V 55 C 15 75, 30 90, 50 98 C 70 90, 85 75, 85 55 V 40" fill="none" stroke={colors.stroke} strokeWidth="1.5" strokeOpacity="0.5" />
          </svg>

          {/* Ícone Central */}
          <div className="relative z-10 mb-3">
             <ShieldCheckIcon className={`w-8 h-8 ${colors.icon}`} />
          </div>

          {/* Faixa/Ribbon */}
          <div className="absolute bottom-4 z-20 w-full flex justify-center">
            <div className={`${colors.ribbon} text-white text-[10px] font-bold py-0.5 px-3 shadow-md tracking-widest uppercase rounded-sm transform translate-y-1 relative`}>
                {/* Dobras da faixa (Pseudo-elements simulados) */}
                <div className={`absolute top-0 -left-1.5 w-2 h-full ${colors.ribbonFold} skew-y-[30deg] origin-bottom-right -z-10 rounded-l-sm`}></div>
                <div className={`absolute top-0 -right-1.5 w-2 h-full ${colors.ribbonFold} -skew-y-[30deg] origin-bottom-left -z-10 rounded-r-sm`}></div>
                {tier}
            </div>
          </div>
        </div>

        {showDetails && (
          <p className="mt-2 text-xs text-gray-500 font-medium">
              {totalScore} verificações de segurança ativas
          </p>
        )}
      </div>
  );
};
