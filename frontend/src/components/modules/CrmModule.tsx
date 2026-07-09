'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Search, Edit, Trash2, Eye, Phone, Mail, Building, DollarSign, Ticket, Megaphone, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  phone?: string;
  email?: string;
  status?: string;
  employees?: number;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId?: string;
  position?: string;
  status: string;
}

interface Deal {
  id: string;
  title: string;
  companyId?: string;
  contactId?: string;
  value?: number;
  stage?: string;
  expectedCloseDate?: string;
  status?: string;
}

interface Ticket {
  id: string;
  subject: string;
  description?: string;
  priority?: string;
  status?: string;
  category?: string;
}

interface Campaign {
  id: string;
  name: string;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
}

export default function CrmModule() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<any>({});

  const tabs = [
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'companies', name: 'Entreprises', icon: Building },
    { id: 'deals', name: 'Opportunités', icon: DollarSign },
    { id: 'tickets', name: 'Tickets', icon: Ticket },
    { id: 'campaigns', name: 'Campagnes', icon: Megaphone },
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'contacts':
          const contactsRes = await axios.get(`${API_URL}/crm/contacts?page=${currentPage}&limit=10`);
          setContacts(contactsRes.data.data || contactsRes.data);
          setTotalItems(contactsRes.data.total || contactsRes.data.length || 0);
          break;
        case 'companies':
          const companiesRes = await axios.get(`${API_URL}/crm/companies?page=${currentPage}&limit=10`);
          setCompanies(companiesRes.data.data || companiesRes.data);
          setTotalItems(companiesRes.data.total || companiesRes.data.length || 0);
          break;
        case 'deals':
          const dealsRes = await axios.get(`${API_URL}/crm/deals?page=${currentPage}&limit=10`);
          setDeals(dealsRes.data.data || dealsRes.data);
          setTotalItems(dealsRes.data.total || dealsRes.data.length || 0);
          break;
        case 'tickets':
          const ticketsRes = await axios.get(`${API_URL}/crm/tickets?page=${currentPage}&limit=10`);
          setTickets(ticketsRes.data.data || ticketsRes.data);
          setTotalItems(ticketsRes.data.total || ticketsRes.data.length || 0);
          break;
        case 'campaigns':
          const campaignsRes = await axios.get(`${API_URL}/crm/campaigns?page=${currentPage}&limit=10`);
          setCampaigns(campaignsRes.data.data || campaignsRes.data);
          setTotalItems(campaignsRes.data.total || campaignsRes.data.length || 0);
          break;
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    switch (activeTab) {
      case 'contacts':
        setContacts([
          { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+1 234 567 890', status: 'customer' },
          { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phone: '+1 234 567 891', status: 'lead' },
          { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', phone: '+1 234 567 892', status: 'prospect' },
        ]);
        setTotalItems(3);
        break;
      case 'companies':
        setCompanies([
          { id: '1', name: 'Acme Corp', industry: 'Technology', website: 'https://acme.com', email: 'contact@acme.com', employees: 150, status: 'active' },
          { id: '2', name: 'Tech Inc', industry: 'Software', website: 'https://techinc.io', email: 'info@techinc.io', employees: 75, status: 'active' },
          { id: '3', name: 'Global Ltd', industry: 'Manufacturing', website: 'https://global.com', email: 'contact@global.com', employees: 500, status: 'active' },
        ]);
        setTotalItems(3);
        break;
      case 'deals':
        setDeals([
          { id: '1', title: 'Projet A', value: 50000, stage: 'proposal', status: 'active' },
          { id: '2', title: 'Contrat B', value: 25000, stage: 'negotiation', status: 'active' },
          { id: '3', title: 'Partenariat C', value: 100000, stage: 'closed_won', status: 'won' },
        ]);
        setTotalItems(3);
        break;
      case 'tickets':
        setTickets([
          { id: '1', subject: 'Problème de connexion', priority: 'high', status: 'open', category: 'Technical' },
          { id: '2', subject: 'Demande de fonctionnalité', priority: 'low', status: 'pending', category: 'Feature' },
          { id: '3', subject: 'Bug sur le dashboard', priority: 'medium', status: 'closed', category: 'Bug' },
        ]);
        setTotalItems(3);
        break;
      case 'campaigns':
        setCampaigns([
          { id: '1', name: 'Summer Sale 2024', type: 'Email', status: 'active', budget: 5000 },
          { id: '2', name: 'Product Launch', type: 'Social Media', status: 'planned', budget: 15000 },
        ]);
        setTotalItems(2);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = `${API_URL}/crm/${activeTab}`;
      if (editingItem?.id) {
        await axios.patch(`${endpoint}/${editingItem.id}`, formData);
      } else {
        await axios.post(endpoint, formData);
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/crm/${activeTab}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item?: any) => {
    setEditingItem(item || null);
    setFormData(item || {});
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      customer: 'bg-green-100 text-green-800',
      lead: 'bg-blue-100 text-blue-800',
      prospect: 'bg-yellow-100 text-yellow-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
      open: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-gray-100 text-gray-800',
      planned: 'bg-purple-100 text-purple-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = () => {
    let data: any[] = [];
    switch (activeTab) {
      case 'contacts': data = contacts; break;
      case 'companies': data = companies; break;
      case 'deals': data = deals; break;
      case 'tickets': data = tickets; break;
      case 'campaigns': data = campaigns; break;
    }
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const renderTable = () => {
    const data = filteredData();
    
    if (loading) {
      return (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      );
    }

    switch (activeTab) {
      case 'contacts':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poste</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((contact: any) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">{contact.firstName?.[0]}{contact.lastName?.[0]}</span>
                        </div>
                        <span className="font-medium text-gray-900">{contact.firstName} {contact.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.position || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(contact)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(contact.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'companies':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industrie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Site web</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employés</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((company: any) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.industry || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{company.website || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.email || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.employees || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(company)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(company.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'deals':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valeur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phase</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date prévue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((deal: any) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{deal.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(deal.value || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deal.stage || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deal.expectedCloseDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(deal.status)}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(deal)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(deal.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'tickets':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sujet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priorité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ticket.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.category || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(ticket)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(ticket.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'campaigns':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((campaign: any) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.type || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(campaign.budget || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.startDate ? `${campaign.startDate} - ${campaign.endDate || '...'}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(campaign)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(campaign.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  const getFormFields = () => {
    switch (activeTab) {
      case 'contacts':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input type="text" value={formData.firstName || ''} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input type="text" value={formData.lastName || ''} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
              <input type="text" value={formData.position || ''} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </>
        );
      case 'companies':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industrie</label>
              <input type="text" value={formData.industry || ''} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
              <input type="url" value={formData.website || ''} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </>
        );
      case 'deals':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
              <input type="number" value={formData.value || ''} onChange={e => setFormData({...formData, value: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
              <select value={formData.stage || ''} onChange={e => setFormData({...formData, stage: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">Sélectionner...</option>
                <option value="lead">Lead</option>
                <option value="qualified">Qualifié</option>
                <option value="proposal">Proposition</option>
                <option value="negotiation">Négociation</option>
                <option value="closed_won">Gagné</option>
                <option value="closed_lost">Perdu</option>
              </select>
            </div>
          </>
        );
      case 'tickets':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
              <input type="text" value={formData.subject || ''} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">Sélectionner...</option>
                <option value="Technical">Technique</option>
                <option value="Feature">Fonctionnalité</option>
                <option value="Bug">Bug</option>
                <option value="Support">Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
              <select value={formData.priority || ''} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">Sélectionner...</option>
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>
          </>
        );
      case 'campaigns':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la campagne</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">Sélectionner...</option>
                <option value="Email">Email</option>
                <option value="Social Media">Réseaux sociaux</option>
                <option value="Ads">Publicité</option>
                <option value="Event">Événement</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <input type="number" value={formData.budget || ''} onChange={e => setFormData({...formData, budget: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input type="date" value={formData.startDate || ''} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input type="date" value={formData.endDate || ''} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Module CRM</h2>
          <p className="text-gray-500">Gestion de la relation client</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Rechercher..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      {renderTable()}

      {/* Pagination */}
      {totalItems > 10 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Total: {totalItems} éléments</p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">Page {currentPage}</span>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={totalItems <= currentPage * 10}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? `Modifier ${tabs.find(t => t.id === activeTab)?.name.slice(0, -1)}` : `Nouveau ${tabs.find(t => t.id === activeTab)?.name.slice(0, -1)}`}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {getFormFields()}
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingItem(null); setFormData({}); }} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Annuler
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingItem ? 'Mettre à jour' : 'Créer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
