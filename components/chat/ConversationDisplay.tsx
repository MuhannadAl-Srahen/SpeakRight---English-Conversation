import React, { useEffect, useRef } from 'react';
import type { Message } from '../../types';

interface ConversationDisplayProps {
  conversation: Message[];
  isVirtualWorld: boolean;
}

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ conversation, isVirtualWorld }) => {
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#141B2D] p-4 rounded-lg space-y-4">
      {conversation.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-indigo-600' : 'bg-[#2B3855]'}`}>
            <p dir="auto">{msg.text}</p>
            {msg.accentFeedback && (
              <p dir="auto" className="mt-1 text-sm text-sky-300 font-semibold">
                Accent Tip: {msg.accentFeedback}
              </p>
            )}
            {msg.encouragement && !isVirtualWorld && (
              <p dir="auto" className="mt-1 text-sm text-green-300 italic">
                "{msg.encouragement}"
              </p>
            )}
          </div>
        </div>
      ))}
      <div ref={conversationEndRef} />
    </div>
  );
};
