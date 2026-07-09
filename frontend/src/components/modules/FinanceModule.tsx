'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  CreditCard, 
  PiggyBank,
  Building,
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Percent,
  Banknote
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

export default function FinanceModule() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Chiffre d\'Affaires', value: '€485,230', change: '+12.5%', trend: 'up', icon: <TrendingUp className="w-6 h-6 text-green-500" /> },
    { title: 'Dépenses', value: '€234,120', change: '-8.2%', trend: 'down', icon: <TrendingDown className="w-6 h-6 text-red-500" /> },
    { title: 'Bénéfice Net', value: '€251,110', change: '+18.7%', trend: 'up', icon: <PiggyBank className="w-6 h-6 text-blue-500" /> },
    { title: 'Trésorerie', value: '€892,450', change: '+5.3%', trend: 'up', icon: <Wallet className="w-6 h-6 text-purple-500" /> },
  ];

  const transactions: Transaction[] = [
    { id: '1', type: 'income', description: 'Facture #2024-001 - Enterprise Corp', amount: 45000, date: '2024-01-15', status: 'completed', category: 'Ventes' },
    { id: '2', type: 'expense', description: 'Salaires - Janvier 2024', amount: 125000, date: '2024-01-14', status: 'completed', category: 'RH' },
    { id: '3', type: 'income', description: 'Abonnement Premium - Tech Solutions', amount: 15000, date: '2024-01-13', status: 'completed', category: 'SaaS' },
    { id: '4', type: 'expense', description: 'Infrastructure Cloud - AWS', amount: 18500, date: '2024-01-12', status: 'completed', category: 'Tech' },
    { id: '5', type: 'income', description: 'Facture #2024-002 - StartupXYZ', amount: 8500, date: '2024-01-11', status: 'pending', category: 'Ventes' },
    { id: '6', type: 'expense', description: 'Marketing - Campagne Q1', amount: 22000, date: '2024-01-10', status: 'completed', category: 'Marketing' },
  ];

  const invoices = [
    { id: 'INV-001', client: 'Enterprise Corp', amount: 45000, date: '2024-01-15', status: 'paid' },
    { id: 'INV-002', client: 'Tech Solutions', amount: 15000, date: '2024-01-13', status: 'paid' },
    { id: 'INV-003', client: 'StartupXYZ', amount: 8500, date: '2024-01-11', status: 'pending' },
    { id: 'INV-004', client: 'Global Industries', amount: 32000, date: '2024-01-09', status: 'overdue' },
  ];

  const accounts = [
    { name: 'Compte Courant', balance: 452300, type: 'business' },
    { name: 'Compte Épargne', balance: 340150, type: 'savings' },
    { name: 'Compte Devises', balance: 100000, type: 'foreign' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">Gestion financière et comptable</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Nouvelle Facture
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Rapport
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
                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
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
          <Receipt className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Facturation</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Calculator className="w-5 h-5 text-green-600" />
          <span className="font-medium">Comptabilité</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Percent className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Fiscalité</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Banknote className="w-5 h-5 text-orange-600" />
          <span className="font-medium">Trésorerie</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transactions Récentes</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()} €
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                    transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {transaction.status === 'completed' ? 'Terminé' : transaction.status === 'pending' ? 'En attente' : 'Échoué'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Factures</h2>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{invoice.id}</p>
                  <p className="text-sm text-gray-500">{invoice.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{invoice.amount.toLocaleString()} €</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {invoice.status === 'paid' ? 'Payé' : invoice.status === 'pending' ? 'En attente' : 'En retard'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Comptes Bancaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((account, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">{account.name}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{account.balance.toLocaleString()} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
