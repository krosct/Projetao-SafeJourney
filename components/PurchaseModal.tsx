
import React, { useState, useEffect } from 'react';
import { Program, User } from '../types';
import { CheckmarkIcon } from './icons/CheckmarkIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
  currentUser: User | null;
}

type Step = 'terms' | 'payment' | 'processing' | 'success';

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, program, currentUser }) => {
  const [step, setStep] = useState<Step>('terms');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Payment Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('terms');
      setAcceptedTerms(false);
      // Alteração solicitada: Iniciar vazio ao invés de usar currentUser.name (que era 'Visitante')
      setCardName('');
      setCardNumber('');
      setExpiry('');
      setCvv('');
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleTermsSubmit = () => {
    if (acceptedTerms) setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[3000] flex justify-center items-center p-4 backdrop-blur-sm">
       {/* CSS Local para forçar scrollbar clara */}
       <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6; /* cinza bem claro */
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db; /* cinza médio */
          border-radius: 6px;
          border: 2px solid #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        /* Forçar esquema de cor clara para controles nativos neste componente */
        .force-light-scheme {
          color-scheme: light;
        }
      `}</style>

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] force-light-scheme">
        
        {/* Header */}
        <div className="bg-rose-50 p-4 border-b border-rose-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">
            {step === 'terms' && 'Termos do Programa'}
            {step === 'payment' && 'Pagamento Seguro'}
            {step === 'processing' && 'Processando...'}
            {step === 'success' && 'Compra Confirmada'}
          </h2>
          {step !== 'processing' && step !== 'success' && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          
          {/* STEP 1: TERMS */}
          {step === 'terms' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600 h-64 overflow-y-auto custom-scrollbar shadow-inner">
                <h3 className="font-bold text-gray-800 mb-2">1. Condições Gerais de Segurança</h3>
                <p className="mb-2">A agência <strong>{program.agency.name}</strong> compromete-se a fornecer acomodação verificada (female-only) e suporte local 24/7 conforme descrito no pacote.</p>
                
                <h3 className="font-bold text-gray-800 mb-2">2. Política de Cancelamento e Reembolso</h3>
                <p className="mb-2">Cancelamentos feitos até 30 dias antes do embarque terão reembolso de 80%. Cancelamentos com menos de 30 dias estão sujeitos a multas contratuais.</p>
                
                <h3 className="font-bold text-gray-800 mb-2">3. Código de Conduta Woman GO Safe</h3>
                <p className="mb-2">Ao participar deste programa, a intercambista concorda em respeitar as leis locais e manter uma conduta que promova a segurança e o bem-estar coletivo.</p>
                
                <h3 className="font-bold text-gray-800 mb-2">4. Responsabilidades</h3>
                <p>A plataforma atua como intermediadora. A execução dos serviços é de responsabilidade integral da agência contratada.</p>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="focus:ring-rose-500 h-4 w-4 text-rose-600 border-gray-300 rounded cursor-pointer bg-white"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">
                    Li e concordo com os termos e condições do programa.
                  </label>
                </div>
              </div>

              <button
                onClick={handleTermsSubmit}
                disabled={!acceptedTerms}
                className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
                  acceptedTerms ? 'bg-rose-500 hover:bg-rose-600 shadow-md' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continuar para Pagamento
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              <div className="bg-rose-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total a pagar</p>
                  <p className="text-2xl font-bold text-gray-800">${program.price}</p>
                </div>
                <ShieldCheckIcon className="w-8 h-8 text-rose-400" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Nome no Cartão</label>
                <input 
                  type="text" 
                  required 
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="Nome escrito no cartão" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Número do Cartão</label>
                <input 
                  type="text" 
                  required 
                  placeholder="0000 0000 0000 0000" 
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none font-mono bg-white text-gray-900" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Validade</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="MM/AA" 
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none text-center bg-white text-gray-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">CVV</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="123" 
                    maxLength={4}
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none text-center bg-white text-gray-900" 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span>Pagamento processado com criptografia segura SSL.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-md transition-transform transform active:scale-95"
              >
                Pagar ${program.price}
              </button>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
             <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-rose-500 mb-4"></div>
                <p className="text-gray-600 font-medium">Processando seu pagamento...</p>
             </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckmarkIcon className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Compra Realizada!</h2>
              <p className="text-gray-600 mb-6">
                Parabéns! Sua vaga no programa <strong>{program.name}</strong> está garantida.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-left border border-gray-100">
                <p className="mb-2"><strong>Próximos passos:</strong></p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Enviamos um e-mail com o comprovante e contrato.</li>
                  <li>A agência entrará em contato em até 24h úteis.</li>
                  <li>Acesse o "Hub de Conhecimento" para iniciar seus cursos bônus.</li>
                </ul>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-600 shadow-md transition-colors"
              >
                Fechar e Voltar ao Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
