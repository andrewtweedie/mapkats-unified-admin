
import React, { useState } from 'react';

interface InfluencerCheckResult {
  username: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  imageUrl: string;
  followers: string;
  existsInDatabase: boolean;
  category?: string;
  categoryColor?: string;
  countryFlag?: string;
  country?: string;
  city?: string;
  ranking?: { position: number; category: string };
  badges?: { label: string; color: 'orange' | 'black' | 'slate' }[];
}

interface InfluencerCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: InfluencerCheckResult | null;
  campaigns: string[];
  onAddToCampaign: (campaign: string) => void;
}

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  instagram: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' },
  youtube: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
  tiktok: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
};

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
};

const badgeColors: Record<string, string> = {
  orange: 'bg-brand-accent',
  black: 'bg-gray-900',
  slate: 'bg-slate-400',
};

const InfluencerCheckModal: React.FC<InfluencerCheckModalProps> = ({ isOpen, onClose, result, campaigns, onAddToCampaign }) => {
  const [selectedCampaign, setSelectedCampaign] = useState('');

  if (!isOpen || !result) return null;

  const colors = platformColors[result.platform] || platformColors.instagram;

  const handleAddToCampaign = () => {
    if (selectedCampaign) {
      onAddToCampaign(selectedCampaign);
      setSelectedCampaign('');
    }
  };

  const handleClose = () => {
    setSelectedCampaign('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal — wider for existing influencers */}
      <div className={`relative bg-white w-full rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${result.existsInDatabase ? 'max-w-lg' : 'max-w-md'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-serif font-black tracking-tight text-brand-dark">
            Influencer Check
          </h2>
          <button
            onClick={handleClose}
            className="text-brand-gray hover:text-brand-dark transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Status Badge */}
          <div className={`rounded-xl p-3 text-center ${result.existsInDatabase ? 'bg-emerald-50 border border-emerald-100' : 'bg-amber-50 border border-amber-100'}`}>
            <div className="flex items-center justify-center gap-2">
              {result.existsInDatabase ? (
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
              <span className={`text-xs font-bold ${result.existsInDatabase ? 'text-emerald-700' : 'text-amber-700'}`}>
                {result.existsInDatabase
                  ? 'This influencer already exists in the database'
                  : 'This influencer does not exist in the database'}
              </span>
            </div>
          </div>

          {/* Profile Card */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-panel border-2 border-white ring-1 ring-gray-100 mb-3">
              <img
                src={result.imageUrl}
                alt={result.username}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Username */}
            <span className={`text-sm font-bold ${colors.text}`}>
              @{result.username}
            </span>

            {/* Followers & Platform */}
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-sm font-semibold text-brand-dark">{result.followers}</span>
              <span className="text-brand-gray">·</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${colors.bg} ${colors.text} ${colors.border} border`}>
                {platformLabels[result.platform]}
              </span>
            </div>

            {/* Genre Pill + City — for existing influencers */}
            {result.existsInDatabase && (
              <div className="flex items-center gap-3 mt-3">
                {/* Genre pill with flag and category color */}
                {result.category && (
                  <span
                    className="inline-flex items-center gap-2 text-[11px] font-black text-white uppercase tracking-wider px-4 py-2 rounded-full"
                    style={{ backgroundColor: result.categoryColor || '#3B5998' }}
                  >
                    {result.countryFlag && <span className="text-sm">{result.countryFlag}</span>}
                    {result.category}
                  </span>
                )}

                {/* City */}
                {result.city && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-gray">
                    <svg className="w-3.5 h-3.5 text-brand-gray/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {result.city}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mapkats Ranking — only for existing influencers */}
          {result.existsInDatabase && result.ranking && (
            <div className="bg-[#FFF8F4] border border-orange-100 rounded-xl p-4 flex items-center gap-4">
              {/* Ranking Icon */}
              <div className="w-11 h-11 bg-brand-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              {/* Ranking Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Mapkats Ranking</p>
                <p className="text-sm font-serif font-black text-brand-dark mt-0.5">
                  #{result.ranking.position} Top Influencer in{' '}
                  <span className="text-brand-accent">{result.ranking.category}</span>
                </p>
              </div>
            </div>
          )}

          {/* Mapkats Badges — only for existing influencers */}
          {result.existsInDatabase && result.badges && result.badges.length > 0 && (
            <div>
              <p className="text-sm font-serif font-black text-brand-dark mb-2.5">Mapkats Badges</p>
              <div className="flex flex-wrap gap-2">
                {result.badges.map((badge, i) => (
                  <span
                    key={i}
                    className={`${badgeColors[badge.color] || 'bg-gray-900'} text-white text-[11px] font-bold italic px-4 py-2 rounded-full`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Campaign Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-brand-gray mb-2">
              Add to Campaign
            </label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full bg-[#F8F6F4] border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-brand-dark focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a campaign...</option>
              {campaigns.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-[#FDFCFB]">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 text-xs font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCampaign}
            disabled={!selectedCampaign}
            className={`px-6 py-2.5 text-xs font-bold text-white rounded-xl uppercase tracking-wider transition-all shadow-md ${
              selectedCampaign
                ? 'bg-brand-accent hover:brightness-110'
                : 'bg-brand-gray/30 cursor-not-allowed'
            }`}
          >
            Add to Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfluencerCheckModal;
