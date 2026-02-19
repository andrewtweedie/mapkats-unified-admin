
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

export interface TermsCondition {
  id: number;
  name: string;
  body: string;
  attachments: string[];
  createdDate: string;
  lastModified: string;
}

interface TermsConditionsViewProps {
  onTermsClick: (terms: TermsCondition) => void;
  onAddNew: () => void;
}

const TermsConditionsView: React.FC<TermsConditionsViewProps> = ({ onTermsClick, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<TermsCondition | null>(null);

  const termsItems: TermsCondition[] = [
    { id: 1, name: 'Test Terms and Conditions', body: 'Testing Conditions\n\nTesting test test test...', attachments: [], createdDate: 'Jan 10, 2024', lastModified: 'Feb 05, 2026' },
    { id: 2, name: 'Standard Influencer Agreement', body: 'This Influencer Agreement ("Agreement") is entered into between...', attachments: [], createdDate: 'Mar 15, 2023', lastModified: 'Jan 20, 2026' },
    { id: 3, name: 'Campaign Participation Terms', body: 'By participating in any campaign organized through the Mapkats platform...', attachments: ['Campaign_Terms_v2.pdf'], createdDate: 'Jun 22, 2023', lastModified: 'Dec 10, 2025' },
    { id: 4, name: 'Content Usage Rights Agreement', body: 'This Content Usage Rights Agreement outlines the terms under which...', attachments: [], createdDate: 'Sep 05, 2023', lastModified: 'Nov 18, 2025' },
    { id: 5, name: 'Privacy & Data Processing Policy', body: 'This Privacy and Data Processing Policy describes how we collect...', attachments: ['Privacy_Policy_2025.pdf'], createdDate: 'Nov 12, 2023', lastModified: 'Oct 01, 2025' },
  ];

  const filteredTerms = termsItems.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Terms & Conditions</h1>
          <p className="text-[13px] text-brand-gray mt-1">Manage terms, conditions, and legal agreements</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onAddNew}
            className="bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{termsItems.length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Documents</p>
          </div>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>
      </div>

      {/* Terms Table */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 w-36">Last Modified</th>
                <th className="px-6 py-4 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTerms.map((terms) => (
                <tr key={terms.id} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onTermsClick(terms)}
                      className="text-[13px] font-bold text-brand-dark hover:text-brand-accent transition-colors text-left"
                    >
                      {terms.name}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{terms.lastModified}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onTermsClick(terms)}
                        className="text-brand-gray hover:text-brand-accent transition-colors p-1.5 rounded-lg hover:bg-brand-accent/5"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(terms)}
                        className="text-brand-gray hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTerms.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-[13px] font-semibold text-brand-gray">No documents found</p>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-[11px] font-bold text-brand-accent hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-brand-gray">
            Showing <span className="font-black text-brand-dark">{filteredTerms.length}</span> of <span className="font-black text-brand-dark">{termsItems.length}</span> documents
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[11px] font-bold text-brand-accent hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-black text-brand-dark mb-2">Delete Document</h3>
            <p className="text-[13px] text-brand-gray mb-6">
              Are you sure you want to delete <span className="font-bold text-brand-dark">&ldquo;{showDeleteConfirm.name}&rdquo;</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-8 py-2.5 text-[12px] font-bold text-brand-gray border border-gray-200 rounded-xl hover:bg-gray-50 transition-all uppercase tracking-wider">Cancel</button>
              <button onClick={() => setShowDeleteConfirm(null)} className="px-8 py-2.5 text-[12px] font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all shadow-md uppercase tracking-wider">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsConditionsView;
