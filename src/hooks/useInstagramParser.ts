import { useState, useEffect, useRef, useCallback } from 'react';
import type { AnalysisResult } from '../types/instagram';

export function useInstagramParser() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Inizializza il worker tramite la sintassi nativa Vite
    workerRef.current = new Worker(
      new URL('../workers/parser.worker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (e: MessageEvent) => {
      setIsProcessing(false);
      if (e.data.type === 'SUCCESS') {
        setResult(e.data.payload);
        setError(null);
      } else if (e.data.type === 'ERROR') {
        setError(e.data.error);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processFiles = useCallback(async (followersFile: File, followingFile: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const [followersText, followingText] = await Promise.all([
        followersFile.text(),
        followingFile.text(),
      ]);

      const followersData = JSON.parse(followersText);
      const followingData = JSON.parse(followingText);

      workerRef.current?.postMessage({
        type: 'PROCESS_FILES',
        followersData,
        followingData,
      });
    } catch (err: any) {
      setIsProcessing(false);
      setError('Formato dei file non valido (JSON corrotto).');
    }
  }, []);

  return { processFiles, isProcessing, result, error };
}