import { useCallback, useEffect, useRef, useState } from 'react';

interface FinalSegment {
  text: string;
}

interface UseAssemblyAIRealtime {
  interim: string;
  finals: FinalSegment[];
  isListening: boolean;
  isConnected: boolean;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

// Downsample from e.g. 48000 -> 16000 mono and convert to Int16
function downsampleTo16k(input: Float32Array, inputSampleRate: number): Int16Array {
  if (inputSampleRate === 16000) {
    const s = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const val = Math.max(-1, Math.min(1, input[i]));
      s[i] = val < 0 ? val * 0x8000 : val * 0x7fff;
    }
    return s;
  }
  const ratio = inputSampleRate / 16000;
  const newLen = Math.round(input.length / ratio);
  const result = new Int16Array(newLen);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
    let acc = 0; let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < input.length; i++) {
      acc += input[i];
      count++;
    }
    const sample = acc / count;
    result[offsetResult] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

function encodeBase64(data: ArrayBuffer | ArrayBufferLike): string {
  let binary = '';
  const bytes = new Uint8Array(data);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(binary);
}

// Dummy conversation data
const DUMMY_CONVERSATION = [
  { role: 'Doctor', text: 'Hello, how are you feeling today?' },
  { role: 'Patient', text: 'I have been having headaches for the past week.' },
  { role: 'Doctor', text: 'Can you describe the type of pain? Is it sharp or dull?' },
  { role: 'Patient', text: 'It is more of a dull, throbbing pain on both sides of my head.' },
  { role: 'Doctor', text: 'Have you experienced any sensitivity to light or nausea?' },
  { role: 'Patient', text: 'Yes, bright lights make it worse and I feel a bit nauseous.' },
  { role: 'Doctor', text: 'It sounds like migraine headaches. Have you taken any medication?' },
  { role: 'Patient', text: 'I tried some over-the-counter pain relievers but they did not help much.' },
  { role: 'Doctor', text: 'I will prescribe you some medication specifically for migraines.' },
  { role: 'Patient', text: 'Thank you, doctor. How often should I take it?' },
  { role: 'Doctor', text: 'Take it at the onset of symptoms. Do not exceed two doses per day.' },
  { role: 'Patient', text: 'Understood. Are there any side effects I should watch for?' },
  { role: 'Doctor', text: 'You might feel drowsy. Avoid driving after taking the medication.' },
  { role: 'Patient', text: 'Okay, I will be careful. Should I come back for a follow-up?' },
  { role: 'Doctor', text: 'Yes, let us schedule a follow-up in two weeks to see how you are doing.' },
];

export function useAssemblyAIRealtime(serverBase = 'http://localhost:5000'): UseAssemblyAIRealtime {
  const [interim, setInterim] = useState('');
  const [finals, setFinals] = useState<FinalSegment[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const pingTimerRef = useRef<number | null>(null);
  const dummyIntervalRef = useRef<number | null>(null);
  const dummyIndexRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    if (dummyIntervalRef.current) {
      window.clearInterval(dummyIntervalRef.current);
      dummyIntervalRef.current = null;
    }
    if (pingTimerRef.current) {
      window.clearInterval(pingTimerRef.current);
      pingTimerRef.current = null;
    }
    try { wsRef.current?.close(); } catch (e) { console.error(e); }
    wsRef.current = null;
    try { processorRef.current?.disconnect(); } catch (e) { console.error(e); }
    processorRef.current = null;
    try { sourceRef.current?.disconnect(); } catch (e) { console.error(e); }
    sourceRef.current = null;
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) { console.error(e); }
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    setIsConnected(false);
    setIsListening(false);
  }, []);

  const stop = useCallback(() => {
    cleanup();
  }, [cleanup]);

  const start = useCallback(async () => {
    try {
      setError(null);
      setInterim('');
      setFinals([]);
      dummyIndexRef.current = 0;

      // Start dummy conversation loop
      setIsConnected(true);
      setIsListening(true);

      // Simulate conversation with dummy data
      dummyIntervalRef.current = window.setInterval(() => {
        if (dummyIndexRef.current >= DUMMY_CONVERSATION.length) {
          // Loop back to start
          dummyIndexRef.current = 0;
          setFinals([]);
        }

        const message = DUMMY_CONVERSATION[dummyIndexRef.current];
        const fullText = `${message.role}: ${message.text}`;

        // Show interim text character by character
        let charIndex = 0;
        const interimInterval = setInterval(() => {
          if (charIndex < fullText.length) {
            setInterim(fullText.substring(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(interimInterval);
            // Add to finals after showing complete
            setFinals(prev => [...prev, { text: fullText }]);
            setInterim('');
            dummyIndexRef.current++;
          }
        }, 50); // 50ms per character

      }, 5000); // 5 seconds between messages

      return;

      // OLD CODE BELOW (kept for reference but not executed)
      // 1) Fetch ephemeral token from local server
      const tokenResp = await fetch(`${serverBase}/api/assemblyai-token`);
      if (!tokenResp.ok) {
        const t = await tokenResp.text();
        throw new Error(`Token error: ${t}`);
      }
      const tokenData = await tokenResp.json();
      const token = tokenData.token || tokenData?.realtime_token || tokenData?.data || tokenData?.id || tokenData?.access_token;
      if (!token) throw new Error('No token returned from server');

      // 2) Open WebSocket
      const url = `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`;
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = async () => {
        setIsConnected(true);
        // 3) Mic + audio pipeline
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        sourceRef.current = source;
        const processor = ctx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;
        source.connect(processor);
        processor.connect(ctx.destination);

        processor.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          const s16 = downsampleTo16k(input, ctx.sampleRate);
          const base64 = encodeBase64(s16.buffer);
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ audio_data: base64 }));
          }
        };

        // Keepalive ping
        pingTimerRef.current = window.setInterval(() => {
          try { ws.send(JSON.stringify({ ping: true })); } catch (e) { console.error(e); }
        }, 5000);
      };

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data as string);
          const type = data.message_type || data.type;
          if (type === 'partial_transcript' || type === 'partial') {
            setInterim(data.text || data.transcript || '');
          } else if (type === 'final_transcript' || type === 'final') {
            const text = (data.text || data.transcript || '').trim();
            if (text) setFinals((prev) => [...prev, { text }]);
            setInterim('');
          } else if (data.error) {
            setError(String(data.error));
          }
        } catch {
          // ignore non-JSON
        }
      };

      ws.onerror = () => {
        setError('WebSocket error');
      };

      ws.onclose = () => {
        cleanup();
      };

      setIsListening(true);
    } catch (err) {
      const error = err as Error;
      setError(error?.message || String(err));
      cleanup();
    }
  }, [cleanup]);

  useEffect(() => () => cleanup(), [cleanup]);

  return { interim, finals, isListening, isConnected, error, start, stop };
}

export default useAssemblyAIRealtime;
