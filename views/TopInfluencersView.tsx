
import React, { useState, useEffect } from 'react';
import { SearchIcon, PlusIcon } from '../components/icons/UiIcons';

interface TopListCategory {
  id: string;
  name: string;
  imageUrl: string;
  influencerCount: number;
  combinedAudience: string;
  flag: string;
}

interface RankedInfluencer {
  rank: number;
  name: string;
  imageUrl: string;
  location: string;
  country: string;
  flag: string;
  category: string;
  followers: string;
  badges: string[];
}

interface TopInfluencersViewProps {
  initialCategory?: string | null;
}

const TopInfluencersView: React.FC<TopInfluencersViewProps> = ({ initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<TopListCategory | null>(null);
  const [hasAutoSelected, setHasAutoSelected] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'Alphabetical' | 'Rank'>('Alphabetical');
  const [expandedRank, setExpandedRank] = useState<number | null>(null);
  const [expandedSubTab, setExpandedSubTab] = useState<'Recent Posts' | 'Key Stats' | 'Audience' | 'Content'>('Recent Posts');
  const [addToCampaignRank, setAddToCampaignRank] = useState<number | null>(null);
  const [addedToCampaign, setAddedToCampaign] = useState<Record<string, string[]>>({});

  // Available campaigns
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

  // Top List Categories
  const topListCategories: TopListCategory[] = [
    { id: 'dessert-chef', name: 'Dessert Chef', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300', influencerCount: 4, combinedAudience: '523.9K', flag: '🌏' },
    { id: 'bartender', name: 'Bartender', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=300', influencerCount: 12, combinedAudience: '2.1M', flag: '🌏' },
    { id: 'home-cook', name: 'Home Cook', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=300', influencerCount: 18, combinedAudience: '4.7M', flag: '🌏' },
    { id: 'food-blogger', name: 'Food Blogger', imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=300', influencerCount: 24, combinedAudience: '8.3M', flag: '🌏' },
    { id: 'fitness-coach', name: 'Fitness Coach', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300', influencerCount: 15, combinedAudience: '3.6M', flag: '🌏' },
    { id: 'lifestyle-creator', name: 'Lifestyle Creator', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=300', influencerCount: 22, combinedAudience: '6.8M', flag: '🌏' },
    { id: 'travel-photographer', name: 'Travel Photographer', imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=300', influencerCount: 10, combinedAudience: '1.9M', flag: '🌏' },
    { id: 'beauty-influencer', name: 'Beauty Influencer', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=300', influencerCount: 20, combinedAudience: '5.4M', flag: '🌏' },
    { id: 'wine-sommelier', name: 'Wine Sommelier', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=300', influencerCount: 8, combinedAudience: '890K', flag: '🌏' },
    { id: 'coffee-specialist', name: 'Coffee Specialist', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=300', influencerCount: 11, combinedAudience: '1.4M', flag: '🌏' },
    { id: 'wellness-guru', name: 'Wellness Guru', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300', influencerCount: 9, combinedAudience: '1.2M', flag: '🌏' },
    { id: 'pet-influencer', name: 'Pet Influencer', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=300', influencerCount: 14, combinedAudience: '3.1M', flag: '🌏' },
  ];

  // Auto-select category when navigating from breadcrumb
  useEffect(() => {
    if (initialCategory && !hasAutoSelected) {
      const matchedCategory = topListCategories.find(
        cat => cat.name.toLowerCase() === initialCategory.toLowerCase()
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
        setExpandedRank(null);
      }
      setHasAutoSelected(true);
    }
  }, [initialCategory]);

  // Generate ranked influencers per category
  const getRankedInfluencers = (category: TopListCategory): RankedInfluencer[] => {
    const influencerSets: Record<string, RankedInfluencer[]> = {
      'dessert-chef': [
        { rank: 1, name: 'Edd Kimber', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', location: 'London, United Kingdom', country: 'UK', flag: '🇬🇧', category: 'Dessert Chef', followers: '517.1K', badges: ['Top 10 Viewed (London)', 'Top 10 Saved (London)'] },
        { rank: 2, name: 'Reynold Poernomo', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', location: 'Sydney, Australia', country: 'AU', flag: '🇦🇺', category: 'Dessert Chef', followers: '348', badges: ['Top 10 Viewed', 'Top 10 Viewed', 'Top 10 Saved'] },
        { rank: 3, name: 'Promotions Team', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', location: 'Australia', country: 'AU', flag: '🇦🇺', category: 'Dessert Chef', followers: '29', badges: ['Top 10 Viewed'] },
        { rank: 4, name: 'Native Empire', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', location: 'Australia', country: 'AU', flag: '🇦🇺', category: 'Dessert Chef', followers: '6.4K', badges: ['Top 10 Viewed'] },
      ],
      'bartender': [
        { rank: 1, name: 'Jess Nguyen', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', location: 'Melbourne, Australia', country: 'AU', flag: '🇦🇺', category: 'Bartender', followers: '342.8K', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
        { rank: 2, name: 'Tom Walker', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', location: 'London, United Kingdom', country: 'UK', flag: '🇬🇧', category: 'Bartender', followers: '289.1K', badges: ['Top 10 Viewed (London)'] },
        { rank: 3, name: 'Luca Romano', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', location: 'Milan, Italy', country: 'IT', flag: '🇮🇹', category: 'Bartender', followers: '198.4K', badges: ['Top 10 Viewed'] },
        { rank: 4, name: 'Maria Santos', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', location: 'Barcelona, Spain', country: 'ES', flag: '🇪🇸', category: 'Bartender', followers: '156.2K', badges: ['Top 10 Saved'] },
        { rank: 5, name: 'Alex Chen', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', location: 'New York, USA', country: 'US', flag: '🇺🇸', category: 'Bartender', followers: '134.7K', badges: ['Top 10 Viewed'] },
        { rank: 6, name: 'Sophie Martin', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200', location: 'Paris, France', country: 'FR', flag: '🇫🇷', category: 'Bartender', followers: '112.3K', badges: [] },
        { rank: 7, name: 'Kai Tanaka', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', location: 'Tokyo, Japan', country: 'JP', flag: '🇯🇵', category: 'Bartender', followers: '98.6K', badges: ['Top 10 Viewed'] },
        { rank: 8, name: 'Emma Williams', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', location: 'Sydney, Australia', country: 'AU', flag: '🇦🇺', category: 'Bartender', followers: '87.2K', badges: [] },
        { rank: 9, name: 'Diego Herrera', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', location: 'Mexico City, Mexico', country: 'MX', flag: '🇲🇽', category: 'Bartender', followers: '76.4K', badges: ['Top 10 Saved'] },
        { rank: 10, name: 'Nina Petrova', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', location: 'Berlin, Germany', country: 'DE', flag: '🇩🇪', category: 'Bartender', followers: '64.9K', badges: [] },
      ],
      'home-cook': [
        { rank: 1, name: 'Sarah Mitchell', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', location: 'Brisbane, Australia', country: 'AU', flag: '🇦🇺', category: 'Home Cook', followers: '892.1K', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
        { rank: 2, name: 'James Oliver', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', location: 'London, United Kingdom', country: 'UK', flag: '🇬🇧', category: 'Home Cook', followers: '745.3K', badges: ['Top 10 Viewed (London)', 'Top 10 Saved (London)'] },
        { rank: 3, name: 'Li Wei Chen', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', location: 'Singapore', country: 'SG', flag: '🇸🇬', category: 'Home Cook', followers: '623.8K', badges: ['Top 10 Viewed'] },
        { rank: 4, name: 'Isabella Rossi', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', location: 'Rome, Italy', country: 'IT', flag: '🇮🇹', category: 'Home Cook', followers: '518.2K', badges: ['Top 10 Saved'] },
        { rank: 5, name: 'Aiko Yamamoto', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200', location: 'Osaka, Japan', country: 'JP', flag: '🇯🇵', category: 'Home Cook', followers: '412.6K', badges: ['Top 10 Viewed'] },
        { rank: 6, name: 'Priya Sharma', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', location: 'Mumbai, India', country: 'IN', flag: '🇮🇳', category: 'Home Cook', followers: '367.4K', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
        { rank: 7, name: 'Marcus Brown', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', location: 'Chicago, USA', country: 'US', flag: '🇺🇸', category: 'Home Cook', followers: '298.5K', badges: [] },
        { rank: 8, name: 'Hannah Schmidt', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', location: 'Munich, Germany', country: 'DE', flag: '🇩🇪', category: 'Home Cook', followers: '234.1K', badges: ['Top 10 Viewed'] },
        { rank: 9, name: 'Carlos Mendez', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', location: 'Madrid, Spain', country: 'ES', flag: '🇪🇸', category: 'Home Cook', followers: '189.7K', badges: [] },
        { rank: 10, name: 'Toasted Table', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', location: 'Englewood Cliffs, USA', country: 'US', flag: '🇺🇸', category: 'Home Cook', followers: '170.3K', badges: ['Top 10 Viewed'] },
      ],
    };

    // Default influencer list for categories without specific data
    const defaultInfluencers: RankedInfluencer[] = [
      { rank: 1, name: 'Alex Morgan', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', location: 'Los Angeles, USA', country: 'US', flag: '🇺🇸', category: category.name, followers: '1.2M', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
      { rank: 2, name: 'Jamie Lee', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', location: 'London, United Kingdom', country: 'UK', flag: '🇬🇧', category: category.name, followers: '876.5K', badges: ['Top 10 Viewed (London)'] },
      { rank: 3, name: 'Sophia Chen', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', location: 'Sydney, Australia', country: 'AU', flag: '🇦🇺', category: category.name, followers: '654.2K', badges: ['Top 10 Viewed', 'Top 10 Saved'] },
      { rank: 4, name: 'Marco Benedetti', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', location: 'Milan, Italy', country: 'IT', flag: '🇮🇹', category: category.name, followers: '543.8K', badges: ['Top 10 Saved'] },
      { rank: 5, name: 'Emma Taylor', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200', location: 'Melbourne, Australia', country: 'AU', flag: '🇦🇺', category: category.name, followers: '432.1K', badges: ['Top 10 Viewed'] },
      { rank: 6, name: 'Ravi Patel', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', location: 'Dubai, UAE', country: 'AE', flag: '🇦🇪', category: category.name, followers: '321.7K', badges: [] },
      { rank: 7, name: 'Luna Park', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', location: 'Seoul, South Korea', country: 'KR', flag: '🇰🇷', category: category.name, followers: '267.3K', badges: ['Top 10 Viewed'] },
      { rank: 8, name: 'Oscar Wilde III', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', location: 'Dublin, Ireland', country: 'IE', flag: '🇮🇪', category: category.name, followers: '198.4K', badges: ['Top 10 Saved'] },
      { rank: 9, name: 'Camille Dubois', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', location: 'Paris, France', country: 'FR', flag: '🇫🇷', category: category.name, followers: '145.6K', badges: [] },
      { rank: 10, name: 'Mateo Gonzalez', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', location: 'Buenos Aires, Argentina', country: 'AR', flag: '🇦🇷', category: category.name, followers: '112.9K', badges: ['Top 10 Viewed'] },
    ];

    return influencerSets[category.id] || defaultInfluencers;
  };

  // Pagination
  const totalCategories = topListCategories.length;
  const totalPages = Math.ceil(totalCategories / pageSize);
  const paginatedCategories = topListCategories.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleExpand = (rank: number) => {
    setAddToCampaignRank(null);
    if (expandedRank === rank) {
      setExpandedRank(null);
    } else {
      setExpandedRank(rank);
      setExpandedSubTab('Recent Posts');
    }
  };

  return (
    <div className="space-y-6">
      {/* Click-away to close campaign dropdown */}
      {addToCampaignRank !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setAddToCampaignRank(null)} />
      )}

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {selectedCategory ? (
          <div className="flex items-center gap-3">
            <button onClick={() => { setSelectedCategory(null); setExpandedRank(null); }} className="text-3xl font-serif font-black tracking-tight text-brand-gray hover:text-brand-accent transition-colors">
              Top Influencers
            </button>
            <span className="text-3xl font-serif font-black tracking-tight text-brand-gray">/</span>
            <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">{selectedCategory.name}</h1>
          </div>
        ) : (
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Top Influencers</h1>
        )}
      </div>

      {!selectedCategory ? (
        /* ═══════════════════════════════════════════════════════
           CATEGORY LIST VIEW
           ═══════════════════════════════════════════════════════ */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                <div>
                  <h2 className="text-xl font-serif font-black text-brand-accent leading-none">Mapkats Ranking:</h2>
                  <p className="text-[12px] font-bold text-brand-gray mt-1">Discover top influencers by category</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-[11px] font-bold text-brand-dark cursor-pointer hover:border-brand-accent transition-colors"
                  >
                    <option>Alphabetical</option>
                    <option>Rank</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-brand-gray absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="divide-y divide-gray-100">
            {paginatedCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => { setSelectedCategory(cat); setExpandedRank(null); setCurrentPage(1); }}
                className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{cat.name}</h4>
                  <p className="text-[11px] font-bold text-brand-gray mt-0.5">{cat.influencerCount} Influencers. {cat.combinedAudience} Combined Audience</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={(e) => e.stopPropagation()} className="text-brand-gray hover:text-brand-accent transition-colors p-1.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                  </button>
                  <button onClick={(e) => e.stopPropagation()} className="text-brand-gray hover:text-brand-accent transition-colors p-1.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            {/* Page size */}
            <div className="flex items-center gap-1">
              {[20, 50, 100].map((size) => (
                <button
                  key={size}
                  onClick={() => { setPageSize(size); setCurrentPage(1); }}
                  className={`min-w-[36px] h-8 rounded-lg text-[12px] font-bold transition-all ${
                    pageSize === size
                      ? 'bg-brand-accent text-white shadow-sm'
                      : 'text-brand-gray hover:text-brand-accent hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Page navigation */}
            <div className="flex items-center gap-2 text-[12px] font-bold text-brand-gray">
              <span className="mr-2">«</span>
              <button className="text-brand-gray hover:text-brand-accent transition-colors">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[28px] h-7 rounded-md text-[12px] font-bold transition-all ${
                    currentPage === page
                      ? 'bg-brand-accent text-white shadow-sm'
                      : 'text-brand-gray hover:text-brand-accent hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="text-brand-gray hover:text-brand-accent transition-colors">Next</button>
              <span className="ml-2">»</span>
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════════════════
           RANKED INFLUENCER LIST VIEW
           ═══════════════════════════════════════════════════════ */
        (() => {
          const rankedInfluencers = getRankedInfluencers(selectedCategory);
          return (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                    <div>
                      <h2 className="text-xl font-serif font-black text-brand-accent leading-none">Mapkats Ranking:</h2>
                      <p className="text-[13px] font-serif font-bold text-brand-dark mt-1">{selectedCategory.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-[11px] font-bold text-brand-dark cursor-pointer hover:border-brand-accent transition-colors"
                      >
                        <option>Rank</option>
                        <option>Alphabetical</option>
                      </select>
                      <svg className="w-3.5 h-3.5 text-brand-gray absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ranked List */}
              <div className="divide-y divide-gray-100">
                {rankedInfluencers.map((item) => (
                  <div key={item.rank} className="flex flex-col">
                    <div
                      onClick={() => toggleExpand(item.rank)}
                      className="flex items-center px-6 py-5 gap-5 transition-colors cursor-pointer hover:bg-gray-50/50 group"
                    >
                      {/* Rank */}
                      <div className="w-8 flex-shrink-0 text-center">
                        <span className="text-lg font-serif font-black text-brand-dark">{item.rank}.</span>
                      </div>

                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border-2 border-white ring-1 ring-gray-100">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-serif font-black text-brand-dark group-hover:text-brand-accent transition-colors">{item.name}</h4>
                        <div className="flex items-center gap-2.5 text-[11px] font-bold text-brand-gray mt-1 flex-wrap">
                          <span className="flex items-center gap-1"><span className="text-base">{item.flag}</span> {item.category}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span>{item.location}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span>{item.followers} Followers</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 max-w-[320px] justify-end shrink-0">
                        {item.badges.map((badge, idx) => {
                          const isSaved = badge.includes('Saved');
                          return (
                            <span key={idx} className={`${isSaved ? 'bg-[#82A3C4]' : 'bg-[#404040]'} text-white px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-tight whitespace-nowrap shadow-sm`}>
                              {badge}
                            </span>
                          );
                        })}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 ml-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button className="text-brand-gray hover:text-brand-accent transition-colors p-1.5" title="Save">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                        </button>
                        <button className="text-brand-gray hover:text-brand-accent transition-colors p-1.5" title="Add to list">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                          </svg>
                        </button>
                        <button className="text-brand-gray hover:text-brand-accent transition-colors p-1.5" title="Share">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>

                        {/* Add to Campaign button */}
                        {(() => {
                          const key = `${item.rank}-${item.name}`;
                          const addedList = addedToCampaign[key] || [];
                          const addedCount = addedList.length;
                          return (
                            <div className="relative">
                              <button
                                onClick={() => setAddToCampaignRank(addToCampaignRank === item.rank ? null : item.rank)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all ${
                                  addedCount > 0
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                }`}
                                title="Add to campaign"
                              >
                                {addedCount > 0 ? (
                                  <>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-[10px] font-black uppercase tracking-wider">{addedCount} Campaign{addedCount > 1 ? 's' : ''}</span>
                                  </>
                                ) : (
                                  <>
                                    <PlusIcon className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-black uppercase tracking-wider">Campaign</span>
                                  </>
                                )}
                              </button>

                              {/* Campaign dropdown */}
                              {addToCampaignRank === item.rank && (
                                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                    <p className="text-[10px] font-black text-brand-gray uppercase tracking-wider">Add to Campaign</p>
                                    <p className="text-[11px] font-bold text-brand-dark mt-0.5 truncate">{item.name}</p>
                                  </div>
                                  <div className="max-h-64 overflow-y-auto py-1">
                                    {campaigns.map((campaign) => {
                                      const isAdded = addedList.includes(campaign.name);
                                      return (
                                        <button
                                          key={campaign.name}
                                          onClick={() => {
                                            if (isAdded) {
                                              setAddedToCampaign({ ...addedToCampaign, [key]: addedList.filter(c => c !== campaign.name) });
                                            } else {
                                              setAddedToCampaign({ ...addedToCampaign, [key]: [...addedList, campaign.name] });
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
                          );
                        })()}
                      </div>
                    </div>

                    {/* Expanded Detail Area */}
                    {expandedRank === item.rank && (
                      <div className="bg-[#FDFCFB] border-t border-gray-100 px-8 py-6 animate-in slide-in-from-top-4 duration-300">
                        {/* Sub-tabs */}
                        <div className="flex gap-3 mb-5">
                          {(['Recent Posts', 'Key Stats', 'Audience', 'Content'] as const).map((sub) => (
                            <button
                              key={sub}
                              onClick={() => setExpandedSubTab(sub)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                expandedSubTab === sub
                                  ? 'bg-brand-accent text-white shadow-sm'
                                  : 'bg-white border border-gray-200 text-brand-gray hover:text-brand-accent hover:border-brand-accent'
                              }`}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>

                        {expandedSubTab === 'Recent Posts' && (
                          <div className="grid grid-cols-4 gap-3">
                            {[
                              'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300',
                              'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=300',
                              'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=300',
                              'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=300',
                            ].map((url, idx) => (
                              <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                <img src={url} alt={`Post ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                              </div>
                            ))}
                          </div>
                        )}

                        {expandedSubTab === 'Key Stats' && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Total Followers</p>
                              <p className="text-[18px] font-black text-brand-dark">{item.followers}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Engagement Rate</p>
                              <p className="text-[18px] font-black text-brand-dark">{(2.1 + item.rank * 0.3).toFixed(1)}%</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Ranking Badges</p>
                              <p className="text-[18px] font-black text-brand-dark">{item.badges.length}</p>
                            </div>
                          </div>
                        )}

                        {expandedSubTab === 'Audience' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-3">Gender Split</p>
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                  <div className="bg-blue-400 h-full rounded-full" style={{ width: '42%' }} />
                                </div>
                                <span className="text-[11px] font-bold text-brand-gray">42% M / 58% F</span>
                              </div>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-3">Top Location</p>
                              <div className="flex items-center gap-2">
                                <span className="text-base">{item.flag}</span>
                                <span className="text-[13px] font-bold text-brand-dark">{item.location}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {expandedSubTab === 'Content' && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Avg. Likes</p>
                              <p className="text-[18px] font-black text-brand-dark">{Math.round(12400 / item.rank).toLocaleString()}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Avg. Comments</p>
                              <p className="text-[18px] font-black text-brand-dark">{Math.round(840 / item.rank).toLocaleString()}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1">Post Frequency</p>
                              <p className="text-[18px] font-black text-brand-dark">{Math.max(1, 5 - Math.floor(item.rank / 3))}x / week</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[20, 50, 100].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPageSize(size)}
                      className={`min-w-[36px] h-8 rounded-lg text-[12px] font-bold transition-all ${
                        pageSize === size
                          ? 'bg-brand-accent text-white shadow-sm'
                          : 'text-brand-gray hover:text-brand-accent hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-brand-gray">
                  <span className="mr-2">«</span>
                  <button className="text-brand-gray hover:text-brand-accent transition-colors">Previous</button>
                  <button className="min-w-[28px] h-7 rounded-md bg-brand-accent text-white shadow-sm text-[12px] font-bold">1</button>
                  <button className="text-brand-gray hover:text-brand-accent transition-colors">Next</button>
                  <span className="ml-2">»</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/30">
                <p className="text-[10px] font-bold text-brand-gray">Ranked using public data and Mapkats insights. Opt-out available.</p>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};

export default TopInfluencersView;
