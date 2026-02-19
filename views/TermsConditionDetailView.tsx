
import React, { useState } from 'react';
import { TermsCondition } from './TermsConditionsView';

interface TermsConditionDetailViewProps {
  termsCondition: TermsCondition | null; // null = creating new
  onBack: () => void;
}

const TermsConditionDetailView: React.FC<TermsConditionDetailViewProps> = ({ termsCondition, onBack }) => {
  const isNew = !termsCondition;
  const [name, setName] = useState(termsCondition?.name || '');
  const [body, setBody] = useState(termsCondition?.body || '');
  const [attachments, setAttachments] = useState<string[]>(termsCondition?.attachments || []);

  // Toolbar state
  const [activeFormat, setActiveFormat] = useState<string[]>([]);

  const toggleFormat = (format: string) => {
    setActiveFormat(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const mergeTags = [
    { label: 'Email Template', tag: '{{email_template}}' },
    { label: 'Influencers', tag: '{{influencers}}' },
    { label: 'Campaigns', tag: '{{campaigns}}' },
    { label: 'Creators', tag: '{{creators}}' },
    { label: 'Galleries', tag: '{{galleries}}' },
    { label: 'Locations', tag: '{{locations}}' },
    { label: 'New Locations', tag: '{{new_locations}}' },
    { label: 'Users', tag: '{{users}}' },
    { label: 'Error Log', tag: '{{error_log}}' },
    { label: 'Manage Instagram Session ID', tag: '{{instagram_session_id}}' },
    { label: 'Campaigns', tag: '{{campaigns_ref}}' },
  ];

  const toolbarGroups = [
    {
      items: [
        { id: 'paragraph', label: 'Paragraph', type: 'dropdown' as const },
        { id: 'styles', label: 'Styles', type: 'dropdown' as const },
      ]
    },
    {
      items: [
        { id: 'fontFamily', label: 'AI', icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        ), type: 'button' as const },
        { id: 'fontSize', label: 'A', icon: (
          <span className="text-sm font-bold">A<span className="text-[8px] align-super">F</span></span>
        ), type: 'dropdown' as const },
      ]
    },
    {
      items: [
        { id: 'fontColor', label: 'A', icon: (<span className="text-sm font-bold border-b-2 border-brand-dark">A</span>), type: 'dropdown' as const },
        { id: 'bgColor', label: 'A', icon: (<span className="text-sm font-bold bg-yellow-200 px-0.5">A</span>), type: 'dropdown' as const },
      ]
    },
    {
      items: [
        { id: 'bold', label: 'B', icon: (<span className="font-black text-sm">B</span>), type: 'toggle' as const },
        { id: 'italic', label: 'I', icon: (<span className="italic font-semibold text-sm">I</span>), type: 'toggle' as const },
        { id: 'underline', label: 'U', icon: (<span className="underline font-semibold text-sm">U</span>), type: 'toggle' as const },
        { id: 'strikethrough', label: 'S', icon: (<span className="line-through font-semibold text-sm">S</span>), type: 'toggle' as const },
        { id: 'code', label: '<>', icon: (<span className="font-mono text-xs">&lt;&gt;</span>), type: 'toggle' as const },
        { id: 'subscript', label: 'x₂', icon: (<span className="text-xs">X<sub className="text-[8px]">2</sub></span>), type: 'button' as const },
        { id: 'superscript', label: 'x²', icon: (<span className="text-xs">X<sup className="text-[8px]">2</sup></span>), type: 'button' as const },
        { id: 'clearFormat', label: 'T', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        ), type: 'button' as const },
        { id: 'highlight', label: '🖊', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        ), type: 'button' as const },
      ]
    },
    {
      items: [
        { id: 'alignLeft', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h14" /></svg>
        ), type: 'dropdown' as const },
        { id: 'orderedList', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        ), type: 'dropdown' as const },
        { id: 'unorderedList', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
        ), type: 'dropdown' as const },
      ]
    },
    {
      items: [
        { id: 'indent', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        ), type: 'button' as const },
        { id: 'outdent', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
        ), type: 'button' as const },
      ]
    },
    {
      items: [
        { id: 'blockquote', icon: (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" /></svg>
        ), type: 'button' as const },
        { id: 'link', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        ), type: 'button' as const },
        { id: 'image', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        ), type: 'button' as const },
        { id: 'table', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18M10 3v18M14 3v18M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z" /></svg>
        ), type: 'button' as const },
        { id: 'hr', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" /></svg>
        ), type: 'button' as const },
      ]
    },
    {
      items: [
        { id: 'embed', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ), type: 'button' as const },
        { id: 'specialChar', icon: (
          <span className="text-xs font-bold">&#937;</span>
        ), type: 'button' as const },
        { id: 'more', icon: (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
        ), type: 'button' as const },
      ]
    },
  ];

  const handleInsertTag = (tag: string) => {
    setBody(prev => prev + tag);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumb / Back */}
      <button onClick={onBack} className="text-xs font-bold text-brand-gray hover:text-brand-accent flex items-center gap-1 uppercase tracking-widest">
        <span>←</span> Back to Terms & Conditions
      </button>

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-serif font-black tracking-tight text-brand-dark">
          {isNew ? 'New Term & Condition' : 'Edit Term & Condition'}
        </h1>
      </div>

      {/* Editor Card */}
      <div className="bg-white rounded-2xl shadow-panel border border-gray-100 overflow-hidden">
        {/* Name Field */}
        <div className="px-8 pt-8 pb-4">
          <label className="text-[11px] font-black text-brand-dark uppercase tracking-wider mb-2 block">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-semibold text-brand-dark focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
            placeholder="Enter document name..."
          />
        </div>

        {/* Rich Text Toolbar */}
        <div className="px-8 py-2">
          <div className="flex items-center gap-0.5 flex-wrap border border-gray-200 rounded-xl p-1.5 bg-gray-50/50">
            {toolbarGroups.map((group, gIdx) => (
              <React.Fragment key={gIdx}>
                {gIdx > 0 && <div className="w-px h-6 bg-gray-200 mx-1" />}
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.type === 'toggle' ? toggleFormat(item.id) : undefined}
                    className={`p-1.5 rounded-lg transition-all hover:bg-white hover:shadow-sm flex items-center gap-0.5 ${
                      activeFormat.includes(item.id) ? 'bg-white shadow-sm text-brand-accent' : 'text-brand-gray hover:text-brand-dark'
                    }`}
                    title={item.id}
                  >
                    {item.icon || <span className="text-xs font-semibold">{item.label}</span>}
                    {item.type === 'dropdown' && (
                      <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Body Editor with Merge Tags Sidebar */}
        <div className="px-8 pb-4 flex gap-4">
          {/* Main Editor */}
          <div className="flex-1">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full min-h-[500px] border border-gray-200 rounded-xl px-5 py-4 text-[14px] font-normal text-brand-dark leading-relaxed focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all resize-y"
              placeholder="Type or paste your content here!"
            />
          </div>

          {/* Merge Tags Sidebar */}
          <div className="w-56 flex-shrink-0">
            <div className="border border-gray-200 rounded-xl overflow-hidden sticky top-4">
              <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-100">
                <p className="text-[10px] font-black text-brand-gray uppercase tracking-wider">Merge Tags</p>
              </div>
              <div className="divide-y divide-gray-50">
                {mergeTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleInsertTag(tag.tag)}
                    className="w-full text-left px-4 py-2.5 text-[12px] font-semibold text-brand-dark hover:bg-brand-accent/5 hover:text-brand-accent transition-colors"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Attachments Section */}
        <div className="px-8 pb-6 space-y-3">
          <button className="flex items-center gap-2 text-[12px] font-bold text-brand-accent border border-brand-accent/30 px-5 py-2.5 rounded-xl hover:bg-brand-accent/5 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Attach Attachment
          </button>

          {/* Existing Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((attachment, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <button
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                    className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div>
                    <p className="text-[13px] font-semibold text-brand-dark">{attachment}</p>
                    <p className="text-[10px] font-bold text-emerald-500">Already uploaded</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 px-8 py-5 flex justify-end gap-3 bg-gray-50/30">
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
    </div>
  );
};

export default TermsConditionDetailView;
