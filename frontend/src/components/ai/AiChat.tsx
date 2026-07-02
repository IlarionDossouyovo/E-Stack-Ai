'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
}

const agentsByCategory = {
  'Direction Générale': [
    { id: 'pdg', name: 'PDG IA', icon: Sparkles },
    { id: 'dg', name: 'Directeur Général', icon: Sparkles },
    { id: 'assistant_exec', name: 'Assistant Exécutif', icon: Sparkles },
  ],
  'Finance': [
    { id: 'accountant', name: 'Comptable', icon: Sparkles },
    { id: 'controller', name: 'Contrôleur Gestion', icon: Sparkles },
    { id: 'fiscalist', name: 'Fiscaliste', icon: Sparkles },
    { id: 'financial_analyst', name: 'Analyste Financier', icon: Sparkles },
    { id: 'treasurer', name: 'Trésorerie', icon: Sparkles },
  ],
  'Commerce': [
    { id: 'salesperson', name: 'Commercial', icon: Sparkles },
    { id: 'negotiator', name: 'Négociateur', icon: Sparkles },
    { id: 'quotes_manager', name: 'Devis', icon: Sparkles },
    { id: 'orders_manager', name: 'Commandes', icon: Sparkles },
  ],
  'Marketing': [
    { id: 'marketer', name: 'Marketing', icon: Sparkles },
    { id: 'community_manager', name: 'Community Manager', icon: Sparkles },
    { id: 'content_creator', name: 'Créateur Contenu', icon: Sparkles },
    { id: 'advertiser', name: 'Publicitaire', icon: Sparkles },
    { id: 'seo', name: 'SEO', icon: Sparkles },
    { id: 'mer', name: 'MER', icon: Sparkles },
    { id: 'copywriter', name: 'Rédacteur', icon: Sparkles },
    { id: 'email_marketer', name: 'Email Marketing', icon: Sparkles },
    { id: 'growth_hacker', name: 'Growth Hacker', icon: Sparkles },
  ],
  'Service Client': [
    { id: 'chatbot', name: 'Chatbot', icon: Sparkles },
    { id: 'sav', name: 'SAV', icon: Sparkles },
    { id: 'claims_manager', name: 'Réclamations', icon: Sparkles },
    { id: 'loyalty', name: 'Fidélisation', icon: Sparkles },
  ],
  'Ressources Humaines': [
    { id: 'hr', name: 'RH', icon: Sparkles },
    { id: 'recruiter', name: 'Recruteur', icon: Sparkles },
    { id: 'trainer', name: 'Formateur', icon: Sparkles },
    { id: 'evaluator', name: 'Évaluateur', icon: Sparkles },
  ],
  'Production': [
    { id: 'production_manager', name: 'Responsable Production', icon: Sparkles },
    { id: 'maintenance', name: 'Maintenance', icon: Sparkles },
    { id: 'quality', name: 'Qualité', icon: Sparkles },
  ],
  'Juridique': [
    { id: 'jurist', name: 'Juriste', icon: Sparkles },
    { id: 'contracts', name: 'Contrats', icon: Sparkles },
    { id: 'compliance', name: 'Conformité', icon: Sparkles },
  ],
  'Achats': [
    { id: 'buyer', name: 'Acheteur', icon: Sparkles },
    { id: 'supplier_negotiator', name: 'Négociateur Fournisseurs', icon: Sparkles },
  ],
  'Supply Chain': [
    { id: 'warehouse_manager', name: 'Entrepôt', icon: Sparkles },
    { id: 'stock_manager', name: 'Stocks', icon: Sparkles },
    { id: 'transport_manager', name: 'Transport', icon: Sparkles },
  ],
  'Data Science': [
    { id: 'analyst', name: 'Analyste Data', icon: Sparkles },
    { id: 'data_scientist', name: 'Data Scientist', icon: Sparkles },
    { id: 'data_engineer', name: 'Data Engineer', icon: Sparkles },
  ],
  'Cybersécurité': [
    { id: 'soc', name: 'SOC', icon: Sparkles },
    { id: 'intrusion_detection', name: 'Détection Intrusion', icon: Sparkles },
    { id: 'vulnerability_analyst', name: 'Vulnérabilités', icon: Sparkles },
  ],
  'Général': [
    { id: 'general', name: 'Assistant IA', icon: Bot },
  ],
};

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('pdg');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(Object.keys(agentsByCategory));
  const [aiStatus, setAiStatus] = useState<{ connected: boolean; models: string[] } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Flatten all agents for reference
  const allAgents = Object.values(agentsByCategory).flat();

  useEffect(() => {
    fetchAiStatus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchAiStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/ai/status');
      setAiStatus(response.data.ollama);
    } catch (error) {
      console.error('Failed to fetch AI status:', error);
      setAiStatus({ connected: false, models: [] });
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:4000/api/v1/ai/agent/${selectedAgent}`, {
        message: input,
        context: {},
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        agent: selectedAgent,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Désolé, je n\'ai pas pu traiter votre demande. Veuillez vérifier la connexion avec Ollama.',
        agent: selectedAgent,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
      {/* Agents Sidebar */}
      <div className="w-64 bg-white rounded-xl border border-gray-200 p-4 flex-shrink-0">
        <h3 className="font-semibold text-gray-900 mb-4">Agents IA</h3>
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-350px)]">
          {Object.entries(agentsByCategory).map(([category, agents]) => (
            <div key={category}>
              <button
                onClick={() => setExpandedCategories(prev => 
                  prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                )}
                className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold text-gray-500 uppercase hover:text-gray-700"
              >
                {category}
                <span>{expandedCategories.includes(category) ? '−' : '+'}</span>
              </button>
              {expandedCategories.includes(category) && (
                <div className="mt-1 space-y-1">
                  {agents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                          selectedAgent === agent.id
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{agent.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Status */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${aiStatus?.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">Ollama</span>
          </div>
          {aiStatus?.models && aiStatus.models.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-500">Modèles disponibles:</p>
              {aiStatus.models.slice(0, 3).map((model) => (
                <div key={model} className="text-xs bg-gray-100 px-2 py-1 rounded truncate">
                  {model}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Chat avec {allAgents.find(a => a.id === selectedAgent)?.name}</h3>
          <p className="text-sm text-gray-500">Assistant IA-powered pour votre entreprise</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="w-16 h-16 text-indigo-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Comment puis-je vous aider?</h3>
              <p className="text-gray-500 max-w-md">
                Posez-moi des questions sur votre entreprise, demandez des analyses, ou get des recommandations stratégiques.
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.agent && message.role === 'assistant' && (
                  <p className="text-xs text-indigo-600 mb-1">{message.agent}</p>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
