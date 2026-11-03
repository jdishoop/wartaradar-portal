import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdPlacementType } from '../types';
import { ExternalLink, Info, Sparkles, Smartphone, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface AdBannerProps {
  placement: AdPlacementType;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const { ads, trackAdImpression, trackAdClick, activeRole, navigateToAdManager } = useApp();
  const trackedRef = useRef(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Find active ad for this placement slot
  const ad = ads.find(a => a.placement === placement && a.active);

  useEffect(() => {
    if (ad && !trackedRef.current) {
      trackAdImpression(ad.id);
      trackedRef.current = true;
    }
  }, [ad?.id]);

  const handleAdClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (ad) {
      trackAdClick(ad.id);
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!ad) {
    if (activeRole === 'administrator' || activeRole === 'editor_berita') {
      return (
        <div className={`ad-slot-box my-4 p-3 rounded text-center text-xs text-slate-500 bg-slate-100/70 border border-dashed border-slate-300 ${className}`}>
          <div className="flex items-center justify-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Slot Iklan WRMI [{placement}] - Belum ada kampanye aktif</span>
          </div>
          <button 
            onClick={navigateToAdManager}
            className="mt-1 text-xs text-blue-600 hover:underline font-semibold"
          >
            Atur di Manajemen Iklan &rarr;
          </button>
        </div>
      );
    }
    return null;
  }

  const isSidebar = placement === 'sidebar';
  const isTop = placement === 'top';
  const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0.0';

  const getImageHeight = () => {
    if (isSidebar) return 'h-48 sm:h-56';
    if (isTop) return 'h-32 sm:h-44 md:h-52 lg:h-56';
    return 'h-24 sm:h-36 lg:h-44';
  };

  // If top ad is collapsed by reader
  if (isTop && isCollapsed) {
    return (
      <div className={`wrmi-ad-container py-1 bg-slate-900 text-white ${className}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded">
              IKLAN
            </span>
            <span className="text-slate-300 truncate max-w-md">
              {ad.title}
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-1 text-[11px] text-sky-300 hover:text-white font-medium transition-colors"
          >
            <span>Tampilkan Banner</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const bannerContent = (
    <div className={`relative group rounded-xl overflow-hidden shadow-md transition-all ${
      isTop 
        ? 'border-2 border-sky-400/40 bg-gradient-to-r from-[#03152d] via-[#052144] to-[#03152d]' 
        : 'border border-slate-200/90 bg-white shadow-xs'
    }`}>
      {/* Ad Header Label */}
      <div className={`px-3 py-1 text-[10px] flex justify-between items-center ${
        isTop 
          ? 'bg-slate-950/70 text-slate-300 border-b border-sky-900/60' 
          : 'bg-slate-100/90 text-slate-500 border-b border-slate-200/60'
      }`}>
        <div className="flex items-center gap-2 font-semibold">
          <span className={`uppercase tracking-wider ${isTop ? 'text-amber-400' : 'text-slate-700'}`}>
            {isTop ? '★ Iklan Billboard Utama' : 'Sponsor Mitra'}
          </span>
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase font-mono ${
            isTop 
              ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' 
              : 'bg-sky-100 text-[#003366]'
          }`}>
            {isTop ? 'WRMI TOP BILLBOARD' : placement}
          </span>
          {isTop && (
            <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-normal">
              <CheckCircle2 className="w-3 h-3" /> Promosi Resmi WartaRadar Media
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {(activeRole === 'administrator' || activeRole === 'editor_berita') && (
            <button 
              onClick={navigateToAdManager}
              className="text-amber-400 hover:text-amber-300 font-mono text-[10px] hidden sm:inline underline"
              title="Klik untuk membuka WRMI Iklan"
            >
              WRMI: {ad.impressions.toLocaleString()} Impr • {ad.clicks.toLocaleString()} Clicks ({ctr}% CTR)
            </button>
          )}
          <span className={`flex items-center gap-0.5 ${isTop ? 'text-slate-400' : 'text-slate-400'}`}>
            Iklan <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </span>
          {isTop && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(true);
              }}
              title="Ciutkan Billboard"
              className="ml-1 text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/10 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Ad Creative Link */}
      <a 
        href={ad.targetUrl} 
        onClick={handleAdClick}
        target="_blank" 
        rel="noopener noreferrer"
        className="block overflow-hidden relative cursor-pointer"
        title={`${ad.title} - Klik untuk membuka penawaran`}
      >
        <div className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          <img 
            src={ad.imageUrl} 
            alt={ad.altText || ad.title}
            className={`w-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-300 ${getImageHeight()}`} 
            loading="lazy"
          />

          {/* Special interactive badge and overlay for Top WartaRadar Billboard */}
          {isTop && (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-3 sm:p-4 pointer-events-none">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                      <Sparkles className="w-3 h-3 text-slate-950" />
                      NEW APP & E-PAPER
                    </span>
                    <span className="hidden sm:inline-block text-xs text-sky-200 font-medium">
                      Jurnalisme Cermat & Independen
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xs sm:text-base leading-tight drop-shadow-md">
                    {ad.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-all transform group-hover:scale-105">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Unduh Sekarang</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {!isTop && (
            <div className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-sm">
              <span className="font-semibold">Kunjungi Penawaran</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </div>
          )}
        </div>
      </a>
    </div>
  );

  return (
    <div className={`wrmi-ad-container my-2 ${className}`}>
      {isSidebar ? (
        bannerContent
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          {bannerContent}
        </div>
      )}
    </div>
  );
};

