
import React, { useState } from 'react';
import { SearchIcon, PencilSquareIcon, PlusIcon } from '../components/icons/UiIcons';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../components/icons/SocialIcons';
import UniversalSocialSearch from '../components/UniversalSocialSearch';
import InfluencerDetailPopup from '../components/InfluencerDetailPopup';

interface CampaignDetailViewProps {
  campaignName: string;
  onBack: () => void;
}

const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({ campaignName, onBack }) => {
  const tabs = ['Campaigns', 'Profiles', 'List', 'Post', 'Story', 'Insights'];
  const [activeTab, setActiveTab] = useState('Profiles');
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);

  const influencers = [
    { 
      name: 'Tully Smyth', 
      username: 'tee_smyth', 
      imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400', 
      category: 'Lifestyle Media', 
      audience: '209,618', 
      value: '3,657.84',
      location: 'Melbourne',
      region: 'AU',
      flag: '🇦🇺',
      email: 'youngbloodcreative@gmail.co',
      status: 'New',
      statusDate: 'Tue Jan 06 2026',
      platforms: ['instagram'],
      posts: 0,
      stories: 0,
      isFavourite: false
    },
    { 
      name: 'Lauren Phillips', 
      username: 'laurenphillips', 
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', 
      category: 'Celebrity', 
      audience: '134,621', 
      value: '2,348.05',
      location: 'Melbourne',
      region: 'AU',
      state: 'Victoria',
      flag: '🇦🇺',
      email: 'Michelle.Tozer@img.com',
      status: 'New',
      statusDate: 'Fri Jul 04 2025',
      platforms: ['instagram'],
      posts: 0,
      stories: 0,
      isFavourite: true
    },
    { 
      name: 'Toasted Table', 
      username: 'toastedtable', 
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400', 
      category: 'Home Cooking', 
      audience: '170,300', 
      value: '2,971.07',
      location: 'Englewood Cliffs',
      region: 'US',
      state: 'New Jersey',
      flag: '🇺🇸',
      email: 'toastedtable@gmail.com',
      status: 'New',
      statusDate: 'Fri May 23 2025',
      platforms: ['instagram', 'tiktok'],
      posts: 0,
      stories: 0,
      isFavourite: false
    },
    { 
      name: 'Reynold', 
      username: 'reynoldpoernomo', 
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', 
      category: 'Food', 
      audience: '1.3M', 
      value: '22,946.72',
      location: 'Sydney',
      region: 'AU',
      state: 'New South Wales',
      flag: '🇦🇺',
      email: 'Hi@reynoldpoernomo.com.au',
      status: 'New',
      statusDate: 'Wed Jun 25 2025',
      platforms: ['instagram', 'tiktok'],
      posts: 0,
      stories: 0,
      isFavourite: true
    },
    { 
      name: 'MELISSA HOYER OFFICIAL', 
      username: 'melissahoyer', 
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', 
      category: 'Lifestyle Media', 
      audience: '92.7K', 
      value: '1,618.21',
      location: 'Sydney',
      region: 'AU',
      state: 'New South Wales',
      flag: '🇦🇺',
      email: 'me@melissahoyer.com',
      status: 'New',
      statusDate: 'Mon May 19 2025',
      platforms: ['instagram'],
      posts: 0,
      stories: 0,
      isFavourite: false
    }
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
          <div className="flex flex-wrap items-end gap-3 shrink-0">
             <div className="flex flex-col space-y-1.5">
                <span className="text-[9px] font-extrabold text-brand-gray uppercase tracking-widest px-1">Category</span>
                <select className="bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-xs font-bold text-brand-dark min-w-[140px] focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Media</option>
                  <option>Lifestyle</option>
                </select>
             </div>
             <button className="bg-brand-accent text-white font-black py-2.5 px-8 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase whitespace-nowrap h-[38px] flex items-center justify-center xl:mb-0.5">
               Add Influencers
             </button>
             {activeTab === 'List' && (
               <button className="bg-teal-600 text-white font-black py-2.5 px-6 rounded-xl text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase whitespace-nowrap h-[38px] flex items-center justify-center xl:mb-0.5">
                 Export to Excel
               </button>
             )}
          </div>
        </div>
      </div>

      {activeTab === 'Profiles' ? (
        /* Profiles Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {influencers.map((inf, idx) => (
            <div key={idx} className="cursor-pointer" onClick={() => setSelectedInfluencer(inf)}>
              <InfluencerProfileCard {...inf} />
            </div>
          ))}
        </div>
      ) : activeTab === 'List' ? (
        /* Compressed List View Table */
        <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-[#FDFCFB] border-b border-gray-100">
                <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                  <th className="px-6 py-4 w-[240px]">Influencer</th>
                  <th className="px-6 py-4 w-[140px]">Audience & Value</th>
                  <th className="px-6 py-4 w-[160px]">Location</th>
                  <th className="px-6 py-4 w-[140px]">Category</th>
                  <th className="px-6 py-4 w-[140px]">Status</th>
                  <th className="px-6 py-4 text-right">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {influencers.map((inf, idx) => (
                  <tr key={idx} className="group hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedInfluencer(inf)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                             <img src={inf.imageUrl} alt={inf.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-bold text-brand-dark group-hover:text-brand-accent transition-colors truncate">{inf.name}</span>
                            <button 
                              className={`${inf.isFavourite ? 'text-amber-400' : 'text-gray-200'} hover:text-amber-400 transition-colors flex-shrink-0`}
                              onClick={(e) => { e.stopPropagation(); /* toggle favourite logic here */ }}
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            </button>
                          </div>
                          <div className="flex gap-1">
                             <div className="bg-pink-100/40 text-pink-600 px-1 py-0.5 rounded text-[8px] font-black">P {inf.posts}</div>
                             <div className="bg-pink-100/40 text-pink-600 px-1 py-0.5 rounded text-[8px] font-black">S {inf.stories}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                           <span className="text-[12px] font-bold text-brand-dark">{inf.audience}</span>
                           <div className="w-3.5 h-3.5"><InstagramIcon /></div>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <span className="text-[10px] font-black text-brand-accent">${inf.value}</span>
                           <div className="w-3 h-3 opacity-40"><InstagramIcon /></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[11px] font-bold text-brand-dark truncate">{inf.location}{inf.state ? `, ${inf.state}` : ''}</span>
                        <div className="flex items-center gap-1.5">
                           <span className="text-sm leading-none">{inf.flag}</span>
                           <span className="text-[8px] font-black text-brand-gray uppercase">{inf.region}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[11px] font-bold text-brand-dark truncate">{inf.category}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-black text-blue-600 uppercase bg-blue-50/50 px-2 py-0.5 rounded-md w-fit">{inf.status}</span>
                          <span className="text-[8px] text-brand-gray font-bold whitespace-nowrap">{inf.statusDate}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <select className="bg-white border border-gray-100 rounded-lg py-1 px-1.5 text-[9px] font-bold text-brand-dark outline-none cursor-pointer hover:border-brand-accent transition-all">
                             <option>Set Status</option>
                          </select>
                          <button className="p-1 text-brand-gray hover:text-brand-accent transition-colors"><PencilSquareIcon className="w-3.5 h-3.5" /></button>
                          <button className="p-1 text-brand-gray hover:text-red-500 transition-colors">
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Placeholder for other tabs */
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 shadow-soft italic text-brand-gray">
          {activeTab} view is coming soon...
        </div>
      )}

      {/* Detail Popup */}
      {selectedInfluencer && (
        <InfluencerDetailPopup 
          influencer={selectedInfluencer} 
          onClose={() => setSelectedInfluencer(null)} 
        />
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100 text-[11px] font-bold text-brand-gray">
         <div className="flex items-center gap-6">
            <span className="uppercase tracking-widest opacity-60">SHOWING {influencers.length} OF 721 RESULTS</span>
            <div className="flex items-center gap-2">
               <span className="cursor-pointer hover:text-brand-accent">20</span>
               <span className="bg-brand-accent text-white px-2.5 py-1 rounded shadow-sm">50</span>
               <span className="cursor-pointer hover:text-brand-accent">100</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="opacity-40 hover:opacity-100 transition-opacity">PREVIOUS</button>
            <div className="flex gap-2">
              <span className="bg-brand-accent text-white px-2.5 py-1 rounded shadow-sm">1</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded transition-all">2</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded transition-all">3</span>
              <span className="px-2.5 py-1 cursor-pointer hover:bg-gray-100 rounded transition-all">4</span>
            </div>
            <button className="hover:text-brand-accent transition-colors">NEXT</button>
         </div>
      </div>
    </div>
  );
};

// Sub-component for individual influencer cards (Profiles Grid)
const InfluencerProfileCard: React.FC<any> = ({ name, username, imageUrl, category, audience, value }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Media': return 'bg-[#00529B]';
      case 'Wellness Lifestyle': return 'bg-[#1A1E4B]';
      case 'Home Cooking': return 'bg-[#8B4513]';
      case 'Lifestyle Media': return 'bg-[#D6249F]';
      case 'Celebrity': return 'bg-purple-700';
      case 'Food': return 'bg-orange-600';
      default: return 'bg-brand-dark/80';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden group hover:shadow-panel transition-all hover:-translate-y-1 h-full">
      <div className="relative h-64 bg-gray-100">
         <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
         
         <div className="absolute top-3 left-3 flex flex-col gap-1">
            <div className="w-7 h-7 bg-white/90 rounded-lg p-1.5 shadow-sm">
              <InstagramIcon />
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">1</div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-black">0</div>
         </div>

         <div className="absolute top-3 right-3">
            <span className="bg-white text-brand-dark text-[9px] font-black px-2 py-1 rounded-md tracking-wider uppercase shadow-sm">NEW</span>
         </div>

         <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-center">
            <div className={`${getCategoryColor(category)} backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-lg`}>
               <span className="text-xl">🇦🇺</span>
               <span className="text-[10px] font-black uppercase tracking-widest">{category}</span>
            </div>
         </div>
      </div>

      <div className="p-5 space-y-4">
         <div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <h3 className="text-sm font-black text-brand-accent hover:underline cursor-pointer">{name}</h3>
               <p className="text-[11px] font-bold text-brand-dark opacity-60">@{username}</p>
            </div>
            <div className="flex gap-2">
               <button className="text-gray-300 hover:text-brand-accent transition-colors" onClick={(e) => e.stopPropagation()}>
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               </button>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
            <div>
               <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest mb-1">Audience</p>
               <p className="text-sm font-black text-brand-dark">{audience}</p>
            </div>
            <div>
               <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest mb-1">Value</p>
               <p className="text-sm font-black text-brand-dark">${value}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CampaignDetailView;
