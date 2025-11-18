import React, { useState, useCallback, useRef } from 'react';
import type { Screen, TrainingLog, Message } from '../../types';
import { useAudioSession } from '../../hooks/useAudioSession';
import { ConversationDisplay } from '../chat/ConversationDisplay';
import { MicrophoneButton } from '../ui/MicrophoneButton';
import { SessionStatus } from '../ui/SessionStatus';

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
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold">{context || 'Dynamic Challenge'}</h1>
        <button
          onClick={handleEndSession}
          disabled={sessionStatus === 'ended'}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:bg-gray-500"
        >
          End Session
        </button>
      </div>

      {/* Conversation Area */}
      <ConversationDisplay conversation={conversation} isVirtualWorld={isVirtualWorld} />

      {/* Microphone Controls */}
      <div className="flex flex-col items-center justify-center pt-4 flex-shrink-0">
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
  );
};
