
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../components/icons/SocialIcons';
import InfluencerDetailPopup from '../components/InfluencerDetailPopup';

// ─── Mock influencer data generator ─────────────────────────────────────────
interface InfluencerProfile {
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  category: string;
  country: string;
  flag: string;
  followers: string;
  estimatedValue: string;
  email: string | null;
  platforms: string[];
  posts: number;
  stories: number;
  isFavourite: boolean;
  isGeocoded: boolean;
}

const generateInfluencers = (category: string, country: string): InfluencerProfile[] => {
  const images = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
  ];

  const names = [
    'Mila Jones', 'Paola Rojas', 'Eliana Cruz', 'Yuliza Hart', 'Carolina Torres',
    'Claudia Mars', 'Kate Sage', 'Valentina Hayes', 'Bianca Wells', 'Elizabeth Jade',
    'Rachel Bennett', 'Sofia Rivera', 'Emma Chen', 'Olivia Park', 'Ava Brooks',
    'Isabella Fox', 'Mia Stone', 'Charlotte Webb', 'Amelia Rose', 'Harper Cole',
    'Lily Morgan', 'Zoe Kim', 'Nora James', 'Riley Blake',
  ];

  const usernames = [
    'mila.jenx', 'itspaorojas', 'misselij', 'yulizaabreu', 'dearcarot',
    'claudzzz', 'katt_sagez', 'valentina_hajast', 'bianca.and.bambi', 'elizabeth_jade',
    'rachelsellby', 'sofiarivera_', 'emmachen.life', 'oliviapark.co', 'avabrooks__',
    'isabellafox_', 'miastone.style', 'charlottewebb', 'ameliarose_', 'harpercole.co',
    'lily.morgan_', 'zoekim.studio', 'norajames_', 'rileyblake.fit',
  ];

  const bios = [
    'fitness | travel | lifestyle 📍',
    'All things lifestyle / fashion / wellness',
    '🌴Influencer + UGC Beauty • Fashion • Wellness',
    'Model | PT & Wellness Coach 🦋',
    'Creative director & content creator ✨',
    'pursuing a life well lived 💚',
    'mom of 2 | lifestyle & travel',
    'Fashion • Beauty • Life 💫',
    'Sharing my journey one post at a time',
    'plant-based living 🌱 recipe creator',
    'Travel & Food enthusiast 🌍',
    'Lifestyle + Motherhood 💛',
  ];

  const flagMap: Record<string, string> = {
    'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Australia': '🇦🇺',
    'Germany': '🇩🇪', 'The Netherlands': '🇳🇱', 'Italy': '🇮🇹',
    'France': '🇫🇷', 'Denmark': '🇩🇰', 'Spain': '🇪🇸',
    'Bulgaria': '🇧🇬', 'Sweden': '🇸🇪', 'No Country': '🌍',
    'Republic of Ireland': '🇮🇪', 'Belgium': '🇧🇪', 'Nigeria': '🇳🇬',
  };

  const flag = flagMap[country] || '🌍';
  const count = 24;

  return Array.from({ length: count }, (_, i) => ({
    name: names[i % names.length],
    username: usernames[i % usernames.length],
    imageUrl: images[i % images.length],
    bio: bios[i % bios.length],
    category,
    country,
    flag,
    followers: `${(Math.floor(Math.random() * 45) + 5).toLocaleString()},${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
    estimatedValue: `$${(Math.random() * 900 + 100).toFixed(2)}`,
    email: i % 3 === 0 ? `${usernames[i % usernames.length]}@gmail.com` : null,
    platforms: i % 4 === 0 ? ['instagram', 'tiktok'] : i % 3 === 0 ? ['instagram', 'youtube'] : ['instagram'],
    posts: Math.floor(Math.random() * 5),
    stories: Math.floor(Math.random() * 3),
    isFavourite: i % 5 === 0,
    isGeocoded: i % 2 === 0,
  }));
};

// ─── Category color mapping ─────────────────────────────────────────────────
const getCategoryColor = (cat: string): string => {
  const map: Record<string, string> = {
    'Lifestyle': 'bg-[#7C3AED]',
    'Food': 'bg-[#F59E0B]',
    'No Category': 'bg-gray-500',
    'Bartender': 'bg-[#06B6D4]',
    'Mum Lifestyle': 'bg-[#EC4899]',
    'Outfits and Lifestyle': 'bg-[#8B5CF6]',
    'Music': 'bg-[#1D4ED8]',
    'Alcohol': 'bg-[#B45309]',
    'Fashion': 'bg-[#E11D48]',
    'Home Cooking': 'bg-[#854D0E]',
    'Archived': 'bg-gray-500',
  };
  return map[cat] || 'bg-brand-dark/80';
};

// ─── Influencer Profile Card ────────────────────────────────────────────────
const InfluencerCard: React.FC<{ influencer: InfluencerProfile }> = ({ influencer }) => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden group hover:shadow-panel transition-all hover:-translate-y-1 h-full flex flex-col">
      {/* Image area */}
      <div className="relative h-64 bg-gray-100">
        <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        {/* Top-left: platform icon + counters */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div className="w-7 h-7 bg-white/90 rounded-lg p-1.5 shadow-sm">
            <InstagramIcon />
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">{influencer.posts}</div>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">{influencer.stories}</div>
        </div>

        {/* Top-right: status */}
        <div className="absolute top-3 right-3">
          <span className="bg-white text-brand-dark text-[9px] font-black px-2 py-1 rounded-md tracking-wider uppercase shadow-sm">NEW</span>
        </div>

        {/* Bottom: category pill */}
        <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-center">
          <div className={`${getCategoryColor(influencer.category)} backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg`}>
            <span className="text-xl">{influencer.flag}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{influencer.category}</span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Name row */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5 min-w-0">
            <h3 className="text-sm font-black text-brand-accent hover:underline cursor-pointer truncate">{influencer.name}</h3>
            <p className="text-[11px] font-bold text-brand-dark opacity-60">@{influencer.username}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button className={`${influencer.isFavourite ? 'text-amber-400' : 'text-gray-300'} hover:text-amber-400 transition-colors`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </button>
            <button className={`transition-colors ${influencer.email ? 'text-emerald-500' : 'text-gray-300'}`} title={influencer.email || 'No email'}>
              {influencer.email ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[11px] text-brand-gray line-clamp-2">{influencer.bio}</p>

        {/* Total Audience */}
        <div className="pt-3 border-t border-gray-50 space-y-2">
          <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest">Total Audience</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-brand-dark">{influencer.followers}</span>
            <span className="text-[10px] font-bold text-brand-gray">followers</span>
          </div>
          <p className="text-[12px] font-bold text-brand-accent">{influencer.estimatedValue} <span className="text-brand-gray font-semibold">Estimated Value</span></p>
        </div>

        {/* Social platform icons */}
        <div className="flex items-center gap-2 pt-1">
          {influencer.platforms.includes('instagram') && (
            <div
              className="relative"
              onMouseEnter={() => setHoveredPlatform('instagram')}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                <InstagramIcon />
              </div>
              {hoveredPlatform === 'instagram' && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                  <p className="text-[13px] font-black text-brand-dark">{influencer.followers} followers</p>
                  <p className="text-[12px] font-bold text-brand-dark">{influencer.estimatedValue} Estimated Value</p>
                  <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              )}
            </div>
          )}
          {influencer.platforms.includes('youtube') && (
            <div
              className="relative"
              onMouseEnter={() => setHoveredPlatform('youtube')}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center p-0.5 cursor-pointer hover:shadow-md transition-shadow">
                <YouTubeIcon />
              </div>
              {hoveredPlatform === 'youtube' && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                  <p className="text-[13px] font-black text-brand-dark">{influencer.followers} followers</p>
                  <p className="text-[12px] font-bold text-brand-dark">{influencer.estimatedValue} Estimated Value</p>
                  <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              )}
            </div>
          )}
          {influencer.platforms.includes('tiktok') && (
            <div
              className="relative"
              onMouseEnter={() => setHoveredPlatform('tiktok')}
              onMouseLeave={() => setHoveredPlatform(null)}
            >
              <div className="w-6 h-6 rounded-md overflow-hidden shadow-sm border border-gray-100 bg-white flex items-center justify-center p-1 cursor-pointer hover:shadow-md transition-shadow">
                <TikTokIcon />
              </div>
              {hoveredPlatform === 'tiktok' && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 whitespace-nowrap z-20">
                  <p className="text-[13px] font-black text-brand-dark">{influencer.followers} followers</p>
                  <p className="text-[12px] font-bold text-brand-dark">{influencer.estimatedValue} Estimated Value</p>
                  <div className="absolute top-full left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action bar */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
          <button
            className={`p-2 rounded-lg transition-all ${influencer.isGeocoded ? 'text-emerald-500 hover:bg-emerald-50' : 'text-red-500 hover:bg-red-50'}`}
            title={influencer.isGeocoded ? 'Location geocoded' : 'Location not geocoded'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-all" title="Assign to campaign">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Remove">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-brand-accent hover:bg-gray-50 transition-all" title="Refresh data">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// INFLUENCER LISTING VIEW (Gallery Page with Breadcrumbs)
// ═══════════════════════════════════════════════════════════════════════════

interface InfluencerListingViewProps {
  category: string;
  country: string;
  onBack: () => void;
}

const InfluencerListingView: React.FC<InfluencerListingViewProps> = ({ category, country, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedInfluencer, setSelectedInfluencer] = useState<InfluencerProfile | null>(null);

  // Filter panel state
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    username: '',
    email: '',
    gender: '',
    filterCountry: '',
    city: '',
    status: '',
    filterCategory: '',
    objective: '',
    favourite: '',
  });
  const [filterTagsAll, setFilterTagsAll] = useState<string[]>([]);
  const [filterTagsAny, setFilterTagsAny] = useState<string[]>([]);
  const [filterTagsExclude, setFilterTagsExclude] = useState<string[]>([]);
  const [filterTagAllInput, setFilterTagAllInput] = useState('');
  const [filterTagAnyInput, setFilterTagAnyInput] = useState('');
  const [filterTagExcludeInput, setFilterTagExcludeInput] = useState('');

  const activeFilterCount = [
    filters.username, filters.email, filters.gender, filters.filterCountry,
    filters.city, filters.status, filters.filterCategory, filters.objective, filters.favourite,
  ].filter(Boolean).length + (filterTagsAll.length > 0 ? 1 : 0) + (filterTagsAny.length > 0 ? 1 : 0) + (filterTagsExclude.length > 0 ? 1 : 0);

  const clearAllFilters = () => {
    setFilters({ username: '', email: '', gender: '', filterCountry: '', city: '', status: '', filterCategory: '', objective: '', favourite: '' });
    setFilterTagsAll([]);
    setFilterTagsAny([]);
    setFilterTagsExclude([]);
  };

  const influencers = generateInfluencers(category, country);

  const filteredInfluencers = influencers.filter((inf) => {
    if (searchQuery && !inf.name.toLowerCase().includes(searchQuery.toLowerCase()) && !inf.username.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.username && !inf.username.toLowerCase().includes(filters.username.toLowerCase()) && !inf.name.toLowerCase().includes(filters.username.toLowerCase())) return false;
    if (filters.email && (!inf.email || !inf.email.toLowerCase().includes(filters.email.toLowerCase()))) return false;
    if (filters.filterCountry && !inf.country.toLowerCase().includes(filters.filterCountry.toLowerCase())) return false;
    if (filters.favourite === 'Yes' && !inf.isFavourite) return false;
    if (filters.favourite === 'No' && inf.isFavourite) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onBack}
          className="text-3xl font-serif font-black tracking-tight text-brand-gray hover:text-brand-accent transition-colors"
        >
          Influencers
        </button>
        <span className="text-3xl font-serif font-black tracking-tight text-brand-gray">/</span>
        <span className="text-3xl font-serif font-black tracking-tight text-brand-gray">{category}</span>
        <span className="text-3xl font-serif font-black tracking-tight text-brand-gray">/</span>
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">{country}</h1>
      </div>

      {/* Sub-header */}
      <p className="text-[13px] text-brand-gray">
        Showing <span className="font-bold text-brand-dark">{filteredInfluencers.length}</span> influencers in <span className="font-bold text-brand-accent">{category}</span> from <span className="font-bold text-brand-dark">{country}</span>
      </p>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setShowFilterPanel(true)}
            className="relative bg-brand-accent text-white px-4 py-2.5 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 text-[11px] font-bold shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            Filter
            {activeFilterCount > 0 && (
              <span className="bg-white text-brand-accent text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">{activeFilterCount}</span>
            )}
          </button>
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-4 flex items-center text-brand-gray"><SearchIcon className="w-4 h-4" /></span>
            <input
              type="text"
              placeholder="Search influencers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[12px] font-semibold text-brand-gray">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-[12px] font-medium text-gray-700 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none cursor-pointer"
          >
            <option value="newest">Date added — Newest</option>
            <option value="oldest">Date added — Oldest</option>
            <option value="followers">Followers — High to Low</option>
            <option value="value">Estimated Value — High to Low</option>
            <option value="name">Name — A to Z</option>
          </select>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInfluencers.map((inf, idx) => (
          <div key={idx} onClick={() => setSelectedInfluencer(inf)} className="cursor-pointer">
            <InfluencerCard influencer={inf} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button className="px-3 py-1.5 text-[12px] font-semibold text-brand-gray hover:text-brand-accent transition-colors">Previous</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-lg text-[12px] font-bold transition-all ${
              page === 1
                ? 'bg-brand-accent text-white shadow-sm'
                : 'text-brand-gray hover:bg-gray-100 hover:text-brand-dark'
            }`}
          >
            {page}
          </button>
        ))}
        <span className="text-brand-gray text-[12px]">...</span>
        <button className="w-8 h-8 rounded-lg text-[12px] font-bold text-brand-gray hover:bg-gray-100 hover:text-brand-dark transition-all">24</button>
        <button className="px-3 py-1.5 text-[12px] font-semibold text-brand-gray hover:text-brand-accent transition-colors">Next</button>
      </div>

      {/* Filter Side Panel */}
      {showFilterPanel && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowFilterPanel(false)} />

          {/* Panel */}
          <div className="relative ml-auto w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-accent to-brand-accent/90 px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px]">Filter Influencers</h3>
                  <p className="text-white/70 text-[11px] font-medium">Narrow down your influencer list</p>
                </div>
              </div>
              <button
                onClick={() => setShowFilterPanel(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 space-y-5">
              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Username</label>
                <input
                  type="text"
                  value={filters.username}
                  onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                  placeholder="Search by name or username"
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Email</label>
                <input
                  type="text"
                  value={filters.email}
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                  placeholder="Search by email address"
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all cursor-pointer text-gray-700"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Country</label>
                <input
                  type="text"
                  value={filters.filterCountry}
                  onChange={(e) => setFilters({ ...filters, filterCountry: e.target.value })}
                  placeholder="Filter by country"
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  placeholder="Filter by city"
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all cursor-pointer text-gray-700"
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Declined">Declined</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Category</label>
                <select
                  value={filters.filterCategory}
                  onChange={(e) => setFilters({ ...filters, filterCategory: e.target.value })}
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all cursor-pointer text-gray-700"
                >
                  <option value="">Select Category</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Food">Food</option>
                  <option value="Bartender">Bartender</option>
                  <option value="Mum Lifestyle">Mum Lifestyle</option>
                  <option value="Outfits and Lifestyle">Outfits and Lifestyle</option>
                  <option value="Music">Music</option>
                  <option value="Alcohol">Alcohol</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home Cooking">Home Cooking</option>
                  <option value="No Category">No Category</option>
                </select>
              </div>

              {/* Objective */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Objective</label>
                <select
                  value={filters.objective}
                  onChange={(e) => setFilters({ ...filters, objective: e.target.value })}
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all cursor-pointer text-gray-700"
                >
                  <option value="">Select Objective</option>
                  <option value="Brand Awareness">Brand Awareness</option>
                  <option value="Product Launch">Product Launch</option>
                  <option value="Content Creation">Content Creation</option>
                  <option value="Event Coverage">Event Coverage</option>
                  <option value="Gifting">Gifting</option>
                </select>
              </div>

              {/* Favourite */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Favourite</label>
                <select
                  value={filters.favourite}
                  onChange={(e) => setFilters({ ...filters, favourite: e.target.value })}
                  className="w-full px-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all cursor-pointer text-gray-700"
                >
                  <option value="">Any</option>
                  <option value="Yes">Favourites Only</option>
                  <option value="No">Non-favourites Only</option>
                </select>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-[12px] font-black text-brand-dark mb-4">Filter by Tags</h4>

                {/* ALL tags */}
                <div className="space-y-2 mb-5">
                  <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Show Influencers that have ALL these tags</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={filterTagAllInput}
                      onChange={(e) => setFilterTagAllInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && filterTagAllInput.trim()) {
                          setFilterTagsAll([...filterTagsAll, filterTagAllInput.trim()]);
                          setFilterTagAllInput('');
                        }
                      }}
                      placeholder="Add tag and press Enter"
                      className="flex-1 px-4 py-2 text-[12px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  {filterTagsAll.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filterTagsAll.map((tag, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          {tag}
                          <button onClick={() => setFilterTagsAll(filterTagsAll.filter((_, idx) => idx !== i))} className="text-emerald-500 hover:text-emerald-800">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ANY tags */}
                <div className="space-y-2 mb-5">
                  <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">OR any of these tags</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={filterTagAnyInput}
                      onChange={(e) => setFilterTagAnyInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && filterTagAnyInput.trim()) {
                          setFilterTagsAny([...filterTagsAny, filterTagAnyInput.trim()]);
                          setFilterTagAnyInput('');
                        }
                      }}
                      placeholder="Add tag and press Enter"
                      className="flex-1 px-4 py-2 text-[12px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  {filterTagsAny.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filterTagsAny.map((tag, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          {tag}
                          <button onClick={() => setFilterTagsAny(filterTagsAny.filter((_, idx) => idx !== i))} className="text-blue-500 hover:text-blue-800">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* EXCLUDE tags */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Exclude Influencers with these tags</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={filterTagExcludeInput}
                      onChange={(e) => setFilterTagExcludeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && filterTagExcludeInput.trim()) {
                          setFilterTagsExclude([...filterTagsExclude, filterTagExcludeInput.trim()]);
                          setFilterTagExcludeInput('');
                        }
                      }}
                      placeholder="Add tag and press Enter"
                      className="flex-1 px-4 py-2 text-[12px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  {filterTagsExclude.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {filterTagsExclude.map((tag, i) => (
                        <span key={i} className="bg-red-50 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          {tag}
                          <button onClick={() => setFilterTagsExclude(filterTagsExclude.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-800">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-3 shrink-0 bg-white">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
              <div className="flex-1" />
              <button
                onClick={() => setShowFilterPanel(false)}
                className="bg-brand-accent text-white font-black py-2.5 px-8 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
              >
                Search
              </button>
            </div>
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
    </div>
  );
};

export default InfluencerListingView;
