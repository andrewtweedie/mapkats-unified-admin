
import React, { useState, useMemo } from 'react';

// ── Data Types ──────────────────────────────────────────────────────────
interface SavedProCollection {
  name: string;
  imageUrl: string;
  influencerCount: number;
  combinedAudience: string;
  createdDate: string;
  savedDate: string;
}

interface SavedInfluencer {
  name: string;
  handle: string;
  imageUrl: string;
  category: string;
  flag: string;
  followers: string;
  location: string;
}

interface SavedCategory {
  name: string;
  imageUrl: string;
  influencerCount: number;
  combinedAudience: string;
}

interface SavedList {
  name: string;
  imageUrl: string;
  influencerCount: number;
  combinedAudience: string;
  createdDate: string;
}

// ── Mock Data (expanded for pagination demo) ────────────────────────────
const allSavedProCollections: SavedProCollection[] = [
  { name: "Australia's Best Wellness Educators", imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '4.1M', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "New York's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '153.8K', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "LA's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '1.7M', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "London's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '593.1K', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "Sydney's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '68.6K', createdDate: 'July 10 2025', savedDate: 'October 1 2025' },
  { name: "Best Home Bartenders USA", imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '21M', createdDate: 'August 5 2025', savedDate: 'October 15 2025' },
  { name: "Best US No & Low Drink Makers", imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=200', influencerCount: 7, combinedAudience: '144.9K', createdDate: 'August 20 2025', savedDate: 'November 1 2025' },
  { name: "Best Nordic Home Entertainers", imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200', influencerCount: 11, combinedAudience: '2.3M', createdDate: 'September 1 2025', savedDate: 'November 10 2025' },
];

const allSavedInfluencers: SavedInfluencer[] = [
  { name: 'Finebrands', handle: '@finebrands', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=200', category: 'Bar', flag: '🇸🇪', followers: '779', location: 'Stockholm' },
  { name: "Shanky's Whip", handle: '@shankyswhip', imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=200', category: 'Brand', flag: '🇮🇪', followers: '13,866', location: 'Dublin' },
  { name: 'Tammy Moore Jackson', handle: '@tammymoorejackson', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', category: 'Home Bartender', flag: '🇬🇧', followers: '44,067', location: 'London' },
  { name: 'Bella Varelis', handle: '@bellavarelis', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', category: 'Aesthetic Life', flag: '🇦🇺', followers: '161,754', location: 'Sydney' },
  { name: 'Josue Romero', handle: '@josueromero', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', category: 'Bartender', flag: '🇺🇸', followers: '81,875', location: 'New York' },
  { name: 'Emma Chen', handle: '@emmachen', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', category: 'Food Blogger', flag: '🇺🇸', followers: '234,500', location: 'San Francisco' },
  { name: 'Marco Rossi', handle: '@marcorossi', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', category: 'Chef', flag: '🇮🇹', followers: '567,200', location: 'Milan' },
  { name: 'Yuki Tanaka', handle: '@yukitanaka', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', category: 'Mixologist', flag: '🇯🇵', followers: '98,340', location: 'Tokyo' },
  { name: 'Sophie Laurent', handle: '@sophielaurent', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200', category: 'Lifestyle', flag: '🇫🇷', followers: '412,800', location: 'Paris' },
  { name: 'James Wilson', handle: '@jameswilson', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', category: 'Bartender', flag: '🇬🇧', followers: '67,500', location: 'Manchester' },
  { name: 'Ana Silva', handle: '@anasilva', imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200', category: 'Home Cook', flag: '🇧🇷', followers: '189,300', location: 'São Paulo' },
  { name: 'David Kim', handle: '@davidkim', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', category: 'Sommelier', flag: '🇰🇷', followers: '45,600', location: 'Seoul' },
  { name: 'Lisa Park', handle: '@lisapark', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200', category: 'Food Stylist', flag: '🇰🇷', followers: '320,100', location: 'Seoul' },
  { name: 'Tom Hardy', handle: '@tomhardy_bar', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200', category: 'Cocktail Artist', flag: '🇺🇸', followers: '156,700', location: 'Chicago' },
];

const allSavedCategories: SavedCategory[] = [
  { name: 'Dessert Chef', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=200', influencerCount: 4, combinedAudience: '523.9K' },
  { name: 'Bartender', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200', influencerCount: 28, combinedAudience: '4.2M' },
  { name: 'Home Cook', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=200', influencerCount: 15, combinedAudience: '1.8M' },
  { name: 'Food Blogger', imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=200', influencerCount: 42, combinedAudience: '8.5M' },
  { name: 'Mixologist', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '1.1M' },
  { name: 'Pastry Chef', imageUrl: 'https://images.unsplash.com/photo-1486427944544-d2c246c4df38?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '670.3K' },
  { name: 'Wine Expert', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=200', influencerCount: 7, combinedAudience: '340.1K' },
  { name: 'Vegan Chef', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200', influencerCount: 19, combinedAudience: '2.9M' },
  { name: 'BBQ Master', imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=200', influencerCount: 11, combinedAudience: '1.5M' },
  { name: 'Coffee Expert', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=200', influencerCount: 8, combinedAudience: '560.8K' },
];

const allSavedLists: SavedList[] = [
  { name: 'Gluten Free Australia', imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=200', influencerCount: 6, combinedAudience: '767.6K', createdDate: 'September 24 2025' },
  { name: 'Vegan UK Creators', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '2.1M', createdDate: 'October 5 2025' },
  { name: 'Cocktail Innovators NYC', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200', influencerCount: 8, combinedAudience: '890.4K', createdDate: 'October 15 2025' },
  { name: 'Farm to Table Champions', imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=200', influencerCount: 10, combinedAudience: '1.4M', createdDate: 'November 1 2025' },
  { name: 'Asian Fusion Stars', imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=200', influencerCount: 14, combinedAudience: '3.2M', createdDate: 'November 20 2025' },
  { name: 'Healthy Eating Advocates', imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '1.8M', createdDate: 'December 1 2025' },
  { name: 'Brunch Specialists London', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=200', influencerCount: 7, combinedAudience: '560.2K', createdDate: 'December 10 2025' },
  { name: 'Plant-Based LA', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200', influencerCount: 11, combinedAudience: '2.5M', createdDate: 'January 5 2026' },
  { name: 'Wine & Dine Europe', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=200', influencerCount: 16, combinedAudience: '4.1M', createdDate: 'January 15 2026' },
];

// ── Pagination Config ───────────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;

// ── Component Props ─────────────────────────────────────────────────────
type SectionType = 'pro-collections' | 'influencers' | 'categories' | 'lists';

interface MySavesSectionViewProps {
  section: SectionType;
  onBack: () => void;
  onInfluencerClick?: (influencer: any) => void;
  onInfluencerPopupClick?: (influencer: any) => void;
  onProCollectionClick?: (name: string) => void;
  onCategoryClick?: (name: string) => void;
}

// ── Pagination Component ────────────────────────────────────────────────
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <p className="text-[12px] font-semibold text-brand-gray">
        Showing {startItem}–{endItem} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 rounded-lg text-[12px] font-bold text-brand-gray hover:text-brand-accent hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Prev
        </button>
        {getPageNumbers().map((page, idx) =>
          typeof page === 'string' ? (
            <span key={`ellipsis-${idx}`} className="px-1.5 py-1.5 text-[12px] text-brand-gray">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg text-[12px] font-bold transition-all ${
                page === currentPage
                  ? 'bg-brand-accent text-white shadow-sm'
                  : 'text-brand-gray hover:text-brand-accent hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2.5 py-1.5 rounded-lg text-[12px] font-bold text-brand-gray hover:text-brand-accent hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────
const MySavesSectionView: React.FC<MySavesSectionViewProps> = ({ section, onBack, onInfluencerClick, onInfluencerPopupClick, onProCollectionClick, onCategoryClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Section configuration
  const sectionConfig = {
    'pro-collections': {
      title: 'My Saved Pro Collections',
      singularTitle: 'Pro Collection',
      data: allSavedProCollections,
    },
    'influencers': {
      title: 'My Saved Influencers',
      singularTitle: 'Influencer',
      data: allSavedInfluencers,
    },
    'categories': {
      title: 'My Saved Categories',
      singularTitle: 'Category',
      data: allSavedCategories,
    },
    'lists': {
      title: 'My Saved Lists',
      singularTitle: 'List',
      data: allSavedLists,
    },
  };

  const config = sectionConfig[section];

  // Filter data based on search (only for influencers section)
  const filteredData = useMemo(() => {
    if (section !== 'influencers' || !searchQuery.trim()) return config.data;
    const q = searchQuery.toLowerCase();
    return (config.data as SavedInfluencer[]).filter(
      (inf) => inf.name.toLowerCase().includes(q) || inf.handle.toLowerCase().includes(q)
    );
  }, [section, searchQuery, config.data]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of content
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // ── Render Row Helpers ──────────────────────────────────────────────
  const renderProCollectionRow = (item: SavedProCollection, idx: number) => (
    <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => onProCollectionClick?.(item.name)}>
      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{item.name}</h4>
        <p className="text-[11px] font-bold text-brand-gray mt-0.5">
          {item.influencerCount} Influencers &middot; {item.combinedAudience} Combined Audience
        </p>
        <p className="text-[10px] text-brand-gray mt-0.5">
          Created: {item.createdDate} &middot; Saved: {item.savedDate}
        </p>
      </div>
      {renderActionButtons()}
    </div>
  );

  const renderInfluencerRow = (item: SavedInfluencer, idx: number) => (
    <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => onInfluencerClick?.({
      id: `saved-inf-${idx}`,
      name: item.name,
      imageUrl: item.imageUrl,
      category: item.category || 'Influencer',
      followers: item.followers,
      country: '',
      flag: item.flag || '',
      city: item.location || '',
      bio: '',
      platforms: ['instagram'] as ('instagram' | 'tiktok' | 'youtube')[],
    })}>
      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{item.name}</h4>
        <div className="flex items-center gap-2 text-[11px] font-bold text-brand-gray mt-0.5">
          {item.flag && <span className="text-base">{item.flag}</span>}
          {item.category && <span>{item.category}</span>}
          {item.category && <span className="w-1 h-1 bg-gray-200 rounded-full" />}
          <span>{item.followers} Followers</span>
        </div>
        {item.location && (
          <p className="text-[10px] text-brand-gray mt-0.5">{item.location}</p>
        )}
      </div>
      {renderActionButtons(() => onInfluencerPopupClick?.({
        name: item.name,
        imageUrl: item.imageUrl,
        category: item.category || 'Influencer',
        stats: item.followers,
        flag: item.flag || '',
      }))}
    </div>
  );

  const renderCategoryRow = (item: SavedCategory, idx: number) => (
    <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => onCategoryClick?.(item.name)}>
      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{item.name}</h4>
        <p className="text-[11px] font-bold text-brand-gray mt-0.5">
          {item.influencerCount} Influencers &middot; {item.combinedAudience} Combined Audience
        </p>
      </div>
      {renderActionButtons()}
    </div>
  );

  const renderListRow = (item: SavedList, idx: number) => (
    <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group">
      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{item.name}</h4>
        <p className="text-[11px] font-bold text-brand-gray mt-0.5">
          {item.influencerCount} Influencers &middot; {item.combinedAudience} Combined Audience
        </p>
        <p className="text-[10px] text-brand-gray mt-0.5">
          Created: {item.createdDate}
        </p>
      </div>
      {renderActionButtons()}
    </div>
  );

  const renderActionButtons = (onEyeClick?: () => void) => (
    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
      {onEyeClick && (
        <button className="text-brand-gray hover:text-blue-500 transition-colors p-1.5" title="Quick View" onClick={onEyeClick}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
      )}
      <button className="text-brand-gray hover:text-teal-500 transition-colors p-1.5" title="Export">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
      </button>
      <button className="text-brand-gray hover:text-red-500 transition-colors p-1.5" title="Remove">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  );

  const renderRow = (item: any, idx: number) => {
    switch (section) {
      case 'pro-collections':
        return renderProCollectionRow(item as SavedProCollection, idx);
      case 'influencers':
        return renderInfluencerRow(item as SavedInfluencer, idx);
      case 'categories':
        return renderCategoryRow(item as SavedCategory, idx);
      case 'lists':
        return renderListRow(item as SavedList, idx);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] font-semibold text-brand-gray">
        <button onClick={onBack} className="hover:text-brand-accent transition-colors">My Saves</button>
        <span className="text-gray-300">›</span>
        <span className="text-brand-dark">{config.title.replace('My Saved ', '')}</span>
      </div>

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">{config.title}</h1>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold text-brand-gray bg-gray-100 px-3 py-1 rounded-lg">
            {filteredData.length} {filteredData.length === 1 ? config.singularTitle : config.title.replace('My Saved ', '')}
          </span>
        </div>
      </div>

      {/* Search Bar (Influencers section only) */}
      {section === 'influencers' && (
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input
              type="text"
              placeholder="Find creator by @username or name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-[13px] font-semibold text-brand-dark placeholder:text-brand-gray/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/20 transition-all"
            />
          </div>
          <button className="w-12 h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center hover:brightness-110 transition-all shadow-md flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
      )}

      {/* Content Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            <h2 className="text-lg font-serif font-black text-brand-dark">{config.title}</h2>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, idx) => renderRow(item, idx))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-[14px] font-semibold text-brand-gray">
                {searchQuery ? 'No results found for your search.' : 'No saved items yet.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="mt-3 text-[12px] font-bold text-brand-accent hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredData.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default MySavesSectionView;
