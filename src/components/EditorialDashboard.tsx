import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Send, 
  Sparkles, 
  Award, 
  Trash2, 
  Eye, 
  User, 
  Filter, 
  PlusCircle, 
  Settings,
  ShieldCheck,
  Check,
  Star,
  SlidersHorizontal,
  ExternalLink,
  RefreshCw,
  Database,
  Wifi,
  Globe,
  Tag,
  ArrowRight
} from 'lucide-react';
import { NewsCategory, ArticleStatus, Post } from '../types';

export const EditorialDashboard: React.FC = () => {
  const { 
    posts, 
    activeRole, 
    setActiveRole,
    editorialHeadlineId, 
    editorialPickIds, 
    setHeadline, 
    toggleEditorialPick, 
    submitArticle, 
    updateArticleStatus, 
    deleteArticle,
    navigateToArticle,
    navigateToHome,
    categories,
    addCategory,
    apiEndpoint,
    setApiEndpoint,
    isSyncing,
    syncWithExternalApi,
    seedSampleLiveWartaRadarData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'review' | 'write' | 'homepage' | 'all' | 'sync'>('review');

  // Form states for writing new article
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NewsCategory>('Nasional');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [showAddCategoryInput, setShowAddCategoryInput] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80');
  const [tagsInput, setTagsInput] = useState('');

  // Sync state
  const [syncEndpointInput, setSyncEndpointInput] = useState(apiEndpoint);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ text: string; isError: boolean } | null>(null);
  // Revision modal state
  const [revisingPostId, setRevisingPostId] = useState<number | null>(null);
  const [revisionNoteInput, setRevisionNoteInput] = useState('');
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // Lists
  const inReviewPosts = posts.filter(p => p.status === 'menunggu_review');
  const revisionPosts = posts.filter(p => p.status === 'perlu_revisi');
  const publishedPosts = posts.filter(p => p.status === 'published');
  const draftPosts = posts.filter(p => p.status === 'draft');

  const handleWriteSubmit = (e: React.FormEvent, status: ArticleStatus = 'menunggu_review') => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    submitArticle({
      title,
      category,
      excerpt: excerpt || title.substring(0, 120),
      content,
      thumbnail,
      status,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    });

    setTitle('');
    setExcerpt('');
    setContent('');
    setTagsInput('');
    setSubmissionFeedback(status === 'published' ? 'Artikel berhasil diterbitkan!' : 'Artikel berhasil diajukan ke antrean review redaksi!');
    setTimeout(() => setSubmissionFeedback(null), 3000);
    setActiveTab(status === 'published' ? 'all' : 'review');
  };

  const handleApprovePublish = (id: number) => {
    updateArticleStatus(id, 'published');
  };

  const handleSendRevision = (id: number) => {
    if (!revisionNoteInput.trim()) return;
    updateArticleStatus(id, 'perlu_revisi', revisionNoteInput.trim());
    setRevisingPostId(null);
    setRevisionNoteInput('');
  };

  return (
    <div className="editorial-dashboard-wrap py-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Header Card */}
        <div className="bg-[#0f172a] text-white rounded-2xl p-6 sm:p-8 border-b-4 border-[#d9b76c] shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#d9b76c] tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Plugin: WartaRadar Manajemen Jurnal (WRMJ)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ruang Kerja Redaksi & Editorial
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Alur kerja penerbitan berita bertingkat: Draf &rarr; Menunggu Review &rarr; Perlu Revisi &rarr; Terbit
              </p>
            </div>

            {/* Quick Role & Permission Indicator */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d9b76c]/20 border border-[#d9b76c] flex items-center justify-center text-[#d9b76c]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Peran Aktif Saat Ini
                </span>
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value as any)}
                  className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="editor_berita" className="bg-slate-900">Editor Berita (Verifikasi & Terbitkan)</option>
                  <option value="jurnalis" className="bg-slate-900">Jurnalis (Tulis & Ajukan Draf)</option>
                  <option value="administrator" className="bg-slate-900">Administrator (Akses Penuh)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Menunggu Review</span>
              <div className="text-xl font-extrabold text-amber-400 mt-0.5">{inReviewPosts.length}</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Perlu Revisi</span>
              <div className="text-xl font-extrabold text-red-400 mt-0.5">{revisionPosts.length}</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Telah Terbit</span>
              <div className="text-xl font-extrabold text-emerald-400 mt-0.5">{publishedPosts.length}</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400">Total Pembaca</span>
              <div className="text-xl font-extrabold text-[#d9b76c] mt-0.5">
                {posts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {submissionFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{submissionFeedback}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'review'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Antrean Review & Revisi</span>
            <span className="ml-1 bg-amber-500/20 text-amber-800 text-[11px] px-1.5 py-0.2 rounded-full font-bold">
              {inReviewPosts.length + revisionPosts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('write')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'write'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#d9b76c]" />
            <span>Tulis / Ajukan Berita Baru</span>
          </button>

          {(activeRole === 'editor_berita' || activeRole === 'administrator') && (
            <button
              onClick={() => setActiveTab('homepage')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'homepage'
                  ? 'bg-[#0f172a] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Award className="w-4 h-4 text-[#d9b76c]" />
              <span>5 Berita Utama & Sorotan Redaksi</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'all'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Semua Naskah ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'sync'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Sinkronisasi wartaradar.com (REST API)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>

        {/* TAB 1: Antrean Review & Revisi */}
        {activeTab === 'review' && (
          <div className="space-y-6">
            
            {/* Menunggu Review */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-amber-500" />
                <span>Naskah Menunggu Pemeriksaan Editor ({inReviewPosts.length})</span>
              </h3>

              {inReviewPosts.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Tidak ada naskah yang menunggu review saat ini. Semua naskah telah diproses!
                </div>
              ) : (
                <div className="space-y-4">
                  {inReviewPosts.map(post => (
                    <div key={post.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="category-tag text-[10px] py-0.5 px-2">
                            {post.category}
                          </span>
                          <span className="text-[11px] font-semibold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                            Menunggu Review
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Diajukan oleh: <strong className="text-slate-800">{post.author.name}</strong> • {post.submittedAt || post.date}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Editor action buttons */}
                        {(activeRole === 'editor_berita' || activeRole === 'administrator') ? (
                          <>
                            <button
                              onClick={() => handleApprovePublish(post.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition shadow-xs"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Setujui & Terbitkan</span>
                            </button>

                            <button
                              onClick={() => setRevisingPostId(post.id)}
                              className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1 transition"
                            >
                              <AlertCircle className="w-4 h-4 text-amber-700" />
                              <span>Minta Revisi</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-slate-400 italic">
                            Hanya Editor Berita yang dapat menyetujui.
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Perlu Revisi */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>Naskah Perlu Revisi ({revisionPosts.length})</span>
              </h3>

              {revisionPosts.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Tidak ada naskah yang sedang dalam tahap revisi.
                </div>
              ) : (
                <div className="space-y-4">
                  {revisionPosts.map(post => (
                    <div key={post.id} className="p-4 rounded-xl border border-red-200 bg-red-50/30">
                      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="category-tag text-[10px] py-0.5 px-2">
                              {post.category}
                            </span>
                            <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                              Perlu Revisi
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Penulis: <strong>{post.author.name}</strong>
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                            {post.title}
                          </h4>
                          
                          {/* Catatan Editor */}
                          <div className="mt-2 p-3 bg-red-100/60 border border-red-200 rounded-lg text-xs text-red-900 font-medium">
                            <strong className="block text-red-950 mb-0.5 font-bold">Catatan dari Redaktur / Editor:</strong>
                            {post.revisionNotes || 'Mohon lengkapi konfirmasi fakta narasumber dan kutipan langsung.'}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => updateArticleStatus(post.id, 'menunggu_review')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Ajukan Ulang Hasil Revisi</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Revision Note Modal Prompt */}
            {revisingPostId && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    Berikan Catatan Revisi untuk Jurnalis
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Jelaskan poin verifikasi fakta, sudut pandang, atau data penunjang yang harus diperbaiki sebelum berita dapat diterbitkan.
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Contoh: Perlu konfirmasi resmi dari Dinas terkait dan perbaiki kutipan narasumber..."
                    value={revisionNoteInput}
                    onChange={(e) => setRevisionNoteInput(e.target.value)}
                    className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c] mb-4"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setRevisingPostId(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleSendRevision(revisingPostId)}
                      className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
                    >
                      Kirim Catatan Revisi
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: Tulis / Ajukan Berita Baru */}
        {activeTab === 'write' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto">
            <h3 className="font-extrabold text-xl text-slate-900 mb-1">
              Formulir Penulisan Berita
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Naskah akan diajukan ke ruang redaksi sesuai kode etik jurnalistik WartaRadar.
            </p>

            <form onSubmit={(e) => handleWriteSubmit(e, 'menunggu_review')} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pemprov Percepat Modernisasi Transportasi Publik..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Kategori / Rubrik *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAddCategoryInput(!showAddCategoryInput)}
                      className="text-[11px] text-[#003366] hover:underline font-bold flex items-center gap-1"
                    >
                      {showAddCategoryInput ? '« Pilih yang Ada' : '+ Rubrik Baru'}
                    </button>
                  </div>

                  {showAddCategoryInput ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nama rubrik baru (misal: Investigasi)"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        className="w-full text-sm p-3 border border-sky-400 rounded-lg focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newCategoryInput.trim()) {
                            addCategory(newCategoryInput.trim());
                            setCategory(newCategoryInput.trim());
                            setNewCategoryInput('');
                            setShowAddCategoryInput(false);
                          }
                        }}
                        className="px-3 bg-[#003366] text-white text-xs font-bold rounded-lg shrink-0"
                      >
                        Tambah
                      </button>
                    </div>
                  ) : (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as NewsCategory)}
                      className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c] bg-white"
                    >
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    URL Gambar Sampul (Thumbnail)
                  </label>
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lead / Ringkasan Berita (Excerpt)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan 1-2 kalimat pengantar berita..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Isi Lengkap Berita (Body) *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Tuliskan berita lengkap di sini (mendukung paragraf HTML <p>, <blockquote>, <h3>)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c] font-serif-news"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tag / Kata Kunci (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Transportasi, Jakarta, MRT, Ekonomi"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-[#d9b76c]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => handleWriteSubmit(e, 'draft')}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Simpan sebagai Draf
                </button>

                <button
                  type="submit"
                  className="bg-[#0f172a] hover:bg-[#16233d] text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition"
                >
                  <Send className="w-4 h-4 text-[#d9b76c]" />
                  <span>Kirim ke Redaktur (Review)</span>
                </button>

                {(activeRole === 'editor_berita' || activeRole === 'administrator') && (
                  <button
                    type="button"
                    onClick={(e) => handleWriteSubmit(e, 'published')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Terbitkan Langsung (Editor Override)</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: Kelola 5 Berita Utama Slider Beranda & Sorotan Redaksi */}
        {activeTab === 'homepage' && (() => {
          // Compute exact 5 active slider stories
          const activeHeadlinePost = publishedPosts.find(p => p.id === editorialHeadlineId);
          const activeEditorPicks = publishedPosts.filter(p => p.id !== editorialHeadlineId && editorialPickIds.includes(p.id));
          const otherPublished = publishedPosts.filter(p => p.id !== editorialHeadlineId && !editorialPickIds.includes(p.id));
          const activeTop5Headlines: Post[] = [];
          const activeSeenIds = new Set<number>();
          for (const post of [...(activeHeadlinePost ? [activeHeadlinePost] : []), ...activeEditorPicks, ...otherPublished]) {
            if (!activeSeenIds.has(post.id)) {
              activeSeenIds.add(post.id);
              activeTop5Headlines.push(post);
              if (activeTop5Headlines.length === 5) break;
            }
          }

          return (
            <div className="space-y-6">
              {/* Info banner confirming WRMJ controls the homepage headlines */}
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sky-900">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">
                      Pusat Kendali Berita Utama & Sorotan Redaksi (WRMJ)
                    </h4>
                    <p className="text-xs text-sky-700 mt-0.5">
                      Slider 5 Berita Utama di Beranda dikendalikan langsung dari sini. Pilih 1 Berita Utama (Slide 1), serta hingga 4 artikel untuk Sorotan / Pilihan Redaksi (Slide 2-5).
                    </p>
                  </div>
                </div>
                <button
                  onClick={navigateToHome}
                  className="shrink-0 bg-white hover:bg-sky-100 text-[#003366] border border-sky-300 text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Tampilan Beranda</span>
                </button>
              </div>

              {/* LIVE PREVIEW: 5 Berita Utama yang Sedang Tampil di Homepage Slider */}
              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#d9b76c]" />
                    <h3 className="font-bold text-sm tracking-wide">
                      Urutan Aktif 5 Berita Utama di Homepage Slider Saat Ini
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono bg-[#d9b76c]/20 text-[#d9b76c] px-2.5 py-0.5 rounded-full border border-[#d9b76c]/40 font-semibold">
                    {activeTop5Headlines.length} dari 5 Berita Aktif
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {activeTop5Headlines.map((post, idx) => {
                    const isMainHeadline = post.id === editorialHeadlineId;
                    return (
                      <div 
                        key={post.id}
                        className={`rounded-lg p-3 text-xs flex flex-col justify-between transition border ${
                          isMainHeadline
                            ? 'bg-amber-500/10 border-amber-400/80 ring-1 ring-amber-400/50'
                            : 'bg-slate-800/80 border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2">
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                              isMainHeadline 
                                ? 'bg-amber-400 text-slate-950' 
                                : 'bg-sky-500/30 text-sky-300 border border-sky-400/30'
                            }`}>
                              {isMainHeadline ? `Slide 1 ★ Utama` : `Slide ${idx + 1}`}
                            </span>
                            <span className="text-[10px] text-slate-400">{post.category}</span>
                          </div>

                          <div className="relative mb-2 aspect-video rounded overflow-hidden">
                            <img 
                              src={post.thumbnail} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                            {isMainHeadline && (
                              <div className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-black text-[9px] px-1 py-0.2 rounded shadow">
                                UTAMA
                              </div>
                            )}
                          </div>

                          <h5 className="font-bold text-white text-[11px] line-clamp-2 leading-snug">
                            {post.title}
                          </h5>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                          <span>{post.views.toLocaleString()} pembaca</span>
                          {isMainHeadline ? (
                            <span className="text-amber-400 font-bold">Headline</span>
                          ) : (
                            <button
                              onClick={() => setHeadline(post.id)}
                              className="text-[#d9b76c] hover:underline font-semibold"
                              title="Jadikan berita ini sebagai Slide 1 (Headline Utama)"
                            >
                              Jadikan #1
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kurasi Semua Artikel Terbit untuk Headline & Sorotan Redaksi */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#d9b76c]" />
                      <span>Katalog Naskah Terbit untuk Kurasi Beranda</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pilih naskah untuk dipromosikan ke <strong>Berita Utama (#1)</strong> atau <strong>Sorotan / Pilihan Redaksi</strong>.
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">
                    Total Naskah Terbit: <strong className="text-slate-800">{publishedPosts.length}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {publishedPosts.map(post => {
                    const isHeadline = post.id === editorialHeadlineId;
                    const isPick = editorialPickIds.includes(post.id);

                    return (
                      <div 
                        key={post.id}
                        className={`p-4 rounded-xl border transition flex gap-3 ${
                          isHeadline 
                            ? 'border-amber-400 bg-amber-50/50 ring-1 ring-amber-400' 
                            : isPick 
                            ? 'border-blue-300 bg-blue-50/30' 
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <img 
                          src={post.thumbnail} 
                          alt={post.title} 
                          className="w-20 h-20 rounded-lg object-cover shrink-0" 
                        />

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <span className="category-tag text-[9px] py-0.5 px-1.5">{post.category}</span>
                              {isHeadline && (
                                <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  <span>Berita Utama #1</span>
                                </span>
                              )}
                              {isPick && (
                                <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Sorotan Redaksi</span>
                                </span>
                              )}
                            </div>
                            <h4 
                              onClick={() => navigateToArticle(post.id)}
                              className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 hover:text-blue-700 cursor-pointer"
                            >
                              {post.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
                            <button
                              onClick={() => setHeadline(post.id)}
                              disabled={isHeadline}
                              className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                                isHeadline 
                                  ? 'bg-amber-400 text-black cursor-default' 
                                  : 'bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700'
                              }`}
                              title={isHeadline ? 'Sedang aktif sebagai Berita Utama' : 'Jadikan Berita Utama pada homepage slider'}
                            >
                              <Star className={`w-3 h-3 ${isHeadline ? 'fill-black' : ''}`} />
                              <span>{isHeadline ? '✓ Berita Utama Aktif' : 'Jadikan Berita Utama'}</span>
                            </button>

                            <button
                              onClick={() => toggleEditorialPick(post.id)}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition flex items-center gap-1 ${
                                isPick 
                                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                  : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700'
                              }`}
                              title={isPick ? 'Keluarkan dari Sorotan Redaksi' : 'Masukkan ke Sorotan Redaksi (Slider & Sidebar)'}
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>{isPick ? '✓ Sorotan Redaksi' : '+ Tambah ke Sorotan'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* TAB 4: Semua Naskah */}
        {activeTab === 'all' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Daftar Semua Naskah Berita ({posts.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Termasuk draf, review, naskah revisi, serta kurasi status Berita Utama & Sorotan Redaksi.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Judul & Kurasi</th>
                    <th className="pb-3 font-semibold">Kategori</th>
                    <th className="pb-3 font-semibold">Penulis</th>
                    <th className="pb-3 font-semibold">Status Alur</th>
                    <th className="pb-3 font-semibold">Pembaca</th>
                    <th className="pb-3 font-semibold text-right">Tindakan Editor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map(p => {
                    const isHeadline = p.id === editorialHeadlineId;
                    const isPick = editorialPickIds.includes(p.id);

                    return (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 pr-4 max-w-xs sm:max-w-md">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            {isHeadline && (
                              <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 fill-current" />
                                <span>Berita Utama</span>
                              </span>
                            )}
                            {isPick && (
                              <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Sorotan Redaksi</span>
                              </span>
                            )}
                          </div>
                          <span 
                            onClick={() => navigateToArticle(p.id)}
                            className="font-bold text-slate-900 hover:text-blue-700 cursor-pointer block truncate"
                          >
                            {p.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{p.date}</span>
                        </td>
                        <td className="py-3">
                          <span className="category-tag text-[9px] py-0.5 px-1.5">{p.category}</span>
                        </td>
                        <td className="py-3 text-slate-700 font-medium">
                          {p.author.name}
                        </td>
                        <td className="py-3">
                          {p.status === 'published' && <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Terbit</span>}
                          {p.status === 'menunggu_review' && <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">Menunggu Review</span>}
                          {p.status === 'perlu_revisi' && <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded">Perlu Revisi</span>}
                          {p.status === 'draft' && <span className="text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded">Draf</span>}
                        </td>
                        <td className="py-3 text-slate-600 font-mono">
                          {p.views.toLocaleString()}
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {p.status === 'published' && (activeRole === 'editor_berita' || activeRole === 'administrator') && (
                              <>
                                <button
                                  onClick={() => setHeadline(p.id)}
                                  className={`p-1.5 rounded transition ${
                                    isHeadline 
                                      ? 'bg-amber-400 text-slate-950 font-bold' 
                                      : 'bg-slate-100 hover:bg-amber-100 text-slate-600'
                                  }`}
                                  title={isHeadline ? 'Berita Utama saat ini' : 'Jadikan Berita Utama'}
                                >
                                  <Star className={`w-3.5 h-3.5 ${isHeadline ? 'fill-current' : ''}`} />
                                </button>

                                <button
                                  onClick={() => toggleEditorialPick(p.id)}
                                  className={`p-1.5 rounded transition ${
                                    isPick 
                                      ? 'bg-blue-600 text-white' 
                                      : 'bg-slate-100 hover:bg-blue-100 text-slate-600'
                                  }`}
                                  title={isPick ? 'Hapus dari Sorotan Redaksi' : 'Tambahkan ke Sorotan Redaksi'}
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => deleteArticle(p.id)}
                              className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded transition"
                              title="Hapus artikel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: Sinkronisasi Otomatis Database wartaradar.com */}
        {activeTab === 'sync' && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-[#003366] to-[#002244] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-sky-900">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Integrasi API & Basis Data wartaradar.com</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Sinkronisasi Otomatis Kategori, Berita, Gambar, & Iklan
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-100/80 mt-1 max-w-2xl">
                    Semua rubrik kategori di menu navigasi, artikel berita terbaru, gambar sampul beresolusi tinggi, hingga slot iklan dari wartaradar.com dapat disinkronkan secara real-time ke dalam tema ini.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-xs border border-white/10 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="text-xs font-bold text-white">Status: Siap Sinkron</span>
                </div>
              </div>
            </div>

            {/* Sync Action & Endpoint Controller */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#003366]" />
                <span>Koneksi Endpoint REST API / Webhook wartaradar.com</span>
              </h4>

              <p className="text-xs text-slate-600">
                Tema ini terhubung dengan arsitektur standar <strong>WordPress REST API</strong> (<code>/wp-json/wp/v2/posts?_embed</code>) atau webhook backend MySQL. Ketika artikel, kategori, atau gambar diterbitkan di wartaradar.com, tema ini langsung menyerap data tersebut tanpa perlu input manual.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="url"
                    value={syncEndpointInput}
                    onChange={(e) => setSyncEndpointInput(e.target.value)}
                    placeholder="https://wartaradar.com/wp-json/wp/v2/posts?_embed"
                    className="w-full text-xs sm:text-sm font-mono p-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#003366] text-slate-800"
                  />
                </div>
                
                <button
                  onClick={async () => {
                    setApiEndpoint(syncEndpointInput);
                    const res = await syncWithExternalApi(syncEndpointInput);
                    setSyncStatusMsg({ text: res.message, isError: !res.success });
                    setTimeout(() => setSyncStatusMsg(null), 8000);
                  }}
                  disabled={isSyncing}
                  className="px-5 py-3 bg-[#003366] hover:bg-[#002244] text-white text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-xs shrink-0 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Menghubungkan...' : 'Tarik Data Langsung'}</span>
                </button>
              </div>

              {/* Demo / Live Test Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    seedSampleLiveWartaRadarData();
                    setSyncStatusMsg({
                      text: 'Berhasil memuat data uji langsung wartaradar.com! Rubrik baru ("Investigasi", "Daerah", "Hukum & HAM") dan gambar berita resolusi tinggi otomatis masuk ke menu navigasi dan beranda.',
                      isError: false
                    });
                    setTimeout(() => setSyncStatusMsg(null), 8000);
                  }}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-[#003366] border border-sky-300 text-xs font-bold rounded-lg transition flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Muat Uji Kategori & Berita Baru Otomatis (Investigasi, Daerah, Hukum)</span>
                </button>

                <span className="text-[11px] text-slate-500">
                  (Klik tombol ini untuk melihat rubrik di navbar langsung bertambah otomatis)
                </span>
              </div>

              {syncStatusMsg && (
                <div className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 ${
                  syncStatusMsg.isError 
                    ? 'bg-amber-50 border border-amber-300 text-amber-900' 
                    : 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                }`}>
                  {syncStatusMsg.isError ? (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p>{syncStatusMsg.text}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Categories Currently Active in Database */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#003366]" />
                  <span>Rubrik / Kategori Aktif di Database ({categories.length})</span>
                </h4>
                <span className="text-xs text-slate-500">
                  Setiap kategori ini otomatis muncul sebagai tombol di menu navigasi atas & drawer seluler
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const count = posts.filter(p => p.category === cat && p.status === 'published').length;
                  return (
                    <div 
                      key={cat} 
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:border-sky-300 transition"
                    >
                      <span>{cat}</span>
                      <span className="bg-[#003366] text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                        {count} berita
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Architecture Explanation Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-extrabold text-sm text-slate-900 mb-3 uppercase tracking-wider">
                Bagaimana Alur Otomatisasi Bekerja di Tema WartaRadar?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#003366] font-extrabold flex items-center justify-center">
                    1
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Menu Kategori Dinamis</h5>
                  <p className="text-slate-600 leading-relaxed">
                    Navigasi tidak statis. Sistem membaca seluruh kategori unik dari database secara langsung. Jika admin di wartaradar.com menambah rubrik baru, rubrik tersebut langsung muncul di menu navigasi tanpa harus mengedit kode tema.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#003366] font-extrabold flex items-center justify-center">
                    2
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Berita & Gambar Otomatis</h5>
                  <p className="text-slate-600 leading-relaxed">
                    Setiap naskah berita yang diterbitkan di wartaradar.com ditarik bersama gambar unggulan (<code>featured_media</code>), judul, kutipan lead, nama wartawan, serta isi artikel lengkap secara otomatis via REST API.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#003366] font-extrabold flex items-center justify-center">
                    3
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Iklan WRMI & Afiliasi Otomatis</h5>
                  <p className="text-slate-600 leading-relaxed">
                    Slot iklan pada posisi <code>top</code>, <code>header</code>, <code>hero</code>, <code>feed</code>, dan <code>sidebar</code> otomatis merender kampanye iklan aktif yang tersimpan di plugin manajemen iklan (WRMI) atau ad-server.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
