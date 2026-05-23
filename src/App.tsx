import React, { useState, useEffect } from 'react';
import { 
  SocialChannel, CampaignPost, PromoBundle, AdListing, BulletinAd, UserAccount, SocialNetwork 
} from './types';
import Sidebar from './components/Sidebar';
import BottomNavbar from './components/BottomNavbar';
import ChannelList from './components/ChannelList';
import PostMaker from './components/PostMaker';
import PromoBundles from './components/PromoBundles';
import AdMarketplace from './components/AdMarketplace';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ProfileAndOnboarding from './components/ProfileAndOnboarding';
import SuperadminPanel from './components/SuperadminPanel';
import { Sparkles, Play, ShieldCheck, Mail, MessageSquare, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // 1. Navigation Routing State (Hash-Synced Router)
  const [currentPath, setCurrentPath] = useState('/posts');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Strip # and default to standard folders
        const cleanPath = hash.replace('#', '');
        const validPaths = ['/start', '/channels', '/posts', '/market', '/bundles', '/profile', '/admin'];
        if (validPaths.includes(cleanPath)) {
          setCurrentPath(cleanPath);
        }
      } else {
        // Default route is our main Posting/Content workspace
        window.location.hash = '#/posts';
      }
    };

    // Listen to hash alterations
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Trigger on start

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeRoute = (path: string) => {
    window.location.hash = `#${path}`;
    setCurrentPath(path);
  };

  // 2. Core User Account State
  const [user, setUser] = useState<UserAccount>({
    id: 'usr-928',
    name: 'Иван Шишкарёв',
    telegramUsername: '@shishkarnem',
    tariff: 'free',
    tokens: 150, // Starts with enough tokens to test multiple AI queries
    balanceRub: 350, // Starts with enough to test joining multiple promos
    earningsRub: 14500 // Total historically earned in system
  });

  // 3. Pre-populated Social connected channels (2 channels, leaving exactly 1 spot to test the 3-channel cap)
  const [channels, setChannels] = useState<SocialChannel[]>([
    {
      id: 'ch-1',
      name: 'Ботмазер & Чат-Биржи',
      username: '@botmothercom',
      platform: 'telegram',
      subscribers: 4850,
      category: 'Бизнес/Маркетинг',
      isPremium: true,
      status: 'connected'
    },
    {
      id: 'ch-2',
      name: 'Нейросети SAV AI',
      username: '@SAV_AI',
      platform: 'telegram',
      subscribers: 12400,
      category: 'Технологии/ИИ',
      isPremium: true,
      status: 'connected'
    }
  ]);

  // 4. Prepopulated SMM Campaigns/Posts list
  const [posts, setPosts] = useState<CampaignPost[]>([
    {
      id: 'post-101',
      title: 'Тенденции ИИ Копирайтинга в 2026',
      content: '⚡️ КАК КУПИТЬ РЕКЛАМУ И НЕ СЛИТЬ БЮДЖЕТ?\nСовременный рынок требует идеальной UTM-маркировки и вовлекающих авто-публикаций. ИИSMM соединяет в одном интерфейсе все процессы.',
      platforms: ['telegram', 'vk'],
      status: 'published',
      clicks: 430,
      views: 5600,
      isAiGenerated: true
    },
    {
      id: 'post-102',
      title: 'Анонс сборного пиара блогов',
      content: '*ТОП ЛУЧШИХ КАНАЛОВ ПО НЕЙРОСЕТЯМ*\nРекомендуем подписаться на папки взаимного пиара.',
      platforms: ['telegram'],
      status: 'scheduled',
      scheduledAt: '2026-06-01T12:00:00.000Z',
      clicks: 0,
      views: 0
    }
  ]);

  // 5. Prepopulated Ad marketplace directory listings for booking orders
  const [adListings, setAdListings] = useState<AdListing[]>([
    {
      id: 'ad-lst-1',
      channelId: 'ch-ext-1',
      channelName: 'AI для Бизнеса 🤖',
      platform: 'telegram',
      priceRub: 450,
      subscribersCount: 16500,
      avgViews: 4100,
      category: 'Бизнес/Маркетинг',
      contactUsername: '@ai_business_admin',
      description: 'Авторский канал про нейросети и автоматизацию процессов. Отличная платежеспособная аудитория.'
    },
    {
      id: 'ad-lst-2',
      channelId: 'ch-ext-2',
      channelName: 'Дизайнеры Будущего 🎨',
      platform: 'vk',
      priceRub: 300,
      subscribersCount: 19800,
      avgViews: 1200,
      category: 'Дизайн/Учеба',
      contactUsername: '@design_future',
      description: 'Паблик с уроками, ассетами и вакансиями для UI/UX и генеративных художников.'
    },
    {
      id: 'ad-lst-3',
      channelId: 'ch-ext-3',
      channelName: 'Крипто-Лихорадка 💎',
      platform: 'x',
      priceRub: 900,
      subscribersCount: 38200,
      avgViews: 9500,
      category: 'Криптовалюта',
      contactUsername: '@crypto_fever',
      description: 'Свежие крипто-сигналы, дропы и обзоры блокчейн-проектов.'
    }
  ]);

  // 6. Global Bulletin screen sponsored ads
  const [bulletinAds, setBulletinAds] = useState<BulletinAd[]>([
    {
      id: 'bull-1',
      title: 'Устали от спама в комментариях Telegram?',
      content: 'Добавьте нашего бота @iiSmmBot в комментарии вашего канала! Он автоматически чистит спам со ссылками, борется с ИИ-комментаторами и организует мгновенные репосты.',
      linkUrl: 'https://t.me/iiSmmBot',
      postedBy: '@iiSmmBot_support',
      createdAt: '2026-05-23T10:15:00.000Z',
      clicks: 220
    },
    {
      id: 'bull-2',
      title: 'Ищем организаторов папок по Маркетингу',
      content: 'Хотите собирать по 500-1000 ₽ с участников? Создайте взаимный рекламный сбор бесплатно! Комиссия ИИSMM всего 15%, остальные сборы ваши.',
      linkUrl: 'https://t.me/shishkarnem',
      postedBy: '@shishkarnem',
      createdAt: '2026-05-23T09:30:00.000Z',
      clicks: 145
    }
  ]);

  // 7. Mutual promotion folders сборы в папки
  const [bundles, setBundles] = useState<PromoBundle[]>([
    {
      id: 'bnd-1',
      title: 'Маркетинг и ИИ (Майский сбор)',
      organizerUsername: '@shishkarnem',
      rules: 'Держать в топе 3 часа после размещения. Не удалять публикацию папки в течении 2 суток.',
      entryFeeRub: 250,
      channelsCount: 6,
      maxChannels: 12,
      status: 'collecting',
      joinedChannels: ['ch-1', 'ch-2'],
      isFreeForOrganizer: true
    },
    {
      id: 'bnd-2',
      title: 'Юмор и Лайфстайл (Быстрый рост)',
      organizerUsername: '@joke_organizer',
      rules: 'Взнос обязателен для всех блогов менее 15к. Бот сверяет охваты и блокирует неплательщиков.',
      entryFeeRub: 150,
      channelsCount: 3,
      maxChannels: 10,
      status: 'collecting',
      joinedChannels: [],
      isFreeForOrganizer: false
    }
  ]);

  // --- MUTATORS & BUSINESS EVENT HANDLERS ---

  // Connect Channel: limits strict checking (limit is 3 channels on Free plan)
  const handleAddChannel = (newChan: Omit<SocialChannel, 'id' | 'subscribers' | 'isPremium' | 'status'>) => {
    const limit = 3;
    if (channels.length >= limit && user.tariff === 'free') {
      return 'Слишком много каналов на бесплатном плане! Добавьте новые слоты или оформите Premium для безлимита.';
    }

    const created: SocialChannel = {
      ...newChan,
      id: `ch-${Date.now()}`,
      subscribers: Math.floor(Math.random() * 8000) + 1200,
      isPremium: user.tariff === 'premium',
      status: 'connected'
    };

    setChannels([...channels, created]);
    return true;
  };

  const handleRemoveChannel = (id: string) => {
    setChannels(channels.filter(c => c.id !== id));
  };

  // Dedact tokens on AI interactions
  const handleDeductTokens = (amount: number) => {
    setUser(prev => ({
      ...prev,
      tokens: Math.max(0, prev.tokens - amount)
    }));
  };

  // Add new campaign SMM posts (cross-publishing and scheduling)
  const handlePublishPost = (newPost: Omit<CampaignPost, 'id' | 'clicks' | 'views'>) => {
    const created: CampaignPost = {
      ...newPost,
      id: `post-${Date.now()}`,
      clicks: 0,
      views: newPost.status === 'published' ? Math.floor(Math.random() * 800) + 100 : 0
    };

    setPosts([created, ...posts]);

    // Live counter statistics simulation parameters
    if (newPost.status === 'published') {
      alert(`УСПЕХ: Пост успешно опубликован в ${newPost.platforms.map(p => p.toUpperCase()).join(', ')} через шлюз ИИSMM!`);
    } else {
      alert(`УСПЕХ: Отложенный пост запланирован в календарь на указанное время!`);
    }
  };

  // Buying channels premium slots limits
  const handleBuySlotSelection = (slotsCount: number) => {
    // 150 rubles per slot
    const cost = slotsCount * 150;
    setUser(prev => ({
      ...prev,
      balanceRub: Math.max(0, prev.balanceRub - cost),
      tariff: slotsCount >= 3 ? 'premium' : prev.tariff // Unlock premium if they buy bulk slots
    }));
  };

  // Add tokens package
  const handleReplenishTokens = (amount: number, costRub: number) => {
    setUser(prev => ({
      ...prev,
      tokens: prev.tokens + amount,
      balanceRub: Math.max(0, prev.balanceRub - costRub)
    }));
  };

  // Recharge bank advertising funds wallet
  const handleReplenishBalance = (amount: number) => {
    setUser(prev => ({
      ...prev,
      balanceRub: prev.balanceRub + amount
    }));
  };

  // AD integration escrow deposit transaction SMM
  const handleBuyAdSlot = (costRub: number) => {
    setUser(prev => ({
      ...prev,
      balanceRub: Math.max(0, prev.balanceRub - costRub)
    }));
  };

  // Triggering Premium Account Tariff upgrade
  const handleUpgradeTariff = () => {
    if (user.balanceRub < 490) {
      if (confirm(`Ваш текущий баланс (${user.balanceRub} ₽) маловат. Пополнить баланс на 490 ₽ для мгновенной подписки PREMIUM?`)) {
        setUser(prev => ({
          ...prev,
          balanceRub: prev.balanceRub + 490,
          tariff: 'premium'
        }));
        alert('Поздравляем! Ваш SMM комбайн повышен до уровня PREMIUM! Все лимиты сняты.');
      }
    } else {
      setUser(prev => ({
        ...prev,
        balanceRub: prev.balanceRub - 490,
        tariff: 'premium'
      }));
      alert('Поздравляем! Ваш SMM комбайн повышен до уровня PREMIUM! Все лимиты сняты.');
    }
  };

  // Join Promo bundles Mutual portfolios logic #8
  const handleJoinBundle = (bundleId: string, channelId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;

    // Deduct fee and payout split simulation
    if (bundle.entryFeeRub > 0) {
      setUser(prev => ({
        ...prev,
        balanceRub: Math.max(0, prev.balanceRub - bundle.entryFeeRub)
      }));
    }

    setBundles(bundles.map(b => {
      if (b.id === bundleId) {
        return {
          ...b,
          channelsCount: b.channelsCount + 1,
          joinedChannels: [...b.joinedChannels, channelId]
        };
      }
      return b;
    }));
  };

  // Add new folder mutual directory promo (free for organizers)
  const handleAddBundle = (newBund: Omit<PromoBundle, 'id' | 'channelsCount' | 'joinedChannels'>) => {
    const created: PromoBundle = {
      ...newBund,
      id: `bnd-${Date.now()}`,
      channelsCount: 1,
      joinedChannels: ['ch-creator']
    };
    setBundles([created, ...bundles]);
    alert('Кампания продвижения успешно создана! Члены папки будут пополнять ваши счета.');
  };

  // Bulletin add offer post
  const handlePostBulletinAd = (newAd: Omit<BulletinAd, 'id' | 'createdAt' | 'clicks'>) => {
    const created: BulletinAd = {
      ...newAd,
      id: `bull-${Date.now()}`,
      createdAt: new Date().toISOString(),
      clicks: 0
    };
    setBulletinAds([created, ...bulletinAds]);
  };

  // Bulletin click counter tracker simulation
  const handleAdClick = (adId: string) => {
    setBulletinAds(bulletinAds.map(ad => {
      if (ad.id === adId) {
        return { ...ad, clicks: ad.clicks + 1 };
      }
      return ad;
    }));
  };

  // Core metrics accumulator
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 12500);
  const totalClicks = posts.reduce((sum, p) => sum + (p.clicks || 0), 980);

  return (
    <div className="min-h-screen flex flex-col md:flex-row pb-16 md:pb-0 font-sans" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #ffedd5 50%, #fce7f3 100%)' }}>
      
      {/* 1. Desktop Sidebar Column */}
      <Sidebar 
        currentPath={currentPath}
        onNavigate={changeRoute}
        tariff={user.tariff}
        tokens={user.tokens}
        balanceRub={user.balanceRub}
        userName={user.name}
        telegramUsername={user.telegramUsername}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto no-scrollbar pt-4 px-4 md:p-6 lg:p-8 space-y-5">
        
        {/* Mobile Header Banner from reference screenshots */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/75 backdrop-blur border border-white/50 shadow-sm md:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded font-black text-white text-xs">ИИ</span>
            <span className="font-black text-sm text-slate-800 tracking-tight">ИИSMM ПАНЕЛЬ</span>
            {(user.telegramUsername === '@shishkarnem' || user.name.toLowerCase().includes('шишкар')) && (
              <button 
                onClick={() => changeRoute('/admin')}
                className="px-2 py-0.5 bg-rose-600 text-white text-[8px] font-black rounded-full animate-pulse"
              >
                АДМИН 👑
              </button>
            )}
          </div>
          {user.tariff === 'premium' ? (
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">PREMIUM</span>
          ) : (
            <button 
              id="mobile-btn-upgrade"
              onClick={handleUpgradeTariff}
              className="px-2.5 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-[9px] rounded shadow-sm hover:opacity-95"
            >
              UPGRADE
            </button>
          )}
        </div>

        {/* Dynamic Route View Switching */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.18 }}
            >
              {currentPath === '/start' && (
                <ProfileAndOnboarding 
                  user={user}
                  onUpgradeTariff={handleUpgradeTariff}
                  onReplenishTokens={handleReplenishTokens}
                  onReplenishBalance={handleReplenishBalance}
                  onUpdateUser={setUser}
                />
              )}

              {currentPath === '/channels' && (
                <ChannelList 
                  channels={channels}
                  onAddChannel={handleAddChannel}
                  onRemoveChannel={handleRemoveChannel}
                  tariff={user.tariff}
                  userBalance={user.balanceRub}
                  onBuySlot={handleBuySlotSelection}
                />
              )}

              {currentPath === '/posts' && (
                <PostMaker 
                  onPublishPost={handlePublishPost}
                  savedPosts={posts}
                  connectedChannels={channels}
                  tokens={user.tokens}
                  onDeductTokens={handleDeductTokens}
                />
              )}

              {currentPath === '/market' && (
                <AdMarketplace 
                  adListings={adListings}
                  bulletinAds={bulletinAds}
                  userTariff={user.tariff}
                  userBalance={user.balanceRub}
                  onPostBulletinAd={handlePostBulletinAd}
                  onBuyAdSlot={handleBuyAdSlot}
                  onAddFunds={handleReplenishBalance}
                  onAdClick={handleAdClick}
                />
              )}

              {currentPath === '/bundles' && (
                <PromoBundles 
                  bundles={bundles}
                  joinedChannelsIds={bundles.flatMap(b => b.joinedChannels.map(cid => b.id + '-' + cid))}
                  onAddBundle={handleAddBundle}
                  onJoinBundle={handleJoinBundle}
                  userBalance={user.balanceRub}
                  userChannels={channels}
                  onAddFunds={handleReplenishBalance}
                />
              )}

              {currentPath === '/profile' && (
                <AnalyticsDashboard 
                  channelsCount={channels.length}
                  postsCount={posts.length}
                  totalViews={totalViews}
                  totalClicks={totalClicks}
                  balanceRub={user.balanceRub}
                  earningsRub={user.earningsRub}
                />
              )}

              {currentPath === '/admin' && (
                <SuperadminPanel 
                  currentUser={user}
                  onUpdateCurrentUser={setUser}
                  allChannelsCount={channels.length}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 3. Mobile Navigation Dock */}
      <BottomNavbar 
        currentPath={currentPath}
        onNavigate={changeRoute}
        tariff={user.tariff}
      />

    </div>
  );
}
