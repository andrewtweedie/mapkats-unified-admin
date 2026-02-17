
import React from 'react';

const BillingsPanel: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        <h3 className="font-bold">Billings</h3>
      </div>

      <div className="relative w-40 h-40 mx-auto mb-8">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#E5E7EB" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#FF7A50" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#2563EB" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="-30" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold">$1700</span>
        </div>
      </div>

      <div className="space-y-3">
        <StatRow label="Budget" value="$550.00" color="bg-blue-600" />
        <StatRow label="Funded (Escrow)" value="$550.00" color="bg-purple-400" />
        <StatRow label="Paid Out" value="$550.00" color="bg-emerald-400" />
        <StatRow label="Remaining" value="$1,700.00" color="bg-brand-accent" />
      </div>
    </section>
  );
};

const StatRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex items-center justify-between text-xs">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-brand-gray font-medium">{label}</span>
    </div>
    <span className="font-bold">{value}</span>
  </div>
);

export default BillingsPanel;