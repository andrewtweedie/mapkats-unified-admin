
import React, { useState } from 'react';
import { SettingsIcon, SearchIcon } from '../components/icons/UiIcons';

interface PluginVersion {
  version: string;
  createdDate: string;
  changeLog: string;
}

const PlatformSettingsView: React.FC = () => {
  const [instagramCookie, setInstagramCookie] = useState(
    'datr=-qSFaUt9hkRKxrMhZYjduZfo; ig_did=A4743313-7A94-4826-B9D9-D9607D7FE0A1; ig_nrcb=1; mid=aYWk-wAEAAG5ym-b7xYB7HFSa33q; csrftoken=ziLPKPm7siaNJxO4NrMrd2klM1HVJFlY; ds_user_id=538144642; ps_l=1; ps_n=1; sessionid=538144642%3AQdyHWUQJgaa8f2%3A11%3AAYiAiCxTavJ9hE_FR8g_ktqpX1aX3a-wK1Q5eK7n_A; wd=160x812; rur="EAG\\054538144642\\0541801955826:01fe9e13e87..."'
  );
  const [tiktokCookie, setTiktokCookie] = useState(
    '_ttp=2txyKcLD9MYxv396UHLGUYELUty; tiktok_webapp_theme=light; delay_guest_mode_vid=5; odin_tt=d8bf2e5fba860a559393f59b93588819ecd2989dc4a6d41d7aedf94c54aa3461ada4cc8d176bc45ab059f8f7441e025b54a5a06b40a9ded849a9afed59a6d89461f868bf04f9fe2fa92496090bf76125; tt_csrf_token=YWlRlNp7-rUAcx8LcEoxVOqYg5lb1kmlwyj0...'
  );
  const [instagramSaved, setInstagramSaved] = useState(false);
  const [tiktokSaved, setTiktokSaved] = useState(false);
  const [tokenConverting, setTokenConverting] = useState(false);
  const [rankingsCalculating, setRankingsCalculating] = useState(false);
  const [versionSearch, setVersionSearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showChangeLogModal, setShowChangeLogModal] = useState<PluginVersion | null>(null);

  const pluginVersions: PluginVersion[] = [
    { version: '2026.02.09', createdDate: 'Feb 09, 2026', changeLog: 'Bug fixes and performance improvements for the Chrome extension. Updated Instagram scraping module to handle new profile layout changes.' },
    { version: '2026.01.15', createdDate: 'Jan 15, 2026', changeLog: 'Added TikTok profile data extraction support. Improved error handling for rate-limited requests.' },
    { version: '2025.12.20', createdDate: 'Dec 20, 2025', changeLog: 'Holiday release: Updated cookie management, fixed session timeout issues, added support for multi-account switching.' },
    { version: '2025.11.08', createdDate: 'Nov 08, 2025', changeLog: 'Major update: Redesigned popup UI, added bulk profile scanning, improved data accuracy for engagement metrics.' },
    { version: '2025.10.01', createdDate: 'Oct 01, 2025', changeLog: 'Security patch: Updated authentication flow, fixed XSS vulnerability in popup, improved token refresh logic.' },
  ];

  const filteredVersions = pluginVersions.filter((v) => {
    const matchesVersion = !versionSearch || v.version.toLowerCase().includes(versionSearch.toLowerCase());
    const matchesDate = !dateSearch || v.createdDate.toLowerCase().includes(dateSearch.toLowerCase());
    return matchesVersion && matchesDate;
  });

  const handleSaveInstagram = () => {
    setInstagramSaved(true);
    setTimeout(() => setInstagramSaved(false), 2000);
  };

  const handleSaveTiktok = () => {
    setTiktokSaved(true);
    setTimeout(() => setTiktokSaved(false), 2000);
  };

  const handleConvertTokens = () => {
    setTokenConverting(true);
    setTimeout(() => setTokenConverting(false), 3000);
  };

  const handleCalculateRankings = () => {
    setRankingsCalculating(true);
    setTimeout(() => setRankingsCalculating(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-brand-dark font-serif">Platform Settings</h1>
        <p className="text-[13px] text-brand-gray font-semibold mt-1">Manage platform configuration, access tokens, and tools</p>
      </div>

      {/* Platform Access Tokens */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-brand-dark">Platform Access Tokens</h2>
              </div>
              <p className="text-[13px] text-brand-gray font-semibold ml-11">Manage platform-wide access tokens for Instagram API</p>
            </div>
            <button
              onClick={handleConvertTokens}
              disabled={tokenConverting}
              className={`text-[11px] font-bold px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md ${
                tokenConverting
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-brand-accent text-white hover:brightness-110'
              }`}
            >
              {tokenConverting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Converting...
                </span>
              ) : (
                'Convert Short-Lived Tokens to Long-Lived'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Influencer Rankings & Badges */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-brand-dark">Influencer Rankings & Badges</h2>
              </div>
              <p className="text-[13px] text-brand-gray font-semibold ml-11">Manually trigger recalculation of influencer rankings and badges. This runs automatically every day at 1:00 AM.</p>
            </div>
            <button
              onClick={handleCalculateRankings}
              disabled={rankingsCalculating}
              className={`text-[11px] font-bold px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md whitespace-nowrap ${
                rankingsCalculating
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-brand-accent text-white hover:brightness-110'
              }`}
            >
              {rankingsCalculating ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Calculating...
                </span>
              ) : (
                'Calculate Rankings & Badges'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Instagram Cookie */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-brand-dark">Instagram Cookie</h2>
          </div>
          <textarea
            value={instagramCookie}
            onChange={(e) => setInstagramCookie(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[12px] font-mono text-brand-gray focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all resize-none bg-gray-50/50"
            placeholder="Paste your Instagram cookie string here..."
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveInstagram}
              className={`text-[11px] font-bold px-8 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md ${
                instagramSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-accent text-white hover:brightness-110'
              }`}
            >
              {instagramSaved ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </span>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tiktok Cookie */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
              <svg className="w-4 h-4 text-brand-dark" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43A6.3 6.3 0 0015.82 15V8.52a8.27 8.27 0 004.77 1.51V6.69h-1z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-brand-dark">TikTok Cookie</h2>
          </div>
          <textarea
            value={tiktokCookie}
            onChange={(e) => setTiktokCookie(e.target.value)}
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-5 py-4 text-[12px] font-mono text-brand-gray focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all resize-none bg-gray-50/50"
            placeholder="Paste your TikTok cookie string here..."
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveTiktok}
              className={`text-[11px] font-bold px-8 py-3 rounded-xl uppercase tracking-wider transition-all shadow-md ${
                tiktokSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-brand-accent text-white hover:brightness-110'
              }`}
            >
              {tiktokSaved ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </span>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Chrome Plugin Version History */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-brand-dark">Chrome Plugin Version History</h2>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="text-[11px] font-bold px-6 py-3 rounded-xl bg-brand-accent text-white hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
            >
              Upload Version
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-brand-gray/5 border-b border-gray-100">
          <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-brand-gray uppercase tracking-widest">
            <div className="col-span-5">Version</div>
            <div className="col-span-5">Created Date</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-12 px-8 py-3 border-b border-gray-100 bg-gray-50/30">
          <div className="col-span-5 pr-4">
            <div className="relative">
              <SearchIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray/40" />
              <input
                type="text"
                placeholder="Search version..."
                value={versionSearch}
                onChange={(e) => setVersionSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-[12px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>
          <div className="col-span-5 pr-4">
            <div className="relative">
              <SearchIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray/40" />
              <input
                type="text"
                placeholder="Search date..."
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-[12px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              />
            </div>
          </div>
          <div className="col-span-2" />
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {filteredVersions.length === 0 ? (
            <div className="px-8 py-12 text-center">
              <p className="text-[13px] font-semibold text-brand-gray">No versions found matching your search.</p>
            </div>
          ) : (
            filteredVersions.map((version) => (
              <div
                key={version.version}
                className="grid grid-cols-12 px-8 py-4 hover:bg-gray-50/50 transition-colors items-center"
              >
                <div className="col-span-5">
                  <span className="text-[13px] font-bold text-brand-accent">{version.version}</span>
                </div>
                <div className="col-span-5">
                  <span className="text-[13px] font-semibold text-brand-gray">{version.createdDate}</span>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    onClick={() => setShowChangeLogModal(version)}
                    className="text-[12px] font-bold text-brand-accent hover:text-brand-accent/80 transition-colors"
                  >
                    View Change Log
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table Footer */}
        <div className="px-8 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-brand-gray">
            Showing <span className="font-black text-brand-dark">{filteredVersions.length}</span> of <span className="font-black text-brand-dark">{pluginVersions.length}</span> versions
          </p>
          {(versionSearch || dateSearch) && (
            <button
              onClick={() => { setVersionSearch(''); setDateSearch(''); }}
              className="text-[11px] font-bold text-brand-accent hover:text-brand-accent/80 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Upload Version Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="bg-brand-accent px-8 py-5 rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">Upload New Version</h3>
              <p className="text-white/70 text-[12px] font-semibold mt-0.5">Upload a new Chrome plugin version</p>
            </div>

            {/* Body */}
            <div className="px-8 py-6 space-y-5">
              <div>
                <label className="block text-[11px] font-black text-brand-gray uppercase tracking-wider mb-2">Version Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 2026.03.01"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-brand-gray uppercase tracking-wider mb-2">Change Log</label>
                <textarea
                  rows={4}
                  placeholder="Describe what's changed in this version..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-brand-gray uppercase tracking-wider mb-2">Plugin File</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-brand-accent/50 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-brand-gray/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-[12px] font-bold text-brand-gray">Drop your file here or <span className="text-brand-accent">browse</span></p>
                  <p className="text-[10px] text-brand-gray/60 mt-1">.zip or .crx files accepted</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[11px] font-bold px-6 py-2.5 rounded-xl border border-gray-200 text-brand-gray hover:bg-gray-50 transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[11px] font-bold px-6 py-2.5 rounded-xl bg-brand-accent text-white hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Log Modal */}
      {showChangeLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowChangeLogModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="bg-brand-accent px-8 py-5 rounded-t-2xl">
              <h3 className="text-lg font-bold text-white">Change Log</h3>
              <p className="text-white/70 text-[12px] font-semibold mt-0.5">Version {showChangeLogModal.version}</p>
            </div>

            {/* Body */}
            <div className="px-8 py-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black text-brand-gray uppercase tracking-wider">Released</span>
                <span className="text-[12px] font-bold text-brand-dark">{showChangeLogModal.createdDate}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-[13px] font-semibold text-brand-dark leading-relaxed">{showChangeLogModal.changeLog}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowChangeLogModal(null)}
                className="text-[11px] font-bold px-8 py-2.5 rounded-xl bg-brand-accent text-white hover:brightness-110 transition-all shadow-md uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSettingsView;
