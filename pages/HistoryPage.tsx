// novo: pages/HistoryPage.tsx
import React from 'react';
import { User } from '../types';

const MOCK_PROGRAMS = [
  {
    id: 'p1',
    title: 'Intercâmbio Acadêmico - Universidade de Lisboa',
    institution: 'Universidade de Lisboa',
    country: 'Portugal',
    city: 'Lisboa',
    startDate: '2024-02-01',
    endDate: '2024-07-31',
    description: 'Semestre de intercambio focado em Sociologia.',
  },
  {
    id: 'p2',
    title: 'Curso de Português Avançado',
    institution: 'Escola Lingua',
    country: 'Portugal',
    city: 'Lisboa',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    description: 'Curso intensivo de português para estrangeiros.',
  }
];

export const HistoryPage: React.FC<{ currentUser: User | null; onBack: () => void }> = ({ currentUser, onBack }) => {
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-600">Você precisa entrar para ver o histórico.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <button onClick={onBack} className="text-rose-500 hover:text-rose-400 mb-6">&larr; Voltar</button>
      <h2 className="text-2xl font-bold mb-4">Histórico de Programas e Cursos</h2>

      <div className="space-y-4">
        {MOCK_PROGRAMS.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.institution} — {p.city}, {p.country}</p>
              </div>
              <div className="text-sm text-gray-500">
                {p.startDate} → {p.endDate}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;