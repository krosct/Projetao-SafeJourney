import React, { useEffect, useState } from 'react';
import { User, Program } from '../types';
import { programs as allPrograms } from '../data/mockData';

interface ProfilePageProps {
  currentUser: User | null;
  onBack: () => void;
  onUpdateUser: (u: User) => void;
}

/**
 * ProfilePage
 * - Abas: Perfil / Histórico
 * - Edita perfil (modal) e persiste via onUpdateUser (App salva em localStorage)
 * - Histórico mostra apenas 2 programas: 1 para Alemanha (se existir) + 1 de outro país
 * - Botão "Visualizar Intercâmbio" abre modal com detalhes do programa
 * - Avaliação local (1..5) salva em localStorage por usuário+program (apenas demonstração)
 */
export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, onBack, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');

  // Edit profile state
  const [isEditOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editNationality, setEditNationality] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editBio, setEditBio] = useState('');

  // Program modal state
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isProgramModalOpen, setProgramModalOpen] = useState(false);

  // Ratings map: programId -> rating
  const [ratings, setRatings] = useState<Record<number, number>>({});

  // Load ratings from localStorage for currentUser
  useEffect(() => {
    if (!currentUser) {
      setRatings({});
      return;
    }
    const map: Record<number, number> = {};
    (allPrograms || []).forEach((p) => {
      const key = `sj_rating_${currentUser.email}_${p.id}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const v = parseInt(raw, 10);
        if (!isNaN(v)) map[p.id] = v;
      }
    });
    setRatings(map);
  }, [currentUser]);

  const setRating = (programId: number, value: number) => {
    if (!currentUser) return;
    const key = `sj_rating_${currentUser.email}_${programId}`;
    try {
      localStorage.setItem(key, String(value));
    } catch (err) {
      console.warn('Falha ao salvar rating', err);
    }
    setRatings((prev) => ({ ...prev, [programId]: value }));
  };

  // Seleção dos programas para o histórico:
  // - tentar achar 1 programa para Alemanha (destCountry includes 'alemanha' or 'germany' or city 'berlim')
  // - e 1 programa de país diferente
  const getSelectedPrograms = (): Program[] => {
    if (!allPrograms || allPrograms.length === 0) return [];

    const normalize = (s?: string) => (s || '').toLowerCase();

    const germanyProgram = allPrograms.find(p =>
      normalize(p.destinationCountry).includes('aleman') ||
      normalize(p.destinationCountry).includes('germany') ||
      normalize(p.destinationCity).includes('berlim')
    );

    const otherProgram = allPrograms.find(p =>
      p !== germanyProgram &&
      !(
        normalize(p.destinationCountry).includes('aleman') ||
        normalize(p.destinationCountry).includes('germany') ||
        normalize(p.destinationCity).includes('berlim')
      )
    );

    const selected: Program[] = [];
    if (germanyProgram) selected.push(germanyProgram);
    if (otherProgram) selected.push(otherProgram);

    // Fallbacks:
    if (selected.length === 0) {
      // pega os dois primeiros
      return allPrograms.slice(0, 2);
    }
    if (selected.length === 1) {
      // tentou achar Alemanha, mas não encontrou outro país diferente: pega o próximo disponível que não seja o mesmo
      const fallback = allPrograms.find(p => p !== selected[0]);
      if (fallback) selected.push(fallback);
    }
    return selected;
  };

  const userPrograms: Program[] = getSelectedPrograms();

  // Abrir edição com dados preenchidos
  const openEdit = () => {
    if (!currentUser) return;
    setEditName(currentUser.name || '');
    setEditNationality(currentUser.nationality || '');
    setEditLocation(currentUser.currentLocation || '');
    setEditBio(currentUser.bio || '');
    setEditOpen(true);
  };

  const saveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      name: editName,
      nationality: editNationality,
      currentLocation: editLocation,
      bio: editBio,
    };
    onUpdateUser(updated);
    setEditOpen(false);
  };

  const openProgramModal = (program: Program) => {
    setSelectedProgram(program);
    setProgramModalOpen(true);
  };

  const closeProgramModal = () => {
    setSelectedProgram(null);
    setProgramModalOpen(false);
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-600">Você precisa entrar para ver seu perfil.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar</button>
          <div>
            <button onClick={openEdit} className="px-4 py-2 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600">Editar perfil</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <div className="flex items-center gap-6">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-lg object-cover shadow-sm" />
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{currentUser.name}</h2>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
              <div className="mt-3 text-gray-700">
                <p><strong>Nacionalidade:</strong> {currentUser.nationality || '-'}</p>
                <p><strong>Local atual:</strong> {currentUser.currentLocation || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${activeTab === 'profile' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg capitalize transition-colors`}
            >
              Perfil
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`${activeTab === 'history' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg capitalize transition-colors`}
            >
              Histórico
            </button>
          </nav>
        </div>

        {/* Perfil */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sobre</h3>
            <p className="text-gray-700 leading-relaxed">
              {currentUser.bio || 'Sem bio disponível.'}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-600">Informações</h4>
                <p className="mt-2 text-gray-700"><strong>Nome:</strong> {currentUser.name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {currentUser.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-600">Localização</h4>
                <p className="mt-2 text-gray-700"><strong>Nacionalidade:</strong> {currentUser.nationality || '-'}</p>
                <p className="text-gray-700"><strong>Local atual:</strong> {currentUser.currentLocation || '-'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Histórico */}
        {activeTab === 'history' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Programas e Cursos</h3>

            {userPrograms.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
                Sem histórico ainda.
              </div>
            ) : (
              <div className="space-y-4">
                {userPrograms.map((p) => (
                  <div key={p.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{p.name}</h4>
                        <p className="text-sm text-gray-600">
                          { (p as any).institution || p.agency?.name || 'Instituição não informada' } — {p.destinationCity || '-'}, {p.destinationCountry || '-'}
                        </p>

                        {p.startDate && (
                          <p className="text-sm text-gray-500 mt-1"><strong>Início da viagem:</strong> {p.startDate}</p>
                        )}
                        {p.endDate && (
                          <p className="text-sm text-gray-500"><strong>Fim da viagem:</strong> {p.endDate}</p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => openProgramModal(p)} className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700">Visualizar Intercâmbio</button>

                        {/* Rating UI */}
                        <div className="flex items-center gap-1 mt-2">
                          <div className="text-sm text-gray-600">Avaliar:</div>
                          <div className="flex items-center">
                            {[1,2,3,4,5].map(st => {
                              const filled = (ratings[p.id] || 0) >= st;
                              return (
                                <button
                                  key={st}
                                  onClick={() => setRating(p.id, st)}
                                  title={`${st} estrela${st>1?'s':''}`}
                                  className={`w-7 h-7 flex items-center justify-center rounded ${filled ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                                  aria-label={`Avaliar ${st} estrela`}
                                >
                                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.813 2.403c-.785.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.186 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.966z"/>
                                  </svg>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-gray-700">{p.shortDescription || p.longDescription || ''}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[3000] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">Editar perfil</h3>
            <form onSubmit={saveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nacionalidade</label>
                <input value={editNationality} onChange={e => setEditNationality(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Local atual</label>
                <input value={editLocation} onChange={e => setEditLocation(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea value={editBio} onChange={e => setEditBio(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" rows={3} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                <button type="button" onClick={() => setEditOpen(false)} className="px-4 py-2 border rounded-md">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-md">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program View Modal */}
      {isProgramModalOpen && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[3000] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedProgram.name}</h2>
              <button onClick={closeProgramModal} className="text-gray-400 hover:text-gray-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {selectedProgram.image && <img src={selectedProgram.image} alt={selectedProgram.name} className="w-full h-48 object-cover rounded-lg mb-4" />}

            <div className="space-y-4">
              <div className="flex justify-between text-lg border-b border-gray-100 pb-3">
                <span className="font-semibold text-gray-700">Localização:</span>
                <span>{selectedProgram.destinationCity}, {selectedProgram.destinationCountry}</span>
              </div>
              <div className="flex justify-between text-lg border-b border-gray-100 pb-3">
                <span className="font-semibold text-gray-700">Preço:</span>
                <span className="font-bold text-rose-600 text-2xl">${selectedProgram.price}</span>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Descrição</h3>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{selectedProgram.longDescription || selectedProgram.shortDescription}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">O que está incluso</h3>
                <div className="flex flex-wrap gap-2">
                  {(selectedProgram.includes || []).map((inc, idx) => (
                    <span key={idx} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-medium border border-rose-100">{inc}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeProgramModal} className="px-4 py-2 rounded-md border">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;