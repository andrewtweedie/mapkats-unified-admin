
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import CampaignsView from './views/CampaignsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'campaigns'>('dashboard');

  return (
    <div className="flex h-screen bg-[#F8F6F4] overflow-hidden text-brand-dark">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
        <Header 
          userName="Andrew Tweedie" 
          userInitials="AT" 
          currentView={currentView} 
          setView={setCurrentView} 
        />

        <div className="p-6 md:p-10 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' ? <DashboardView /> : <CampaignsView />}
        </div>

        <footer className="mt-auto p-10 bg-white border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-brand-dark gap-6">
           <div className="flex items-center gap-1">
             <span className="text-gray-400">©</span> Native Empire
           </div>
           <div className="flex gap-12">
              <a href="#" className="hover:text-brand-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Terms & Conditions</a>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
