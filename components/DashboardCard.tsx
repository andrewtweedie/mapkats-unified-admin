
import React from 'react';

interface DashboardCardProps {
  title: string;
  viewAllLink?: string;
  actionButton?: {
    text: string;
    color: 'pink' | 'teal';
    onClick?: () => void;
  };
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, viewAllLink, actionButton, children }) => {
  const buttonColorClass = actionButton?.color === 'pink' 
    ? 'bg-mapkats-pink hover:bg-pink-600' 
    : 'bg-mapkats-teal hover:bg-teal-600';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-mapkats-dark-blue">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-sm font-semibold text-mapkats-pink hover:underline">
              VIEW ALL
            </a>
          )}
        </div>
        <div>{children}</div>
      </div>
      {actionButton && (
        <div className="mt-auto p-6 pt-0">
          <button
            onClick={actionButton.onClick}
            className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 ${buttonColorClass}`}
          >
            {actionButton.text}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
