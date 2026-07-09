'use client';

import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Clock, 
  Award, 
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
  UserCheck,
  UserX,
  TrendingUp,
  Briefcase,
  Heart,
  Shield,
  Search,
  Filter,
  Download,
  Mail
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'active' | 'on_leave' | 'inactive';
  hireDate: string;
  salary: number;
  avatar?: string;
}

export default function HrModule() {
  const [activeTab, setActiveTab] = useState('employees');

  const stats = [
    { title: 'Total Employés', value: '156', change: '+5', icon: <Users className="w-6 h-6 text-blue-500" /> },
    { title: 'En Postes', value: '142', change: '91%', icon: <UserCheck className="w-6 h-6 text-green-500" /> },
    { title: 'En Congé', value: '8', change: '', icon: <Clock className="w-6 h-6 text-yellow-500" /> },
    { title: 'Masse Salariale', value: '€485K', change: '/mois', icon: <DollarSign className="w-6 h-6 text-purple-500" /> },
  ];

  const employees: Employee[] = [
    { id: '1', name: 'Marie Dubois', role: 'Directrice Marketing', department: 'Marketing', email: 'marie@electron.ai', status: 'active', hireDate: '2022-03-15', salary: 8500 },
    { id: '2', name: 'Jean-Pierre Martin', role: 'Développeur Full Stack', department: 'IT', email: 'jean-pierre@electron.ai', status: 'active', hireDate: '2021-08-20', salary: 7200 },
    { id: '3', name: 'Sophie Bernard', role: 'Responsable Commercial', department: 'Ventes', email: 'sophie@electron.ai', status: 'active', hireDate: '2020-11-01', salary: 7800 },
    { id: '4', name: 'Thomas Petit', role: 'Designer UI/UX', department: 'Design', email: 'thomas@electron.ai', status: 'on_leave', hireDate: '2023-01-10', salary: 5500 },
    { id: '5', name: 'Claire Moreau', role: 'Comptable', department: 'Finance', email: 'claire@electron.ai', status: 'active', hireDate: '2021-05-22', salary: 4800 },
    { id: '6', name: 'Lucas Roux', role: 'DevOps Engineer', department: 'IT', email: 'lucas@electron.ai', status: 'active', hireDate: '2022-09-05', salary: 7000 },
  ];

  const departments = [
    { name: 'Direction', headcount: 12, budget: '€180K' },
    { name: 'Marketing', headcount: 18, budget: '€95K' },
    { name: 'Ventes', headcount: 24, budget: '€120K' },
    { name: 'IT', headcount: 32, budget: '€210K' },
    { name: 'Finance', headcount: 15, budget: '€75K' },
    { name: 'RH', headcount: 8, budget: '€45K' },
  ];

  const recruitments = [
    { position: 'Senior Backend Developer', department: 'IT', status: 'open', applicants: 45, priority: 'high' },
    { position: 'Product Manager', department: 'Direction', status: 'interview', applicants: 12, priority: 'medium' },
    { position: 'Sales Representative', department: 'Ventes', status: 'open', applicants: 28, priority: 'high' },
    { position: 'UX Designer', department: 'Design', status: 'pending', applicants: 18, priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ressources Humaines</h1>
          <p className="text-gray-600 mt-1">Gestion des employés et RH</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Nouvel Employé
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
                {stat.change && <p className="text-sm text-gray-500 mt-1">{stat.change}</p>}
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
          <UserPlus className="w-5 h-5 text-green-600" />
          <span className="font-medium">Recrutement</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Congés</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <GraduationCap className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Formation</span>
        </button>
        <button className="flex items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <DollarSign className="w-5 h-5 text-orange-600" />
          <span className="font-medium">Paie</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee List */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Employés Récents</h2>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Voir tout
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher un employé..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    employee.status === 'active' ? 'bg-green-100 text-green-700' :
                    employee.status === 'on_leave' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {employee.status === 'active' ? 'Actif' : employee.status === 'on_leave' ? 'En congé' : 'Inactif'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Départements</h2>
          </div>
          <div className="space-y-3">
            {departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{dept.name}</p>
                    <p className="text-sm text-gray-500">{dept.headcount} employés</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{dept.budget}</p>
                  <p className="text-xs text-gray-500">budget</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recruitments */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Processus de Recrutement</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Voir tout
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Poste</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Département</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Candidats</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Priorité</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recruitments.map((job, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{job.position}</td>
                  <td className="py-3 px-4 text-gray-600">{job.department}</td>
                  <td className="py-3 px-4 text-gray-600">{job.applicants}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.priority === 'high' ? 'bg-red-100 text-red-700' :
                      job.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {job.priority === 'high' ? 'Haute' : job.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      job.status === 'open' ? 'bg-green-100 text-green-700' :
                      job.status === 'interview' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {job.status === 'open' ? 'Ouvert' : job.status === 'interview' ? 'En entretien' : 'En attente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
