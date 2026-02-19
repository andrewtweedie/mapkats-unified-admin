
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/UiIcons';

interface InfluencerData {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  followers: string;
  country: string;
  flag: string;
  city: string;
  bio: string;
  platforms: ('instagram' | 'tiktok' | 'youtube')[];
}

interface InfluencerDetailViewProps {
  influencer: InfluencerData;
  onBack: () => void;
  onNavigateToCategory: (category: string) => void;
}

// Extended data for the detail view
interface DetailData {
  instagramFollowers: string;
  tiktokFollowers: string;
  youtubeFollowers: string;
  brandFit: string;
  lastPosted: string;
  fullBio: string;
  badges: string[];
  ranking: number;
  rankingList: { rank: number; name: string; country: string; flag: string }[];
  posts: { id: string; imageUrl: string; caption: string; isVideo: boolean }[];
}

const getDetailData = (influencer: InfluencerData): DetailData => {
  // Generate contextual mock data based on the influencer
  const categoryRankings: Record<string, { rank: number; name: string; country: string; flag: string }[]> = {
    'Bartender': [
      { rank: 1, name: 'Timthetank', country: 'US', flag: '🇺🇸' },
      { rank: 2, name: 'Lucas Assis | Tequila, Mezcal, Craft Spirits & Cocktails', country: 'US', flag: '🇺🇸' },
      { rank: 3, name: 'Hannah Chamberlain/SpiritedLA', country: 'US', flag: '🇺🇸' },
      { rank: 4, name: 'BARCHEMISTRY', country: 'US', flag: '🇺🇸' },
      { rank: 5, name: 'Nic Hamilton', country: 'US', flag: '🇺🇸' },
      { rank: 6, name: 'John Rondi', country: 'US', flag: '🇺🇸' },
      { rank: 7, name: 'Julianna McIntosh', country: 'US', flag: '🇺🇸' },
      { rank: 8, name: 'by Morten Krag', country: 'DK', flag: '🇩🇰' },
      { rank: 9, name: 'Stephanie Wahler', country: 'US', flag: '🇺🇸' },
    ],
    'Home Cook': [
      { rank: 1, name: 'Sarah Mitchell', country: 'AU', flag: '🇦🇺' },
      { rank: 2, name: 'James Oliver', country: 'UK', flag: '🇬🇧' },
      { rank: 3, name: 'Li Wei Chen', country: 'SG', flag: '🇸🇬' },
      { rank: 4, name: 'Isabella Rossi', country: 'IT', flag: '🇮🇹' },
      { rank: 5, name: 'Aiko Yamamoto', country: 'JP', flag: '🇯🇵' },
      { rank: 6, name: 'Priya Sharma', country: 'IN', flag: '🇮🇳' },
      { rank: 7, name: 'Marcus Brown', country: 'US', flag: '🇺🇸' },
      { rank: 8, name: 'Hannah Schmidt', country: 'DE', flag: '🇩🇪' },
      { rank: 9, name: 'Carlos Mendez', country: 'ES', flag: '🇪🇸' },
    ],
  };

  const defaultRankings = [
    { rank: 1, name: 'Top Creator 1', country: 'US', flag: '🇺🇸' },
    { rank: 2, name: 'Top Creator 2', country: 'UK', flag: '🇬🇧' },
    { rank: 3, name: 'Top Creator 3', country: 'AU', flag: '🇦🇺' },
    { rank: 4, name: 'Top Creator 4', country: 'CA', flag: '🇨🇦' },
    { rank: 5, name: 'Top Creator 5', country: 'DE', flag: '🇩🇪' },
    { rank: 6, name: 'Top Creator 6', country: 'FR', flag: '🇫🇷' },
    { rank: 7, name: 'Top Creator 7', country: 'JP', flag: '🇯🇵' },
    { rank: 8, name: 'Top Creator 8', country: 'IT', flag: '🇮🇹' },
    { rank: 9, name: 'Top Creator 9', country: 'ES', flag: '🇪🇸' },
  ];

  const rankings = categoryRankings[influencer.category] || defaultRankings;

  // Insert the current influencer into the ranking if not already there
  const influencerInList = rankings.find(r => r.name === influencer.name);
  const ranking = influencerInList ? influencerInList.rank : 3;

  const postImages = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400',
  ];

  const captions = [
    `A celebration kinda Tuesday! I've never been more invested in a holiday than this one. W...`,
    `The Pause before the year of the Fire Horse kicks in. It never seizes to amaze me when women come togethe...`,
    `The brief: Strong cocktail shots & make it delicious Pre batched Vodka and Pineapple Pre batched Raspberry...`,
    `POV Holding Shaken and Shifted in my hands for the first time. That little wiggle of excitement. Dotted between the...`,
    `Live today on Expat Radio with dj_jessvenn A great way to kick off the New Year. Great for expats, wome...`,
    `It's official! Today is the first episode of The Jess and Tam Show on Expat Radio. Our guest today is vibrant, mo...`,
    `New recipe alert! This one is a game changer for weeknight dinners. Quick, easy, and absolutely delicious...`,
    `Behind the scenes of today's photoshoot. So grateful to work with such an amazing team on this project...`,
    `Weekend vibes and good food. Nothing beats a lazy Sunday brunch with friends and family. Here's my take...`,
  ];

  return {
    instagramFollowers: influencer.platforms.includes('instagram') ? (influencer.followers.includes('K') ? (parseFloat(influencer.followers) * 0.95).toFixed(1) + 'K' : influencer.followers) : '0',
    tiktokFollowers: influencer.platforms.includes('tiktok') ? Math.floor(Math.random() * 5000 + 500).toString() : '0',
    youtubeFollowers: influencer.platforms.includes('youtube') ? (Math.random() * 50 + 5).toFixed(1) + 'K' : '0',
    brandFit: `Home ${influencer.category}`,
    lastPosted: 'Feb 17 2026',
    fullBio: `${influencer.bio} Content Creator → Social Media Consulting. Shaken and Shifted @formediasake`,
    badges: [`#${ranking} ${influencer.category}`, 'Top 10 Viewed', 'Top 10 Saved', `Top 10 Viewed (${influencer.city})`, `Top 10 Saved (${influencer.city})`],
    ranking,
    rankingList: rankings,
    posts: postImages.map((img, i) => ({
      id: `post-${i}`,
      imageUrl: img,
      caption: captions[i] || 'Amazing content shared with the community...',
      isVideo: i === 0 || i === 3 || i === 5,
    })),
  };
};

const InfluencerDetailView: React.FC<InfluencerDetailViewProps> = ({ influencer, onBack, onNavigateToCategory }) => {
  const [activeStatsTab, setActiveStatsTab] = useState<'Key Stats' | 'Audience' | 'Content'>('Key Stats');
  const [showCampaignDropdown, setShowCampaignDropdown] = useState(false);
  const [addedToCampaign, setAddedToCampaign] = useState<string[]>([]);
  const detail = getDetailData(influencer);

  // Available campaigns (same as TopInfluencersView)
  const campaigns = [
    { name: 'Collection', type: 'GIFTED' },
    { name: 'GOFAR', type: 'GIFTED' },
    { name: 'Manuka Honey', type: 'GIFTED' },
    { name: "Shanky's Full List", type: 'GIFTED' },
    { name: "Shanky's Midwest", type: 'GIFTED' },
    { name: 'Golden Ostrich', type: 'GIFTED' },
    { name: 'Shankys Total Wine', type: 'GIFTED' },
    { name: 'Shankys Cans', type: 'GIFTED' },
  ];

  return (
    <div>
      {/* Click-away to close campaign dropdown */}
      {showCampaignDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowCampaignDropdown(false)} />
      )}

      {/* Breadcrumb + Add to Campaign Button row */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm">
          <button
            onClick={() => onNavigateToCategory(influencer.category)}
            className="text-brand-dark hover:text-brand-accent transition-colors font-medium underline"
          >
            {influencer.category}
          </button>
          <span className="text-brand-gray mx-2">/</span>
          <span className="font-bold text-brand-dark">{influencer.name}</span>
        </div>

        {/* Add to Campaign Button */}
        <div className="relative">
          <button
            onClick={() => setShowCampaignDropdown(!showCampaignDropdown)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-sm active:scale-95 transition-all ${
              addedToCampaign.length > 0
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {addedToCampaign.length > 0 ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-[11px] font-black uppercase tracking-wider">{addedToCampaign.length} Campaign{addedToCampaign.length > 1 ? 's' : ''}</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-wider">Add to Campaign</span>
              </>
            )}
          </button>

          {/* Campaign dropdown */}
          {showCampaignDropdown && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-slide-in-right">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-[10px] font-black text-brand-gray uppercase tracking-wider">Add to Campaign</p>
                <p className="text-[11px] font-bold text-brand-dark mt-0.5 truncate">{influencer.name}</p>
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {campaigns.map((campaign) => {
                  const isAdded = addedToCampaign.includes(campaign.name);
                  return (
                    <button
                      key={campaign.name}
                      onClick={() => {
                        if (isAdded) {
                          setAddedToCampaign(addedToCampaign.filter(c => c !== campaign.name));
                        } else {
                          setAddedToCampaign([...addedToCampaign, campaign.name]);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left group/camp ${
                        isAdded ? 'bg-emerald-50/50' : 'hover:bg-brand-accent/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isAdded ? 'bg-emerald-100' : 'bg-brand-accent/10'
                      }`}>
                        {isAdded ? (
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[12px] font-bold truncate transition-colors ${
                          isAdded ? 'text-emerald-700' : 'text-brand-dark group-hover/camp:text-brand-accent'
                        }`}>{campaign.name}</p>
                        <p className="text-[10px] font-bold text-brand-gray">{campaign.type}</p>
                      </div>
                      {isAdded ? (
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">Added</span>
                      ) : (
                        <PlusIcon className="w-3.5 h-3.5 text-brand-gray group-hover/camp:text-brand-accent transition-colors shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Banner */}
      <div className="bg-brand-accent rounded-t-2xl px-8 py-4 flex items-center justify-between">
        <h2 className="text-white font-black text-xl font-serif">{influencer.category}</h2>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area - Equal height row */}
      <div className="flex gap-0 items-stretch">
        {/* Left Column - Profile Card */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-gray-100 border-t-0 rounded-bl-2xl p-8 h-full flex flex-col">
            <div className="flex gap-8 flex-1">
              {/* Profile Photo */}
              <div className="w-48 h-56 flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  src={influencer.imageUrl}
                  alt={influencer.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Info - flex column to push follower stats to bottom */}
              <div className="flex-1 min-w-0 flex flex-col">
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h1 className="text-2xl font-black text-brand-dark font-serif">{influencer.name}</h1>
                    <span className="text-2xl flex-shrink-0 ml-4">{influencer.flag}</span>
                  </div>
                  <p className="text-base font-semibold text-brand-gray mb-0.5">{influencer.category}</p>
                  <p className="text-sm text-brand-gray mb-4">{influencer.city}, {influencer.country}</p>

                  <p className="text-sm text-brand-dark leading-relaxed">{detail.fullBio}</p>
                </div>

                {/* Follower Stats - always pinned to bottom */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-6 mb-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-bold text-sm text-brand-dark">{influencer.followers}</span>
                    </div>
                    {influencer.platforms.includes('instagram') && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-brand-gray" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        <span className="font-bold text-sm text-brand-dark">{detail.instagramFollowers}</span>
                      </div>
                    )}
                    {influencer.platforms.includes('tiktok') && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-brand-gray" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/>
                        </svg>
                        <span className="font-bold text-sm text-brand-dark">{detail.tiktokFollowers}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-brand-gray">Public profile indexed for discovery and analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Key Stats with tabs (matching popup design) */}
        <div className="w-[420px] flex-shrink-0 ml-0">
          <div className="bg-white border border-gray-100 border-t-0 border-l-0 rounded-br-2xl p-6 h-full flex flex-col">
            {/* Stats Tabs - pill style matching popup */}
            <div className="flex gap-1.5 mb-5">
              {(['Key Stats', 'Audience', 'Content'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStatsTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                    activeStatsTab === tab
                      ? 'bg-brand-accent text-white border-brand-accent shadow-sm'
                      : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
              <div className="bg-[#FDFCFB] rounded-2xl p-5 border border-gray-50 shadow-soft">
                {/* Key Stats Tab Content - matching popup */}
                {activeStatsTab === 'Key Stats' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                      <div className="flex flex-col">
                        <span className="text-brand-gray font-serif text-[12px] opacity-70">Brand Fit</span>
                        <span className="text-brand-dark font-serif text-[13px] font-semibold">{influencer.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-brand-gray font-serif text-[12px] opacity-70">Location</span>
                        <span className="text-brand-dark font-serif text-[13px] font-semibold">{influencer.city}, {influencer.country}</span>
                      </div>
                    </div>
                    <div className="space-y-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-serif font-bold text-brand-dark">Mapkats Badges</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-accent text-white px-3 py-1.5 rounded-lg text-[11px] font-bold italic">#{detail.ranking} {influencer.category}</span>
                        <span className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Viewed</span>
                        <span className="bg-[#82A3C4] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Saved</span>
                        <span className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Viewed ({influencer.city})</span>
                        <span className="bg-[#82A3C4] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Saved ({influencer.city})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audience Tab Content - matching popup */}
                {activeStatsTab === 'Audience' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Gender */}
                    <div className="space-y-3">
                      <h4 className="text-[13px] font-serif font-bold text-brand-dark">Gender</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-[11px] font-serif font-semibold text-brand-dark">Women 27.9%</p>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-brand-accent h-full rounded-full" style={{ width: '27.9%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-[11px] font-serif font-semibold text-brand-dark">Men 38.5%</p>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-brand-accent h-full rounded-full" style={{ width: '38.5%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Countries */}
                    <div className="space-y-3">
                      <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top countries</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Australia', pct: '32%' },
                          { name: 'United States', pct: '16%' },
                          { name: 'United Kingdom', pct: '11%' },
                          { name: 'Italy', pct: '5.3%' },
                        ].map((c) => (
                          <span key={c.name} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                            {c.name} ({c.pct})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Top Cities */}
                    <div className="space-y-3">
                      <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top cities</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'Sydney', pct: '41.2%' },
                          { name: 'London', pct: '5.6%' },
                          { name: 'New York', pct: '3.8%' },
                          { name: 'Dublin', pct: '2.5%' },
                        ].map((c) => (
                          <span key={c.name} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                            {c.name} ({c.pct})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Tab Content - matching popup */}
                {activeStatsTab === 'Content' && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Format Performance */}
                    <div className="space-y-3">
                      <h4 className="text-[13px] font-serif font-bold text-brand-dark">Format performance (avg engagement)</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-[11px] font-serif font-semibold text-brand-dark">Photos 4.1%</p>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-brand-accent h-full rounded-full" style={{ width: '41%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-[11px] font-serif font-semibold text-brand-dark">Reels 2.5%</p>
                          </div>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-brand-accent h-full rounded-full" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Content (last 30 days) */}
                    <div className="space-y-3">
                      <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top content (last 30 days)</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Avg views', value: '0' },
                          { label: 'Median views', value: '0' },
                          { label: 'Saves rate', value: '0%' },
                          { label: 'Share rate', value: '0%' },
                        ].map((item) => (
                          <span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                            {item.label}: {item.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cadence */}
                    <div className="space-y-3">
                      <h4 className="text-[13px] font-serif font-bold text-brand-dark">Cadence</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Posts', value: '23' },
                          { label: 'Reels', value: '7' },
                          { label: 'Stories', value: '' },
                          { label: 'Avg posts/week', value: '7' },
                        ].map((item) => (
                          <span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                            {item.label}: {item.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mapkats Ranking Banner - matching popup design */}
            <div className="mt-auto pt-4 border-t border-gray-50 shrink-0">
              <div className="flex items-center gap-4 p-4 bg-orange-50/40 rounded-2xl border border-orange-100/50 shadow-sm">
                <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-100">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-serif font-black text-brand-accent uppercase tracking-widest leading-none mb-1">Mapkats Ranking</p>
                  <p className="text-sm font-serif font-black text-brand-dark leading-tight">
                    #{detail.ranking} Top Influencer in <span className="text-brand-accent">{influencer.category}</span>
                  </p>
                </div>
                <button
                  onClick={() => onNavigateToCategory(influencer.category)}
                  className="bg-white border border-orange-100 text-[10px] font-black text-brand-accent px-4 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all shadow-sm uppercase"
                >
                  View Ranking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Posts Section */}
      <div className="mt-6">
        {/* Platform Tab */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 bg-brand-accent text-white text-xs font-bold px-4 py-2 rounded-lg">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Instagram
          </span>
        </div>

        {/* Posts Grid - 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          {detail.posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                {post.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-brand-dark leading-relaxed line-clamp-3">{post.caption}</p>
                <button className="text-xs font-bold text-brand-dark mt-2 underline hover:text-brand-accent transition-colors">
                  MORE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 space-y-2 text-xs text-brand-gray">
          <p>Instagram content shown is publicly available and displayed for reference only.</p>
          <p>Profile data is based on publicly available information and may not reflect recent changes.</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Search Results
        </button>
      </div>
    </div>
  );
};

export default InfluencerDetailView;
