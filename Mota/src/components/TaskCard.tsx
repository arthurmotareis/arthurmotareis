import React, { useState } from 'react';
import { Calendar, Clock, Trash2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  key?: string;
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onDeleteTask }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper for priority badge colors
  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-50 text-red-600 border border-red-100';
      case 'Média':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'Baixa':
        return 'bg-teal-50 text-teal-600 border border-teal-100';
    }
  };

  return (
    <div 
      className={`group relative bg-white rounded-2xl p-5 border border-gray-100/40 shadow-[0_15px_30px_rgba(12,61,94,0.03)] hover:shadow-[0_20px_35px_rgba(12,61,94,0.06)] active:scale-[0.99] transition-all duration-300 ${
        task.completed ? 'opacity-80' : ''
      }`}
      id={`task-card-${task.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Task Details Content */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${getPriorityStyle(task.priority)}`}>
              {task.priority === 'Alta' ? 'Urgente' : task.priority}
            </span>
          </div>

          <h3 
            className={`text-lg font-bold text-[#0c3d5e] leading-snug tracking-tight font-sans truncate ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}
            id={`task-title-${task.id}`}
          >
            {task.title}
          </h3>

          <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs font-medium">
            <div className="flex items-center gap-1 text-[#2e90c9]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{task.displayDate || task.date}</span>
            </div>
            {task.time && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400/80" />
                <span>{task.time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tactile Checkbox Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(task.id);
          }}
          className="relative flex items-center justify-center w-8 h-8 rounded-full border-[1.5px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6fd1d7] shrink-0 active:scale-90"
          style={{
            borderColor: task.completed ? '#6fd1d7' : '#2e90c9',
            backgroundColor: task.completed ? '#6fd1d7' : 'transparent',
          }}
          aria-label={task.completed ? "Marcar tarefa como pendente" : "Marcar tarefa como concluída"}
          id={`task-checkbox-${task.id}`}
        >
          {task.completed && (
            <svg
              className="w-4.5 h-4.5 text-white stroke-[3.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>

      {/* Description Drawer for mental clarity details & Delete trigger */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-gray-50 text-sm text-gray-500 animate-fadeIn" id={`task-drawer-${task.id}`}>
          <p className="whitespace-pre-wrap leading-relaxed mb-4">{task.description || "Sem descrição adicional adicionada."}</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 italic">
              Criado em: {new Date(task.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100/70 transition-all duration-200 text-xs font-semibold active:scale-95"
              id={`task-delete-btn-${task.id}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Excluir</span>
            </button>
          </div>
        </div>
      )}

      {/* Visual expand toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 p-0.5 text-gray-300 hover:text-gray-500 transition-colors"
        aria-label="Expandir detalhes"
        id={`task-expand-chevron-${task.id}`}
      >
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
      </button>
    </div>
  );
}
