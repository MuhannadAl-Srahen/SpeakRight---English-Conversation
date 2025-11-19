import { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { decode, decodeAudioData, createBlob } from '../utils/audioUtils';
import { provideAccentFeedbackFunctionDeclaration, getGeneralSystemInstruction, getVirtualWorldSystemInstruction } from '../config/aiConfig';
import type { Message } from '../types';

interface UseAudioSessionProps {
  context: string | null;
  isVirtualWorld: boolean;
  onConversationUpdate: (messages: Message[]) => void;
  onSessionStatusChange: (status: 'connecting' | 'connected' | 'error' | 'ended') => void;
  onMicError: (error: string | null) => void;
  onAiSpeakingChange: (isSpeaking: boolean) => void;
}

export function useAudioSession({
  context,
  isVirtualWorld,
  onConversationUpdate,
  onSessionStatusChange,
  onMicError,
  onAiSpeakingChange,
}: UseAudioSessionProps) {
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const isMutedRef = useRef(false);
  const currentInputTranscriptionRef = useRef('');
  const currentOutputTranscriptionRef = useRef('');
  const pendingGeneralFeedbackRef = useRef<{ 
    correction?: string; 
    accentFeedback?: string; 
    arabicTranslation?: string;
    encouragement?: string; 
  } | null>(null);
  const pendingVirtualWorldMessageRef = useRef<Message | null>(null);
  const conversationRef = useRef<Message[]>([]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let inputAudioContext: AudioContext | null = null;
    let outputAudioContext: AudioContext | null = null;
    let scriptProcessor: ScriptProcessorNode | null = null;
    let mediaStreamSource: MediaStreamAudioSourceNode | null = null;
    const outputSources = new Set<AudioBufferSourceNode>();
    let nextStartTime = 0;

    const startSession = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.error('Microphone access denied:', err);
        onMicError('Microphone access denied. Please allow it in your browser settings and refresh the page.');
        onSessionStatusChange('error');
        return;
      }

      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const systemInstruction = isVirtualWorld 
        ? getVirtualWorldSystemInstruction(context || '')
        : getGeneralSystemInstruction(context);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          systemInstruction,
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          tools: [{ functionDeclarations: [provideAccentFeedbackFunctionDeclaration] }],
        },
        callbacks: {
          onopen: () => {
            onSessionStatusChange('connected');
            mediaStreamSource = inputAudioContext!.createMediaStreamSource(stream!);
            scriptProcessor = inputAudioContext!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              if (isMutedRef.current) return;
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            mediaStreamSource.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle audio output
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && outputAudioContext) {
              onAiSpeakingChange(true);
              nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64EncodedAudioString), outputAudioContext, 24000, 1);
              const source = outputAudioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContext.destination);
              source.addEventListener('ended', () => {
                outputSources.delete(source);
                if (outputSources.size === 0) {
                  onAiSpeakingChange(false);
                }
              });
              source.start(nextStartTime);
              nextStartTime += audioBuffer.duration;
              outputSources.add(source);
            }

            // Handle interruptions
            if (message.serverContent?.interrupted) {
              for (const source of outputSources.values()) {
                source.stop();
                outputSources.delete(source);
              }
              nextStartTime = 0;
              onAiSpeakingChange(false);
            }

            // Handle transcriptions
            if (message.serverContent?.inputTranscription) {
              currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
            }

            // Handle tool calls
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'provideAccentFeedback') {
                  const args = fc.args as any;
                  pendingGeneralFeedbackRef.current = {
                    correction: (args.correctedText as string) || undefined,
                    accentFeedback: (args.feedback as string) || undefined,
                    arabicTranslation: (args.arabicTranslation as string) || undefined,
                    encouragement: (args.encouragement as string) || undefined,
                  };
                }

                sessionPromise.then((session) => {
                  session.sendToolResponse({
                    functionResponses: {
                      id: fc.id,
                      name: fc.name,
                      response: { result: "ok" },
                    }
                  });
                });
              }
            }

            // Handle turn completion
            if (message.serverContent?.turnComplete) {
              const userText = currentInputTranscriptionRef.current.trim();
              const aiText = currentOutputTranscriptionRef.current.trim();
              const newMessages: Message[] = [];

              if (userText) {
                const userMessage: Message = { sender: 'user', text: userText };
                
                // Attach correction and Arabic translation to user message
                if (pendingGeneralFeedbackRef.current) {
                  userMessage.correction = pendingGeneralFeedbackRef.current.correction;
                  userMessage.arabicTranslation = pendingGeneralFeedbackRef.current.arabicTranslation;
                  userMessage.accentFeedback = pendingGeneralFeedbackRef.current.accentFeedback;
                  userMessage.encouragement = pendingGeneralFeedbackRef.current.encouragement;
                }
                
                newMessages.push(userMessage);
              }

              if (aiText) {
                const aiMessage: Message = { sender: 'ai', text: aiText };
                newMessages.push(aiMessage);
              }

              if (newMessages.length > 0) {
                conversationRef.current = [...conversationRef.current, ...newMessages];
                onConversationUpdate(conversationRef.current);
              }

              currentInputTranscriptionRef.current = '';
              currentOutputTranscriptionRef.current = '';
              pendingGeneralFeedbackRef.current = null;
              pendingVirtualWorldMessageRef.current = null;
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Session error:', e);
            onMicError('A connection error occurred.');
            onSessionStatusChange('error');
          },
          onclose: () => {
            // Cleanup handled in return function
          },
        },
      });

      sessionPromiseRef.current = sessionPromise;
    };

    startSession();

    return () => {
      sessionPromiseRef.current?.then(session => session.close());
      stream?.getTracks().forEach(track => track.stop());
      scriptProcessor?.disconnect();
      mediaStreamSource?.disconnect();
      inputAudioContext?.close().catch(console.error);
      outputAudioContext?.close().catch(console.error);
    };
  }, [context, isVirtualWorld, onConversationUpdate, onSessionStatusChange, onMicError, onAiSpeakingChange]);

  return {
    sessionPromiseRef,
    isMutedRef,
    conversationRef,
  };
}
