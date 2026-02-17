
import React from 'react';
import { InstagramIcon, YouTubeIcon, TikTokIcon } from './icons/SocialIcons';
import { SearchIcon, PlusIcon } from './icons/UiIcons';

interface ChannelStat {
  platform: 'instagram' | 'youtube' | 'tiktok';
  count: string;
  value: string;
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

  const totalAudience = influencer.totalAudience || '261,265';
  const totalValue = influencer.totalValue || '$4,559.08';

  // Mock thumbnails for "Recent Activity" (6 total)
  const recentPosts = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/post-${i + 120}/150/150`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col lg:flex-row max-h-[95vh]">
        
        {/* Left Column: Profile Summary */}
        <div className="w-full lg:w-[320px] bg-[#FDFCFB] border-r border-gray-100 p-6 flex flex-col items-center shrink-0">
          {/* Avatar Section */}
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-panel ring-4 ring-white">
              <img src={influencer.imageUrl} alt={influencer.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <h2 className="text-xl font-serif font-black text-brand-dark mb-0.5 text-center">{influencer.name}</h2>
          <p className="text-[11px] font-bold text-brand-gray/60 mb-4">@{influencer.username}</p>

          {/* Genre Pill */}
          <div className={`${getCategoryColor(influencer.category)} px-4 py-1.5 rounded-full flex items-center gap-2 text-white shadow-md mb-6`}>
             <span className="text-lg">🇦🇺</span>
             <span className="text-[8px] font-black uppercase tracking-widest">{influencer.category}</span>
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
                    {totalValue}
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
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Top Navbar */}
          <div className="px-8 pt-6 flex items-center justify-between border-b border-gray-50 pb-4">
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

          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            
            {activeTab === 'SHIPPING' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Logistics Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Logistics & Tracking</h3>
                    <button className="text-[10px] font-black text-brand-accent hover:underline">Autofill from Profile</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Selected Courier</span>
                      <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark outline-none cursor-pointer focus:ring-1 focus:ring-brand-accent">
                        <option>Select Courier...</option>
                        <option>Australia Post</option>
                        <option>DHL Express</option>
                        <option>FedEx</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Tracking Number</span>
                      <input type="text" placeholder="Enter tracking..." className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                    </div>
                  </div>
                </div>

                {/* Contact Header */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Recipient Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                    <input type="text" placeholder="Last Name" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" placeholder="Email Address" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                    <input type="tel" placeholder="Phone Number" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                  </div>
                </div>

                {/* Address Details Header */}
                <div className="space-y-4 border-t border-gray-50 pt-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Shipping Address</h3>
                  
                  {/* Structured Address Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Country</span>
                      <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark outline-none cursor-pointer focus:ring-1 focus:ring-brand-accent">
                        <option>Australia</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>New Zealand</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">State / Province</span>
                      <input type="text" placeholder="State" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">City</span>
                      <input type="text" placeholder="City" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Post Code</span>
                      <input type="text" placeholder="Post Code" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" />
                    </div>
                  </div>

                  {/* Verification Area */}
                  <div className="space-y-3 pt-2">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray"><SearchIcon className="w-4 h-4"/></div>
                      <input 
                        type="text" 
                        placeholder="Full address string for verification..." 
                        className="w-full bg-[#F8F6F4] border-none rounded-xl py-3 pl-11 pr-4 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-accent" 
                      />
                    </div>
                    
                    <button className="w-full bg-brand-dark text-white font-black py-2.5 rounded-xl text-[9px] tracking-widest uppercase hover:bg-brand-accent shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Verify Address
                    </button>
                  </div>
                </div>
              </div>
            ) : activeTab === 'INFO' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full">
                
                {/* Top: Organized Selectors & Tags */}
                <div className="space-y-4">
                  {/* Attribute Selectors Grid */}
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

                  {/* Campaign Tags */}
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
                  
                  {/* Left Side: Segmented Stats View */}
                  <div className="flex-1 space-y-4 min-h-0">
                    {/* Sub-tab Navigation: Smaller Buttons */}
                    <div className="flex gap-1.5">
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

                    {/* Stats Container */}
                    <div className="bg-[#FDFCFB] rounded-2xl p-4 border border-gray-50 flex flex-col h-[300px] overflow-y-auto scrollbar-hide">
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
                                <div className="w-8 h-8 text-brand-accent shrink-0">
                                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </div>
                                <h4 className="text-[14px] font-serif font-bold text-brand-dark">Mapkats Badges <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-gray/10 text-[9px] text-brand-gray font-bold">i</span></h4>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                <span className="bg-brand-accent text-white px-3 py-1.5 rounded-lg text-[11px] font-bold italic">#2 Dessert Chef</span>
                                <span className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Viewed</span>
                                <span className="bg-brand-dark/50 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Viewed</span>
                                <span className="bg-[#82A3C4] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Top 10 Saved</span>
                             </div>
                          </div>
                        </div>
                      )}

                      {infoSubTab === 'Audience' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Gender</h4>
                              <div className="space-y-2.5">
                                 <div>
                                    <p className="text-[11px] font-serif font-medium text-brand-dark mb-0.5">Women 27.9%</p>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '27.9%' }}></div>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="text-[11px] font-serif font-medium text-brand-dark mb-0.5">Men 38.5%</p>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '38.5%' }}></div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top countries</h4>
                              <div className="flex flex-wrap gap-1.5">
                                 {['Australia (32%)', 'United States (16%)', 'United Kingdom (11%)', 'Italy (5.3%)'].map(item => (
                                    <span key={item} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[11px] font-serif text-brand-dark">{item}</span>
                                 ))}
                              </div>
                           </div>

                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top cities</h4>
                              <div className="flex flex-wrap gap-1.5">
                                 {['Sydney (41.2%)', 'London (5.6%)', 'New York (3.8%)', 'Dublin (2.5%)'].map(item => (
                                    <span key={item} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[11px] font-serif text-brand-dark">{item}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                      )}

                      {infoSubTab === 'Content' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Format performance (avg engagement)</h4>
                              <div className="space-y-2.5">
                                 <div>
                                    <p className="text-[11px] font-serif font-medium text-brand-dark mb-0.5">Photos 4.1%</p>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '41%' }}></div>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="text-[11px] font-serif font-medium text-brand-dark mb-0.5">Reels 2.5%</p>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                       <div className="bg-brand-accent h-full" style={{ width: '25%' }}></div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top content (last 30 days)</h4>
                              <div className="flex flex-wrap gap-1.5">
                                 {['Avg views: 0', 'Median views: 0', 'Saves rate: 0%', 'Share rate: 0%'].map(item => (
                                    <span key={item} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[11px] font-serif text-brand-dark">{item}</span>
                                 ))}
                              </div>
                           </div>

                           <div className="space-y-2">
                              <h4 className="text-[13px] font-serif font-bold text-brand-dark">Cadence</h4>
                              <div className="flex flex-wrap gap-1.5">
                                 {['Posts: 23', 'Reels: 7', 'Stories: 0', 'Avg posts/week: 7'].map(item => (
                                    <span key={item} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[11px] font-serif text-brand-dark">{item}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                      )}

                      <div className="mt-auto pt-3 flex justify-start">
                         <button className="bg-brand-dark/90 text-white px-6 py-1.5 rounded-full text-[11px] font-serif font-bold shadow hover:bg-brand-dark transition-colors">
                           Instagram
                         </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side: Thumbnails 2x3 grid */}
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
          <div className="p-4 bg-gray-50/50 flex items-center justify-end border-t border-gray-100">
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
