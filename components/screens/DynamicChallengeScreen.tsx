import React, { useState, useCallback, useRef } from 'react';
import type { Screen, TrainingLog, Message } from '../../types';
import { useAudioSession } from '../../hooks/useAudioSession';
import { ConversationDisplay } from '../chat/ConversationDisplay';
import { MicrophoneButton } from '../ui/MicrophoneButton';
import { SessionStatus } from '../ui/SessionStatus';
import { getScenarioConfig } from '../../config/scenarioConfigs';

interface DynamicChallengeScreenProps {
  onEndSession: (log: TrainingLog) => void;
  navigateTo: (screen: Screen) => void;
  context: string | null;
}

export const DynamicChallengeScreen: React.FC<DynamicChallengeScreenProps> = ({
  onEndSession,
  navigateTo,
  context
}) => {
  // State management
  const [conversation, setConversation] = useState<Message[]>([]);
  const [sessionStatus, setSessionStatus] = useState<'connecting' | 'connected' | 'error' | 'ended'>('connecting');
  const [micError, setMicError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  const isEndingSessionRef = useRef(false);
  const isVirtualWorld = context && context !== 'General Conversation';
  
  // Extract clean scenario name
  const scenarioConfig = context ? getScenarioConfig(context) : null;
  const displayTitle = scenarioConfig ? scenarioConfig.name : (context || 'Dynamic Challenge');

  // Audio session hook
  const { sessionPromiseRef, isMutedRef } = useAudioSession({
    context,
    isVirtualWorld,
    onConversationUpdate: setConversation,
    onSessionStatusChange: setSessionStatus,
    onMicError: setMicError,
    onAiSpeakingChange: setIsAiSpeaking,
  });

  // Handlers
  const handleEndSession = useCallback(() => {
    if (isEndingSessionRef.current) return;
    isEndingSessionRef.current = true;
    setSessionStatus('ended');

    const userMessages = conversation.filter(m => m.sender === 'user').length;
    const corrections = conversation.filter(m => m.sender === 'ai' && m.accentFeedback).length;
    const score = Math.max(0, 100 - (corrections * 20) + (userMessages * 5));

    const log: TrainingLog = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      context: context,
      conversation: conversation,
      score: Math.min(100, score),
    };

    sessionPromiseRef.current?.then(session => session.close());
    onEndSession(log);
    navigateTo('home');
  }, [conversation, context, onEndSession, navigateTo, sessionPromiseRef]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMutedState = !prev;
      isMutedRef.current = newMutedState;
      return newMutedState;
    });
  }, [isMutedRef]);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] sm:h-[calc(100vh-2rem)] animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex-shrink-0 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-indigo-500/20 px-3 sm:px-6 py-3 sm:py-4 shadow-lg">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-lg sm:text-2xl font-bold text-white truncate">{displayTitle}</h1>
          <button
            onClick={handleEndSession}
            disabled={sessionStatus === 'ended'}
            className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm sm:text-base font-medium rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Main Content Area - Scrollable Chat */}
      <div className="flex-1 overflow-hidden">
        <ConversationDisplay conversation={conversation} isVirtualWorld={isVirtualWorld} context={context} />
      </div>

      {/* Fixed Bottom Controls */}
      <div className="flex-shrink-0 bg-gradient-to-t from-[#0f172a] via-[#1e293b] to-transparent border-t border-indigo-500/10 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-4">
          <MicrophoneButton
            isMuted={isMuted}
            isAiSpeaking={isAiSpeaking}
            sessionStatus={sessionStatus}
            onToggleMute={toggleMute}
          />
          <SessionStatus
            sessionStatus={sessionStatus}
            micError={micError}
            isAiSpeaking={isAiSpeaking}
            isMuted={isMuted}
          />
        </div>
      </div>
    </div>
  );
};
