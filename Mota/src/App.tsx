import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import TaskListView from './components/TaskListView';
import TaskForm from './components/TaskForm';
import StatsView from './components/StatsView';
import ProfileView from './components/ProfileView';

import { INITIAL_TASKS, INITIAL_PROFILE } from './initialData';
import { Task, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tarefas' | 'nova' | 'graficos' | 'perfil'>('tarefas');

  // Load state from localStorage on first render
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('serene_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Falha ao processar tarefas guardadas', e);
      }
    }
    return INITIAL_TASKS;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('serene_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Falha ao processar perfil guardado', e);
      }
    }
    return INITIAL_PROFILE;
  });

  // Persist state when mutated
  useEffect(() => {
    localStorage.setItem('serene_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('serene_profile', JSON.stringify(profile));
  }, [profile]);

  // Handlers for changing and updating task items
  const onToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const onDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const freshTask: Task = {
      ...newTask,
      id: Math.random().toString(36).substring(2, 11),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [freshTask, ...prev]);
    setActiveTab('tarefas');
  };

  const onUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  const onResetData = () => {
    if (window.confirm('Tem certeza de que deseja restaurar as tarefas padrão da simulação?')) {
      setTasks(INITIAL_TASKS);
      setProfile(INITIAL_PROFILE);
      localStorage.removeItem('serene_tasks');
      localStorage.removeItem('serene_profile');
      setActiveTab('tarefas');
    }
  };

  // Determine current page header configuration
  const getHeaderDetails = () => {
    switch (activeTab) {
      case 'tarefas':
        return { title: 'Minhas Tarefas', showBack: false };
      case 'nova':
        return { title: 'Nova Tarefa', showBack: true };
      case 'graficos':
        return { title: 'Estatísticas', showBack: true };
      case 'perfil':
        return { title: 'Meu Perfil', showBack: true };
    }
  };

  const headerMeta = getHeaderDetails();

  return (
    <div className="min-h-screen bg-[#f9f9fc] text-[#1a1c1e] font-sans antialiased flex flex-col selection:bg-[#8cceff]/40 relative">
      
      {/* Dynamic Navigation Header */}
      <Header
        title={headerMeta.title}
        showBackButton={headerMeta.showBack}
        onBackClick={() => setActiveTab('tarefas')}
        onMenuClick={() => alert('Menu lateral de produtividade acionado!')}
        avatarUrl={profile.avatarUrl}
        onProfileClick={() => setActiveTab('perfil')}
      />

      {/* Main Container Sandbox Frame with width limits */}
      <main className="flex-1 w-full max-w-lg mx-auto relative focus:outline-none">
        
        {/* Render pages conditionally based on activeTab */}
        <div className="animate-fadeIn">
          {activeTab === 'tarefas' && (
            <TaskListView
              tasks={tasks}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === 'nova' && (
            <TaskForm
              onAddTask={onAddTask}
              onCancel={() => setActiveTab('tarefas')}
            />
          )}

          {activeTab === 'graficos' && (
            <StatsView 
              tasks={tasks} 
            />
          )}

          {activeTab === 'perfil' && (
            <ProfileView
              profile={profile}
              onUpdateProfile={onUpdateProfile}
              onResetData={onResetData}
            />
          )}
        </div>
      </main>

      {/* Persistent floating capsule navigation bar */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </div>
  );
}
