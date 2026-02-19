
import React, { useState } from 'react';
import { Subscriber } from './SubscribersView';
import InfluencerDetailPopup from '../components/InfluencerDetailPopup';

interface SubscriberDetailViewProps {
  subscriber: Subscriber;
  onBack: () => void;
}

const SubscriberDetailView: React.FC<SubscriberDetailViewProps> = ({ subscriber, onBack }) => {
  const [firstName, setFirstName] = useState(subscriber.firstName);
  const [lastName, setLastName] = useState(subscriber.lastName);
  const [email, setEmail] = useState(subscriber.email);
  const [country, setCountry] = useState(subscriber.country);
  const [receiveMapkatsMarketing, setReceiveMapkatsMarketing] = useState(subscriber.receiveMapkatsMarketing);
  const [receivePartnerMarketing, setReceivePartnerMarketing] = useState(subscriber.receivePartnerMarketing);
  const [receiveCollaborationRequests, setReceiveCollaborationRequests] = useState(subscriber.receiveCollaborationRequests);
  const [allowShowcased, setAllowShowcased] = useState(subscriber.allowShowcased);
  const [status, setStatus] = useState(subscriber.status);
  const [badges, setBadges] = useState(subscriber.badges || []);
  const [showInfluencerPopup, setShowInfluencerPopup] = useState(false);

  // Build an influencer object that the InfluencerDetailPopup can consume
  const influencerForPopup = {
    name: subscriber.name,
    username: subscriber.email.split('@')[0],
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    category: 'Influencer',
    location: subscriber.country || 'Unknown',
    region: subscriber.country === 'Australia' ? 'AU' : subscriber.country === 'Hong Kong' ? 'HK' : '',
    flag: subscriber.country === 'Australia' ? '🇦🇺' : subscriber.country === 'Hong Kong' ? '🇭🇰' : '🌍',
    totalAudience: String(subscriber.profileStats?.views || 0),
    totalValue: '$0.00',
    channels: [
      ...(subscriber.authorisedAccounts?.instagram === 'CONNECTED' ? [{ platform: 'instagram' as const, count: '0', value: '$0.00' }] : []),
      ...(subscriber.authorisedAccounts?.youtube === 'CONNECTED' ? [{ platform: 'youtube' as const, count: '0', value: '$0.00' }] : []),
      ...(subscriber.authorisedAccounts?.tiktok === 'CONNECTED' ? [{ platform: 'tiktok' as const, count: '0', value: '$0.00' }] : []),
    ],
  };

  const countries = [
    'Australia', 'United States', 'United Kingdom', 'Canada', 'New Zealand',
    'Hong Kong', 'Singapore', 'Japan', 'South Korea', 'Germany', 'France',
    'Italy', 'Spain', 'Brazil', 'Mexico', 'India', 'South Africa',
  ];

  const toggleBadgeVisibility = (index: number, newVisibility: 'VISIBLE' | 'HIDE' | 'SHOWCASE') => {
    const updated = [...badges];
    updated[index] = { ...updated[index], visibility: newVisibility };
    setBadges(updated);
  };

  const isInfluencer = subscriber.type === 'Influencer';

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-3xl font-serif font-black tracking-tight text-brand-gray hover:text-brand-accent transition-colors"
        >
          Subscribers
        </button>
        <span className="text-3xl font-serif font-black tracking-tight text-brand-gray">/</span>
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">{subscriber.name}</h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 px-8 py-5 flex items-center justify-between">
          <h2 className="text-lg font-serif font-black text-brand-dark">Subscriber Details</h2>
          <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg tracking-wider ${
            isInfluencer ? 'text-purple-600 bg-purple-100' : 'text-blue-600 bg-blue-100'
          }`}>
            {subscriber.type}
          </span>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                Country
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 pr-10 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all cursor-pointer"
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Marketing Checkboxes */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setReceiveMapkatsMarketing(!receiveMapkatsMarketing)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                    receiveMapkatsMarketing ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                  }`}
                >
                  {receiveMapkatsMarketing && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] font-semibold text-brand-dark">Receive Mapkats Marketing?</span>
              </label>
              {isInfluencer && (
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setReceiveCollaborationRequests(!receiveCollaborationRequests)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      receiveCollaborationRequests ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                    }`}
                  >
                    {receiveCollaborationRequests && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-brand-dark">Receive Collaboration Requests</span>
                </label>
              )}
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setReceivePartnerMarketing(!receivePartnerMarketing)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                    receivePartnerMarketing ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                  }`}
                >
                  {receivePartnerMarketing && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] font-semibold text-brand-dark">Receive Partner Marketing?</span>
              </label>
              {isInfluencer && (
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setAllowShowcased(!allowShowcased)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      allowShowcased ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'
                    }`}
                  >
                    {allowShowcased && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] font-semibold text-brand-dark">Allow to be showcased.</span>
                </label>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 pr-10 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all cursor-pointer"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <svg className="w-4 h-4 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="flex gap-8">
              <div>
                <span className="text-[11px] font-black text-brand-dark uppercase tracking-wider">Created Date: </span>
                <span className="text-[13px] font-semibold text-brand-gray">{subscriber.createdDate}</span>
              </div>
              <div>
                <span className="text-[11px] font-black text-brand-dark uppercase tracking-wider">Last Login: </span>
                <span className="text-[13px] font-semibold text-brand-gray">{subscriber.loginDate || '—'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-8">
              <div>
                <span className="text-[11px] font-black text-brand-dark uppercase tracking-wider">Saved Pro Collections: </span>
                <span className="text-[13px] font-semibold text-brand-gray">{subscriber.savedPCs}</span>
              </div>
              <div>
                <span className="text-[11px] font-black text-brand-dark uppercase tracking-wider">Saved Influencers: </span>
                <span className="text-[13px] font-semibold text-brand-gray">{subscriber.savedInfluencers}</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              INFLUENCER-ONLY SECTIONS
              ═══════════════════════════════════════════════════════ */}
          {isInfluencer && (
            <>
              {/* Authorised Accounts */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-serif font-black text-brand-dark mb-4">Authorised Accounts</h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-brand-dark">Instagram:</span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full tracking-wider ${
                      subscriber.authorisedAccounts?.instagram === 'CONNECTED'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {subscriber.authorisedAccounts?.instagram === 'CONNECTED' ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-brand-dark">YouTube:</span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full tracking-wider ${
                      subscriber.authorisedAccounts?.youtube === 'CONNECTED'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {subscriber.authorisedAccounts?.youtube === 'CONNECTED' ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-bold text-brand-dark">TikTok:</span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full tracking-wider ${
                      subscriber.authorisedAccounts?.tiktok === 'CONNECTED'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>
                      {subscriber.authorisedAccounts?.tiktok === 'CONNECTED' ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowInfluencerPopup(true)}
                  className="mt-4 bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-[11px] tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
                >
                  View Influencer Profile
                </button>
              </div>

              {/* Profile Stats */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-serif font-black text-brand-dark mb-4">Profile Stats</h3>
                <div className="flex gap-4">
                  <div className="flex-1 bg-[#FDFCFB] border border-gray-100 rounded-2xl p-6 text-center shadow-soft">
                    <p className="text-3xl font-black text-brand-dark mb-1">{subscriber.profileStats?.views || 0}</p>
                    <p className="text-[11px] font-bold text-brand-gray uppercase tracking-wider">Views</p>
                  </div>
                  <div className="flex-1 bg-[#FDFCFB] border border-gray-100 rounded-2xl p-6 text-center shadow-soft">
                    <p className="text-3xl font-black text-brand-dark mb-1">{subscriber.profileStats?.saves || 0}</p>
                    <p className="text-[11px] font-bold text-brand-gray uppercase tracking-wider">Saves</p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              {badges.length > 0 && (
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-serif font-black text-brand-dark mb-4">Mapkats Badges</h3>
                  <div className="space-y-3">
                    {badges.map((badge, idx) => {
                      // Match Influencer profile badge colours:
                      // Ranking badges (contain #) → brand-accent orange, italic
                      // "Viewed" badges → brand-dark
                      // "Saved" badges → steel blue #82A3C4
                      const getBadgeStyle = () => {
                        if (badge.name.includes('#')) return 'bg-brand-accent text-white font-bold italic';
                        if (badge.name.toLowerCase().includes('saved')) return 'bg-[#82A3C4] text-white font-semibold';
                        return 'bg-brand-dark text-white font-semibold';
                      };

                      return (
                        <div key={idx} className="flex items-center justify-between bg-[#FDFCFB] border border-gray-100 rounded-xl px-5 py-3">
                          <span className={`text-[11px] px-4 py-1.5 rounded-lg ${getBadgeStyle()}`}>
                            {badge.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleBadgeVisibility(idx, 'VISIBLE')}
                              className={`px-4 py-1.5 text-[10px] font-black rounded-lg tracking-wider transition-all ${
                                badge.visibility === 'VISIBLE'
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-white border border-gray-200 text-brand-gray hover:border-emerald-400 hover:text-emerald-500'
                              }`}
                            >
                              VISIBLE
                            </button>
                            <button
                              onClick={() => toggleBadgeVisibility(idx, 'HIDE')}
                              className={`px-4 py-1.5 text-[10px] font-black rounded-lg tracking-wider transition-all ${
                                badge.visibility === 'HIDE'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white border border-gray-200 text-brand-gray hover:border-red-400 hover:text-red-500'
                              }`}
                            >
                              HIDE
                            </button>
                            <button
                              onClick={() => toggleBadgeVisibility(idx, 'SHOWCASE')}
                              className={`px-4 py-1.5 text-[10px] font-black rounded-lg tracking-wider transition-all ${
                                badge.visibility === 'SHOWCASE'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white border border-gray-200 text-brand-gray hover:border-blue-400 hover:text-blue-500'
                              }`}
                            >
                              SHOWCASE
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 px-8 py-5 flex justify-end gap-3">
          <button
            onClick={onBack}
            className="px-8 py-2.5 text-[12px] font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={onBack}
            className="px-8 py-2.5 text-[12px] font-bold text-white bg-brand-accent rounded-xl hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
          >
            Save
          </button>
        </div>
      </div>

      {/* Influencer Profile Popup */}
      {showInfluencerPopup && (
        <InfluencerDetailPopup
          influencer={influencerForPopup}
          onClose={() => setShowInfluencerPopup(false)}
        />
      )}
    </div>
  );
};

export default SubscriberDetailView;
