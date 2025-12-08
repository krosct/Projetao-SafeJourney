import React from 'react';
import { ContentPageData } from '../types';
import { FeatureIcon } from '../components/FeatureIcons';
import { certificationsContent } from '../data/contentData';
import { WomenGoSafeSeal } from '../components/WomenGoSafeSeal';

interface ContentPageProps {
  data: ContentPageData;
  onBack: () => void;
}

export const ContentPage: React.FC<ContentPageProps> = ({ data, onBack }) => {
  
  // Função auxiliar para criar dados falsos que gerem o selo correto
  const getDummyDataForSeal = (tierName: string) => {
    if (tierName === 'Selo Ouro') return { agency: Array(5).fill(''), program: Array(5).fill('') }; // 10 points
    if (tierName === 'Selo Prata') return { agency: Array(4).fill(''), program: Array(4).fill('') }; // 8 points
    if (tierName === 'Selo Bronze') return { agency: Array(3).fill(''), program: Array(2).fill('') }; // 5 points
    return { agency: [], program: [] }; // Standard (< 5)
  };

  return (
    <div className="bg-white py-16 min-h-[calc(100vh-250px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar</button>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">{data.title}</h1>
        
        <div className="space-y-12">
          {data.sections.map((section, idx) => (
            <section key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">
                {section.title}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {section.content.map((item, itemIdx) => {
                  const isSealSection = section.title.includes("Níveis do Selo");
                  
                  if (isSealSection) {
                    const dummyData = getDummyDataForSeal(item.subtitle);
                    return (
                        <div key={itemIdx} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                             <div className="mb-4 transform scale-110">
                                <WomenGoSafeSeal 
                                    agencyCertifications={dummyData.agency} 
                                    programVerifications={dummyData.program} 
                                />
                             </div>
                             <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {item.subtitle}
                             </h3>
                             <p className="text-gray-600 leading-relaxed text-sm">
                                {item.text}
                             </p>
                        </div>
                    );
                  }

                  return (
                    <div key={itemIdx} className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 transform scale-90 origin-left">
                            <FeatureIcon name={item.subtitle} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {item.subtitle}
                        </h3>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed pl-[44px]">
                        {item.text}
                        </p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};