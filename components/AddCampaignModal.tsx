
import React, { useState } from 'react';

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, type: 'GIFTED' | 'PAID') => void;
}

const AddCampaignModal: React.FC<AddCampaignModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState<'GIFTED' | 'PAID'>('GIFTED');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (campaignName.trim()) {
      onAdd(campaignName.trim(), campaignType);
      setCampaignName('');
      setCampaignType('GIFTED');
    }
  };

  const handleClose = () => {
    setCampaignName('');
    setCampaignType('GIFTED');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-serif font-black tracking-tight text-brand-dark">
            Add New Campaign
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
        <div className="px-6 py-6 space-y-6">
          {/* Campaign Name */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-brand-gray mb-2">
              Campaign Name<span className="text-brand-accent">*</span>
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name..."
              className="w-full bg-[#F8F6F4] border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-brand-dark placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
              autoFocus
            />
          </div>

          {/* Campaign Type Toggle */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-brand-gray mb-3">
              Campaign Type
            </label>
            <div className="flex bg-[#F8F6F4] p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setCampaignType('GIFTED')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider transition-all ${
                  campaignType === 'GIFTED'
                    ? 'bg-white text-blue-600 shadow-sm border border-blue-100'
                    : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  GIFTED
                </div>
              </button>
              <button
                onClick={() => setCampaignType('PAID')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider transition-all ${
                  campaignType === 'PAID'
                    ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100'
                    : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  PAID
                </div>
              </button>
            </div>
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
            onClick={handleAdd}
            disabled={!campaignName.trim()}
            className={`px-6 py-2.5 text-xs font-bold text-white rounded-xl uppercase tracking-wider transition-all shadow-md ${
              campaignName.trim()
                ? 'bg-brand-accent hover:brightness-110'
                : 'bg-brand-gray/30 cursor-not-allowed'
            }`}
          >
            Add Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignModal;
