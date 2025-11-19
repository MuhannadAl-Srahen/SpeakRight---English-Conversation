
import React, { useState } from 'react';
import type { VirtualWorldLocation } from '../../types';
import { VIRTUAL_WORLD_LOCATIONS } from '../../constants';

interface VirtualWorldScreenProps {
  onStartChallenge: (context: string) => void;
}

const LocationCard: React.FC<{ location: VirtualWorldLocation; onClick: () => void; index: number }> = ({ location, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={onClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-60 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-slate-700/50"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <img 
        src={location.image} 
        alt={location.name} 
        className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110 group-hover:rotate-1" 
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent group-hover:via-black/80 transition-all duration-300"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 space-y-2 sm:space-y-3">
        {/* Icon Badge */}
        <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
          {location.name.includes('Coffee') && (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"/>
            </svg>
          )}
          {location.name.includes('Airport') && (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
          {location.name.includes('Restaurant') && (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )}
          {location.name.includes('Job') && (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
          {location.name.includes('Shopping') && (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          )}
          {location.name.includes('Doctor') && (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
          {location.name}
        </h3>
        
        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
          {location.description}
        </p>

        {/* Start Button */}
        <div className={`flex items-center gap-2 text-amber-400 font-semibold transition-all duration-300 ${isHovered ? 'translate-x-2' : ''}`}>
          <span>Start Conversation</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-amber-500/0 group-hover:border-amber-500/50 rounded-3xl transition-all duration-300"></div>
      
      {/* Corner Accent */}
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/60 rounded-tr-2xl transition-all duration-300"></div>
    </button>
  );
};


export const VirtualWorldScreen: React.FC<VirtualWorldScreenProps> = ({ onStartChallenge }) => {
  return (
    <div className="animate-fade-in space-y-6 sm:space-y-8 px-2 sm:px-0">
      {/* Header Section */}
      <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/30 animate-pulse-slow">
            <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
          Virtual World
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-4">
          Choose a location to start a contextual conversation and practice English in real-life scenarios.
        </p>

        {/* Stats Bar */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{VIRTUAL_WORLD_LOCATIONS.length}</div>
            <div className="text-sm text-slate-500">Scenarios</div>
          </div>
          <div className="w-px h-12 bg-slate-700"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">∞</div>
            <div className="text-sm text-slate-500">Conversations</div>
          </div>
          <div className="w-px h-12 bg-slate-700"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">AI</div>
            <div className="text-sm text-slate-500">Powered</div>
          </div>
        </div>
      </div>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {VIRTUAL_WORLD_LOCATIONS.map((location, index) => (
          <LocationCard 
            key={location.context} 
            location={location} 
            onClick={() => onStartChallenge(location.context)}
            index={index}
          />
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50">
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">How it works</h3>
            <p className="text-slate-400 leading-relaxed">
              Select any scenario above to begin an AI-powered conversation. Each location provides a unique context 
              where you'll practice English naturally. The AI will act as different characters (barista, interviewer, doctor, etc.) 
              based on your chosen scenario, helping you build confidence in real-world situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
