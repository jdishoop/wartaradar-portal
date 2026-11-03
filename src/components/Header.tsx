import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Radio, 
  Menu, 
  X, 
  Layers, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';
import { UserRole } from '../types';

export const Header: React.FC = () => {
  const { 
    currentView, 
    selectedCategory, 
    navigateToHome, 
    navigateToCategory, 
    navigateToPodcast, 
    navigateToEditorial, 
    navigateToAdManager,
    navigateToArticle,
    activeRole,
    setActiveRole,
    setSearchQuery,
    searchQuery,
    setCurrentView,
    posts,
    categories
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // DYNAMIC LIVE TICKER FOR "WARTA TERKINI"
  const publishedPosts = posts.filter(p => p.status === 'published');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Live real-time clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      setCurrentTime(now.toLocaleDateString('id-ID', options) + ' WIB');
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 30000);
    return () => clearInterval(clockInterval);
  }, []);

  // Rotate breaking news every 4.5 seconds
  useEffect(() => {
    if (publishedPosts.length <= 1 || isTickerPaused) return;

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setTickerIndex(prev => (prev + 1) % publishedPosts.length);
        setIsFading(false);
      }, 250);
    }, 4500);

    return () => clearInterval(timer);
  }, [publishedPosts.length, isTickerPaused]);

  const currentBreaking = publishedPosts[tickerIndex] || publishedPosts[0];

  const handlePrevTicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFading(true);
    setTimeout(() => {
      setTickerIndex(prev => (prev === 0 ? publishedPosts.length - 1 : prev - 1));
      setIsFading(false);
    }, 150);
  };

  const handleNextTicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFading(true);
    setTimeout(() => {
      setTickerIndex(prev => (prev + 1) % publishedPosts.length);
      setIsFading(false);
    }, 150);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      setCurrentView('search');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="site-header bg-white shadow-xs">
      {/* Top Bar: Dasar putih gradasi biru langit yang profesional */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-sky-100/90 border-b border-sky-200/80 text-xs py-2 px-4 text-slate-700">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Dynamic Live Rotating Breaking News Ticker */}
          <div 
            className="flex items-center gap-2.5 overflow-hidden text-slate-700 flex-1 max-w-2xl select-none"
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            {/* Live Indicator Badge */}
            <span className="font-extrabold text-[#003366] flex items-center gap-1.5 shrink-0 tracking-wider uppercase text-[11px] bg-white px-2 py-0.5 rounded-full border border-sky-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>Warta Terkini:</span>
            </span>

            {/* Headline Ticker Item (Rotates Automatically, Clickable to open) */}
            {currentBreaking && (
              <div 
                onClick={() => navigateToArticle(currentBreaking.id)}
                className={`flex items-center gap-2 truncate cursor-pointer transition-opacity duration-200 ${
                  isFading ? 'opacity-0' : 'opacity-100'
                }`}
                title="Klik untuk membaca berita ini sekarang"
              >
                <span className="text-[10px] font-bold uppercase text-[#003366] bg-sky-100 px-1.5 py-0.2 rounded shrink-0">
                  {currentBreaking.category}
                </span>
                <span className="truncate text-[12px] font-bold text-slate-800 hover:text-blue-700 transition">
                  {currentBreaking.title}
                </span>
              </div>
            )}

            {/* Ticker Mini Controls & Counter */}
            <div className="hidden sm:flex items-center gap-1 shrink-0 ml-1">
              <span className="text-[10px] font-mono text-slate-500 font-semibold">
                {tickerIndex + 1}/{publishedPosts.length}
              </span>
              <button 
                onClick={handlePrevTicker}
                className="p-0.5 rounded hover:bg-sky-200 text-slate-600 hover:text-black transition"
                title="Berita sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleNextTicker}
                className="p-0.5 rounded hover:bg-sky-200 text-slate-600 hover:text-black transition"
                title="Berita berikutnya"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Real-time Clock & Role Selector */}
          <div className="flex items-center gap-3 ml-auto text-[11px]">
            {/* Live Clock */}
            {currentTime && (
              <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 font-medium border-r border-sky-200 pr-3">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{currentTime}</span>
              </div>
            )}

            {/* Active Role Switcher */}
            <div className="flex items-center gap-1.5 bg-white border border-sky-200 rounded-full px-2.5 py-0.5 shadow-2xs">
              <span className="text-slate-500 font-medium">Role:</span>
              <select 
                value={activeRole} 
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                className="bg-transparent text-[#003366] font-bold focus:outline-none cursor-pointer text-xs"
                title="Ganti peran pengguna (Jurnalis, Editor Berita, Administrator, Pembaca)"
              >
                <option value="pembaca" className="bg-white text-slate-800">Pembaca Publik</option>
                <option value="editor_berita" className="bg-white text-slate-800">Editor Berita</option>
                <option value="jurnalis" className="bg-white text-slate-800">Jurnalis</option>
                <option value="administrator" className="bg-white text-slate-800">Administrator</option>
              </select>
            </div>

            {/* Plugin management menus: HIDDEN for public (pembaca), visible according to role */}
            {activeRole !== 'pembaca' && (
              <div className="flex items-center gap-2">
                {/* Manajemen Jurnal (WRMJ): Jurnalis, Editor, Admin */}
                {(activeRole === 'jurnalis' || activeRole === 'editor_berita' || activeRole === 'administrator') && (
                  <button 
                    onClick={navigateToEditorial}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition text-[11px] font-bold shadow-2xs ${
                      currentView === 'editorial_dashboard' 
                        ? 'bg-[#003366] text-white' 
                        : 'bg-white hover:bg-sky-50 text-[#003366] border border-sky-300'
                    }`}
                    title="Akses Manajemen Jurnal (Editorial Redaksi)"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Manajemen Jurnal</span>
                  </button>
                )}

                {/* Manajemen Iklan (WRMI): Editor Berita, Admin */}
                {(activeRole === 'editor_berita' || activeRole === 'administrator') && (
                  <button 
                    onClick={navigateToAdManager}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition text-[11px] font-bold shadow-2xs ${
                      currentView === 'ad_dashboard' 
                        ? 'bg-[#003366] text-white' 
                        : 'bg-white hover:bg-sky-50 text-amber-900 border border-amber-300'
                    }`}
                    title="Akses Manajemen Iklan (WRMI)"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Manajemen Iklan</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header: Putih bersih dengan aksen gradasi biru langit */}
      <div className="bg-gradient-to-b from-white via-white to-sky-50/50 py-3.5 px-4 border-b border-sky-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <div 
            onClick={navigateToHome} 
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="p-1 rounded-lg group-hover:scale-102 transition duration-200 shrink-0">
              <img 
                src="/assets/aistudio/logo_wartaradar_8803fab4.jpeg" 
                alt="WartaRadar.com" 
                className="h-10 sm:h-12 w-auto object-contain block"
              />
            </div>
            <div className="hidden sm:block border-l-2 border-sky-200 pl-3">
              <p className="text-xs sm:text-sm font-extrabold text-[#003366] tracking-wide flex items-center gap-1.5">
                Radar Informasi Cermat dan Independen
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Portal Jurnalisme Siber Terverifikasi Dewan Pers
              </p>
            </div>
          </div>

          {/* Search bar & Action */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input 
                type="text"
                placeholder="Cari berita, investigasi, topik terkini..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white text-sm text-slate-800 placeholder-slate-400 border border-sky-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-sky-300 shadow-2xs transition"
              />
              <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-2.5" />
            </form>
          </div>

          {/* Podcast Quick CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button 
              onClick={navigateToPodcast}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wide transition shadow-2xs ${
                currentView === 'podcast'
                  ? 'bg-[#003366] text-white border-[#003366]'
                  : 'bg-white hover:bg-sky-50 text-[#003366] border-sky-300'
              }`}
            >
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="hidden sm:inline">WartaRadar</span> Podcast
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-black"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar: Biru korporat elegan & aksen biru langit */}
      <nav className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#002b54] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 sm:gap-2 text-xs uppercase tracking-wider font-semibold py-2">
            <li>
              <button 
                onClick={navigateToHome}
                className={`px-3.5 py-1.5 rounded transition ${
                  currentView === 'home' 
                    ? 'bg-sky-400 text-slate-950 font-black shadow-xs' 
                    : 'text-sky-100 hover:text-white hover:bg-white/10'
                }`}
              >
                Beranda
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button 
                  onClick={() => navigateToCategory(cat)}
                  className={`px-3 py-1.5 rounded transition whitespace-nowrap ${
                    currentView === 'category' && selectedCategory === cat
                      ? 'bg-sky-400 text-slate-950 font-black shadow-xs'
                      : 'text-sky-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={navigateToPodcast}
                className={`px-3 py-1.5 rounded transition flex items-center gap-1 ${
                  currentView === 'podcast' 
                    ? 'bg-sky-400 text-slate-950 font-black shadow-xs' 
                    : 'text-sky-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Podcast</span>
              </button>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-sky-200 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-sky-300" />
            <span>Fokus: RUU Data Keuangan • Pilkada Serentak</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer with white/sky blue gradient theme */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-white to-sky-50 border-b border-sky-200 p-4 space-y-3 shadow-md">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input 
              type="text"
              placeholder="Cari artikel..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white text-sm text-slate-800 placeholder-slate-400 border border-sky-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-[#003366]"
            />
            <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase pt-2">
            <button 
              onClick={() => { navigateToHome(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2.5 rounded-lg bg-[#003366] text-white shadow-2xs"
            >
              Beranda
            </button>
            <button 
              onClick={() => { navigateToPodcast(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2.5 rounded-lg bg-sky-100 text-[#003366] border border-sky-300"
            >
              Podcast
            </button>
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => { navigateToCategory(c); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 text-slate-700 shadow-2xs"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
