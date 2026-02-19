
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/UiIcons';

export interface EmailTemplate {
  id: number;
  subject: string;
  status: 'active' | 'archived';
  body: string;
  attachments: string[];
  createdDate: string;
  lastModified: string;
}

interface EmailTemplatesViewProps {
  onTemplateClick: (template: EmailTemplate) => void;
  onAddNew: () => void;
}

const EmailTemplatesView: React.FC<EmailTemplatesViewProps> = ({ onTemplateClick, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Archived'>('All');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<EmailTemplate | null>(null);

  const templates: EmailTemplate[] = [
    { id: 1, subject: 'Collaborations with Shanky\'s Whip!', status: 'active', body: 'Hi <first name>\n\nWe are Shanky\'s Whip - the original black liqueur and whiskey blend...', attachments: ['Shanky\'s Whip Bottle Media Kit (2).pdf'], createdDate: 'Jan 15, 2023', lastModified: 'Mar 02, 2024' },
    { id: 2, subject: 'Collaboration with Firelli - TikTok', status: 'archived', body: 'Hi <first name>\n\nWe are reaching out on behalf of Firelli...', attachments: [], createdDate: 'Feb 20, 2023', lastModified: 'Jun 15, 2023' },
    { id: 3, subject: 'Collaboration with Spytail Rum - Follow Up', status: 'archived', body: 'Hi <first name>\n\nJust following up on our previous email...', attachments: [], createdDate: 'Mar 10, 2023', lastModified: 'Jul 01, 2023' },
    { id: 4, subject: 'Collaboration with Starlino Cherries - Follow Up', status: 'archived', body: 'Hi <first name>\n\nWe hope you\'ve had a chance to try...', attachments: [], createdDate: 'Apr 05, 2023', lastModified: 'Aug 12, 2023' },
    { id: 5, subject: 'Collaboration with Firelli - Follow Up', status: 'archived', body: 'Hi <first name>\n\nFollowing up on our Firelli collaboration...', attachments: [], createdDate: 'Apr 18, 2023', lastModified: 'Sep 20, 2023' },
    { id: 6, subject: 'Collaboration with Stambecco Amaro - Follow Up', status: 'archived', body: 'Hi <first name>\n\nWe wanted to follow up regarding Stambecco...', attachments: [], createdDate: 'May 02, 2023', lastModified: 'Oct 05, 2023' },
    { id: 7, subject: 'Collaboration with Starlino - New Elderflower Flavour', status: 'archived', body: 'Hi <first name>\n\nExciting news! Starlino has launched...', attachments: [], createdDate: 'Jun 14, 2023', lastModified: 'Nov 18, 2023' },
    { id: 8, subject: 'Shankys Whip Contest - Expression of Interest', status: 'archived', body: 'Hi <first name>\n\nWe are running a contest with Shanky\'s Whip...', attachments: [], createdDate: 'Jul 22, 2023', lastModified: 'Dec 01, 2023' },
    { id: 9, subject: 'Collaboration with Jumping Goat - Follow Up', status: 'archived', body: 'Hi <first name>\n\nFollowing up on the Jumping Goat collaboration...', attachments: [], createdDate: 'Aug 10, 2023', lastModified: 'Jan 15, 2024' },
    { id: 10, subject: 'Gladstone Axe Influencer Collaboration', status: 'archived', body: 'Hi <first name>\n\nWe are reaching out about Gladstone Axe...', attachments: [], createdDate: 'Sep 05, 2023', lastModified: 'Feb 20, 2024' },
    { id: 11, subject: 'Collaboration with Starlino - Starlino Classic Cocktails', status: 'archived', body: 'Hi <first name>\n\nStarlino Classic Cocktails is launching...', attachments: [], createdDate: 'Oct 12, 2023', lastModified: 'Mar 10, 2024' },
    { id: 12, subject: 'Collaborations with Shanky\'s Whip - Follow Up', status: 'archived', body: 'Hi <first name>\n\nJust checking in on our Shanky\'s Whip collaboration...', attachments: [], createdDate: 'Nov 20, 2023', lastModified: 'Apr 05, 2024' },
    { id: 13, subject: 'Collaborations with Starlino Vermouth - Follow Up', status: 'archived', body: 'Hi <first name>\n\nFollowing up on the Starlino Vermouth...', attachments: [], createdDate: 'Dec 08, 2023', lastModified: 'May 15, 2024' },
    { id: 14, subject: 'Collaborations with Starlino Cherries - Follow Up', status: 'archived', body: 'Hi <first name>\n\nWe hope you enjoyed the Starlino Cherries...', attachments: [], createdDate: 'Jan 10, 2024', lastModified: 'Jun 01, 2024' },
    { id: 15, subject: 'Spytail Rum - Follow Up Collaboration Opportunity', status: 'archived', body: 'Hi <first name>\n\nWe have an exciting follow up opportunity with Spytail Rum...', attachments: [], createdDate: 'Feb 14, 2024', lastModified: 'Jul 20, 2024' },
    { id: 16, subject: 'Starlino Elderflower Post request for use in PR', status: 'archived', body: 'Hi <first name>\n\nWe loved your recent post featuring Starlino Elderflower...', attachments: [], createdDate: 'Mar 22, 2024', lastModified: 'Aug 10, 2024' },
  ];

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Active' && t.status === 'active') ||
      (filterStatus === 'Archived' && t.status === 'archived');
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'active') return 'text-emerald-600 bg-emerald-50';
    return 'text-amber-600 bg-amber-50';
  };

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">Email Templates</h1>
          <p className="text-[13px] text-brand-gray mt-1">Manage email templates for influencer outreach campaigns</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onAddNew}
            className="bg-brand-accent text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-widest hover:brightness-110 transition-all shadow-md uppercase"
          >
            Add New Template
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{templates.length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Total Templates</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{templates.filter(t => t.status === 'active').length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Active</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-brand-dark">{templates.filter(t => t.status === 'archived').length}</p>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Archived</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-gray-100">
        <div className="relative w-full lg:w-96 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray group-focus-within:text-brand-accent transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F4] border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-1 focus:ring-brand-accent outline-none text-xs font-semibold"
          />
        </div>

        <div className="flex items-center bg-[#F8F6F4] p-1 rounded-xl">
          {(['All', 'Active', 'Archived'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterStatus(type)}
              className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${
                filterStatus === type ? 'bg-white text-brand-accent shadow-sm' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Table */}
      <div className="bg-white rounded-2xl shadow-panel overflow-hidden border border-gray-100">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-brand-gray/5 border-b border-gray-100">
              <tr className="text-[10px] font-black text-brand-gray uppercase tracking-widest">
                <th className="px-6 py-4 w-24">Status</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4 w-36">Last Modified</th>
                <th className="px-6 py-4 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="group hover:bg-brand-gray/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider capitalize ${getStatusBadge(template.status)}`}>
                      {template.status === 'active' ? 'Active' : 'Archived'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onTemplateClick(template)}
                      className="text-[13px] font-bold text-brand-dark hover:text-brand-accent transition-colors text-left"
                    >
                      {template.subject}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-semibold text-brand-gray">{template.lastModified}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onTemplateClick(template)}
                        className="text-brand-gray hover:text-brand-accent transition-colors p-1.5 rounded-lg hover:bg-brand-accent/5"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(template)}
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
              {filteredTemplates.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[13px] font-semibold text-brand-gray">No templates found</p>
                      <button
                        onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
                        className="text-[11px] font-bold text-brand-accent hover:underline"
                      >
                        Clear filters
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
            Showing <span className="font-black text-brand-dark">{filteredTemplates.length}</span> of <span className="font-black text-brand-dark">{templates.length}</span> templates
          </p>
          {(searchTerm || filterStatus !== 'All') && (
            <button
              onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
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
            <h3 className="text-lg font-serif font-black text-brand-dark mb-2">Delete Template</h3>
            <p className="text-[13px] text-brand-gray mb-6">
              Are you sure you want to delete <span className="font-bold text-brand-dark">&ldquo;{showDeleteConfirm.subject}&rdquo;</span>? This action cannot be undone.
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

export default EmailTemplatesView;
