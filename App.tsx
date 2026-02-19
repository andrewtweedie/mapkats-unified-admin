
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import CampaignsView from './views/CampaignsView';
import CampaignDetailView from './views/CampaignDetailView';
import TopInfluencersView from './views/TopInfluencersView';
import SearchView from './views/SearchView';
import InfluencerDetailView from './views/InfluencerDetailView';
import ProCollectionsView from './views/ProCollectionsView';
import ProCollectionDetailView from './views/ProCollectionDetailView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail'>('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);
  const [previousView, setPreviousView] = useState<string>('search');
  const [topInfluencerCategory, setTopInfluencerCategory] = useState<string | null>(null);
  const [selectedProCollection, setSelectedProCollection] = useState<string | null>(null);

  const handleProCollectionClick = (name: string) => {
    setSelectedProCollection(name);
    setCurrentView('pro-collection-detail');
  };

  const handleCampaignClick = (name: string) => {
    setSelectedCampaign(name);
    setCurrentView('campaign-detail');
  };

  const handleInfluencerClick = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setPreviousView(currentView);
    setCurrentView('influencer-detail');
  };

  const handleInfluencerBack = () => {
    setCurrentView(previousView as any);
    setSelectedInfluencer(null);
  };

  const handleNavigateToCategory = (category: string) => {
    setTopInfluencerCategory(category);
    setCurrentView('top-influencers');
    setSelectedInfluencer(null);
  };

  return (
    <div className="flex h-screen bg-[#F8F6F4] overflow-hidden text-brand-dark">
      <Sidebar
        currentView={currentView}
        setView={(view) => {
          setCurrentView(view);
          if (view !== 'campaign-detail') setSelectedCampaign(null);
          if (view !== 'pro-collection-detail') setSelectedProCollection(null);
          if (view === 'top-influencers') setTopInfluencerCategory(null);
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
        <Header
          userName="Andrew Tweedie"
          userInitials="AT"
          currentView={currentView}
          setView={(view) => {
            setCurrentView(view);
            if (view !== 'campaign-detail') setSelectedCampaign(null);
            if (view !== 'pro-collection-detail') setSelectedProCollection(null);
            if (view === 'top-influencers') setTopInfluencerCategory(null);
          }}
        />

        <div className={`p-6 md:p-10 w-full mx-auto ${currentView === 'search' && !selectedInfluencer ? 'flex-1 flex flex-col max-w-full' : 'max-w-7xl'}`}>
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'campaigns' && <CampaignsView onCampaignClick={handleCampaignClick} />}
          {currentView === 'campaign-detail' && (
            <CampaignDetailView
              campaignName={selectedCampaign || 'Campaign'}
              onBack={() => setCurrentView('campaigns')}
            />
          )}
          {currentView === 'top-influencers' && <TopInfluencersView initialCategory={topInfluencerCategory} />}
          {currentView === 'pro-collections' && <ProCollectionsView onCollectionClick={handleProCollectionClick} />}
          {currentView === 'pro-collection-detail' && (
            <ProCollectionDetailView
              collectionName={selectedProCollection || 'Collection'}
              onBack={() => setCurrentView('pro-collections')}
            />
          )}
          {currentView === 'search' && <SearchView onInfluencerClick={handleInfluencerClick} />}
          {currentView === 'influencer-detail' && selectedInfluencer && (
            <InfluencerDetailView
              influencer={selectedInfluencer}
              onBack={handleInfluencerBack}
              onNavigateToCategory={handleNavigateToCategory}
            />
          )}
        </div>

        <footer className={`p-10 flex flex-col md:flex-row justify-between items-center text-xs font-semibold gap-6 ${currentView === 'search' && !selectedInfluencer ? 'bg-[#F8F6F4] text-brand-dark border-t border-gray-200/50' : 'mt-auto bg-white border-t border-gray-100 text-brand-dark'}`}>
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
