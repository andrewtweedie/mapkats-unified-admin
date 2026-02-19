
import React from 'react';

interface HeaderProps {
  userName: string;
  userInitials: string;
  currentView: 'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail' | 'users' | 'subscribers' | 'subscriber-detail' | 'partners' | 'partner-detail' | 'influencer-dashboard' | 'influencers' | 'influencer-listing';
  setView: (view: 'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail' | 'users' | 'subscribers' | 'subscriber-detail' | 'partners' | 'partner-detail' | 'influencer-dashboard' | 'influencers' | 'influencer-listing') => void;
}

const Header: React.FC<HeaderProps> = ({ userName, currentView, setView }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white font-black italic">M</div>
          <span className="text-xl font-black tracking-tight text-brand-accent font-serif">Mapkats</span>
        </div>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-brand-gray">
          <button 
            onClick={() => setView('dashboard')}
            className={`transition-colors border-b-2 pb-1 ${
              currentView === 'dashboard' 
                ? 'text-brand-dark font-bold border-brand-accent' 
                : 'border-transparent hover:text-brand-accent'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView('campaigns')}
            className={`transition-colors border-b-2 pb-1 ${
              (currentView === 'campaigns' || currentView === 'campaign-detail')
                ? 'text-brand-dark font-bold border-brand-accent'
                : 'border-transparent hover:text-brand-accent'
            }`}
          >
            Campaigns
          </button>
          <button
            onClick={() => setView('pro-collections')}
            className={`transition-colors border-b-2 pb-1 ${
              (currentView === 'pro-collections' || currentView === 'pro-collection-detail')
                ? 'text-brand-dark font-bold border-brand-accent'
                : 'border-transparent hover:text-brand-accent'
            }`}
          >
            Pro Collections
          </button>
          <button
            onClick={() => setView('top-influencers')}
            className={`transition-colors border-b-2 pb-1 ${
              currentView === 'top-influencers'
                ? 'text-brand-dark font-bold border-brand-accent'
                : 'border-transparent hover:text-brand-accent'
            }`}
          >
            Top Influencers
          </button>
          <button
            onClick={() => setView('search')}
            className={`transition-colors border-b-2 pb-1 ${
              (currentView === 'search' || currentView === 'influencer-detail')
                ? 'text-brand-dark font-bold border-brand-accent'
                : 'border-transparent hover:text-brand-accent'
            }`}
          >
            Search
          </button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <span className="text-[13px] font-bold text-brand-accent hidden sm:block">{userName.split(' ')[0]}</span>
          <button className="border-2 border-brand-accent text-brand-accent text-xs font-bold px-6 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all shadow-sm">
            Account
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
