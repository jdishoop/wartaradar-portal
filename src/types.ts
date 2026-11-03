export type UserRole = 'pembaca' | 'jurnalis' | 'editor_berita' | 'administrator';

export type ArticleStatus = 'draft' | 'menunggu_review' | 'perlu_revisi' | 'published';

export type NewsCategory = string;


export interface Post {
  id: number;
  title: string;
  slug: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  views: number;
  status: ArticleStatus;
  isEditorialHeadline?: boolean;
  isEditorialPick?: boolean;
  revisionNotes?: string;
  submittedAt?: string;
  tags?: string[];
  mediaType?: 'image' | 'video';
  videoUrl?: string;
}

export interface AffiliatePartner {
  id: number;
  name: string;
  company: string;
  badge: string;
  logo: string;
  website: string;
  category: string;
}

export interface PodcastEpisode {
  id: number;
  seriesId: string;
  seriesTitle: string;
  episodeNumber: number;
  title: string;
  description: string;
  host: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  publishedDate: string;
  thumbnail: string;
  plays: number;
}

export type AdPlacementType = 
  | 'top' 
  | 'header' 
  | 'hero' 
  | 'feed' 
  | 'mid_content' 
  | 'sidebar' 
  | 'article' 
  | 'footer';

export interface AdItem {
  id: number;
  title: string;
  advertiserId: number;
  campaignId: number;
  placement: AdPlacementType;
  imageUrl: string;
  targetUrl: string;
  impressions: number;
  clicks: number;
  active: boolean;
  altText: string;
}

export interface Advertiser {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  activeCampaigns: number;
}

export interface Campaign {
  id: number;
  advertiserId: number;
  name: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
}

export interface AdRate {
  id: number;
  placement: AdPlacementType;
  name: string;
  cpmRate: number; // in IDR
  cpcRate: number; // in IDR
  dailyFlatRate: number; // in IDR
  specs: string;
}

export interface Invoice {
  id: string;
  advertiserName: string;
  campaignName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'Lunas' | 'Menunggu Pembayaran' | 'Jatuh Tempo';
}

export interface EditorialData {
  headlineId: number;
  editorPickIds: number[];
}
