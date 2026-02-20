
import React, { useState } from 'react';
import { SearchIcon, PlusIcon, PencilSquareIcon, LayersIcon } from '../components/icons/UiIcons';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../components/icons/SocialIcons';
import UniversalSocialSearch from '../components/UniversalSocialSearch';
import InfluencerDetailPopup from '../components/InfluencerDetailPopup';

interface ProCollectionDetailViewProps {
  collectionName: string;
  onBack: () => void;
  backLabel?: string;
}

const ProCollectionDetailView: React.FC<ProCollectionDetailViewProps> = ({ collectionName, onBack, backLabel }) => {
  const tabs = ['Profiles', 'Settings'];
  const [activeTab, setActiveTab] = useState('Profiles');
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);

  // Editable title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(collectionName);

  // Settings state
  const [settingsStatus, setSettingsStatus] = useState('Approved');
  const [settingsDescription, setSettingsDescription] = useState(
    collectionName === "Australia's Best Wellness Educators"
      ? "Australia's best wellness educators."
      : `A curated collection of the best ${collectionName.toLowerCase().replace(/best /i, '').replace(/'s/g, '')}.`
  );
  const [settingsBgColor, setSettingsBgColor] = useState('#27d6bf');
  const [settingsCategories, setSettingsCategories] = useState<string[]>(
    collectionName === "Australia's Best Wellness Educators"
      ? ['Wellness Lifestyle', 'Yoga / Pilates', 'Healthy Lifestyle', 'Nutritionist']
      : ['Bartender']
  );
  const [newCategory, setNewCategory] = useState('');
  const [settingsCountry, setSettingsCountry] = useState('');
  const [displayCarousel, setDisplayCarousel] = useState(false);
  const [displayCampaignSearch, setDisplayCampaignSearch] = useState(false);
  const [displayPublicLists, setDisplayPublicLists] = useState(false);

  // Discover popup
  const [showDiscoverPopup, setShowDiscoverPopup] = useState(false);
  const [discoverTab, setDiscoverTab] = useState<'Pro Collections' | 'Search Database' | 'Add from Campaigns'>('Search Database');
  const [addedFromDiscover, setAddedFromDiscover] = useState<string[]>([]);
  const [dismissedFromDiscover, setDismissedFromDiscover] = useState<string[]>([]);
  const [discoverSearched, setDiscoverSearched] = useState(false);
  const [discoverFilters, setDiscoverFilters] = useState({
    country: '', state: '', city: '', category: '', gender: '',
    hasEmail: false, channel: '', favourite: '',
    audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '',
  });
  const [discoverResults, setDiscoverResults] = useState<any[]>([]);
  const [discoverVisibleCount, setDiscoverVisibleCount] = useState(20);
  const [selectedCampaignSource, setSelectedCampaignSource] = useState<string | null>(null);
  const [expandedDiscoverUsername, setExpandedDiscoverUsername] = useState<string | null>(null);
  const [discoverExpandTab, setDiscoverExpandTab] = useState<'Key Stats' | 'Audience' | 'Content'>('Key Stats');
  const [discoverExpandPost, setDiscoverExpandPost] = useState<{ imageUrl: string; caption: string; likes: number; comments: number } | null>(null);
  const [selectedDiscoverProCollection, setSelectedDiscoverProCollection] = useState<string | null>(null);

  // Remove influencer
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);
  const [removedInfluencers, setRemovedInfluencers] = useState<string[]>([]);

  const allInfluencers = [
    {
      name: 'Bec Stewart', username: 'becstewart__',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      category: 'Healthy Lifestyle', audience: '438,381', value: '7,649.76',
      location: 'Perth', region: 'AU', flag: '🇦🇺',
      email: 'bec@thehabittracker.com.au',
      platforms: ['instagram', 'tiktok'],
      platformStats: {
        instagram: { followers: '438,381', value: '$7,649.76' },
        tiktok: { followers: '12,400', value: '$216.42' },
      },
      posts: 2, stories: 0, isFavourite: false, isGeocoded: true,
      followers: '438,381', estimatedValue: '$7,649.76',
    },
    {
      name: 'Miranda Brady', username: 'mirandabrady',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      category: 'Healthy Lifestyle', audience: '856,943', value: '14,953.66',
      location: 'Perth', region: 'AU', flag: '🇦🇺',
      email: 'miranda@vivemanagement.com.au',
      platforms: ['instagram', 'youtube', 'tiktok'],
      platformStats: {
        instagram: { followers: '856,943', value: '$14,953.66' },
        youtube: { followers: '24,100', value: '$420.62' },
        tiktok: { followers: '31,200', value: '$544.69' },
      },
      posts: 3, stories: 0, isFavourite: false, isGeocoded: true,
      followers: '856,943', estimatedValue: '$14,953.66',
    },
    {
      name: 'Aidan Muir', username: 'aidan_the_dietitian',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      category: 'Nutritionist', audience: '113,101', value: '1,973.62',
      location: 'Brisbane', region: 'AU', flag: '🇦🇺',
      email: 'aidan@idealnutrition.com.au',
      platforms: ['instagram', 'tiktok'],
      platformStats: {
        instagram: { followers: '113,101', value: '$1,973.62' },
        tiktok: { followers: '8,900', value: '$155.33' },
      },
      posts: 1, stories: 0, isFavourite: false, isGeocoded: true,
      followers: '113,101', estimatedValue: '$1,973.62',
    },
    {
      name: 'Coen Sealey', username: 'reform.nutrition.training',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      category: 'Nutritionist', audience: '461,623', value: '8,056.02',
      location: 'Melbourne', region: 'AU', flag: '🇦🇺',
      email: '',
      platforms: ['instagram', 'tiktok'],
      platformStats: {
        instagram: { followers: '461,623', value: '$8,056.02' },
        tiktok: { followers: '15,600', value: '$272.24' },
      },
      posts: 1, stories: 0, isFavourite: false, isGeocoded: true,
      followers: '461,623', estimatedValue: '$8,056.02',
    },
    {
      name: 'Ashira', username: 'ashparaskevas',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      category: 'Wellness Lifestyle', audience: '139,379', value: '2,432.16',
      location: 'Sydney', region: 'AU', flag: '🇦🇺',
      email: '',
      platforms: ['instagram', 'tiktok'],
      platformStats: {
        instagram: { followers: '139,379', value: '$2,432.16' },
        tiktok: { followers: '5,200', value: '$90.74' },
      },
      posts: 2, stories: 0, isFavourite: false, isGeocoded: true,
      followers: '139,379', estimatedValue: '$2,432.16',
    },
    {
      name: 'Shona Vertue', username: 'shona_vertue',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      category: 'Wellness Lifestyle', audience: '651,381', value: '11,366.60',
      location: 'Sydney', region: 'AU', flag: '🇦🇺',
      email: 'shona@shonavertue.com',
      platforms: ['instagram', 'youtube', 'tiktok'],
      platformStats: {
        instagram: { followers: '651,381', value: '$11,366.60' },
        youtube: { followers: '89,400', value: '$1,560.42' },
        tiktok: { followers: '44,200', value: '$771.49' },
      },
      posts: 1, stories: 0, isFavourite: true, isGeocoded: true,
      followers: '651,381', estimatedValue: '$11,366.60',
    },
  ];

  const influencers = allInfluencers.filter(inf => !removedInfluencers.includes(inf.username));

  // Database influencers for discover
  const databaseInfluencers = [
    { name: 'Sarah Chen', username: 'sarahchenofficial', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Sydney', region: 'AU', state: 'New South Wales', flag: '🇦🇺', followers: '412,890', estimatedValue: '$7,204.12', platforms: ['instagram', 'youtube'], gender: 'Female', hasEmail: true },
    { name: 'Emma Whitfield', username: 'emmawhitfield', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', category: 'Healthy Lifestyle', location: 'London', region: 'UK', state: 'England', flag: '🇬🇧', followers: '1,245,000', estimatedValue: '$21,730.50', platforms: ['instagram', 'youtube', 'tiktok'], gender: 'Female', hasEmail: false },
    { name: 'Nina Takahashi', username: 'ninatakahashi', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', category: 'Wellness Lifestyle', location: 'Tokyo', region: 'JP', state: 'Kanto', flag: '🇯🇵', followers: '198,760', estimatedValue: '$3,468.27', platforms: ['instagram'], gender: 'Female', hasEmail: false },
    { name: 'Olivia Harper', username: 'oliviaharper', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', category: 'Nutritionist', location: 'Perth', region: 'AU', state: 'Western Australia', flag: '🇦🇺', followers: '95,420', estimatedValue: '$1,665.12', platforms: ['instagram', 'tiktok'], gender: 'Female', hasEmail: true },
    { name: 'Jake Morrison', username: 'jakemorrison_', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', category: 'Yoga', location: 'Brisbane', region: 'AU', state: 'Queensland', flag: '🇦🇺', followers: '156,200', estimatedValue: '$2,725.89', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: true },
    { name: 'Liam O\'Brien', username: 'liamobrienau', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', category: 'Healthy Lifestyle', location: 'Adelaide', region: 'AU', state: 'South Australia', flag: '🇦🇺', followers: '67,830', estimatedValue: '$1,183.74', platforms: ['instagram', 'youtube'], gender: 'Male', hasEmail: true },
  ];

  const countryNames: Record<string, string> = { 'AU': 'Australia', 'US': 'United States', 'UK': 'United Kingdom', 'FR': 'France', 'ID': 'Indonesia', 'JP': 'Japan', 'SG': 'Singapore', 'IN': 'India', 'KR': 'South Korea', 'VN': 'Vietnam', 'IT': 'Italy', 'NZ': 'New Zealand' };

  const handleDiscoverSearch = () => {
    const results = databaseInfluencers.filter((inf) => {
      if (discoverFilters.country) {
        const query = discoverFilters.country.toLowerCase();
        const countryFullName = (countryNames[inf.region] || '').toLowerCase();
        const matchesRegion = inf.region.toLowerCase().includes(query);
        const matchesFullName = countryFullName.includes(query);
        if (!matchesRegion && !matchesFullName) return false;
      }
      if (discoverFilters.state && !inf.state.toLowerCase().includes(discoverFilters.state.toLowerCase())) return false;
      if (discoverFilters.city && !inf.location.toLowerCase().includes(discoverFilters.city.toLowerCase())) return false;
      if (discoverFilters.category && inf.category !== discoverFilters.category) return false;
      if (discoverFilters.gender && inf.gender !== discoverFilters.gender) return false;
      if (discoverFilters.hasEmail && !inf.hasEmail) return false;
      if (discoverFilters.channel && !inf.platforms.includes(discoverFilters.channel)) return false;
      return true;
    });
    setDiscoverResults(results);
    setDiscoverSearched(true);
    setDismissedFromDiscover([]);
    setDiscoverVisibleCount(20);
  };

  const handleAddInfluencerToCollection = (username: string) => {
    setAddedFromDiscover([...addedFromDiscover, username]);
  };

  const handleDismissFromDiscover = (username: string) => {
    setDismissedFromDiscover([...dismissedFromDiscover, username]);
  };

  const handleToggleDiscoverExpand = (username: string) => {
    if (expandedDiscoverUsername === username) {
      setExpandedDiscoverUsername(null);
      setDiscoverExpandPost(null);
    } else {
      setExpandedDiscoverUsername(username);
      setDiscoverExpandTab('Key Stats');
      setDiscoverExpandPost(null);
    }
  };

  const discoverRecentPosts = [
    { imageUrl: 'https://picsum.photos/seed/disc-1/400/400', caption: 'Just wrapped up an incredible shoot with the team today. So grateful for these moments ✨', likes: 1842, comments: 67 },
    { imageUrl: 'https://picsum.photos/seed/disc-2/400/400', caption: 'New recipe alert! This one has been in development for weeks and it\'s finally ready 🍽️', likes: 3205, comments: 142 },
    { imageUrl: 'https://picsum.photos/seed/disc-3/400/400', caption: 'Golden hour in the city never gets old. Who else loves this time of day? 🌅', likes: 956, comments: 34 },
    { imageUrl: 'https://picsum.photos/seed/disc-4/400/400', caption: 'Behind the scenes content coming your way — this campaign is going to be something special 📸', likes: 2471, comments: 89 },
    { imageUrl: 'https://picsum.photos/seed/disc-5/400/400', caption: 'Weekend vibes with great company. Sometimes you just need to unplug and enjoy the moment ☀️', likes: 1567, comments: 52 },
    { imageUrl: 'https://picsum.photos/seed/disc-6/400/400', caption: 'Excited to announce our latest collaboration! Stay tuned for the full reveal next week 🔥', likes: 4120, comments: 198 },
  ];

  const handleAddCategory = () => {
    if (newCategory.trim() && !settingsCategories.includes(newCategory.trim())) {
      setSettingsCategories([...settingsCategories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setSettingsCategories(settingsCategories.filter(c => c !== cat));
  };

  const totalInfluencers = influencers.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb / Back */}
      <button onClick={onBack} className="text-xs font-bold text-brand-gray hover:text-brand-accent flex items-center gap-1 uppercase tracking-widest">
        <span>←</span> {backLabel || 'Back to Pro Collections'}
      </button>

      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); if (e.key === 'Escape') { setEditedTitle(collectionName); setIsEditingTitle(false); } }}
                autoFocus
                className="text-3xl font-serif font-black tracking-tight text-brand-dark bg-transparent border-b-2 border-brand-accent outline-none py-1 min-w-[200px]"
              />
              <button
                onClick={() => setIsEditingTitle(false)}
                className="p-2 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                title="Save title"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onClick={() => { setEditedTitle(collectionName); setIsEditingTitle(false); }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Cancel"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">
                {editedTitle} <span className="text-brand-gray opacity-40 font-sans font-bold text-2xl">({totalInfluencers})</span>
              </h1>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="p-2 text-brand-gray hover:text-brand-accent transition-colors"
                title="Edit collection name"
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <nav className="flex items-center bg-white p-1 rounded-xl shadow-soft border border-gray-100 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                tab === activeTab
                  ? 'bg-black text-white shadow-md'
                  : 'text-brand-gray hover:bg-gray-100 hover:text-brand-dark'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'Profiles' ? (
        <>
          {/* Action Bar */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex flex-col xl:flex-row items-stretch xl:items-end gap-8">
              <div className="flex items-center gap-2 shrink-0 h-[38px] xl:mb-0.5">
                <button className="bg-brand-accent text-white p-3 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center">
                  <SearchIcon className="w-4 h-4" />
                </button>
                <button className="border border-brand-light-gray p-3 rounded-xl text-brand-gray hover:bg-gray-50 transition-all flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <UniversalSocialSearch />
              <div className="flex-1" />
              <div className="shrink-0">
                <button
                  onClick={() => { setShowDiscoverPopup(true); setDiscoverTab('Search Database'); setDiscoverSearched(false); setDiscoverResults([]); setDiscoverFilters({ country: '', state: '', city: '', category: '', gender: '', hasEmail: false, channel: '', favourite: '', audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '' }); setSelectedCampaignSource(null); setSelectedDiscoverProCollection(null); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); }}
                  className="bg-brand-accent text-white font-black py-2.5 px-8 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase whitespace-nowrap h-[38px] flex items-center justify-center xl:mb-0.5"
                >
                  Add Influencers
                </button>
              </div>
            </div>
          </div>

          {/* Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {influencers.map((inf, idx) => (
              <div key={idx} className="cursor-pointer" onClick={() => setSelectedInfluencer(inf)}>
                <ProCollectionInfluencerCard
                  {...inf}
                  onRemove={(username: string) => setShowRemoveConfirm(username)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Settings Tab */
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Status, Author, Editor, Stats */}
            <div className="space-y-6">
              <div className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Created: Feb-10-2026</div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Status</label>
                  <select
                    value={settingsStatus}
                    onChange={(e) => setSettingsStatus(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none"
                  >
                    <option>Approved</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Author</label>
                  <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-dark bg-gray-50">
                    Andrew Tweedie
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Editor</label>
                  <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-dark bg-gray-50 flex items-center justify-between cursor-pointer hover:border-brand-accent transition-colors">
                    Andrew Tweedie
                    <svg className="w-4 h-4 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h3 className="text-sm font-black text-brand-dark">Influencers</h3>
                <div className="space-y-1 text-[13px] text-brand-dark">
                  <p>Total: <span className="font-bold">{totalInfluencers}</span></p>
                  <p>Audience: <span className="font-bold">4.1M</span></p>
                  <p>Estimated Media Value: <span className="font-bold">$71,288.15</span></p>
                </div>
              </div>
            </div>

            {/* Center Column - Key Image, Description, Background, Categories, Countries */}
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Key Image</label>
                <div className="w-40 h-52 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300"
                    alt="Collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    <button className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <button className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center text-white text-xs hover:brightness-110 transition-all">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Description</label>
                <textarea
                  value={settingsDescription}
                  onChange={(e) => setSettingsDescription(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Background</label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                    style={{ backgroundColor: settingsBgColor }}
                  />
                  <input
                    type="text"
                    value={settingsBgColor}
                    onChange={(e) => setSettingsBgColor(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none w-32"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Categories</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {settingsCategories.map((cat) => (
                    <span key={cat} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-[11px] font-bold">
                      {cat}
                      <button onClick={() => handleRemoveCategory(cat)} className="text-emerald-500 hover:text-red-500 transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add category..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none"
                  />
                  <button onClick={handleAddCategory} className="bg-brand-accent text-white px-3 py-2 rounded-xl text-xs font-bold hover:brightness-110 transition-all">
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-brand-gray uppercase tracking-wider block mb-2">Countries</label>
                <input
                  type="text"
                  placeholder="Country"
                  value={settingsCountry}
                  onChange={(e) => setSettingsCountry(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none"
                />
              </div>

              {/* Save / Publish Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="bg-brand-accent text-white font-bold py-2.5 px-8 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase">
                  Save
                </button>
                <button className="bg-brand-dark/20 text-brand-dark/50 font-bold py-2.5 px-8 rounded-xl text-xs tracking-widest uppercase cursor-not-allowed">
                  Publish
                </button>
              </div>
            </div>

            {/* Right Column - Display On, Usage */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-black text-brand-dark mb-4">Display On:</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={displayCarousel}
                      onChange={(e) => setDisplayCarousel(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">Carousel</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={displayCampaignSearch}
                      onChange={(e) => setDisplayCampaignSearch(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">Campaign Search</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={displayPublicLists}
                      onChange={(e) => setDisplayPublicLists(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">Public Lists</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-black text-brand-dark mb-2">Usage:</h3>
                <p className="text-[13px] text-brand-gray">No active usage data.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setShowRemoveConfirm(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 z-50 w-[400px]">
            <h3 className="text-lg font-black text-brand-dark mb-2">Remove Influencer</h3>
            <p className="text-sm text-brand-gray mb-6">Are you sure you want to remove <span className="font-bold text-brand-dark">@{showRemoveConfirm}</span> from this collection?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowRemoveConfirm(null)} className="px-5 py-2 rounded-xl text-sm font-bold text-brand-gray hover:bg-gray-100 transition-all">Cancel</button>
              <button
                onClick={() => { setRemovedInfluencers([...removedInfluencers, showRemoveConfirm]); setShowRemoveConfirm(null); }}
                className="px-5 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}

      {/* Discover Influencers Popup */}
      {showDiscoverPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDiscoverPopup(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-black text-brand-dark">Discover Influencers</h2>
                <button
                  onClick={() => setShowDiscoverPopup(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                {(['Pro Collections', 'Search Database', 'Add from Campaigns'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setDiscoverTab(tab); setDiscoverSearched(false); setDiscoverResults([]); setSelectedCampaignSource(null); setSelectedDiscoverProCollection(null); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); }}
                    className={`flex-1 px-4 py-2 text-[11px] font-black rounded-lg transition-all ${
                      discoverTab === tab
                        ? 'bg-brand-accent text-white shadow-md'
                        : 'text-brand-gray hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div
              className="flex-1 overflow-y-auto p-6 scrollbar-hide"
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                if (target.scrollHeight - target.scrollTop - target.clientHeight < 120 && discoverSearched) {
                  const visibleCount = discoverResults.filter(inf => !dismissedFromDiscover.includes(inf.username)).length;
                  if (discoverVisibleCount < visibleCount) {
                    setDiscoverVisibleCount(prev => Math.min(prev + 20, visibleCount));
                  }
                }
              }}
            >

              {/* ===== SEARCH DATABASE TAB ===== */}
              {discoverTab === 'Search Database' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Filter fields */}
                  <div className="space-y-3">
                    <select
                      value={discoverFilters.country}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, country: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">All Countries</option>
                      <option value="AU">Australia</option>
                      <option value="FR">France</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IT">Italy</option>
                      <option value="JP">Japan</option>
                      <option value="NZ">New Zealand</option>
                      <option value="SG">Singapore</option>
                      <option value="KR">South Korea</option>
                      <option value="UK">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="VN">Vietnam</option>
                    </select>
                    <input
                      type="text"
                      placeholder="State"
                      value={discoverFilters.state}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, state: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={discoverFilters.city}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, city: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
                    />
                    <select
                      value={discoverFilters.category}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, category: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="Wellness Lifestyle">Wellness Lifestyle</option>
                      <option value="Healthy Lifestyle">Healthy Lifestyle</option>
                      <option value="Nutritionist">Nutritionist</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Food">Food</option>
                      <option value="Home Cooking">Home Cooking</option>
                    </select>
                    <select
                      value={discoverFilters.gender}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, gender: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <label className="flex items-center gap-2.5 py-1 px-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={discoverFilters.hasEmail}
                        onChange={(e) => setDiscoverFilters({ ...discoverFilters, hasEmail: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                      />
                      <span className="text-[12px] font-semibold text-brand-dark">Has Email</span>
                    </label>

                    <div className="h-px bg-gray-100" />

                    <select
                      value={discoverFilters.channel}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, channel: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Channel</option>
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                    <select
                      value={discoverFilters.favourite}
                      onChange={(e) => setDiscoverFilters({ ...discoverFilters, favourite: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Favourite</option>
                      <option value="yes">Favourites Only</option>
                    </select>

                    <div className="h-px bg-gray-100" />

                    {/* Audience range */}
                    <div>
                      <p className="text-[11px] font-bold text-brand-dark mb-2">Audience</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="From" value={discoverFilters.audienceFrom} onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceFrom: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                        <input type="text" placeholder="To" value={discoverFilters.audienceTo} onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceTo: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                      </div>
                    </div>

                    {/* Media Value range */}
                    <div>
                      <p className="text-[11px] font-bold text-brand-dark mb-2">Media Value</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="From" value={discoverFilters.mediaValueFrom} onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueFrom: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                        <input type="text" placeholder="To" value={discoverFilters.mediaValueTo} onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueTo: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => { setDiscoverFilters({ country: '', state: '', city: '', category: '', gender: '', hasEmail: false, channel: '', favourite: '', audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '' }); setDiscoverSearched(false); setDiscoverResults([]); }}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold text-[11px] rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDiscoverSearch}
                      className="px-8 py-2.5 bg-brand-accent text-white font-black text-[11px] rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
                    >
                      Search
                    </button>
                  </div>

                  {/* Results */}
                  {discoverSearched && (() => {
                    const visibleResults = discoverResults.filter(inf => !dismissedFromDiscover.includes(inf.username));
                    const paginatedResults = visibleResults.slice(0, discoverVisibleCount);
                    const hasMore = paginatedResults.length < visibleResults.length;
                    return (
                    <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-black text-brand-dark uppercase tracking-widest">
                          {visibleResults.length} Result{visibleResults.length !== 1 ? 's' : ''} Found
                        </p>
                        {addedFromDiscover.length > 0 && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            {addedFromDiscover.length} added to collection
                          </span>
                        )}
                      </div>

                      {visibleResults.length === 0 ? (
                        <div className="text-center py-10">
                          <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                            <SearchIcon className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-[13px] font-semibold text-gray-900">No influencers found</p>
                          <p className="text-[12px] text-gray-500 mt-1">Try adjusting your filters</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {paginatedResults.map((inf: any) => {
                            const isAdded = addedFromDiscover.includes(inf.username);
                            const isExpanded = expandedDiscoverUsername === inf.username;
                            return (
                              <div key={inf.username} className="flex flex-col">
                                <div
                                  onClick={() => handleToggleDiscoverExpand(inf.username)}
                                  className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                                    isExpanded ? 'bg-brand-accent/5 border-brand-accent/30 rounded-b-none' : isAdded ? 'bg-emerald-50/40 border-emerald-200' : 'bg-[#FDFCFB] border-gray-100 hover:border-gray-200'
                                  }`}
                                >
                                  <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white ring-1 ring-gray-100 shrink-0">
                                    <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-[13px] font-black text-brand-dark truncate">{inf.name}</h4>
                                      {inf.hasEmail && (
                                        <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gray mt-0.5">
                                      <span>{inf.flag} {inf.location}</span>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                      <span>{inf.category}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                      <div className="flex items-center gap-1.5">
                                        {inf.platforms.includes('instagram') && <div className="w-3.5 h-3.5"><InstagramIcon /></div>}
                                        {inf.platforms.includes('youtube') && <div className="w-3.5 h-3.5"><YouTubeIcon /></div>}
                                        {inf.platforms.includes('tiktok') && <div className="w-3.5 h-3.5"><TikTokIcon /></div>}
                                      </div>
                                      <span className="text-[10px] font-bold text-brand-gray">{inf.followers}</span>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                      <span className="text-[10px] font-black text-brand-accent">{inf.estimatedValue}</span>
                                    </div>
                                  </div>
                                  <svg className={`w-4 h-4 text-brand-gray shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  </svg>
                                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      onClick={() => handleAddInfluencerToCollection(inf.username)}
                                      disabled={isAdded}
                                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                        isAdded
                                          ? 'bg-emerald-500 text-white shadow-md cursor-default'
                                          : 'bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:border-emerald-500'
                                      }`}
                                      title={isAdded ? 'Added to collection' : 'Add to collection'}
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </button>
                                    {!isAdded && (
                                      <button
                                        onClick={() => handleDismissFromDiscover(inf.username)}
                                        className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500 transition-all"
                                        title="Remove from results"
                                      >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                </div>

                                {/* Expanded profile section */}
                                {isExpanded && (
                                  <div className="border border-t-0 border-brand-accent/30 rounded-b-xl bg-[#FDFCFB] animate-in slide-in-from-top-2 fade-in duration-300">
                                    <div className="flex gap-1 px-4 pt-4 pb-3 border-b border-gray-100">
                                      {(['Key Stats', 'Audience', 'Content'] as const).map((stab) => (
                                        <button key={stab} onClick={(e) => { e.stopPropagation(); setDiscoverExpandTab(stab); setDiscoverExpandPost(null); }} className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase transition-all border ${discoverExpandTab === stab ? 'bg-brand-accent text-white border-brand-accent shadow-sm' : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'}`}>{stab}</button>
                                      ))}
                                    </div>
                                    <div className="p-4">
                                      {discoverExpandTab === 'Key Stats' && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                            <div className="flex flex-col"><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Brand Fit</span><span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.category}</span></div>
                                            <div className="flex flex-col"><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Location</span><span className="text-[13px] font-black text-brand-dark mt-0.5">{inf.flag} {inf.location}, {countryNames[inf.region] || inf.region}</span></div>
                                          </div>
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[11px] font-black text-brand-dark">Mapkats Badges</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              <span className="bg-brand-accent text-white px-2.5 py-1 rounded-lg text-[10px] font-bold italic">#{Math.floor(Math.random() * 20) + 1} {inf.category}</span>
                                              <span className="bg-brand-dark text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Viewed</span>
                                              <span className="bg-[#82A3C4] text-white px-2.5 py-1 rounded-lg text-[10px] font-semibold">Top 10 Saved</span>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3 p-3 bg-orange-50/40 rounded-xl border border-orange-100/50">
                                            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg></div>
                                            <div className="flex-1"><p className="text-[9px] font-black text-brand-accent uppercase tracking-widest">Mapkats Ranking</p><p className="text-[12px] font-black text-brand-dark">#{Math.floor(Math.random() * 15) + 1} in <span className="text-brand-accent">{inf.category}</span></p></div>
                                          </div>
                                          <div className="space-y-2 pt-3 border-t border-gray-100">
                                            <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest opacity-60">Recent</p>
                                            {discoverExpandPost && (
                                              <div className="bg-white rounded-xl border border-gray-100 shadow-soft overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 mb-3">
                                                <div className="flex">
                                                  <div className="w-[55%] aspect-square max-h-[200px]"><img src={discoverExpandPost.imageUrl} alt="Post" className="w-full h-full object-cover" /></div>
                                                  <div className="w-[45%] p-3 flex flex-col">
                                                    <p className="text-[11px] font-medium text-brand-dark leading-relaxed flex-1 line-clamp-5">{discoverExpandPost.caption}</p>
                                                    <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-100">
                                                      <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray"><svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>{discoverExpandPost.likes.toLocaleString()}</span>
                                                      <span className="flex items-center gap-1 text-[10px] font-bold text-brand-gray"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>{discoverExpandPost.comments}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(null); }} className="w-full py-2 text-center text-[10px] font-bold text-brand-gray bg-gray-50 hover:bg-gray-100 transition-colors border-t border-gray-100">Close post</button>
                                              </div>
                                            )}
                                            <div className="grid grid-cols-6 gap-1.5">
                                              {discoverRecentPosts.map((post, i) => (
                                                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group relative border border-gray-50" onClick={(e) => { e.stopPropagation(); setDiscoverExpandPost(discoverExpandPost?.imageUrl === post.imageUrl ? null : post); }}>
                                                  <img src={post.imageUrl} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"><svg className="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg></div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      {discoverExpandTab === 'Audience' && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                          <div className="space-y-2"><p className="text-[11px] font-black text-brand-dark">Gender</p><div className="space-y-2"><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Women {inf.gender === 'Female' ? '58.3%' : '27.9%'}</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: inf.gender === 'Female' ? '58.3%' : '27.9%' }}></div></div></div><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Men {inf.gender === 'Female' ? '38.5%' : '68.4%'}</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-[#82A3C4] h-full rounded-full" style={{ width: inf.gender === 'Female' ? '38.5%' : '68.4%' }}></div></div></div></div></div>
                                          <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top countries</p><div className="flex flex-wrap gap-1.5"><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{countryNames[inf.region] || inf.region} (42%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United States (18%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">United Kingdom (9%)</span></div></div>
                                          <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top cities</p><div className="flex flex-wrap gap-1.5"><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{inf.location} (35.2%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">London (6.8%)</span><span className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">New York (4.5%)</span></div></div>
                                        </div>
                                      )}
                                      {discoverExpandTab === 'Content' && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                          <div className="space-y-2"><p className="text-[11px] font-black text-brand-dark">Format performance (avg engagement)</p><div className="space-y-2"><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Photos 4.1%</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: '41%' }}></div></div></div><div><div className="flex justify-between items-center mb-1"><p className="text-[10px] font-semibold text-brand-dark">Reels 2.5%</p></div><div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden"><div className="bg-brand-accent h-full rounded-full" style={{ width: '25%' }}></div></div></div></div></div>
                                          <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Top content (last 30 days)</p><div className="flex flex-wrap gap-1.5">{[{ label: 'Avg views', value: '12.4K' },{ label: 'Median views', value: '8.2K' },{ label: 'Saves rate', value: '2.1%' },{ label: 'Share rate', value: '0.8%' }].map((item) => (<span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{item.label}: {item.value}</span>))}</div></div>
                                          <div className="space-y-2 pt-3 border-t border-gray-100"><p className="text-[11px] font-black text-brand-dark">Cadence</p><div className="flex flex-wrap gap-1.5">{[{ label: 'Posts', value: '23' },{ label: 'Reels', value: '7' },{ label: 'Stories', value: '12' },{ label: 'Avg posts/week', value: '5' }].map((item) => (<span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[10px] font-semibold px-3 py-1.5 rounded-full">{item.label}: {item.value}</span>))}</div></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {hasMore && (
                            <div className="pt-3 pb-1">
                              <button
                                onClick={() => setDiscoverVisibleCount(discoverVisibleCount + 20)}
                                className="w-full py-3 text-center text-[11px] font-bold text-brand-accent bg-brand-accent/5 border border-brand-accent/15 rounded-xl hover:bg-brand-accent/10 transition-all"
                              >
                                Load more ({visibleResults.length - paginatedResults.length} remaining)
                              </button>
                            </div>
                          )}

                          {!hasMore && visibleResults.length > 0 && (
                            <p className="text-center text-[10px] font-bold text-gray-400 pt-3 uppercase tracking-widest">End of results</p>
                          )}
                        </div>
                      )}
                    </div>
                    );
                  })()}
                </div>
              )}

              {/* ===== PRO COLLECTIONS TAB ===== */}
              {discoverTab === 'Pro Collections' && (
                <div className="animate-in fade-in duration-200">
                  {!selectedDiscoverProCollection ? (
                    <div className="space-y-6">
                      <p className="text-[12px] text-brand-gray leading-relaxed">Browse curated collections of top-performing influencers handpicked by our team.</p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Top Food & Bev AU', count: 12, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600', categories: ['Food', 'Home Cooking'] },
                          { name: 'Lifestyle Leaders', count: 8, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600', categories: ['Lifestyle Media', 'Celebrity'] },
                          { name: 'Fitness & Wellness', count: 7, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600', categories: ['Wellness Lifestyle'] },
                          { name: 'Travel Creators', count: 6, image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=600', categories: [] },
                        ].map((col) => (
                          <div
                            key={col.name}
                            onClick={() => { setSelectedDiscoverProCollection(col.name); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); setDismissedFromDiscover([]); }}
                            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-panel hover:-translate-y-0.5 transition-all cursor-pointer group"
                          >
                            <div className="relative w-full h-32 overflow-hidden">
                              <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="px-4 py-3">
                              <h4 className="text-[13px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{col.name}</h4>
                              <p className="text-[11px] font-bold text-brand-gray mt-0.5">{col.count} Influencers</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    (() => {
                      const collectionMap: Record<string, string[]> = {
                        'Top Food & Bev AU': ['Food', 'Home Cooking'],
                        'Lifestyle Leaders': ['Lifestyle Media', 'Celebrity'],
                        'Fitness & Wellness': ['Wellness Lifestyle'],
                        'Travel Creators': [],
                      };
                      const filterCats = collectionMap[selectedDiscoverProCollection] || [];
                      const collectionInfluencers = filterCats.length > 0
                        ? databaseInfluencers.filter(inf => filterCats.includes(inf.category))
                        : databaseInfluencers;
                      const visibleCollectionResults = collectionInfluencers.filter(inf => !dismissedFromDiscover.includes(inf.username));

                      return (
                        <div className="space-y-4">
                          <button
                            onClick={() => { setSelectedDiscoverProCollection(null); setExpandedDiscoverUsername(null); setDiscoverExpandPost(null); }}
                            className="flex items-center gap-1.5 text-[11px] font-black text-brand-accent hover:underline uppercase tracking-wider"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to collections
                          </button>

                          <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/15 rounded-xl px-4 py-3 flex items-center gap-3">
                            <LayersIcon className="w-5 h-5 text-brand-accent shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-[13px] font-black text-brand-dark">{selectedDiscoverProCollection}</span>
                              <span className="text-[11px] font-bold text-brand-gray ml-2">({visibleCollectionResults.length} influencers)</span>
                            </div>
                            {addedFromDiscover.length > 0 && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
                                {addedFromDiscover.length} added
                              </span>
                            )}
                            {(() => {
                              const notYetAdded = visibleCollectionResults.filter((inf: any) => !addedFromDiscover.includes(inf.username));
                              const allAdded = notYetAdded.length === 0;
                              return (
                                <button
                                  onClick={() => { if (!allAdded) { const newUsernames = notYetAdded.map((inf: any) => inf.username); setAddedFromDiscover([...addedFromDiscover, ...newUsernames]); } }}
                                  disabled={allAdded}
                                  className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                                    allAdded
                                      ? 'bg-emerald-50 text-emerald-400 border border-emerald-100 cursor-default'
                                      : 'bg-brand-accent text-white shadow-sm hover:bg-brand-accent/90 hover:shadow-md'
                                  }`}
                                >
                                  {allAdded ? (
                                    <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>All Added</>
                                  ) : (
                                    <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Add All</>
                                  )}
                                </button>
                              );
                            })()}
                          </div>

                          {visibleCollectionResults.length === 0 ? (
                            <div className="text-center py-10">
                              <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3"><SearchIcon className="w-6 h-6 text-gray-400" /></div>
                              <p className="text-[13px] font-semibold text-gray-900">No influencers remaining</p>
                              <p className="text-[12px] text-gray-500 mt-1">All influencers have been dismissed</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {visibleCollectionResults.map((inf: any) => {
                                const isAdded = addedFromDiscover.includes(inf.username);
                                const isExpanded = expandedDiscoverUsername === inf.username;
                                return (
                                  <div key={inf.username} className="flex flex-col">
                                    <div
                                      onClick={() => handleToggleDiscoverExpand(inf.username)}
                                      className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
                                        isExpanded ? 'bg-brand-accent/5 border-brand-accent/30 rounded-b-none' : isAdded ? 'bg-emerald-50/40 border-emerald-200' : 'bg-[#FDFCFB] border-gray-100 hover:border-gray-200'
                                      }`}
                                    >
                                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white ring-1 ring-gray-100 shrink-0">
                                        <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <h4 className="text-[13px] font-black text-brand-dark truncate">{inf.name}</h4>
                                          {inf.hasEmail && (<svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gray mt-0.5">
                                          <span>{inf.flag} {inf.location}</span><span className="w-1 h-1 bg-gray-300 rounded-full" /><span>{inf.category}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1">
                                          <div className="flex items-center gap-1.5">
                                            {inf.platforms.includes('instagram') && <div className="w-3.5 h-3.5"><InstagramIcon /></div>}
                                            {inf.platforms.includes('youtube') && <div className="w-3.5 h-3.5"><YouTubeIcon /></div>}
                                            {inf.platforms.includes('tiktok') && <div className="w-3.5 h-3.5"><TikTokIcon /></div>}
                                          </div>
                                          <span className="text-[10px] font-bold text-brand-gray">{inf.followers}</span><span className="w-1 h-1 bg-gray-300 rounded-full" /><span className="text-[10px] font-black text-brand-accent">{inf.estimatedValue}</span>
                                        </div>
                                      </div>
                                      <svg className={`w-4 h-4 text-brand-gray shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                      <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => handleAddInfluencerToCollection(inf.username)} disabled={isAdded} className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isAdded ? 'bg-emerald-500 text-white shadow-md cursor-default' : 'bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:border-emerald-500'}`} title={isAdded ? 'Added to collection' : 'Add to collection'}>
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        </button>
                                        {!isAdded && (
                                          <button onClick={() => handleDismissFromDiscover(inf.username)} className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500 transition-all" title="Remove from results">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })()
                  )}
                </div>
              )}

              {/* ===== ADD FROM CAMPAIGNS TAB ===== */}
              {discoverTab === 'Add from Campaigns' && (
                <div className="animate-in fade-in duration-200">
                  {!selectedCampaignSource ? (
                    <div className="space-y-4">
                      <p className="text-[11px] font-bold text-brand-dark">Add from Campaigns</p>
                      <div className="space-y-1">
                        {[
                          { name: 'New Campaign', count: 12 },
                          { name: 'Firelli', count: 34 },
                          { name: 'Starlino Vermouth', count: 28 },
                          { name: 'Starlino', count: 19 },
                          { name: 'Proof Drinks', count: 45 },
                          { name: 'Testing', count: 8 },
                          { name: 'Starlino Brands', count: 22 },
                          { name: 'Starlino LGBT', count: 15 },
                          { name: 'Starlino Ambassadors', count: 31 },
                          { name: "Greg's Malfy Influencers", count: 27 },
                          { name: 'Confirmed Influencers', count: 52 },
                          { name: 'Discover Italia', count: 18 },
                          { name: 'Target List', count: 41 },
                          { name: 'Stambecco', count: 23 },
                        ].map((camp) => (
                          <div
                            key={camp.name}
                            onClick={() => { setSelectedCampaignSource(camp.name); setDiscoverSearched(false); setDiscoverResults([]); setDiscoverFilters({ country: '', state: '', city: '', category: '', gender: '', hasEmail: false, channel: '', favourite: '', audienceFrom: '', audienceTo: '', mediaValueFrom: '', mediaValueTo: '' }); }}
                            className="py-2.5 px-3 text-[13px] font-medium text-brand-dark hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                          >
                            {camp.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={() => { setSelectedCampaignSource(null); setDiscoverSearched(false); setDiscoverResults([]); }}
                        className="flex items-center gap-1.5 text-[11px] font-black text-brand-accent hover:underline uppercase tracking-wider"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to campaigns
                      </button>

                      <div className="bg-brand-accent/5 border border-brand-accent/15 rounded-xl px-4 py-3 flex items-center gap-3">
                        <svg className="w-4 h-4 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span className="text-[12px] font-bold text-brand-dark">Searching within: <span className="text-brand-accent">{selectedCampaignSource}</span></span>
                      </div>

                      {/* Same filter fields */}
                      <div className="space-y-3">
                        <select value={discoverFilters.country} onChange={(e) => setDiscoverFilters({ ...discoverFilters, country: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">All Countries</option>
                          <option value="AU">Australia</option><option value="FR">France</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IT">Italy</option><option value="JP">Japan</option><option value="NZ">New Zealand</option><option value="SG">Singapore</option><option value="KR">South Korea</option><option value="UK">United Kingdom</option><option value="US">United States</option><option value="VN">Vietnam</option>
                        </select>
                        <input type="text" placeholder="State" value={discoverFilters.state} onChange={(e) => setDiscoverFilters({ ...discoverFilters, state: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                        <input type="text" placeholder="City" value={discoverFilters.city} onChange={(e) => setDiscoverFilters({ ...discoverFilters, city: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                        <select value={discoverFilters.category} onChange={(e) => setDiscoverFilters({ ...discoverFilters, category: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Select Category</option><option value="Wellness Lifestyle">Wellness Lifestyle</option><option value="Healthy Lifestyle">Healthy Lifestyle</option><option value="Nutritionist">Nutritionist</option><option value="Yoga">Yoga</option><option value="Food">Food</option><option value="Home Cooking">Home Cooking</option>
                        </select>
                        <select value={discoverFilters.gender} onChange={(e) => setDiscoverFilters({ ...discoverFilters, gender: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option>
                        </select>
                        <label className="flex items-center gap-2.5 py-1 px-1 cursor-pointer">
                          <input type="checkbox" checked={discoverFilters.hasEmail} onChange={(e) => setDiscoverFilters({ ...discoverFilters, hasEmail: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent" />
                          <span className="text-[12px] font-semibold text-brand-dark">Has Email</span>
                        </label>
                        <div className="h-px bg-gray-100" />
                        <select value={discoverFilters.channel} onChange={(e) => setDiscoverFilters({ ...discoverFilters, channel: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Channel</option><option value="instagram">Instagram</option><option value="youtube">YouTube</option><option value="tiktok">TikTok</option>
                        </select>
                        <select value={discoverFilters.favourite} onChange={(e) => setDiscoverFilters({ ...discoverFilters, favourite: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none appearance-none cursor-pointer transition-all">
                          <option value="">Favourite</option><option value="yes">Favourites Only</option>
                        </select>
                        <div className="h-px bg-gray-100" />
                        <div>
                          <p className="text-[11px] font-bold text-brand-dark mb-2">Audience</p>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="From" value={discoverFilters.audienceFrom} onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceFrom: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                            <input type="text" placeholder="To" value={discoverFilters.audienceTo} onChange={(e) => setDiscoverFilters({ ...discoverFilters, audienceTo: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-brand-dark mb-2">Media Value</p>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="From" value={discoverFilters.mediaValueFrom} onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueFrom: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                            <input type="text" placeholder="To" value={discoverFilters.mediaValueTo} onChange={(e) => setDiscoverFilters({ ...discoverFilters, mediaValueTo: e.target.value })} className="bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-[12px] font-medium text-brand-dark placeholder:text-gray-400 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all" />
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => { setSelectedCampaignSource(null); setDiscoverSearched(false); setDiscoverResults([]); }}
                          className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold text-[11px] rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDiscoverSearch}
                          className="px-8 py-2.5 bg-brand-accent text-white font-black text-[11px] rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
                        >
                          Search
                        </button>
                      </div>

                      {/* Results */}
                      {discoverSearched && (() => {
                        const visibleResults = discoverResults.filter(inf => !dismissedFromDiscover.includes(inf.username));
                        const paginatedResults = visibleResults.slice(0, discoverVisibleCount);
                        return (
                        <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-black text-brand-dark uppercase tracking-widest">
                              {visibleResults.length} Result{visibleResults.length !== 1 ? 's' : ''} Found
                            </p>
                            {addedFromDiscover.length > 0 && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                {addedFromDiscover.length} added to collection
                              </span>
                            )}
                          </div>
                          {visibleResults.length === 0 ? (
                            <div className="text-center py-10">
                              <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3"><SearchIcon className="w-6 h-6 text-gray-400" /></div>
                              <p className="text-[13px] font-semibold text-gray-900">No influencers found</p>
                              <p className="text-[12px] text-gray-500 mt-1">Try adjusting your filters</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {paginatedResults.map((inf: any) => {
                                const isAdded = addedFromDiscover.includes(inf.username);
                                return (
                                  <div key={inf.username} className="flex items-center gap-3 p-3 border rounded-xl transition-all bg-[#FDFCFB] border-gray-100 hover:border-gray-200">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white ring-1 ring-gray-100 shrink-0">
                                      <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-[13px] font-black text-brand-dark truncate">{inf.name}</h4>
                                        {inf.hasEmail && (<svg className="w-3.5 h-3.5 text-brand-accent shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>)}
                                      </div>
                                      <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gray mt-0.5">
                                        <span>{inf.flag} {inf.location}</span><span className="w-1 h-1 bg-gray-300 rounded-full" /><span>{inf.category}</span>
                                      </div>
                                      <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1.5">
                                          {inf.platforms.includes('instagram') && <div className="w-3.5 h-3.5"><InstagramIcon /></div>}
                                          {inf.platforms.includes('youtube') && <div className="w-3.5 h-3.5"><YouTubeIcon /></div>}
                                          {inf.platforms.includes('tiktok') && <div className="w-3.5 h-3.5"><TikTokIcon /></div>}
                                        </div>
                                        <span className="text-[10px] font-bold text-brand-gray">{inf.followers}</span><span className="w-1 h-1 bg-gray-300 rounded-full" /><span className="text-[10px] font-black text-brand-accent">{inf.estimatedValue}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <button
                                        onClick={() => handleAddInfluencerToCollection(inf.username)}
                                        disabled={isAdded}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isAdded ? 'bg-emerald-500 text-white shadow-md cursor-default' : 'bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:shadow-md hover:border-emerald-500'}`}
                                        title={isAdded ? 'Added to collection' : 'Add to collection'}
                                      >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                      </button>
                                      {!isAdded && (
                                        <button onClick={() => handleDismissFromDiscover(inf.username)} className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-400 border border-red-200 hover:bg-red-500 hover:text-white hover:shadow-md hover:border-red-500 transition-all" title="Remove from results">
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Footer */}
            {addedFromDiscover.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 bg-emerald-50/50 shrink-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-emerald-700">
                    {addedFromDiscover.length} influencer{addedFromDiscover.length > 1 ? 's' : ''} added to collection
                  </p>
                  <button onClick={() => setShowDiscoverPopup(false)} className="bg-brand-accent text-white font-bold py-2 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase">
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Influencer Detail Popup */}
      {selectedInfluencer && (
        <InfluencerDetailPopup
          influencer={selectedInfluencer}
          onClose={() => setSelectedInfluencer(null)}
        />
      )}

      {/* Back to My Saves (bottom) */}
      {backLabel && (
        <div className="mt-2">
          <button onClick={onBack} className="text-sm font-semibold text-brand-gray hover:text-brand-accent transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Influencer Profile Card (matching Campaign page pattern) ──────────────
const ProCollectionInfluencerCard: React.FC<any> = ({ name, username, imageUrl, category, audience, value, location, flag, platforms, platformStats, isFavourite, isGeocoded, followers, estimatedValue, posts, stories, email, onRemove }) => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Wellness Lifestyle': return 'bg-[#1A1E4B]';
      case 'Healthy Lifestyle': return 'bg-[#2D8B4E]';
      case 'Nutritionist': return 'bg-[#D97706]';
      case 'Yoga / Pilates': return 'bg-[#7C3AED]';
      default: return 'bg-brand-dark/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden group hover:shadow-panel transition-all hover:-translate-y-1 h-full flex flex-col">
      {/* Image area */}
      <div className="relative h-64 bg-gray-100">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

        {/* Top-left: platform icon + post/story counters */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="w-7 h-7 bg-white/90 rounded-lg p-1.5 shadow-sm">
            <InstagramIcon />
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">{posts || 0}</div>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">{stories || 0}</div>
        </div>

        {/* Top-right: visible badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-md tracking-wider uppercase shadow-sm">VISIBLE</span>
        </div>

        {/* Bottom: category pill */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-center">
          <div className={`${getCategoryColor(category)} backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg`}>
            <span className="text-xl">{flag || '🇦🇺'}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Name row */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 min-w-0">
            <h3 className="text-sm font-black text-brand-accent hover:underline cursor-pointer truncate">{name}</h3>
            <p className="text-[11px] font-bold text-brand-dark opacity-60">@{username}</p>
            {location && (
              <div className="flex items-center gap-1 mt-0.5">
                <svg className="w-3 h-3 text-brand-gray" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[10px] font-semibold text-brand-gray">{location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button className={`${isFavourite ? 'text-amber-400' : 'text-gray-300'} hover:text-amber-400 transition-colors`} onClick={(e) => e.stopPropagation()}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </button>
            <button
              className={`transition-colors ${email ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-300 hover:text-gray-400'}`}
              onClick={(e) => e.stopPropagation()}
              title={email || 'No email'}
            >
              {email ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Total Audience section */}
        <div className="pt-3 border-t border-gray-50 space-y-2">
          <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest">Total Audience</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-brand-dark">{followers || audience}</span>
            <span className="text-[10px] font-bold text-brand-gray">followers</span>
          </div>
          <p className="text-[12px] font-bold text-brand-accent">{estimatedValue || `$${value}`} <span className="text-brand-gray font-semibold">Estimated Value</span></p>
        </div>

        {/* Social platform icons with hover stats */}
        <div className="flex items-center gap-2 pt-1">
          {(platforms || ['instagram']).includes('instagram') && (
            <div className="relative" onMouseEnter={() => setHoveredPlatform('instagram')} onMouseLeave={() => setHoveredPlatform(null)}>
              <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                <InstagramIcon />
              </div>
              {hoveredPlatform === 'instagram' && platformStats?.instagram && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                  <p className="text-[13px] font-black text-brand-dark">{platformStats.instagram.followers} followers</p>
                  <p className="text-[12px] font-bold text-brand-dark">{platformStats.instagram.value} Estimated Value</p>
                  <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              )}
            </div>
          )}
          {(platforms || []).includes('youtube') && (
            <div className="relative" onMouseEnter={() => setHoveredPlatform('youtube')} onMouseLeave={() => setHoveredPlatform(null)}>
              <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center p-0.5 cursor-pointer hover:shadow-md transition-shadow">
                <YouTubeIcon />
              </div>
              {hoveredPlatform === 'youtube' && platformStats?.youtube && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                  <p className="text-[13px] font-black text-brand-dark">{platformStats.youtube.followers} followers</p>
                  <p className="text-[12px] font-bold text-brand-dark">{platformStats.youtube.value} Estimated Value</p>
                  <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              )}
            </div>
          )}
          {(platforms || []).includes('tiktok') && (
            <div className="relative" onMouseEnter={() => setHoveredPlatform('tiktok')} onMouseLeave={() => setHoveredPlatform(null)}>
              <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center p-1 cursor-pointer hover:shadow-md transition-shadow">
                <TikTokIcon />
              </div>
              {hoveredPlatform === 'tiktok' && platformStats?.tiktok && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                  <p className="text-[13px] font-black text-brand-dark">{platformStats.tiktok.followers} followers</p>
                  <p className="text-[12px] font-bold text-brand-dark">{platformStats.tiktok.value} Estimated Value</p>
                  <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action bar */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <button
            className={`p-2 rounded-lg transition-all ${isGeocoded ? 'text-emerald-500 hover:bg-emerald-50' : 'text-red-500 hover:bg-red-50'}`}
            title={isGeocoded ? 'Location geocoded' : 'Location not geocoded'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <button
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Remove from collection"
            onClick={() => onRemove?.(username)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <button
            className="p-2 rounded-lg text-gray-400 hover:text-brand-accent hover:bg-gray-50 transition-all"
            title="Refresh data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProCollectionDetailView;
