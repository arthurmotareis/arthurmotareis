import { Task, UserProfile } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Revisão de Design',
    description: 'Revisar os novos wireframes e fluxo de navegação do aplicativo Serene.',
    date: '2026-06-15',
    displayDate: 'Hoje, 14:00',
    time: '14:00',
    priority: 'Alta',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Call com Stakeholders',
    description: 'Apresentação dos resultados da sprint anterior e alinhamento de entregas.',
    date: '2026-06-16',
    displayDate: 'Amanhã, 09:30',
    time: '09:30',
    priority: 'Média',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Planejamento Semanal',
    description: 'Definir as metas prioritárias para a semana e delegar tarefas no backlog.',
    date: '2026-06-22',
    displayDate: 'Seg, 10 de Out',
    time: '10:00',
    priority: 'Alta',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Refatoração do Módulo de Auth',
    description: 'Otimizar o fluxo de recuperação de senha e melhorar segurança dos cookies.',
    date: '2026-06-14',
    displayDate: 'Ontem, 16:30',
    time: '16:30',
    priority: 'Alta',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Organizar Espaço Gutter',
    description: 'Ajustar margens externas de visualizações tontas baseadas nos mocks do cliente.',
    date: '2026-06-13',
    displayDate: 'Mês passado',
    time: '11:00',
    priority: 'Baixa',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Escrever Documentação técnica',
    description: 'Adicionar documentação para API REST de controle de tarefas na nuvem.',
    date: '2026-06-12',
    displayDate: 'Mês passado',
    time: '17:00',
    priority: 'Baixa',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Configurar Webhooks no Discord',
    description: 'Ativar log automático de deploy para os canais internos da equipe.',
    date: '2026-06-11',
    displayDate: 'Mês passado',
    time: '12:00',
    priority: 'Média',
    completed: true,
    createdAt: new Date().toISOString(),
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Marcus Silva',
  email: 'marcus.silva@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', // Beautiful male profile pic
  notificationsEnabled: true
};

export const QUOTES = [
  {
    text: "Boa sorte é o que acontece quando a oportunidade encontra o planejamento.",
    author: "Thomas Edison"
  },
  {
    text: "Não encontre defeitos, encontre soluções. Qualquer um sabe queixar-se.",
    author: "Henry Ford"
  },
  {
    text: "Comece onde você está. Use o que você tem. Faça o que você pode.",
    author: "Arthur Ashe"
  }
];
