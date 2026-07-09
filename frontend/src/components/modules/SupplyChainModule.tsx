'use client';

import { useState } from 'react';
import { 
  Truck, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Box,
  RefreshCw,
  Plus,
  Search,
  Filter,
  FileText,
  DollarSign,
  Calendar,
  Users,
  ArrowRight,
  RotateCcw,
  PackageCheck,
  PackageX
} from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  date: string;
  shipping: string;
}

interface Inventory {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reorderLevel: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  price: number;
  category: string;
}

interface Supplier {
  id: string;
  name: string;
  products: number;
  rating: number;
  leadTime: string;
  status: 'active' | 'inactive';
}

export default function SupplyChainModule() {
  const [activeTab, setActiveTab] = useState('orders');

  const stats = [
    { title: 'Commandes en Cours', value: '145', change: '+23', icon: <ShoppingCart className="w-6 h-6 text-blue-500" /> },
    { title: 'Livrées Aujourd\'hui', value: '89', change: '+12%', icon: <Truck className="w-6 h-6 text-green-500" /> },
    { title: 'Stock Total', value: '12,450', change: 'units', icon: <Package className="w-6 h-6 text-purple-500" /> },
    { title: 'Valeur Stock', value: '€485,200', change: '', icon: <DollarSign className="w-6 h-6 text-orange-500" /> },
  ];

  const orders: Order[] = [
    { id: 'ORD-2024-001', customer: 'Enterprise Corp', status: 'shipped', total: 12500, items: 45, date: '2024-01-15', shipping: 'DHL Express' },
    { id: 'ORD-2024-002', customer: 'Tech Solutions', status: 'processing', total: 8500, items: 28, date: '2024-01-15', shipping: 'FedEx' },
    { id: 'ORD-2024-003', customer: 'Global Industries', status: 'pending', total: 22000, items: 120, date: '2024-01-16', shipping: 'UPS' },
    { id: 'ORD-2024-004', customer: 'StartupXYZ', status: 'delivered', total: 3500, items: 12, date: '2024-01-14', shipping: 'Colissimo' },
    { id: 'ORD-2024-005', customer: 'MegaStore', status: 'processing', total: 18700, items: 85, date: '2024-01-16', shipping: 'DHL Freight' },
    { id: 'ORD-2024-006', customer: 'Local Shop', status: 'cancelled', total: 1200, items: 5, date: '2024-01-13', shipping: 'Retrait点' },
  ];

  const inventory: Inventory[] = [
    { id: '1', name: 'Serveur Enterprise X1', sku: 'SRV-ENT-X1', quantity: 45, reorderLevel: 10, status: 'in_stock', price: 4500, category: 'Hardware' },
    { id: '2', name: 'Licence Software Pro', sku: 'LIC-PRO-001', quantity: 250, reorderLevel: 50, status: 'in_stock', price: 299, category: 'Software' },
    { id: '3', name: 'Station de Travail', sku: 'WS-STD-01', quantity: 8, reorderLevel: 15, status: 'low_stock', price: 2200, category: 'Hardware' },
    { id: '4', name: 'Périphérique USB-C', sku: 'PER-USB-01', quantity: 0, reorderLevel: 50, status: 'out_of_stock', price: 45, category: 'Accessories' },
    { id: '5', name: 'Cloud Storage 1TB', sku: 'CLD-1TB-01', quantity: 500, reorderLevel: 100, status: 'in_stock', price: 99, category: 'Services' },
    { id: '6', name: 'Monitor 27"', sku: 'MON-27-01', quantity: 22, reorderLevel: 10, status: 'in_stock', price: 450, category: 'Hardware' },
  ];

  const suppliers: Supplier[] = [
    { id: '1', name: 'TechGlobal Inc', products: 125, rating: 4.8, leadTime: '3-5 jours', status: 'active' },
    { id: '2', name: 'EuroSupply Co', products: 89, rating: 4.5, leadTime: '5-7 jours', status: 'active' },
    { id: '3', name: 'Asia Manufacturing', products: 245, rating: 4.2, leadTime: '20-30 jours', status: 'active' },
    { id: '4', name: 'LocalDistributor', products: 34, rating: 4.9, leadTime: '1-2 jours', status: 'active' },
  ];

  const shipments = [
    { id: 'SHP-001', destination: 'Paris, France', status: 'in_transit', eta: '2024-01-17', carrier: 'DHL Express' },
    { id: 'SHP-002', destination: 'Lyon, France', status: 'in_transit', eta: '2024-01-17', carrier: 'FedEx' },
    { id: 'SHP-003', destination: 'Marseille, France', status: 'delivered', eta: '2024-01-15', carrier: 'UPS' },
    { id: 'SHP-004', destination: 'Bordeaux, France', status: 'pending', eta: '2024-01-18', carrier: 'Colissimo' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supply Chain</h1>
          <p className="text-gray-600 mt-1">Gestion des stocks, commandes et livraisons</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle Commande
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
          <Package className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Inventaire</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Truck className="w-5 h-5 text-green-600" />
          <span className="font-medium">Expéditions</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Warehouse className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Entrepôt</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <ShoppingCart className="w-5 h-5 text-orange-600" />
          <span className="font-medium">Fournisseurs</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Commandes Récentes</h2>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    order.status === 'delivered' ? 'bg-green-100' :
                    order.status === 'shipped' ? 'bg-blue-100' :
                    order.status === 'processing' ? 'bg-yellow-100' :
                    order.status === 'cancelled' ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}>
                    {order.status === 'delivered' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                     order.status === 'shipped' ? <Truck className="w-4 h-4 text-blue-600" /> :
                     order.status === 'processing' ? <Clock className="w-4 h-4 text-yellow-600" /> :
                     order.status === 'cancelled' ? <PackageX className="w-4 h-4 text-red-600" /> :
                     <Package className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{order.total.toLocaleString()}€</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status === 'delivered' ? 'Livrée' : 
                     order.status === 'shipped' ? 'Expédiée' : 
                     order.status === 'processing' ? 'En cours' : 
                     order.status === 'cancelled' ? 'Annulée' : 
                     'En attente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">État du Stock</h2>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">En stock: 4</span>
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Faible: 1</span>
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Rupture: 1</span>
            </div>
          </div>
          <div className="space-y-3">
            {inventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.quantity} unités</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'in_stock' ? 'bg-green-100 text-green-700' :
                    item.status === 'low_stock' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status === 'in_stock' ? 'En stock' : 
                     item.status === 'low_stock' ? 'Stock faible' : 
                     'Rupture'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Suppliers */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Fournisseurs</h2>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{supplier.name}</p>
                  <p className="text-sm text-gray-500">{supplier.products} produits • {supplier.leadTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-yellow-600">★ {supplier.rating}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    supplier.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {supplier.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Expéditions</h2>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    shipment.status === 'delivered' ? 'bg-green-100' :
                    shipment.status === 'in_transit' ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    <Truck className={`w-4 h-4 ${
                      shipment.status === 'delivered' ? 'text-green-600' :
                      shipment.status === 'in_transit' ? 'text-blue-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{shipment.id}</p>
                    <p className="text-sm text-gray-500">{shipment.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{shipment.carrier}</p>
                  <p className="text-xs text-gray-500">ETA: {shipment.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
