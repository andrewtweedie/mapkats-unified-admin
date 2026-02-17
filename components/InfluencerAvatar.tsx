
import React from 'react';
import { type Influencer } from '../types';

const InfluencerAvatar: React.FC<Influencer> = ({ name, imageUrl }) => {
  return (
    <div className="flex flex-col items-center text-center w-28">
      <img
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-gray-200 hover:border-mapkats-pink transition-all"
      />
      <a href="#" className="text-sm text-gray-700 font-medium hover:underline">{name}</a>
    </div>
  );
};

export default InfluencerAvatar;
