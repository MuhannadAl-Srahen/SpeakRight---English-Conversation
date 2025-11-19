import React, { useState } from 'react';
import type { TrainingLog, Message } from '../../types';
import { getScenarioConfig } from '../../config/scenarioConfigs';

interface TrainingLogScreenProps {
  logs: TrainingLog[];
}

const LogItem: React.FC<{ log: TrainingLog; index: number; totalLogs: number }> = ({ log, index, totalLogs }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Get scenario info for better display
    const scenarioConfig = log.context ? getScenarioConfig(log.context) : null;
    const scenarioName = scenarioConfig ? scenarioConfig.name : (log.context || 'General Conversation');
    
    // Format date better
    const logDate = new Date(log.date);
    const formattedDate = logDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    const formattedTime = logDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Calculate stats
    const totalMessages = log.conversation.filter(m => m.sender === 'user').length;
    const feedbackCount = log.conversation.filter(m => m.accentFeedback).length;

    const renderMessage = (msg: Message, msgIndex: number) => (
        <div key={msgIndex} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`px-4 py-3 rounded-xl max-w-xl shadow-md ${msg.sender === 'user' ? 'bg-gradient-to-br from-indigo-600 to-indigo-700' : 'bg-gradient-to-br from-[#1e293b] to-[#2B3855]'}`}>
                <p dir="auto" className="text-gray-100 text-sm leading-relaxed">{msg.text}</p>
                {msg.accentFeedback && (
                    <div className="mt-2 pt-2 border-t border-sky-500/20">
                        <p dir="auto" className="text-xs text-sky-300 font-medium">
                            💡 {msg.accentFeedback}
                        </p>
                    </div>
                )}
                {msg.encouragement && (
                    <p dir="auto" className="mt-2 text-xs text-emerald-300 italic">
                        ✨ "{msg.encouragement}"
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-[#1e293b] to-[#2B3855] rounded-xl overflow-hidden shadow-lg border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
            <button 
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }} 
                className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {scenarioName.charAt(0)}
                    </div>
                    <div>
                        <p dir="auto" className="font-semibold text-lg text-white">{scenarioName}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                            <span>📅 {formattedDate}</span>
                            <span>🕐 {formattedTime}</span>
                            <span>💬 {totalMessages} messages</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                            log.score >= 90 ? 'bg-green-500/20 text-green-400' : 
                            log.score >= 75 ? 'bg-blue-500/20 text-blue-400' : 
                            log.score >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-red-500/20 text-red-400'
                        }`}>
                            <span className="text-2xl">
                                {log.score >= 90 ? '🌟' : log.score >= 75 ? '🎯' : log.score >= 60 ? '📈' : '💪'}
                            </span>
                            <span>{log.score}/100</span>
                        </div>
                        {feedbackCount > 0 && (
                            <p className="text-xs text-gray-400 mt-1">{feedbackCount} tips received</p>
                        )}
                    </div>
                    <svg 
                        className={`w-6 h-6 text-indigo-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="border-t border-indigo-500/20 bg-gradient-to-br from-[#141B2D] to-[#0f172a]">
                    <div className="p-5 space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent">
                        {log.conversation.map(renderMessage)}
                    </div>
                    <div className="p-4 border-t border-indigo-500/10 bg-[#0f172a]/50 flex justify-between items-center">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const text = log.conversation.map(m => `${m.sender === 'user' ? 'You' : 'Coach'}: ${m.text}`).join('\n\n');
                                    navigator.clipboard.writeText(text);
                                    alert('✅ Conversation copied to clipboard!');
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                            >
                                📋 Copy Conversation
                            </button>
                            <button
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const shareText = `I just completed a ${scenarioName} practice session on SpeakRight and scored ${log.score}/100! 🎯`;
                                    if (navigator.share) {
                                        navigator.share({ text: shareText });
                                    } else {
                                        navigator.clipboard.writeText(shareText);
                                        alert('✅ Share text copied to clipboard!');
                                    }
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                            >
                                🚀 Share Progress
                            </button>
                        </div>
                        <div className="text-sm text-gray-400">
                            Session #{totalLogs - index}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const TrainingLogScreen: React.FC<TrainingLogScreenProps> = ({ logs }) => {
  // Calculate overall stats
  const totalSessions = logs.length;
  const averageScore = totalSessions > 0 
    ? Math.round(logs.reduce((sum, log) => sum + log.score, 0) / totalSessions) 
    : 0;
  const totalMessages = logs.reduce((sum, log) => sum + log.conversation.filter(m => m.sender === 'user').length, 0);
  const highestScore = totalSessions > 0 ? Math.max(...logs.map(l => l.score)) : 0;

  return (
    <div className="animate-fade-in space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">📚 Training Log</h1>
          <p className="text-sm sm:text-base text-gray-400">Review your practice sessions and track your progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      {totalSessions > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-3 sm:p-5 shadow-lg">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📊</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{totalSessions}</div>
            <div className="text-xs sm:text-sm text-gray-400">Total Sessions</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-xl p-3 sm:p-5 shadow-lg">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎯</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{averageScore}/100</div>
            <div className="text-xs sm:text-sm text-gray-400">Average Score</div>
          </div>
          <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/30 rounded-xl p-3 sm:p-5 shadow-lg">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⭐</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{highestScore}/100</div>
            <div className="text-xs sm:text-sm text-gray-400">Best Score</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-3 sm:p-5 shadow-lg">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💬</div>
            <div className="text-xl sm:text-2xl font-bold text-white">{totalMessages}</div>
            <div className="text-xs sm:text-sm text-gray-400">Total Messages</div>
          </div>
        </div>
      )}

      {/* Logs List */}
      {logs.length === 0 ? (
        <div className="bg-gradient-to-br from-[#1e293b] to-[#2B3855] rounded-xl p-12 text-center border border-indigo-500/20">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-white mb-2">No Training Logs Yet</h2>
          <p className="text-gray-400 mb-6">Complete your first conversation session to start tracking your progress!</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium">
            <span>🚀</span>
            <span>Start your first session from Home</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log, index) => <LogItem key={log.id} log={log} index={index} totalLogs={logs.length} />)}
        </div>
      )}
    </div>
  );
};