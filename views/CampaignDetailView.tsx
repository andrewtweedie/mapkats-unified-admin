
import React from 'react';
import { SearchIcon, PencilSquareIcon } from '../components/icons/UiIcons';
import UniversalSocialSearch from '../components/UniversalSocialSearch';

interface CampaignDetailViewProps {
  campaignName: string;
  onBack: () => void;
}

const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({ campaignName, onBack }) => {
  const tabs = ['Campaigns', 'Profiles', 'List', 'Post', 'Story', 'Insights'];
  const activeTab = 'Profiles';

  const influencers = [
    { name: 'avriltreasure', username: 'avriltreasure', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', category: 'Media', audience: '4,053', value: '70.72' },
    { name: 'georgiamay._', username: 'Georgia May', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', category: 'Wellness Lifestyle', audience: '6,329', value: '110.44' },
    { name: 'helenaandvikki', username: 'Helena and Vikki', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400', category: 'Home Cooking', audience: '26,482', value: '462.11' },
    { name: 'nicolamdale', username: 'Nicola Dale', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', category: 'Media', audience: '3,257', value: '56.84' },
    { name: 'sallycrinis', username: 'Sally Crinis', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400', category: 'Media', audience: '35,962', value: '627.53' },
    { name: 'tee_smyth', username: 'Tully Smyth', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400', category: 'Lifestyle Media', audience: '209,618', value: '3,657.84' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb / Back */}
      <button onClick={onBack} className="text-xs font-bold text-brand-gray hover:text-brand-accent flex items-center gap-1 uppercase tracking-widest">
        <span>←</span> Back to Campaigns
      </button>

      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">
            {campaignName} <span className="text-brand-gray opacity-40 font-sans font-bold text-2xl">(721)</span>
          </h1>
          <button className="p-2 text-brand-gray hover:text-brand-accent transition-colors">
            <PencilSquareIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex items-center bg-white p-1 rounded-xl shadow-soft border border-gray-100 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2.5 text-[11px] font-bold rounded-lg transition-all whitespace-nowrap ${
                tab === activeTab 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Optimized Action Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-end gap-8">
          
          {/* Group 1: Tools (Left) */}
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
          
          {/* Group 2: Condensed Social Search (Center) */}
          <UniversalSocialSearch />

          {/* Group 3: Dropdowns & Add Button (Right) */}
          <div className="flex flex-wrap items-end gap-3 shrink-0">
             <div className="flex flex-col space-y-1.5">
                <span className="text-[9px] font-extrabold text-brand-gray uppercase tracking-widest px-1">Category</span>
                <select className="bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-xs font-bold text-brand-dark min-w-[140px] focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Media</option>
                  <option>Lifestyle</option>
                </select>
             </div>
             <div className="flex flex-col space-y-1.5">
                <span className="text-[9px] font-extrabold text-brand-gray uppercase tracking-widest px-1">Tags</span>
                <select className="bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-xs font-bold text-brand-dark min-w-[140px] focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                  <option>All Tags</option>
                  <option>New</option>
                  <option>UGC</option>
                </select>
             </div>
             <button className="bg-brand-accent text-white font-black py-2.5 px-8 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase whitespace-nowrap h-[38px] flex items-center justify-center xl:mb-0.5">
               Add Influencers
             </button>
          </div>
        </div>
      </div>

      {/* Influencer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {influencers.map((inf, idx) => (
          <InfluencerProfileCard key={idx} {...inf} />
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 text-[11px] font-bold text-brand-gray">
         <div className="flex items-center gap-6">
            <span className="uppercase tracking-widest opacity-60">SHOWING 1 TO 12 OF 721 RESULTS</span>
            <div className="flex items-center gap-2">
               <span className="cursor-pointer hover:text-brand-accent">20</span>
               <span className="bg-brand-accent text-white px-2 py-1 rounded shadow-sm">50</span>
               <span className="cursor-pointer hover:text-brand-accent">100</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="opacity-40 hover:opacity-100 transition-opacity">PREVIOUS</button>
            <div className="flex gap-2">
              <span className="bg-brand-accent text-white px-2.5 py-1 rounded shadow-sm">1</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded">2</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded">3</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded">4</span>
            </div>
            <button className="hover:text-brand-accent transition-colors">NEXT</button>
         </div>
      </div>
    </div>
  );
};

// Helper for category-specific colors as requested
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Media': return 'bg-[#00529B]'; // Blue
    case 'Wellness Lifestyle': return 'bg-[#1A1E4B]'; // Dark Navy
    case 'Home Cooking': return 'bg-[#8B4513]'; // Brown/Sienna
    case 'Lifestyle Media': return 'bg-[#D6249F]'; // Pink/Purple
    default: return 'bg-brand-dark/80';
  }
};

// Sub-component for individual influencer cards
const InfluencerProfileCard: React.FC<any> = ({ name, username, imageUrl, category, audience, value }) => {
  const categoryBgColor = getCategoryColor(category);

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden group hover:shadow-panel transition-all hover:-translate-y-1">
      <div className="relative h-64 bg-gray-100">
         <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
         
         {/* Status Overlays */}
         <div className="absolute top-3 left-3 flex flex-col gap-1">
            <div className="w-7 h-7 bg-white/90 rounded-lg p-1.5 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">1</div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">0</div>
            <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center text-[10px] text-white font-black">0</div>
         </div>

         <div className="absolute top-3 right-3">
            <span className="bg-white text-brand-dark text-[9px] font-black px-2 py-1 rounded-md tracking-wider uppercase shadow-sm">NEW</span>
         </div>

         <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-center">
            {/* Genre Pill: Matches screenshot colours and increased flag size */}
            <div className={`${categoryBgColor} backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg`}>
               <span className="text-xl">🇦🇺</span>
               <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
            </div>
         </div>
      </div>

      <div className="p-5 space-y-4">
         <div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <h3 className="text-sm font-black text-brand-accent hover:underline cursor-pointer">{name}</h3>
               <p className="text-[11px] font-bold text-brand-dark opacity-60">{username}</p>
            </div>
            <div className="flex gap-2">
               <button className="text-gray-300 hover:text-brand-accent transition-colors">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               </button>
               <button className="text-teal-500 hover:scale-110 transition-transform">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </button>
            </div>
         </div>

         <p className="text-[11px] leading-relaxed text-brand-gray font-medium line-clamp-2">
            Creator focusing on {category.toLowerCase()} and high engagement content across Australia.
         </p>

         <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
            <div>
               <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest mb-1">Total Audience</p>
               <p className="text-sm font-black text-brand-dark">{audience} <span className="text-[10px] text-brand-gray font-bold">followers</span></p>
            </div>
            <div>
               <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest mb-1">Estimated Value</p>
               <p className="text-sm font-black text-brand-dark">${value}</p>
            </div>
         </div>

         <div className="flex items-center justify-between pt-4">
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-brand-accent transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </button>
            <div className="flex gap-2">
               <button className="p-1.5 hover:bg-gray-50 rounded-lg text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg></button>
               <button className="p-1.5 hover:bg-gray-50 rounded-lg text-teal-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg></button>
               <button className="p-1.5 hover:bg-gray-50 rounded-lg text-brand-gray transition-colors hover:text-brand-accent"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
               <button className="p-1.5 hover:bg-gray-50 rounded-lg text-brand-gray transition-colors hover:text-brand-accent"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CampaignDetailView;
