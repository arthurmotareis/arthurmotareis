import React from 'react';
import { CheckCircle, Plus, BarChart2, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'tarefas' | 'nova' | 'graficos' | 'perfil';
  setActiveTab: (tab: 'tarefas' | 'nova' | 'graficos' | 'perfil') => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'tarefas', label: 'Tarefas', icon: CheckCircle },
    { id: 'nova', label: 'Nova', icon: Plus },
    { id: 'graficos', label: 'Gráficos', icon: BarChart2 },
    { id: 'perfil', label: 'Perfil', icon: User }
  ] as const;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 flex justify-center">
      <nav 
        id="bottom-floating-navigation"
        className="w-full max-w-md bg-white border border-gray-100/40 rounded-[32px] shadow-[0_15px_30px_rgba(12,61,94,0.08)] px-3 py-2 flex items-center justify-between backdrop-blur-lg"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              id={`nav-btn-${tab.id}`}
              className={`relative flex items-center justify-center gap-2 px-4 py-3 rounded-full transition-all duration-300 select-none ${
                isActive 
                  ? 'bg-[#8cceff]/40 text-[#0c3d5e] font-semibold scale-105 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              
              <span className={`text-xs tracking-tight transition-all duration-300 font-sans ${
                isActive ? 'opacity-100 max-w-20' : 'opacity-0 max-w-0 pointer-events-none hidden sm:inline-block sm:opacity-50 sm:max-w-xs'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
