'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Bot, 
  Settings,
  X,
  Crown,
  Wallet,
  UsersRound,
  Truck,
  Megaphone,
  Brain,
  Building2,
  ShoppingCart,
  BarChart3,
  Shield,
  Globe,
  Cloud,
  Palette,
  Briefcase,
  Zap
} from 'lucide-react';
import Logo from '../common/Logo';

type Module = 'dashboard' | 'founder' | 'erp' | 'crm' | 'finance' | 'hr' | 'marketing' | 'supplychain' | 'ai' | 'settings';

interface SidebarProps {
  activeModule: Module;
  setActiveModule: (module: Module) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const modules = [
  { id: 'dashboard' as Module, name: 'Dashboard', icon: LayoutDashboard },
  { id: 'founder' as Module, name: 'Founder Center', icon: Crown },
  { id: 'erp' as Module, name: 'ERP', icon: Package },
  { id: 'crm' as Module, name: 'CRM', icon: Users },
  { id: 'finance' as Module, name: 'Finance', icon: Wallet },
  { id: 'hr' as Module, name: 'RH', icon: UsersRound },
  { id: 'marketing' as Module, name: 'Marketing', icon: Megaphone },
  { id: 'supplychain' as Module, name: 'Supply Chain', icon: Truck },
  { id: 'ai' as Module, name: 'AI Assistant', icon: Brain },
  { id: 'settings' as Module, name: 'Settings', icon: Settings },
];

export default function Sidebar({ activeModule, setActiveModule, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <Link href="/" className="flex items-center gap-3">
            <Logo size="md" variant="white" />
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-white text-indigo-900 shadow-lg' 
                    : 'text-white/80 hover:bg-indigo-700 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{module.name}</span>
              </button>
            );
          })}
          
          {/* Agents Page Link - Founder Only */}
          <Link
            href="/agents"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          >
            <Crown className="w-5 h-5" />
            <span className="font-medium">Agents IA</span>
          </Link>
        </nav>

        <div className="p-4 bg-indigo-800/50 rounded-lg mx-4 mb-4">
          <p className="text-indigo-200 text-xs">ELECTRON AI OS</p>
          <p className="text-white text-sm font-medium">Enterprise Premium Ultimate 1.0</p>
        </div>
      </aside>
    </>
  );
}
