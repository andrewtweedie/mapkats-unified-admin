
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

interface GalleryPost {
  id: string;
  imageUrl: string;
  caption: string;
  type: 'image' | 'video';
}

interface InfluencerDetailPopupProps {
  influencer: any;
  onClose: () => void;
  campaignTags?: string[];
}

const InfluencerDetailPopup: React.FC<InfluencerDetailPopupProps> = ({ influencer, onClose, campaignTags = [] }) => {
  if (!influencer) return null;

  const tabs = ['INFO', 'GALLERY', 'RANKING', 'RATES', 'SHIPPING', 'ROSTER'];
  const [activeTab, setActiveTab] = React.useState('INFO');
  
  // Sub-tabs for the INFO section
  const [infoSubTab, setInfoSubTab] = React.useState<'Key Stats' | 'Audience' | 'Content'>('Key Stats');
  
  // State for the expanded ranking rows
  const [expandedInfluencerRank, setExpandedInfluencerRank] = React.useState<number | null>(null);
  const [activeRankingSubTab, setActiveRankingSubTab] = React.useState<'Recent Posts' | 'Key Stats' | 'Audience' | 'Content'>('Recent Posts');

  // State for Gallery Detail View
  const [selectedPost, setSelectedPost] = React.useState<GalleryPost | null>(null);

  // Platform filter for RATES section
  const [ratesPlatform, setRatesPlatform] = React.useState<'ALL' | 'IG' | 'YT' | 'TT'>('ALL');

  // Influencer tags for this campaign
  const [assignedTags, setAssignedTags] = React.useState<string[]>([]);
  const [selectedTagToAdd, setSelectedTagToAdd] = React.useState('');

  // Recent Activity post detail overlay
  const [selectedRecentPost, setSelectedRecentPost] = React.useState<{ imageUrl: string; caption: string; likes: number; comments: number } | null>(null);

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

  // Mock Ranking Data
  const rankingList: RankingInfluencer[] = [
    { rank: 1, name: 'Edd Kimber', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', location: 'London, United Kingdom', category: 'Dessert Chef', followers: '517.1K Followers', badges: ['Top 10 Viewed', 'Top 10 Saved', 'Top 10 Viewed (London)', 'Top 10 Saved (London)'] },
    { rank: 2, name: influencer.name, imageUrl: influencer.imageUrl, location: 'Sydney, Australia', category: influencer.category || 'Dessert Chef', followers: `${totalAudience} Followers`, badges: ['Top 10 Viewed', 'Top 10 Viewed', 'Top 10 Saved', 'Top 10 Viewed (Sydney)', 'Top 10 Saved (Sydney)'], isCurrent: true },
    { rank: 3, name: 'Promotions Team', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200', location: 'Australia', category: 'Dessert Chef', followers: '29 Followers', badges: ['Top 10 Viewed'] },
    { rank: 4, name: 'Native Empire', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200', location: 'Australia', category: 'Dessert Chef', followers: '6.4K Followers', badges: ['Top 10 Viewed'] },
  ];

  // Mock Gallery Posts based on screenshots
  const galleryPosts: GalleryPost[] = [
    { id: 'p1', imageUrl: 'https://images.unsplash.com/photo-1541821637466-5bc01cb4d75d?auto=format&fit=crop&q=80&w=600', caption: 'Well, it’s been just over a year since we decided to renovate our dilapidated house and we’ve been living with our amazing uncommon_projects kitchen for a good few months now. Read all about our design process at the link in my bio and in my stories 📸 by rutheward (except the picture of Wesley which I snuck in)', type: 'image' },
    { id: 'p2', imageUrl: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=600', caption: 'It’s Valentine’s Day tomorrow so to make sure I’m compliment with all known laws, I have two chocolate recipes for you... 🍫✨', type: 'video' },
    { id: 'p3', imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600', caption: 'How To: Chocolate Ep 3 What’s one of your all time favourite flavours? Mine would probably be Tonka bean, a head...', type: 'video' },
    { id: 'p4', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600', caption: 'I’m going on a book tour! Can you believe this will actually be my first ever UK book tour? Very excited to hit the...', type: 'image' },
    { id: 'p5', imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600', caption: 'Do you want to win something amazing? The ultimate Chocolate Baking bundle? Well listen up! To celebrate there bein...', type: 'video' },
    { id: 'p6', imageUrl: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600', caption: 'Do you want to win something amazing? The ultimate Chocolate Baking bundle? Well listen up! To celebrate there bein...', type: 'video' },
  ];

  const recentPostsData = [
    { imageUrl: 'https://picsum.photos/seed/post-150/400/400', caption: 'Ducati club is meeting in the lane way behind the office', likes: 41, comments: 5 },
    { imageUrl: 'https://picsum.photos/seed/post-151/400/400', caption: 'Morning light hitting the harbour bridge — one of those moments you just have to stop and take it all in ☀️', likes: 128, comments: 12 },
    { imageUrl: 'https://picsum.photos/seed/post-152/400/400', caption: 'New menu tasting at the rooftop bar. Every single dish was incredible, can\'t wait for you all to try it 🍽️', likes: 87, comments: 9 },
    { imageUrl: 'https://picsum.photos/seed/post-153/400/400', caption: 'Behind the scenes of today\'s shoot — huge thanks to the team for making this happen. More coming soon 📸', likes: 214, comments: 23 },
    { imageUrl: 'https://picsum.photos/seed/post-154/400/400', caption: 'Weekend markets are back! Supporting local makers and grabbing some seriously good coffee along the way ☕', likes: 63, comments: 7 },
    { imageUrl: 'https://picsum.photos/seed/post-155/400/400', caption: 'Just wrapped up an amazing collab with @brandpartner — stay tuned for the full reveal next week 🔥', likes: 156, comments: 18 },
  ];

  const toggleExpand = (rank: number) => {
    if (expandedInfluencerRank === rank) {
      setExpandedInfluencerRank(null);
    } else {
      setExpandedInfluencerRank(rank);
      setActiveRankingSubTab('Recent Posts'); // Reset to first tab on expand
    }
  };

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
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide flex flex-col relative">
            
            {activeTab === 'GALLERY' ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {selectedPost ? (
                  /* Detailed Post View */
                  <div className="animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-8">
                       <div className="bg-brand-accent text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                         <div className="w-5 h-5"><InstagramIcon /></div>
                         <span className="text-[11px] font-black uppercase tracking-widest">Instagram</span>
                       </div>
                       <button 
                         onClick={() => setSelectedPost(null)}
                         className="p-2 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-all text-brand-accent"
                       >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                       </button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl shadow-panel overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                       {/* Large Post Media */}
                       <div className="md:w-[60%] bg-gray-50">
                         <img 
                           src={selectedPost.imageUrl} 
                           alt="Post Detail" 
                           className="w-full h-full object-cover" 
                         />
                       </div>
                       {/* Caption Details */}
                       <div className="md:w-[40%] p-10 flex flex-col">
                         <div className="flex-1">
                           <p className="text-lg font-serif font-medium text-brand-dark leading-relaxed">
                             {selectedPost.caption}
                           </p>
                         </div>
                       </div>
                    </div>
                  </div>
                ) : (
                  /* Grid Display */
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="bg-brand-accent text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                         <div className="w-5 h-5"><InstagramIcon /></div>
                         <span className="text-[11px] font-black uppercase tracking-widest">Instagram</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {galleryPosts.map((post) => (
                        <div 
                          key={post.id} 
                          className="bg-white border border-gray-100 rounded-xl shadow-soft overflow-hidden flex flex-col group hover:shadow-panel transition-all duration-300"
                        >
                          <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                            <img 
                              src={post.imageUrl} 
                              alt="Post" 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                            {post.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                                <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-4 ring-white/20">
                                   <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                             <p className="text-sm font-serif font-medium text-brand-dark leading-relaxed line-clamp-3 mb-6">
                               {post.caption}
                             </p>
                             <button 
                               onClick={() => setSelectedPost(post)}
                               className="mt-auto self-start text-[11px] font-black text-brand-dark border-b-2 border-brand-dark/10 hover:border-brand-accent hover:text-brand-accent transition-all uppercase tracking-widest"
                             >
                               MORE
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'RANKING' ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                {/* Ranking Header */}
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

                {/* Ranking List */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-soft overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {rankingList.map((item) => (
                      <div key={item.rank} className="flex flex-col">
                        <div 
                          className={`flex items-center p-6 gap-6 transition-colors min-h-[100px] cursor-pointer ${item.isCurrent ? 'bg-orange-50/20' : 'hover:bg-gray-50'}`}
                          onClick={() => toggleExpand(item.rank)}
                        >
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
                            <h4 className="text-base font-serif font-black text-brand-dark hover:text-brand-accent transition-colors">{item.name}</h4>
                            <div className="flex items-center gap-3 text-[11px] font-bold text-brand-gray mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                              <span className="flex items-center gap-1.5"><span className="text-base">🇦🇺</span> {item.category}</span>
                              <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                              <span>{item.location}</span>
                              <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                              <span>{item.followers}</span>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-x-2 gap-y-2 max-w-[340px] justify-end">
                            {item.badges.map((badge, idx) => {
                              const isSaved = badge.includes('Saved');
                              const bgColor = isSaved ? 'bg-[#82A3C4]' : 'bg-[#404040]';

                              return (
                                <span key={idx} className={`${bgColor} text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-tight whitespace-nowrap shadow-sm`}>
                                  {badge}
                                </span>
                              );
                            })}
                          </div>

                          {/* Plus Button */}
                          <div className="ml-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                             <button 
                               className="bg-brand-accent text-white p-2 rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center group"
                               title="Add to current campaign"
                             >
                               <PlusIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                             </button>
                          </div>
                        </div>

                        {/* Expanded Display Area */}
                        {expandedInfluencerRank === item.rank && (
                          <div className="bg-[#FDFCFB] border-t border-gray-100 px-10 py-8 animate-in slide-in-from-top-4 duration-300">
                            <div className="flex gap-4 mb-6">
                              {['Recent Posts', 'Key Stats', 'Audience', 'Content'].map((sub) => (
                                <button
                                  key={sub}
                                  onClick={() => setActiveRankingSubTab(sub as any)}
                                  className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
                                    activeRankingSubTab === sub 
                                      ? 'bg-brand-accent text-white border-brand-accent shadow-md' 
                                      : 'bg-white text-brand-gray border-gray-200 hover:border-brand-accent/30'
                                  }`}
                                >
                                  {sub}
                                </button>
                              ))}
                            </div>

                            <div className="min-h-[140px]">
                              {activeRankingSubTab === 'Recent Posts' && (
                                <div className="grid grid-cols-6 gap-3 animate-in fade-in duration-200">
                                  {recentPostsData.map((post, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm group cursor-pointer" onClick={() => setSelectedRecentPost(post)}>
                                      <img src={post.imageUrl} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                  ))}
                                </div>
                              )}
                              {activeRankingSubTab === 'Key Stats' && (
                                <div className="animate-in fade-in duration-200 grid grid-cols-3 gap-8">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-2 opacity-60">Brand Fit</span>
                                    <span className="text-base font-serif font-black text-brand-dark">{item.category}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-2 opacity-60">Location</span>
                                    <span className="text-base font-serif font-black text-brand-dark">{item.location}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-2 opacity-60">Ranking Badges</span>
                                    <div className="flex flex-wrap gap-2">
                                      {item.badges.slice(0, 2).map((b, i) => (
                                        <span key={i} className="bg-brand-dark/5 text-brand-dark px-2 py-1 rounded text-[10px] font-bold">{b}</span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {activeRankingSubTab === 'Audience' && (
                                <div className="animate-in fade-in duration-200 grid grid-cols-2 gap-12">
                                  <div className="space-y-4">
                                    <div>
                                      <div className="flex justify-between items-center mb-1.5">
                                        <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Women</p>
                                        <p className="text-[11px] font-black text-brand-accent">27.9%</p>
                                      </div>
                                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-brand-accent h-full" style={{ width: '27.9%' }}></div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between items-center mb-1.5">
                                        <p className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Men</p>
                                        <p className="text-[11px] font-black text-[#82A3C4]">72.1%</p>
                                      </div>
                                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-[#82A3C4] h-full" style={{ width: '72.1%' }}></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-center">
                                     <span className="text-[11px] font-bold text-brand-gray italic">Audience demographics insights for {item.name}</span>
                                  </div>
                                </div>
                              )}
                              {activeRankingSubTab === 'Content' && (
                                <div className="animate-in fade-in duration-200 grid grid-cols-3 gap-6">
                                  {[
                                    { label: 'Avg Likes', value: '4.2K' },
                                    { label: 'Avg Comments', value: '184' },
                                    { label: 'Eng. Rate', value: '3.12%' }
                                  ].map((stat, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
                                      <p className="text-[9px] font-black text-brand-gray uppercase tracking-widest mb-1.5">{stat.label}</p>
                                      <p className="text-xl font-serif font-black text-brand-dark">{stat.value}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 text-[11px] font-bold text-brand-gray border-t border-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="cursor-pointer hover:text-brand-accent">20</span>
                      <span className="bg-brand-accent text-white px-3 py-1.5 rounded shadow-sm">50</span>
                      <span className="cursor-pointer hover:text-brand-accent">100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="opacity-40 hover:opacity-100 transition-opacity">« PREVIOUS</button>
                    <div className="flex gap-2">
                      <span className="bg-brand-accent text-white px-3 py-1.5 rounded shadow-sm">1</span>
                    </div>
                    <button className="hover:text-brand-accent transition-colors">NEXT »</button>
                  </div>
                </div>
              </div>
            ) : activeTab === 'INFO' ? (
              <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Top Selectors */}
                <div className="space-y-4 mb-8 shrink-0">
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

                {/* Campaign Tags assignment */}
                <div className="space-y-3 mb-8 shrink-0">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-[9px] font-black text-brand-dark uppercase tracking-widest">Campaign Tags</span>
                  </div>

                  {/* Assigned tags display */}
                  {assignedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {assignedTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-3 py-1.5 rounded-lg text-[11px] font-bold"
                        >
                          {tag}
                          <button
                            onClick={() => setAssignedTags(assignedTags.filter((_, i) => i !== idx))}
                            className="text-brand-accent/60 hover:text-red-500 transition-colors ml-0.5"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add tag controls */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedTagToAdd}
                      onChange={(e) => setSelectedTagToAdd(e.target.value)}
                      className="flex-1 bg-[#F8F6F4] border border-gray-200 rounded-xl py-2 px-3 text-[11px] font-bold text-brand-dark focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select a tag...</option>
                      {campaignTags
                        .filter((tag) => !assignedTags.includes(tag))
                        .map((tag) => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))
                      }
                    </select>
                    <button
                      onClick={() => {
                        if (selectedTagToAdd && !assignedTags.includes(selectedTagToAdd)) {
                          setAssignedTags([...assignedTags, selectedTagToAdd]);
                          setSelectedTagToAdd('');
                        }
                      }}
                      disabled={!selectedTagToAdd}
                      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                        selectedTagToAdd
                          ? 'bg-brand-accent text-white shadow-md hover:brightness-110'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Add
                    </button>
                  </div>

                  {assignedTags.length === 0 && (
                    <p className="text-[10px] font-medium text-brand-gray/50 italic">No tags assigned to this influencer yet</p>
                  )}
                </div>

                <div className="flex gap-8 flex-1 min-h-0 border-t border-gray-50 pt-6">
                  {/* Left Column: Sub-tabs and Ranking Box */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex gap-1.5 sticky top-0 bg-white z-10 pb-3 shrink-0">
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

                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide pb-4">
                      <div className="bg-[#FDFCFB] rounded-2xl p-5 border border-gray-50 shadow-soft mb-6">
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
                            </div>
                          </div>
                        )}
                        {infoSubTab === 'Audience' && (
                          <div className="space-y-6 animate-in fade-in duration-200">
                             {/* Gender */}
                             <div className="space-y-3">
                                <h4 className="text-[13px] font-serif font-bold text-brand-dark">Gender</h4>
                                <div className="space-y-3">
                                   <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <p className="text-[11px] font-serif font-semibold text-brand-dark">Women 27.9%</p>
                                      </div>
                                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                         <div className="bg-brand-accent h-full rounded-full" style={{ width: '27.9%' }}></div>
                                      </div>
                                   </div>
                                   <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <p className="text-[11px] font-serif font-semibold text-brand-dark">Men 38.5%</p>
                                      </div>
                                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                         <div className="bg-brand-accent h-full rounded-full" style={{ width: '38.5%' }}></div>
                                      </div>
                                   </div>
                                </div>
                             </div>

                             {/* Top Countries */}
                             <div className="space-y-3">
                                <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top countries</h4>
                                <div className="flex flex-wrap gap-2">
                                   {[
                                     { name: 'Australia', pct: '32%' },
                                     { name: 'United States', pct: '16%' },
                                     { name: 'United Kingdom', pct: '11%' },
                                     { name: 'Italy', pct: '5.3%' },
                                   ].map((c) => (
                                     <span key={c.name} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                                       {c.name} ({c.pct})
                                     </span>
                                   ))}
                                </div>
                             </div>

                             {/* Top Cities */}
                             <div className="space-y-3">
                                <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top cities</h4>
                                <div className="flex flex-wrap gap-2">
                                   {[
                                     { name: 'Sydney', pct: '41.2%' },
                                     { name: 'London', pct: '5.6%' },
                                     { name: 'New York', pct: '3.8%' },
                                     { name: 'Dublin', pct: '2.5%' },
                                   ].map((c) => (
                                     <span key={c.name} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                                       {c.name} ({c.pct})
                                     </span>
                                   ))}
                                </div>
                             </div>
                          </div>
                        )}
                        {infoSubTab === 'Content' && (
                          <div className="space-y-6 animate-in fade-in duration-200">
                             {/* Format Performance */}
                             <div className="space-y-3">
                                <h4 className="text-[13px] font-serif font-bold text-brand-dark">Format performance (avg engagement)</h4>
                                <div className="space-y-3">
                                   <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <p className="text-[11px] font-serif font-semibold text-brand-dark">Photos 4.1%</p>
                                      </div>
                                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                         <div className="bg-brand-accent h-full rounded-full" style={{ width: '41%' }}></div>
                                      </div>
                                   </div>
                                   <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <p className="text-[11px] font-serif font-semibold text-brand-dark">Reels 2.5%</p>
                                      </div>
                                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                         <div className="bg-brand-accent h-full rounded-full" style={{ width: '25%' }}></div>
                                      </div>
                                   </div>
                                </div>
                             </div>

                             {/* Top Content (last 30 days) */}
                             <div className="space-y-3">
                                <h4 className="text-[13px] font-serif font-bold text-brand-dark">Top content (last 30 days)</h4>
                                <div className="flex flex-wrap gap-2">
                                   {[
                                     { label: 'Avg views', value: '0' },
                                     { label: 'Median views', value: '0' },
                                     { label: 'Saves rate', value: '0%' },
                                     { label: 'Share rate', value: '0%' },
                                   ].map((item) => (
                                     <span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                                       {item.label}: {item.value}
                                     </span>
                                   ))}
                                </div>
                             </div>

                             {/* Cadence */}
                             <div className="space-y-3">
                                <h4 className="text-[13px] font-serif font-bold text-brand-dark">Cadence</h4>
                                <div className="flex flex-wrap gap-2">
                                   {[
                                     { label: 'Posts', value: '23' },
                                     { label: 'Reels', value: '7' },
                                     { label: 'Stories', value: '' },
                                     { label: 'Avg posts/week', value: '7' },
                                   ].map((item) => (
                                     <span key={item.label} className="bg-[#F4F2EF] text-brand-dark text-[11px] font-semibold px-4 py-2 rounded-full">
                                       {item.label}: {item.value}
                                     </span>
                                   ))}
                                </div>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 shrink-0">
                      <div className="flex items-center gap-4 p-4 bg-orange-50/40 rounded-2xl border border-orange-100/50 shadow-sm">
                        <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white shrink-0 shadow-md shadow-orange-100">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-serif font-black text-brand-accent uppercase tracking-widest leading-none mb-1">Mapkats Ranking</p>
                          <p className="text-sm font-serif font-black text-brand-dark leading-tight">
                            #2 Top Influencer in <span className="text-brand-accent">{influencer.category || 'Dessert Chef'}</span>
                          </p>
                        </div>
                        <button onClick={() => setActiveTab('RANKING')} className="bg-white border border-orange-100 text-[10px] font-black text-brand-accent px-4 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all shadow-sm uppercase">View Ranking</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-[200px] shrink-0 flex flex-col">
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-brand-dark mb-4 opacity-50 px-1">Recent Activity</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {recentPostsData.map((post, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg overflow-hidden bg-gray-100 group border border-gray-50 shadow-sm cursor-pointer relative"
                          onClick={() => setSelectedRecentPost(post)}
                        >
                           <img src={post.imageUrl} alt={`Post ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                             <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                             </svg>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'RATES' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-2 bg-[#F8F6F4] p-1 rounded-xl">
                    <button onClick={() => setRatesPlatform('ALL')} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${ratesPlatform === 'ALL' ? 'bg-brand-gray text-white' : 'text-brand-gray hover:bg-gray-200'}`}>ALL</button>
                    <button onClick={() => setRatesPlatform('IG')} className={`w-8 h-8 p-1.5 rounded-lg transition-all ${ratesPlatform === 'IG' ? 'bg-brand-gray ring-2 ring-brand-accent' : 'opacity-40 hover:opacity-100'}`}><InstagramIcon /></button>
                    <button onClick={() => setRatesPlatform('YT')} className={`w-8 h-8 p-1.5 rounded-lg transition-all ${ratesPlatform === 'YT' ? 'bg-brand-gray ring-2 ring-brand-accent' : 'opacity-40 hover:opacity-100'}`}><YouTubeIcon /></button>
                    <button onClick={() => setRatesPlatform('TT')} className={`w-8 h-8 p-1.5 rounded-lg transition-all ${ratesPlatform === 'TT' ? 'bg-brand-gray ring-2 ring-brand-accent' : 'opacity-40 hover:opacity-100'}`}><TikTokIcon /></button>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest">Est. Media Value (MV)</span>
                       <span className="text-sm font-black text-brand-dark">{totalValue}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Influencer Pricing Sheet</h3>
                    <button className="bg-brand-accent text-white p-2 rounded-lg shadow-md hover:brightness-110 transition-all"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  <div className="bg-[#FDFCFB] border border-gray-100 rounded-2xl overflow-hidden shadow-soft">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100"><tr className="text-[9px] font-black text-brand-gray uppercase tracking-widest"><th className="px-6 py-4">Currency</th><th className="px-6 py-4">Fee</th><th className="px-6 py-4">Detail</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                      <tbody className="divide-y divide-gray-50">
                        {pricingData.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50/50 transition-colors"><td className="px-6 py-5 text-[11px] font-bold text-brand-dark">{row.currency}</td><td className="px-6 py-5 text-[11px] font-black text-brand-dark">{row.fee}</td><td className="px-6 py-5 text-[11px] font-semibold text-brand-gray">{row.detail}</td><td className="px-6 py-5 text-right"><div className="flex justify-end gap-3 text-[10px] font-black"><button className="text-brand-accent hover:underline uppercase tracking-tighter">Edit</button><button className="text-red-500 hover:underline uppercase tracking-tighter">Delete</button></div></td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : activeTab === 'SHIPPING' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Logistics & Tracking</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Selected Courier</span>
                      <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark outline-none">
                        <option>Select Courier...</option><option>Australia Post</option><option>DHL Express</option><option>FedEx</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Tracking Number</span>
                      <div className="relative"><input type="text" placeholder="Enter tracking..." className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-4 pr-20 text-[11px] font-bold outline-none" /><button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-accent text-white font-black px-4 py-1.5 rounded-lg text-[9px] tracking-widest uppercase">Save</button></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Recipient Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" placeholder="First Name" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /><input type="text" placeholder="Last Name" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="email" placeholder="Email Address" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /><input type="tel" placeholder="Phone Number" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /></div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark outline-none appearance-none"><option>Australia</option><option>United States</option></select><input type="text" placeholder="State" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" placeholder="City" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /><input type="text" placeholder="Post Code" className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold outline-none" /></div>
                  <button className="w-full bg-brand-dark text-white font-black py-2.5 rounded-xl text-[9px] tracking-widest uppercase hover:bg-brand-accent transition-all">Verify Address</button>
                </div>
              </div>
            ) : activeTab === 'ROSTER' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Status</span>
                    <select className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 px-4 text-[11px] font-bold text-brand-dark focus:ring-1 focus:ring-brand-accent outline-none appearance-none cursor-pointer">
                      <option>Active</option><option>Red Flag</option><option>Archive</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-brand-gray uppercase tracking-widest px-1">Display Options</span>
                    <div className="flex gap-4 py-2.5 px-1"><label className="flex items-center gap-2 text-[11px] font-bold"><input type="checkbox" className="w-4 h-4 rounded text-brand-accent" /> Carousel</label><label className="flex items-center gap-2 text-[11px] font-bold"><input type="checkbox" className="w-4 h-4 rounded text-brand-accent" /> Public Lists</label></div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Biography Section</h3>
                  <div className="bg-[#FDFCFB] border border-gray-100 rounded-2xl overflow-hidden shadow-soft">
                    <div className="bg-gray-50 border-b border-gray-100 p-2 flex gap-1"><button className="p-1 px-2 text-[10px] font-bold bg-white rounded border">B</button><button className="p-1 px-2 text-[10px] font-bold bg-white rounded border italic">I</button></div>
                    <textarea className="w-full h-32 p-4 bg-transparent text-[11px] font-medium outline-none resize-none" placeholder="Enter biography..." defaultValue="Aussie actor focusing on coffee culture and lifestyle." />
                    <div className="p-3 bg-gray-50/30 border-t border-gray-50 flex justify-end"><button className="bg-brand-accent text-white font-black px-6 py-1.5 rounded-lg text-[9px] tracking-widest uppercase shadow-sm">Save</button></div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-gray-50">
                   <div className="flex items-center justify-between"><h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark/40">Gallery Assets</h3><button className="bg-brand-dark text-white px-6 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase">Add</button></div>
                   <div className="bg-[#F8F6F4] border-2 border-dashed border-gray-200 rounded-2xl h-32 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-accent transition-colors"><PlusIcon className="w-6 h-6 text-brand-gray" /><span className="text-[10px] font-black text-brand-gray uppercase tracking-widest">Upload assets here</span></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-brand-gray italic text-sm font-bold uppercase tracking-widest opacity-30">
                {activeTab} CONTENT SECTION
              </div>
            )}

            {/* Recent Post Detail Overlay */}
            {selectedRecentPost && (
              <div className="absolute inset-0 z-20 bg-white flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Close button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedRecentPost(null)}
                    className="p-2 bg-white border border-gray-200 text-brand-accent hover:text-red-500 rounded-xl shadow-md transition-all hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content area */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  {/* Image */}
                  <div className="md:w-[55%] bg-gray-50 flex flex-col">
                    <div className="flex-1 overflow-hidden">
                      <img
                        src={selectedRecentPost.imageUrl}
                        alt="Post"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Engagement bar */}
                    <div className="flex items-center gap-6 px-6 py-4 bg-white border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span className="text-sm font-black text-brand-dark">{selectedRecentPost.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <span className="text-sm font-black text-brand-dark">{selectedRecentPost.comments}</span>
                      </div>
                    </div>
                  </div>

                  {/* Caption side */}
                  <div className="md:w-[45%] p-8 md:p-10 flex flex-col overflow-y-auto">
                    <p className="text-base font-serif font-medium text-brand-dark leading-relaxed">
                      {selectedRecentPost.caption}
                    </p>
                  </div>
                </div>
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
