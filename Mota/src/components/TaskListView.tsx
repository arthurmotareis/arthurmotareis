import React, { useState } from 'react';
import { Plus, BarChart2, Quote } from 'lucide-react';
import { Task } from '../types';
import TaskCard from './TaskCard';
import { QUOTES } from '../initialData';

interface TaskListViewProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onNavigateToTab: (tab: 'tarefas' | 'nova' | 'graficos' | 'perfil') => void;
}

export default function TaskListView({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onNavigateToTab
}: TaskListViewProps) {
  const [filter, setFilter] = useState<'Todos' | 'Completos' | 'Pendentes'>('Todos');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completos') return task.completed;
    if (filter === 'Pendentes') return !task.completed;
    return true; // "Todos"
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="pb-32 px-6 space-y-6" id="tasks-list-page-container">
      {/* Category Filter Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none" id="categories-tabs-rail">
        {(['Todos', 'Completos', 'Pendentes'] as const).map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              id={`filter-tab-${cat.toLowerCase()}`}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-[#0c3d5e] text-white shadow-md'
                  : 'bg-gray-100 text-[#42474e] hover:bg-gray-200/80'
              }`}
            >
              {cat === 'Completos' ? 'Completos' : cat === 'Pendentes' ? 'Pendentes' : 'Todos'}
            </button>
          );
        })}
      </div>

      {/* Task Cards List */}
      <div className="space-y-4" id="task-cards-list-wrapper">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200 text-gray-400">
            <p className="font-medium text-sm">Nenhuma tarefa encontrada neste filtro.</p>
            <button
              onClick={() => onNavigateToTab('nova')}
              className="mt-3 text-xs text-[#2e90c9] font-bold hover:underline"
            >
              Criar uma Tarefa agora
            </button>
          </div>
        )}
      </div>

      {/* Completes Cumulative Status Card */}
      <div 
        id="completed-tasks-statistics-card"
        className="bg-gray-50 rounded-2xl p-6 flex items-center gap-5 border border-gray-100/50"
      >
        <div className="w-14 h-14 rounded-full bg-[#8cceff]/40 flex items-center justify-center font-bold text-xl text-[#0c3d5e] shadow-inner shrink-0">
          {completedCount}
        </div>
        <div>
          <span className="text-[10px] font-bold text-[#2e90c9] uppercase tracking-widest block mb-0.5">Tarefas</span>
          <h4 className="text-xl font-bold text-[#0c3d5e] tracking-tight">Completas</h4>
          <p className="text-xs text-gray-400 mt-0.5">Você completou {completedCount} de {tasks.length} total de tarefas</p>
        </div>
      </div>

      {/* Inspirational Quotes Tonal Card */}
      <div 
        id="motivational-quote-card"
        className="relative bg-[#6fd1d7]/10 rounded-2xl p-6 border border-[#6fd1d7]/35 overflow-hidden group"
      >
        <div className="absolute right-3 top-3 text-[#6fd1d7]/30 select-none">
          <Quote className="w-16 h-16 stroke-[1.5] scale-x-[-1]" />
        </div>
        <blockquote className="space-y-2 relative z-10">
          <p className="text-sm font-medium italic text-[#0c3d5e] leading-relaxed">
            "{QUOTES[0].text}"
          </p>
          <cite className="block text-xs font-bold text-[#2e90c9] not-italic">
            — {QUOTES[0].author}
          </cite>
        </blockquote>
      </div>

      {/* Redirection / Quick Link to Statistics Card */}
      <button 
        onClick={() => onNavigateToTab('graficos')}
        id="statistics-teaser-redirect-card"
        className="w-full bg-[#031d2e] text-white rounded-2xl p-6 flex items-center justify-between text-left hover:bg-[#0c3d5e] transition-all duration-300 relative group overflow-hidden shadow-[0_12px_24px_rgba(12,61,94,0.12)] active:scale-[0.99]"
      >
        <div className="space-y-1 relative z-10 z-index">
          <h4 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            Estatísticas
          </h4>
          <p className="text-xs text-gray-300">
            Sua produtividade mensal e semanais
          </p>
        </div>
        <div className="relative z-10 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#6fd1d7] group-hover:scale-110 transition-transform duration-300">
          <BarChart2 className="w-6 h-6 stroke-[2.5]" />
        </div>
        
        {/* Abstract background vector accent */}
        <div className="absolute right-0 bottom-0 top-0 w-32 bg-gradient-to-l from-[#2e90c9]/10 to-transparent pointer-events-none" />
      </button>

      {/* Quick Flying Floating Action Button (FAB) (Matches standard design and image 2 detail) */}
      <button
        onClick={() => onNavigateToTab('nova')}
        id="floating-create-task-fab"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#6fd1d7] rounded-full flex items-center justify-center text-[#002740] shadow-[0_8px_25px_rgba(111,209,215,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 z-50 hover:bg-[#2e90c9] hover:text-white"
        aria-label="Criar nova tarefa"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
}
