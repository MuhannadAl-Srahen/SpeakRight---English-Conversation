import React from 'react';

interface MicrophoneButtonProps {
  isMuted: boolean;
  isAiSpeaking: boolean;
  sessionStatus: 'connecting' | 'connected' | 'error' | 'ended';
  onToggleMute: () => void;
}

const MicIcon: React.FC<{ listening: boolean }> = ({ listening }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${listening ? 'text-red-500' : 'text-[#FFC107]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 10v4m0 0l-3-3m3 3l3-3m-8.121-4.879A10.005 10.005 0 0112 3a10.005 10.005 0 018.121 4.121M12 11a3 3 0 013 3v2a3 3 0 01-6 0v-2a3 3 0 013-3z" />
  </svg>
);

const MicMutedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 10v4m0 0l-3-3m3 3l3-3m-8.121-4.879A10.005 10.005 0 0112 3a10.005 10.005 0 018.121 4.121M12 11a3 3 0 013 3v2a3 3 0 01-6 0v-2a3 3 0 013-3z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5l14 14" />
  </svg>
);

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isMuted,
  isAiSpeaking,
  sessionStatus,
  onToggleMute,
}) => {
  return (
    <button
      onClick={onToggleMute}
      disabled={sessionStatus !== 'connected'}
      className="relative flex items-center justify-center w-24 h-24 cursor-pointer disabled:cursor-not-allowed group transition-transform hover:scale-105 active:scale-95"
      aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
    >
      {isAiSpeaking && (
        <>
          <div className="absolute h-full w-full rounded-full bg-teal-500/50 animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
          <div className="absolute h-full w-full rounded-full bg-teal-500/50 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      {sessionStatus === 'connected' && !isMuted && !isAiSpeaking && (
        <>
          <div className="absolute h-full w-full rounded-full bg-red-500/50 animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
          <div className="absolute h-full w-full rounded-full bg-red-500/50 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      <div className="relative p-5 bg-gradient-to-br from-[#1e293b] to-[#2B3855] rounded-full z-10 transition-all shadow-xl group-hover:shadow-2xl group-hover:from-[#2B3855] group-hover:to-[#394a6c] ring-2 ring-indigo-500/20">
        {isMuted ? <MicMutedIcon /> : <MicIcon listening={sessionStatus === 'connected' && !isAiSpeaking} />}
      </div>
    </button>
  );
};
