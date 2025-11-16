import React from 'react';
import { Logo } from './Logo';

type NavigablePage = 'home' | 'programs' | 'map' | 'hub';

interface HeaderProps {
    onNavigate: (page: NavigablePage) => void;
    activePage: NavigablePage;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activePage }) => {
  const navItems: { page: NavigablePage, label: string }[] = [
    { page: 'home', label: 'Início' },
    { page: 'programs', label: 'Programas' },
    { page: 'map', label: 'Mapa de Avaliações' },
    { page: 'hub', label: 'Hub de Conhecimento' },
  ];

  const baseClasses = "relative px-1 py-2 text-md font-medium transition-colors duration-300 ease-in-out group";
  const inactiveClasses = "text-gray-600 hover:text-[#66CDAA]";
  const activeClasses = "text-[#66CDAA]";

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-[2000]">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map(item => (
                <button 
                  key={item.page}
                  onClick={() => onNavigate(item.page)} 
                  className={`${baseClasses} ${activePage === item.page ? activeClasses : inactiveClasses}`}
                >
                  <span>{item.label}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#66CDAA] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out ${activePage === item.page ? 'scale-x-100' : ''}`}></span>
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </nav>
    </header>
  );
};