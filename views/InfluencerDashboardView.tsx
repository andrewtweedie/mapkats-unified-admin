
import React, { useState } from 'react';

// ─── Donut Chart ────────────────────────────────────────────────────────────
interface PieSlice { label: string; value: number; color: string }

const DonutChart: React.FC<{ data: PieSlice[]; size?: number; centerLabel?: string; centerValue?: string }> = ({ data, size = 200, centerLabel, centerValue }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;
  const r = size / 2;
  const outerR = r * 0.88;
  const innerR = r * 0.62;
  let cum = 0;

  const arcPath = (startAngle: number, endAngle: number) => {
    const s = (startAngle - 90) * Math.PI / 180;
    const e = (endAngle - 90) * Math.PI / 180;
    const large = endAngle - startAngle > 180 ? 1 : 0;
    const ox1 = r + outerR * Math.cos(s), oy1 = r + outerR * Math.sin(s);
    const ox2 = r + outerR * Math.cos(e), oy2 = r + outerR * Math.sin(e);
    const ix1 = r + innerR * Math.cos(e), iy1 = r + innerR * Math.sin(e);
    const ix2 = r + innerR * Math.cos(s), iy2 = r + innerR * Math.sin(s);
    return `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 ${large} 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2} Z`;
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {data.map((slice, i) => {
          const angle = Math.max((slice.value / total) * 360, 0.5);
          const gap = data.length > 1 ? 1.5 : 0;
          const startAngle = cum + gap / 2;
          cum += angle;
          return <path key={i} d={arcPath(startAngle, startAngle + angle - gap)} fill={slice.color} className="transition-opacity hover:opacity-80" />;
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-lg font-bold text-gray-900">{centerValue}</span>}
          {centerLabel && <span className="text-[10px] font-medium text-gray-500">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
};

// ─── Chart Legend ────────────────────────────────────────────────────────────
const ChartLegend: React.FC<{ data: PieSlice[]; total?: number; formatValue?: (v: number) => string }> = ({ data, total, formatValue }) => {
  const t = total ?? data.reduce((s, d) => s + d.value, 0);
  const fmt = formatValue || ((v: number) => v.toLocaleString());
  return (
    <div className="space-y-2 mt-4 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[12px] text-gray-700 truncate">{d.label}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[12px] font-semibold text-gray-900">{fmt(d.value)}</span>
            {t > 0 && <span className="text-[11px] text-gray-400 w-10 text-right">{((d.value / t) * 100).toFixed(0)}%</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Chart Card with Toggle ─────────────────────────────────────────────────
const ChartCard: React.FC<{
  title: string;
  data: PieSlice[];
  showTable: boolean;
  onToggle: () => void;
  tableColumns: [string, string];
  centerLabel?: string;
  centerValue?: string;
  formatValue?: (v: number) => string;
}> = ({ title, data, showTable, onToggle, tableColumns, centerLabel, centerValue, formatValue }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const fmt = formatValue || ((v: number) => v.toLocaleString());
  return (
    <div className="flex-1 min-w-[260px] bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-[13px] font-semibold text-gray-900">{title}</h4>
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-0.5">
          <button onClick={onToggle} className={`p-1.5 rounded-md transition-all ${!showTable ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l6.36 3.64" /></svg>
          </button>
          <button onClick={onToggle} className={`p-1.5 rounded-md transition-all ${showTable ? 'bg-white shadow-sm text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" d="M3 6h18M3 10h18M3 14h18M3 18h18" /></svg>
          </button>
        </div>
      </div>
      {!showTable ? (
        <div className="flex flex-col items-center">
          <DonutChart data={data} size={180} centerValue={centerValue || total.toLocaleString()} centerLabel={centerLabel || 'Total'} />
          <ChartLegend data={data} total={total} formatValue={formatValue} />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-[11px] font-medium text-gray-500">{tableColumns[0]}</th>
                <th className="px-4 py-2.5 text-[11px] font-medium text-gray-500 text-right">{tableColumns[1]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 text-[12px] text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    {d.label}
                  </td>
                  <td className="px-4 py-2.5 text-[12px] font-medium text-gray-900 text-right">{fmt(d.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Stat Card ──────────────────────────────────────────────────────────────
const StatCard: React.FC<{ value: string; label: string; subLabel?: string }> = ({ value, label, subLabel }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <p className="text-[12px] font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
    {subLabel && <p className="text-[11px] text-gray-400 mt-0.5">{subLabel}</p>}
  </div>
);

// ─── Filter Dropdown ────────────────────────────────────────────────────────
const FilterDropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (v: string) => void }> = ({ label, options, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-[12px] font-medium text-gray-700 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none cursor-pointer min-w-[140px]"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ─── Section Header ─────────────────────────────────────────────────────────
const SectionHeader: React.FC<{
  bigValue: string;
  bigLabel: string;
  description: string;
  platformFilter: string;
  countryFilter: string;
  categoryFilter: string;
  onPlatformChange: (v: string) => void;
  onCountryChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}> = ({ bigValue, bigLabel, description, platformFilter, countryFilter, categoryFilter, onPlatformChange, onCountryChange, onCategoryChange }) => (
  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
    <div>
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{bigValue}</h2>
        <span className="text-lg font-semibold text-gray-900">{bigLabel}</span>
      </div>
      <p className="text-[13px] text-gray-500 mt-1">{description}</p>
    </div>
    <div className="flex items-end gap-3 flex-wrap">
      <FilterDropdown
        label="Platform"
        options={['All Platform', 'Instagram', 'TikTok', 'YouTube']}
        value={platformFilter}
        onChange={onPlatformChange}
      />
      <FilterDropdown
        label="Country"
        options={['All Country', 'United States', 'United Kingdom', 'Australia', 'France']}
        value={countryFilter}
        onChange={onCountryChange}
      />
      <FilterDropdown
        label="Category"
        options={['None', 'Lifestyle', 'Fitness', 'Food', 'Travel']}
        value={categoryFilter}
        onChange={onCategoryChange}
      />
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// INFLUENCER DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════════════

const InfluencerDashboardView: React.FC = () => {
  // ── Filter state ──
  const [s1Platform, setS1Platform] = useState('All Platform');
  const [s1Country, setS1Country] = useState('All Country');
  const [s1Category, setS1Category] = useState('None');

  const [s2Platform, setS2Platform] = useState('All Platform');
  const [s2Country, setS2Country] = useState('All Country');
  const [s2Category, setS2Category] = useState('None');

  const [s3Platform, setS3Platform] = useState('All Platform');
  const [s3Country, setS3Country] = useState('All Country');
  const [s3Category, setS3Category] = useState('None');

  // ── Chart toggle state ──
  const [showS1PlatformTable, setShowS1PlatformTable] = useState(false);
  const [showS1CountryTable, setShowS1CountryTable] = useState(false);
  const [showS1CategoryTable, setShowS1CategoryTable] = useState(false);

  const [showS2PlatformTable, setShowS2PlatformTable] = useState(false);
  const [showS2CountryTable, setShowS2CountryTable] = useState(false);
  const [showS2CategoryTable, setShowS2CategoryTable] = useState(false);

  const [showS3PlatformTable, setShowS3PlatformTable] = useState(false);
  const [showS3CountryTable, setShowS3CountryTable] = useState(false);
  const [showS3CategoryTable, setShowS3CategoryTable] = useState(false);

  // ── Color palette ──
  const colors = {
    purple: '#7C3AED',
    amber: '#F59E0B',
    emerald: '#10B981',
    blue: '#3B82F6',
    red: '#EF4444',
    pink: '#EC4899',
    violet: '#8B5CF6',
    cyan: '#06B6D4',
    lightGray: '#D1D5DB',
    teal: '#14B8A6',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: Total Influencers
  // ═══════════════════════════════════════════════════════════════════════════

  const s1PlatformData: PieSlice[] = [
    { label: 'Instagram', value: 1541, color: colors.pink },
    { label: 'TikTok', value: 289, color: colors.purple },
    { label: 'YouTube', value: 80, color: colors.red },
  ];

  const s1CountryData: PieSlice[] = [
    { label: 'No Country', value: 1838, color: colors.lightGray },
    { label: 'United States', value: 28, color: colors.blue },
    { label: 'France', value: 7, color: colors.emerald },
    { label: 'United Kingdom', value: 5, color: colors.amber },
    { label: 'Australia', value: 32, color: colors.purple },
  ];

  const s1CategoryData: PieSlice[] = [
    { label: 'No Category', value: 1938, color: colors.lightGray },
    { label: 'Lifestyle', value: 42, color: colors.purple },
    { label: 'Fitness', value: 18, color: colors.emerald },
    { label: 'Food & Drink', value: 12, color: colors.amber },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: Influencer Audience
  // ═══════════════════════════════════════════════════════════════════════════

  const s2PlatformData: PieSlice[] = [
    { label: 'Instagram', value: 91176705, color: colors.pink },
    { label: 'TikTok', value: 51151856, color: colors.purple },
    { label: 'YouTube', value: 8152236, color: colors.red },
  ];

  const s2CountryData: PieSlice[] = [
    { label: 'United States', value: 57017869, color: colors.blue },
    { label: 'United Kingdom', value: 6922183, color: colors.amber },
    { label: 'No Country', value: 69305522, color: colors.lightGray },
    { label: 'Australia', value: 12834211, color: colors.purple },
    { label: 'France', value: 4200812, color: colors.emerald },
  ];

  const s2CategoryData: PieSlice[] = [
    { label: 'No Category', value: 146934091, color: colors.lightGray },
    { label: 'Lifestyle', value: 2135020, color: colors.purple },
    { label: 'Fitness', value: 912486, color: colors.emerald },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: Audience Media Value
  // ═══════════════════════════════════════════════════════════════════════════

  const s3PlatformData: PieSlice[] = [
    { label: 'Instagram', value: 1590748.87, color: colors.pink },
    { label: 'TikTok', value: 892599.91, color: colors.purple },
    { label: 'YouTube', value: 142256.58, color: colors.red },
  ];

  const s3CountryData: PieSlice[] = [
    { label: 'United States', value: 994961.64, color: colors.blue },
    { label: 'Australia', value: 176596.3, color: colors.purple },
    { label: 'No Country', value: 1279047.42, color: colors.lightGray },
    { label: 'United Kingdom', value: 125000, color: colors.amber },
    { label: 'France', value: 50000, color: colors.emerald },
  ];

  const s3CategoryData: PieSlice[] = [
    { label: 'No Category', value: 2434360.91, color: colors.lightGray },
    { label: 'Lifestyle', value: 135244.45, color: colors.purple },
    { label: 'Fitness', value: 56000, color: colors.emerald },
  ];

  // ── Formatting helpers ──
  const fmtLargeNumber = (n: number): string => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toLocaleString();
  };

  const fmtCurrency = (n: number): string => {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return '$' + (n / 1_000).toFixed(1) + 'K';
    return '$' + n.toFixed(2);
  };

  const fmtCurrencyFull = (n: number): string => {
    return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Influencer Dashboard</h1>
        <p className="text-[13px] text-gray-500 mt-1">Cumulative audience reach and media value of influencers on the platform.</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: Total Influencers                                          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-100 p-6 lg:p-8">
          <SectionHeader
            bigValue="1.9K"
            bigLabel="Total Influencers"
            description="Total number of influencers registered on the platform across all channels."
            platformFilter={s1Platform}
            countryFilter={s1Country}
            categoryFilter={s1Category}
            onPlatformChange={setS1Platform}
            onCountryChange={setS1Country}
            onCategoryChange={setS1Category}
          />
        </div>

        {/* Campaign Performance Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="21" label="Collaborations" />
          <StatCard value="57" label="Emails on File" />
          <StatCard value="1,910" label="Total Profiles" />
          <StatCard value="3" label="Platforms" />
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <ChartCard
            title="Influencer Platform"
            data={s1PlatformData}
            showTable={showS1PlatformTable}
            onToggle={() => setShowS1PlatformTable(!showS1PlatformTable)}
            tableColumns={['Platform', 'Influencers']}
            centerLabel="Platforms"
          />
          <ChartCard
            title="Influencer Country"
            data={s1CountryData}
            showTable={showS1CountryTable}
            onToggle={() => setShowS1CountryTable(!showS1CountryTable)}
            tableColumns={['Country', 'Influencers']}
            centerLabel="Countries"
          />
          <ChartCard
            title="Influencer Category"
            data={s1CategoryData}
            showTable={showS1CategoryTable}
            onToggle={() => setShowS1CategoryTable(!showS1CategoryTable)}
            tableColumns={['Category', 'Influencers']}
            centerLabel="Categories"
          />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: Influencer Audience                                        */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6 lg:p-8">
          <SectionHeader
            bigValue="150.5M"
            bigLabel="Influencer Audience"
            description="Combined audience reach of all registered influencers across platforms."
            platformFilter={s2Platform}
            countryFilter={s2Country}
            categoryFilter={s2Category}
            onPlatformChange={setS2Platform}
            onCountryChange={setS2Country}
            onCategoryChange={setS2Category}
          />
        </div>

        {/* Campaign Performance Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard value="6.2M" label="Total Impressions" />
          <StatCard value="6.2M" label="Post Impressions" />
          <StatCard value="13.7K" label="Stories Impressions" />
          <StatCard value="11.4K" label="Likes" />
          <StatCard value="788" label="Comments" />
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <ChartCard
            title="Influencer Platform"
            data={s2PlatformData}
            showTable={showS2PlatformTable}
            onToggle={() => setShowS2PlatformTable(!showS2PlatformTable)}
            tableColumns={['Platform', 'Audience']}
            centerLabel="Total Reach"
            centerValue={fmtLargeNumber(s2PlatformData.reduce((s, d) => s + d.value, 0))}
            formatValue={fmtLargeNumber}
          />
          <ChartCard
            title="Influencer Country"
            data={s2CountryData}
            showTable={showS2CountryTable}
            onToggle={() => setShowS2CountryTable(!showS2CountryTable)}
            tableColumns={['Country', 'Audience']}
            centerLabel="Total Reach"
            centerValue={fmtLargeNumber(s2CountryData.reduce((s, d) => s + d.value, 0))}
            formatValue={fmtLargeNumber}
          />
          <ChartCard
            title="Influencer Category"
            data={s2CategoryData}
            showTable={showS2CategoryTable}
            onToggle={() => setShowS2CategoryTable(!showS2CategoryTable)}
            tableColumns={['Category', 'Audience']}
            centerLabel="Total Reach"
            centerValue={fmtLargeNumber(s2CategoryData.reduce((s, d) => s + d.value, 0))}
            formatValue={fmtLargeNumber}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: Audience Media Value                                       */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6 lg:p-8">
          <SectionHeader
            bigValue="$2.6M"
            bigLabel="Audience Media Value"
            description="Estimated cumulative media value based on influencer audience and engagement metrics."
            platformFilter={s3Platform}
            countryFilter={s3Country}
            categoryFilter={s3Category}
            onPlatformChange={setS3Platform}
            onCountryChange={setS3Country}
            onCategoryChange={setS3Category}
          />
        </div>

        {/* Campaign Performance Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="$6K" label="Posts" subLabel="135 Posts" />
          <StatCard value="$154" label="Stories" subLabel="5 Stories" />
          <StatCard value="11.4K" label="Engagement" />
          <StatCard value="$290.7K" label="Photography" subLabel="135 Posts" />
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <ChartCard
            title="Influencer Platform"
            data={s3PlatformData}
            showTable={showS3PlatformTable}
            onToggle={() => setShowS3PlatformTable(!showS3PlatformTable)}
            tableColumns={['Platform', 'Media Value']}
            centerLabel="Total Value"
            centerValue={fmtCurrency(s3PlatformData.reduce((s, d) => s + d.value, 0))}
            formatValue={fmtCurrencyFull}
          />
          <ChartCard
            title="Influencer Country"
            data={s3CountryData}
            showTable={showS3CountryTable}
            onToggle={() => setShowS3CountryTable(!showS3CountryTable)}
            tableColumns={['Country', 'Media Value']}
            centerLabel="Total Value"
            centerValue={fmtCurrency(s3CountryData.reduce((s, d) => s + d.value, 0))}
            formatValue={fmtCurrencyFull}
          />
          <ChartCard
            title="Influencer Category"
            data={s3CategoryData}
            showTable={showS3CategoryTable}
            onToggle={() => setShowS3CategoryTable(!showS3CategoryTable)}
            tableColumns={['Category', 'Media Value']}
            centerLabel="Total Value"
            centerValue={fmtCurrency(s3CategoryData.reduce((s, d) => s + d.value, 0))}
            formatValue={fmtCurrencyFull}
          />
        </div>
      </section>
    </div>
  );
};

export default InfluencerDashboardView;
