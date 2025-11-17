
import React from 'react';
import type { Screen, Avatar, ProgressData } from '../../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface HomeScreenProps {
  navigateTo: (screen: Screen) => void;
  userName: string;
  userAvatar: Avatar;
  progressData: ProgressData[];
  onStartChallenge: (context: string | null) => void;
}

const ShieldIcon = () => (
    <div className="relative h-10 w-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-[#FFC107]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    </div>
);

const FriendsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F8F8F8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.082-.934 2.082-2.082s-.934-2.082-2.082-2.082-2.082.934-2.082 2.082.934 2.082 2.082 2.082zM12 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5v15h16.5v-15H3.75zM21 6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25V6.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h-1.5m12 0h-1.5" />
    </svg>
);


export const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo, userName, userAvatar, progressData, onStartChallenge }) => {
  const currentMood = progressData.length > 0 ? progressData[progressData.length - 1].mood : 50;
  
  const getMoodEmoji = (mood: number) => {
    if (mood > 75) return '😊';
    if (mood < 40) return '😟';
    return '😐';
  };

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-[#2B3855] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <img src={userAvatar.image} alt={userAvatar.name} className="w-28 h-28 rounded-full border-4 border-[#FFC107] shrink-0 object-cover bg-indigo-100" />
                <h2 className="text-2xl font-bold mt-4">{userName} <span role="img" aria-label="mood">{getMoodEmoji(currentMood)}</span></h2>
                <p className="text-gray-300 mt-1">Hello! Let's practice English!</p>
            </div>

            <div className="lg:col-span-3 bg-[#2B3855] p-4 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold ml-4">Learning Progress</h2>
                <p className="text-sm text-gray-400 mb-2 ml-4">Mood</p>
                <div className="h-40 w-full">
                    <ResponsiveContainer>
                        <LineChart data={progressData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" strokeOpacity={0.3}/>
                            <XAxis dataKey="day" stroke="#A0AEC0" fontSize={12} />
                            <YAxis stroke="#A0AEC0" domain={[0, 100]} fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A233A', border: '1px solid #4A5568' }} />
                            <Line type="monotone" dataKey="mood" stroke={currentMood >= 50 ? '#4CAF50' : '#FF5722'} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        <div onClick={() => navigateTo('virtual-world')} className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden group cursor-pointer shadow-lg flex-grow">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" alt="Virtual World" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6">
                <h2 className="text-3xl font-bold text-white">Enter the Virtual World</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onClick={() => onStartChallenge('General Conversation')} className="bg-[#FFC107] p-4 rounded-2xl shadow-lg flex items-center justify-center space-x-4 hover:brightness-110 transition-all duration-300">
                <ShieldIcon />
                <h3 className="text-xl font-bold text-black/80">Dynamic Challenges</h3>
            </button>
            <button onClick={() => alert('Share your saved conversations from the Training Log!')} className="bg-[#2B3855] p-4 rounded-2xl shadow-lg flex items-center justify-center space-x-4 hover:bg-[#394a6c] transition-colors duration-300">
                <FriendsIcon />
                <h3 className="text-xl font-bold text-white">Speak With Friends</h3>
            </button>
        </div>
    </div>
  );
};