
import React from 'react';
import { 
  LayoutGridIcon, 
  SearchIcon,
  LayersIcon, 
  ActivityIcon, 
  SettingsIcon,
  PlusIcon,
  FileTextIcon,
  DocumentTextIcon,
  SparklesIcon,
  CrownIcon
} from './icons/UiIcons';

interface SidebarProps {
  currentView: 'dashboard' | 'campaigns';
  setView: (view: 'dashboard' | 'campaigns') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const adminItems = [
    { name: 'Terms & Conditions', icon: <DocumentTextIcon className="w-4 h-4" /> },
    { name: 'Email Templates', icon: <FileTextIcon className="w-4 h-4" /> },
    { name: 'Partners', icon: <PlusIcon className="w-4 h-4 rotate-45" /> },
    { name: 'Influencers', icon: <CrownIcon className="w-4 h-4" /> },
    { name: 'Influencer Dashboard', icon: <ActivityIcon className="w-4 h-4" /> },
    { name: 'Campaigns', id: 'campaigns', icon: <LayersIcon className="w-4 h-4" /> },
    { name: 'Pro Collections', icon: <LayoutGridIcon className="w-4 h-4" /> },
    { name: 'Locations', icon: <SearchIcon className="w-4 h-4" /> },
    { name: 'Users', icon: <PlusIcon className="w-4 h-4" /> },
    { name: 'Subscribers', icon: <SparklesIcon className="w-4 h-4" /> },
    { name: 'Platform Settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen p-8 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-20 h-20 rounded-full border-2 border-brand-accent p-1 mb-3">
          <div className="w-full h-full rounded-full bg-brand-light-gray flex items-center justify-center text-brand-accent">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <button className="text-[10px] font-bold text-brand-accent tracking-widest uppercase mb-2">Add Photo</button>
        <h4 className="font-bold text-sm">Andrew Tweedie</h4>
        <p className="text-[10px] text-brand-gray mt-1">accounts@nativeempire.com</p>
      </div>

      <div className="space-y-8 flex-1">
        <section>
          <nav className="space-y-1">
            <button 
              onClick={() => setView('dashboard')}
              className={`w-full flex items-center gap-3 px-1 py-2 font-bold text-[13px] transition-all ${currentView === 'dashboard' ? 'text-brand-accent' : 'text-brand-dark hover:text-brand-accent'}`}
            >
              <span className="opacity-70"><LayoutGridIcon className="w-4 h-4" /></span>
              Account Details
            </button>
          </nav>
        </section>

        <section>
          <h2 className="font-serif text-brand-accent text-[11px] tracking-widest uppercase mb-4 font-black">Admin</h2>
          <nav className="space-y-0.5">
            {adminItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => { if(item.id === 'campaigns') setView('campaigns'); }}
                className={`w-full flex items-center gap-3 px-1 py-2 transition-all font-semibold text-[13px] ${
                  (item.id === 'campaigns' && currentView === 'campaigns')
                    ? 'text-brand-accent'
                    : 'text-brand-gray hover:text-brand-accent'
                }`}
              >
                <span className="opacity-50">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </section>

        <section>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-1 py-2 font-bold text-[13px] text-brand-dark hover:text-brand-accent transition-all">
              <span className="opacity-70"><LayersIcon className="w-4 h-4" /></span>
              My Collaborations
            </button>
          </nav>
        </section>
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-50">
         <a href="#" className="flex items-center gap-3 px-1 py-2 font-bold text-[13px] text-red-500 hover:text-red-600 transition-all">
            <PlusIcon className="w-4 h-4 rotate-45" />
            Sign Out
         </a>
      </div>
    </aside>
  );
};

export default Sidebar;
