'use client';

import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Bot, 
  Settings,
  X
} from 'lucide-react';

type Module = 'dashboard' | 'erp' | 'crm' | 'ai' | 'settings';

interface SidebarProps {
  activeModule: Module;
  setActiveModule: (module: Module) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const modules = [
  { id: 'dashboard' as Module, name: 'Dashboard', icon: LayoutDashboard },
  { id: 'erp' as Module, name: 'ERP', icon: Package },
  { id: 'crm' as Module, name: 'CRM', icon: Users },
  { id: 'ai' as Module, name: 'AI Assistant', icon: Bot },
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">E-Stack AI</h1>
              <p className="text-indigo-300 text-xs">Business OS</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
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
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-indigo-800/50 rounded-lg p-4">
            <p className="text-indigo-200 text-xs">Version 1.0</p>
            <p className="text-white text-sm font-medium">Premium Enterprise</p>
          </div>
        </div>
      </aside>
    </>
  );
}
