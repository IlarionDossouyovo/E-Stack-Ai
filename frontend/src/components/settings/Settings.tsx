'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Database, Bot, Key, Bell, Shield, Globe } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Général', icon: SettingsIcon },
    { id: 'database', name: 'Base de données', icon: Database },
    { id: 'ai', name: 'IA & Ollama', icon: Bot },
    { id: 'api', name: 'API & Clés', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'integrations', name: 'Intégrations', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
        <p className="text-gray-500">Configurez votre instance E-Stack AI</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-6">Paramètres Généraux</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input type="text" defaultValue="E-Stack AI" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuseau horaire</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>UTC</option>
                    <option>Europe/Paris</option>
                    <option>America/New_York</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Sauvegarder
                </button>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-6">Configuration Base de données</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hôte PostgreSQL</label>
                  <input type="text" defaultValue="localhost" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
                  <input type="number" defaultValue="5432" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la base</label>
                  <input type="text" defaultValue="estack_ai" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilisateur</label>
                  <input type="text" defaultValue="postgres" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                  <input type="password" defaultValue="postgres" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Sauvegarder
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-6">Configuration IA & Ollama</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Ollama</label>
                  <input type="text" defaultValue="http://localhost:11434" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modèle par défaut</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>llama3.2:latest</option>
                    <option>llama3.1:8b</option>
                    <option>qwen2.5-coder:7b</option>
                    <option>phi3:mini</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Température</label>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
                  <p className="text-sm text-gray-500">0.7 - Créatif mais cohérent</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Tester la connexion
                </button>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-6">API & Clés d'accès</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">JWT Secret</label>
                  <input type="password" defaultValue="your-super-secret-jwt-key" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key OpenAI (optionnel)</label>
                  <input type="password" placeholder="sk-..." className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Sauvegarder
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'notifications' || activeTab === 'security' || activeTab === 'integrations') && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-6">Module {tabs.find(t => t.id === activeTab)?.name}</h3>
              <p className="text-gray-500">Ce module est en cours de développement</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
