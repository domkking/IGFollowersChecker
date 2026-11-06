import React, { useState, useMemo } from 'react';
import type { AnalysisResult } from '../types/instagram';
import { Copy, Download, Check, Users, UserX, UserCheck, ExternalLink, Search, RefreshCw } from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<Props> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnmatched = useMemo(() => {
    return result.unmatched.filter((user) =>
      user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [result.unmatched, searchTerm]);

  const textContent = useMemo(() => result.unmatched.join('\n'), [result.unmatched]);

  const handleCopy = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `unmatched_followers_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Cards KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Followers</p>
            <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">{result.followersCount.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <UserCheck size={26} />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-400">Following</p>
            <h3 className="text-3xl font-extrabold text-pink-400 mt-1">{result.followingCount.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-xl">
            <Users size={26} />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-bold">UNMATCHED</p>
            <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{result.unmatchedCount.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
            <UserX size={26} />
          </div>
        </div>
      </div>

      {/* Contenitore Principale della Lista */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Toolbar Interattiva */}
        <div className="p-6 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Cerca username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all border border-slate-700/80 flex items-center gap-2 cursor-pointer shadow-md"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? 'Copiati!' : 'Copia Tutti'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-all border border-slate-700/80 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download size={16} />
              <span>Esporta TXT</span>
            </button>

            <button
              onClick={onReset}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors border border-slate-700/80 cursor-pointer"
              title="Ricomincia"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

{/* Tabella / Lista degli Utenti con altezza fissa per evitare layout shift */}
        <div className="h-[400px] overflow-y-auto divide-y divide-slate-800/40 p-2">
          {filteredUnmatched.length > 0 ? (
            filteredUnmatched.map((username, index) => (
              <div
                key={index}
                className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-800/30 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-600 w-8">{index + 1}.</span>
                  <span className="text-sm font-medium text-slate-200">@{username}</span>
                </div>
                <a
                  href={`https://instagram.com/${username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"
                  title={`Apri il profilo di @${username} su Instagram`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              Nessun utente trovato per la ricerca "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};