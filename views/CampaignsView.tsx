
import React from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

const CampaignsView: React.FC = () => {
  const campaigns = [
    { name: 'Collection', posts: 0, stories: 0, media: 0.00, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 4, email: 4, requested: 0 } },
    { name: 'GOFAR', posts: 0, stories: 0, media: 0.00, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 0, email: 0, requested: 0 } },
    { name: 'Manuka Honey', posts: 8, stories: 12, media: 1590.71, type: 'GIFTED', target: 10, confirmed: 0, need: 10, activity: { new: 0, email: 0, requested: 0 } },
    { name: "Shanky's Full List", posts: 0, stories: 0, media: 0.00, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 0, email: 0, requested: 0 } },
    { name: "Shanky's Midwest", posts: 0, stories: 0, media: 0.00, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 0, email: 0, requested: 0 } },
    { name: 'Golden Ostrich', posts: 0, stories: 0, media: 0.00, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 0, email: 0, requested: 0 } },
    { name: 'Shankys Total Wine', posts: 0, stories: 0, media: 0.00, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 0, email: 0, requested: 0 } },
    { name: 'Shankys Cans', posts: 1, stories: 0, media: 117.50, type: 'GIFTED', target: 0, confirmed: 0, need: 0, activity: { new: 0, email: 0, requested: 0 } },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Campaigns</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase">Add Campaign</button>
          <button className="bg-brand-dark text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase">Influencers</button>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>
        
        <div className="flex items-center bg-[#F8F6F4] p-1 rounded-xl">
          {['WEEK', 'MONTH', 'LIFETIME', 'CUSTOM'].map((filter, i) => (
            <button 
              key={filter}
              className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${
                i === 1 ? 'bg-white text-brand-accent shadow-sm' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="text-[11px] font-bold text-brand-accent border border-brand-accent px-5 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all uppercase tracking-wider">
          Show All
        </button>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4 w-32">Status</th>
                <th className="px-6 py-4">Campaign Name</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4">Targets</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((camp, idx) => (
                <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-5">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-brand-light-gray rounded-lg text-[10px] font-bold text-brand-gray group-hover:bg-white transition-all">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                      Activate
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <button className="text-sm font-bold text-brand-accent hover:underline block text-left">
                        {camp.name}
                      </button>
                      <div className="flex items-center gap-4 text-[10px] text-brand-gray font-bold">
                        <span>Posts: <span className="text-brand-dark">{camp.posts}</span></span>
                        <span>Stories: <span className="text-brand-dark">{camp.stories}</span></span>
                        <span>Media: <span className="text-brand-dark">${camp.media.toLocaleString()}</span></span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-md tracking-wider">
                      {camp.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-4 text-[11px] font-semibold text-brand-gray">
                      <span>Target: <span className="text-brand-dark">{camp.target}</span></span>
                      <span>Confirmed: <span className="text-brand-dark">{camp.confirmed}</span></span>
                      <span>Need: <span className="text-brand-dark">{camp.need}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-4 text-[11px] font-semibold text-brand-gray">
                      <span>New: <span className="text-brand-dark">{camp.activity.new}</span></span>
                      <span>Email: <span className="text-brand-dark">{camp.activity.email}</span></span>
                      <span>Req: <span className="text-brand-dark">{camp.activity.requested}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-brand-gray hover:text-red-500 transition-colors p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignsView;
