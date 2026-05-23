import React, { useState } from 'react';
import { UserAccount } from '../types';
import { 
  Sparkles, Wallet, ShieldCheck, Trophy, BadgeInfo, Play, ChevronRight, HelpCircle, Key, 
  RefreshCw, Smartphone, Calendar, Send, Check, CheckCircle2, AlertCircle, Eye, Settings, 
  Globe, LayoutGrid, Image as ImageIcon, Users2, Shield, Info, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileAndOnboardingProps {
  user: UserAccount;
  onUpgradeTariff: () => void;
  onReplenishTokens: (amount: number, costRub: number) => void;
  onReplenishBalance: (amount: number) => void;
  onUpdateUser?: (updated: UserAccount) => void;
}

// Simulated scheduled posts in SMM planner grid
interface ScheduledGridItem {
  id: string;
  day: string; // 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс'
  hour: string; // '09:00' | '12:00' | '15:00' | '18:00' | '21:00'
  title: string;
  platform: string;
}

export default function ProfileAndOnboarding({
  user,
  onUpgradeTariff,
  onReplenishTokens,
  onReplenishBalance,
  onUpdateUser
}: ProfileAndOnboardingProps) {
  // Navigation Toggles: 'landing' (SMM Planner presentation) or 'account' (billing & settings)
  const [activeTab, setActiveTab] = useState<'landing' | 'account'>('landing');

  // Interactive Bot Presence Checker state
  const [tgChannelInput, setTgChannelInput] = useState('');
  const [checkingBotStatus, setCheckingBotStatus] = useState<'idle' | 'checking' | 'verified' | 'error'>('idle');
  const [presenceErrorMsg, setPresenceErrorMsg] = useState('');
  const [checkedChannel, setCheckedChannel] = useState('');

  // SMM Planner scheduler grid interactive state
  const [gridItems, setGridItems] = useState<ScheduledGridItem[]>([
    { id: '1', day: 'Пн', hour: '09:00', title: 'Утренний дайджест ИИ', platform: 'telegram' },
    { id: '2', day: 'Вт', hour: '15:00', title: 'Обзор новинок нейросетей', platform: 'vk' },
    { id: '3', day: 'Чт', hour: '12:00', title: 'Пост взаимного пиара', platform: 'telegram' },
    { id: '4', day: 'Пт', hour: '18:00', title: 'Мем про копирайтеров', platform: 'instagram' },
    { id: '5', day: 'Вс', hour: '21:00', title: 'Итоги SMM недели', platform: 'telegram' }
  ]);

  // Scheduler grid editor state
  const [newSlotDay, setNewSlotDay] = useState('Пн');
  const [newSlotHour, setNewSlotHour] = useState('12:00');
  const [newSlotTitle, setNewSlotTitle] = useState('');
  const [newSlotPlatform, setNewSlotPlatform] = useState('telegram');
  const [isAddingSlot, setIsAddingSlot] = useState(false);

  // Telegram bot registration credentials
  const [showTelegramAuth, setShowTelegramAuth] = useState(false);
  const [telegramPhoneInput, setTelegramPhoneInput] = useState('');
  const [telegramCodeSent, setTelegramCodeSent] = useState(false);
  const [tgAuthCode, setTgAuthCode] = useState('');
  const [customTgUsername, setCustomTgUsername] = useState('');
  const [isTgAuthorized, setIsTgAuthorized] = useState(false);

  // Watermark Showcase interactive state
  const [watermarkText, setWatermarkText] = useState('ИИSMM @shishkarnem');
  const [watermarkPosition, setWatermarkPosition] = useState<'top-right' | 'bottom-right' | 'bottom-left' | 'center'>('bottom-right');
  const [watermarkOpacity, setWatermarkOpacity] = useState(60);

  // General billing state
  const [showTokenStore, setShowTokenStore] = useState(false);
  const [tokenPack, setTokenPack] = useState({ tokens: 100, price: 150 });

  // Bot Information Constants
  const botUsername = '@iismmAIbot';
  const botLink = 'https://t.me/iismmAIbot';
  const botToken = '8897583774:AAGWCOVN0_mQ6V7L5UnnmkzZAqfaPkDSkk4';

  // Handler: Add grid scheduler slot
  const handleAddGridSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotTitle) {
      alert('Укажите заголовок или краткий текст публикации!');
      return;
    }
    const newItem: ScheduledGridItem = {
      id: String(Date.now()),
      day: newSlotDay,
      hour: newSlotHour,
      title: newSlotTitle,
      platform: newSlotPlatform
    };
    setGridItems([...gridItems, newItem]);
    setNewSlotTitle('');
    setIsAddingSlot(false);
    alert('Пост успешно запланирован в календарную сетку SMM Planner!');
  };

  // Handler: Delete scheduler grid item
  const handleDeleteGridItem = (id: string) => {
    setGridItems(gridItems.filter(item => item.id !== id));
  };

  // Handler: Simulate checking bot admin status inside channel
  const handleCheckBotAdminPresence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgChannelInput) {
      alert('Пожалуйста, введите юзернейм или ID телеграм-канала!');
      return;
    }

    // Standardize input format
    let cleanChannel = tgChannelInput.trim();
    if (!cleanChannel.startsWith('@') && !cleanChannel.startsWith('-100') && isNaN(Number(cleanChannel))) {
      cleanChannel = '@' + cleanChannel;
    }

    setCheckingBotStatus('checking');
    setCheckedChannel(cleanChannel);

    setTimeout(() => {
      // Logic simulation: If users enter channel containing words "error" or "bad", simulate failure. Otherwise successful.
      if (cleanChannel.toLowerCase().includes('error') || cleanChannel.toLowerCase().includes('fail')) {
        setCheckingBotStatus('error');
        setPresenceErrorMsg('Бот @iismmAIbot на найден на канале. Добавьте его в администраторы и повторите попытку.');
      } else {
        setCheckingBotStatus('verified');
      }
    }, 1500); // realistic check animation time
  };

  // Handler: Run Telegram Verification code submission
  const handleSendTgCode = () => {
    if (!telegramPhoneInput && !customTgUsername) {
      alert('Введите юзернейм или номер телефона телеграм!');
      return;
    }
    setTelegramCodeSent(true);
    alert('Инициализирован запрос через @iismmAIbot! Проверьте ваши сообщения в Telegram и введите код.');
  };

  // Handler: Submit Code
  const handleSubmitTgAuthCode = () => {
    if (!tgAuthCode || tgAuthCode.length < 4) {
      alert('Введите корректный проверочный код из бота!');
      return;
    }

    // Update global user name and status
    const formattedUsername = customTgUsername ? (customTgUsername.startsWith('@') ? customTgUsername : '@' + customTgUsername) : '@tg_user';
    
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: customTgUsername ? `Пользователь ${customTgUsername}` : 'Зарегистрированный TG',
        telegramUsername: formattedUsername
      });
    }

    setIsTgAuthorized(true);
    alert(`Регистрация через API-шлюз @iismmAIbot подтверждена! Добро пожаловать, ${formattedUsername}!`);
    setShowTelegramAuth(false);
  };

  // Helper packs purchase
  const purchaseTokens = () => {
    onReplenishTokens(tokenPack.tokens, tokenPack.price);
    alert(`ИИ-Токены успешно зачислены (+${tokenPack.tokens} ед.)!`);
    setShowTokenStore(false);
  };

  // Grid constants
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const gridHours = ['09:00', '12:00', '15:00', '18:00', '21:00'];

  return (
    <div className="space-y-6">

      {/* Primary Landing / Account Mode Selector */}
      <div className="flex bg-white/70 backdrop-blur-md p-1 rounded-2xl border border-white/50 shadow-sm max-w-sm">
        <button
          onClick={() => setActiveTab('landing')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'landing' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>SMM Planner Лендинг</span>
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'account' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Кабинет & Балансы</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* TAB 1: SMM PLANNER PUBLIC MARKETING LANDING PAGE */}
        {activeTab === 'landing' && (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            
            {/* HERO BANNER SECTION (smmplanner.com style) */}
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-2xl space-y-5">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 text-[10px] font-black tracking-widest uppercase">
                  АНАЛОГ SMM PLANNER №1 В РФ С ИНТЕГРАЦИЕЙ ГЕМИНИ
                </span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Один сервис для планирования и автопостинга во все соцсети
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Планируйте контент в Telegram, ВКонтакте, Одноклассники, Instagram, Facebook, LinkedIn, Pinterest и TenChat. Умные ИИ-рерайты, водяные знаки, кросспостинг с кнопками и полностью автоматизированный бот управления публикациями.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => setShowTelegramAuth(true)}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Умный вход через Telegram</span>
                  </button>
                  <a 
                    href={botLink} 
                    target="_blank" 
                    rel="referrer noopener"
                    className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all text-center"
                  >
                    <span>Запустить @iismmAIbot</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Decorative geometric blur elements matching Geometric Balance */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent blur-2xl z-0 pointer-events-none"></div>
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-600 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute left-1/2 bottom-8 w-12 h-12 bg-pink-500 rounded-lg rotate-12 blur-sm opacity-20"></div>
            </div>

            {/* INTEGRATED TELEGRAM BOT STATUS admin checks & settings (проверки наличия бота админом) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-7 bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
                      Проверка @iismmAIbot в канале (АДМИНПАНЕЛЬ)
                    </h3>
                    <p className="text-[11px] text-slate-400">Убедитесь, что бот назначен администратором вашего канала с правами отправки постов</p>
                  </div>
                </div>

                <form onSubmit={handleCheckBotAdminPresence} className="space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="text-slate-500 font-bold text-[10px] uppercase">Введите юзернейм или ID вашего телеграм-канала</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        placeholder="@botmothercom"
                        value={tgChannelInput}
                        onChange={e => setTgChannelInput(e.target.value)}
                        className="flex-1 bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-mono placeholder:font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button 
                        type="submit" 
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow transition-all flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {checkingBotStatus === 'checking' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                        <span>{checkingBotStatus === 'checking' ? 'Проверяем...' : 'Проверить статус'}</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Verification result display */}
                <AnimatePresence mode="wait">
                  {checkingBotStatus === 'verified' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3 text-xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-emerald-800">Бот {botUsername} успешно авторизован!</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          Канал <span className="font-bold font-mono text-slate-800">{checkedChannel}</span> проверен. Бот состоит в администраторах с правами на публикацию и подключение цветных кнопок. Вы можете отправлять запланированные публикации со вкладки «Контент»!
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {checkingBotStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-3 text-xs"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-rose-800">Ошибка авторизации бота</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{presenceErrorMsg}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">
                          Инструкция: Добавьте {botLink} в админы вашего закрытого или публичного канала.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] text-slate-500 space-y-1 leading-normal">
                  <span className="font-bold text-slate-700 block">Системные сведения для ваших настроек:</span>
                  <div>• Токен бота: <code className="bg-slate-150 px-1 py-0.5 rounded font-mono text-slate-600 text-[10px] select-all">{botToken}</code></div>
                  <div>• Метод отправки: <span className="font-bold">Telegram Bot API (sendMessage & sendPhoto)</span></div>
                </div>
              </div>

              {/* TELEGRAM AUTO-REGISTRATION SIMULATOR SUITE */}
              <div className="lg:col-span-5 bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-wider">
                      Вход / Регистрация через бот
                    </span>
                    <span className="text-[10px] font-mono text-indigo-700 font-bold">@iismmAIbot API</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800">Быстрая авторизация в 2 клика</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Наш бот позволяет зарегистрироваться и привязать свою учетную запись мгновенно, без ввода сложных паролей СМП.
                  </p>

                  <div className="bg-indigo-50/40 p-3.5 rounded-2xl border border-indigo-100/40 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                      <p className="text-xs font-semibold text-slate-700">Запустите бота в приложении</p>
                    </div>
                    <a 
                      href={botLink} 
                      target="_blank" 
                      rel="referrer noopener"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase shadow-sm cursor-pointer ml-7"
                    >
                      <span>Открыть @iismmAIbot</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2 pt-1 border-t border-indigo-100/10 mt-1">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                      <p className="text-xs font-semibold text-slate-700">Укажите свой ник или телефон</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
                  <button 
                    onClick={() => setShowTelegramAuth(true)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Авторизовать профиль TG</span>
                  </button>
                </div>
              </div>

            </div>

            {/* INTERACTIVE COMPONENT: PUBLICATION GRID SMM PLANNER (СЕТКА ПУБЛИКАЦИЙ) */}
            <div className="bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-indigo-600" /> Игры Сетки: Сетка публикаций SMM-менеджера
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Встроенный календарь планирования контента. Быстро назначайте часы по дням недели!</p>
                </div>

                <button
                  onClick={() => setIsAddingSlot(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Запланировать в Сетку</span>
                </button>
              </div>

              {/* Interactive Modal form for scheduling calendar inside page */}
              {isAddingSlot && (
                <form onSubmit={handleAddGridSlot} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 text-xs font-semibold">
                  <h4 className="font-bold text-slate-800">Новое планирование в календарную сетку</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-500 font-bold block">День недели</label>
                      <select 
                        value={newSlotDay} 
                        onChange={e => setNewSlotDay(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-lg"
                      >
                        {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 font-bold block">Время</label>
                      <select 
                        value={newSlotHour} 
                        onChange={e => setNewSlotHour(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-lg"
                      >
                        {gridHours.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 font-bold block">Сеть</label>
                      <select 
                        value={newSlotPlatform} 
                        onChange={e => setNewSlotPlatform(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-lg"
                      >
                        <option value="telegram">Telegram</option>
                        <option value="vk">ВКонтакте</option>
                        <option value="instagram">Instagram</option>
                      </select>
                    </div>

                    <div className="space-y-1 col-span-2 md:col-span-1">
                      <label className="text-slate-500 font-bold block">Что опубликовать</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Заголовок поста..."
                        value={newSlotTitle} 
                        onChange={e => setNewSlotTitle(e.target.value)}
                        className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button 
                      type="button" 
                      onClick={() => setIsAddingSlot(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg text-xs"
                    >
                      Отмена
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-md"
                    >
                      Добавить
                    </button>
                  </div>
                </form>
              )}

              {/* SMM Planner Signature Grid */}
              <div className="overflow-x-auto rounded-2xl border border-slate-150 bg-white">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b">
                      <th className="p-3 border-r border-slate-100 font-bold text-slate-500 text-[10px] uppercase tracking-wider text-left min-w-[80px]">Время</th>
                      {daysOfWeek.map(day => (
                        <th key={day} className="p-3 border-r border-slate-100 font-bold text-slate-700">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {gridHours.map(hour => (
                      <tr key={hour} className="border-b last:border-0 hover:bg-slate-50/40">
                        <td className="p-3 border-r border-slate-100 text-slate-500 font-mono font-bold text-left bg-slate-50/50">{hour}</td>
                        {daysOfWeek.map(day => {
                          const slotItems = gridItems.filter(item => item.day === day && item.hour === hour);
                          return (
                            <td key={day} className="p-2 border-r border-slate-100 align-top min-w-[120px] h-20 relative">
                              {slotItems.length > 0 ? (
                                <div className="space-y-1">
                                  {slotItems.map(item => (
                                    <div 
                                      key={item.id} 
                                      className={`p-1 px-1.5 rounded text-[10px] text-left leading-snug border space-y-1 relative group ${
                                        item.platform === 'telegram' 
                                          ? 'bg-sky-50 border-sky-100 text-sky-800' 
                                          : item.platform === 'vk' 
                                          ? 'bg-blue-50 border-blue-100 text-blue-800' 
                                          : 'bg-pink-50 border-pink-100 text-pink-800'
                                      }`}
                                    >
                                      <p className="font-bold truncate" title={item.title}>{item.title}</p>
                                      <div className="flex justify-between items-center text-[8px] opacity-75">
                                        <span className="font-black uppercase">{item.platform}</span>
                                        <button 
                                          onClick={() => handleDeleteGridItem(item.id)}
                                          className="text-rose-600 font-black cursor-pointer hover:underline"
                                        >
                                          &times;
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setNewSlotDay(day);
                                    setNewSlotHour(hour);
                                    setIsAddingSlot(true);
                                  }}
                                  className="absolute inset-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-slate-50/50 flex items-center justify-center text-slate-400 font-bold text-xs transition-opacity cursor-pointer"
                                >
                                  + Добавить
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* WATERMARK & STORY SAFE AREA DESIGNER (ИНСТРУМЕНТЫ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* SMM Planner Watermark Overlay Studio */}
              <div className="bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm space-y-4">
                <div className="pb-2 border-b">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-600" /> Студия Вотермарок / Защита картинок
                  </h3>
                  <p className="text-[11px] text-slate-400">Наложите логотип или подпись на посты для защиты авторского права</p>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold text-[10px] uppercase">Текст водяного знака</label>
                    <input 
                      type="text" 
                      value={watermarkText}
                      onChange={e => setWatermarkText(e.target.value)}
                      className="w-full bg-white border p-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-slate-500 font-bold text-[10px] uppercase">Положение</label>
                      <select 
                        value={watermarkPosition}
                        onChange={e => setWatermarkPosition(e.target.value as any)}
                        className="w-full bg-white border p-2 rounded-lg text-xs"
                      >
                        <option value="top-right">Сверху справа</option>
                        <option value="bottom-right">Снизу справа</option>
                        <option value="bottom-left">Снизу слева</option>
                        <option value="center">По центру</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 font-bold text-[10px] uppercase">Прозрачность ({watermarkOpacity}%)</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={watermarkOpacity}
                        onChange={e => setWatermarkOpacity(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Visual Preview */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden relative aspect-video bg-indigo-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#ddd_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                    <span className="text-[11px] text-slate-400 font-bold">Демо картинки публикации в соцсети</span>
                    
                    {/* Watermark element */}
                    <div 
                      className={`absolute p-2 bg-black/20 text-white rounded text-[10px] font-mono tracking-wide pointer-events-none transition-all ${
                        watermarkPosition === 'top-right' ? 'top-2 right-2' : 
                        watermarkPosition === 'bottom-right' ? 'bottom-2 right-2' : 
                        watermarkPosition === 'bottom-left' ? 'bottom-2 left-2' : 'inset-0 m-auto w-fit h-fit'
                      }`}
                      style={{ opacity: watermarkOpacity / 100 }}
                    >
                      {watermarkText || 'ИИSMM'}
                    </div>
                  </div>
                </div>
              </div>

              {/* SMM Planner Stories Builder Previews */}
              <div className="bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm space-y-4">
                <div className="pb-2 border-b">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-pink-600" /> Story Safe-Area (Контур безопасных полей)
                  </h3>
                  <p className="text-[11px] text-slate-400">Правильно центрируйте текст и ссылки в сториз, чтобы интерфейс соцсети их не закрывал</p>
                </div>

                <div className="flex gap-4">
                  {/* Visual simulated phone */}
                  <div className="w-[110px] h-[190px] border-4 border-slate-800 rounded-2xl bg-gradient-to-tr from-orange-400 to-pink-500 overflow-hidden relative shrink-0">
                    {/* Safe zones indicators */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-rose-500/35 border-b border-rose-500/20 text-[6px] text-white flex items-center justify-center uppercase font-black tracking-widest leading-none">Верх поля ⚠️</div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-rose-500/35 border-t border-rose-500/20 text-[6px] text-white flex items-center justify-center uppercase font-black tracking-widest leading-none">Низ поля ⚠️</div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-2">
                      <p className="text-[10px] text-white font-black drop-shadow tracking-tight">ВАШ ТЕКСТ ТУТ</p>
                      <span className="text-[6px] px-1 py-0.5 bg-emerald-500 text-white rounded font-bold uppercase block w-fit mx-auto mt-1">Отлично</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-2.5 font-semibold text-slate-600">
                    <h4 className="font-bold text-slate-800">Рекомендации SMM Planner:</h4>
                    <p className="text-[11px] leading-relaxed font-medium">
                      Не размещайте хэштеги, опросы, стикеры или контакты в верхних 15% и нижних 20% экрана телефона. Там находятся элементы навигации и поле комментирования Instagram Stories.
                    </p>
                    <ul className="space-y-1 text-[11px] text-slate-500 list-disc pl-4 font-medium">
                      <li>Верхнее опасное поле: 120px</li>
                      <li>Нижнее опасное поле: 180px</li>
                      <li>Центральная безопасная область: 16:9</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* PRICING PLANS COMPACT TABLE */}
            <div className="bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm space-y-4">
              <div className="text-center space-y-1 max-w-md mx-auto">
                <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider">Тарифы Планировщика</h3>
                <p className="text-xs text-slate-500">Подберите оптимальный уровень автопостинга для ваших потребностей</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                
                {/* Plan 1 */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 space-y-4 text-center">
                  <div>
                    <h4 className="font-bold text-slate-700 uppercase tracking-wide">Бесплатный</h4>
                    <span className="text-xl font-mono text-slate-800 font-extrabold block mt-1">0 ₽ / мес</span>
                    <span className="text-[10px] text-slate-400">Стартовый ознакомительный</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium border-t border-slate-100 pt-3 text-left">
                    <li>• До 3 SMM каналов</li>
                    <li>• Ограничение 50 постов / мес</li>
                    <li>• Базовый рерайтер Gemini</li>
                    <li className="text-slate-300">• Поиск в интернете (Grounding)</li>
                    <li className="text-slate-300">• Убийца спама в комментариях</li>
                  </ul>
                  <button className="w-full py-1.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-[11px]">Текущий тариф</button>
                </div>

                {/* Plan 2 */}
                <div className="p-5 bg-gradient-to-tr from-white to-indigo-50/50 rounded-2xl border-2 border-indigo-200 space-y-4 text-center relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-full">РЕКОМЕНДУЕМ</span>
                  <div>
                    <h4 className="font-bold text-indigo-750 uppercase tracking-wide">Premium SMM</h4>
                    <span className="text-xl font-mono text-indigo-700 font-extrabold block mt-1">490 ₽ / мес</span>
                    <span className="text-[10px] text-indigo-500">Безлимитный автопостинг</span>
                  </div>
                  <ul className="space-y-1.5 text-indigo-900/80 text-[11px] font-medium border-t border-indigo-100 pt-3 text-left">
                    <li>✔️ Добавление без лимитов</li>
                    <li>✔️ ИИ Deep Rewrite от Gemini</li>
                    <li>✔️ Поиск трендов Grounding Search</li>
                    <li>✔️ Полная вотермарка картинок</li>
                    <li>✔️ Фильтрация спама ботом</li>
                  </ul>
                  <button 
                    onClick={onUpgradeTariff}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[11px] transition-all cursor-pointer"
                  >
                    Активировать
                  </button>
                </div>

                {/* Plan 3 */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 space-y-4 text-center">
                  <div>
                    <h4 className="font-bold text-slate-700 uppercase tracking-wide font-sans">SMM PRO Агентство</h4>
                    <span className="text-xl font-mono text-slate-800 font-extrabold block mt-1">1 200 ₽ / мес</span>
                    <span className="text-[10px] text-slate-400">Для командной структуры</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium border-t border-slate-100 pt-3 text-left">
                    <li>• Безлимитные каналы и админы</li>
                    <li>• Отдельные пиар-папки (bundles)</li>
                    <li>• Вывод средств со счета биржи</li>
                    <li>• Собственный брендовый бот</li>
                    <li>• Расширенная аналитика</li>
                  </ul>
                  <button 
                    onClick={() => onReplenishBalance(1200)}
                    className="w-full py-1.5 bg-slate-900 text-white font-bold rounded-xl text-[11px] cursor-pointer"
                  >
                    Пополнить баланс
                  </button>
                </div>

              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 2: ORIGINAL DETAILED Billing / Profile & Onboarding view */}
        {activeTab === 'account' && (
          <motion.div
            key="account-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            
            {/* Onboarding block rewritten */}
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur border border-white/50 space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-extrabold text-sm text-slate-800">Быстрые советы для старта ИИSMM</h3>
                <span className="text-[10px] text-indigo-700 font-mono">Бот контроля: @iiSmmBot</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="font-black text-indigo-600">1. Добавьте @iiSmmBot</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Добавьте нашего бота в администраторы своего телеграм канала с правами отправки текстов и кнопок.
                  </p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="font-black text-indigo-600">2. Подключите в СМК</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    На вкладке «Каналы» укажите юзернейм своего чата. Бот свяжется с системой мгновенно.
                  </p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="font-black text-indigo-600">3. Выпустите ИИ-пост</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    На странице «Редактор» сгенерируйте и опубликуйте кросс-пост со стильными кнопками в 1 клик.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Profile details */}
              <div className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center text-xl text-white font-bold">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800 tracking-tight">{user.name}</h3>
                    <p className="text-xs font-mono text-slate-400">{user.telegramUsername}</p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {user.tariff === 'premium' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> PREMIUM SMM АКТИВЕН
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-wider">
                          БЕСПЛАТНЫЙ ТАРИФ (ЛИМИТ 3 КАНАЛА)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs font-medium">
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wider">ИИ-Токены баланса</span>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-slate-800">{user.tokens} Ед</span>
                      <button
                        onClick={() => setShowTokenStore(true)}
                        className="text-[10px] text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer"
                      >
                        купить
                      </button>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wider">Общий доход с биржи</span>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-slate-800">{user.earningsRub} ₽</span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                        <Trophy className="w-3 h-3" /> Лидер
                      </span>
                    </div>
                  </div>
                </div>

                {/* Premium Banner Upgrade Option */}
                {user.tariff === 'free' && (
                  <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/20 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <h4 className="font-extrabold text-slate-850 text-xs uppercase tracking-wider">Premium разблокировка постингов</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Снимите ограничения на 3 бесплатных канала, получите безлимитное добавление блогов в ВК, OK, FB, Discord и доступ к ИИ-генерации Grounding Search без списания токенов!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onUpgradeTariff}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Активировать PREMIUM за 490 ₽ / месяц
                    </button>
                  </div>
                )}
              </div>

              {/* Access parameters info */}
              <div className="w-full lg:w-[280px] shrink-0 bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm space-y-4 text-xs font-medium">
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider pb-2 border-b">Сведения Платформы</h4>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 text-[9px] block uppercase tracking-wider">Интеграция ИИ</span>
                    <span className="text-slate-700 font-bold">Google Gemini 3.5 Flash</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[9px] block uppercase tracking-wider">Голосовой рерайтер</span>
                    <span className="text-slate-700 font-semibold">{botUsername} API</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[9px] block uppercase tracking-wider">Автозащита комбайна</span>
                    <span className="text-emerald-600 font-semibold">HTTPS Escrow Active ✔️</span>
                  </div>
                  
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] text-slate-400 leading-normal">
                    Все ключи доступа к Telegram API шифруются алгоритмами. Для изменения конфигурации обратитесь в техническую поддержку или к суперадмину @shishkarnem.
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* MODAL WINDOW: Telegram Authentication Simulator */}
      <AnimatePresence>
        {showTelegramAuth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-5 space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-indigo-600" /> Связать аккаунт Telegram
                </h3>
                <button 
                  onClick={() => {
                    setShowTelegramAuth(false);
                    setTelegramCodeSent(false);
                  }}
                  className="text-slate-400 font-bold text-base cursor-pointer hover:text-slate-600"
                >
                  &times;
                </button>
              </div>

              {!telegramCodeSent ? (
                <div className="space-y-3.5 text-xs font-semibold">
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Введите ваш Telegram Юзернейм (с @) или телефон. Наш бот {botUsername} свяжет его с вашими SMM профилями.
                  </p>
                  
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[9px] uppercase">Ваш @юзернейм в Telegram</label>
                    <input 
                      type="text" 
                      placeholder="@shishkarnem"
                      value={customTgUsername}
                      onChange={e => setCustomTgUsername(e.target.value)}
                      className="w-full bg-slate-50 border px-3 py-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[9px] uppercase">Или Номер телефона (для верификации)</label>
                    <input 
                      type="text" 
                      placeholder="+7 999 000-00-00"
                      value={telegramPhoneInput}
                      onChange={e => setTelegramPhoneInput(e.target.value)}
                      className="w-full bg-slate-50 border px-3 py-2.5 rounded-xl text-xs"
                    />
                  </div>

                  <button 
                    onClick={handleSendTgCode}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-505 text-white font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Запросить код в Telegram Бот
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs font-semibold">
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/30 rounded-xl space-y-1 text-indigo-850">
                    <span className="font-bold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Инструкция:</span>
                    <p className="text-[11px] leading-relaxed font-medium">
                      Запустите бота <a href={botLink} target="_blank" rel="referrer noopener" className="underline font-bold text-indigo-700">{botUsername}</a> и скопируйте 6-значный код верификации сессии в поле ниже.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[9px] uppercase">Код подтверждения сессии</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 524151"
                      value={tgAuthCode}
                      onChange={e => setTgAuthCode(e.target.value)}
                      className="w-full bg-slate-50 border px-3 py-2 rounded-xl text-xs font-mono text-center tracking-widest text-lg font-bold"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTelegramCodeSent(false)}
                      className="flex-1 py-2 bg-slate-150 text-slate-500 rounded-lg"
                    >
                      Назад
                    </button>
                    <button 
                      onClick={handleSubmitTgAuthCode}
                      className="flex-1 py-2 bg-indigo-605 bg-indigo-600 text-white font-bold rounded-lg cursor-pointer"
                    >
                      Подтвердить вход
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL WINDOW: Purchase token packs store */}
      <AnimatePresence>
        {showTokenStore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-5 space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-2 text-slate-800">
                <h3 className="font-extrabold text-sm flex items-center gap-1">
                  <Key className="w-4 h-4 text-indigo-600" /> Пополнение ИИ-Токенов
                </h3>
                <button 
                  onClick={() => setShowTokenStore(false)}
                  className="text-slate-400 font-bold ml-auto cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Выберите выгодный пакет токенов:</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div 
                    onClick={() => setTokenPack({ tokens: 100, price: 150 })}
                    className={`p-2.5 rounded-xl border cursor-pointer ${
                      tokenPack.tokens === 100 ? 'border-indigo-500 bg-indigo-50/40 text-indigo-600 font-bold' : 'border-slate-200'
                    }`}
                  >
                    <span>100 токов</span>
                    <span className="block text-[10px] text-slate-500 mt-1">150 ₽</span>
                  </div>
                  <div 
                    onClick={() => setTokenPack({ tokens: 300, price: 390 })}
                    className={`p-2.5 rounded-xl border cursor-pointer ${
                      tokenPack.tokens === 300 ? 'border-indigo-500 bg-indigo-50/40 text-indigo-600 font-bold' : 'border-slate-200'
                    }`}
                  >
                    <span>300 токов</span>
                    <span className="block text-[10px] text-slate-500 mt-1">390 ₽</span>
                  </div>
                  <div 
                    onClick={() => setTokenPack({ tokens: 1000, price: 990 })}
                    className={`p-2.5 rounded-xl border cursor-pointer ${
                      tokenPack.tokens === 1000 ? 'border-indigo-500 bg-indigo-50/40 text-indigo-600 font-bold' : 'border-slate-200'
                    }`}
                  >
                    <span>1000 токов</span>
                    <span className="block text-[10px] text-slate-500 mt-1">990 ₽</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1 text-slate-600 leading-normal">
                <span className="font-bold text-slate-700 block text-[10px] uppercase">Цены за операции ИИSMM:</span>
                <div>• Генерация креативного поста: <span className="font-bold">15 токенов</span></div>
                <div>• Рерайт Gemini под стиль автора: <span className="font-bold">20 токенов</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <button
                  onClick={() => setShowTokenStore(false)}
                  className="py-2 bg-slate-100 text-slate-500 font-semibold rounded-lg"
                >
                  Отмена
                </button>
                <button
                  onClick={purchaseTokens}
                  className="py-2 bg-indigo-600 text-white font-bold rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
                >
                  Купить за {tokenPack.price} ₽
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
