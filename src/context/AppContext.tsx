import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Post, 
  PodcastEpisode, 
  AdItem, 
  UserRole, 
  ArticleStatus, 
  NewsCategory, 
  AdPlacementType,
  Advertiser,
  Campaign,
  AdRate,
  Invoice
} from '../types';
import { 
  INITIAL_POSTS, 
  INITIAL_PODCASTS, 
  INITIAL_ADS, 
  INITIAL_ADVERTISERS,
  INITIAL_CAMPAIGNS,
  INITIAL_RATES,
  INITIAL_INVOICES
} from '../data/mockData';

interface AppContextType {
  posts: Post[];
  podcasts: PodcastEpisode[];
  ads: AdItem[];
  advertisers: Advertiser[];
  campaigns: Campaign[];
  rates: AdRate[];
  invoices: Invoice[];
  activeRole: UserRole;
  currentView: string;
  selectedArticleId: number | null;
  selectedCategory: string | null;
  searchQuery: string;
  currentPlayingPodcast: PodcastEpisode | null;
  isPlaying: boolean;
  playbackSpeed: number;
  editorialHeadlineId: number;
  editorialPickIds: number[];
  
  // Navigation
  setCurrentView: (view: string) => void;
  navigateToHome: () => void;
  navigateToArticle: (id: number) => void;
  navigateToCategory: (category: string) => void;
  navigateToPodcast: () => void;
  navigateToEditorial: () => void;
  navigateToAdManager: () => void;
  setSearchQuery: (query: string) => void;
  setActiveRole: (role: UserRole) => void;
  
  // Ad tracking & management
  trackAdImpression: (adId: number) => void;
  trackAdClick: (adId: number) => void;
  toggleAdStatus: (adId: number) => void;
  addNewAd: (newAd: Omit<AdItem, 'id' | 'impressions' | 'clicks'>) => void;
  
  // Editorial management
  setHeadline: (postId: number) => void;
  toggleEditorialPick: (postId: number) => void;
  submitArticle: (articleData: Partial<Post>) => void;
  updateArticleStatus: (postId: number, status: ArticleStatus, revisionNotes?: string) => void;
  deleteArticle: (postId: number) => void;

  // Dynamic view tracking
  incrementArticleView: (postId: number, amount?: number) => void;

  // Podcast player
  playPodcast: (podcast: PodcastEpisode) => void;
  togglePlayPause: () => void;
  setPlaybackSpeed: (speed: number) => void;

  // Dynamic Categories & Database Sync
  categories: string[];
  addCategory: (category: string) => void;
  apiEndpoint: string;
  setApiEndpoint: (url: string) => void;
  isSyncing: boolean;
  syncWithExternalApi: (customUrl?: string) => Promise<{ success: boolean; count: number; message: string }>;
  seedSampleLiveWartaRadarData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('wartaradar_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(INITIAL_PODCASTS);
  const [ads, setAds] = useState<AdItem[]>(() => {
    const saved = localStorage.getItem('wartaradar_ads');
    if (saved) {
      try {
        const parsed: AdItem[] = JSON.parse(saved);
        // Ensure top ad uses the new attractive WartaRadar ad if still using previous fallback
        const updated = parsed.map(ad => {
          if (ad.placement === 'top' && (!ad.imageUrl || ad.imageUrl.includes('unsplash') || ad.title.includes('Tabungan Bisnis'))) {
            return INITIAL_ADS[0];
          }
          return ad;
        });
        return updated;
      } catch {
        return INITIAL_ADS;
      }
    }
    return INITIAL_ADS;
  });

  const [advertisers, setAdvertisers] = useState<Advertiser[]>(() => {
    const saved = localStorage.getItem('wartaradar_advertisers');
    if (saved) {
      try {
        const parsed: Advertiser[] = JSON.parse(saved);
        if (!parsed.some(a => a.id === 5)) {
          return [...parsed, INITIAL_ADVERTISERS[4]];
        }
        return parsed;
      } catch {
        return INITIAL_ADVERTISERS;
      }
    }
    return INITIAL_ADVERTISERS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('wartaradar_campaigns');
    if (saved) {
      try {
        const parsed: Campaign[] = JSON.parse(saved);
        if (!parsed.some(c => c.id === 5)) {
          return [...parsed, INITIAL_CAMPAIGNS[4]];
        }
        return parsed;
      } catch {
        return INITIAL_CAMPAIGNS;
      }
    }
    return INITIAL_CAMPAIGNS;
  });
  const [rates] = useState<AdRate[]>(INITIAL_RATES);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);

  const [activeRole, setActiveRole] = useState<UserRole>('editor_berita');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [editorialHeadlineId, setEditorialHeadlineId] = useState<number>(() => {
    const saved = localStorage.getItem('wartaradar_headline_id');
    return saved ? Number(saved) : 1;
  });
  const [editorialPickIds, setEditorialPickIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('wartaradar_editorial_picks');
    return saved ? JSON.parse(saved) : [2, 3];
  });

  const [currentPlayingPodcast, setCurrentPlayingPodcast] = useState<PodcastEpisode | null>(INITIAL_PODCASTS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Dynamic Categories state
  const [customCategories, setCustomCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('wartaradar_categories');
    return saved ? JSON.parse(saved) : ['Nasional', 'Politik', 'Ekonomi', 'Olahraga', 'Teknologi', 'Hiburan', 'Lifestyle'];
  });

  // REST API / Database Endpoint for wartaradar.com
  const [apiEndpoint, setApiEndpoint] = useState<string>(() => {
    return localStorage.getItem('wartaradar_api_endpoint') || 'https://wartaradar.com/wp-json/wp/v2/posts?_embed&per_page=12';
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Derived dynamic categories: merges custom/configured categories with every category found in current posts
  const categories = Array.from(new Set([
    ...customCategories,
    ...posts.map(p => p.category).filter(Boolean)
  ]));

  const addCategory = (newCat: string) => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (!customCategories.includes(trimmed)) {
      setCustomCategories(prev => [...prev, trimmed]);
    }
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('wartaradar_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('wartaradar_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('wartaradar_headline_id', String(editorialHeadlineId));
  }, [editorialHeadlineId]);

  useEffect(() => {
    localStorage.setItem('wartaradar_editorial_picks', JSON.stringify(editorialPickIds));
  }, [editorialPickIds]);

  useEffect(() => {
    localStorage.setItem('wartaradar_categories', JSON.stringify(customCategories));
  }, [customCategories]);

  useEffect(() => {
    localStorage.setItem('wartaradar_api_endpoint', apiEndpoint);
  }, [apiEndpoint]);

  // Automated Ingestion from wartaradar.com REST API
  const syncWithExternalApi = async (customUrl?: string): Promise<{ success: boolean; count: number; message: string }> => {
    const targetUrl = customUrl || apiEndpoint;
    setIsSyncing(true);
    try {
      const res = await fetch(targetUrl, { 
        headers: { 'Accept': 'application/json, text/plain, */*' } 
      });
      
      if (!res.ok) {
        throw new Error(`Server merespons kode HTTP ${res.status} (${res.statusText || 'Gagal terhubung'})`);
      }

      const responseText = await res.text();
      const trimmed = responseText.trim();

      // Check if server returned HTML instead of JSON (common when WordPress is not installed or 404 rewrite triggers index.html)
      if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<?xml')) {
        throw new Error('Server mengembalikan halaman web HTML (bukan data JSON REST API). Hal ini terjadi karena jalur WordPress belum aktif di alamat tersebut. Silakan gunakan endpoint bawaan Hostinger: "/api/posts.json" atau tombol uji.');
      }

      let rawPosts: any;
      try {
        rawPosts = JSON.parse(trimmed);
      } catch (parseErr: any) {
        throw new Error(`Respons server bukan format JSON yang valid (${parseErr.message}).`);
      }

      if (!Array.isArray(rawPosts)) {
        // Some WordPress APIs or custom endpoints wrap posts in { posts: [...] } or { data: [...] }
        if (rawPosts && Array.isArray(rawPosts.posts)) {
          rawPosts = rawPosts.posts;
        } else if (rawPosts && Array.isArray(rawPosts.data)) {
          rawPosts = rawPosts.data;
        } else {
          throw new Error('Format respons API bukan array artikel (format JSON tidak dikenali).');
        }
      }

      // Map WordPress REST API or JSON format into Post schema
      const mappedPosts: Post[] = rawPosts.map((item: any, idx: number) => {
        const title = item.title?.rendered ? item.title.rendered.replace(/<[^>]*>?/gm, '') : (item.title || 'Berita Terkini');
        const excerpt = item.excerpt?.rendered ? item.excerpt.rendered.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...' : (item.excerpt || '');
        const content = item.content?.rendered || item.content || excerpt;
        
        // Thumbnail from WP featuredmedia
        let thumbnail = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200';
        if (item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0]) {
          thumbnail = item._embedded['wp:featuredmedia'][0].source_url || thumbnail;
        } else if (item.featured_image_url || item.thumbnail) {
          thumbnail = item.featured_image_url || item.thumbnail;
        }

        // Category from WP terms
        let categoryName = 'Nasional';
        if (item._embedded && item._embedded['wp:term'] && item._embedded['wp:term'][0] && item._embedded['wp:term'][0][0]) {
          categoryName = item._embedded['wp:term'][0][0].name || 'Nasional';
        } else if (item.category_name || item.category) {
          categoryName = item.category_name || item.category;
        }

        // Author
        let authorName = 'Redaksi WartaRadar';
        if (item._embedded && item._embedded['author'] && item._embedded['author'][0]) {
          authorName = item._embedded['author'][0].name || authorName;
        } else if (item.author_name || item.author) {
          authorName = typeof item.author === 'string' ? item.author : (item.author?.name || authorName);
        }

        const dateStr = item.date 
          ? new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) 
          : 'Hari ini';

        return {
          id: item.id || Date.now() + idx,
          title,
          slug: item.slug || `berita-${item.id || idx}`,
          category: categoryName,
          excerpt,
          content,
          thumbnail,
          author: {
            name: authorName,
            role: 'Jurnalis WartaRadar',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
          },
          date: dateStr,
          readTime: `${Math.max(2, Math.ceil(content.length / 500))} menit baca`,
          views: item.views || Math.floor(Math.random() * 800) + 120,
          status: 'published' as ArticleStatus,
          isEditorialHeadline: idx === 0,
          isEditorialPick: idx === 1 || idx === 2
        };
      });

      if (mappedPosts.length > 0) {
        const incomingCategories = Array.from(new Set(mappedPosts.map(p => p.category)));
        setCustomCategories(prev => Array.from(new Set([...prev, ...incomingCategories])));
        setPosts(mappedPosts);
        setEditorialHeadlineId(mappedPosts[0].id);
        setEditorialPickIds(mappedPosts.slice(1, 3).map(p => p.id));
        setIsSyncing(false);
        return { 
          success: true, 
          count: mappedPosts.length, 
          message: `Berhasil menyinkronkan ${mappedPosts.length} berita & kategori langsung dari sumber data!` 
        };
      } else {
        setIsSyncing(false);
        return { success: false, count: 0, message: 'Tidak ada data artikel yang ditemukan pada endpoint.' };
      }
    } catch (err: any) {
      setIsSyncing(false);
      const isCorsOrNetwork = err.name === 'TypeError' && err.message?.includes('fetch');
      const errDetail = isCorsOrNetwork 
        ? 'Akses endpoint dibatasi CORS oleh server tujuan. Server harus mengizinkan header "Access-Control-Allow-Origin: *".'
        : err.message;
      return { 
        success: false, 
        count: 0, 
        message: `${errDetail}` 
      };
    }
  };

  // Seed live sample dataset demonstrating new dynamic categories like 'Investigasi', 'Daerah', 'Hukum & HAM'
  const seedSampleLiveWartaRadarData = () => {
    const newWartaRadarArticles: Post[] = [
      {
        id: 901,
        title: 'Investigasi Khusus: Jalur Perdagangan Digital dan Keamanan Siber Nasional',
        slug: 'investigasi-keamanan-siber-nasional',
        category: 'Investigasi',
        excerpt: 'Laporan mendalam redaksi WartaRadar menelusuri ketahanan infrastruktur komputasi awan dan perlindungan data pribadi publik.',
        content: '<p>Investigasi mendalam WartaRadar mengungkap langkah-langkah mitigasi ancaman siber pada sektor krusial nasional...</p>',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
        author: {
          name: 'Tim Investigasi WartaRadar',
          role: 'Unit Investigasi Khusus',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
        },
        date: 'Hari ini',
        readTime: '6 menit baca',
        views: 3420,
        status: 'published',
        isEditorialHeadline: true,
        isEditorialPick: false
      },
      {
        id: 902,
        title: 'Pembangunan Koridor Maritim Terpadu di Kawasan Timur Resmi Beroperasi',
        slug: 'koridor-maritim-terpadu-timur',
        category: 'Daerah',
        excerpt: 'Pelabuhan logistik modern siap memangkas biaya logistik antarpulau hingga 40 persen.',
        content: '<p>Kementerian Perhubungan bersama otoritas maritim meresmikan fasilitas terminal peti kemas cerdas di kawasan timur nusantara...</p>',
        thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
        author: {
          name: 'Budi Santoso',
          role: 'Koresponden Daerah',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
        },
        date: 'Hari ini',
        readTime: '4 menit baca',
        views: 1890,
        status: 'published',
        isEditorialHeadline: false,
        isEditorialPick: true
      },
      {
        id: 903,
        title: 'Reformasi Peradilan Berbasis Elektronik Percepat Putusan Perkara Perdata',
        slug: 'reformasi-peradilan-elektronik-putusan',
        category: 'Hukum & HAM',
        excerpt: 'Sistem e-court generasi terbaru memungkinkan sidang daring dan verifikasi bukti digital secara tersertifikasi.',
        content: '<p>Mahkamah Agung meluncurkan pembaharuan aplikasi peradilan siber yang mengintegrasikan kecerdasan buatan...</p>',
        thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
        author: {
          name: 'Siti Rahmawati',
          role: 'Jurnalis Hukum',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        },
        date: 'Hari ini',
        readTime: '3 menit baca',
        views: 1450,
        status: 'published',
        isEditorialHeadline: false,
        isEditorialPick: true
      }
    ];

    setCustomCategories(prev => Array.from(new Set([...prev, 'Investigasi', 'Daerah', 'Hukum & HAM'])));
    setPosts(prev => [...newWartaRadarArticles, ...prev.filter(p => !newWartaRadarArticles.some(n => n.id === p.id))]);
    setEditorialHeadlineId(901);
    setEditorialPickIds([902, 903]);
  };

  // Navigation handlers
  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedArticleId(null);
    setSelectedCategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (id: number) => {
    setSelectedArticleId(id);
    setCurrentView('article');
    // increment view count
    setPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPodcast = () => {
    setCurrentView('podcast');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEditorial = () => {
    setCurrentView('editorial_dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdManager = () => {
    setCurrentView('ad_dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ad Tracking
  const trackAdImpression = (adId: number) => {
    setAds(prev => prev.map(a => a.id === adId ? { ...a, impressions: a.impressions + 1 } : a));
  };

  const trackAdClick = (adId: number) => {
    setAds(prev => prev.map(a => a.id === adId ? { ...a, clicks: a.clicks + 1 } : a));
  };

  const toggleAdStatus = (adId: number) => {
    setAds(prev => prev.map(a => a.id === adId ? { ...a, active: !a.active } : a));
  };

  const addNewAd = (newAdData: Omit<AdItem, 'id' | 'impressions' | 'clicks'>) => {
    const newId = Math.max(...ads.map(a => a.id), 0) + 1;
    const ad: AdItem = {
      ...newAdData,
      id: newId,
      impressions: 0,
      clicks: 0
    };
    setAds(prev => [ad, ...prev]);
  };

  // Editorial Actions
  const setHeadline = (postId: number) => {
    setEditorialHeadlineId(postId);
  };

  const toggleEditorialPick = (postId: number) => {
    setEditorialPickIds(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), postId];
        }
        return [...prev, postId];
      }
    });
  };

  const submitArticle = (articleData: Partial<Post>) => {
    const newId = Math.max(...posts.map(p => p.id), 0) + 1;
    const newPost: Post = {
      id: newId,
      title: articleData.title || 'Artikel Tanpa Judul',
      slug: (articleData.title || 'artikel').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: (articleData.category as NewsCategory) || 'Nasional',
      excerpt: articleData.excerpt || '',
      content: articleData.content || '',
      thumbnail: articleData.thumbnail || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
      author: {
        name: activeRole === 'jurnalis' ? 'Bambang Prasetyo (Jurnalis)' : 'Redaksi WartaRadar',
        role: activeRole === 'jurnalis' ? 'Jurnalis WartaRadar' : 'Editor Berita',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', Baru Saja',
      readTime: '3 menit baca',
      views: 0,
      status: articleData.status || (activeRole === 'jurnalis' ? 'menunggu_review' : 'published'),
      submittedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      tags: articleData.tags || ['WartaRadar', articleData.category || 'Nasional']
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const updateArticleStatus = (postId: number, status: ArticleStatus, revisionNotes?: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          status,
          revisionNotes: revisionNotes !== undefined ? revisionNotes : p.revisionNotes
        };
      }
      return p;
    }));
  };

  const deleteArticle = (postId: number) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  // Dynamic view counter
  const incrementArticleView = (postId: number, amount: number = 1) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, views: p.views + amount } : p));
  };

  // Podcast player actions
  const playPodcast = (podcast: PodcastEpisode) => {
    setCurrentPlayingPodcast(podcast);
    setIsPlaying(true);
    setPodcasts(prev => prev.map(p => p.id === podcast.id ? { ...p, plays: p.plays + 1 } : p));
  };

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        posts,
        podcasts,
        ads,
        advertisers,
        campaigns,
        rates,
        invoices,
        activeRole,
        currentView,
        selectedArticleId,
        selectedCategory,
        searchQuery,
        currentPlayingPodcast,
        isPlaying,
        playbackSpeed,
        editorialHeadlineId,
        editorialPickIds,
        setCurrentView,
        navigateToHome,
        navigateToArticle,
        navigateToCategory,
        navigateToPodcast,
        navigateToEditorial,
        navigateToAdManager,
        setSearchQuery,
        setActiveRole,
        trackAdImpression,
        trackAdClick,
        toggleAdStatus,
        addNewAd,
        setHeadline,
        toggleEditorialPick,
        submitArticle,
        updateArticleStatus,
        deleteArticle,
        incrementArticleView,
        playPodcast,
        togglePlayPause,
        setPlaybackSpeed,
        categories,
        addCategory,
        apiEndpoint,
        setApiEndpoint,
        isSyncing,
        syncWithExternalApi,
        seedSampleLiveWartaRadarData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
