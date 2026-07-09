'use client';

import { useState, useEffect } from 'react';
import { Package, Plus, Search, Edit, Trash2, Eye, FileText, Users, DollarSign, Boxes, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  cost?: number;
  description?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  date: string;
  dueDate?: string;
  status: string;
  total: number;
}

interface Quote {
  id: string;
  quoteNumber: string;
  clientId: string;
  date: string;
  validUntil?: string;
  status: string;
  total: number;
}

interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  hireDate?: string;
  salary?: number;
  status: string;
}

interface Account {
  id: string;
  accountNumber: string;
  name: string;
  type: string;
  balance: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  accountId: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ErpModule() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formData, setFormData] = useState<any>({});

  const tabs = [
    { id: 'products', name: 'Produits', icon: Package },
    { id: 'invoices', name: 'Factures', icon: FileText },
    { id: 'quotes', name: 'Devis', icon: FileText },
    { id: 'employees', name: 'Employés', icon: Users },
    { id: 'accounting', name: 'Comptabilité', icon: DollarSign },
    { id: 'inventory', name: 'Stock', icon: Boxes },
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'products':
          const productsRes = await axios.get(`${API_URL}/erp/products?page=${currentPage}&limit=10`);
          setProducts(productsRes.data.data || productsRes.data);
          setTotalItems(productsRes.data.total || productsRes.data.length || 0);
          break;
        case 'invoices':
          const invoicesRes = await axios.get(`${API_URL}/erp/invoices?page=${currentPage}&limit=10`);
          setInvoices(invoicesRes.data.data || invoicesRes.data);
          setTotalItems(invoicesRes.data.total || invoicesRes.data.length || 0);
          break;
        case 'quotes':
          const quotesRes = await axios.get(`${API_URL}/erp/quotes?page=${currentPage}&limit=10`);
          setQuotes(quotesRes.data.data || quotesRes.data);
          setTotalItems(quotesRes.data.total || quotesRes.data.length || 0);
          break;
        case 'employees':
          const employeesRes = await axios.get(`${API_URL}/erp/employees?page=${currentPage}&limit=10`);
          setEmployees(employeesRes.data.data || employeesRes.data);
          setTotalItems(employeesRes.data.total || employeesRes.data.length || 0);
          break;
        case 'accounting':
          const [accountsRes, transRes] = await Promise.all([
            axios.get(`${API_URL}/erp/accounts?page=${currentPage}&limit=10`),
            axios.get(`${API_URL}/erp/transactions?page=1&limit=10`)
          ]);
          setAccounts(accountsRes.data.data || accountsRes.data);
          setTransactions(transRes.data.data || transRes.data);
          setTotalItems(accountsRes.data.total || accountsRes.data.length || 0);
          break;
        case 'inventory':
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
      case 'products':
        setProducts([
          { id: '1', sku: 'PRD-001', name: 'Produit A', price: 99.99, quantity: 150, category: 'Electronics' },
          { id: '2', sku: 'PRD-002', name: 'Produit B', price: 49.99, quantity: 75, category: 'Accessories' },
          { id: '3', sku: 'PRD-003', name: 'Produit C', price: 199.99, quantity: 25, category: 'Electronics' },
        ]);
        setTotalItems(3);
        break;
      case 'invoices':
        setInvoices([
          { id: '1', invoiceNumber: 'INV-2024-001', clientId: 'c1', date: '2024-01-15', status: 'paid', total: 1500 },
          { id: '2', invoiceNumber: 'INV-2024-002', clientId: 'c2', date: '2024-01-20', status: 'pending', total: 2300 },
          { id: '3', invoiceNumber: 'INV-2024-003', clientId: 'c3', date: '2024-01-25', status: 'draft', total: 800 },
        ]);
        setTotalItems(3);
        break;
      case 'quotes':
        setQuotes([
          { id: '1', quoteNumber: 'QT-2024-001', clientId: 'c1', date: '2024-01-10', status: 'sent', total: 5000 },
          { id: '2', quoteNumber: 'QT-2024-002', clientId: 'c2', date: '2024-01-18', status: 'accepted', total: 3200 },
        ]);
        setTotalItems(2);
        break;
      case 'employees':
        setEmployees([
          { id: '1', employeeNumber: 'EMP-001', firstName: 'Jean', lastName: 'Dupont', email: 'jean@company.com', department: 'IT', position: 'Developer', status: 'active' },
          { id: '2', employeeNumber: 'EMP-002', firstName: 'Marie', lastName: 'Martin', email: 'marie@company.com', department: 'Sales', position: 'Manager', status: 'active' },
          { id: '3', employeeNumber: 'EMP-003', firstName: 'Pierre', lastName: 'Durand', email: 'pierre@company.com', department: 'HR', position: 'Recruiter', status: 'active' },
        ]);
        setTotalItems(3);
        break;
      case 'accounting':
        setAccounts([
          { id: '1', accountNumber: '400000', name: 'Clients', type: 'receivable', balance: 15000 },
          { id: '2', accountNumber: '401000', name: 'Fournisseurs', type: 'payable', balance: 8500 },
          { id: '3', accountNumber: '512000', name: 'Banque', type: 'asset', balance: 50000 },
        ]);
        setTransactions([
          { id: '1', date: '2024-01-15', description: 'Vente produit A', amount: 1500, type: 'credit', accountId: '1' },
          { id: '2', date: '2024-01-16', description: 'Achat fournitures', amount: 450, type: 'debit', accountId: '3' },
        ]);
        setTotalItems(3);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = `${API_URL}/erp/${activeTab}`;
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
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/${activeTab}/${id}`);
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

  const filteredData = () => {
    let data: any[] = [];
    switch (activeTab) {
      case 'products': data = products; break;
      case 'invoices': data = invoices; break;
      case 'quotes': data = quotes; break;
      case 'employees': data = employees; break;
      case 'accounting': data = accounts; break;
    }
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      paid: 'bg-green-100 text-green-800',
      sent: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
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
      case 'products':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coût</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(product.price || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${Number(product.cost || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${product.quantity > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'invoices':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Facture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Échéance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(invoice.total || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(invoice)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(invoice.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'quotes':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Devis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valide jusqu'au</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((quote: any) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quote.quoteNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.validUntil || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Number(quote.total || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(quote.status)}`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(quote)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(quote.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'employees':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matricule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Département</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Poste</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((employee: any) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.firstName} {employee.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button onClick={() => openModal(employee)} className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'accounting':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Plan Comptable</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">N° Compte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Solde</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {accounts.map((account: any) => (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.accountNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${Number(account.balance || 0).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button onClick={() => openModal(account)} className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">Écritures Comptables</h3>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((trans: any) => (
                    <tr key={trans.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trans.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${trans.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {trans.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${Number(trans.amount || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Boxes className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gestion des Stocks</h3>
            <p className="text-gray-500 mb-4">Module de gestion des mouvements de stock</p>
            <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Créer un mouvement de stock
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const getFormFields = () => {
    switch (activeTab) {
      case 'products':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input type="text" value={formData.sku || ''} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
              <input type="number" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="">Sélectionner...</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
              <input type="number" value={formData.quantity || ''} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
          </>
        );
      case 'invoices':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N° Facture</label>
              <input type="text" value={formData.invoiceNumber || ''} onChange={e => setFormData({...formData, invoiceNumber: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Montant Total</label>
              <input type="number" value={formData.total || ''} onChange={e => setFormData({...formData, total: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyée</option>
                <option value="paid">Payée</option>
                <option value="overdue">En retard</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
          </>
        );
      case 'quotes':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N° Devis</label>
              <input type="text" value={formData.quoteNumber || ''} onChange={e => setFormData({...formData, quoteNumber: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Montant Total</label>
              <input type="number" value={formData.total || ''} onChange={e => setFormData({...formData, total: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="draft">Brouillon</option>
                <option value="sent">Envoyé</option>
                <option value="accepted">Accepté</option>
                <option value="rejected">Refusé</option>
                <option value="expired">Expiré</option>
              </select>
            </div>
          </>
        );
      case 'employees':
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                <input type="text" value={formData.department || ''} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                <input type="text" value={formData.position || ''} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </>
        );
      case 'accounting':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">N° Compte</label>
              <input type="text" value={formData.accountNumber || ''} onChange={e => setFormData({...formData, accountNumber: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du compte</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                <option value="asset">Actif</option>
                <option value="liability">Passif</option>
                <option value="equity">Capitaux propres</option>
                <option value="revenue">Produit</option>
                <option value="expense">Charge</option>
              </select>
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
          <h2 className="text-2xl font-bold text-gray-900">Module ERP</h2>
          <p className="text-gray-500">Gestion intégrée des ressources de l'entreprise</p>
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
