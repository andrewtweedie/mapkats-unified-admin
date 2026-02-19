
import React from 'react';

interface ListSectionProps {
  title: string;
  items: string[];
  buttonText: string;
  buttonColor: 'pink' | 'teal';
  onViewAll?: () => void;
  onItemClick?: (item: string) => void;
  onAddNew?: () => void;
}

const ListSection: React.FC<ListSectionProps> = ({ title, items, buttonText, onViewAll, onItemClick, onAddNew }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 flex flex-col h-full border border-gray-50">
      <div className="flex justify-between items-center mb-5 border-b border-gray-50 pb-3">
        <h2 className="font-bold text-[11px] uppercase tracking-widest text-brand-gray">{title}</h2>
        <button
          onClick={onViewAll}
          className="text-[10px] font-bold text-brand-accent hover:underline"
        >
          VIEW ALL
        </button>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {items.map((item, idx) => (
          <li key={idx} className="group">
            <button
              onClick={() => onItemClick?.(item)}
              className="text-sm font-semibold text-brand-dark group-hover:text-brand-accent transition-colors block truncate text-left w-full"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onAddNew}
        className="w-full bg-brand-accent text-white font-extrabold py-3 rounded-lg text-[10px] tracking-widest hover:brightness-110 transition-all shadow-md"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ListSection;
