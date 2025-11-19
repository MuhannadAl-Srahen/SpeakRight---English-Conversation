import React, { useEffect, useRef } from 'react';
import type { Message } from '../../types';
import { getScenarioConfig } from '../../config/scenarioConfigs';

interface ConversationDisplayProps {
  conversation: Message[];
  isVirtualWorld: boolean;
  context: string | null;
}

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ conversation, isVirtualWorld, context }) => {
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Get role information for Virtual World scenarios
  const scenarioConfig = context ? getScenarioConfig(context) : null;
  const role = isVirtualWorld && scenarioConfig ? scenarioConfig.role : 'AI Coach';
  const roleDescription = isVirtualWorld && scenarioConfig ? scenarioConfig.roleDescription : 'English conversation partner';

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#141B2D] to-[#0f172a]">
      {/* Profile Header */}
      <div className="flex-shrink-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border-b border-indigo-500/20 backdrop-blur-sm shadow-lg">
        <div className="flex items-center space-x-3 p-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-indigo-500/30">
              {role.charAt(0)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0f172a]"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{role}</h3>
            <p className="text-sm text-indigo-300/80">{roleDescription}</p>
          </div>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent">
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="text-6xl mb-4">🎤</div>
              <p className="text-gray-400 text-lg">Start speaking to begin the conversation</p>
            </div>
          </div>
        ) : (
          conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`px-4 py-3 rounded-2xl max-w-2xl shadow-lg ${msg.sender === 'user' ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 ml-8' : 'bg-gradient-to-br from-[#1e293b] to-[#2B3855] mr-8'}`}>
                <p dir="auto" className="text-gray-100 text-base leading-relaxed">{msg.text}</p>
                {msg.accentFeedback && (
                  <div className="mt-3 pt-3 border-t border-sky-500/20">
                    <p dir="auto" className="text-sm text-sky-300 font-medium">
                      💡 {msg.accentFeedback}
                    </p>
                  </div>
                )}
                {msg.encouragement && !isVirtualWorld && (
                  <p dir="auto" className="mt-2 text-sm text-emerald-300 italic">
                    ✨ "{msg.encouragement}"
                  </p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={conversationEndRef} />
      </div>
    </div>
  );
};
