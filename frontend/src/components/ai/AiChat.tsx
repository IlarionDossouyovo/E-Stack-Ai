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

const agents = [
  { id: 'general', name: 'Assistant IA', icon: Bot },
  { id: 'pdg', name: ' PDG IA', icon: Sparkles },
  { id: 'accountant', name: 'Comptable IA', icon: Sparkles },
  { id: 'salesperson', name: 'Commercial IA', icon: Sparkles },
  { id: 'marketer', name: 'Marketing IA', icon: Sparkles },
  { id: 'hr', name: 'RH IA', icon: Sparkles },
  { id: 'analyst', name: 'Analyste IA', icon: Sparkles },
];

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('general');
  const [aiStatus, setAiStatus] = useState<{ connected: boolean; models: string[] } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const response = await axios.post('http://localhost:4000/api/v1/ai/agent/general', {
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
        <div className="space-y-2">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  selectedAgent === agent.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{agent.name}</span>
              </button>
            );
          })}
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
          <h3 className="font-semibold text-gray-900">Chat avec {agents.find(a => a.id === selectedAgent)?.name}</h3>
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
