
import React, { useState, useCallback } from 'react';
import {
  Sidebar,
  HomeScreen,
  TrainingLogScreen,
  DynamicChallengeScreen,
  VirtualWorldScreen,
  LoginScreen
} from './components';
import type { Screen, TrainingLog, Avatar, ProgressData } from './types';
import { AVATARS, INITIAL_TRAINING_LOG, INITIAL_PROGRESS_DATA } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<Avatar | null>(null);
  const [trainingLog, setTrainingLog] = useState<TrainingLog[]>(INITIAL_TRAINING_LOG);
  const [progressData, setProgressData] = useState<ProgressData[]>(INITIAL_PROGRESS_DATA);
  const [challengeContext, setChallengeContext] = useState<string | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };
  
  const handleLogin = (name: string, gender: 'male' | 'female') => {
    setUserName(name);
    const filteredAvatars = AVATARS.filter(avatar => avatar.gender === gender);
    setUserAvatar(filteredAvatars[0] || null);
    setCurrentScreen('home');
  };

  const handleStartChallenge = useCallback((context: string | null) => {
    setChallengeContext(context);
    setCurrentScreen('challenge');
  }, []);

  const addTrainingLog = (log: TrainingLog) => {
    setTrainingLog(prevLogs => [log, ...prevLogs]);
    const lastMood = progressData[progressData.length-1]?.mood ?? 50;
    const newMood = Math.min(100, Math.max(0, lastMood + (log.score > 75 ? 10 : -10)));
    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'short' });
    setProgressData(prevData => [...prevData.slice(1), { day, mood: newMood }]);
  };
  
  const renderScreen = () => {
    if (currentScreen === 'login' || !userAvatar || !userName) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen navigateTo={navigateTo} userName={userName} userAvatar={userAvatar} progressData={progressData} onStartChallenge={handleStartChallenge} />;
      case 'training-log':
        return <TrainingLogScreen logs={trainingLog} />;
      case 'challenge':
        return <DynamicChallengeScreen onEndSession={addTrainingLog} navigateTo={navigateTo} context={challengeContext} />;
      case 'virtual-world':
        return <VirtualWorldScreen onStartChallenge={handleStartChallenge} />;
      default:
        return <HomeScreen navigateTo={navigateTo} userName={userName} userAvatar={userAvatar} progressData={progressData} onStartChallenge={handleStartChallenge} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-[#F8F8F8] min-h-screen flex overflow-hidden">
      {currentScreen !== 'login' && <Sidebar navigateTo={navigateTo} currentScreen={currentScreen} />}
      <main className={`flex-1 transition-all duration-300 overflow-y-auto ${currentScreen !== 'login' ? 'p-4 sm:p-6 lg:p-8 ml-16 md:ml-72' : ''}`}>
        <div className="max-w-[1600px] mx-auto">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default App;
