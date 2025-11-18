
import React from 'react';
import type { VirtualWorldLocation } from '../../types';
import { VIRTUAL_WORLD_LOCATIONS } from '../../constants';

interface VirtualWorldScreenProps {
  onStartChallenge: (context: string) => void;
}

const LocationCard: React.FC<{ location: VirtualWorldLocation; onClick: () => void }> = ({ location, onClick }) => (
    <button onClick={onClick} className="relative w-full h-64 rounded-xl overflow-hidden group shadow-lg">
        <img src={location.image} alt={location.name} className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white">{location.name}</h3>
            <p className="text-gray-300">{location.description}</p>
        </div>
    </button>
);


export const VirtualWorldScreen: React.FC<VirtualWorldScreenProps> = ({ onStartChallenge }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-2 text-center">Virtual World</h1>
      <p className="text-gray-400 text-center mb-8">Choose a location to start a contextual conversation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VIRTUAL_WORLD_LOCATIONS.map(location => (
          <LocationCard key={location.context} location={location} onClick={() => onStartChallenge(location.context)} />
        ))}
      </div>
    </div>
  );
};
