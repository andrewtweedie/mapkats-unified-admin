
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'campaigns' | 'campaign-detail' | 'top-influencers' | 'search' | 'influencer-detail' | 'pro-collections' | 'pro-collection-detail' | 'users' | 'subscribers' | 'subscriber-detail' | 'partners' | 'partner-detail' | 'influencer-dashboard' | 'influencers' | 'influencer-listing' | 'locations' | 'categories' | 'email-templates' | 'email-template-detail' | 'platform-settings' | 'terms-conditions' | 'terms-condition-detail' | 'account-settings' | 'account-details'>('dashboard');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);
  const [previousView, setPreviousView] = useState<string>('search');
  const [topInfluencerCategory, setTopInfluencerCategory] = useState<string | null>(null);
  const [selectedProCollection, setSelectedProCollection] = useState<string | null>(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState<any | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [influencerListingCategory, setInfluencerListingCategory] = useState<string>('');
  const [influencerListingCountry, setInfluencerListingCountry] = useState<string>('');
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<EmailTemplate | null>(null);
  const [selectedTermsCondition, setSelectedTermsCondition] = useState<TermsCondition | null>(null);

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
          if (view !== 'partner-detail') setSelectedPartner(null);
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
            if (view !== 'partner-detail') setSelectedPartner(null);
            if (view === 'top-influencers') setTopInfluencerCategory(null);
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
