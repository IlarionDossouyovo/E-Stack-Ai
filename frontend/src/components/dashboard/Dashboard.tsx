'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Bot
} from 'lucide-react';
import api from '@/lib/api';

interface Stats {
  totalProducts: number;
  totalInvoices: number;
  totalEmployees: number;
  totalRevenue: number;
  totalCompanies: number;
  totalDeals: number;
  pipelineValue: number;
}

interface AiStatus {
  status: string;
  ollama: {
    connected: boolean;
    models: string[];
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalInvoices: 0,
    totalEmployees: 0,
    totalRevenue: 0,
    totalCompanies: 0,
    totalDeals: 0,
    pipelineValue: 0,
  });
  const [aiStatus, setAiStatus] = useState<AiStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [erpRes, crmRes, aiRes] = await Promise.all([
          api.get('/erp/dashboard'),
          api.get('/crm/dashboard'),
          api.get('/ai/status'),
        ]);
        setStats({
          ...erpRes.data,
          ...crmRes.data,
        });
        setAiStatus(aiRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Use demo data when API is not available
        setStats({
          totalProducts: 156,
          totalInvoices: 89,
          totalEmployees: 24,
          totalRevenue: 125000,
          totalCompanies: 45,
          totalDeals: 12,
          pipelineValue: 85000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { 
      title: 'Revenu Total', 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      change: '+12.5%', 
      positive: true,
      icon: DollarSign 
    },
    { 
      title: 'Produits', 
      value: stats.totalProducts.toString(), 
      change: '+8.2%', 
      positive: true,
      icon: Package 
    },
    { 
      title: 'Employés', 
      value: stats.totalEmployees.toString(), 
      change: '+2.1%', 
      positive: true,
      icon: Users 
    },
    { 
      title: 'Devis', 
      value: stats.totalInvoices.toString(), 
      change: '-3.2%', 
      positive: false,
      icon: ShoppingCart 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Bienvenue sur E-Stack AI</h2>
        <p className="opacity-90">Votre système de gestion d'entreprise intelligent powered by IA</p>
      </div>

      {/* AI Status */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${aiStatus?.ollama?.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium">AI Status</span>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-600">
              {aiStatus?.ollama?.connected ? 'Ollama Connecté' : 'Ollama Non Connecté'}
            </span>
          </div>
        </div>
        {aiStatus?.ollama?.models && aiStatus.ollama.models.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {aiStatus.ollama.models.slice(0, 5).map((model: string) => (
              <span key={model} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                {model}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Pipeline CRM</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">${stats.pipelineValue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{stats.totalDeals} deals en cours</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Entreprises</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
          <p className="text-sm text-gray-500 mt-1">Clients actifs</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-medium">Croissance</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">+15.3%</p>
          <p className="text-sm text-gray-500 mt-1">Ce mois-ci</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-lg mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors text-center">
            <Package className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-indigo-900">Nouveau Produit</span>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-purple-900">Nouvelle Facture</span>
          </button>
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-blue-900">Nouveau Client</span>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
            <Bot className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-900">Assistant IA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
