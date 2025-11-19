
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
        <aside className="fixed top-0 left-0 h-full w-16 md:w-72 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 backdrop-blur-xl flex flex-col py-8 px-3 md:px-6 space-y-8 transition-all duration-300 z-20 shadow-2xl">
            {/* Logo Section */}
            <div className="flex items-center justify-center md:justify-start gap-3 px-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </div>
                <div className="hidden md:block">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">SpeakRight</h1>
                    <p className="text-xs text-slate-500 font-medium">English Practice</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2">
                {navItems.map(item => (
                    <button
                        key={item.screen}
                        onClick={() => navigateTo(item.screen)}
                        className={`group relative flex items-center gap-4 w-full py-4 px-4 rounded-xl transition-all duration-300 ${
                            currentScreen === item.screen
                                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-white shadow-lg shadow-amber-500/10'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                    >
                        {currentScreen === item.screen && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-r-full"></div>
                        )}
                        <div className={`shrink-0 transition-transform duration-300 ${
                            currentScreen === item.screen ? 'scale-110' : 'group-hover:scale-110'
                        }`}>
                            {item.icon}
                        </div>
                        <span className="hidden md:inline font-semibold text-base">{item.label}</span>
                        {currentScreen === item.screen && (
                            <div className="hidden md:block absolute right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="hidden md:block pt-4 border-t border-slate-800/50">
                <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-400">Status: Active</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">Ready to practice your English!</p>
                </div>
            </div>
        </aside>
    );
};
