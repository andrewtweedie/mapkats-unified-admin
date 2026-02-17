
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ListSection from './components/ListSection';
import SocialCheckInput from './components/SocialCheckInput';
import InfluencerCardRow from './components/InfluencerCardRow';
import { InstagramIcon, YouTubeIcon, TikTokIcon } from './components/icons/SocialIcons';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F5F5F0] overflow-hidden text-brand-dark">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
        <Header userName="Andrew Tweedie" userInitials="AT" />

        <div className="p-10 max-w-7xl w-full mx-auto space-y-12">
          {/* Welcome Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-black tracking-tight mb-2 text-brand-dark">
                Hi Andrew, welcome back.
              </h1>
              <p className="text-brand-gray text-sm font-semibold tracking-wide">Manage your community and saved collections below.</p>
            </div>
          </section>

          {/* Top Row: Management Cards & Social Tools with uniform height */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <ListSection 
              title="Manage Campaigns" 
              items={[
                "Chinola SYD City & East",
                "Chinola Northern Beaches",
                "Shankys Candidates USA",
                "Shankys St Patricks 2026",
                "Collection"
              ]}
              buttonText="ADD CAMPAIGN"
              buttonColor="pink"
            />
            <ListSection 
              title="Manage Pro Collections" 
              items={[
                "London's Best Tastemakers",
                "UK's Best Home Bartenders",
                "UK's Best Home Cooks",
                "London's Best Bartenders",
                "LA's Best Bartenders"
              ]}
              buttonText="ADD PRO COLLECTION"
              buttonColor="pink"
            />
            <div className="bg-white rounded-xl shadow-soft p-6 flex flex-col h-full border border-gray-100">
              <h2 className="font-bold text-[11px] uppercase tracking-widest text-brand-gray border-b border-gray-50 pb-3 mb-6">Influencer Tools</h2>
              <div className="space-y-6 flex-1">
                <SocialCheckInput platform="Instagram" icon={<InstagramIcon />} />
                <SocialCheckInput platform="Youtube" icon={<YouTubeIcon />} />
                <SocialCheckInput platform="TikTok" icon={<TikTokIcon />} />
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50">
                <a href="#" className="block text-center text-[10px] font-bold text-brand-accent hover:underline uppercase tracking-widest">Open Analytics Suite</a>
              </div>
            </div>
          </div>

          {/* Influencer Sections */}
          <div className="space-y-20 pt-4">
            <InfluencerCardRow 
              title="My Saved Influencers" 
              influencers={[
                { name: "Finebrands", imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400", stats: "779 followers", platform: "instagram" },
                { name: "Shanky's Whip", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", stats: "13,866 followers", platform: "instagram" },
                { name: "Tammy Moore Jackson", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", stats: "44,073 followers", platform: "instagram" },
                { name: "ADELE.", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400", stats: "45K followers", platform: "tiktok" },
              ]}
            />

            <InfluencerCardRow 
              title="Campaign Talent Queue" 
              influencers={[
                { name: "Erma | Healthy Recipes", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400", stats: "300K followers", platform: "instagram" },
                { name: "Peter Madrigal", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", stats: "50K followers", platform: "youtube" },
                { name: "Beautiful Booze", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400", stats: "115K followers", platform: "instagram" },
                { name: "Sam Pence", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", stats: "90K followers", platform: "tiktok" },
              ]}
            />
          </div>
        </div>

        <footer className="mt-auto p-10 bg-white border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-brand-dark gap-6">
           <div className="flex items-center gap-1">
             <span className="text-gray-400">©</span> Native Empire
           </div>
           <div className="flex gap-12">
              <a href="#" className="hover:text-brand-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Terms & Conditions</a>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
