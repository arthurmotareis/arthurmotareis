import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onMenuClick?: () => void;
  avatarUrl: string;
  onProfileClick?: () => void;
}

export default function Header({
  title,
  showBackButton = false,
  onBackClick,
  onMenuClick,
  avatarUrl,
  onProfileClick
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-5 bg-[#f9f9fc]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {showBackButton ? (
          <button
            onClick={onBackClick}
            className="p-2 -ml-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#0c3d5e]"
            aria-label="Voltar"
            id="header-back-button"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        ) : (
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-full hover:bg-black/5 active:scale-95 transition-all text-[#0c3d5e]"
            aria-label="Menu"
            id="header-menu-button"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-[#0c3d5e] select-none font-sans" id="header-page-title">
          {title}
        </h1>
      </div>

      <button
        onClick={onProfileClick}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:scale-105 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-[#2e90c9]"
        aria-label="Navegar para Perfil"
        id="header-profile-button"
      >
        <img
          src={avatarUrl}
          alt="Avatar do Usuário"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </button>
    </header>
  );
}
