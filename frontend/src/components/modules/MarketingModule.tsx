'use client';

import { useState } from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  Target, 
  Mail, 
  Share2, 
  PenTool,
  BarChart3,
  Globe,
  Users,
  DollarSign,
  Eye,
  MousePointer,
  MessageCircle,
  Calendar,
  Filter,
  Search,
  Plus,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'seo' | 'ads';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  reach: number;
  conversions: number;
  startDate: string;
  endDate?: string;
}

export default function MarketingModule() {
  const [activeTab, setActiveTab] = useState('campaigns');

  const stats = [
    { title: 'Campagnes Actives', value: '12', icon: <Megaphone className="w-6 h-6 text-blue-500" /> },
    { title: 'Reach Total', value: '2.4M', change: '+18%', icon: <Eye className="w-6 h-6 text-purple-500" /> },
    { title: 'Taux de Conversion', value: '4.8%', change: '+0.5%', icon: <Target className="w-6 h-6 text-green-500" /> },
    { title: 'Budget Consumé', value: '€45,200', change: '€85K budget', icon: <DollarSign className="w-6 h-6 text-orange-500" /> },
  ];

  const campaigns: Campaign[] = [
    { id: '1', name: 'Q1 Product Launch', type: 'ads', status: 'active', budget: 25000, spent: 18500, reach: 850000, conversions: 4200, startDate: '2024-01-01', endDate: '2024-03-31' },
    { id: '2', name: 'Newsletter - Janvier', type: 'email', status: 'completed', budget: 5000, spent: 4200, reach: 45000, conversions: 1850, startDate: '2024-01-15', endDate: '2024-01-31' },
    { id: '3', name: 'Social Media - Brand Awareness', type: 'social', status: 'active', budget: 15000, spent: 8200, reach: 620000, conversions: 1200, startDate: '2024-01-10' },
    { id: '4', name: 'SEO - Top Keywords', type: 'seo', status: 'active', budget: 8000, spent: 5500, reach: 180000, conversions: 890, startDate: '2024-01-05' },
    { id: '5', name: 'Retargeting - Cart Abandonment', type: 'ads', status: 'paused', budget: 10000, spent: 9800, reach: 125000, conversions: 650, startDate: '2024-01-20', endDate: '2024-02-20' },
    { id: '6', name: 'Influencer Partnership', type: 'social', status: 'draft', budget: 20000, spent: 0, reach: 0, conversions: 0, startDate: '2024-02-01' },
  ];

  const contentCalendar = [
    { day: 'Lun', content: 'Blog Post: Industry Trends', platform: 'Website', time: '10:00' },
    { day: 'Mar', content: 'Product Feature Teaser', platform: 'Instagram', time: '14:00' },
    { day: 'Mer', content: 'Email Newsletter', platform: 'Email', time: '09:00' },
    { day: 'Jeu', content: 'Case Study Release', platform: 'LinkedIn', time: '11:00' },
    { day: 'Ven', content: 'Customer Success Story', platform: 'Twitter', time: '15:00' },
  ];

  const socialAccounts = [
    { platform: 'Facebook', followers: '45.2K', growth: '+2.3%', engagement: '4.2%' },
    { platform: 'Instagram', followers: '32.8K', growth: '+5.1%', engagement: '6.8%' },
    { platform: 'LinkedIn', followers: '18.5K', growth: '+3.2%', engagement: '3.1%' },
    { platform: 'Twitter', followers: '12.1K', growth: '+1.8%', engagement: '2.4%' },
    { platform: 'TikTok', followers: '8.5K', growth: '+12.5%', engagement: '8.2%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-600 mt-1">Gestion des campagnes et contenus</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle Campagne
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                {stat.change && <p className="text-sm text-green-600 mt-1">{stat.change}</p>}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Megaphone className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Campagnes</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Mail className="w-5 h-5 text-green-600" />
          <span className="font-medium">Email</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Share2 className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Social Media</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <span className="font-medium">Analytics</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Campagnes</h2>
            <div className="flex gap-2">
              <button className="text-sm text-indigo-600 hover:text-indigo-700">Toutes</button>
              <button className="text-sm text-gray-500 hover:text-gray-700">Actives</button>
            </div>
          </div>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      campaign.status === 'active' ? 'bg-green-500' :
                      campaign.status === 'paused' ? 'bg-yellow-500' :
                      campaign.status === 'completed' ? 'bg-blue-500' :
                      'bg-gray-400'
                    }`} />
                    <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status === 'active' ? 'Active' : 
                     campaign.status === 'paused' ? 'En pause' : 
                     campaign.status === 'completed' ? 'Terminée' : 'Brouillon'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-medium">{campaign.budget.toLocaleString()}€</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dépensé</p>
                    <p className="font-medium">{campaign.spent.toLocaleString()}€</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Reach</p>
                    <p className="font-medium">{(campaign.reach / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversions</p>
                    <p className="font-medium">{campaign.conversions}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Réseaux Sociaux</h2>
          </div>
          <div className="space-y-3">
            {socialAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{account.platform}</p>
                  <p className="text-sm text-gray-500">{account.followers} abonnés</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">{account.growth}</p>
                  <p className="text-xs text-gray-500">{account.engagement} engagement</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Calendrier de Contenu</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Voir tout
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {contentCalendar.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-indigo-600 mb-2">{item.day}</p>
              <p className="text-sm text-gray-900 font-medium">{item.content}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Globe className="w-3 h-3" />
                {item.platform}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
