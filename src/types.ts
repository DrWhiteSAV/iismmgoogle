export type SocialNetwork =
  | 'telegram'
  | 'vk'
  | 'max'
  | 'instagram'
  | 'facebook'
  | 'pinterest'
  | 'linkedin'
  | 'discord'
  | 'x'
  | 'ok'
  | 'tenchat'
  | 'dzen'
  | 'setka';

export interface InlineButton {
  id: string;
  text: string;
  url: string;
  color: 'blue' | 'purple' | 'pink' | 'emerald' | 'orange' | 'red';
}

export interface SocialChannel {
  id: string;
  name: string;
  username: string; // e.g. @tech_trends
  platform: SocialNetwork;
  avatarUrl?: string;
  subscribers: number;
  category: string;
  isPremium: boolean;
  status: 'connected' | 'pending';
}

export interface CampaignPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  platforms: SocialNetwork[];
  scheduledAt?: string; // ISO string or specific time
  status: 'draft' | 'scheduled' | 'published';
  inlineButtons?: InlineButton[];
  isAiGenerated?: boolean;
  rewriteReferenceChannel?: string;
  clicks?: number;
  views?: number;
  utmData?: {
    source: string;
    medium: string;
    campaign: string;
  };
}

export interface PromoBundle {
  id: string;
  title: string;
  organizerUsername: string;
  rules: string;
  entryFeeRub: number; // e.g. 500
  channelsCount: number;
  maxChannels: number;
  status: 'draft' | 'collecting' | 'published';
  joinedChannels: string[]; // IDs of channels
  isFreeForOrganizer: boolean;
}

export interface AdListing {
  id: string;
  channelId: string;
  channelName: string;
  platform: SocialNetwork;
  priceRub: number;
  subscribersCount: number;
  avgViews: number;
  category: string;
  contactUsername: string;
  description: string;
}

export interface BulletinAd {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string;
  linkUrl: string;
  postedBy: string;
  createdAt: string;
  clicks: number;
}

export interface UserAccount {
  id: string;
  name: string;
  telegramUsername: string;
  tariff: 'free' | 'premium';
  tokens: number; // AI Rewrites/Generations balances
  balanceRub: number; // income from promos, ad orders etc
  earningsRub: number; // total earnings in system
}
