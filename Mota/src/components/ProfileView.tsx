import React, { useState } from 'react';
import { Bell, Shield, Settings, LogOut, Check, Edit2, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetData: () => void;
}

export default function ProfileView({ profile, onUpdateProfile, onResetData }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);

  // Quick avatar options list for fun customization
  const avatarPool = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', // Woman
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', // Man 1
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=300&q=80', // Avatar 3D
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' // Woman 2
  ];

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    onUpdateProfile({
      ...profile,
      name: editName.trim(),
      email: editEmail.trim()
    });
    setIsEditing(false);
  };

  const handleToggleNotifications = () => {
    onUpdateProfile({
      ...profile,
      notificationsEnabled: !profile.notificationsEnabled
    });
  };

  const cycleAvatar = () => {
    const currentIndex = avatarPool.indexOf(profile.avatarUrl);
    const nextIndex = (currentIndex + 1) % avatarPool.length;
    onUpdateProfile({
      ...profile,
      avatarUrl: avatarPool[nextIndex]
    });
  };

  return (
    <div className="px-6 pb-32 space-y-6" id="profile-container-view">
      
      {/* Upper Avatar & Identity Panel */}
      <div className="flex flex-col items-center py-4 bg-white rounded-3xl border border-gray-100/50 p-6 shadow-[0_15px_30px_rgba(12,61,94,0.02)]">
        <div className="relative group cursor-pointer" onClick={cycleAvatar}>
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Circular edit pen overlap badge */}
          <button 
            type="button"
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#2e90c9] hover:bg-[#0c3d5e] text-white flex items-center justify-center shadow-lg transition-colors border border-white"
            aria-label="Trocar Foto"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Name and Email values / Inline Edit Form */}
        <div className="mt-5 text-center w-full max-w-xs">
          {isEditing ? (
            <div className="space-y-3 pt-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nome do Usuário"
                className="w-full text-center bg-gray-50 border border-gray-200 text-sm font-bold text-[#0c3d5e] px-3 py-2 rounded-xl focus:ring-1 focus:ring-[#2e90c9] outline-none"
              />
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="exemplo@gmail.com"
                className="w-full text-center bg-gray-50 border border-gray-200 text-xs text-gray-500 px-3 py-2 rounded-xl focus:ring-1 focus:ring-[#2e90c9] outline-none"
              />
              <button
                onClick={handleSaveProfile}
                className="mx-auto flex items-center gap-1 px-4 py-2 bg-[#2e90c9] text-white text-xs font-bold rounded-lg hover:bg-[#0c3d5e] active:scale-95 transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Salvar</span>
              </button>
            </div>
          ) : (
            <div className="group relative">
              <h2 className="text-xl font-extrabold text-[#0c3d5e] tracking-tight font-sans">
                {profile.name}
              </h2>
              <p className="text-gray-400 text-xs font-medium mt-1">
                {profile.email}
              </p>
              
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200/80 text-[10px] font-bold text-[#0c3d5e] rounded-full transition-colors active:scale-95"
              >
                <Edit2 className="w-2.5 h-2.5" />
                <span>Editar Nome</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Settings list items Cards (Matches layout perfectly) */}
      <div className="bg-white rounded-3xl border border-gray-100/40 p-1.5 shadow-[0_15px_30px_rgba(12,61,94,0.03)] divide-y divide-gray-50">
        
        {/* Toggle Notification Option */}
        <div className="flex items-center justify-between p-4 flex-nowrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2e90c9] flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Notificações</span>
          </div>

          {/* iOS-like switch slider toggle indicator */}
          <button
            type="button"
            onClick={handleToggleNotifications}
            id="notifications-toggle-trigger"
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
              profile.notificationsEnabled ? 'bg-[#2e90c9]' : 'bg-gray-200'
            }`}
          >
            <div 
              className={`w-4.5 h-4.5 rounded-full bg-white absolute top-[3px] transition-transform duration-300 shadow-sm ${
                profile.notificationsEnabled ? 'translate-x-5.5' : 'translate-x-0.75'
              }`}
            />
          </button>
        </div>

        {/* Security Dummy item link */}
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/55 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Segurança</span>
          </div>
          <svg className="w-4 h-4 text-gray-400 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Preferences / Advanced Dummy layout */}
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/55 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Configurações</span>
          </div>
          <svg className="w-4 h-4 text-gray-400 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Logout button (which supports clearing caching and reloading state) */}
      <div className="space-y-4 pt-2">
        <button
          onClick={onResetData}
          id="profile-reset-all-data-btn"
          className="w-full h-14 bg-white text-gray-500 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 hover:text-gray-700 active:scale-98 transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4 animate-spin-hover" />
          <span>Restaurar Tarefas Originais</span>
        </button>

        <button
          onClick={() => {
            alert("Sessão encerrada com sucesso nesta simulação!");
          }}
          id="profile-logout-action-btn"
          className="w-full h-14 bg-[#031d2e] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0c3d5e] active:scale-98 transition-all duration-200 shadow-[0_12px_24px_rgba(12,61,94,0.08)]"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Sair</span>
        </button>
      </div>

    </div>
  );
}
