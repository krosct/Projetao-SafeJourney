
import React, { useState } from 'react';
import { Program, ContentPageData, Course } from '../types';
import { VerifiedSeal } from '../components/VerifiedSeal';
import { CheckmarkIcon } from '../components/icons/CheckmarkIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { WarningIcon } from '../components/icons/WarningIcon';
import { WomanGoSafeSeal } from '../components/WomanGoSafeSeal';
import { FeatureIcon } from '../components/FeatureIcons';
import { certificationsContent } from '../data/contentData';
import { CourseCard } from '../components/CourseCard';
import { PurchaseModal } from '../components/PurchaseModal';

interface ProgramDetailPageProps {
  program: Program;
  courses: Course[];
  onBack: () => void;
  onReport: () => void;
  onInfoRequest: (program: Program) => void;
  onNavigateToContent: (data: ContentPageData) => void;
  onCourseSelect: (course: Course) => void;
  onNavigateToHub: () => void;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-[#DAA520]' : 'text-gray-300'}`} />
    ))}
  </div>
);

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({ 
  program, 
  courses, 
  onBack, 
  onReport, 
  onInfoRequest, 
  onNavigateToContent,
  onCourseSelect,
  onNavigateToHub
}) => {
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const avgRating = program.feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / (program.feedbacks.length || 1);
  const agencyCertifications = program.agency.certifications || [];
  const programVerifications = program.verifications || [];
  
  // Combine all active checks for display
  const allActiveVerifications = [...agencyCertifications, ...programVerifications];

  // Filtra os cursos vinculados a este programa
  const programCourses = courses.filter(c => c.programId === program.id);

  // Mock de usuário atual para pré-preencher o modal (num app real viria do Context)
  const mockUser = { name: 'Visitante', email: '', avatar: '' };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="mb-8 text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar para a busca</button>

        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
          {/* Left Column - Image and Core Info */}
          <div className="lg:col-span-2 relative z-10">
            <img src={program.image} alt={program.name} className="w-full h-96 object-cover rounded-lg shadow-lg mb-6" />
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900">{program.name}</h1>
                <div className="flex items-center mt-3 gap-3">
                   <img src={program.agency.logo} alt={program.agency.name} className="w-10 h-10 rounded-full border border-gray-200" />
                   <p className="text-xl text-gray-600">Oferecido por <span className="font-bold">{program.agency.name}</span></p>
                </div>
              </div>
              {program.agency.isVerified && (
                <div className="flex-shrink-0 ml-4">
                  <VerifiedSeal />
                </div>
              )}
            </div>
            <p className="text-lg text-gray-700 mt-4">{program.longDescription}</p>

            <div className="mt-8 border-t pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-semibold text-gray-800">Certificação de Segurança</h3>
                <button 
                  onClick={() => onNavigateToContent(certificationsContent)}
                  className="text-sm font-semibold text-rose-500 hover:text-rose-400 transition-colors"
                >
                  Entenda nossos níveis &rarr;
                </button>
              </div>

              {/* Novo Selo Centralizado */}
              <div className="flex flex-col items-center py-6 bg-gray-50 rounded-xl border border-gray-100">
                <WomanGoSafeSeal 
                    agencyCertifications={agencyCertifications}
                    programVerifications={programVerifications}
                    className="scale-125 mb-6"
                    showDetails={true}
                />
                
                {/* Ícones das Verificações Ativas */}
                {allActiveVerifications.length > 0 ? (
                  <div className="w-full px-6">
                     <p className="text-center text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4 border-t border-gray-200 pt-4 w-1/2 mx-auto">Itens Verificados</p>
                     <div className="flex flex-wrap justify-center gap-4">
                       {allActiveVerifications.map((feature) => (
                         <div key={feature} className="flex flex-col items-center w-24 text-center">
                            <FeatureIcon name={feature} />
                            <span className="text-[10px] text-gray-500 mt-2 leading-tight">{feature}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic mt-2">Este programa atende aos requisitos básicos da plataforma.</p>
                )}
              </div>
            </div>

            {/* Seção Cursos relacionados a este programa */}
            <div className="mt-10 border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Cursos relacionados</h2>
                <p className="text-sm text-gray-500">{programCourses.length} curso(s)</p>
              </div>

              {programCourses.length === 0 ? (
                <p className="text-gray-600">Nenhum curso vinculado a este programa.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programCourses.map(course => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      program={program} 
                      onSelect={onCourseSelect} 
                      onProgramLinkSelect={() => {}} 
                    />
                  ))}
                </div>
              )}
              <div className="mt-4">
                <button 
                  onClick={onNavigateToHub} 
                  className="text-rose-500 hover:text-rose-400 text-sm font-semibold"
                >
                  Ver todos os cursos &rarr;
                </button>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-16 border-t pt-12">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">Feedbacks de Usuárias ({program.feedbacks.length})</h2>
                <div className="flex items-center">
                  <RatingStars rating={Math.round(avgRating)} />
                  <span className="ml-2 text-gray-600 font-semibold">{avgRating.toFixed(1)} de 5 estrelas</span>
                </div>
              </div>
              <div className="mt-8 space-y-8">
                {program.feedbacks.map(feedback => (
                  <div key={feedback.id} className="flex items-start space-x-4">
                    <img className="h-12 w-12 rounded-full" src={feedback.avatar} alt={feedback.author} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-md font-semibold text-gray-900">{feedback.author}</p>
                          <p className="text-sm text-gray-500">{feedback.date}</p>
                        </div>
                        <RatingStars rating={feedback.rating} />
                      </div>
                      <p className="mt-2 text-gray-700">{feedback.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Report Button */}
            <div className="mt-12 text-center border-t pt-8">
              <button onClick={onReport} className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-semibold transition-colors">
                <WarningIcon className="w-5 h-5 mr-2" />
                Denunciar Agência/Programa
              </button>
            </div>
          </div>

          {/* Right Column - Booking and Details */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 sticky top-28">
              <p className="text-3xl font-bold text-gray-900">${program.price}</p>
              <p className="text-sm text-gray-500">Preço estimado por estudante</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">O que está incluído:</h3>
                <ul className="mt-3 space-y-2">
                  {program.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckmarkIcon className="w-5 h-5 text-rose-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 space-y-4">
                <button 
                  onClick={() => onInfoRequest(program)}
                  className="w-full bg-white text-rose-500 border-2 border-rose-500 font-bold py-3 px-4 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  Solicitar Informações
                </button>

                <button 
                  onClick={() => setPurchaseModalOpen(true)}
                  className="w-full bg-emerald-500 text-white font-bold py-4 px-4 rounded-lg shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all transform hover:scale-[1.02] flex justify-center items-center gap-2"
                >
                  <span>Comprar Agora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Compra */}
      <PurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        program={program}
        currentUser={mockUser}
      />
    </div>
  );
};
