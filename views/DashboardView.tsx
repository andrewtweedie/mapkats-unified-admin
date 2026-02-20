
import React, { useState } from 'react';
import ListSection from '../components/ListSection';
import SocialCheckInput from '../components/SocialCheckInput';
import InfluencerCardRow from '../components/InfluencerCardRow';
import InfluencerDetailPopup from '../components/InfluencerDetailPopup';
import AddCampaignModal from '../components/AddCampaignModal';
import AddProCollectionModal from '../components/AddProCollectionModal';
import InfluencerCheckModal from '../components/InfluencerCheckModal';
import { InstagramIcon, YouTubeIcon, TikTokIcon } from '../components/icons/SocialIcons';

interface DashboardViewProps {
  onNavigateToCampaigns?: () => void;
  onNavigateToCampaignDetail?: (name: string) => void;
  onNavigateToNewCampaign?: (name: string, type: 'GIFTED' | 'PAID') => void;
  onNavigateToProCollections?: () => void;
  onNavigateToProCollectionDetail?: (name: string) => void;
  onNavigateToNewProCollection?: (name: string) => void;
  onNavigateToInfluencerFullPage?: (influencer: any) => void;
  onNavigateToRanking?: (category: string, highlight: { name: string; rank: number; imageUrl?: string; followers?: string; location?: string; country?: string; flag?: string; badges?: string[] }) => void;
}

// Map dashboard card data to the full InfluencerData shape needed by InfluencerDetailView
const mapToFullInfluencer = (inf: any) => ({
  id: inf.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  name: inf.name,
  imageUrl: inf.imageUrl,
  category: inf.category || 'Media',
  followers: inf.stats || '0 followers',
  country: 'US',
  flag: '🇺🇸',
  city: 'Los Angeles',
  bio: `${inf.name} is a passionate content creator specializing in ${inf.category || 'media'} content.`,
  platforms: [inf.platform] as ('instagram' | 'tiktok' | 'youtube')[],
});

const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToCampaigns,
  onNavigateToCampaignDetail,
  onNavigateToNewCampaign,
  onNavigateToProCollections,
  onNavigateToProCollectionDetail,
  onNavigateToNewProCollection,
  onNavigateToInfluencerFullPage,
  onNavigateToRanking,
}) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [showAddProCollectionModal, setShowAddProCollectionModal] = useState(false);
  const [showInfluencerCheckModal, setShowInfluencerCheckModal] = useState(false);
  const [influencerCheckResult, setInfluencerCheckResult] = useState<any | null>(null);

  // Mock data: usernames that "exist" in the database
  const knownInfluencers: Record<string, any> = {
    andrewtweedie: {
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      followers: '348 followers',
      category: 'Media',
      categoryColor: '#3B5998',
      countryFlag: '🇦🇺',
      country: 'Australia',
      city: 'Sydney',
      ranking: { position: 2, category: 'Media' },
      badges: [
        { label: '#2 Media Creator', color: 'orange' },
        { label: 'Top 10 Viewed', color: 'black' },
        { label: 'Top 10 Saved', color: 'slate' },
      ],
    },
    shankywhip: {
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      followers: '13,866 followers',
      category: 'Food & Drink',
      categoryColor: '#B45309',
      countryFlag: '🇺🇸',
      country: 'United States',
      city: 'Los Angeles',
      ranking: { position: 5, category: 'Food & Drink' },
      badges: [
        { label: '#5 Bartender', color: 'orange' },
        { label: 'Top 10 Viewed', color: 'black' },
      ],
    },
    finebrands: {
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      followers: '779 followers',
      category: 'Wellness',
      categoryColor: '#059669',
      countryFlag: '🇬🇧',
      country: 'United Kingdom',
      city: 'London',
      ranking: { position: 12, category: 'Wellness' },
      badges: [
        { label: '#12 Wellness', color: 'orange' },
        { label: 'Top 10 Saved', color: 'slate' },
      ],
    },
  };

  const campaignsList = [
    'Chinola SYD City & East',
    'Chinola Northern Beaches',
    'Shankys Candidates USA',
    'Shankys St Patricks 2026',
    'Collection',
    'Manuka Honey',
  ];

  const handleInfluencerCheck = (username: string, platform: 'instagram' | 'youtube' | 'tiktok') => {
    const cleanUsername = username.replace('@', '').toLowerCase();
    const known = knownInfluencers[cleanUsername];
    setInfluencerCheckResult({
      username: cleanUsername,
      platform,
      imageUrl: known?.imageUrl || `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400`,
      followers: known?.followers || `${Math.floor(Math.random() * 50000).toLocaleString()} followers`,
      existsInDatabase: !!known,
      category: known?.category,
      categoryColor: known?.categoryColor,
      countryFlag: known?.countryFlag,
      country: known?.country,
      city: known?.city,
      ranking: known?.ranking,
      badges: known?.badges,
    });
    setShowInfluencerCheckModal(true);
  };

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight mb-2 text-brand-dark">
            Hi Andrew, welcome back.
          </h1>
          <p className="text-brand-gray text-sm font-semibold tracking-wide">Manage your community and saved collections below.</p>
        </div>
      </section>

      {/* Top Row: Management Cards & Social Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <ListSection
          title="Manage Campaigns"
          items={[
            "Chinola SYD City & East",
            "Chinola Northern Beaches",
            "Shankys Candidates USA",
            "Shankys St Patricks 2026",
            "Collection"
          ]}
          buttonText="ADD CAMPAIGN"
          buttonColor="pink"
          onViewAll={onNavigateToCampaigns}
          onItemClick={(item) => onNavigateToCampaignDetail?.(item)}
          onAddNew={() => setShowAddCampaignModal(true)}
        />
        <ListSection
          title="Manage Pro Collections"
          items={[
            "London's Best Tastemakers",
            "UK's Best Home Bartenders",
            "UK's Best Home Cooks",
            "London's Best Bartenders",
            "LA's Best Bartenders"
          ]}
          buttonText="ADD PRO COLLECTION"
          buttonColor="pink"
          onViewAll={onNavigateToProCollections}
          onItemClick={(item) => onNavigateToProCollectionDetail?.(item)}
          onAddNew={() => setShowAddProCollectionModal(true)}
        />
        <div className="bg-white rounded-xl shadow-soft p-6 flex flex-col h-full border border-gray-100">
          <h2 className="font-bold text-[11px] uppercase tracking-widest text-brand-gray border-b border-gray-50 pb-3 mb-6">Influencer Tools</h2>
          <div className="space-y-6 flex-1">
            <SocialCheckInput platform="Instagram" icon={<InstagramIcon />} onCheck={(u) => handleInfluencerCheck(u, 'instagram')} />
            <SocialCheckInput platform="Youtube" icon={<YouTubeIcon />} onCheck={(u) => handleInfluencerCheck(u, 'youtube')} />
            <SocialCheckInput platform="TikTok" icon={<TikTokIcon />} onCheck={(u) => handleInfluencerCheck(u, 'tiktok')} />
          </div>
          <div className="mt-6 pt-4 border-t border-gray-50">
            <a href="#" className="block text-center text-[10px] font-bold text-brand-accent hover:underline uppercase tracking-widest">Open Analytics Suite</a>
          </div>
        </div>
      </div>

      {/* Influencer Sections */}
      <div className="space-y-20 pt-4">
        <InfluencerCardRow
          title="My Saved Influencers"
          onViewProfile={(inf) => onNavigateToInfluencerFullPage?.(mapToFullInfluencer(inf))}
          onCardClick={(inf) => setSelectedInfluencer(inf)}
          onRankingClick={(category, name, rank, inf) => onNavigateToRanking?.(category, { name, rank, imageUrl: inf?.imageUrl, followers: inf?.stats?.replace(' followers', ''), location: inf?.location || 'Australia', country: inf?.country || 'AU', flag: inf?.flag || '🇦🇺', badges: inf?.badges || [] })}
          influencers={[
            { name: "Finebrands", imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400", stats: "779 followers", platform: "instagram", category: "Media", value: "70.72", ranking: { position: 12, category: 'Media' }, location: 'Sydney, Australia', country: 'AU', flag: '🇦🇺', badges: ['Top 10 Viewed'] },
            { name: "Shanky's Whip", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", stats: "13,866 followers", platform: "instagram", category: "Wellness Lifestyle", value: "210.00", ranking: { position: 5, category: 'Food & Drink' }, location: 'Los Angeles, USA', country: 'US', flag: '🇺🇸', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
            { name: "Tammy Moore Jackson", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", stats: "44,073 followers", platform: "instagram", category: "Media", value: "450.00", ranking: { position: 3, category: 'Media' }, location: 'Melbourne, Australia', country: 'AU', flag: '🇦🇺', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
            { name: "ADELE.", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400", stats: "45K followers", platform: "tiktok", category: "Lifestyle Media", value: "900.00", ranking: { position: 8, category: 'Lifestyle Media' }, location: 'Perth, Australia', country: 'AU', flag: '🇦🇺', badges: ['Top 10 Viewed'] },
          ]}
        />

        <InfluencerCardRow
          title="Campaign Talent Queue"
          onViewProfile={(inf) => onNavigateToInfluencerFullPage?.(mapToFullInfluencer(inf))}
          onCardClick={(inf) => setSelectedInfluencer(inf)}
          onRankingClick={(category, name, rank, inf) => onNavigateToRanking?.(category, { name, rank, imageUrl: inf?.imageUrl, followers: inf?.stats?.replace(' followers', ''), location: inf?.location || 'Australia', country: inf?.country || 'AU', flag: inf?.flag || '🇦🇺', badges: inf?.badges || [] })}
          influencers={[
            { name: "Erma | Healthy Recipes", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400", stats: "300K followers", platform: "instagram", category: "Home Cooking", value: "1,200.00", ranking: { position: 1, category: 'Home Cooking' }, location: 'Brisbane, Australia', country: 'AU', flag: '🇦🇺', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
            { name: "Peter Madrigal", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", stats: "50K followers", platform: "youtube", category: "Media", value: "350.00", ranking: { position: 15, category: 'Media' }, location: 'New York, USA', country: 'US', flag: '🇺🇸', badges: ['Top 10 Viewed'] },
            { name: "Beautiful Booze", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400", stats: "115K followers", platform: "instagram", category: "Lifestyle Media", value: "2,400.00", ranking: { position: 2, category: 'Lifestyle Media' }, location: 'London, United Kingdom', country: 'UK', flag: '🇬🇧', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
            { name: "Sam Pence", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", stats: "90K followers", platform: "tiktok", category: "Wellness Lifestyle", value: "850.00", ranking: { position: 7, category: 'Wellness' }, location: 'Sydney, Australia', country: 'AU', flag: '🇦🇺', badges: ['Top 10 Saved'] },
          ]}
        />
      </div>

      {/* Influencer Detail Popup - shown when clicking image/name */}
      {selectedInfluencer && (
        <InfluencerDetailPopup
          influencer={selectedInfluencer}
          onClose={() => setSelectedInfluencer(null)}
        />
      )}

      {/* Add Campaign Modal */}
      <AddCampaignModal
        isOpen={showAddCampaignModal}
        onClose={() => setShowAddCampaignModal(false)}
        onAdd={(name, type) => {
          setShowAddCampaignModal(false);
          onNavigateToNewCampaign?.(name, type);
        }}
      />

      {/* Add Pro Collection Modal */}
      <AddProCollectionModal
        isOpen={showAddProCollectionModal}
        onClose={() => setShowAddProCollectionModal(false)}
        onAdd={(name) => {
          setShowAddProCollectionModal(false);
          onNavigateToNewProCollection?.(name);
        }}
      />

      {/* Influencer Check Modal */}
      <InfluencerCheckModal
        isOpen={showInfluencerCheckModal}
        onClose={() => { setShowInfluencerCheckModal(false); setInfluencerCheckResult(null); }}
        result={influencerCheckResult}
        campaigns={campaignsList}
        onAddToCampaign={(campaign) => {
          setShowInfluencerCheckModal(false);
          setInfluencerCheckResult(null);
          onNavigateToCampaignDetail?.(campaign);
        }}
      />
    </div>
  );
};

export default DashboardView;
