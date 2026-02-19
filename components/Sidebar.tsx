
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
  CrownIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
  UsersIcon,
  UserIcon,
  MapPinIcon,
  MailIcon,
  HandshakeIcon,
  CreditCardIcon,
} from './icons/UiIcons';

interface SidebarProps {
  currentView: 'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail' | 'users' | 'subscribers' | 'subscriber-detail' | 'partners' | 'partner-detail' | 'influencer-dashboard' | 'influencers' | 'influencer-listing';
  setView: (view: 'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail' | 'users' | 'subscribers' | 'subscriber-detail' | 'partners' | 'partner-detail' | 'influencer-dashboard' | 'influencers' | 'influencer-listing') => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, collapsed, onToggleCollapse }) => {
  const toolsItems = [
    { name: 'Campaigns', id: 'campaigns', icon: <LayersIcon className="w-4 h-4" /> },
    { name: 'Pro Collections', id: 'pro-collections', icon: <LayoutGridIcon className="w-4 h-4" /> },
    { name: 'Top Influencers', id: 'top-influencers', icon: <CrownIcon className="w-4 h-4" /> },
    { name: 'Search', id: 'search', icon: <SearchIcon className="w-4 h-4" /> },
  ];

  const adminItems = [
    { name: 'Users', id: 'users', icon: <UsersIcon className="w-4 h-4" /> },
    { name: 'Subscribers', id: 'subscribers', icon: <SparklesIcon className="w-4 h-4" /> },
    { name: 'Partners', id: 'partners', icon: <HandshakeIcon className="w-4 h-4" /> },
    { name: 'Influencer Dashboard', id: 'influencer-dashboard', icon: <ActivityIcon className="w-4 h-4" /> },
    { name: 'Influencers', id: 'influencers', icon: <UserIcon className="w-4 h-4" /> },
    { name: 'Locations', icon: <MapPinIcon className="w-4 h-4" /> },
    { name: 'Email Templates', icon: <MailIcon className="w-4 h-4" /> },
    { name: 'Platform Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    { name: 'Terms & Conditions', icon: <DocumentTextIcon className="w-4 h-4" /> },
  ];

  const accountItems = [
    { name: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    { name: 'Account Details', icon: <CreditCardIcon className="w-4 h-4" /> },
  ];

  const isActiveView = (id?: string) => {
    if (id === 'campaigns') return currentView === 'campaigns' || currentView === 'campaign-detail';
    if (id === 'top-influencers') return currentView === 'top-influencers';
    if (id === 'search') return currentView === 'search' || currentView === 'influencer-detail';
    if (id === 'pro-collections') return currentView === 'pro-collections' || currentView === 'pro-collection-detail';
    if (id === 'users') return currentView === 'users';
    if (id === 'subscribers') return currentView === 'subscribers' || currentView === 'subscriber-detail';
    if (id === 'partners') return currentView === 'partners' || currentView === 'partner-detail';
    if (id === 'influencer-dashboard') return currentView === 'influencer-dashboard';
    if (id === 'influencers') return currentView === 'influencers' || currentView === 'influencer-listing';
    return false;
  };

  const handleNavClick = (id?: string) => {
    if (id === 'campaigns') setView('campaigns');
    if (id === 'top-influencers') setView('top-influencers');
    if (id === 'search') setView('search');
    if (id === 'pro-collections') setView('pro-collections');
    if (id === 'users') setView('users');
    if (id === 'subscribers') setView('subscribers');
    if (id === 'partners') setView('partners');
    if (id === 'influencer-dashboard') setView('influencer-dashboard');
    if (id === 'influencers') setView('influencers');
  };

  const renderSectionTitle = (title: string) => (
    <>
      {!collapsed && (
        <h2 className="font-serif text-brand-accent text-[11px] tracking-widest uppercase mb-4 font-black">{title}</h2>
      )}
      {collapsed && (
        <div className="w-full border-t border-gray-100 mb-4" />
      )}
    </>
  );

  const renderNavItem = (item: { name: string; id?: string; icon: React.ReactNode }, isBold = false) => (
    <button
      key={item.name}
      onClick={() => handleNavClick(item.id)}
      className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0 py-2.5' : 'px-1 py-2'} transition-all ${isBold ? 'font-bold' : 'font-semibold'} text-[13px] ${
        item.id && isActiveView(item.id)
          ? 'text-brand-accent'
          : item.id
            ? 'text-brand-gray hover:text-brand-accent'
            : 'text-brand-gray hover:text-brand-accent'
      }`}
      title={collapsed ? item.name : undefined}
    >
      <span className="opacity-50 flex-shrink-0">{item.icon}</span>
      {!collapsed && <span className="truncate">{item.name}</span>}
    </button>
  );

  return (
    <aside
      className={`bg-white border-r border-gray-100 hidden lg:flex flex-col h-screen overflow-y-auto overflow-x-hidden scrollbar-hide transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px] px-3 py-6' : 'w-72 p-8'
      }`}
    >
      {/* Toggle button at the top */}
      <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} mb-6`}>
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg text-brand-gray hover:text-brand-accent hover:bg-gray-50 transition-all"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <SidebarExpandIcon className="w-5 h-5" />
            : <SidebarCollapseIcon className="w-5 h-5" />
          }
        </button>
      </div>

      {/* User avatar area */}
      {collapsed ? (
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-full border-2 border-brand-accent p-0.5">
            <div className="w-full h-full rounded-full bg-brand-light-gray flex items-center justify-center text-brand-accent">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
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
      )}

      <div className="space-y-8 flex-1">
        {/* Dashboard */}
        <section>
          <nav className="space-y-1">
            <button
              onClick={() => setView('dashboard')}
              className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0 py-2.5' : 'px-1 py-2'} font-bold text-[13px] transition-all ${
                currentView === 'dashboard' ? 'text-brand-accent' : 'text-brand-dark hover:text-brand-accent'
              }`}
              title={collapsed ? 'Dashboard' : undefined}
            >
              <span className="opacity-70 flex-shrink-0"><LayoutGridIcon className="w-4 h-4" /></span>
              {!collapsed && <span className="truncate">Dashboard</span>}
            </button>
          </nav>
        </section>

        {/* Tools section */}
        <section>
          {renderSectionTitle('Tools')}
          <nav className="space-y-0.5">
            {toolsItems.map((item) => renderNavItem(item))}
          </nav>
        </section>

        {/* Admin section */}
        <section>
          {renderSectionTitle('Admin')}
          <nav className="space-y-0.5">
            {adminItems.map((item) => renderNavItem(item))}
          </nav>
        </section>

        {/* Account section */}
        <section>
          {renderSectionTitle('Account')}
          <nav className="space-y-0.5">
            {accountItems.map((item) => renderNavItem(item))}
          </nav>
        </section>

        {/* My Collaborations */}
        <section>
          {collapsed && (
            <div className="w-full border-t border-gray-100 mb-4" />
          )}
          <nav className="space-y-1">
            <button
              className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0 py-2.5' : 'px-1 py-2'} font-bold text-[13px] text-brand-dark hover:text-brand-accent transition-all`}
              title={collapsed ? 'My Collaborations' : undefined}
            >
              <span className="opacity-70 flex-shrink-0"><LayersIcon className="w-4 h-4" /></span>
              {!collapsed && <span className="truncate">My Collaborations</span>}
            </button>
          </nav>
        </section>
      </div>

      {/* Sign Out */}
      <div className={`mt-10 pt-6 border-t border-gray-50`}>
         <a
           href="#"
           className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 ${collapsed ? 'px-0 py-2' : 'px-1 py-2'} font-bold text-[13px] text-red-500 hover:text-red-600 transition-all`}
           title={collapsed ? 'Sign Out' : undefined}
         >
            <span className="flex-shrink-0"><PlusIcon className="w-4 h-4 rotate-45" /></span>
            {!collapsed && <span>Sign Out</span>}
         </a>
      </div>
    </aside>
  );
};

export default Sidebar;
