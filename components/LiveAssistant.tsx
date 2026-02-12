
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, MicOff, X, Radio, Volume2, Shield } from 'lucide-react';

interface LiveAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const LiveAssistant: React.FC<LiveAssistantProps> = ({ isOpen, onClose, user }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startAssistant = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setIsActive(true);
            setIsConnecting(false);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              const bytes = decodeBase64(base64);
              const buffer = await decodeAudioData(bytes, outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => [...prev.slice(-3), message.serverContent!.outputTranscription!.text]);
            }
          },
          onerror: (e) => {
            console.error("Assistant Error:", e);
            setError("Connection failed. Quota might be reached.");
            stopAssistant();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are the Pulse Global Sr. Editorial Assistant. Speak in a professional, clear, and journalistic tone. Help the user with news queries, summaries, or editorial tasks. The user is ${user?.name || 'a Guest Correspondent'}.`,
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error(err);
      setError("Failed to access microphone or connect to AI.");
      setIsConnecting(false);
    }
  };

  const stopAssistant = () => {
    sessionRef.current?.close();
    streamRef.current?.getTracks().forEach(track => track.stop());
    setIsActive(false);
    setIsConnecting(false);
    setTranscript([]);
  };

  useEffect(() => {
    if (!isOpen) stopAssistant();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
          <X size={24} />
        </button>

        <div className="p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className={`p-6 rounded-[2rem] shadow-xl transition-all duration-700 ${isActive ? 'bg-rose-600 shadow-rose-900/30' : 'bg-slate-100 text-slate-400'}`}>
              {isActive ? <Radio size={40} className="text-white animate-pulse" /> : <MicOff size={40} />}
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-8 mb-2">Editorial Voice Assistant</h2>
            <p className="text-slate-500 font-medium">Real-time briefing and research assistant</p>
          </div>

          <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 min-h-[160px] flex flex-col justify-center border border-slate-100 shadow-inner">
            {isConnecting ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-10 w-10 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Initializing Session...</p>
              </div>
            ) : isActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                   {[1, 2, 3, 4, 5].map(i => (
                     <div key={i} className="w-1.5 h-8 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 2 + 1.5}rem` }}></div>
                   ))}
                </div>
                <div className="text-center text-sm text-slate-600 font-medium leading-relaxed italic">
                  {transcript.length > 0 ? `"...${transcript.join('')}"` : "Listening for your briefing request..."}
                </div>
              </div>
            ) : error ? (
              <div className="text-center">
                 <Shield size={32} className="text-amber-500 mx-auto mb-3" />
                 <p className="text-sm font-bold text-slate-900 mb-1">Service Alert</p>
                 <p className="text-xs text-slate-500">{error}</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                 <p className="text-sm text-slate-500 leading-relaxed max-w-[240px] mx-auto">Click below to start a live voice session with the Pulse Editorial Board.</p>
              </div>
            )}
          </div>

          <button 
            onClick={isActive ? stopAssistant : startAssistant}
            disabled={isConnecting}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center space-x-4 transition-all shadow-xl ${
              isActive 
                ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
            }`}
          >
            {isActive ? <MicOff size={20} /> : <Mic size={20} />}
            <span className="uppercase text-xs font-black tracking-widest">
              {isActive ? 'Terminate Connection' : isConnecting ? 'Connecting...' : 'Establish Secure Link'}
            </span>
          </button>
        </div>

        <div className="bg-slate-900 py-4 px-8 flex justify-center">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">End-to-End Encrypted Voice Dispatch</p>
        </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
