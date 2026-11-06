import React from 'react';
import { ShieldCheck, KeyRound, UploadCloud, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  onSelectMode: (mode: 'file' | 'oauth') => void;
}

export const ModeSelector: React.FC<Props> = ({ onSelectMode }) => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      {/* Badge Introduttivo */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles size={14} /> Nuova Architettura Client-Side
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
          Seleziona la modalità di analisi
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Scegli se analizzare i tuoi dati in locale in totale privacy o connetterti direttamente tramite l'API ufficiale di Meta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card JSON Offline */}
        <div
          onClick={() => onSelectMode('file')}
          className="relative group p-8 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
          <div>
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <UploadCloud size={26} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Carica Export JSON</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Trascina i file ufficiali di Instagram (`followers_1.json` e `following.json`). L'elaborazione avviene al 100% nel tuo browser senza inviare dati al server.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <ShieldCheck size={14} /> Privacy Garantita
            </span>
            <span className="text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-sm font-semibold">
              Inizia <ArrowRight size={16} />
            </span>
          </div>
        </div>

        {/* Card Instagram OAuth */}
        <div
          onClick={() => onSelectMode('oauth')}
          className="relative group p-8 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-pink-500/60 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-pink-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-colors" />
          <div>
            <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-xl flex items-center justify-center mb-6 border border-pink-500/20 group-hover:scale-110 transition-transform">
              <KeyRound size={26} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Connetti Account Instagram</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Sincronizzazione in tempo reale tramite OAuth 2.0 e Instagram Graph API. Ideale per Creator e Account Professional.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
              Meta Graph API
            </span>
            <span className="text-pink-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-sm font-semibold">
              Connetti <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};