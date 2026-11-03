import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Video, 
  Image as ImageIcon, 
  Clock, 
  Eye, 
  Sparkles, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Post } from '../types';

export const HeroSection: React.FC = () => {
  const { posts, editorialHeadlineId, editorialPickIds, navigateToArticle } = useApp();

  const publishedPosts = posts.filter(p => p.status === 'published');

  // Gather 5 top headline stories:
  // First prioritize the assigned headline, then editor picks, then latest published stories up to 5
  const headlinePost = publishedPosts.find(p => p.id === editorialHeadlineId);
  const editorPickPosts = publishedPosts.filter(p => p.id !== editorialHeadlineId && editorialPickIds.includes(p.id));
  const otherPosts = publishedPosts.filter(p => p.id !== editorialHeadlineId && !editorialPickIds.includes(p.id));

  const rawHeadlines = [
    ...(headlinePost ? [headlinePost] : []),
    ...editorPickPosts,
    ...otherPosts
  ];

  // Remove duplicates and ensure exactly 5 (or fewer if total published is less)
  const top5Headlines: Post[] = [];
  const seenIds = new Set<number>();
  for (const post of rawHeadlines) {
    if (!seenIds.has(post.id)) {
      seenIds.add(post.id);
      top5Headlines.push(post);
      if (top5Headlines.length === 5) break;
    }
  }

  // Fallback if less than 5
  const slides = top5Headlines.length > 0 ? top5Headlines : publishedPosts.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isPausedAutoplay, setIsPausedAutoplay] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentSlide = slides[currentIndex] || slides[0];

  // Next and Prev handlers
  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingVideo(false);
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingVideo(false);
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingVideo(false);
    setCurrentIndex(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (slides.length <= 1 || isPausedAutoplay || isPlayingVideo) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, isPausedAutoplay, isPlayingVideo, currentIndex]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 50) {
      handleNext(); // swipe left -> go next
    } else if (diff < -50) {
      handlePrev(); // swipe right -> go prev
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  if (!currentSlide) return null;

  // Sidebar stories: take published stories not currently on the active slide
  const sidebarStories = publishedPosts
    .filter(p => p.id !== currentSlide.id)
    .slice(0, 2);

  return (
    <section className="hero-news my-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Title & Header Ticker */}
        <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-[#d9b76c]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d9b76c]" />
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-900">
              Berita Utama & Pilihan Redaksi
            </h2>
          </div>

          {/* Slider Counter & Indicator */}
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300">
              <span className="text-[#b99243] font-black">{currentIndex + 1}</span> dari {slides.length} Berita Utama
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={(e) => handlePrev(e)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-[#d9b76c] text-slate-800 hover:text-black flex items-center justify-center transition shadow-xs"
                title="Geser ke kiri (Sebelumnya)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleNext(e)}
                className="w-7 h-7 rounded-full bg-slate-200 hover:bg-[#d9b76c] text-slate-800 hover:text-black flex items-center justify-center transition shadow-xs"
                title="Geser ke kanan (Berikutnya)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main 5-Story Slider (8 cols) */}
          <div 
            className="lg:col-span-8 flex flex-col relative select-none"
            onMouseEnter={() => setIsPausedAutoplay(true)}
            onMouseLeave={() => setIsPausedAutoplay(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <article 
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
            >
              {/* Media Container: Gambar / Vidio */}
              <div className="relative aspect-16/9 sm:aspect-21/10 overflow-hidden bg-slate-950">
                {currentSlide.mediaType === 'video' && isPlayingVideo && currentSlide.videoUrl ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video
                      ref={videoRef}
                      src={currentSlide.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingVideo(false);
                      }}
                      className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white text-xs px-2.5 py-1 rounded-md z-20 backdrop-blur-xs flex items-center gap-1"
                    >
                      <span>Tutup Video</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <img 
                      src={currentSlide.thumbnail} 
                      alt={currentSlide.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

                    {/* Media Type Badges & Category */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                      <span className="category-tag shadow-md font-bold text-xs px-3 py-1">
                        {currentSlide.category}
                      </span>

                      {currentSlide.mediaType === 'video' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-600 text-white font-bold text-[11px] shadow-md uppercase tracking-wider animate-pulse">
                          <Video className="w-3.5 h-3.5" />
                          <span>Video Liputan</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 text-slate-200 font-semibold text-[11px] shadow-md backdrop-blur-xs">
                          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                          <span>Liputan Foto</span>
                        </span>
                      )}

                      <span className="badge-editorial bg-amber-400 text-black border-amber-300 font-black text-[11px] px-2.5 py-1 shadow-md">
                        <Award className="w-3 h-3 mr-1" />
                        Pilihan Redaksi #{currentIndex + 1}
                      </span>
                    </div>

                    {/* Video Play Overlay Button (if story has video) */}
                    {currentSlide.mediaType === 'video' && currentSlide.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlayingVideo(true);
                          }}
                          className="group/btn bg-[#d9b76c] hover:bg-[#b99243] text-black font-extrabold px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                        >
                          <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center">
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          </div>
                          <span className="text-xs uppercase tracking-wider">Putar Video Berita</span>
                        </button>
                      </div>
                    )}

                    {/* Left & Right Carousel Arrow Controls */}
                    <button
                      onClick={(e) => handlePrev(e)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d9b76c] text-white hover:text-black flex items-center justify-center transition backdrop-blur-xs shadow-lg transform active:scale-90"
                      title="Geser ke kiri (Sebelumnya)"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={(e) => handleNext(e)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d9b76c] text-white hover:text-black flex items-center justify-center transition backdrop-blur-xs shadow-lg transform active:scale-90"
                      title="Geser ke kanan (Berikutnya)"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Headline Title Overlay on Media */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 cursor-pointer" onClick={() => navigateToArticle(currentSlide.id)}>
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight group-hover:text-[#d9b76c] transition-colors drop-shadow-md">
                        {currentSlide.title}
                      </h1>
                    </div>
                  </>
                )}
              </div>

              {/* Story Body & Lead */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-2 mb-4">
                    {currentSlide.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={currentSlide.author.avatar} 
                      alt={currentSlide.author.name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-amber-400/50" 
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">{currentSlide.author.name}</span>
                      <span className="text-[10px] text-slate-400">{currentSlide.author.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {currentSlide.date}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {currentSlide.views.toLocaleString()}
                    </span>

                    <button
                      onClick={() => navigateToArticle(currentSlide.id)}
                      className="bg-[#0f172a] hover:bg-[#16233d] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition ml-1"
                    >
                      <span>Baca Lengkap</span>
                      <ArrowRight className="w-3 h-3 text-[#d9b76c]" />
                    </button>
                  </div>
                </div>

                {/* 5-Slide Interactive Thumbnail Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                    5 Berita Utama:
                  </span>
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={(e) => handleSelectSlide(idx, e)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition shrink-0 border ${
                        idx === currentIndex
                          ? 'bg-amber-50/80 border-[#d9b76c] ring-1 ring-[#d9b76c]'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                        idx === currentIndex ? 'bg-[#d9b76c] text-black' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-[11px] font-bold truncate max-w-[110px] ${
                        idx === currentIndex ? 'text-amber-950' : 'text-slate-600'
                      }`}>
                        {slide.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar Editorial Picks Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-1 border-b-2 border-[#d9b76c]">
              <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2 text-base">
                <Award className="w-4 h-4 text-[#d9b76c]" />
                Sorotan Redaksi Lainnya
              </h3>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Pilihan Editor
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {sidebarStories.map((story) => (
                <article
                  key={story.id}
                  onClick={() => navigateToArticle(story.id)}
                  className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col sm:flex-row lg:flex-col flex-1"
                >
                  <div className="relative aspect-16/10 sm:w-2/5 lg:w-full overflow-hidden bg-slate-900 shrink-0">
                    <img 
                      src={story.thumbnail} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition duration-300" 
                    />
                    <span className="absolute top-2.5 left-2.5 category-tag text-[9px] py-0.5 px-2">
                      {story.category}
                    </span>
                    {story.mediaType === 'video' && (
                      <span className="absolute bottom-2.5 right-2.5 bg-red-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>Video</span>
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="badge-editorial text-[9px] py-0.5 px-1.5">
                          Pilihan Redaksi
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {story.readTime}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#b99243] transition-colors line-clamp-2">
                        {story.title}
                      </h4>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{story.author.name}</span>
                      <span>{story.date.split(',')[0]}</span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Quick Jump / Slider helper banner */}
              <div className="p-3.5 bg-gradient-to-r from-slate-900 to-[#16233d] text-white rounded-xl border border-[#d9b76c]/30 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#d9b76c] font-bold uppercase tracking-wider block">
                    Geser Berita Utama
                  </span>
                  <p className="text-xs text-slate-200">
                    Gunakan panah kiri/kanan atau usap layar untuk menjelajahi 5 berita utama.
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={handlePrev}
                    className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#d9b76c] hover:text-black flex items-center justify-center transition text-slate-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-7 h-7 rounded-full bg-slate-800 hover:bg-[#d9b76c] hover:text-black flex items-center justify-center transition text-slate-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
