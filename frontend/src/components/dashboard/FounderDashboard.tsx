'use client';

import { useState } from 'react';
import { 
  Globe, 
  Server, 
  Cpu, 
  Activity, 
  Bot, 
  CreditCard, 
  Shield, 
  Devops,
  Workflow,
  FileText,
  Store,
  Key,
  Gauge,
  Database,
  Cloud,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  Eye,
  Lock,
  Code2,
  Container,
  Box,
  Network,
  Terminal,
  Settings,
  RefreshCw
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

interface ServerStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
  cpu: number;
  memory: number;
  uptime: string;
}

interface AgentStatus {
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error';
  tasks: number;
}

export default function FounderDashboard() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const stats: StatCard[] = [
    { 
      title: 'Entreprises Clientes', 
      value: '1,247', 
      change: '+12%', 
      trend: 'up',
      icon: <Globe className="w-6 h-6 text-blue-500" />
    },
    { 
      title: 'Serveurs Actifs', 
      value: '48/52', 
      change: '96% uptime', 
      trend: 'up',
      icon: <Server className="w-6 h-6 text-green-500" />
    },
    { 
      title: 'Requêtes API', 
      value: '2.4M', 
      change: '+8%', 
      trend: 'up',
      icon: <Activity className="w-6 h-6 text-purple-500" />
    },
    { 
      title: 'Revenus MRR', 
      value: '$124,500', 
      change: '+15%', 
      trend: 'up',
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />
    },
    { 
      title: 'Agents IA Actifs', 
      value: '42/45', 
      change: '93%', 
      trend: 'up',
      icon: <Bot className="w-6 h-6 text-orange-500" />
    },
    { 
      title: 'Alertes Sécurité', 
      value: '3', 
      change: 'Critiques: 0', 
      trend: 'neutral',
      icon: <Shield className="w-6 h-6 text-red-500" />
    },
  ];

  const servers: ServerStatus[] = [
    { name: 'API Primary', status: 'online', cpu: 45, memory: 62, uptime: '99.9%' },
    { name: 'API Secondary', status: 'online', cpu: 38, memory: 55, uptime: '99.8%' },
    { name: 'Database Primary', status: 'online', cpu: 72, memory: 78, uptime: '99.9%' },
    { name: 'Database Replica', status: 'warning', cpu: 85, memory: 89, uptime: '98.5%' },
    { name: 'Ollama GPU-1', status: 'online', cpu: 34, memory: 45, uptime: '99.9%' },
    { name: 'Ollama GPU-2', status: 'online', cpu: 28, memory: 52, uptime: '99.9%' },
    { name: 'Redis Cache', status: 'online', cpu: 15, memory: 34, uptime: '100%' },
    { name: 'Message Queue', status: 'online', cpu: 22, memory: 28, uptime: '99.9%' },
  ];

  const agents: AgentStatus[] = [
    { name: 'CEO AI', role: 'Direction', status: 'active', tasks: 12 },
    { name: 'CFO AI', role: 'Finance', status: 'active', tasks: 8 },
    { name: 'CTO AI', role: 'Technique', status: 'active', tasks: 5 },
    { name: 'Sales AI', role: 'Commerce', status: 'active', tasks: 15 },
    { name: 'Marketing AI', role: 'Marketing', status: 'idle', tasks: 0 },
    { name: 'Support AI', role: 'Support', status: 'active', tasks: 23 },
    { name: 'Security AI', role: 'Sécurité', status: 'active', tasks: 3 },
    { name: 'HR AI', role: 'RH', status: 'idle', tasks: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'active':
        return 'text-green-500';
      case 'warning':
      case 'idle':
        return 'text-yellow-500';
      case 'offline':
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
      case 'idle':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'offline':
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Founder Control Center</h1>
          <p className="text-gray-600 mt-1">Centre de commandement ELECTRON AI OS</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                {stat.change && (
                  <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </p>
                )}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">État des Serveurs</h2>
          </div>
          <div className="space-y-3">
            {servers.map((server, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(server.status)}
                  <div>
                    <p className="font-medium text-gray-900">{server.name}</p>
                    <p className="text-xs text-gray-500">Uptime: {server.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Cpu className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{server.cpu}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Database className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{server.memory}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agents Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">État des Agents IA</h2>
          </div>
          <div className="space-y-3">
            {agents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(agent.status)}
                  <div>
                    <p className="font-medium text-gray-900">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.role}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {agent.tasks > 0 ? `${agent.tasks} tâches` : 'Inactif'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Ressources Système</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">CPU Global</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Mémoire</span>
                <span className="font-medium">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">GPU (Ollama)</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Stockage</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Actions Rapides</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Container className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium">Docker</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Cloud className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium">Cloud</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Key className="w-8 h-8 text-orange-600" />
              <span className="text-sm font-medium">API Keys</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Workflow className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium">Workflows</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Devops className="w-8 h-8 text-red-600" />
              <span className="text-sm font-medium">DevOps</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-8 h-8 text-gray-600" />
              <span className="text-sm font-medium">Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Journal d'Activité Global</h2>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">Sauvegarde automatique terminée - Base de données</span>
            <span className="text-gray-400 ml-auto">Il y a 5 min</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
            <Bot className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">CEO AI a généré un rapport stratégique</span>
            <span className="text-gray-400 ml-auto">Il y a 15 min</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-gray-700">Alerte: Database Replica CPU {'>'} 85%</span>
            <span className="text-gray-400 ml-auto">Il y a 30 min</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">Nouveau client connecté: Enterprise Corp</span>
            <span className="text-gray-400 ml-auto">Il y a 1h</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-gray-700">Mise à jour modèle Ollama: llama3.2</span>
            <span className="text-gray-400 ml-auto">Il y a 2h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
