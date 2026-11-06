import React, { useState } from 'react';
import { UploadCloud, FileJson, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  onFilesReady: (followersFile: File, followingFile: File) => void;
  isProcessing: boolean;
  error: string | null;
}

export const DropZone: React.FC<Props> = ({ onFilesReady, isProcessing, error }) => {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'followers' | 'following') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.json')) {
      if (type === 'followers') setFollowersFile(file);
      else setFollowingFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followersFile && followingFile) {
      onFilesReady(followersFile, followingFile);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Caricamento File JSON</h2>
        <p className="text-slate-400 text-sm">Seleziona o trascina i due file esportati da Instagram</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-3 text-sm animate-fade-in">
          <AlertCircle size={20} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Followers Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'followers')}
            className={`relative group border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
              followersFile
                ? 'border-emerald-500/50 bg-emerald-500/5'
                : 'border-slate-800 hover:border-indigo-500/50 bg-slate-950/40'
            }`}
          >
            <input
              type="file"
              accept=".json"
              id="followers-input"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setFollowersFile(e.target.files[0])}
            />
            <label htmlFor="followers-input" className="cursor-pointer flex flex-col items-center">
              {followersFile ? (
                <>
                  <CheckCircle2 size={40} className="text-emerald-400 mb-3 animate-bounce-short" />
                  <span className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {followersFile.name}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium mt-1">Pronto per l'analisi</span>
                </>
              ) : (
                <>
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <FileJson size={32} />
                  </div>
                  <span className="text-sm font-semibold text-white mb-1">followers_1.json</span>
                  <span className="text-xs text-slate-500">Trascina o clicca per caricare</span>
                </>
              )}
            </label>
          </div>

          {/* Following Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'following')}
            className={`relative group border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${
              followingFile
                ? 'border-emerald-500/50 bg-emerald-500/5'
                : 'border-slate-800 hover:border-pink-500/50 bg-slate-950/40'
            }`}
          >
            <input
              type="file"
              accept=".json"
              id="following-input"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && setFollowingFile(e.target.files[0])}
            />
            <label htmlFor="following-input" className="cursor-pointer flex flex-col items-center">
              {followingFile ? (
                <>
                  <CheckCircle2 size={40} className="text-emerald-400 mb-3 animate-bounce-short" />
                  <span className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {followingFile.name}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium mt-1">Pronto per l'analisi</span>
                </>
              ) : (
                <>
                  <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <FileJson size={32} />
                  </div>
                  <span className="text-sm font-semibold text-white mb-1">following.json</span>
                  <span className="text-xs text-slate-500">Trascina o clicca per caricare</span>
                </>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!followersFile || !followingFile || isProcessing}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-600/20 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Analisi Asincrona Web Worker in corso...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>Elabora Confronto</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};