
import React, { useState } from 'react';

interface AddProCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddProCollectionModal: React.FC<AddProCollectionModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [collectionName, setCollectionName] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (collectionName.trim()) {
      onAdd(collectionName.trim());
      setCollectionName('');
    }
  };

  const handleClose = () => {
    setCollectionName('');
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
            Add New Pro Collection
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
        <div className="px-6 py-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-brand-gray mb-2">
              Collection Name<span className="text-brand-accent">*</span>
            </label>
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Enter collection name..."
              className="w-full bg-[#F8F6F4] border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-brand-dark placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all"
              autoFocus
            />
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
            disabled={!collectionName.trim()}
            className={`px-6 py-2.5 text-xs font-bold text-white rounded-xl uppercase tracking-wider transition-all shadow-md ${
              collectionName.trim()
                ? 'bg-brand-accent hover:brightness-110'
                : 'bg-brand-gray/30 cursor-not-allowed'
            }`}
          >
            Add Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProCollectionModal;
