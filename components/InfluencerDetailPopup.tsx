
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

interface InfluencerDetailPopupProps {
  influencer: any;
  onClose: () => void;
}

const InfluencerDetailPopup: React.FC<InfluencerDetailPopupProps> = ({ influencer, onClose }) => {
  if (!influencer) return null;

  const tabs = ['INFO', 'GALLERY', 'RATES', 'SHIPPING', 'ROSTER'];
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

  // Mock thumbnails for "Recent Activity" (6 total)
  const recentPosts = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/post-${i + 120}/150/150`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container - Fixed height to avoid variable jumps */}
      <div className="relative bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col lg:flex-row">
        
        {/* Left Column: Profile Summary */}
        <div className="w-full lg:w-[320px] bg-[#FDFCFB] border-r border-gray-100 p-6 flex flex-col items-center shrink-0 h-full overflow-y-auto scrollbar-hide">
          {/* Avatar Section */}
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-panel ring-4 ring-white">
              <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <h2 className="text-xl font-serif font-black text-brand-dark mb-0.5 text-center">{influencer.name}</h2>
          <p className="text-[11px] font-bold text-brand-gray/60 mb-4">@{influencer.username || influencer.name.toLowerCase().replace(/\s/g, '')}</p>

          {/* Genre Pill */}
          <div className={`${getCategoryColor(influencer.category || 'Media')} px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-md mb-6`}>
             <span className="text-lg">🇦🇺</span>
             <span className="text-[8px] font-black uppercase tracking-widest">{influencer.category || 'Media'}</span>
          </div>

          {/* Bio */}
          <div className="w-full text-center mb-6 px-2">
             <p className="text-[10px] font-semibold text-brand-gray leading-relaxed mb-2">
               Founder @brand.wares ⚖️ Sales @agency.au Australian Brewers Cup Finalist 2020-2025 🏆
             </p>
             <a href="#" className="text-[9px] font-black text-brand-accent hover:underline uppercase tracking-widest opacity-80">
               Visit Website
             </a>
          </div>

          {/* Detailed Stats Section */}
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

            {/* Individual Channels breakdown */}
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

        {/* Right Column: Content & Forms */}
        <div className="flex-1 flex flex-col min-w-0 bg-white h-full">
          {/* Top Navbar */}
          <div className="px-8 pt-6 flex items-center justify-between border-b border-gray-50 pb-4 shrink-0">
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

          {/* Main scrollable content area - ensures consistent height across tabs */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            
            {activeTab === 'ROSTER' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Status and Display Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Status</span>
                    <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                      <option>Active</option>
                      <option>Red Flag</option>
                      <option>Archive</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Display One</span>
                    <div className="flex items-center gap-6 py-2.5">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-4 h-4 rounded border-2 border-brand-light-gray group-hover:border-brand-accent transition-colors flex items-center justify-center">
                           <div className="w-2 h-2 bg-brand-accent rounded-sm opacity-0 group-has-[:checked]:opacity-100"></div>
                        </div>
                        <input type="checkbox" className="hidden" />
                        <span className="text-[11px] font-bold text-brand-dark uppercase tracking-tighter">Carousel</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-4 h-4 rounded border-2 border-brand-light-gray group-hover:border-brand-accent transition-colors flex items-center justify-center">
                           <div className="w-2 h-2 bg-brand-accent rounded-sm opacity-0 group-has-[:checked]:opacity-100"></div>
                        </div>
                        <input type="checkbox" className="hidden" />
                        <span className="text-[11px] font-bold text-brand-dark uppercase tracking-tighter">Public Lists</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Biography Section */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Pro Collections Biography</h3>
                  
                  <div className="bg-[#FDFCFB] border border-gray-100 rounded-2xl overflow-hidden shadow-soft">
                    {/* Rich Text Mock Toolbar */}
                    <div className="bg-gray-50/50 border-b border-gray-100 p-2 flex flex-wrap gap-1 items-center">
                       <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-bold outline-none">
                         <option>Paragraph</option>
                         <option>Heading 1</option>
                         <option>Heading 2</option>
                       </select>
                       <div className="h-4 w-px bg-gray-200 mx-1"></div>
                       <button className="p-1.5 hover:bg-white rounded-lg text-brand-gray hover:text-brand-dark transition-all">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       </button>
                       <button className="p-1.5 hover:bg-white rounded-lg text-brand-gray hover:text-brand-dark font-bold">B</button>
                       <button className="p-1.5 hover:bg-white rounded-lg text-brand-gray hover:text-brand-dark italic">I</button>
                       <button className="p-1.5 hover:bg-white rounded-lg text-brand-gray hover:text-brand-dark underline">U</button>
                       <div className="h-4 w-px bg-gray-200 mx-1"></div>
                       <button className="p-1.5 hover:bg-white rounded-lg text-brand-gray hover:text-brand-dark">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
                       </button>
                    </div>
                    {/* Editor Textarea */}
                    <textarea 
                      className="w-full h-32 p-4 bg-transparent text-[11px] font-medium leading-relaxed outline-none resize-none"
                      placeholder="Enter creator biography for pro collections..."
                      defaultValue={`Aussie actor 🧿 🎙 Co-host @lifeacademythepodcast Socials | heidi@sidekicktalentmgmt.com`}
                    />
                    <div className="p-3 bg-gray-50/30 border-t border-gray-50 flex justify-end gap-3">
                       <button className="bg-brand-gray/10 text-brand-gray font-black px-4 py-1.5 rounded-lg text-[9px] tracking-widest uppercase hover:bg-gray-100 transition-all">Cancel</button>
                       <button className="bg-brand-accent text-white font-black px-6 py-1.5 rounded-lg text-[9px] tracking-widest uppercase hover:brightness-110 shadow-sm transition-all">Save</button>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                   <div className="flex items-center justify-between">
                     <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Pro Collections Gallery</h3>
                     <button className="bg-brand-dark text-white px-6 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-md hover:brightness-110 active:scale-95 transition-all">
                       Add
                     </button>
                   </div>
                   
                   <div className="bg-[#F8F6F4] border-2 border-dashed border-gray-200 rounded-2xl h-32 flex flex-col items-center justify-center gap-3 group hover:border-brand-accent transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-gray group-hover:text-brand-accent group-hover:scale-110 transition-all">
                         <PlusIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-brand-gray/60 uppercase tracking-widest">Drag and drop gallery assets here</span>
                   </div>
                </div>
              </div>
            ) : activeTab === 'RATES' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Platform Filters and Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-2 bg-[#F8F6F4] p-1 rounded-xl">
                    <button 
                      onClick={() => setRatesPlatform('ALL')}
                      className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${ratesPlatform === 'ALL' ? 'bg-brand-gray text-white' : 'text-brand-gray hover:bg-gray-200'}`}
                    >
                      ALL
                    </button>
                    <button 
                      onClick={() => setRatesPlatform('IG')}
                      className={`w-8 h-8 p-1.5 rounded-lg transition-all ${ratesPlatform === 'IG' ? 'bg-brand-gray ring-2 ring-brand-accent' : 'opacity-40 hover:opacity-100'}`}
                    >
                      <InstagramIcon />
                    </button>
                    <button 
                      onClick={() => setRatesPlatform('YT')}
                      className={`w-8 h-8 p-1.5 rounded-lg transition-all ${ratesPlatform === 'YT' ? 'bg-brand-gray ring-2 ring-brand-accent' : 'opacity-40 hover:opacity-100'}`}
                    >
                      <YouTubeIcon />
                    </button>
                    <button 
                      onClick={() => setRatesPlatform('TT')}
                      className={`w-8 h-8 p-1.5 rounded-lg transition-all ${ratesPlatform === 'TT' ? 'bg-brand-gray ring-2 ring-brand-accent' : 'opacity-40 hover:opacity-100'}`}
                    >
                      <TikTokIcon />
                    </button>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest">Est. Media Value (MV)</span>
                       <span className="text-sm font-black text-brand-dark">{totalValue}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest">Platform Value (PV)</span>
                       <span className="text-sm font-black text-brand-dark">$0.00</span>
                    </div>
                  </div>
                </div>

                {/* Agent and Contact Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Agent</span>
                      <div className="flex gap-2">
                        <select className="flex-1 bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark outline-none cursor-pointer focus:ring-1 focus:ring-brand-accent">
                          <option>Select Agent...</option>
                          <option>Native Empire</option>
                        </select>
                        <button className="bg-brand-dark text-white p-2.5 rounded-xl hover:bg-brand-accent transition-colors shrink-0">
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Contact</span>
                      <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark outline-none cursor-pointer focus:ring-1 focus:ring-brand-accent">
                        <option>Select Contact...</option>
                        <option>Andrew Tweedie</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-start md:justify-end pb-1">
                    <button className="flex items-center gap-3 bg-white border border-brand-accent text-brand-accent font-black py-2.5 px-6 rounded-xl text-[10px] tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm group">
                      <PlusIcon className="w-4 h-4" />
                      Media Kit
                    </button>
                  </div>
                </div>

                {/* Pricing Sheet Section */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Influencer Pricing Sheet</h3>
                    <button className="bg-brand-accent text-white p-2 rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all">
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#FDFCFB] border border-gray-100 rounded-2xl overflow-hidden shadow-soft">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr className="text-[9px] font-black text-brand-gray uppercase tracking-widest">
                            <th className="px-6 py-4">Currency</th>
                            <th className="px-6 py-4">Fee</th>
                            <th className="px-6 py-4">Detail</th>
                            <th className="px-6 py-4">Channel</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {/* Existing Rows */}
                          {pricingData.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-5 text-[11px] font-bold text-brand-dark">{row.currency}</td>
                              <td className="px-6 py-5 text-[11px] font-black text-brand-dark">{row.fee}</td>
                              <td className="px-6 py-5 text-[11px] font-semibold text-brand-gray">{row.detail}</td>
                              <td className="px-6 py-5">
                                <div className="w-6 h-6">
                                  {row.platform === 'instagram' && <InstagramIcon />}
                                  {row.platform === 'youtube' && <YouTubeIcon />}
                                  {row.platform === 'tiktok' && <TikTokIcon />}
                                </div>
                              </td>
                              <td className="px-6 py-5 text-right">
                                <div className="flex justify-end gap-3 text-[10px] font-black">
                                  <button className="text-brand-accent hover:underline uppercase tracking-tighter">Edit</button>
                                  <button className="text-red-500 hover:underline uppercase tracking-tighter">Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'INFO' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full">
                
                {/* Top: Organized Selectors & Tags */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Vertical', value: 'Coffee' },
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

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[8px] font-black text-brand-gray uppercase tracking-widest mr-2">CAMPAIGN TAGS</span>
                    {['UGC-CREATOR', 'MELBOURNE-LOCAL', 'HIGH-ENGAGEMENT'].map(tag => (
                      <div key={tag} className="bg-orange-50 text-brand-accent px-2.5 py-1.5 rounded-lg text-[8px] font-black tracking-widest flex items-center gap-2 group cursor-default">
                         {tag}
                         <button className="opacity-40 group-hover:opacity-100 hover:text-red-500 transition-all">×</button>
                      </div>
                    ))}
                    <button className="border border-dashed border-brand-light-gray text-brand-gray px-2.5 py-1.5 rounded-lg text-[8px] font-black tracking-widest flex items-center gap-2 hover:border-brand-accent hover:text-brand-accent transition-all">
                       <PlusIcon className="w-3 h-3"/> ADD TAG
                    </button>
                  </div>
                </div>

                {/* Main Content Split: Stats Toggle | Thumbnails */}
                <div className="flex gap-8 flex-1 border-t border-gray-50 pt-6 min-h-0">
                  <div className="flex-1 space-y-4 min-h-0 overflow-y-auto scrollbar-hide">
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

                    <div className="bg-[#FDFCFB] rounded-2xl p-4 border border-gray-50">
                      {infoSubTab === 'Key Stats' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                            <div className="flex flex-col">
                               <span className="text-brand-gray font-serif text-[12px] opacity-70">Brand Fit</span>
                               <span className="text-brand-dark font-serif text-[13px] font-semibold">Dessert Chef</span>
                            </div>
                            <div className="flex flex-col">
                               <span className="text-brand-gray font-serif text-[12px] opacity-70">Location</span>
                               <span className="text-brand-dark font-serif text-[13px] font-semibold">Sydney, Australia</span>
                            </div>
                            <div className="flex flex-col">
                               <span className="text-brand-gray font-serif text-[12px] opacity-70">Last Posted</span>
                               <span className="text-brand-dark font-serif text-[13px] font-semibold">Oct 18 2022</span>
                            </div>
                          </div>
                          <div className="space-y-3 pt-3 border-t border-gray-100">
                             <div className="flex items-center gap-2">
                                <h4 className="text-[14px] font-serif font-bold text-brand-dark">Mapkats Badges</h4>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                <span className="bg-brand-accent text-white px-3 py-1.5 rounded-lg text-[11px] font-bold italic">#2 Dessert Chef</span>
                                <span className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Viewed</span>
                             </div>
                          </div>
                        </div>
                      )}
                      {/* ... other subtabs ... */}
                    </div>
                  </div>
                  <div className="w-[200px] shrink-0">
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
            ) : (
              <div className="flex items-center justify-center py-20 text-brand-gray italic text-sm font-bold uppercase tracking-widest opacity-30">
                {activeTab} CONTENT SECTION
              </div>
            )}

          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 bg-gray-50/50 flex items-center justify-end border-t border-gray-100 shrink-0">
             <button className="bg-brand-accent text-white font-black px-12 py-2.5 rounded-xl text-[10px] tracking-widest uppercase shadow-lg shadow-orange-100 hover:brightness-110 active:scale-95 transition-all">
               Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerDetailPopup;
