
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import CampaignsView from './views/CampaignsView';
import CampaignDetailView from './views/CampaignDetailView';
import TopInfluencersView from './views/TopInfluencersView';
import MySavesView from './views/MySavesView';
import MySavesSectionView from './views/MySavesSectionView';
import SearchView from './views/SearchView';
import InfluencerDetailView from './views/InfluencerDetailView';
import ProCollectionsView from './views/ProCollectionsView';
import ProCollectionDetailView from './views/ProCollectionDetailView';
import UsersView from './views/UsersView';
import SubscribersView from './views/SubscribersView';
import SubscriberDetailView from './views/SubscriberDetailView';
import PartnersView from './views/PartnersView';
import PartnerDetailView from './views/PartnerDetailView';
import InfluencerDashboardView from './views/InfluencerDashboardView';
import InfluencersView from './views/InfluencersView';
import InfluencerListingView from './views/InfluencerListingView';
import LocationsView from './views/LocationsView';
import CategoriesView from './views/CategoriesView';
import EmailTemplatesView from './views/EmailTemplatesView';
import EmailTemplateDetailView from './views/EmailTemplateDetailView';
import { EmailTemplate } from './views/EmailTemplatesView';
import PlatformSettingsView from './views/PlatformSettingsView';
import TermsConditionsView from './views/TermsConditionsView';
import TermsConditionDetailView from './views/TermsConditionDetailView';
import { TermsCondition } from './views/TermsConditionsView';
import AccountSettingsView from './views/AccountSettingsView';
import AccountDetailsView from './views/AccountDetailsView';
import InfluencerDetailPopup from './components/InfluencerDetailPopup';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'my-saves' | 'my-saves-pro-collections' | 'my-saves-influencers' | 'my-saves-categories' | 'my-saves-lists' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail' | 'users' | 'subscribers' | 'subscriber-detail' | 'partners' | 'partner-detail' | 'influencer-dashboard' | 'influencers' | 'influencer-listing' | 'locations' | 'categories' | 'email-templates' | 'email-template-detail' | 'platform-settings' | 'terms-conditions' | 'terms-condition-detail' | 'account-settings' | 'account-details'>('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);
  const [previousView, setPreviousView] = useState<string>('search');
  const [topInfluencerCategory, setTopInfluencerCategory] = useState<string | null>(null);
  const [topInfluencerHighlight, setTopInfluencerHighlight] = useState<{ name: string; rank: number; imageUrl?: string; followers?: string; location?: string; country?: string; flag?: string; badges?: string[] } | null>(null);
  const [selectedProCollection, setSelectedProCollection] = useState<string | null>(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState<any | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [influencerListingCategory, setInfluencerListingCategory] = useState<string>('');
  const [influencerListingCountry, setInfluencerListingCountry] = useState<string>('');
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<EmailTemplate | null>(null);
  const [selectedTermsCondition, setSelectedTermsCondition] = useState<TermsCondition | null>(null);
  const [popupInfluencer, setPopupInfluencer] = useState<any | null>(null);

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

  const handleSubscriberClick = (subscriber: any) => {
    setSelectedSubscriber(subscriber);
    setCurrentView('subscriber-detail');
  };

  const handlePartnerClick = (partner: any) => {
    setSelectedPartner(partner);
    setCurrentView('partner-detail');
  };

  const handleNavigateToInfluencerListing = (category: string, country: string) => {
    setInfluencerListingCategory(category);
    setInfluencerListingCountry(country);
    setCurrentView('influencer-listing');
  };

  const handleEmailTemplateClick = (template: EmailTemplate) => {
    setSelectedEmailTemplate(template);
    setCurrentView('email-template-detail');
  };

  const handleAddNewTemplate = () => {
    setSelectedEmailTemplate(null);
    setCurrentView('email-template-detail');
  };

  const handleTermsClick = (terms: TermsCondition) => {
    setSelectedTermsCondition(terms);
    setCurrentView('terms-condition-detail');
  };

  const handleAddNewTerms = () => {
    setSelectedTermsCondition(null);
    setCurrentView('terms-condition-detail');
  };

  const handleNavigateToCategory = (category: string, highlight?: { name: string; rank: number; imageUrl?: string; followers?: string; location?: string; country?: string; flag?: string; badges?: string[] }) => {
    setTopInfluencerCategory(category);
    setTopInfluencerHighlight(highlight || null);
    setCurrentView('top-influencers');
    setSelectedInfluencer(null);
    // Scroll to top of page when navigating to rankings
    setTimeout(() => {
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <div className="flex h-screen bg-[#F8F6F4] overflow-hidden text-brand-dark">
      <Sidebar
        currentView={currentView}
        setView={(view) => {
          setCurrentView(view);
          if (view !== 'campaign-detail') setSelectedCampaign(null);
          if (view !== 'pro-collection-detail') setSelectedProCollection(null);
          if (view !== 'partner-detail') setSelectedPartner(null);
          if (view === 'top-influencers') { setTopInfluencerCategory(null); setTopInfluencerHighlight(null); }
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
            if (view !== 'partner-detail') setSelectedPartner(null);
            if (view === 'top-influencers') { setTopInfluencerCategory(null); setTopInfluencerHighlight(null); }
          }}
        />

        <div className={`p-6 md:p-10 w-full mx-auto ${currentView === 'search' && !selectedInfluencer ? 'flex-1 flex flex-col max-w-full' : 'max-w-7xl'}`}>
          {currentView === 'dashboard' && (
            <DashboardView
              onNavigateToCampaigns={() => setCurrentView('campaigns')}
              onNavigateToCampaignDetail={(name) => { setSelectedCampaign(name); setCurrentView('campaign-detail'); }}
              onNavigateToNewCampaign={(name, type) => { setSelectedCampaign(name); setCurrentView('campaign-detail'); }}
              onNavigateToProCollections={() => setCurrentView('pro-collections')}
              onNavigateToProCollectionDetail={(name) => { setSelectedProCollection(name); setCurrentView('pro-collection-detail'); }}
              onNavigateToNewProCollection={(name) => { setSelectedProCollection(name); setCurrentView('pro-collection-detail'); }}
              onNavigateToInfluencerFullPage={(influencer) => { setSelectedInfluencer(influencer); setPreviousView('dashboard'); setCurrentView('influencer-detail'); }}
              onNavigateToRanking={(category, highlight) => handleNavigateToCategory(category, highlight)}
            />
          )}
          {currentView === 'campaigns' && (
            <CampaignsView
              onCampaignClick={handleCampaignClick}
              onAddCampaign={(name, type) => { setSelectedCampaign(name); setCurrentView('campaign-detail'); }}
            />
          )}
          {currentView === 'campaign-detail' && (
            <CampaignDetailView
              campaignName={selectedCampaign || 'Campaign'}
              onBack={() => setCurrentView('campaigns')}
              onNavigateToRanking={(category, highlight) => handleNavigateToCategory(category, highlight)}
            />
          )}
          {currentView === 'top-influencers' && (
            <TopInfluencersView
              initialCategory={topInfluencerCategory}
              highlightInfluencer={topInfluencerHighlight}
              onBack={
                previousView === 'my-saves' || previousView === 'my-saves-categories'
                  ? () => setCurrentView(previousView as any)
                  : undefined
              }
              backLabel={
                previousView === 'my-saves' || previousView === 'my-saves-categories'
                  ? 'Back to My Saves'
                  : undefined
              }
            />
          )}
          {currentView === 'my-saves' && (
            <MySavesView
              onNavigateToSection={(section) => {
                const viewMap: Record<string, any> = {
                  'pro-collections': 'my-saves-pro-collections',
                  'influencers': 'my-saves-influencers',
                  'categories': 'my-saves-categories',
                  'lists': 'my-saves-lists',
                };
                setCurrentView(viewMap[section]);
              }}
              onInfluencerClick={(influencer) => { setSelectedInfluencer(influencer); setPreviousView('my-saves'); setCurrentView('influencer-detail'); }}
              onInfluencerPopupClick={(influencer) => setPopupInfluencer(influencer)}
              onProCollectionClick={(name) => { setSelectedProCollection(name); setPreviousView('my-saves'); setCurrentView('pro-collection-detail'); }}
              onCategoryClick={(name) => { setTopInfluencerCategory(name); setTopInfluencerHighlight(null); setPreviousView('my-saves'); setCurrentView('top-influencers'); }}
            />
          )}
          {currentView === 'my-saves-pro-collections' && (
            <MySavesSectionView section="pro-collections" onBack={() => setCurrentView('my-saves')} onProCollectionClick={(name) => { setSelectedProCollection(name); setPreviousView('my-saves-pro-collections'); setCurrentView('pro-collection-detail'); }} />
          )}
          {currentView === 'my-saves-influencers' && (
            <MySavesSectionView section="influencers" onBack={() => setCurrentView('my-saves')} onInfluencerClick={(influencer) => { setSelectedInfluencer(influencer); setPreviousView('my-saves-influencers'); setCurrentView('influencer-detail'); }} onInfluencerPopupClick={(influencer) => setPopupInfluencer(influencer)} />
          )}
          {currentView === 'my-saves-categories' && (
            <MySavesSectionView section="categories" onBack={() => setCurrentView('my-saves')} onCategoryClick={(name) => { setTopInfluencerCategory(name); setTopInfluencerHighlight(null); setPreviousView('my-saves-categories'); setCurrentView('top-influencers'); }} />
          )}
          {currentView === 'my-saves-lists' && (
            <MySavesSectionView section="lists" onBack={() => setCurrentView('my-saves')} />
          )}
          {currentView === 'pro-collections' && <ProCollectionsView onCollectionClick={handleProCollectionClick} />}
          {currentView === 'pro-collection-detail' && (
            <ProCollectionDetailView
              collectionName={selectedProCollection || 'Collection'}
              onBack={() => {
                if (previousView === 'my-saves' || previousView === 'my-saves-pro-collections') {
                  setCurrentView(previousView as any);
                } else {
                  setCurrentView('pro-collections');
                }
              }}
              backLabel={
                previousView === 'my-saves' || previousView === 'my-saves-pro-collections'
                  ? 'Back to My Saves'
                  : undefined
              }
            />
          )}
          {currentView === 'users' && <UsersView />}
          {currentView === 'subscribers' && <SubscribersView onSubscriberClick={handleSubscriberClick} />}
          {currentView === 'subscriber-detail' && selectedSubscriber && (
            <SubscriberDetailView
              subscriber={selectedSubscriber}
              onBack={() => { setCurrentView('subscribers'); setSelectedSubscriber(null); }}
            />
          )}
          {currentView === 'influencer-dashboard' && <InfluencerDashboardView />}
          {currentView === 'influencers' && <InfluencersView onNavigateToListing={handleNavigateToInfluencerListing} />}
          {currentView === 'influencer-listing' && (
            <InfluencerListingView
              category={influencerListingCategory}
              country={influencerListingCountry}
              onBack={() => setCurrentView('influencers')}
            />
          )}
          {currentView === 'categories' && <CategoriesView />}
          {currentView === 'locations' && <LocationsView />}
          {currentView === 'email-templates' && <EmailTemplatesView onTemplateClick={handleEmailTemplateClick} onAddNew={handleAddNewTemplate} />}
          {currentView === 'email-template-detail' && (
            <EmailTemplateDetailView
              template={selectedEmailTemplate}
              onBack={() => { setCurrentView('email-templates'); setSelectedEmailTemplate(null); }}
            />
          )}
          {currentView === 'platform-settings' && <PlatformSettingsView />}
          {currentView === 'terms-conditions' && <TermsConditionsView onTermsClick={handleTermsClick} onAddNew={handleAddNewTerms} />}
          {currentView === 'terms-condition-detail' && (
            <TermsConditionDetailView
              termsCondition={selectedTermsCondition}
              onBack={() => { setCurrentView('terms-conditions'); setSelectedTermsCondition(null); }}
            />
          )}
          {currentView === 'account-settings' && <AccountSettingsView />}
          {currentView === 'account-details' && <AccountDetailsView />}
          {currentView === 'partners' && <PartnersView onPartnerClick={handlePartnerClick} />}
          {currentView === 'partner-detail' && selectedPartner && (
            <PartnerDetailView
              partner={selectedPartner}
              onBack={() => { setCurrentView('partners'); setSelectedPartner(null); }}
            />
          )}
          {currentView === 'search' && <SearchView onInfluencerClick={handleInfluencerClick} />}
          {currentView === 'influencer-detail' && selectedInfluencer && (
            <InfluencerDetailView
              influencer={selectedInfluencer}
              onBack={handleInfluencerBack}
              onNavigateToCategory={handleNavigateToCategory}
              backLabel={
                previousView === 'my-saves' || previousView === 'my-saves-influencers'
                  ? 'Back to My Saves'
                  : previousView === 'dashboard'
                  ? 'Back to Dashboard'
                  : previousView === 'campaign-detail'
                  ? 'Back to Campaign'
                  : 'Back'
              }
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

      {/* Influencer Detail Popup - triggered by eye icon in My Saves */}
      {popupInfluencer && (
        <InfluencerDetailPopup
          influencer={popupInfluencer}
          onClose={() => setPopupInfluencer(null)}
        />
      )}
    </div>
  );
};

export default App;
