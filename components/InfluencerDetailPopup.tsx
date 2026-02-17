
import React from 'react';
import { InstagramIcon, YouTubeIcon, TikTokIcon } from './icons/SocialIcons';
import { SearchIcon, PlusIcon } from './icons/UiIcons';

interface ChannelStat {
  platform: 'instagram' | 'youtube' | 'tiktok';
  count: string;
  value: string;
}

interface PricingRow {
  id: string;
  currency: string;
  fee: string;
  detail: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
}

interface RankingInfluencer {
  rank: number;
  name: string;
  username?: string;
  imageUrl: string;
  location: string;
  category: string;
  followers: string;
  badges: string[];
  isCurrent?: boolean;
}

interface InfluencerDetailPopupProps {
  influencer: any;
  onClose: () => void;
}

const InfluencerDetailPopup: React.FC<InfluencerDetailPopupProps> = ({ influencer, onClose }) => {
  if (!influencer) return null;

  const tabs = ['INFO', 'GALLERY', 'RANKING', 'RATES', 'SHIPPING', 'ROSTER'];
  const [activeTab, setActiveTab] = React.useState('INFO');
  
  // Sub-tabs for the INFO section
  const [infoSubTab, setInfoSubTab] = React.useState<'Key Stats' | 'Audience' | 'Content'>('Key Stats');
  
  // Platform filter for RATES section
  const [ratesPlatform, setRatesPlatform] = React.useState<'ALL' | 'IG' | 'YT' | 'TT'>('ALL');

  // Helper for category-specific colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Media': return 'bg-[#00529B]';
      case 'Wellness Lifestyle': return 'bg-[#1A1E4B]';
      case 'Home Cooking': return 'bg-[#8B4513]';
      case 'Lifestyle Media': return 'bg-[#D6249F]';
      case 'Dessert Chef': return 'bg-brand-accent';
      default: return 'bg-brand-dark/80';
    }
  };

  // Mocked channel data
  const channelStats: ChannelStat[] = influencer.channels || [
    { platform: 'instagram', count: '210,655', value: '$3,675.93' },
    { platform: 'youtube', count: '9,510', value: '$165.95' },
    { platform: 'tiktok', count: '41,100', value: '$717.20' }
  ];

  const totalAudience = influencer.totalAudience || influencer.stats || '261,265';
  const totalValue = influencer.totalValue || influencer.value || '$4,559.08';

  // Mock Pricing Data
  const pricingData: PricingRow[] = [
    { id: '1', currency: 'Australian dollar', fee: 'A$100.00', detail: '1 post', platform: 'instagram' },
    { id: '2', currency: 'United States dollar', fee: '$100.00', detail: '1 Reel', platform: 'tiktok' },
    { id: '3', currency: 'British pound', fee: '£100.00', detail: '1 video', platform: 'youtube' },
  ];

  // Mock Ranking Data based on screenshot
  const rankingList: RankingInfluencer[] = [
    { rank: 1, name: 'Edd Kimber', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', location: 'London, United Kingdom', category: 'Dessert Chef', followers: '517.1K Followers', badges: ['Top 10 Viewed', 'Top 10 Saved', 'Top 10 Viewed (London)', 'Top 10 Saved (London)'] },
    { rank: 2, name: influencer.name, imageUrl: influencer.imageUrl, location: 'Sydney, Australia', category: influencer.category || 'Dessert Chef', followers: `${totalAudience} Followers`, badges: ['Top 10 Viewed', 'Top 10 Viewed', 'Top 10 Saved', 'Top 10 Viewed (Sydney)', 'Top 10 Saved (Sydney)'], isCurrent: true },
    { rank: 3, name: 'Promotions Team', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', location: 'Australia', category: 'Dessert Chef', followers: '29 Followers', badges: ['Top 10 Viewed'] },
    { rank: 4, name: 'Native Empire', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', location: 'Australia', category: 'Dessert Chef', followers: '6.4K Followers', badges: ['Top 10 Viewed'] },
  ];

  const recentPosts = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/post-${i + 120}/150/150`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col lg:flex-row">
        
        {/* Left Column: Profile Summary */}
        <div className="w-full lg:w-[320px] bg-[#FDFCFB] border-r border-gray-100 p-6 flex flex-col items-center shrink-0 h-full overflow-y-auto scrollbar-hide">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-panel ring-4 ring-white">
              <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <h2 className="text-xl font-serif font-black text-brand-dark mb-0.5 text-center">{influencer.name}</h2>
          <p className="text-[11px] font-bold text-brand-gray/60 mb-4">@{influencer.username || influencer.name.toLowerCase().replace(/\s/g, '')}</p>

          <div className={`${getCategoryColor(influencer.category || 'Dessert Chef')} px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-md mb-6`}>
             <span className="text-lg">🇦🇺</span>
             <span className="text-[8px] font-black uppercase tracking-widest">{influencer.category || 'Dessert Chef'}</span>
          </div>

          <div className="w-full text-center mb-6 px-2">
             <p className="text-[10px] font-semibold text-brand-gray leading-relaxed mb-2">
               Founder @brand.wares ⚖️ Sales @agency.au Australian Brewers Cup Finalist 2020-2025 🏆
             </p>
             <a href="#" className="text-[9px] font-black text-brand-accent hover:underline uppercase tracking-widest opacity-80">
               Visit Website
             </a>
          </div>

          <div className="w-full space-y-5 border-t border-gray-100 pt-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-3 relative overflow-hidden">
              <div className="space-y-2">
                <div>
                  <p className="text-[8px] font-black text-brand-gray uppercase tracking-widest">Total Reach</p>
                  <p className="text-lg font-black text-brand-dark leading-none">
                    {totalAudience}
                    <span className="text-[9px] text-brand-gray ml-1 font-bold uppercase tracking-tight">followers</span>
                  </p>
                </div>
                
                <div className="pt-2 border-t border-gray-50">
                  <p className="text-[8px] font-black text-brand-gray uppercase tracking-widest">Est. Media Value</p>
                  <p className="text-base font-black text-brand-accent leading-none">
                    {totalValue.startsWith('$') ? totalValue : `$${totalValue}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[9px] font-black text-brand-dark/40 uppercase tracking-widest">Channel Breakdown</h3>
                <div className="h-px bg-gray-100 flex-1 mx-3"></div>
                <button className="bg-brand-accent text-white p-1 rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0">
                  <PlusIcon className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {channelStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between group/row">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex-shrink-0 transition-transform group-hover/row:scale-110">
                        {stat.platform === 'instagram' && <InstagramIcon />}
                        {stat.platform === 'youtube' && <YouTubeIcon />}
                        {stat.platform === 'tiktok' && <TikTokIcon />}
                      </div>
                      <span className="text-[10px] font-black text-brand-dark capitalize">{stat.platform}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-brand-dark">{stat.count}</p>
                      <p className="text-[8px] font-bold text-brand-gray tracking-tighter">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-auto h-4"></div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col min-w-0 bg-white h-full">
          {/* Top Navbar */}
          <div className="px-8 pt-6 flex items-center justify-between border-b border-gray-100 pb-4 shrink-0">
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                    activeTab === tab 
                      ? 'bg-black text-white shadow-md' 
                      : 'text-brand-gray hover:bg-gray-200/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onClose}
                className="p-2 bg-gray-50 text-brand-gray hover:text-brand-dark rounded-xl transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            
            {activeTab === 'RANKING' ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                {/* Ranking Header from Screenshot */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                    <div>
                      <h3 className="text-xl font-serif font-black text-brand-accent leading-none">Mapkats Ranking:</h3>
                      <p className="text-sm font-serif font-bold text-brand-dark opacity-80 mt-1">{influencer.category || 'Dessert Chef'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="text-[11px] font-serif font-bold text-brand-dark border-b border-brand-dark/20 hover:border-brand-accent hover:text-brand-accent transition-all">How Ranking Works</button>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
                       <span className="text-[10px] font-bold text-brand-gray uppercase">Rank</span>
                       <svg className="w-3.5 h-3.5 text-brand-gray" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>

                {/* Ranking List Table-like Layout */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-soft overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {rankingList.map((item) => (
                      <div key={item.rank} className={`flex items-center p-6 gap-6 transition-colors ${item.isCurrent ? 'bg-orange-50/20' : 'hover:bg-gray-50'}`}>
                        {/* Rank */}
                        <div className="w-10 flex-shrink-0 text-center">
                          <span className="text-lg font-serif font-black text-brand-dark">{item.rank}.</span>
                        </div>
                        
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border-2 border-white ring-1 ring-gray-100">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-serif font-black text-brand-dark hover:text-brand-accent transition-colors cursor-pointer">{item.name}</h4>
                          <div className="flex items-center gap-3 text-[11px] font-bold text-brand-gray mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="flex items-center gap-1.5"><span className="text-base">🇦🇺</span> {item.category}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span>{item.location}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <span>{item.followers}</span>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-1.5 max-w-[320px] justify-end">
                          {item.badges.map((badge, idx) => {
                            const isLondon = badge.includes('London');
                            const isSydney = badge.includes('Sydney');
                            const isSaved = badge.includes('Saved');
                            
                            let bgColor = 'bg-[#404040]'; // Default Top 10 Viewed
                            if (isSaved && (isLondon || isSydney)) bgColor = 'bg-[#82A3C4]';
                            else if (isSaved) bgColor = 'bg-[#82A3C4]';
                            else if (isLondon || isSydney) bgColor = 'bg-[#404040]';

                            return (
                              <span key={idx} className={`${bgColor} text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap`}>
                                {badge}
                              </span>
                            );
                          })}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 ml-4">
                           <button className="text-brand-accent hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg></button>
                           <button className="text-brand-accent hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg></button>
                           <button className="text-brand-accent hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 text-[11px] font-bold text-brand-gray border-t border-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="cursor-pointer hover:text-brand-accent">20</span>
                      <span className="bg-brand-accent text-white px-2 py-1 rounded shadow-sm">50</span>
                      <span className="cursor-pointer hover:text-brand-accent">100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1">« PREVIOUS</button>
                    <div className="flex gap-2">
                      <span className="bg-brand-accent text-white px-2.5 py-1 rounded shadow-sm">1</span>
                    </div>
                    <button className="hover:text-brand-accent transition-colors flex items-center gap-1">NEXT »</button>
                  </div>
                </div>
                
                <p className="text-[11px] font-serif italic text-brand-gray/60 text-center pb-8">Ranked using public data and Mapkats insights. Opt-out available.</p>
              </div>
            ) : activeTab === 'INFO' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full">
                {/* ... existing selectors ... */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Vertical', value: influencer.category || 'Dessert Chef' },
                      { label: 'Gender', value: 'Male' },
                      { label: 'Status', value: 'New' },
                      { label: 'Intent', value: 'POST' }
                    ].map((attr, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <span className="text-[8px] font-black text-brand-gray uppercase tracking-widest px-1">{attr.label}</span>
                        <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2 px-3 text-[10px] font-bold text-brand-dark focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                          <option>{attr.value}</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-8 flex-1 border-t border-gray-50 pt-6 min-h-0">
                  <div className="flex-1 space-y-4 min-h-0 overflow-y-auto scrollbar-hide pb-4">
                    <div className="flex gap-1.5 sticky top-0 bg-white z-10 pb-2">
                      {['Key Stats', 'Audience', 'Content'].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setInfoSubTab(sub as any)}
                          className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                            infoSubTab === sub 
                              ? 'bg-brand-accent text-white border-brand-accent shadow-sm' 
                              : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#FDFCFB] rounded-2xl p-5 border border-gray-50 shadow-soft">
                      {infoSubTab === 'Key Stats' && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                            <div className="flex flex-col">
                               <span className="text-brand-gray font-serif text-[12px] opacity-70">Brand Fit</span>
                               <span className="text-brand-dark font-serif text-[13px] font-semibold">{influencer.category || 'Dessert Chef'}</span>
                            </div>
                            <div className="flex flex-col">
                               <span className="text-brand-gray font-serif text-[12px] opacity-70">Location</span>
                               <span className="text-brand-dark font-serif text-[13px] font-semibold">Sydney, Australia</span>
                            </div>
                          </div>
                          <div className="space-y-3 pt-3 border-t border-gray-100">
                             <div className="flex items-center gap-2">
                                <h4 className="text-[14px] font-serif font-bold text-brand-dark">Mapkats Badges</h4>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                <span className="bg-brand-accent text-white px-3 py-1.5 rounded-lg text-[11px] font-bold italic">#2 Dessert Chef</span>
                                <span className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Viewed</span>
                                <span className="bg-[#82A3C4] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Saved</span>
                             </div>

                             {/* INFLUENCER RANKING IN INFO TAB - As per screenshot request */}
                             <div className="pt-4 mt-2 border-t border-gray-50">
                                <div className="flex items-center gap-3 p-3 bg-orange-50/30 rounded-xl border border-orange-100/50">
                                  <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                                  <div>
                                    <p className="text-[9px] font-serif font-black text-brand-accent uppercase tracking-widest">Mapkats Ranking</p>
                                    <p className="text-sm font-serif font-black text-brand-dark">#2 Top Influencer in <span className="text-brand-accent">{influencer.category || 'Dessert Chef'}</span></p>
                                  </div>
                                  <button onClick={() => setActiveTab('RANKING')} className="ml-auto text-[10px] font-bold text-brand-gray hover:text-brand-accent underline">View List</button>
                                </div>
                             </div>
                          </div>
                        </div>
                      )}
                      {infoSubTab === 'Audience' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Gender Distribution</h4>
                              <div className="space-y-3">
                                 <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <p className="text-[11px] font-serif font-medium text-brand-dark">Women</p>
                                      <p className="text-[11px] font-black text-brand-accent">27.9%</p>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '27.9%' }}></div>
                                    </div>
                                 </div>
                                 <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <p className="text-[11px] font-serif font-medium text-brand-dark">Men</p>
                                      <p className="text-[11px] font-black text-brand-accent">38.5%</p>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '38.5%' }}></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      )}
                      {infoSubTab === 'Content' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Engagement per Format</h4>
                              <div className="space-y-3">
                                 <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <p className="text-[11px] font-serif font-medium text-brand-dark">Photos</p>
                                      <p className="text-[11px] font-black text-brand-accent">4.1%</p>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '41%' }}></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-[200px] shrink-0 sticky top-0">
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-brand-dark mb-4 opacity-50">Recent Activity</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {recentPosts.map((url, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 group cursor-pointer border border-gray-50">
                           <img src={url} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'ROSTER' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Status</span>
                    <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                      <option>Active</option>
                      <option>Red Flag</option>
                      <option>Archive</option>
                    </select>
                  </div>
                </div>
                {/* ... other roster sections ... */}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-brand-gray italic text-sm font-bold uppercase tracking-widest opacity-30">
                {activeTab} CONTENT SECTION
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50/50 flex items-center justify-end border-t border-gray-100 shrink-0">
             <button className="bg-brand-accent text-white font-black px-12 py-3 rounded-xl text-[10px] tracking-widest uppercase shadow-lg shadow-orange-100 hover:brightness-110 active:scale-95 transition-all">
               Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetailPopup;
