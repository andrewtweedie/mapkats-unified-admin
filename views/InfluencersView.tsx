
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

// ─── Category data ──────────────────────────────────────────────────────────
export interface CategoryData {
  name: string;
  color: string;
  totalInfluencers: number;
  countries: { country: string; flag: string; count: number }[];
}

export interface CountryData {
  country: string;
  flag: string;
  totalInfluencers: number;
  categories: { category: string; count: number }[];
}

const categoriesData: CategoryData[] = [
  {
    name: 'Lifestyle', color: '#7C3AED', totalInfluencers: 19118,
    countries: [
      { country: 'United States', flag: '🇺🇸', count: 4880 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 2777 },
      { country: 'Germany', flag: '🇩🇪', count: 2663 },
      { country: 'Australia', flag: '🇦🇺', count: 1741 },
      { country: 'The Netherlands', flag: '🇳🇱', count: 1626 },
      { country: 'Italy', flag: '🇮🇹', count: 1412 },
      { country: 'France', flag: '🇫🇷', count: 909 },
      { country: 'Denmark', flag: '🇩🇰', count: 433 },
      { country: 'Spain', flag: '🇪🇸', count: 387 },
      { country: 'Bulgaria', flag: '🇧🇬', count: 783 },
    ],
  },
  {
    name: 'Food', color: '#F59E0B', totalInfluencers: 9553,
    countries: [
      { country: 'United States', flag: '🇺🇸', count: 3121 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 2253 },
      { country: 'Germany', flag: '🇩🇪', count: 1516 },
      { country: 'Spain', flag: '🇪🇸', count: 471 },
      { country: 'Australia', flag: '🇦🇺', count: 399 },
      { country: 'Italy', flag: '🇮🇹', count: 346 },
      { country: 'France', flag: '🇫🇷', count: 241 },
      { country: 'The Netherlands', flag: '🇳🇱', count: 224 },
    ],
  },
  {
    name: 'No Category', color: '#9CA3AF', totalInfluencers: 1938,
    countries: [
      { country: 'No Country', flag: '🌍', count: 1838 },
      { country: 'United States', flag: '🇺🇸', count: 28 },
      { country: 'Republic of Ireland', flag: '🇮🇪', count: 18 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 17 },
      { country: 'Australia', flag: '🇦🇺', count: 12 },
    ],
  },
  {
    name: 'Bartender', color: '#06B6D4', totalInfluencers: 1879,
    countries: [
      { country: 'United States', flag: '🇺🇸', count: 673 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 370 },
      { country: 'The Netherlands', flag: '🇳🇱', count: 173 },
      { country: 'Australia', flag: '🇦🇺', count: 151 },
      { country: 'Italy', flag: '🇮🇹', count: 106 },
    ],
  },
  {
    name: 'Mum Lifestyle', color: '#EC4899', totalInfluencers: 1803,
    countries: [
      { country: 'Australia', flag: '🇦🇺', count: 675 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 563 },
      { country: 'United States', flag: '🇺🇸', count: 512 },
      { country: 'Denmark', flag: '🇩🇰', count: 36 },
      { country: 'Sweden', flag: '🇸🇪', count: 6 },
    ],
  },
  {
    name: 'Outfits and Lifestyle', color: '#8B5CF6', totalInfluencers: 1799,
    countries: [
      { country: 'United States', flag: '🇺🇸', count: 714 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 412 },
      { country: 'Italy', flag: '🇮🇹', count: 215 },
      { country: 'Germany', flag: '🇩🇪', count: 119 },
      { country: 'Denmark', flag: '🇩🇰', count: 104 },
    ],
  },
  {
    name: 'Music', color: '#1D4ED8', totalInfluencers: 1393,
    countries: [
      { country: 'United Kingdom', flag: '🇬🇧', count: 1187 },
      { country: 'Bulgaria', flag: '🇧🇬', count: 59 },
      { country: 'United States', flag: '🇺🇸', count: 29 },
      { country: 'Belgium', flag: '🇧🇪', count: 27 },
      { country: 'Nigeria', flag: '🇳🇬', count: 24 },
    ],
  },
  {
    name: 'Alcohol', color: '#B45309', totalInfluencers: 1383,
    countries: [
      { country: 'United States', flag: '🇺🇸', count: 545 },
      { country: 'Spain', flag: '🇪🇸', count: 136 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 126 },
      { country: 'Germany', flag: '🇩🇪', count: 118 },
      { country: 'Australia', flag: '🇦🇺', count: 68 },
    ],
  },
  {
    name: 'Fashion', color: '#E11D48', totalInfluencers: 1135,
    countries: [
      { country: 'Germany', flag: '🇩🇪', count: 344 },
      { country: 'United States', flag: '🇺🇸', count: 273 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 157 },
      { country: 'Bulgaria', flag: '🇧🇬', count: 66 },
      { country: 'Australia', flag: '🇦🇺', count: 64 },
    ],
  },
  {
    name: 'Home Cooking', color: '#854D0E', totalInfluencers: 1054,
    countries: [
      { country: 'United Kingdom', flag: '🇬🇧', count: 351 },
      { country: 'Denmark', flag: '🇩🇰', count: 263 },
      { country: 'United States', flag: '🇺🇸', count: 185 },
      { country: 'Sweden', flag: '🇸🇪', count: 173 },
      { country: 'Australia', flag: '🇦🇺', count: 41 },
    ],
  },
  {
    name: 'Archived', color: '#6B7280', totalInfluencers: 110,
    countries: [
      { country: 'Australia', flag: '🇦🇺', count: 43 },
      { country: 'United States', flag: '🇺🇸', count: 22 },
      { country: 'United Kingdom', flag: '🇬🇧', count: 17 },
      { country: 'Germany', flag: '🇩🇪', count: 10 },
      { country: 'The Netherlands', flag: '🇳🇱', count: 8 },
    ],
  },
];

const countriesData: CountryData[] = [
  {
    country: 'United States', flag: '🇺🇸', totalInfluencers: 18452,
    categories: [
      { category: 'Lifestyle', count: 4880 },
      { category: 'Food', count: 3121 },
      { category: 'Outfits and Lifestyle', count: 714 },
      { category: 'Bartender', count: 673 },
      { category: 'Mum Lifestyle', count: 512 },
    ],
  },
  {
    country: 'United Kingdom', flag: '🇬🇧', totalInfluencers: 12175,
    categories: [
      { category: 'Lifestyle', count: 2777 },
      { category: 'Food', count: 2253 },
      { category: 'Music', count: 1187 },
      { category: 'Mum Lifestyle', count: 563 },
      { category: 'Home Cooking', count: 485 },
    ],
  },
  {
    country: 'Australia', flag: '🇦🇺', totalInfluencers: 7266,
    categories: [
      { category: 'Lifestyle', count: 1741 },
      { category: 'Mum Lifestyle', count: 675 },
      { category: 'Family Lifestyle', count: 596 },
      { category: 'Lifestyle Media', count: 507 },
      { category: 'Aesthetic Life', count: 433 },
    ],
  },
  {
    country: 'Germany', flag: '🇩🇪', totalInfluencers: 5619,
    categories: [
      { category: 'Lifestyle', count: 2663 },
      { category: 'Food', count: 1516 },
      { category: 'Fashion', count: 344 },
      { category: 'Product Reviews', count: 176 },
      { category: 'Outfits and Lifestyle', count: 119 },
    ],
  },
  {
    country: 'The Netherlands', flag: '🇳🇱', totalInfluencers: 2343,
    categories: [
      { category: 'Lifestyle', count: 1626 },
      { category: 'Food', count: 224 },
      { category: 'Bartender', count: 173 },
      { category: 'Fashion', count: 53 },
      { category: 'Chef', count: 33 },
    ],
  },
  {
    country: 'Italy', flag: '🇮🇹', totalInfluencers: 2048,
    categories: [
      { category: 'Lifestyle', count: 792 },
      { category: 'Food', count: 346 },
      { category: 'Outfits and Lifestyle', count: 215 },
      { category: 'Travel Lifestyle', count: 167 },
      { category: 'Bartender', count: 106 },
    ],
  },
  {
    country: 'No Country', flag: '🌍', totalInfluencers: 2178,
    categories: [
      { category: 'No Category', count: 1838 },
      { category: 'Lifestyle', count: 163 },
      { category: 'Food', count: 30 },
      { category: 'Alcohol', count: 22 },
      { category: 'Gluten Free', count: 10 },
    ],
  },
  {
    country: 'Denmark', flag: '🇩🇰', totalInfluencers: 1746,
    categories: [
      { category: 'Lifestyle', count: 433 },
      { category: 'Home Cooking', count: 263 },
      { category: 'Social Lifestyle', count: 133 },
      { category: 'Home Lifestyle', count: 111 },
      { category: 'Aesthetic Life', count: 108 },
    ],
  },
  {
    country: 'France', flag: '🇫🇷', totalInfluencers: 1311,
    categories: [
      { category: 'Lifestyle', count: 909 },
      { category: 'Food', count: 241 },
      { category: 'Fashion', count: 38 },
      { category: 'Outfits and Lifestyle', count: 21 },
      { category: 'Travel', count: 19 },
    ],
  },
  {
    country: 'Bulgaria', flag: '🇧🇬', totalInfluencers: 1272,
    categories: [
      { category: 'Lifestyle', count: 783 },
      { category: 'Food', count: 107 },
      { category: 'Travel', count: 70 },
      { category: 'Fashion', count: 66 },
      { category: 'Music', count: 59 },
    ],
  },
  {
    country: 'Spain', flag: '🇪🇸', totalInfluencers: 994,
    categories: [
      { category: 'Food', count: 471 },
      { category: 'Lifestyle', count: 387 },
      { category: 'Alcohol', count: 136 },
    ],
  },
  {
    country: 'Sweden', flag: '🇸🇪', totalInfluencers: 852,
    categories: [
      { category: 'Home Cooking', count: 173 },
      { category: 'Lifestyle', count: 142 },
      { category: 'Food', count: 98 },
    ],
  },
];

// ─── Category Card Component ────────────────────────────────────────────────
const CategoryCard: React.FC<{
  category: CategoryData;
  onCountryClick: (category: string, country: string) => void;
}> = ({ category, onCountryClick }) => {
  const [showAll, setShowAll] = useState(false);
  const displayCountries = showAll ? category.countries : category.countries.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-panel transition-all flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: category.color }} />
          <h3 className="text-[14px] font-black text-brand-dark">{category.name}</h3>
        </div>
        <p className="text-[12px] font-bold text-brand-accent">{category.totalInfluencers.toLocaleString()} Total Influencers</p>
      </div>

      {/* Country list */}
      <div className="px-5 flex-1">
        <div className="space-y-0">
          {displayCountries.map((c, i) => (
            <button
              key={i}
              onClick={() => onCountryClick(category.name, c.country)}
              className="w-full flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{c.flag}</span>
                <span className="text-[12px] font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{c.country}</span>
              </div>
              <span className="text-[12px] font-bold text-brand-gray">{c.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View All */}
      {category.countries.length > 5 && (
        <div className="px-5 pb-4 pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2 text-[11px] font-black text-brand-accent uppercase tracking-wider hover:underline transition-colors"
          >
            {showAll ? 'Show Less' : `View All (${category.countries.length})`}
          </button>
        </div>
      )}
      {category.countries.length <= 5 && <div className="pb-4" />}
    </div>
  );
};

// ─── Country Card Component ─────────────────────────────────────────────────
const CountryCard: React.FC<{
  countryData: CountryData;
  onCategoryClick: (country: string, category: string) => void;
}> = ({ countryData, onCategoryClick }) => {
  const [showAll, setShowAll] = useState(false);
  const displayCategories = showAll ? countryData.categories : countryData.categories.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-panel transition-all flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{countryData.flag}</span>
          <h3 className="text-[14px] font-black text-brand-dark">{countryData.country}</h3>
        </div>
        <p className="text-[12px] font-bold text-brand-accent">{countryData.totalInfluencers.toLocaleString()} Total Influencers</p>
      </div>

      {/* Category list */}
      <div className="px-5 flex-1">
        <div className="space-y-0">
          {displayCategories.map((c, i) => (
            <button
              key={i}
              onClick={() => onCategoryClick(countryData.country, c.category)}
              className="w-full flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-all"
            >
              <span className="text-[12px] font-semibold text-brand-dark group-hover:text-brand-accent transition-colors">{c.category}</span>
              <span className="text-[12px] font-bold text-brand-gray">{c.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View All */}
      {countryData.categories.length > 5 && (
        <div className="px-5 pb-4 pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-2 text-[11px] font-black text-brand-accent uppercase tracking-wider hover:underline transition-colors"
          >
            {showAll ? 'Show Less' : `View All (${countryData.categories.length})`}
          </button>
        </div>
      )}
      {countryData.categories.length <= 5 && <div className="pb-4" />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// INFLUENCERS VIEW (Home Page)
// ═══════════════════════════════════════════════════════════════════════════

interface InfluencersViewProps {
  onNavigateToListing: (category: string, country: string) => void;
}

const InfluencersView: React.FC<InfluencersViewProps> = ({ onNavigateToListing }) => {
  const [activeSection, setActiveSection] = useState<'category' | 'country'>('category');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreCountries, setShowMoreCountries] = useState(false);

  // Compute totals
  const totalInfluencers = categoriesData.reduce((sum, c) => sum + c.totalInfluencers, 0);
  const totalCategories = categoriesData.length;
  const totalCountries = countriesData.length;

  // Filter categories
  const filteredCategories = categoriesData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedCategories = showMoreCategories ? filteredCategories : filteredCategories.slice(0, 10);

  // Filter countries
  const filteredCountries = countriesData.filter((c) =>
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedCountries = showMoreCountries ? filteredCountries : filteredCountries.slice(0, 12);

  const handleCategoryCountryClick = (category: string, country: string) => {
    onNavigateToListing(category, country);
  };

  const handleCountryCategoryClick = (country: string, category: string) => {
    onNavigateToListing(category, country);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Influencers</h1>
          <p className="text-[13px] text-brand-gray mt-1">Browse and manage influencers by category and country.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-center">
              <p className="text-lg font-bold text-gray-900">{totalInfluencers.toLocaleString()}</p>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Total</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-center">
              <p className="text-lg font-bold text-gray-900">{totalCategories}</p>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-center">
              <p className="text-lg font-bold text-gray-900">{totalCountries}</p>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <span className="absolute inset-y-0 left-4 flex items-center text-brand-gray"><SearchIcon className="w-4 h-4" /></span>
          <input
            type="text"
            placeholder={activeSection === 'category' ? 'Search categories...' : 'Search countries...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-[13px] font-semibold rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
          />
        </div>

        <div className="inline-flex items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => { setActiveSection('category'); setSearchQuery(''); }}
            className={`px-5 py-2.5 text-[12px] font-bold rounded-md transition-all ${
              activeSection === 'category' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            By Category
          </button>
          <button
            onClick={() => { setActiveSection('country'); setSearchQuery(''); }}
            className={`px-5 py-2.5 text-[12px] font-bold rounded-md transition-all ${
              activeSection === 'country' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            By Country
          </button>
        </div>
      </div>

      {/* ── BY CATEGORY SECTION ── */}
      {activeSection === 'category' && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Influencers by Category
            <span className="text-[13px] text-gray-400 font-normal ml-3">{filteredCategories.length} categories</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {displayedCategories.map((cat) => (
              <CategoryCard
                key={cat.name}
                category={cat}
                onCountryClick={handleCategoryCountryClick}
              />
            ))}
          </div>

          {filteredCategories.length > 10 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowMoreCategories(!showMoreCategories)}
                className="text-[12px] font-black text-brand-accent uppercase tracking-wider hover:underline transition-colors"
              >
                {showMoreCategories ? 'Show Less' : `View More (${filteredCategories.length - 10} more)`}
              </button>
            </div>
          )}
        </section>
      )}

      {/* ── BY COUNTRY SECTION ── */}
      {activeSection === 'country' && (
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Influencers by Country
            <span className="text-[13px] text-gray-400 font-normal ml-3">{filteredCountries.length} countries</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {displayedCountries.map((ctry) => (
              <CountryCard
                key={ctry.country}
                countryData={ctry}
                onCategoryClick={handleCountryCategoryClick}
              />
            ))}
          </div>

          {filteredCountries.length > 12 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowMoreCountries(!showMoreCountries)}
                className="text-[12px] font-black text-brand-accent uppercase tracking-wider hover:underline transition-colors"
              >
                {showMoreCountries ? 'Show Less' : `View More (${filteredCountries.length - 12} more)`}
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default InfluencersView;
