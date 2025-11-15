import React from 'react';

interface ContentPageProps {
  title: string;
  body: string[];
  onBack: () => void;
}

export const ContentPage: React.FC<ContentPageProps> = ({ title, body, onBack }) => {
  return (
    <div className="bg-white py-16 min-h-[calc(100vh-250px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-[#66CDAA] hover:text-[#5F9EA0] font-semibold">&larr; Voltar</button>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">{title}</h1>
        <div className="text-gray-700 space-y-6 text-lg">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};