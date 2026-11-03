import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Share2, 
  Heart, 
  Check, 
  MessageSquare, 
  Send, 
  Sparkles, 
  ChevronRight,
  Copy,
  ExternalLink,
  Users,
  Image as ImageIcon,
  X,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const ArticleView: React.FC = () => {
  const { 
    posts, 
    selectedArticleId, 
    navigateToHome, 
    navigateToCategory, 
    navigateToArticle,
    incrementArticleView
  } = useApp();

  const article = posts.find(p => p.id === selectedArticleId) || posts[0];

  // 1. DYNAMIC VIEWS & LIVE READERS (Bukan Statis)
  const [dynamicViews, setDynamicViews] = useState(article ? article.views : 1000);
  const [liveReaders, setLiveReaders] = useState(24);
  const [hasNewViewNotification, setHasNewViewNotification] = useState(false);

  // Likes and comments state
  const [likes, setLikes] = useState(54);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ name: string; time: string; text: string }[]>([
    {
      name: 'Dr. Hendra Wijaya',
      time: '2 jam lalu',
      text: 'Analisis yang sangat komprehensif dan objektif. WartaRadar konsisten menghadirkan data akurat untuk publik.'
    },
    {
      name: 'Siti Rahmawati',
      time: '4 jam lalu',
      text: 'Semoga kebijakan ini dapat segera dirasakan manfaatnya secara merata hingga pelosok daerah.'
    }
  ]);

  // Synchronize initial views when article changes
  useEffect(() => {
    if (article) {
      setDynamicViews(article.views);
      // Random initial live readers 18 to 36
      setLiveReaders(Math.floor(Math.random() * 18) + 18);
    }
  }, [article?.id]);

  // Live reader dynamic simulation: periodically increments views & organic fluctuation
  useEffect(() => {
    if (!article) return;

    const interval = setInterval(() => {
      // Fluctuate active live readers
      setLiveReaders(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(12, Math.min(65, prev + delta));
      });

      // Organically increment views by 1 or 2
      const incrementBy = Math.floor(Math.random() * 2) + 1;
      setDynamicViews(prev => prev + incrementBy);
      incrementArticleView(article.id, incrementBy);

      // Trigger subtle visual pulse
      setHasNewViewNotification(true);
      setTimeout(() => setHasNewViewNotification(false), 2500);
    }, 9000);

    return () => clearInterval(interval);
  }, [article?.id]);

  if (!article) return null;

  // Auto-generated article URL & shortcuts
  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/#berita-${article.slug}`
    : `https://wartaradar.com/berita/${article.slug}`;

  const relatedArticles = posts
    .filter(p => p.id !== article.id && (p.category === article.category || p.status === 'published'))
    .slice(0, 3);

  // 2. SHORTCUT BAGIKAN BERITA OTOMATIS
  const handleShareWhatsApp = () => {
    const text = `*${article.title}*\n\n${article.excerpt}\n\n🔗 *Baca selengkapnya di WartaRadar:*\n${articleUrl}\n\n🖼️ *Gambar Liputan:* ${article.thumbnail}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `${article.title} - WartaRadar`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(articleUrl)}&hashtags=${article.category},WartaRadar`, '_blank');
  };

  const handleShareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`, '_blank');
  };

  // Copy full shortcut card (text + image + link)
  const handleCopyFullShortcut = () => {
    const fullShortcut = `📰 ${article.title.toUpperCase()}\n\n${article.excerpt}\n\n🔗 Tautan Berita Otomatis: ${articleUrl}\n🖼️ Gambar Liputan: ${article.thumbnail}\n\n📌 Sumber: WartaRadar.com - Radar Informasi Cermat dan Independen`;
    navigator.clipboard.writeText(fullShortcut);
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 3000);
  };

  const handleCopyOnlyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments(prev => [
        {
          name: 'Pembaca WartaRadar',
          time: 'Baru saja',
          text: commentText.trim()
        },
        ...prev
      ]);
      setCommentText('');
    }
  };

  return (
    <article className="article-page py-6">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-6 pb-3 border-b border-sky-200">
          <button 
            onClick={navigateToHome}
            className="flex items-center gap-1.5 text-[#003366] hover:text-blue-800 font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="cursor-pointer hover:text-slate-600" onClick={navigateToHome}>Beranda</span>
            <ChevronRight className="w-3 h-3" />
            <span 
              className="cursor-pointer text-[#003366] font-bold hover:underline"
              onClick={() => navigateToCategory(article.category)}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="category-tag text-xs py-1 px-3 bg-[#003366] text-white font-bold rounded">
              {article.category}
            </span>
            {article.isEditorialHeadline && (
              <span className="badge-editorial text-xs py-0.5 px-2 bg-amber-100 text-amber-900 border-amber-300">
                <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
                Headline Pilihan Redaksi
              </span>
            )}
            
            {/* Live active readers indicator (Bukan Statis) */}
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{liveReaders} Orang sedang membaca saat ini</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6">
            {article.excerpt}
          </p>

          {/* Author metadata & DYNAMIC LIVE VIEW COUNT */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-sky-100 shadow-xs">
            <div className="flex items-center gap-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#003366]" 
              />
              <div>
                <span className="font-bold text-slate-900 text-sm block">
                  {article.author.name}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {article.author.role} • {article.date}
                </span>
              </div>
            </div>

            {/* Dynamic View Stats (Real-time Live Increment) */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTime}
              </span>

              {/* Dynamic Views Counter */}
              <div className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-[#003366] font-bold">
                <Eye className="w-4 h-4 text-sky-600" />
                <span>{dynamicViews.toLocaleString()} pembaca</span>
                {hasNewViewNotification && (
                  <span className="absolute -top-3 -right-2 bg-emerald-600 text-white text-[9px] px-1 rounded-full animate-bounce font-black">
                    +1 live
                  </span>
                )}
              </div>

              {/* Quick Share Card Trigger Button */}
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#003366] text-white hover:bg-[#002b54] font-bold transition shadow-2xs"
                title="Buka menu shortcut gambar dan link otomatis"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan Berita</span>
              </button>
            </div>
          </div>
        </header>

        {/* 2. SHORTCUT BAGIKAN GAMBAR & LINK OTOMATIS (BANNER CEPAT) */}
        <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-xl p-4 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2.5 border-b border-sky-200/70">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[#003366]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#003366]">
                Shortcut Bagikan Gambar & Tautan Otomatis
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              1-Klik langsung bagikan lengkap dengan gambar & tautan
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition"
            >
              <span>WhatsApp</span>
            </button>

            {/* Facebook */}
            <button
              onClick={handleShareFacebook}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition"
            >
              <span>Facebook</span>
            </button>

            {/* X / Twitter */}
            <button
              onClick={handleShareTwitter}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-2xs transition"
            >
              <span>X (Twitter)</span>
            </button>

            {/* Telegram */}
            <button
              onClick={handleShareTelegram}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-2xs transition"
            >
              <span>Telegram</span>
            </button>

            {/* Shortcut Kartu Gambar & Link Modal */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-2xs transition"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Kartu Gambar</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden shadow-md mb-8 bg-slate-900">
          <img 
            src={article.thumbnail} 
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover" 
          />
          <div className="p-3 text-[11px] text-slate-400 bg-slate-900/95 italic flex justify-between items-center">
            <span>Dokumentasi Visual WartaRadar.com / Tim Liputan Lapangan</span>
            <span className="text-slate-300">Hak Cipta Dilindungi</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-sky-100 shadow-xs mb-8">
          <div 
            className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4 text-base sm:text-lg font-serif-news"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* In-Article Ad Placement (wrmi_ad placement="article") */}
          <div className="my-8 not-prose">
            <AdBanner placement="article" />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                Topik Terkait:
              </span>
              {article.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs bg-sky-50 text-[#003366] hover:bg-sky-100 border border-sky-200 px-3 py-1 rounded-full cursor-pointer transition font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interaction Bar & Quick Shortcut Copy */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition shadow-2xs ${
                hasLiked ? 'bg-red-50 text-red-600 border-red-300' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-red-600' : ''}`} />
              <span>{likes} Apresiasi Pembaca</span>
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopyOnlyLink}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-sky-300 bg-sky-50/70 hover:bg-sky-100 text-[#003366] text-xs font-bold transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Tautan Tersalin!' : 'Salin Tautan'}</span>
              </button>

              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#003366] hover:bg-[#002b54] text-white text-xs font-bold transition shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Shortcut Gambar & Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODAL: SHORTCUT KARTU GAMBAR DAN LINK BERITA OTOMATIS */}
        {isShareModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-sky-200 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-sky-50 via-white to-sky-100 px-5 py-3.5 border-b border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#003366]" />
                  <h3 className="font-extrabold text-sm text-[#003366] tracking-tight">
                    Shortcut Gambar & Tautan Berita Otomatis
                  </h3>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Visual Share Card */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600">
                  Pratinjau kartu berita dengan gambar, ringkasan, dan tautan otomatis siap dibagikan ke status medsos atau grup percakapan:
                </p>

                {/* The Generated Card Mockup */}
                <div className="rounded-xl border-2 border-sky-200 overflow-hidden shadow-sm bg-gradient-to-b from-white to-sky-50">
                  {/* Brand Header */}
                  <div className="p-3 bg-white border-b border-sky-100 flex items-center justify-between">
                    <img 
                      src="/assets/aistudio/logo_wartaradar_8803fab4.jpeg" 
                      alt="WartaRadar.com" 
                      className="h-7 w-auto object-contain"
                    />
                    <span className="text-[10px] font-bold text-[#003366] bg-sky-100 px-2 py-0.5 rounded">
                      Radar Informasi Cermat dan Independen
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="aspect-16/9 bg-slate-900 relative">
                    <img 
                      src={article.thumbnail} 
                      alt={article.title}
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-2 left-2 category-tag text-[9px] py-0.5 px-2 bg-[#003366] text-white">
                      {article.category}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="p-4 bg-white">
                    <h4 className="font-extrabold text-slate-900 text-sm leading-snug mb-1.5">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {article.excerpt}
                    </p>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2 font-mono">
                      <span className="truncate max-w-[280px] text-blue-700 font-semibold">{articleUrl}</span>
                      <span>WartaRadar</span>
                    </div>
                  </div>
                </div>

                {/* Automatic Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleCopyFullShortcut}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#003366] hover:bg-[#002b54] text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs"
                  >
                    {copiedCard ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCard ? 'Format Lengkap (Teks + Gambar + Link) Berhasil Disalin!' : 'Salin Shortcut Lengkap (Teks + Gambar + Link)'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleShareWhatsApp}
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Kirim ke WhatsApp</span>
                    </button>

                    <button
                      onClick={handleCopyOnlyLink}
                      className="py-2 px-3 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#003366] border border-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedLink ? 'Tautan Tersalin' : 'Salin Link Saja'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-sky-100 shadow-xs mb-8">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-[#003366]" />
            Komentar & Diskusi Publik ({comments.length})
          </h3>

          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              rows={3}
              placeholder="Tuliskan tanggapan atau analisis Anda dengan bijak..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full text-sm p-3.5 border border-sky-200 rounded-xl focus:outline-none focus:border-[#003366] transition"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-[11px] text-slate-400">
                Komentar dimoderasi sesuai standar kode etik redaksi.
              </span>
              <button 
                type="submit"
                disabled={!commentText.trim()}
                className="bg-[#003366] hover:bg-[#002b54] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Komentar
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((c, i) => (
              <div key={i} className="p-4 rounded-lg bg-sky-50/50 border border-sky-100">
                <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                  <span>{c.name}</span>
                  <span className="text-slate-400 font-normal">{c.time}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Stories */}
        <div className="my-8">
          <h3 className="text-lg font-extrabold text-[#003366] mb-4 pb-2 border-b-2 border-sky-200">
            Liputan Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map(rel => (
              <div 
                key={rel.id}
                onClick={() => navigateToArticle(rel.id)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-sky-100 hover:border-sky-300 hover:shadow-md transition"
              >
                <div className="aspect-16/10 overflow-hidden bg-slate-900">
                  <img 
                    src={rel.thumbnail} 
                    alt={rel.title} 
                    className="w-full h-full object-cover group-hover:scale-104 transition" 
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] uppercase font-bold text-[#003366]">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 line-clamp-2 mt-1">
                    {rel.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
