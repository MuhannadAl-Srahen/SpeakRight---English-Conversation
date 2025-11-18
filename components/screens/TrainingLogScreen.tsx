import React, { useState } from 'react';
import type { TrainingLog, Message } from '../../types';

interface TrainingLogScreenProps {
  logs: TrainingLog[];
}

const LogItem: React.FC<{ log: TrainingLog }> = ({ log }) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderMessage = (msg: Message, index: number) => (
        <div key={index} className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-indigo-600 self-end' : 'bg-gray-700 self-start'}`}>
            <p dir="auto">{msg.text}</p>
            {msg.correction && <p dir="auto" className="mt-1 text-sm text-[#FF5722] font-semibold">Correction: {msg.correction}</p>}
            {msg.accentFeedback && <p dir="auto" className="mt-1 text-sm text-sky-300 font-semibold">Accent Tip: {msg.accentFeedback}</p>}
            {msg.encouragement && <p dir="auto" className="mt-1 text-sm text-green-400 italic">"{msg.encouragement}"</p>}
        </div>
    );

    return (
        <div className="bg-[#2B3855] rounded-lg overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <div>
                    <p dir="auto" className="font-semibold text-lg">{log.context || 'Conversation'}</p>
                    <p className="text-sm text-gray-400">{new Date(log.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-sm rounded-full ${log.score > 75 ? 'bg-[#4CAF50]' : 'bg-[#FF5722]'}`}>Score: {log.score}</span>
                    <svg className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </button>
            {isOpen && (
                <div className="p-4 border-t border-[#1A233A] space-y-4 flex flex-col">
                    {log.conversation.map(renderMessage)}
                    <button onClick={() => alert(`Sharing conversation from ${log.date}`)} className="self-start mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
                        Share with Friends
                    </button>
                </div>
            )}
        </div>
    );
}

export const TrainingLogScreen: React.FC<TrainingLogScreenProps> = ({ logs }) => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Training Log</h1>
      {logs.length === 0 ? (
        <p className="text-gray-400 text-center">You have no saved conversations yet. Complete a Dynamic Challenge to see your log!</p>
      ) : (
        <div className="space-y-4">
          {logs.map(log => <LogItem key={log.id} log={log} />)}
        </div>
      )}
    </div>
  );
};