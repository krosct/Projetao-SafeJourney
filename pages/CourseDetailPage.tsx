import React, { useState } from 'react';
import { Course, Program } from '../types';
import { CheckmarkIcon } from '../components/icons/CheckmarkIcon';
import { PurchaseModal } from '../components/PurchaseModal'; // Importado

interface CourseDetailPageProps {
  course: Course;
  relatedProgram: Program;
  onBack: () => void;
  onViewAgencyPrograms: (agencyId: number) => void;
}

// Função para gerar sementes de fotos dinâmicas e contextuais
const generatePhotoSeeds = (course: Course, program: Program): string[] => {
    const seeds: string[] = [];
    const title = course.title.toLowerCase();
    const city = program.destinationCity.replace(/\s/g, '').toLowerCase();

    let theme = 'study'; // Tema padrão

    if (title.includes('cultura') || title.includes('língua')) theme = 'culture';
    else if (title.includes('carreira') || title.includes('negócios') || title.includes('business')) theme = 'business';
    else if (title.includes('design') || title.includes('artes') || title.includes('fotografia')) theme = 'art';
    else if (title.includes('gastronomia')) theme = 'food';
    else if (title.includes('sustentabilidade') || title.includes('biologia')) theme = 'nature';
    else if (title.includes('aventura')) theme = 'adventure';
    else if (course.type === 'Mentoria') theme = 'mentoring';

    for (let i = 1; i <= 5; i++) {
        seeds.push(`${city}-${theme}-${i}`);
    }
    return seeds;
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, relatedProgram, onBack, onViewAgencyPrograms }) => {
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false); // Estado do modal
  const agency = relatedProgram.agency;
  const photoSeeds = generatePhotoSeeds(course, relatedProgram);

  const hasDiscount = course.discountPercentage && course.discountPercentage > 0;
  const finalPrice = hasDiscount ? Math.round(course.price * (1 - course.discountPercentage! / 100)) : course.price;

  // Mock de usuário atual
  const mockUser = { name: 'Visitante', email: '', avatar: '' };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="mb-8 text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar para o Hub</button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-3">
            <span className={`inline-block px-3 py-1 text-sm font-semibold uppercase rounded-full mb-3 ${course.type === 'Curso' ? 'bg-rose-100 text-rose-600' : 'bg-[#daa520]/20 text-[#b8860b]'}`}>
              {course.type}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900">{course.title}</h1>
            <p className="mt-4 text-lg text-gray-600">{course.description}</p>
            
            <div className="mt-6 text-md">
                <p>com <span className="font-semibold">{course.instructor}</span></p>
                <p className="text-gray-500">Parceiro: {course.partner}</p>
            </div>
            
            <div className="mt-8 border-t pt-6">
                {hasDiscount ? (
                    <div className="flex items-center gap-4">
                         <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-medium text-gray-500 line-through">${course.price}</span>
                            <span className="text-5xl font-extrabold text-gray-900">${finalPrice}</span>
                        </div>
                        <span className="px-3 py-1 text-lg font-semibold text-red-700 bg-red-100 rounded-full">
                            {course.discountPercentage}% OFF
                        </span>
                    </div>
                ) : (
                    <span className="text-5xl font-extrabold text-gray-900">${course.price}</span>
                )}
                <p className="mt-2 text-gray-600 mb-6">
                    {hasDiscount && course.discountPercentage === 100
                        ? `Este ${course.type.toLowerCase()} é seu ao contratar o programa de intercâmbio relacionado!`
                        : `Aproveite este desconto especial por tempo limitado.`}
                </p>

                {/* BOTÃO DE COMPRA ADICIONADO AQUI */}
                <button 
                  onClick={() => setPurchaseModalOpen(true)}
                  className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-[1.02] flex justify-center items-center gap-2"
                >
                  <span>Comprar {course.type} Agora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </button>
            </div>
          </div>

          {/* Right Column - Gallery */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <img src={`https://picsum.photos/seed/${photoSeeds[0]}/800/600`} alt={`Ambiente de ${course.type} 1`} className="col-span-2 rounded-lg shadow-md w-full h-64 object-cover" />
              <img src={`https://picsum.photos/seed/${photoSeeds[1]}/400/300`} alt={`Ambiente de ${course.type} 2`} className="rounded-lg shadow-md w-full h-32 object-cover" />
              <img src={`https://picsum.photos/seed/${photoSeeds[2]}/400/300`} alt={`Ambiente de ${course.type} 3`} className="rounded-lg shadow-md w-full h-32 object-cover" />
              <img src={`https://picsum.photos/seed/${photoSeeds[3]}/400/300`} alt={`Ambiente de ${course.type} 4`} className="rounded-lg shadow-md w-full h-32 object-cover" />
              <img src={`https://picsum.photos/seed/${photoSeeds[4]}/400/300`} alt={`Ambiente de ${course.type} 5`} className="rounded-lg shadow-md w-full h-32 object-cover" />
            </div>
          </div>
        </div>

        {/* Agency Info Section */}
        <div className="mt-16 border-t pt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Informações sobre a Agência Vinculada</h2>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800">{agency.name}</h3>
                <p className="mt-3 text-lg text-gray-600">{agency.description}</p>
                {agency.isVerified && (
                    <p className="mt-4 text-sm text-teal-700 bg-teal-100 p-3 rounded-md">{agency.verificationReason}</p>
                )}
                {agency.certifications && agency.certifications.length > 0 && (
                     <div className="mt-6 border-t pt-6">
                        <h4 className="text-md font-semibold uppercase tracking-wide text-gray-600 mb-4">Certificações de Elite</h4>
                        <ul className="space-y-3">
                            {agency.certifications.map(cert => (
                                <li key={cert} className="flex items-center text-gray-800">
                                <CheckmarkIcon className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0" />
                                <span>{cert}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 <button 
                    onClick={() => onViewAgencyPrograms(agency.id)}
                    className="mt-8 bg-rose-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-rose-500 transition-all duration-300 transform hover:scale-105">
                    Ver Todos os Programas da Agência
                </button>
            </div>
        </div>
      </div>

      {/* MODAL ADICIONADO AQUI */}
      <PurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        course={course}
        coursePrice={finalPrice}
        agencyName={agency.name}
        currentUser={mockUser}
      />
    </div>
  );
};