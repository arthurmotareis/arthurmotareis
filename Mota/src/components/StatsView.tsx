import React, { useMemo } from 'react';
import { Calendar, Zap, Award, BarChart2 } from 'lucide-react';
import { Task } from '../types';

interface StatsViewProps {
  tasks: Task[];
}

export default function StatsView({ tasks }: StatsViewProps) {
  // Compute real metrics dynamically from state
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Simulate streak calculation based on completed tasks
    const streakDays = Math.max(8, completed * 2 - 2); // logical placeholder backed by task list

    // Daily average placeholder
    const dailyAvg = total > 0 ? (completed / 4 + 4).toFixed(1) : '0.0';

    return { total, completed, pending, percentage, streakDays, dailyAvg };
  }, [tasks]);

  // SVG parameters for standard beautiful Pie/Donut Chart
  const svgRadius = 60;
  const svgCircumference = 2 * Math.PI * svgRadius;
  const strokeDashoffset = svgCircumference - (metrics.percentage / 100) * svgCircumference;

  // Static/calculated Weekly Productivity Data
  const weeklyData = [
    { label: 'Sem 1', completed: Math.max(2, Math.round(metrics.completed * 0.15)) },
    { label: 'Sem 2', completed: Math.max(3, Math.round(metrics.completed * 0.25)) },
    { label: 'Sem 3', completed: Math.max(5, Math.round(metrics.completed * 0.35)) },
    { label: 'Sem 4', completed: Math.max(4, Math.round(metrics.completed * 0.25)) }
  ];

  const maxWeeklyTasks = Math.max(...weeklyData.map(d => d.completed), 1);

  return (
    <div className="px-6 pb-32 space-y-6" id="statistics-screen-dashboard">
      
      {/* Overview Card (Circular Progress chart) */}
      <div 
        id="stats-overview-pie-card"
        className="bg-white rounded-[24px] p-6 border border-gray-100/40 shadow-[0_15px_30px_rgba(12,61,94,0.03)] flex flex-col items-center"
      >
        <h3 className="w-full text-left font-bold text-xl text-[#0c3d5e] mb-5 tracking-tight font-sans">
          Visão Geral
        </h3>

        {/* Circular Donut Diagram */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background empty circle */}
            <circle
              cx="96"
              cy="96"
              r={svgRadius}
              className="stroke-[#a2cbf2]/40"
              strokeWidth="28"
              fill="transparent"
            />
            {/* Foreground progress circle */}
            <circle
              cx="96"
              cy="96"
              r={svgRadius}
              className="stroke-[#0c3d5e]"
              strokeWidth="28"
              fill="transparent"
              strokeDasharray={svgCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>

          {/* Centered Percentage Text Bubble */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#0c3d5e] tracking-tighter">
              {metrics.percentage}%
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Concluído
            </span>
          </div>
        </div>

        {/* Chart Legends */}
        <div className="flex gap-6 justify-center items-center font-sans text-xs font-bold text-[#42474e]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0c3d5e]" />
            <span>Feitas ({metrics.completed})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#a2cbf2]" />
            <span>Pendentes ({metrics.pending})</span>
          </div>
        </div>
      </div>

      {/* Monthly productivity weekly progress bar chart mockup */}
      <div 
        id="monthly-productivity-chart-card"
        className="bg-white rounded-[24px] p-6 border border-gray-100/40 shadow-[0_15px_30px_rgba(12,61,94,0.03)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-[#0c3d5e] tracking-tight font-sans">
            Produtividade Mensal
          </h3>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2e90c9]">
            <Calendar className="w-4 h-4" />
            <span>Este Mês</span>
          </div>
        </div>

        {/* Vertical Bars Graph block */}
        <div className="flex items-end justify-between px-2 h-44 border-b border-gray-100 pb-2">
          {weeklyData.map((data, idx) => {
            // Compute percentage height to fill maximum 100%
            const barHeightPct = (data.completed / maxWeeklyTasks) * 85 + 15;
            
            return (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-2 group">
                <div className="relative w-7 bg-[#8cceff]/20 rounded-t-full flex items-end h-32 overflow-hidden hover:bg-[#8cceff]/35 transition-colors">
                  <div 
                    className="w-full bg-[#2e90c9] rounded-t-full transition-all duration-700 ease-out flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ height: `${barHeightPct}%` }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-90">
                      {data.completed}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#42474e]">
                  {data.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-side Dual micro-metric Cards */}
      <div className="grid grid-cols-2 gap-4" id="stats-dual-metrics-grid">
        {/* Longest streak Card */}
        <div className="bg-white rounded-[20px] p-5 border border-gray-100/40 shadow-[0_15px_30px_rgba(12,61,94,0.02)] flex flex-col justify-between space-y-4">
          <div className="text-[#2e90c9] bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            <Zap className="w-4.5 h-4.5 fill-[#2e90c9]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
              Maior Sequência
            </span>
            <span className="text-xl font-extrabold text-[#0c3d5e] tracking-tight">
              {metrics.streakDays} dias
            </span>
          </div>
        </div>

        {/* Daily average count card */}
        <div className="bg-white rounded-[20px] p-5 border border-gray-100/40 shadow-[0_15px_30px_rgba(12,61,94,0.02)] flex flex-col justify-between space-y-4">
          <div className="text-[#6fd1d7] bg-teal-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
            <BarChart2 className="w-4.5 h-4.5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
              Média Diária
            </span>
            <span className="text-xl font-extrabold text-[#0c3d5e] tracking-tight">
              {metrics.dailyAvg}
            </span>
          </div>
        </div>
      </div>

      {/* Focus Master (Mestre da Foco) High Impact Badge Callout */}
      <div 
        id="focus-master-achievement-ribbon"
        className="bg-[#0c3d5e] text-white rounded-[24px] p-6 flex items-center justify-between relative overflow-hidden shadow-[0_15px_32px_rgba(12,61,94,0.15)] group"
      >
        <div className="space-y-1 max-w-[70%] relative z-10">
          <h4 className="text-lg font-bold tracking-tight text-white font-sans">
            Mestre do Foco
          </h4>
          <p className="text-xs text-[#a2cbf2] leading-relaxed">
            Você completou 15% mais tarefas que a semana passada!
          </p>
        </div>

        <div className="relative z-10 shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <span className="text-4xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]" role="img" aria-label="Trophy">
            🏆
          </span>
        </div>

        {/* Decorative background radial light orb */}
        <div className="absolute right-0 bottom-0 top-0 w-32 bg-radial-gradient from-[#6fd1d7]/20 to-transparent pointer-events-none" />
      </div>

    </div>
  );
}
