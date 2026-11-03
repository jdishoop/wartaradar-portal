import React from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import { 
  TrendingUp, 
  Clock, 
  Eye, 
  ChevronRight, 
  Radio, 
  Flame,
  ArrowRight
} from 'lucide-react';

export const LatestStories: React.FC = () => {
  const { 
    posts, 
    editorialHeadlineId, 
    editorialPickIds, 
    navigateToArticle, 
    navigateToPodcast,
    podcasts,
    playPodcast
  } = useApp();

  const publishedPosts = posts.filter(p => p.status === 'published');

  // Filter out the headline and sidebar picks from the main feed to avoid duplication
  const excludedIds = [editorialHeadlineId, ...editorialPickIds];
  const feedPosts = publishedPosts.filter(p => !excludedIds.includes(p.id));
  const fallbackFeed = feedPosts.length >= 3 ? feedPosts : publishedPosts;

  // Trending posts sorted by views
  const trendingPosts = [...publishedPosts].sort((a, b) => b.views - a.views).slice(0, 5);
  const latestPodcast = podcasts[0];

  return (
    <section className="section-wrap my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed Column (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Berita Terkini & Investigasi</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Diperbarui sepanjang waktu
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fallbackFeed.map((post, index) => (
                <React.Fragment key={post.id}>
                  <article
                    onClick={() => navigateToArticle(post.id)}
                    className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                        <img 
                          src={post.thumbnail} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition duration-400 ease-out" 
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 category-tag text-[10px] py-0.5 px-2">
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

                        <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-5 h-5 rounded-full object-cover" 
                        />
                        <span className="font-medium text-slate-700 truncate max-w-[130px]">
                          {post.author.name}
                        </span>
                      </div>

                      <span className="flex items-center gap-1 text-[#003366] font-bold">
                        <Eye className="w-3.5 h-3.5 text-sky-600" />
                        {post.views.toLocaleString()} pembaca
                      </span>
                    </div>
                  </article>

                  {/* 6. IN-FEED AD PLACEMENT: [wrmi_ad placement="feed"] */}
                  {index === 1 && (
                    <div className="sm:col-span-2">
                      <AdBanner placement="feed" className="my-1" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-7">
            
            {/* Trending / Terpopuler */}
            <div className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#003366]">
                <h3 className="font-extrabold text-[#003366] text-base flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Terpopuler & Trending
                </h3>
                <span className="text-[11px] font-bold text-sky-800 uppercase bg-sky-50 px-2 py-0.5 rounded">
                  24 Jam Terakhir
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {trendingPosts.map((trend, index) => (
                  <div
                    key={trend.id}
                    onClick={() => navigateToArticle(trend.id)}
                    className="group py-3.5 first:pt-1 last:pb-1 cursor-pointer flex gap-3.5 items-start"
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                      index === 0 
                        ? 'bg-[#003366] text-white shadow-xs' 
                        : index === 1 
                        ? 'bg-sky-600 text-white' 
                        : index === 2 
                        ? 'bg-sky-100 text-[#003366] font-bold' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#003366] block mb-0.5">
                        {trend.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                        {trend.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{trend.date.split(',')[0]}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-[#003366] font-semibold">
                          <Eye className="w-2.5 h-2.5 text-sky-600" />
                          {trend.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Ad Placement (wrmi_ad placement="sidebar") */}
            <AdBanner placement="sidebar" />

            {/* Podcast Widget Spotlight */}
            {latestPodcast && (
              <div className="bg-gradient-to-br from-[#0f172a] to-[#16233d] text-white rounded-xl p-5 border border-[#d9b76c]/30 shadow-md">
                <div className="flex items-center justify-between text-xs text-[#d9b76c] font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-4 h-4 animate-pulse" />
                    WartaRadar Podcast
                  </span>
                  <span>{latestPodcast.seriesTitle}</span>
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-white leading-snug mb-2 line-clamp-2">
                  {latestPodcast.title}
                </h4>

                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {latestPodcast.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                  <button 
                    onClick={() => playPodcast(latestPodcast)}
                    className="bg-[#d9b76c] hover:bg-[#b99243] text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition"
                  >
                    <span>Putar Audio</span>
                    <span>({latestPodcast.duration})</span>
                  </button>

                  <button 
                    onClick={navigateToPodcast}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <span>Semua Episode</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
