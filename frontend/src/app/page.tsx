'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import FounderDashboard from '@/components/dashboard/FounderDashboard';
import ErpModule from '@/components/modules/ErpModule';
import CrmModule from '@/components/modules/CrmModule';
import FinanceModule from '@/components/modules/FinanceModule';
import HrModule from '@/components/modules/HrModule';
import MarketingModule from '@/components/modules/MarketingModule';
import SupplyChainModule from '@/components/modules/SupplyChainModule';
import AiChat from '@/components/ai/AiChat';
import Settings from '@/components/settings/Settings';

type Module = 'dashboard' | 'founder' | 'erp' | 'crm' | 'finance' | 'hr' | 'marketing' | 'supplychain' | 'ai' | 'settings';

export default function Home() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'founder':
        return <FounderDashboard />;
      case 'erp':
        return <ErpModule />;
      case 'crm':
        return <CrmModule />;
      case 'finance':
        return <FinanceModule />;
      case 'hr':
        return <HrModule />;
      case 'marketing':
        return <MarketingModule />;
      case 'supplychain':
        return <SupplyChainModule />;
      case 'ai':
        return <AiChat />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}
