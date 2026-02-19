
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

export interface Subscriber {
  name: string;
  type: 'Influencer' | 'Public';
  email: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
  country: string;
  loginDate: string;
  marketing: boolean;
  savedPCs: number;
  savedInfluencers: number;
  // Detail fields
  firstName: string;
  lastName: string;
  receiveMapkatsMarketing: boolean;
  receivePartnerMarketing: boolean;
  receiveCollaborationRequests: boolean;
  allowShowcased: boolean;
  // Influencer-specific
  authorisedAccounts?: {
    instagram: 'CONNECTED' | 'NOT CONNECTED';
    youtube: 'CONNECTED' | 'NOT CONNECTED';
    tiktok: 'CONNECTED' | 'NOT CONNECTED';
  };
  profileStats?: {
    views: number;
    saves: number;
  };
  badges?: {
    name: string;
    visibility: 'VISIBLE' | 'HIDE' | 'SHOWCASE';
  }[];
}

interface SubscribersViewProps {
  onSubscriberClick?: (subscriber: Subscriber) => void;
}

const SubscribersView: React.FC<SubscribersViewProps> = ({ onSubscriberClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const subscribers: Subscriber[] = [
    {
      name: 'Andrew Tweedie', firstName: 'Andrew', lastName: 'Tweedie', type: 'Influencer',
      email: 'accounts@nativeempire.com', status: 'Active', createdDate: 'Jun 23, 2025',
      country: 'Australia', loginDate: 'Feb 17, 2026', marketing: true, savedPCs: 4, savedInfluencers: 8,
      receiveMapkatsMarketing: true, receivePartnerMarketing: true, receiveCollaborationRequests: false, allowShowcased: false,
      authorisedAccounts: { instagram: 'CONNECTED', youtube: 'NOT CONNECTED', tiktok: 'NOT CONNECTED' },
      profileStats: { views: 27, saves: 2 },
      badges: [
        { name: '#2 Dessert Chef', visibility: 'VISIBLE' },
        { name: 'Top 10 Viewed', visibility: 'VISIBLE' },
        { name: 'Top 10 Viewed', visibility: 'VISIBLE' },
        { name: 'Top 10 Saved', visibility: 'VISIBLE' },
      ],
    },
    {
      name: 'Arlene Joy Magadia', firstName: 'Arlene Joy', lastName: 'Magadia', type: 'Public',
      email: 'arlenejoymagadia.97@gmail.com', status: 'Active', createdDate: 'Jul 11, 2025',
      country: 'Hong Kong', loginDate: '', marketing: true, savedPCs: 0, savedInfluencers: 0,
      receiveMapkatsMarketing: true, receivePartnerMarketing: true, receiveCollaborationRequests: false, allowShowcased: false,
    },
    {
      name: 'promotions_team Lastname', firstName: 'promotions_team', lastName: 'Lastname', type: 'Influencer',
      email: 'promotions_team@instagram.mapkats.com', status: 'Active', createdDate: 'Feb 10, 2026',
      country: 'Australia', loginDate: 'Feb 10, 2026', marketing: false, savedPCs: 1, savedInfluencers: 2,
      receiveMapkatsMarketing: false, receivePartnerMarketing: false, receiveCollaborationRequests: false, allowShowcased: false,
      authorisedAccounts: { instagram: 'CONNECTED', youtube: 'NOT CONNECTED', tiktok: 'NOT CONNECTED' },
      profileStats: { views: 5, saves: 0 },
      badges: [],
    },
    {
      name: 'badien_bakhung', firstName: 'badien_bakhung', lastName: '', type: 'Influencer',
      email: 'badien_bakhung@instagram.mapkats.com', status: 'Active', createdDate: 'Feb 11, 2026',
      country: '', loginDate: 'Feb 11, 2026', marketing: false, savedPCs: 0, savedInfluencers: 0,
      receiveMapkatsMarketing: false, receivePartnerMarketing: false, receiveCollaborationRequests: false, allowShowcased: false,
      authorisedAccounts: { instagram: 'CONNECTED', youtube: 'NOT CONNECTED', tiktok: 'NOT CONNECTED' },
      profileStats: { views: 0, saves: 0 },
      badges: [],
    },
    {
      name: 'hello_native_empire', firstName: 'hello_native_empire', lastName: '', type: 'Influencer',
      email: 'hello_native_empire@instagram.mapkats.com', status: 'Active', createdDate: 'Feb 11, 2026',
      country: '', loginDate: 'Feb 17, 2026', marketing: false, savedPCs: 1, savedInfluencers: 2,
      receiveMapkatsMarketing: false, receivePartnerMarketing: false, receiveCollaborationRequests: false, allowShowcased: false,
      authorisedAccounts: { instagram: 'CONNECTED', youtube: 'NOT CONNECTED', tiktok: 'NOT CONNECTED' },
      profileStats: { views: 12, saves: 1 },
      badges: [],
    },
    {
      name: 'Meta Test', firstName: 'Meta', lastName: 'Test', type: 'Public',
      email: 'meta@testing.com', status: 'Active', createdDate: 'Feb 17, 2026',
      country: 'Australia', loginDate: '', marketing: false, savedPCs: 0, savedInfluencers: 1,
      receiveMapkatsMarketing: false, receivePartnerMarketing: false, receiveCollaborationRequests: false, allowShowcased: false,
    },
    {
      name: 'andrewtweedie', firstName: 'andrewtweedie', lastName: '', type: 'Public',
      email: 'andrewtweedie@instagram.mapkats.com', status: 'Active', createdDate: 'Feb 17, 2026',
      country: '', loginDate: 'Feb 17, 2026', marketing: false, savedPCs: 0, savedInfluencers: 0,
      receiveMapkatsMarketing: false, receivePartnerMarketing: false, receiveCollaborationRequests: false, allowShowcased: false,
    },
  ];

  const filterTypes = ['All', 'Influencer', 'Public'];

  const filteredSubscribers = subscribers.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || s.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Influencer':
        return 'text-purple-600 bg-purple-50';
      case 'Public':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-brand-gray bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Subscribers</h1>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>

        <div className="flex items-center bg-[#F8F6F4] p-1 rounded-xl">
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${
                filterType === type ? 'bg-white text-brand-accent shadow-sm' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="text-[11px] font-bold text-brand-accent border border-brand-accent px-5 py-2 rounded-xl hover:bg-brand-accent hover:text-white transition-all uppercase tracking-wider">
          Show All
        </button>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 w-28">Type</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center w-28">Marketing</th>
                <th className="px-6 py-4">Saves</th>
                <th className="px-6 py-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSubscribers.map((sub, idx) => (
                <tr key={idx} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="text-[13px] font-bold text-brand-dark block">{sub.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider ${
                          sub.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                        }`}>
                          {sub.status}
                        </span>
                        {sub.country && (
                          <span className="text-[10px] font-semibold text-brand-gray">{sub.country}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider ${getTypeBadge(sub.type)}`}>
                      {sub.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="text-[12px] font-semibold text-brand-gray block">{sub.email}</span>
                      <div className="flex items-center gap-4 text-[10px] font-semibold text-brand-gray">
                        <span><span className="text-brand-dark font-bold">Created:</span> {sub.createdDate}</span>
                        <span><span className="text-brand-dark font-bold">Login:</span> {sub.loginDate || '—'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {sub.marketing ? (
                      <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-brand-gray">
                      <span>PCs: <span className="text-brand-dark font-bold">{sub.savedPCs}</span></span>
                      <span>Influencers: <span className="text-brand-dark font-bold">{sub.savedInfluencers}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onSubscriberClick?.(sub)}
                      className="text-brand-gray hover:text-brand-accent transition-colors p-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

export default SubscribersView;
