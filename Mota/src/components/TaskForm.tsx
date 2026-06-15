import React, { useState } from 'react';
import { Calendar, Clock, Check, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function TaskForm({ onAddTask, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // High-fidelity date & time presets with input backups
  const [dateType, setDateType] = useState<'hoje' | 'amanha' | 'personalizado'>('hoje');
  const [customDate, setCustomDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [time, setTime] = useState('09:00');
  const [priority, setPriority] = useState<Task['priority']>('Média');
  const [error, setError] = useState('');

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Por favor, informe o título da tarefa.');
      return;
    }

    // Resolve date tag
    let finalDisplayDate = '';
    const formattedDate = dateType === 'personalizado' ? customDate : '';

    if (dateType === 'hoje') {
      finalDisplayDate = 'Hoje, ' + time;
    } else if (dateType === 'amanha') {
      finalDisplayDate = 'Amanhã, ' + time;
    } else {
      const [year, month, day] = customDate.split('-');
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
      const ptMonth = dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
      finalDisplayDate = ptMonth + ', ' + time;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      date: formattedDate || new Date().toISOString().split('T')[0],
      displayDate: finalDisplayDate,
      time,
      priority
    });

    // Reset Form Fields
    setTitle('');
    setDescription('');
    setDateType('hoje');
    setTime('09:00');
    setPriority('Média');
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-32 space-y-6" id="new-task-creation-form">
      {error && (
        <div id="form-error-feedback" className="bg-red-50 text-red-600 p-4 rounded-xl text-xs flex items-center gap-2 border border-red-100 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Task Title Field */}
      <div className="space-y-2">
        <label htmlFor="task-title-input" className="text-sm font-bold text-[#0c3d5e]">
          Título da Tarefa
        </label>
        <input
          type="text"
          id="task-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Reunião de Planejamento"
          className="w-full bg-[#f3f3f6] border-none text-[#1a1c1e] text-base font-medium px-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#2e90c9] placeholder:text-gray-400 transition-shadow"
          required
        />
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="task-desc-input" className="text-sm font-bold text-[#0c3d5e]">
          Descrição
        </label>
        <textarea
          id="task-desc-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Adicione detalhes sobre sua tarefa aqui..."
          rows={4}
          className="w-full bg-[#f3f3f6] border-none text-[#1a1c1e] text-base font-medium px-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#2e90c9] placeholder:text-gray-400 transition-shadow resize-none"
        />
      </div>

      {/* Side-by-side Date & Time Selection (Card Layout) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Date Selection Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_8px_20px_rgba(12,61,94,0.02)] flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2e90c9] tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>DATA</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex rounded-lg overflow-hidden bg-[#f3f3f6] p-0.5 text-[10px]">
              <button 
                type="button" 
                onClick={() => setDateType('hoje')} 
                className={`flex-1 py-1 text-center font-bold rounded-md ${dateType === 'hoje' ? 'bg-white text-[#0c3d5e] shadow-sm' : 'text-gray-500'}`}
              >
                Hoje
              </button>
              <button 
                type="button" 
                onClick={() => setDateType('amanha')} 
                className={`flex-1 py-1 text-center font-bold rounded-md ${dateType === 'amanha' ? 'bg-white text-[#0c3d5e] shadow-sm' : 'text-gray-500'}`}
              >
                Amanhã
              </button>
              <button 
                type="button" 
                onClick={() => setDateType('personalizado')} 
                className={`flex-1 py-1 text-center font-bold rounded-md ${dateType === 'personalizado' ? 'bg-white text-[#0c3d5e] shadow-sm' : 'text-gray-500'}`}
              >
                Outro
              </button>
            </div>

            {dateType === 'personalizado' ? (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full bg-transparent border-none text-xs font-bold text-[#0c3d5e] p-0 outline-none"
              />
            ) : (
              <p className="text-sm font-bold text-[#0c3d5e] pb-1">
                {dateType === 'hoje' ? 'Hoje' : 'Amanhã'}
              </p>
            )}
          </div>
        </div>

        {/* Time Selection Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_8px_20px_rgba(12,61,94,0.02)] flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2e90c9] tracking-wider uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>HORA</span>
          </div>

          <div className="space-y-1">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#f3f3f6]/40 border-none text-sm font-bold text-[#0c3d5e] py-1 px-2 rounded-lg outline-none focus:ring-1 focus:ring-[#2e90c9] cursor-pointer"
            />
            <p className="text-[10px] text-gray-400 font-medium pl-1">
              {Number(time.split(':')[0]) < 12 ? 'Manhã' : Number(time.split(':')[0]) < 18 ? 'Tarde' : 'Noite'}
            </p>
          </div>
        </div>
      </div>

      {/* Priority Selection */}
      <div className="bg-white border border-gray-100/60 rounded-2xl p-5 shadow-[0_8px_20px_rgba(12,61,94,0.02)] space-y-3">
        <label className="text-xs font-bold text-[#2e90c9] uppercase tracking-wider block">
          NÍVEL DE PRIORIDADE
        </label>
        <div className="grid grid-cols-3 gap-2" id="priority-choices-group">
          {(['Baixa', 'Média', 'Alta'] as const).map((pri) => {
            const isSelected = priority === pri;
            return (
              <button
                type="button"
                key={pri}
                onClick={() => setPriority(pri)}
                id={`priority-choice-btn-${pri.toLowerCase()}`}
                className={`py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 border ${
                  isSelected
                    ? 'bg-[#8cceff]/50 border-transparent text-[#002740] font-bold shadow-sm'
                    : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {pri}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 pt-4">
        <button
          type="submit"
          id="save-task-action-btn"
          className="w-full h-14 bg-[#031d2e] text-white rounded-full font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-[#0c3d5e] active:scale-98 transition-all duration-200 cursor-pointer shadow-[0_12px_24px_rgba(12,61,94,0.12)]"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>Salvar Tarefa</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          id="cancel-task-action-btn"
          className="w-full h-14 bg-white/70 text-gray-500 rounded-full font-bold text-sm tracking-tight flex items-center justify-center border border-gray-200 hover:bg-gray-50 active:scale-98 transition-all duration-200 cursor-pointer"
        >
          <span>Cancelar</span>
        </button>
      </div>
    </form>
  );
}
