import React from 'react';

interface SessionStatusProps {
  sessionStatus: 'connecting' | 'connected' | 'error' | 'ended';
  micError: string | null;
  isAiSpeaking: boolean;
  isMuted: boolean;
}

export const SessionStatus: React.FC<SessionStatusProps> = ({
  sessionStatus,
  micError,
  isAiSpeaking,
  isMuted,
}) => {
  if (micError) {
    return <p className="mt-4 text-red-400 font-semibold text-center text-sm">{micError}</p>;
  }

  if (isAiSpeaking) {
    return <p className="mt-4 text-emerald-400 animate-pulse font-medium">🎯 Coach is speaking...</p>;
  }

  switch (sessionStatus) {
    case 'connecting':
      return <p className="mt-4 text-gray-400 animate-pulse font-medium">⏳ Connecting to your coach...</p>;
    case 'connected':
      return isMuted
        ? <p className="mt-4 text-amber-400 font-medium">🔇 Microphone muted. Tap to speak.</p>
        : <p className="mt-4 text-green-400 font-medium">✅ Connected! Start speaking.</p>;
    case 'error':
      return <p className="mt-4 text-red-400 font-semibold text-center text-sm">❌ Connection error. Please end session and try again.</p>;
    case 'ended':
      return <p className="mt-4 text-gray-500 font-medium">Session ended.</p>;
    default:
      return <p className="mt-4 text-gray-500 font-medium">Preparing session...</p>;
  }
};
