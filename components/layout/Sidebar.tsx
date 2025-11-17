
import React from 'react';
import type { Screen } from '../../types';

interface SidebarProps {
  navigateTo: (screen: Screen) => void;
  currentScreen: Screen;
}

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const LogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ navigateTo, currentScreen }) => {
    const navItems = [
        { screen: 'home' as Screen, label: 'Home', icon: <HomeIcon /> },
        { screen: 'training-log' as Screen, label: 'Training Log', icon: <LogIcon /> },
    ];
  
    return (
        <aside className="fixed top-0 left-0 h-full w-16 md:w-64 bg-[#141B2D] flex flex-col items-center md:items-start py-8 space-y-6 transition-all duration-300 z-10">
            <div className="text-2xl font-bold text-white px-4 hidden md:block">SpeakRight</div>
             <div className="text-2xl font-bold text-white md:hidden">SR</div>
            <nav className="w-full flex flex-col items-center md:items-stretch">
                {navItems.map(item => (
                    <button
                        key={item.screen}
                        onClick={() => navigateTo(item.screen)}
                        className={`flex items-center space-x-4 w-full py-3 px-4 rounded-lg transition-colors duration-200 ${
                            currentScreen === item.screen
                                ? 'bg-[#2B3855] text-white'
                                : 'text-gray-300 hover:bg-[#2B3855]/60 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="hidden md:inline">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};
