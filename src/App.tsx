import { useState } from 'react';
import { ModeSelector } from './components/ModeSelector';
import { DropZone } from './components/DropZone';
import { ResultsDashboard } from './components/ResultsDashboard';
import { useInstagramParser } from './hooks/useInstagramParser';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<'selection' | 'file' | 'oauth'>('selection');
  const { processFiles, isProcessing, result, error } = useInstagramParser();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {mode !== 'selection' && (
              <button
                onClick={() => setMode('selection')}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer mr-1"
                title="Torna alla scelta"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              IG Followers Checker
            </h1>
          </div>
          <span className="text-xs text-slate-400 font-medium px-3 py-1 bg-slate-900 border border-slate-800 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Client-Side Secure
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col justify-center">
        {mode === 'selection' && (
          <ModeSelector onSelectMode={(selectedMode) => setMode(selectedMode)} />
        )}

        {mode === 'file' && !result && (
          <DropZone onFilesReady={processFiles} isProcessing={isProcessing} error={error} />
        )}

        {mode === 'file' && result && (
          <ResultsDashboard result={result} onReset={() => setMode('selection')} />
        )}

        {mode === 'oauth' && (
          <div className="max-w-md mx-auto text-center p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-4">
            <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center mx-auto">
              <ShieldAlert size={28} />
            </div>
            <h2 className="text-xl font-bold text-white">Modalità OAuth in arrivo</h2>
            <p className="text-sm text-slate-400">
              Per utilizzare le API ufficiali di Instagram è necessario registrare un'applicazione Meta Developer e configurare i redirect URL autorizzati.
            </p>
            <button
              onClick={() => setMode('selection')}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all text-sm cursor-pointer"
            >
              Torna Indietro
            </button>
          </div>
        )}
      </main>
    </div>
  );
}