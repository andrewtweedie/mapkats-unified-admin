
import React from 'react';

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
  imageUrl: string;
  category: string;
  flag: string;
  followers: string;
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

// ── Mock Data ───────────────────────────────────────────────────────────
const savedProCollections: SavedProCollection[] = [
  { name: "Australia's Best Wellness Educators", imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '4.1M', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "New York's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=200', influencerCount: 9, combinedAudience: '153.8K', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "LA's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '1.7M', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
  { name: "London's Best Bartenders", imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=200', influencerCount: 12, combinedAudience: '593.1K', createdDate: 'June 23 2025', savedDate: 'September 24 2025' },
];

const savedInfluencers: SavedInfluencer[] = [
  { name: 'Finebrands', imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=200', category: 'Bar', flag: '🇸🇪', followers: '779' },
  { name: "Shanky's Whip", imageUrl: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=200', category: '', flag: '', followers: '13,866' },
  { name: 'Tammy Moore Jackson', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', category: 'Home Bartender', flag: '🇬🇧', followers: '44,067' },
  { name: 'Bella Varelis', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', category: 'Aesthetic Life', flag: '🇦🇺', followers: '161,754' },
  { name: 'Josue Romero', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', category: 'Bartender', flag: '🇺🇸', followers: '81,875' },
];

const savedCategories: SavedCategory[] = [
  { name: 'Dessert Chef', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=200', influencerCount: 4, combinedAudience: '523.9K' },
];

const savedLists: SavedList[] = [
  { name: 'Gluten Free Australia', imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=200', influencerCount: 6, combinedAudience: '767.6K', createdDate: 'September 24 2025' },
];

// ── Component ───────────────────────────────────────────────────────────
interface MySavesViewProps {
  onNavigateToSection?: (section: 'pro-collections' | 'influencers' | 'categories' | 'lists') => void;
  onInfluencerClick?: (influencer: any) => void;
  onInfluencerPopupClick?: (influencer: any) => void;
  onProCollectionClick?: (name: string) => void;
  onCategoryClick?: (name: string) => void;
}

const MySavesView: React.FC<MySavesViewProps> = ({ onNavigateToSection, onInfluencerClick, onInfluencerPopupClick, onProCollectionClick, onCategoryClick }) => {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">My Saves</h1>

      {/* ═══════════════════════════════════════
          MY SAVED PRO COLLECTIONS
          ═══════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <h2 className="text-lg font-serif font-black text-brand-dark">My Saved Pro Collections</h2>
            </div>
            <button
              onClick={() => onNavigateToSection?.('pro-collections')}
              className="text-[11px] font-bold text-brand-accent border border-brand-accent px-4 py-1.5 rounded-lg hover:bg-brand-accent hover:text-white transition-all"
            >
              See All
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {savedProCollections.map((item, idx) => (
            <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => onProCollectionClick?.(item.name)}>
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{item.name}</h4>
                <p className="text-[11px] font-bold text-brand-gray mt-0.5">
                  {item.influencerCount} Influencers &middot; {item.combinedAudience} Combined Audience
                </p>
                <p className="text-[10px] text-brand-gray mt-0.5">
                  Created: {item.createdDate} &middot; Saved: {item.savedDate}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button className="text-brand-gray hover:text-teal-500 transition-colors p-1.5" title="Export">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button className="text-brand-gray hover:text-red-500 transition-colors p-1.5" title="Remove">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button className="bg-brand-accent text-white font-bold py-2.5 px-8 rounded-xl text-[12px] shadow-md hover:brightness-110 transition-all">
            Discover More
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MY SAVED INFLUENCERS
          ═══════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <h2 className="text-lg font-serif font-black text-brand-dark">My Saved Influencers</h2>
            </div>
            <button
              onClick={() => onNavigateToSection?.('influencers')}
              className="text-[11px] font-bold text-brand-accent border border-brand-accent px-4 py-1.5 rounded-lg hover:bg-brand-accent hover:text-white transition-all"
            >
              See All
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {savedInfluencers.map((inf, idx) => (
            <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => onInfluencerClick?.({
              id: `saved-inf-${idx}`,
              name: inf.name,
              imageUrl: inf.imageUrl,
              category: inf.category || 'Influencer',
              followers: inf.followers,
              country: inf.flag ? '' : '',
              flag: inf.flag || '',
              city: '',
              bio: '',
              platforms: ['instagram'] as ('instagram' | 'tiktok' | 'youtube')[],
            })}>
              {/* Avatar */}
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{inf.name}</h4>
                <div className="flex items-center gap-2 text-[11px] font-bold text-brand-gray mt-0.5">
                  {inf.flag && <span className="text-base">{inf.flag}</span>}
                  {inf.category && <span>{inf.category}</span>}
                  {inf.category && <span className="w-1 h-1 bg-gray-200 rounded-full" />}
                  <span>{inf.followers} Followers</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button className="text-brand-gray hover:text-blue-500 transition-colors p-1.5" title="Quick View" onClick={() => onInfluencerPopupClick?.({
                  name: inf.name,
                  imageUrl: inf.imageUrl,
                  category: inf.category || 'Influencer',
                  stats: inf.followers,
                  flag: inf.flag || '',
                })}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
                <button className="text-brand-gray hover:text-teal-500 transition-colors p-1.5" title="Export">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button className="text-brand-gray hover:text-red-500 transition-colors p-1.5" title="Remove">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button className="bg-brand-accent text-white font-bold py-2.5 px-8 rounded-xl text-[12px] shadow-md hover:brightness-110 transition-all">
            Discover More
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MY SAVED CATEGORIES
          ═══════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <h2 className="text-lg font-serif font-black text-brand-dark">My Saved Categories</h2>
            </div>
            <button
              onClick={() => onNavigateToSection?.('categories')}
              className="text-[11px] font-bold text-brand-accent border border-brand-accent px-4 py-1.5 rounded-lg hover:bg-brand-accent hover:text-white transition-all"
            >
              See All
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {savedCategories.map((cat, idx) => (
            <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => onCategoryClick?.(cat.name)}>
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{cat.name}</h4>
                <p className="text-[11px] font-bold text-brand-gray mt-0.5">
                  {cat.influencerCount} Influencers &middot; {cat.combinedAudience} Combined Audience
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button className="text-brand-gray hover:text-teal-500 transition-colors p-1.5" title="Export">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button className="text-brand-gray hover:text-red-500 transition-colors p-1.5" title="Remove">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button className="bg-brand-accent text-white font-bold py-2.5 px-8 rounded-xl text-[12px] shadow-md hover:brightness-110 transition-all">
            Discover More
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MY SAVED LISTS
          ═══════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              <h2 className="text-lg font-serif font-black text-brand-dark">My Saved Lists</h2>
            </div>
            <button
              onClick={() => onNavigateToSection?.('lists')}
              className="text-[11px] font-bold text-brand-accent border border-brand-accent px-4 py-1.5 rounded-lg hover:bg-brand-accent hover:text-white transition-all"
            >
              See All
            </button>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {savedLists.map((list, idx) => (
            <div key={idx} className="flex items-center px-6 py-5 gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group">
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                <img src={list.imageUrl} alt={list.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-black text-brand-dark group-hover:text-brand-accent transition-colors">{list.name}</h4>
                <p className="text-[11px] font-bold text-brand-gray mt-0.5">
                  {list.influencerCount} Influencers &middot; {list.combinedAudience} Combined Audience
                </p>
                <p className="text-[10px] text-brand-gray mt-0.5">
                  Created: {list.createdDate}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button className="text-brand-gray hover:text-teal-500 transition-colors p-1.5" title="Export">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button className="text-brand-gray hover:text-red-500 transition-colors p-1.5" title="Remove">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button className="bg-brand-accent text-white font-bold py-2.5 px-8 rounded-xl text-[12px] shadow-md hover:brightness-110 transition-all">
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default MySavesView;
