

import React from 'react';
import { AVATARS } from '../../constants';
import type { Avatar } from '../../types';

interface AvatarScreenProps {
  onSelectAvatar: (avatar: Avatar) => void;
  availableAvatars: Avatar[];
}

export const AvatarScreen: React.FC<AvatarScreenProps> = ({ onSelectAvatar, availableAvatars }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Avatar</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {availableAvatars.map(avatar => (
          <button
            key={avatar.id}
            onClick={() => onSelectAvatar(avatar)}
            className="flex flex-col items-center p-4 bg-[#2B3855] rounded-lg transition-transform transform hover:scale-105 hover:bg-[#FFC107] group"
          >
            <img
              src={avatar.image}
              alt={avatar.name}
              className="w-32 h-32 rounded-full border-4 border-gray-500 group-hover:border-white transition-colors"
            />
            <span className="mt-4 text-xl font-semibold text-white group-hover:text-[#1A233A]">{avatar.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};