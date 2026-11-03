import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Pause, 
  Radio, 
  Clock, 
  Headphones, 
  Volume2, 
  VolumeX, 
  FastForward, 
  Check, 
  Share2,
  Sparkles,
  ListMusic
} from 'lucide-react';
import { PodcastEpisode } from '../types';

export const PodcastView: React.FC = () => {
  const { 
    podcasts, 
    currentPlayingPodcast, 
    isPlaying, 
    playPodcast, 
    togglePlayPause, 
    playbackSpeed, 
    setPlaybackSpeed 
  } = useApp();

  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25); // percentage

  const seriesList = [
    { id: 'all', title: 'Semua Serial' },
    { id: 'radar-pagi', title: 'Radar Pagi' },
    { id: 'suara-parlemen', title: 'Suara Parlemen' },
    { id: 'cakrawala-teknologi', title: 'Cakrawala Teknologi' },
    { id: 'investigasi-radar', title: 'Investigasi Radar' }
  ];

  const filteredEpisodes = selectedSeries === 'all' 
    ? podcasts 
    : podcasts.filter(p => p.seriesId === selectedSeries);

  const activeEpisode = currentPlayingPodcast || podcasts[0];

  return (
    <div className="podcast-page py-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#0a1220] via-[#0f172a] to-[#16233d] rounded-2xl p-6 sm:p-10 border border-[#d9b76c]/30 text-white shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9b76c]/20 border border-[#d9b76c]/40 text-[#d9b76c] text-xs font-bold uppercase tracking-wider mb-4">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                WartaRadar Audio & Podcast Hub
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Jurnalisme Suara, Analisis Mendalam
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Dengarkan perbincangan eksklusif redaksi, investigasi lapangan, serta bedah kebijakan ekonomi dan teknologi langsung dari para analis dan saksi peristiwa.
              </p>
            </div>

            {/* Featured Episode Card */}
            {activeEpisode && (
              <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/15 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#d9b76c] tracking-wider block mb-1">
                    Sedang Diputar
                  </span>
                  <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2 text-white mb-2">
                    {activeEpisode.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                    {activeEpisode.host}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5" />
                    {activeEpisode.duration}
                  </span>
                  <button 
                    onClick={() => playPodcast(activeEpisode)}
                    className="bg-[#d9b76c] hover:bg-[#b99243] text-black font-bold px-4 py-2 rounded-full flex items-center gap-2 transition"
                  >
                    {isPlaying && currentPlayingPodcast?.id === activeEpisode.id ? (
                      <>
                        <Pause className="w-4 h-4 fill-black" />
                        <span>Jeda</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black" />
                        <span>Putar Sekarang</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Floating/Sticky Audio Player Bar */}
        {activeEpisode && (
          <div className="sticky top-4 z-40 bg-[#0f172a] text-white rounded-xl p-4 border-2 border-[#d9b76c] shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Track Info */}
              <div className="flex items-center gap-3.5 w-full md:w-auto">
                <img 
                  src={activeEpisode.thumbnail} 
                  alt={activeEpisode.title} 
                  className="w-12 h-12 rounded-lg object-cover border border-[#d9b76c]/40 shrink-0" 
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#d9b76c] block">
                    {activeEpisode.seriesTitle} • Ep #{activeEpisode.episodeNumber}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-white truncate max-w-xs sm:max-w-md">
                    {activeEpisode.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Host: {activeEpisode.host}
                  </span>
                </div>
              </div>

              {/* Player Controls & Scrubber */}
              <div className="flex flex-col items-center gap-1 w-full max-w-md">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setProgress(prev => Math.max(0, prev - 10))}
                    className="p-1.5 text-slate-400 hover:text-white"
                    title="Mundur 15 detik"
                  >
                    -15s
                  </button>

                  <button 
                    onClick={togglePlayPause}
                    className="w-10 h-10 rounded-full bg-[#d9b76c] hover:bg-[#b99243] text-black flex items-center justify-center transition shadow-md"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>

                  <button 
                    onClick={() => setProgress(prev => Math.min(100, prev + 10))}
                    className="p-1.5 text-slate-400 hover:text-white"
                    title="Maju 15 detik"
                  >
                    +15s
                  </button>

                  {/* Speed Switcher */}
                  <div className="flex items-center gap-1 bg-slate-800 text-[11px] font-bold rounded px-2 py-1">
                    {[1, 1.25, 1.5].map(spd => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-1.5 py-0.5 rounded transition ${playbackSpeed === spd ? 'bg-[#d9b76c] text-black' : 'text-slate-400 hover:text-white'}`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrubber bar */}
                <div className="w-full flex items-center gap-2 text-[10px] text-slate-400">
                  <span>07:12</span>
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      setProgress(Math.round((x / rect.width) * 100));
                    }}
                    className="flex-1 h-2 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden"
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-[#d9b76c] to-amber-300 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span>{activeEpisode.duration}</span>
                </div>
              </div>

              {/* Volume & Stats */}
              <div className="hidden lg:flex items-center gap-3 text-xs text-slate-300">
                <button onClick={() => setIsMuted(!isMuted)} className="p-1 text-slate-400 hover:text-white">
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Headphones className="w-3.5 h-3.5" />
                  {activeEpisode.plays.toLocaleString()} pendengar
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Series Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-slate-200">
          <ListMusic className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-2" />
          {seriesList.map((series) => (
            <button
              key={series.id}
              onClick={() => setSelectedSeries(series.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedSeries === series.id
                  ? 'bg-[#0f172a] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {series.title}
            </button>
          ))}
        </div>

        {/* Episode Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredEpisodes.map((episode) => {
            const isThisPlaying = isPlaying && currentPlayingPodcast?.id === episode.id;

            return (
              <div
                key={episode.id}
                className={`bg-white rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  currentPlayingPodcast?.id === episode.id
                    ? 'border-[#d9b76c] shadow-md ring-1 ring-[#d9b76c]'
                    : 'border-slate-200 hover:shadow-md'
                }`}
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <img 
                      src={episode.thumbnail} 
                      alt={episode.title}
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      onClick={() => playPodcast(episode)}
                      className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#d9b76c] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5 fill-black" />
                        ) : (
                          <Play className="w-5 h-5 fill-black ml-0.5" />
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#b99243] mb-1">
                      <span>{episode.seriesTitle}</span>
                      <span>•</span>
                      <span>Ep #{episode.episodeNumber}</span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2 mb-1.5 hover:text-[#b99243] cursor-pointer" onClick={() => playPodcast(episode)}>
                      {episode.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">
                      {episode.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {episode.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Headphones className="w-3.5 h-3.5" />
                      {episode.plays.toLocaleString()} putar
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-slate-500">
                    {episode.publishedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
