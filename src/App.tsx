import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { LatestStories } from './components/LatestStories';
import { ArticleView } from './components/ArticleView';
import { PodcastView } from './components/PodcastView';
import { EditorialDashboard } from './components/EditorialDashboard';
import { AdManagerDashboard } from './components/AdManagerDashboard';
import { ArrowLeft, Clock, Eye, Search } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { 
    currentView, 
    selectedCategory, 
    searchQuery, 
    posts, 
    navigateToHome, 
    navigateToArticle 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#edf3fb]">
      {/* 1. TOP BILLBOARD AD PLACEMENT: [wrmi_ad placement="top"] - Posisi Billboard paling diatas panel navigasi */}
      {currentView !== 'editorial_dashboard' && currentView !== 'ad_dashboard' && (
        <div className="w-full bg-slate-900/5 border-b border-sky-200/60 shadow-2xs">
          <AdBanner placement="top" className="my-1.5" />
        </div>
      )}

      <Header />

      <main className="flex-1">
        {/* 2. HEADER AD PLACEMENT: [wrmi_ad placement="header"] */}
        {currentView !== 'editorial_dashboard' && currentView !== 'ad_dashboard' && (
          <AdBanner placement="header" className="mt-2 mb-3" />
        )}

        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <>
            <HeroSection />
            {/* 3. HERO AD PLACEMENT: [wrmi_ad placement="hero"] */}
            <AdBanner placement="hero" />

            <CategorySection />
            {/* 4. MID CONTENT AD PLACEMENT: [wrmi_ad placement="mid_content"] */}
            <AdBanner placement="mid_content" />

            <LatestStories />
            {/* 5. FOOTER AD PLACEMENT: [wrmi_ad placement="footer"] */}
            <AdBanner placement="footer" />
          </>
        )}

        {/* VIEW 2: ARTICLE SINGLE */}
        {currentView === 'article' && <ArticleView />}

        {/* VIEW 3: PODCAST PAGE */}
        {currentView === 'podcast' && <PodcastView />}

        {/* VIEW 4: EDITORIAL DASHBOARD (WRMJ) */}
        {currentView === 'editorial_dashboard' && <EditorialDashboard />}

        {/* VIEW 5: AD MANAGER DASHBOARD (WRMI) */}
        {currentView === 'ad_dashboard' && <AdManagerDashboard />}

        {/* VIEW 6: CATEGORY ARCHIVE */}
        {currentView === 'category' && (
          <div className="py-8 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-300">
              <div>
                <button
                  onClick={navigateToHome}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-black mb-2 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Beranda</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Rubrik: {selectedCategory}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Arsip berita, liputan mendalam, dan analisis faktual kategori {selectedCategory}.
                </p>
              </div>
              <span className="category-tag text-xs px-3 py-1">
                {selectedCategory}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts
                .filter(p => p.category === selectedCategory && p.status === 'published')
                .map(post => (
                  <article
                    key={post.id}
                    onClick={() => navigateToArticle(post.id)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-16/10 overflow-hidden bg-slate-900 relative">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-104 transition duration-300" 
                        />
                        <span className="absolute top-2.5 left-2.5 category-tag text-[10px] py-0.5 px-2">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#b99243] transition mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Oleh {post.author.name}</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        )}

        {/* VIEW 7: SEARCH RESULTS */}
        {currentView === 'search' && (
          <div className="py-8 max-w-7xl mx-auto px-4">
            <div className="pb-4 mb-6 border-b border-slate-300">
              <button
                onClick={navigateToHome}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-black mb-2 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Search className="w-6 h-6 text-[#d9b76c]" />
                <span>Hasil Pencarian: "{searchQuery}"</span>
              </h1>
            </div>

            {posts.filter(p => 
              p.status === 'published' && (
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
              )
            ).length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500 text-sm">
                  Tidak ditemukan artikel yang sesuai dengan kata kunci "{searchQuery}".
                </p>
                <button
                  onClick={navigateToHome}
                  className="mt-4 px-4 py-2 bg-[#0f172a] text-white text-xs font-bold rounded-lg"
                >
                  Kembali ke Beranda
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts
                  .filter(p => 
                    p.status === 'published' && (
                      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
                    )
                  )
                  .map(post => (
                    <article
                      key={post.id}
                      onClick={() => navigateToArticle(post.id)}
                      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-16/10 overflow-hidden bg-slate-900 relative">
                          <img 
                            src={post.thumbnail} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-104 transition duration-300" 
                          />
                          <span className="absolute top-2.5 left-2.5 category-tag text-[10px] py-0.5 px-2">
                            {post.category}
                          </span>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#b99243] transition mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </article>
                  ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
