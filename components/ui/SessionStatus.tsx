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
    return <p className="mt-4 text-red-500 font-semibold text-center">{micError}</p>;
  }

  if (isAiSpeaking) {
    return <p className="mt-4 text-teal-400 animate-pulse">Coach is speaking...</p>;
  }

  switch (sessionStatus) {
    case 'connecting':
      return <p className="mt-4 text-gray-300 animate-pulse">Connecting to your coach...</p>;
    case 'connected':
      return isMuted
        ? <p className="mt-4 text-yellow-400">Microphone is muted. Tap to speak.</p>
        : <p className="mt-4 text-green-400">Connected! Start speaking.</p>;
    case 'error':
      return <p className="mt-4 text-red-500 font-semibold text-center">Connection error. Please end session and try again.</p>;
    case 'ended':
      return <p className="mt-4 text-gray-400">Session ended.</p>;
    default:
      return <p className="mt-4 text-gray-400">Preparing session...</p>;
  }
};
