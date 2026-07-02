'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Search, Lock, ChevronDown, ChevronRight, Bot, Shield, Users, DollarSign, Package, Building, Truck, Database, Eye, ArrowLeft } from 'lucide-react';
import Logo from '@/components/common/Logo';

const allAgentsData = [
  {
    category: 'Direction Générale',
    icon: Sparkles,
    color: 'from-purple-600 to-indigo-600',
    agents: [
      { id: 'pdg', name: 'PDG IA', description: 'Vision stratégique et décisions de direction' },
      { id: 'dg', name: 'Directeur Général', description: 'Gestion opérationnelle de l\'entreprise' },
      { id: 'assistant_exec', name: 'Assistant Exécutif', description: 'Support aux dirigeants, agenda, rapports' },
    ]
  },
  {
    category: 'Finance',
    icon: DollarSign,
    color: 'from-green-600 to-emerald-600',
    agents: [
      { id: 'accountant', name: 'Comptable', description: 'Comptabilité, écritures, grand livre' },
      { id: 'controller', name: 'Contrôleur Gestion', description: 'Budgets, coûts, rentabilité' },
      { id: 'fiscalist', name: 'Fiscaliste', description: 'Impôts, déclarations, optimisation fiscale' },
      { id: 'financial_analyst', name: 'Analyste Financier', description: 'Analyses financières, investissements' },
      { id: 'treasurer', name: 'Trésorerie', description: 'Gestion des liquidités, placements' },
    ]
  },
  {
    category: 'Commerce',
    icon: Building,
    color: 'from-blue-600 to-cyan-600',
    agents: [
      { id: 'salesperson', name: 'Commercial', description: 'Ventes, closing, relations clients' },
      { id: 'negotiator', name: 'Négociateur', description: 'Négociation contrats et prix' },
      { id: 'quotes_manager', name: 'Gestionnaire Devis', description: 'Création et suivi des devis' },
      { id: 'orders_manager', name: 'Gestionnaire Commandes', description: 'Traitement et suivi commandes' },
    ]
  },
  {
    category: 'Marketing',
    icon: Sparkles,
    color: 'from-pink-600 to-rose-600',
    agents: [
      { id: 'marketer', name: 'Marketing', description: 'Stratégie marketing globale' },
      { id: 'community_manager', name: 'Community Manager', description: 'Gestion communautés et réseaux sociaux' },
      { id: 'content_creator', name: 'Créateur Contenu', description: 'Articles, vidéos, scripts' },
      { id: 'advertiser', name: 'Publicitaire', description: 'Campagnes publicitaires, ads' },
      { id: 'seo', name: 'SEO', description: 'Référencement naturel' },
      { id: 'mer', name: 'MER', description: 'Études de marché' },
      { id: 'copywriter', name: 'Rédacteur', description: 'Textes publicitaires, slogans' },
      { id: 'email_marketer', name: 'Email Marketing', description: 'Newsletters, automatisations' },
      { id: 'growth_hacker', name: 'Growth Hacker', description: 'Stratégies croissance rapide' },
    ]
  },
  {
    category: 'Service Client',
    icon: Users,
    color: 'from-orange-600 to-amber-600',
    agents: [
      { id: 'chatbot', name: 'Chatbot', description: 'Support 24/7' },
      { id: 'sav', name: 'SAV', description: 'Service après-vente' },
      { id: 'claims_manager', name: 'Réclamations', description: 'Gestion des plaintes' },
      { id: 'loyalty', name: 'Fidélisation', description: 'Programmes fidélité' },
    ]
  },
  {
    category: 'Ressources Humaines',
    icon: Users,
    color: 'from-teal-600 to-green-600',
    agents: [
      { id: 'hr', name: 'RH', description: 'Stratégie RH' },
      { id: 'recruiter', name: 'Recruteur', description: 'Recrutement, sourcing' },
      { id: 'trainer', name: 'Formateur', description: 'Formations, compétences' },
      { id: 'evaluator', name: 'Évaluateur', description: 'Évaluations performance' },
    ]
  },
  {
    category: 'Production',
    icon: Package,
    color: 'from-slate-600 to-zinc-600',
    agents: [
      { id: 'production_manager', name: 'Responsable Production', description: 'Planification production' },
      { id: 'maintenance', name: 'Maintenance', description: 'Entretien équipements' },
      { id: 'quality', name: 'Qualité', description: 'Standards qualité, ISO' },
    ]
  },
  {
    category: 'Juridique',
    icon: Shield,
    color: 'from-red-600 to-orange-600',
    agents: [
      { id: 'jurist', name: 'Juriste', description: 'Conseil juridique' },
      { id: 'contracts', name: 'Contrats', description: 'Rédaction contrats' },
      { id: 'compliance', name: 'Conformité', description: 'RGPD, réglementations' },
    ]
  },
  {
    category: 'Achats',
    icon: DollarSign,
    color: 'from-amber-600 to-yellow-600',
    agents: [
      { id: 'buyer', name: 'Acheteur', description: 'Achats, approvisionnement' },
      { id: 'supplier_negotiator', name: 'Négociateur Fournisseurs', description: 'Négociation fournisseurs' },
    ]
  },
  {
    category: 'Supply Chain',
    icon: Truck,
    color: 'from-cyan-600 to-blue-600',
    agents: [
      { id: 'warehouse_manager', name: 'Entrepôt', description: 'Gestion entrepôts' },
      { id: 'stock_manager', name: 'Stocks', description: 'Gestion stocks, inventaire' },
      { id: 'transport_manager', name: 'Transport', description: 'Logistique, livraisons' },
    ]
  },
  {
    category: 'Data Science',
    icon: Database,
    color: 'from-indigo-600 to-purple-600',
    agents: [
      { id: 'analyst', name: 'Analyste Data', description: 'Analyses données' },
      { id: 'data_scientist', name: 'Data Scientist', description: 'Machine learning, modèles' },
      { id: 'data_engineer', name: 'Data Engineer', description: 'Pipelines données' },
    ]
  },
  {
    category: 'Cybersécurité',
    icon: Eye,
    color: 'from-red-700 to-pink-600',
    agents: [
      { id: 'soc', name: 'SOC', description: 'Monitoring sécurité 24/7' },
      { id: 'intrusion_detection', name: 'Détection Intrusion', description: 'Analyse trafic réseau' },
      { id: 'vulnerability_analyst', name: 'Vulnérabilités', description: 'Analyse failles sécurité' },
    ]
  },
];

export default function AgentsPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(allAgentsData.map(c => c.category));
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is founder (in production, verify with backend)
    const checkAuth = () => {
      const userRole = localStorage.getItem('userRole') || localStorage.getItem('estack_role');
      // For demo, allow access if user is founder or admin
      if (userRole === 'founder' || userRole === 'admin' || userRole === 'owner') {
        setIsAuthorized(true);
      } else {
        // Check for demo mode token
        const demoToken = localStorage.getItem('estack_demo');
        if (demoToken === 'founder_access') {
          setIsAuthorized(true);
        }
      }
      setLoading(false);
    };
    
    // Simulate auth check
    setTimeout(checkAuth, 500);
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredAgents = allAgentsData.map(cat => ({
    ...cat,
    agents: cat.agents.filter(agent => 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.agents.length > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Vérification des accès...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center border border-white/20">
          <Lock className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Accès Réservé</h1>
          <p className="text-white/70 mb-6">
            Cette page est exclusivement accessible au fondateur de l'entreprise.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-white text-purple-900 rounded-lg font-medium hover:bg-white/90 transition"
          >
            Retour au Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="lg" variant="white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Centre des Agents IA</h1>
                <p className="text-white/60 text-sm">Panneau de contrôle - Accès Fondateur</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un agent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline">Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Total Agents</p>
            <p className="text-3xl font-bold text-white">{allAgentsData.reduce((sum, cat) => sum + cat.agents.length, 0)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Catégories</p>
            <p className="text-3xl font-bold text-white">{allAgentsData.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Modèles IA</p>
            <p className="text-3xl font-bold text-white">5+</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm">Statut</p>
            <p className="text-3xl font-bold text-green-400">Actif</p>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-4">
          {filteredAgents.map((categoryData) => {
            const Icon = categoryData.icon;
            const isExpanded = expandedCategories.includes(categoryData.category);
            
            return (
              <div 
                key={categoryData.category}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryData.category)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${categoryData.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-semibold text-white">{categoryData.category}</h2>
                      <p className="text-white/50 text-sm">{categoryData.agents.length} agent(s)</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-white/50" />
                  )}
                </button>

                {/* Agents List */}
                {isExpanded && (
                  <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryData.agents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        className={`p-4 rounded-lg border transition text-left ${
                          selectedAgent === agent.id
                            ? 'bg-purple-500/20 border-purple-500'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${categoryData.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-white font-medium truncate">{agent.name}</h3>
                            <p className="text-white/50 text-xs truncate">{agent.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Configuration Agent</h3>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm">ID Agent</label>
                <input
                  type="text"
                  value={selectedAgent}
                  readOnly
                  className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm">Modèle IA</label>
                <select className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
                  <option>llama3.2:latest</option>
                  <option>llama3.1:8b</option>
                  <option>qwen2.5-coder:7b</option>
                  <option>phi3:mini</option>
                </select>
              </div>
              <div>
                <label className="text-white/70 text-sm">Température (Créativité)</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-white/30 text-xs mt-1">
                  <span>Précis (0)</span>
                  <span>Créatif (1)</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
                >
                  Fermer
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
