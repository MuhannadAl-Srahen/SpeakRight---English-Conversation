
import React, { useState, useEffect } from 'react';
import type { Screen, Avatar, ProgressData } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from 'recharts';

interface HomeScreenProps {
  navigateTo: (screen: Screen) => void;
  userName: string;
  userAvatar: Avatar;
  progressData: ProgressData[];
  onStartChallenge: (context: string | null) => void;
}

const ShieldIcon = () => (
  <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
    </svg>
    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm group-hover:bg-white/30 transition-all"></div>
  </div>
);

const FriendsIcon = () => (
  <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  </div>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold">{payload[0].payload.day}</p>
        <p className="text-amber-400 text-sm">Score: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo, userName, userAvatar, progressData, onStartChallenge }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const currentMood = progressData.length > 0 ? progressData[progressData.length - 1].mood : 50;
  const averageMood = progressData.length > 0 
    ? Math.round(progressData.reduce((sum, data) => sum + data.mood, 0) / progressData.length)
    : 50;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(averageMood);
    }, 500);
    return () => clearTimeout(timer);
  }, [averageMood]);

  const getMoodEmoji = (mood: number) => {
    if (mood >= 80) return '🎉';
    if (mood >= 60) return '😊';
    if (mood >= 40) return '😐';
    if (mood >= 20) return '😕';
    return '😟';
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 80) return 'from-green-400 to-emerald-500';
    if (mood >= 60) return 'from-blue-400 to-cyan-500';
    if (mood >= 40) return 'from-yellow-400 to-amber-500';
    if (mood >= 20) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-rose-600';
  };

  const totalSessions = progressData.length;
  const improvement = progressData.length >= 2 
    ? progressData[progressData.length - 1].mood - progressData[0].mood 
    : 0;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in h-full px-2 sm:px-0">
      {/* Welcome Section with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-xl border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-1 animate-pulse-slow">
              <img 
                src={userAvatar.image} 
                alt={userAvatar.name} 
                className="w-full h-full rounded-full object-cover border-2 sm:border-4 border-slate-800"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-lg border-2 sm:border-4 border-slate-800">
              {getMoodEmoji(currentMood)}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {userName}
          </h2>
          <p className="text-slate-400 mt-2 text-sm">Ready to practice English!</p>

          {/* Quick Stats */}
          <div className="mt-6 w-full space-y-3">
            <div className="bg-slate-700/50 rounded-xl p-3 flex justify-between items-center">
              <span className="text-slate-400 text-sm">Total Sessions</span>
              <span className="text-white font-bold text-lg">{totalSessions}</span>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-3 flex justify-between items-center">
              <span className="text-slate-400 text-sm">Improvement</span>
              <span className={`font-bold text-lg ${improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {improvement >= 0 ? '+' : ''}{improvement}%
              </span>
            </div>
          </div>
        </div>

        {/* Learning Progress Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Learning Progress</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Your weekly performance</p>
            </div>
            <div className="text-left sm:text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {averageMood}%
              </div>
              <div className="text-slate-400 text-xs mt-1">Average Score</div>
            </div>
          </div>

          <div className="h-48 sm:h-56 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" strokeOpacity={0.2}/>
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  fontSize={12}
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  domain={[0, 100]} 
                  fontSize={12}
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#fbbf24" 
                  strokeWidth={3}
                  fill="url(#colorMood)"
                  dot={{ fill: '#fbbf24', strokeWidth: 2, r: 5, stroke: '#1e293b' }}
                  activeDot={{ r: 7, fill: '#f97316' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-slate-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getMoodColor(averageMood)} transition-all duration-1000 ease-out rounded-full`}
              style={{ width: `${animatedProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Virtual World Card */}
      <div 
        onClick={() => navigateTo('virtual-world')} 
        className="relative w-full h-48 sm:h-64 rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-2xl border border-slate-700/50 transform hover:scale-[1.02] transition-all duration-300"
      >
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" 
          alt="Virtual World" 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Enter the Virtual World</h2>
          <p className="text-slate-300 text-sm sm:text-lg">Practice English in real-life scenarios</p>
          <div className="mt-4 flex items-center gap-2 text-amber-400 font-semibold">
            <span>Start Adventure</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <button 
          onClick={() => onStartChallenge('General Conversation')} 
          className="group relative bg-gradient-to-br from-amber-400 to-orange-500 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-between overflow-hidden hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          <div className="flex items-center gap-3 sm:gap-4 z-10">
            <ShieldIcon />
            <div className="text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-white">Dynamic Challenges</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1">Practice with AI coach</p>
            </div>
          </div>
          
          <svg className="w-8 h-8 text-white group-hover:translate-x-2 transition-transform z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <button 
          onClick={() => alert('Share your saved conversations from the Training Log!')} 
          className="group relative bg-gradient-to-br from-slate-700 to-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-between border-2 border-slate-600/50 overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          
          <div className="flex items-center gap-3 sm:gap-4 z-10">
            <FriendsIcon />
            <div className="text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-white">Speak With Friends</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Share your progress</p>
            </div>
          </div>
          
          <svg className="w-8 h-8 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-2 transition-all z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};