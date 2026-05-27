import React, { useState, useEffect } from 'react';
import { 
  SocialChannel, CampaignPost, PromoBundle, AdListing, BulletinAd, UserAccount, SocialNetwork, AdOrder 
} from './types';
import Sidebar from './components/Sidebar';
import BottomNavbar from './components/BottomNavbar';
import StartPage from './pages/StartPage';
import ChannelsPage from './pages/ChannelsPage';
import PostsPage from './pages/PostsPage';
import MarketPage from './pages/MarketPage';
import BundlesPage from './pages/BundlesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import AIPage from './pages/AIPage';
import LiquidGlassBackground from './components/LiquidGlassBackground';
import { Sparkles, Play, ShieldCheck, Mail, MessageSquare, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: {
          user?: {
            id: number;
            username?: string;
            first_name: string;
            last_name?: string;
            photo_url?: string;
          };
        };
        paymentStars?: number;
        ready: () => void;
        close: () => void;
        expand: () => void;
      };
    };
  }
}

export default function App() {
  // 0. Telegram Session login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Navigation Routing State (Browser Native Router)
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const landingPaths = ['/main', '/blog', '/ai', '/market-exchange', '/canvas', '/prices', '/projects', '/academy'];
      const appPaths = ['/start', '/channels', '/posts', '/market', '/bundles', '/profile', '/admin'];
      const validPaths = [...appPaths, ...landingPaths];

      if (validPaths.includes(path) || path.startsWith('/blog/')) {
        setCurrentPath(path);
      } else if (path === '/' || path === '') {
        const defaultPath = isLoggedIn ? '/posts' : '/main';
        window.history.replaceState(null, '', defaultPath);
        setCurrentPath(defaultPath);
      } else {
        // Fallback for custom or unmatched paths
        const defaultPath = isLoggedIn ? '/posts' : '/main';
        window.history.replaceState(null, '', defaultPath);
        setCurrentPath(defaultPath);
      }
    };

    // Listen to popstate for browser back/forward buttons
    window.addEventListener('popstate', handleLocationChange);
    
    // Initial sync
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [isLoggedIn]);

  const changeRoute = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  // 2. Core User Account State (starts with 1,000,000 ИИрок and 7 days free premium/VIP)
  const [user, setUser] = useState<UserAccount>({
    id: 'usr-928',
    name: 'Иван Шишкарёв',
    firstName: 'Иван',
    lastName: 'Шишкарёв',
    telegramUsername: '@shishkarnem',
    tariff: 'vip', // Initial VIP tariff representing free trials
    tokens: 1000000, // Starts aligned as ИИрки = токены
    iirky: 1000000, // Pre-credited 1,000,000 ИИрок upon start!
    telegramStars: 250, // Stars balance
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    balanceRub: 350, // Starts standard
    earningsRub: 14500, // Total historically earned in system
    premiumUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU') // 7 days free
  });

  // TMA Automatic Registration Detector Hook of Telegram API
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser) {
          const namesStr = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ') || 'Пользователь Telegram';
          setUser({
            id: String(tgUser.id),
            name: namesStr,
            firstName: tgUser.first_name,
            lastName: tgUser.last_name || '',
            telegramUsername: tgUser.username ? `@${tgUser.username}` : `@id${tgUser.id}`,
            tariff: 'vip',
            tokens: 1000000,
            iirky: 1000000, // crediting 1,000,000 ИИрок automatically
            telegramStars: tg.paymentStars || 380, // realistic star balances or paymentStars detected
            avatarUrl: tgUser.photo_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&auto=format&fit=crop&q=80',
            balanceRub: 1250, // initial bonus
            earningsRub: 14500,
            premiumUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU') // 7 days trial free
          });
          setIsLoggedIn(true); // Automatically log in inside TMA environment!
          console.log("Telegram TMA user registered and signed up in one-click:", tgUser);
        }
      } catch (err) {
        console.error("TMA detection error:", err);
      }
    }
  }, []);

  // Quick 1-click registration simulation for standard browsers
  const handleTelegramOneClickRegister = (customData?: Partial<UserAccount>) => {
    setUser({
      id: customData?.id || 'tg-' + Math.floor(Math.random() * 900000000 + 100000000),
      name: customData?.name || 'Михаил Регистратов',
      firstName: customData?.firstName || 'Михаил',
      lastName: customData?.lastName || 'Регистратов',
      telegramUsername: customData?.telegramUsername || '@mikhail_quick',
      tariff: 'vip',
      tokens: 1000000,
      iirky: 1000000, // crediting 1,000,000 ИИрок automatically
      telegramStars: customData?.telegramStars || 450, // 450 Stars!
      avatarUrl: customData?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      balanceRub: 1250,
      earningsRub: 14500,
      premiumUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU') // 7 days бесплатно
    });
    setIsLoggedIn(true); // Sign in user instantly
    alert('⚡ БЫСТРАЯ РЕГИСТРАЦИЯ: Успешная ТМА-авторегистрация в 1-клик! Начислено 1,000,000 ИИрок и 7 дней подписки VIP бесплатно.');
  };

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
      content: 'Добавьте нашего бота @iismmAIbot в комментарии вашего канала! Он автоматически чистит спам со ссылками, борется с ИИ-комментаторами и организует мгновенные репосты.',
      linkUrl: 'https://t.me/iismmAIbot',
      postedBy: '@iismmAIbot_support',
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

  // Advertiser Orders for the user to respond to and earn money!
  const [advertiserOrders, setAdvertiserOrders] = useState<AdOrder[]>([
    {
      id: 'ord-1',
      title: 'Реклама ИИ-Академии Маркетинга',
      payoutRub: 350,
      platform: 'telegram',
      requirements: 'Держать в топе 2 часа. Без удаления.',
      postContent: '🚀 СТАНЬ ИИ-КОПИРАЙТЕРОМ ЗА 2 НЕДЕЛИ!\nЗапишись в нашу Академию и научись генерировать контент в 10 раз быстрее.'
    },
    {
      id: 'ord-2',
      title: 'Продвижение экосистемы @iismmAIbot',
      payoutRub: 550,
      platform: 'telegram',
      requirements: 'Опубликовать на 24 часа.',
      postContent: '🤖 Подключи @iismmAIbot прямо сейчас! Авточистка лохотронов, спама, рекламы ставок в комментариях вашего канала. Работает бесплатно.'
    },
    {
      id: 'ord-3',
      title: 'Реклама курсов UI/UX дизайна',
      payoutRub: 400,
      platform: 'vk',
      requirements: 'Размещение в ленту.',
      postContent: '🎨 Хочешь создавать интерфейсы в стиле Apple Liquid Glass? Приходи на наш бесплатный интенсив!'
    }
  ]);

  const handleAddAdListing = (listing: Omit<AdListing, 'id'>) => {
    const newListing: AdListing = {
      ...listing,
      id: `ad-lst-${Date.now()}`
    };
    setAdListings(prev => [newListing, ...prev]);
  };

  const handleEarnMoney = (amount: number, orderTitle: string, channelName: string) => {
    setUser(prev => ({
      ...prev,
      balanceRub: prev.balanceRub + amount,
      earningsRub: (prev.earningsRub || 0) + amount
    }));
    
    // Create actual simulated published post
    const newPost: CampaignPost = {
      id: `post-ord-${Date.now()}`,
      title: `Реклама: ${orderTitle}`,
      content: `Интеграция выполнена на канале ${channelName}. Вы заработали ${amount} ₽.`,
      platforms: ['telegram'],
      status: 'published',
      clicks: Math.floor(Math.random() * 45) + 10,
      views: Math.floor(Math.random() * 500) + 150,
      isAiGenerated: false
    };
    setPosts(prev => [newPost, ...prev]);
  };

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
      isPremium: user.tariff !== 'free',
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
      tariff: slotsCount >= 3 ? 'pro' : prev.tariff // Unlock pro if they buy bulk slots
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

  // Triggering PRO / VIP Account Tariff upgrade
  const handleUpgradeTariff = (plan: 'free' | 'pro' | 'vip' = 'pro', useIirky: boolean = false) => {
    if (plan === 'free') {
      setUser(prev => ({ ...prev, tariff: 'free' }));
      alert('Вы переключили тариф на Free.');
      return;
    }

    const costRur = plan === 'pro' ? 490 : 990;
    const costIirky = plan === 'pro' ? 250 : 500;
    const label = plan.toUpperCase();

    if (useIirky) {
      if ((user.iirky || 0) < costIirky) {
        alert(`Недостаточно ИИрок! Для активации ${label} требуется ${costIirky} ИИрок. Ваш баланс: ${(user.iirky || 0).toLocaleString()} ИИрок.`);
        return;
      }
      setUser(prev => ({
        ...prev,
        iirky: (prev.iirky || 0) - costIirky,
        tariff: plan,
        premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')
      }));
      alert(`Поздравляем! Вы активировали подписку ${label} на 30 дней за ${costIirky} ИИрок!`);
    } else {
      if (user.balanceRub < costRur) {
        if (confirm(`Ваш текущий баланс (${user.balanceRub} ₽) недостаточен. Пополнить баланс на ${costRur} ₽ для активации подписки ${label}?`)) {
          setUser(prev => ({
            ...prev,
            balanceRub: prev.balanceRub,
            tariff: plan,
            premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')
          }));
          alert(`Поздравляем! Ваш SMM комбайн успешно повышен до уровня ${label}!`);
        }
      } else {
        setUser(prev => ({
          ...prev,
          balanceRub: prev.balanceRub - costRur,
          tariff: plan,
          premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')
        }));
        alert(`Поздравляем! Ваш SMM комбайн успешно повышен до уровня ${label}!`);
      }
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

  if (!isLoggedIn) {
    return (
      <LandingPage 
        onLogin={() => setIsLoggedIn(true)} 
        user={user} 
        onUpdateUser={setUser} 
        currentPath={currentPath}
        onNavigate={changeRoute}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row pb-16 md:pb-0 font-sans relative overflow-hidden">
      <LiquidGlassBackground />
      
      {/* 1. Desktop Sidebar Column */}
      <Sidebar 
        currentPath={currentPath}
        onNavigate={changeRoute}
        tariff={user.tariff}
        tokens={user.tokens}
        balanceRub={user.balanceRub}
        userName={user.name}
        telegramUsername={user.telegramUsername}
        iirky={user.iirky}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto no-scrollbar pt-4 px-4 md:p-6 lg:p-8 space-y-5 relative z-10">
        
        {/* Mobile Header Banner - Compact & Clean with Centered Burger Menu */}
        <div className="flex items-center justify-between p-2.5 px-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow-xs md:hidden shrink-0 relative">
          {/* LEFT: Mini Brand Logo */}
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => changeRoute('/posts')}>
            <span className="p-1 px-1.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg font-black text-white text-[10px]">ИИ</span>
            <span className="font-black text-xs text-slate-800 tracking-tight">ИИSMM</span>
          </div>

          {/* CENTER: Burger "Бутерброд" Menu Button */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="bg-white/90 hover:bg-white text-slate-700 p-1 px-3.5 rounded-full text-[11px] font-black tracking-wide flex items-center gap-1.5 cursor-pointer border border-slate-200/50 shadow-xs active:scale-95 transition-all"
            >
              <span className="text-[13px] text-pink-500 font-bold">{mobileMenuOpen ? '✕' : '☰'}</span>
              <span className="uppercase font-sans font-black tracking-wider text-[9px] text-slate-600">Меню</span>
            </button>
          </div>

          {/* RIGHT: Upgrade status or Tariff */}
          <div className="flex items-center gap-1.5">
            {user.tariff === 'vip' ? (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[8px] font-black rounded uppercase">★ VIP</span>
            ) : user.tariff === 'pro' ? (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[8px] font-black rounded uppercase">⚡ PRO</span>
            ) : (
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[8px] font-black rounded uppercase">FREE</span>
            )}
            <span className="text-[10px] font-black text-slate-700 bg-white/70 px-2 py-0.5 rounded-lg border border-white font-mono">
              {user.balanceRub} ₽
            </span>
          </div>
        </div>

        {/* Floating Slide-Down Burger Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden z-30 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/50 p-3.5 shadow-xl space-y-2.5 relative"
            >
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b pb-1.5 mb-2">
                📂 Быстрая навигация ИИSMM
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '🚀 Старт', path: '/start', color: 'hover:bg-sky-50 text-slate-700' },
                  { label: '📡 Каналы', path: '/channels', color: 'hover:bg-orange-50 text-slate-700' },
                  { label: '✍️ Создать Пост', path: '/posts', color: 'hover:bg-pink-50 text-slate-700' },
                  { label: '🛡 ИИ Биржа', path: '/market', color: 'hover:bg-indigo-50 text-slate-700' },
                  { label: '📁 Папки Пиара', path: '/bundles', color: 'hover:bg-teal-50 text-slate-700' },
                  { label: '📊 Кабинет', path: '/profile', color: 'hover:bg-purple-50 text-slate-700' },
                ].map((item) => {
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        changeRoute(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-1.5 py-2.5 rounded-xl text-center font-black text-xs cursor-pointer border transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-100 to-pink-100 border-slate-950 text-slate-950 shadow-xs scale-[1.02]' 
                          : `bg-white/60 border-slate-250 text-slate-700 ${item.color}`
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <StartPage 
                  user={user}
                  onUpgradeTariff={handleUpgradeTariff}
                  onReplenishTokens={handleReplenishTokens}
                  onReplenishBalance={handleReplenishBalance}
                  onUpdateUser={setUser}
                  onTelegramRegister={handleTelegramOneClickRegister}
                />
              )}

              {currentPath === '/channels' && (
                <ChannelsPage 
                  channels={channels}
                  onAddChannel={handleAddChannel}
                  onRemoveChannel={handleRemoveChannel}
                  tariff={user.tariff}
                  userBalance={user.balanceRub}
                  onBuySlot={handleBuySlotSelection}
                />
              )}

              {currentPath === '/posts' && (
                <PostsPage 
                  onPublishPost={handlePublishPost}
                  savedPosts={posts}
                  connectedChannels={channels}
                  tokens={user.tokens}
                  onDeductTokens={handleDeductTokens}
                />
              )}

              {currentPath === '/market' && (
                <MarketPage 
                  adListings={adListings}
                  bulletinAds={bulletinAds}
                  userTariff={user.tariff}
                  userBalance={user.balanceRub}
                  onPostBulletinAd={handlePostBulletinAd}
                  onBuyAdSlot={handleBuyAdSlot}
                  onAddFunds={handleReplenishBalance}
                  onAdClick={handleAdClick}
                  connectedChannels={channels}
                  onAddAdListing={handleAddAdListing}
                  onEarnMoney={handleEarnMoney}
                  advertiserOrders={advertiserOrders}
                />
              )}

              {currentPath === '/bundles' && (
                <BundlesPage 
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
                <ProfilePage 
                  channelsCount={channels.length}
                  postsCount={posts.length}
                  totalViews={totalViews}
                  totalClicks={totalClicks}
                  balanceRub={user.balanceRub}
                  earningsRub={user.earningsRub}
                />
              )}

              {currentPath === '/admin' && (
                <AdminPage 
                  currentUser={user}
                  onUpdateCurrentUser={setUser}
                  allChannelsCount={channels.length}
                />
              )}

              {(currentPath === '/blog' || currentPath.startsWith('/blog/')) && (
                <BlogPage 
                  currentPath={currentPath}
                  onNavigate={changeRoute}
                  isLoggedIn={true}
                />
              )}

              {currentPath === '/ai' && (
                <AIPage />
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
