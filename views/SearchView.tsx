
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

interface SearchInfluencer {
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
  bookmarked: boolean;
}

interface SearchViewProps {
  onInfluencerClick?: (influencer: SearchInfluencer) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ onInfluencerClick }) => {
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter state
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [audienceFrom, setAudienceFrom] = useState('');
  const [audienceTo, setAudienceTo] = useState('');

  // Bookmarked influencers
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const countries = ['Australia', 'United States', 'United Kingdom', 'Italy', 'France', 'Spain', 'Japan', 'Germany', 'Singapore', 'India', 'Mexico', 'Canada', 'Brazil'];
  const states = ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'California', 'New York', 'Texas', 'Florida'];
  const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'London', 'New York', 'Los Angeles', 'Tokyo', 'Paris', 'Rome', 'Barcelona', 'Berlin', 'Mumbai', 'Singapore'];
  const genres = ['Bartender', 'Dessert Chef', 'Home Cook', 'Food Blogger', 'Fitness Coach', 'Lifestyle Creator', 'Travel Photographer', 'Beauty Influencer', 'Wine Sommelier', 'Coffee Specialist', 'Wellness Guru', 'Pet Influencer'];

  // Mock search results
  const allResults: SearchInfluencer[] = [
    { id: '1', name: 'Jess Nguyen', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', category: 'Bartender', followers: '342.8K', country: 'Australia', flag: '🇦🇺', city: 'Melbourne', bio: 'Award-winning mixologist crafting innovative cocktails. Featured in top hospitality publications worldwide.', platforms: ['instagram', 'tiktok'], bookmarked: false },
    { id: '2', name: 'Tom Walker', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', category: 'Bartender', followers: '289.1K', country: 'United Kingdom', flag: '🇬🇧', city: 'London', bio: 'London-based bar consultant and spirits educator. Cocktail columnist for leading lifestyle magazines.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '3', name: 'Sarah Mitchell', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', category: 'Home Cook', followers: '892.1K', country: 'Australia', flag: '🇦🇺', city: 'Brisbane', bio: 'Sharing wholesome family recipes with a modern twist. Cookbook author and recipe developer.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '4', name: 'Luca Romano', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', category: 'Bartender', followers: '198.4K', country: 'Italy', flag: '🇮🇹', city: 'Milan', bio: 'Italian cocktail artisan specializing in aperitivo culture. Brand ambassador for premium spirits.', platforms: ['instagram'], bookmarked: false },
    { id: '5', name: 'Edd Kimber', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', category: 'Dessert Chef', followers: '517.1K', country: 'United Kingdom', flag: '🇬🇧', city: 'London', bio: 'Pastry chef and baking author. Bringing dessert artistry to home kitchens around the world.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '6', name: 'Maria Santos', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400', category: 'Beauty Influencer', followers: '456.2K', country: 'Spain', flag: '🇪🇸', city: 'Barcelona', bio: 'Clean beauty advocate and skincare specialist. Sharing routines that work for all skin types.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '7', name: 'Alex Chen', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400', category: 'Fitness Coach', followers: '634.7K', country: 'United States', flag: '🇺🇸', city: 'Los Angeles', bio: 'Certified personal trainer and nutritionist. Helping people transform their lives through fitness.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '8', name: 'Sophie Martin', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', category: 'Lifestyle Creator', followers: '312.3K', country: 'France', flag: '🇫🇷', city: 'Paris', bio: 'Parisian lifestyle and fashion curator. Sharing the art of slow living and French elegance.', platforms: ['instagram', 'tiktok'], bookmarked: false },
    { id: '9', name: 'Kai Tanaka', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', category: 'Coffee Specialist', followers: '198.6K', country: 'Japan', flag: '🇯🇵', city: 'Tokyo', bio: 'Third-wave coffee enthusiast and latte art champion. Exploring specialty coffee culture globally.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '10', name: 'Priya Sharma', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', category: 'Home Cook', followers: '367.4K', country: 'India', flag: '🇮🇳', city: 'Mumbai', bio: 'Authentic Indian home cooking made accessible. Preserving traditional recipes for modern kitchens.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '11', name: 'Emma Williams', imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400', category: 'Travel Photographer', followers: '287.2K', country: 'Australia', flag: '🇦🇺', city: 'Sydney', bio: 'Capturing the beauty of landscapes and cultures. Travel photography workshops and print sales.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '12', name: 'Diego Herrera', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', category: 'Food Blogger', followers: '176.4K', country: 'Mexico', flag: '🇲🇽', city: 'Mexico City', bio: 'Exploring street food culture and authentic Mexican cuisine. Restaurant reviewer and food writer.', platforms: ['instagram', 'tiktok'], bookmarked: false },
    { id: '13', name: 'Nina Petrova', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400', category: 'Wellness Guru', followers: '264.9K', country: 'Germany', flag: '🇩🇪', city: 'Berlin', bio: 'Holistic wellness practitioner and meditation guide. Blending science with mindfulness practices.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '14', name: 'Reynold Poernomo', imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400', category: 'Dessert Chef', followers: '245.8K', country: 'Australia', flag: '🇦🇺', city: 'Sydney', bio: 'Creative dessert architect pushing the boundaries of pastry arts. Restaurant owner and TV personality.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '15', name: 'Hannah Schmidt', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400', category: 'Wine Sommelier', followers: '134.1K', country: 'Germany', flag: '🇩🇪', city: 'Munich', bio: 'Certified sommelier with a passion for natural wines. Wine education and tasting event organizer.', platforms: ['instagram'], bookmarked: false },
    { id: '16', name: 'Carlos Mendez', imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400', category: 'Fitness Coach', followers: '189.7K', country: 'Spain', flag: '🇪🇸', city: 'Madrid', bio: 'Functional fitness specialist and CrossFit coach. Building stronger communities through movement.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '17', name: 'Aiko Yamamoto', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400', category: 'Lifestyle Creator', followers: '412.6K', country: 'Japan', flag: '🇯🇵', city: 'Osaka', bio: 'Minimalist lifestyle and Japanese aesthetics. Sharing the beauty of intentional living and wabi-sabi.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '18', name: 'Marcus Brown', imageUrl: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=400', category: 'Food Blogger', followers: '298.5K', country: 'United States', flag: '🇺🇸', city: 'Chicago', bio: 'BBQ pitmaster and comfort food enthusiast. Sharing recipes rooted in Southern tradition and flavor.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '19', name: 'Isabella Rossi', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400', category: 'Home Cook', followers: '518.2K', country: 'Italy', flag: '🇮🇹', city: 'Rome', bio: 'Roman home cooking with a focus on seasonal ingredients. Nonna-inspired recipes made simple.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '20', name: 'Oliver James', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=400', category: 'Pet Influencer', followers: '423.1K', country: 'Canada', flag: '🇨🇦', city: 'Toronto', bio: 'Adventures with Biscuit the Golden Retriever. Pet care tips and the cutest outdoor adventures.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
    { id: '21', name: 'Jade Thompson', imageUrl: 'https://images.unsplash.com/photo-1502767089025-6572583495f9?auto=format&fit=crop&q=80&w=400', category: 'Beauty Influencer', followers: '523.4K', country: 'Australia', flag: '🇦🇺', city: 'Perth', bio: 'Australian beauty and lifestyle creator. Championing sustainable beauty products and honest reviews.', platforms: ['instagram', 'tiktok'], bookmarked: false },
    { id: '22', name: 'Lucas Ferreira', imageUrl: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?auto=format&fit=crop&q=80&w=400', category: 'Bartender', followers: '167.3K', country: 'Brazil', flag: '🇧🇷', city: 'Sao Paulo', bio: 'Tropical cocktail innovator bringing Brazilian flair to the global bar scene. Cachaca specialist.', platforms: ['instagram', 'tiktok'], bookmarked: false },
    { id: '23', name: 'Mia Anderson', imageUrl: 'https://images.unsplash.com/photo-1502685104813-709e0b39e622?auto=format&fit=crop&q=80&w=400', category: 'Travel Photographer', followers: '345.8K', country: 'United States', flag: '🇺🇸', city: 'New York', bio: 'Visual storyteller documenting hidden gems and cultural treasures. National Geographic contributor.', platforms: ['instagram', 'youtube'], bookmarked: false },
    { id: '24', name: 'James Li', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', category: 'Coffee Specialist', followers: '210.5K', country: 'Singapore', flag: '🇸🇬', city: 'Singapore', bio: 'Award-winning barista and coffee roaster. Exploring the art and science of the perfect brew.', platforms: ['instagram', 'tiktok', 'youtube'], bookmarked: false },
  ];

  const handleSearch = () => {
    setHasSearched(true);
    setSearchPanelOpen(false);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setSelectedGenre('');
    setAudienceFrom('');
    setAudienceTo('');
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter results based on selected filters
  const filteredResults = allResults.filter(inf => {
    if (selectedCountry && inf.country !== selectedCountry) return false;
    if (selectedCity && inf.city !== selectedCity) return false;
    if (selectedGenre && inf.category !== selectedGenre) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredResults.length / pageSize);
  const paginatedResults = filteredResults.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Social platform icon components
  const InstagramIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );

  const TikTokIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/>
    </svg>
  );

  const YouTubeIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <InstagramIcon />;
      case 'tiktok': return <TikTokIcon />;
      case 'youtube': return <YouTubeIcon />;
      default: return null;
    }
  };

  // Empty State
  if (!hasSearched) {
    return (
      <div className="-m-6 md:-m-10 flex-1 flex flex-col">
        <div className="flex-1 bg-[#F8F6F4] flex flex-col items-center justify-center relative">
          {/* Search button top-right */}
          <button
            onClick={() => setSearchPanelOpen(true)}
            className="absolute top-8 right-8 w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <SearchIcon className="w-5 h-5" />
          </button>

          {/* Illustration - Person working at desk */}
          <div className="mb-8">
            <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Desk */}
              <rect x="50" y="140" width="160" height="6" rx="3" fill="#E96126" opacity="0.2" />
              <rect x="70" y="146" width="6" height="40" rx="2" fill="#E96126" opacity="0.15" />
              <rect x="184" y="146" width="6" height="40" rx="2" fill="#E96126" opacity="0.15" />

              {/* Laptop on desk */}
              <rect x="90" y="110" width="80" height="30" rx="4" fill="#E96126" opacity="0.15" />
              <rect x="95" y="114" width="70" height="22" rx="2" fill="white" opacity="0.6" />
              <rect x="80" y="140" width="100" height="4" rx="2" fill="#E96126" opacity="0.2" />

              {/* Screen content lines */}
              <rect x="102" y="120" width="30" height="2" rx="1" fill="#E96126" opacity="0.3" />
              <rect x="102" y="125" width="50" height="2" rx="1" fill="#E96126" opacity="0.2" />
              <rect x="102" y="130" width="40" height="2" rx="1" fill="#E96126" opacity="0.15" />

              {/* Person - body */}
              <ellipse cx="130" cy="95" rx="18" ry="22" fill="#E96126" opacity="0.12" />

              {/* Person - head */}
              <circle cx="130" cy="65" r="16" fill="#E96126" opacity="0.18" />

              {/* Person - hair */}
              <path d="M114 60c0-12 7-20 16-20s16 8 16 20" fill="#E96126" opacity="0.12" />

              {/* Arms reaching to laptop */}
              <path d="M112 95 Q100 110 95 120" stroke="#E96126" strokeWidth="4" strokeLinecap="round" opacity="0.12" fill="none" />
              <path d="M148 95 Q160 110 165 120" stroke="#E96126" strokeWidth="4" strokeLinecap="round" opacity="0.12" fill="none" />

              {/* Coffee cup on desk */}
              <rect x="185" y="128" width="12" height="12" rx="2" fill="#E96126" opacity="0.15" />
              <path d="M197 132 Q202 132 202 136 Q202 140 197 140" stroke="#E96126" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" fill="none" />
              <path d="M188 126 Q189 122 191 126" stroke="#E96126" strokeWidth="1" strokeLinecap="round" opacity="0.12" fill="none" />
              <path d="M192 125 Q193 120 194 125" stroke="#E96126" strokeWidth="1" strokeLinecap="round" opacity="0.12" fill="none" />

              {/* Plant */}
              <rect x="55" y="120" width="10" height="20" rx="3" fill="#E96126" opacity="0.12" />
              <circle cx="60" cy="115" r="8" fill="#E96126" opacity="0.1" />
              <circle cx="55" cy="110" r="6" fill="#E96126" opacity="0.08" />
              <circle cx="65" cy="108" r="7" fill="#E96126" opacity="0.08" />

              {/* Floating search icons / magnifying glass */}
              <circle cx="195" cy="55" r="10" stroke="#E96126" strokeWidth="2" fill="none" opacity="0.2" />
              <line x1="202" y1="62" x2="208" y2="68" stroke="#E96126" strokeWidth="2" strokeLinecap="round" opacity="0.2" />

              {/* Floating profile cards */}
              <rect x="28" y="55" width="30" height="22" rx="4" fill="#E96126" opacity="0.08" />
              <circle cx="38" cy="62" r="3" fill="#E96126" opacity="0.12" />
              <rect x="43" y="61" width="10" height="2" rx="1" fill="#E96126" opacity="0.1" />
              <rect x="43" y="65" width="8" height="1.5" rx="1" fill="#E96126" opacity="0.07" />

              <rect x="210" y="85" width="30" height="22" rx="4" fill="#E96126" opacity="0.08" />
              <circle cx="220" cy="92" r="3" fill="#E96126" opacity="0.12" />
              <rect x="225" y="91" width="10" height="2" rx="1" fill="#E96126" opacity="0.1" />
              <rect x="225" y="95" width="8" height="1.5" rx="1" fill="#E96126" opacity="0.07" />

              {/* Decorative dots */}
              <circle cx="22" cy="90" r="3" fill="#E96126" opacity="0.1" />
              <circle cx="240" cy="45" r="2.5" fill="#E96126" opacity="0.12" />
              <circle cx="45" cy="175" r="2" fill="#E96126" opacity="0.08" />
              <circle cx="220" cy="165" r="3" fill="#E96126" opacity="0.08" />

              {/* Sparkles */}
              <path d="M35 35l1.5 3 3 .5-2.5 2 .5 3-2.5-1.5-2.5 1.5.5-3-2.5-2 3-.5z" fill="#E96126" opacity="0.12" />
              <path d="M230 30l1 2 2.5 .5-2 1.5.5 2.5-2-1-2 1 .5-2.5-2-1.5 2.5-.5z" fill="#E96126" opacity="0.1" />

              {/* Heart */}
              <path d="M48 42c0-2 1.5-3.5 3.5-3.5S55 40 55 42c0 0 0 .5-.2.8L51.5 47l-3.3-4.2c-.2-.3-.2-.8-.2-.8z" fill="#E96126" opacity="0.1" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-3 font-serif">Find Your Perfect Match!</h2>
          <p className="text-brand-gray text-sm max-w-md text-center mb-8">
            Search our database of influencers by country, genre, audience size and more to find the perfect collaborators for your brand.
          </p>

          <button
            onClick={() => setSearchPanelOpen(true)}
            className="bg-brand-accent text-white font-bold text-sm px-8 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <SearchIcon className="w-4 h-4" />
            Start Searching
          </button>
        </div>

        {/* Search Panel Slide-out */}
        {searchPanelOpen && (
          <>
            <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSearchPanelOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
              {/* Panel Header */}
              <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg text-brand-dark font-serif">Search Influencers</h3>
                  <button
                    onClick={() => setSearchPanelOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-dark hover:bg-gray-100 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Panel Body */}
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">Country</label>
                  <select
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                  >
                    <option value="">Select Country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">State</label>
                  <select
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">City</label>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">Influencer Content Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={e => setSelectedGenre(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                  >
                    <option value="">Select Category</option>
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>

                {/* Audience Range */}
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">Audience</label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="From"
                        value={audienceFrom}
                        onChange={e => setAudienceFrom(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <div className="flex items-center text-gray-300 text-sm font-medium">to</div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="To"
                        value={audienceTo}
                        onChange={e => setAudienceTo(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="px-8 py-6 border-t border-gray-100 space-y-3">
                <button
                  onClick={handleSearch}
                  className="w-full bg-brand-accent text-white font-bold text-sm py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <SearchIcon className="w-4 h-4" />
                  Search Influencers
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-brand-gray font-semibold text-sm py-2 hover:text-brand-accent transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Results View
  return (
    <div className="-m-6 md:-m-10">
      <div className="p-6 md:p-10">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-brand-dark font-serif mb-1">Search Results</h1>
            <p className="text-sm text-brand-gray">
              {filteredResults.length} influencer{filteredResults.length !== 1 ? 's' : ''} found
              {selectedCountry && <span> in <span className="text-brand-accent font-semibold">{selectedCountry}</span></span>}
              {selectedGenre && <span> &middot; <span className="text-brand-accent font-semibold">{selectedGenre}</span></span>}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setHasSearched(false); handleReset(); }}
              className="text-sm font-semibold text-brand-gray hover:text-brand-accent transition-colors"
            >
              Clear Search
            </button>
            <button
              onClick={() => setSearchPanelOpen(true)}
              className="bg-brand-accent text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <SearchIcon className="w-4 h-4" />
              Refine Search
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCountry || selectedGenre || selectedCity) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCountry && (
              <span className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1.5 rounded-full">
                {selectedCountry}
                <button onClick={() => setSelectedCountry('')} className="hover:text-brand-dark transition-colors">&times;</button>
              </span>
            )}
            {selectedGenre && (
              <span className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1.5 rounded-full">
                {selectedGenre}
                <button onClick={() => setSelectedGenre('')} className="hover:text-brand-dark transition-colors">&times;</button>
              </span>
            )}
            {selectedCity && (
              <span className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1.5 rounded-full">
                {selectedCity}
                <button onClick={() => setSelectedCity('')} className="hover:text-brand-dark transition-colors">&times;</button>
              </span>
            )}
          </div>
        )}

        {/* Results Grid */}
        {paginatedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {paginatedResults.map((influencer) => (
              <div
                key={influencer.id}
                onClick={() => onInfluencerClick?.(influencer)}
                className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden hover:shadow-panel transition-all group cursor-pointer"
              >
                <div className="flex">
                  {/* Photo */}
                  <div className="relative w-36 h-44 flex-shrink-0">
                    <img
                      src={influencer.imageUrl}
                      alt={influencer.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Bookmark overlay */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(influencer.id); }}
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        bookmarkedIds.has(influencer.id)
                          ? 'bg-brand-accent text-white'
                          : 'bg-white/80 text-brand-gray hover:bg-brand-accent hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill={bookmarkedIds.has(influencer.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-bold text-sm text-brand-dark truncate">{influencer.name}</h3>
                      <p className="text-xs font-semibold text-brand-accent mt-0.5">{influencer.category}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-brand-gray font-medium">{influencer.followers} followers</span>
                        <span className="text-sm">{influencer.flag}</span>
                      </div>
                      <p className="text-[11px] text-brand-gray mt-2 line-clamp-2 leading-relaxed">{influencer.bio}</p>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Social icons */}
                      <div className="flex items-center gap-2 text-brand-gray">
                        {influencer.platforms.map(p => (
                          <span key={p} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                            {getPlatformIcon(p)}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <button onClick={() => onInfluencerClick?.(influencer)} className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-accent hover:bg-brand-accent/5 transition-all" title="View Profile">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-accent hover:bg-brand-accent/5 transition-all" title="Export">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-gray hover:text-red-500 hover:bg-red-50 transition-all" title="Remove">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-accent hover:bg-brand-accent/5 transition-all" title="Add to List">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-bold text-brand-dark mb-2">No results found</h3>
            <p className="text-sm text-brand-gray">Try adjusting your search filters</p>
          </div>
        )}

        {/* Pagination Footer */}
        {paginatedResults.length > 0 && (
          <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-soft px-6 py-4">
            <div className="flex items-center gap-2 text-xs text-brand-gray">
              <span className="font-semibold">View</span>
              {[20, 50, 100].map(size => (
                <button
                  key={size}
                  onClick={() => { setPageSize(size); setCurrentPage(1); }}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    pageSize === size
                      ? 'bg-brand-accent text-white'
                      : 'hover:bg-gray-100 text-brand-gray'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-accent hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-brand-accent text-white'
                      : 'text-brand-gray hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-accent hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Panel Slide-out (also available in results) */}
      {searchPanelOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSearchPanelOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-50 flex flex-col">
            {/* Panel Header */}
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-brand-dark font-serif">Search Influencers</h3>
                <button
                  onClick={() => setSearchPanelOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-gray hover:text-brand-dark hover:bg-gray-100 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
              {/* Country */}
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">Country</label>
                <select
                  value={selectedCountry}
                  onChange={e => setSelectedCountry(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                >
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">State</label>
                <select
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                >
                  <option value="">Select State</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">City</label>
                <select
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                >
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Genre */}
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">Influencer Content Genre</label>
                <select
                  value={selectedGenre}
                  onChange={e => setSelectedGenre(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
                >
                  <option value="">Select Category</option>
                  {genres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* Audience Range */}
              <div>
                <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wider">Audience</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="From"
                      value={audienceFrom}
                      onChange={e => setAudienceFrom(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="flex items-center text-gray-300 text-sm font-medium">to</div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="To"
                      value={audienceTo}
                      onChange={e => setAudienceTo(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark bg-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-8 py-6 border-t border-gray-100 space-y-3">
              <button
                onClick={handleSearch}
                className="w-full bg-brand-accent text-white font-bold text-sm py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <SearchIcon className="w-4 h-4" />
                Search Influencers
              </button>
              <button
                onClick={handleReset}
                className="w-full text-brand-gray font-semibold text-sm py-2 hover:text-brand-accent transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchView;
