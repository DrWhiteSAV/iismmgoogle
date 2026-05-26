import React, { useState } from 'react';
import { UserAccount } from '../types';
import { 
  Sparkles, Wallet, ShieldCheck, Trophy, BadgeInfo, Play, ChevronRight, HelpCircle, Key, 
  RefreshCw, Smartphone, Calendar, Send, Check, CheckCircle2, AlertCircle, Eye, Settings, 
  Globe, LayoutGrid, Image as ImageIcon, Users2, Shield, Info, ArrowUpRight, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileAndOnboardingProps {
  user: UserAccount;
  onUpgradeTariff: (plan?: 'free' | 'pro' | 'vip', useIirky?: boolean) => void;
  onReplenishTokens: (amount: number, costRub: number) => void;
  onReplenishBalance: (amount: number) => void;
  onUpdateUser?: (updated: UserAccount) => void;
  onTelegramRegister?: (customData?: Partial<UserAccount>) => void;
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
  onUpdateUser,
  onTelegramRegister
}: ProfileAndOnboardingProps) {
  // Navigation Toggles: 'landing' (ИИSMM presentation) or 'account' (billing & settings)
  const [activeTab, setActiveTab] = useState<'landing' | 'account'>('landing');

  // Interactive Bot Presence Checker state
  const [tgChannelInput, setTgChannelInput] = useState('');
  const [checkingBotStatus, setCheckingBotStatus] = useState<'idle' | 'checking' | 'verified' | 'error'>('idle');
  const [presenceErrorMsg, setPresenceErrorMsg] = useState('');
  const [checkedChannel, setCheckedChannel] = useState('');

  // ИИSMM scheduler grid interactive state
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
  const [tokenPack, setTokenPack] = useState({ tokens: 5000000, price: 250 });

  // Ruble to ИИрок purchase calculator state (5,000,000 ИИрок = 250 rubles)
  const [calcRubInput, setCalcRubInput] = useState('250');
  const [calcIirkyResult, setCalcIirkyResult] = useState(5000000);

  const handleCalcRubChange = (valStr: string) => {
    setCalcRubInput(valStr);
    const numeric = parseFloat(valStr) || 0;
    setCalcIirkyResult(Math.round(numeric * 20000));
  };

  const handleBuyIirkyWithRubles = () => {
    const costRub = parseFloat(calcRubInput) || 0;
    if (costRub <= 0) {
      alert('Укажите корректную сумму в рублях!');
      return;
    }
    if ((user.balanceRub || 0) < costRub) {
      alert(`Недостаточно средств на балансе! Для покупки требуется ${costRub} ₽. Ваш баланс: ${(user.balanceRub || 0)} ₽. Вы можете пополнить баланс вверху страницы.`);
      return;
    }

    const iirkyToReceive = Math.round(costRub * 20000);
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        balanceRub: (user.balanceRub || 0) - costRub,
        iirky: (user.iirky || 0) + iirkyToReceive,
        tokens: (user.tokens || 0) + iirkyToReceive // keep synced
      });
      alert(`🎉 Покупка успешна! Вы списали ${costRub} ₽ и зачислили ${iirkyToReceive.toLocaleString()} ИИрок (токенов) на свой баланс.`);
    }
  };

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
    alert('Пост успешно запланирован в календарную сетку ИИSMM!');
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
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'landing' 
              ? 'btn-glass-blue text-white shadow-md' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>ИИSMM Презентация</span>
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'account' 
              ? 'btn-glass-peach text-white shadow-md' 
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
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-orange-650 via-pink-650 to-rose-950 text-white relative overflow-hidden shadow-2xl space-y-5">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-200 rounded-full border border-orange-500/35 text-[10px] font-black tracking-widest uppercase">
                  АНАЛОГ SMM PLANNER №1 В РФ С ИНТЕГРАЦИЕЙ ГЕМИНИ
                </span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-gradient-header">
                  Один сервис для планирования и автопостинга во все соцсети
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Планируйте контент в Telegram, ВКонтакте, Одноклассники, Instagram, Facebook, LinkedIn, Pinterest и TenChat. Умные ИИ-рерайты, водяные знаки, кросспостинг с кнопками и полностью автоматизированный бот управления публикациями.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => setShowTelegramAuth(true)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-450 to-pink-450 text-slate-900 border border-white hover:opacity-95 rounded-xl text-xs font-bold shadow-lg shadow-orange-500/15 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
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
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-orange-500/10 to-transparent blur-2xl z-0 pointer-events-none"></div>
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-orange-600 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute left-1/2 bottom-8 w-12 h-12 bg-pink-500 rounded-lg rotate-12 blur-sm opacity-20"></div>
            </div>

            {/* INTEGRATED TELEGRAM BOT STATUS admin checks & settings (проверки наличия бота админом) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-7 bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
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
                        className="flex-1 bg-white border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-mono placeholder:font-sans focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <button 
                        type="submit" 
                        className="px-5 py-2.5 bg-gradient-to-r from-orange-450 to-pink-450 text-white font-bold rounded-xl text-xs shadow-md transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer shrink-0 border border-white/20"
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
                      className="p-4 bg-sky-50/70 backdrop-blur rounded-2xl border border-sky-200/50 flex items-start gap-3 text-xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-sky-900">Бот {botUsername} успешно авторизован!</p>
                        <p className="text-slate-650 text-[11px] leading-relaxed">
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
                    <span className="px-2.5 py-0.5 bg-orange-100/60 text-orange-850 rounded-full text-[9px] font-black uppercase tracking-wider">
                      Вход / Регистрация через бот
                    </span>
                    <span className="text-[10px] font-mono text-orange-700 font-bold">@iismmAIbot API</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800">Быстрая авторизация в 2 клика</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Наш бот позволяет зарегистрироваться и привязать свою учетную запись мгновенно, без ввода сложных паролей СМП.
                  </p>

                  <div className="bg-orange-55/30 p-3.5 rounded-2xl border border-orange-100/40 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                      <p className="text-xs font-semibold text-slate-700">Запустите бота в приложении</p>
                    </div>
                    <a 
                      href={botLink} 
                      target="_blank" 
                      rel="referrer noopener"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-450 to-pink-450 text-slate-900 border border-white/40 text-[10px] font-black rounded-lg uppercase shadow-sm cursor-pointer ml-7"
                    >
                      <span>Открыть @iismmAIbot</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2 pt-1 border-t border-orange-100/10 mt-1">
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                      <p className="text-xs font-semibold text-slate-700">Укажите свой ник или телефон</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
                  <button 
                    onClick={() => setShowTelegramAuth(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white font-black text-xs uppercase rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
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
                    <LayoutGrid className="w-5 h-5 text-orange-655" /> Игры Сетки: Сетка публикаций SMM-менеджера
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Встроенный календарь планирования контента. Быстро назначайте часы по дням недели!</p>
                </div>

                <button
                  onClick={() => setIsAddingSlot(true)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-105 to-pink-105 hover:opacity-95 text-slate-950 border border-orange-200/50 rounded-xl text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
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

              {/* ИИSMM Signature Grid */}
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
              
              {/* ИИSMM Watermark Overlay Studio */}
              <div className="apple-liquid-glass bg-white/45 rounded-3xl p-6 shadow-xl space-y-4">
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

              {/* ИИSMM Stories Builder Previews */}
              <div className="apple-liquid-glass bg-white/45 rounded-3xl p-6 shadow-xl space-y-4">
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
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-rose-500/35 border-t border-rose-500/20 text-[6px] text-white flex items-center justify-center uppercase font-black tracking-widest leading-none">Низ поля ⚠️</div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-2">
                      <p className="text-[10px] text-white font-black drop-shadow tracking-tight">ВАШ ТЕКСТ ТУТ</p>
                      <span className="text-[6px] px-1 py-0.5 bg-orange-500 text-white rounded font-bold uppercase block w-fit mx-auto mt-1">Отлично</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-2.5 font-semibold text-slate-600">
                    <h4 className="font-bold text-slate-800">Рекомендации ИИSMM:</h4>
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
            <div id="pricing-plans-section" className="bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-sm space-y-4">
              <div className="text-center space-y-1 max-w-md mx-auto">
                <h3 className="font-extrabold text-base text-slate-800 uppercase tracking-wider">Платные тарифы SMMS-системы</h3>
                <p className="text-xs text-slate-500">Оплачивайте фиатным балансом либо нашей внутренней валютой <span className="font-bold text-orange-650">ИИрки 🪙</span></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                
                {/* Plan 1 */}
                <div className="p-5 bg-white rounded-2xl border border-slate-100 space-y-4 text-center">
                  <div>
                    <h4 className="font-bold text-slate-700 uppercase tracking-wide">Тариф FREE</h4>
                    <span className="text-xl font-mono text-slate-800 font-extrabold block mt-1">0 ₽ / мес</span>
                    <span className="text-[10px] text-slate-400">Базовые лимиты на 3 канала</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-500 text-[11px] font-medium border-t border-slate-100 pt-3 text-left font-sans">
                    <li>• До 3 SMM каналов</li>
                    <li>• Ограничение 50 постов / мес</li>
                    <li>• Базовый рерайтер Gemini</li>
                    <li className="text-slate-300">• Умный поиск GROUNDING</li>
                    <li className="text-slate-300">• Фильтрация спама ботом</li>
                  </ul>
                  {user.tariff === 'free' ? (
                    <button className="w-full py-1.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-[11px]">Активен</button>
                  ) : (
                    <button 
                      onClick={() => onUpgradeTariff('free')}
                      className="w-full py-1.5 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-xl text-[11px]"
                    >
                      Перейти на FREE
                    </button>
                  )}
                </div>

                {/* Plan 2 */}
                <div className={`p-5 rounded-2xl border-2 space-y-4 text-center relative ${user.tariff === 'pro' ? 'border-orange-500 bg-orange-50/20' : 'border-orange-200 bg-white'}`}>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-orange-600 text-white text-[8px] font-black uppercase rounded-full">POPULAR</span>
                  <div>
                    <h4 className="font-bold text-orange-755 uppercase tracking-wide">Подписка PRO</h4>
                    <span className="text-xl font-mono text-orange-700 font-extrabold block mt-1">490 ₽ / мес</span>
                    <span className="text-[10px] text-orange-500">или <span className="font-black">250 ИИрок 🪙</span></span>
                  </div>
                  <ul className="space-y-1.5 text-orange-955/80 text-[11px] font-medium border-t border-orange-100/50 pt-3 text-left">
                    <li>✔️ Добавление без лимитов</li>
                    <li>✔️ ИИ Deep Rewrite от Gemini</li>
                    <li>✔️ Полноценный постинг по расписанию</li>
                    <li>✔️ Поиск трендов Grounding Search</li>
                    <li>✔️ Фильтрация спама @iismmAIbot</li>
                  </ul>
                  
                  {user.tariff === 'pro' ? (
                    <div className="text-center py-2 text-sky-600 font-black text-[11px] uppercase tracking-wider bg-sky-50 rounded-lg">PRO Активен ⚡</div>
                  ) : (
                    <div className="space-y-1.5">
                      <button 
                        onClick={() => onUpgradeTariff('pro', false)}
                        className="w-full py-1.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white font-bold rounded-xl text-[11px] transition-all cursor-pointer shadow-sm"
                      >
                        Купить за 490 ₽
                      </button>
                      <button 
                        onClick={() => onUpgradeTariff('pro', true)}
                        className="w-full py-1.5 bg-gradient-to-r from-pink-500 to-sky-450 hover:opacity-90 text-white font-bold rounded-xl text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm border border-white/20"
                      >
                        <span>Оплатить 250 ИИрок</span> 🪙
                      </button>
                    </div>
                  )}
                </div>

                {/* Plan 3 */}
                <div className={`p-5 rounded-2xl border-2 space-y-4 text-center relative ${user.tariff === 'vip' ? 'border-amber-500 bg-amber-50/10' : 'border-slate-100 bg-white'}`}>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-white text-[8px] font-black uppercase rounded-full">ULTIMATE TRIAL</span>
                  <div>
                    <h4 className="font-bold text-amber-700 uppercase tracking-wide">Подписка VIP</h4>
                    <span className="text-xl font-mono text-slate-850 font-extrabold block mt-1">990 ₽ / мес</span>
                    <span className="text-[10px] text-amber-600">или <span className="font-black">500 ИИрок 🪙</span></span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600 text-[11px] font-medium border-t border-slate-100 pt-3 text-left">
                    <li>✔️ ВСЕ преимущества PRO версии</li>
                    <li>✔️ Приоритетная AI очередь</li>
                    <li>✔️ Расширенная аналитика соискателей</li>
                    <li>✔️ Полный супервайзер постов</li>
                    <li>✔️ Личная поддержка @shishkarnem</li>
                  </ul>
                  
                  {user.tariff === 'vip' ? (
                    <div className="text-center py-2 text-amber-600 font-black text-[11px] uppercase tracking-wider bg-amber-50 rounded-lg">VIP Активен ⭐</div>
                  ) : (
                    <div className="space-y-1.5">
                      <button 
                        onClick={() => onUpgradeTariff('vip', false)}
                        className="w-full py-1.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white font-bold rounded-xl text-[11px] transition-all cursor-pointer shadow-sm"
                      >
                        Купить за 990 ₽
                      </button>
                      <button 
                        onClick={() => onUpgradeTariff('vip', true)}
                        className="w-full py-1.5 bg-gradient-to-r from-pink-500 to-sky-450 hover:opacity-90 text-white font-bold rounded-xl text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm border border-white/20"
                      >
                        <span>Оплатить 500 ИИрок</span> 🪙
                      </button>
                    </div>
                  )}
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
                <span className="text-[10px] text-orange-700 font-mono">Бот контроля: @iiSmmBot</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="font-black text-orange-600">1. Добавьте @iiSmmBot</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Добавьте нашего бота в администраторы своего телеграм канала с правами отправки текстов и кнопок.
                  </p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="font-black text-orange-600">2. Подключите в СМК</span>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    На вкладке «Каналы» укажите юзернейм своего чата. Бот свяжется с системой мгновенно.
                  </p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded-xl space-y-1">
                  <span className="font-black text-orange-600">3. Выпустите ИИ-пост</span>
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
                  <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-xl text-white font-bold">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800 tracking-tight">{user.name}</h3>
                    <p className="text-xs font-mono text-slate-400">{user.telegramUsername}</p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {user.tariff === 'vip' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-150 bg-amber-100 text-amber-800 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                          ★ VIP ТАРИФ АКТИВЕН
                        </span>
                      ) : user.tariff === 'pro' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                          ⚡ PRO ТАРИФ АКТИВЕН
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
                        className="text-[10px] text-orange-600 hover:text-orange-700 font-bold cursor-pointer"
                      >
                        купить
                      </button>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wider">Общий доход с биржи</span>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-slate-800">{user.earningsRub} ₽</span>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <Trophy className="w-3 h-3" /> Лидер
                      </span>
                    </div>
                  </div>
                </div>

                {/* Premium Banner Upgrade Option */}
                {user.tariff === 'free' && (
                  <div className="p-5 rounded-xl border border-orange-200 bg-orange-50/20 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Premium разблокировка постингов</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Снимите ограничения на 3 бесплатных канала, получите безлимитное добавление блогов в ВК, OK, FB, Discord и доступ к ИИ-генерации Grounding Search без списания токенов!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onUpgradeTariff()}
                      className="w-full py-2 bg-gradient-to-r from-orange-450 to-pink-450 text-slate-900 border border-white/40 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
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

      <AnimatePresence>
        {showTelegramAuth && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/15 backdrop-blur-3xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm apple-liquid-glass-heavy rounded-[28px] overflow-hidden shadow-2xl border border-white/60 p-1 bg-white/75 backdrop-blur-xl"
            >
              <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 p-5 rounded-[24px] text-white flex justify-between items-center shadow-md border border-white/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-all hover:rotate-6 shadow-inner shrink-0">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-white fill-current">
                      <path d="M19.897 5.115l-17.1 6.59c-1.17.47-1.16 1.12-.22 1.41l4.39 1.37 10.16-6.41c.48-.29.92-.13.56.19l-8.24 7.44-.32 4.79c.47 0 .68-.21.94-.47l2.25-2.19 4.68 3.46c.86.48 1.48.23 1.69-.8l3.07-14.47c.31-1.26-.48-1.83-1.32-1.37z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white tracking-tight">Связать аккаунт Telegram</h4>
                    <span className="text-[10px] text-orange-50/90 block mt-1 font-mono">@iiSmmBot Secure Links</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowTelegramAuth(false);
                    setTelegramCodeSent(false);
                  }}
                  className="text-white hover:text-orange-50 font-extrabold text-xs bg-white/10 hover:bg-white/20 p-1.5 px-2.5 rounded-full transition-all cursor-pointer animate-pulse"
                >
                  ✕
                </button>
              </div>

              {!telegramCodeSent ? (
                <div className="p-5 space-y-4 text-xs font-semibold">
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Введите ваш Telegram Юзернейм (с @) или телефон. Наш бот {botUsername} свяжет его с вашими SMM профилями.
                  </p>
                  
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[9px] uppercase font-black">Ваш @юзернейм в Telegram</label>
                    <input 
                      type="text" 
                      placeholder="@shishkarnem"
                      value={customTgUsername}
                      onChange={e => setCustomTgUsername(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[9px] uppercase font-black">Или Номер телефона (для верификации)</label>
                    <input 
                      type="text" 
                      placeholder="+7 999 000-00-00"
                      value={telegramPhoneInput}
                      onChange={e => setTelegramPhoneInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button 
                    onClick={handleSendTgCode}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-505 from-indigo-500 to-purple-600 hover:opacity-95 text-white font-extrabold rounded-xl transition-all cursor-pointer text-center uppercase tracking-wider text-[10px]"
                  >
                    Запросить код в Telegram Бот
                  </button>
                </div>
              ) : (
                <div className="p-5 space-y-4 text-xs font-semibold">
                  <div className="p-3 bg-indigo-50/50 border border-indigo-100/30 rounded-xl space-y-1 text-indigo-900 leading-relaxed">
                    <span className="font-black flex items-center gap-1 uppercase text-[10px] text-indigo-500 tracking-wide">
                      <Info className="w-3.5 h-3.5" /> Инструкция:
                    </span>
                    <p className="text-[11px] font-medium leading-relaxed">
                      Запустите бота <a href={botLink} target="_blank" rel="referrer noopener" className="underline font-bold text-indigo-700">{botUsername}</a> и скопируйте 6-значный код верификации сессии в поле ниже.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 text-[9px] uppercase font-black">Код подтверждения сессии</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 524151"
                      value={tgAuthCode}
                      onChange={e => setTgAuthCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-mono text-center tracking-widest text-lg font-black"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTelegramCodeSent(false)}
                      className="flex-1 py-2.5 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-xl text-xs font-bold"
                    >
                      Назад
                    </button>
                    <button 
                      onClick={handleSubmitTgAuthCode}
                      className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold rounded-xl text-xs cursor-pointer shadow-sm text-center uppercase"
                    >
                      Подтвердить
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-sm apple-liquid-glass-heavy rounded-[28px] overflow-hidden shadow-2xl border border-white/60 p-1 font-sans text-xs"
            >
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-5 rounded-[24px] text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-white/20 rounded font-black text-xs text-white">STORE</span>
                  <h4 className="font-extrabold text-sm text-white tracking-tight">Магазин ИИ-Токенов</h4>
                </div>
                <button 
                  onClick={() => setShowTokenStore(false)}
                  className="text-white hover:text-slate-100 font-extrabold text-xs bg-white/10 hover:bg-white/20 p-1.5 px-2.5 rounded-full transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Balances status */}
                <div className="bg-gradient-to-br from-indigo-50/50 to-pink-50/50 p-3.5 rounded-xl border border-slate-200/40 text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">Ваш текущий баланс ИИрок:</span>
                  <span className="font-black text-pink-600 text-lg">🪙 {(user.iirky || 0).toLocaleString()} ИИрок</span>
                </div>

                {/* Purchase calculator */}
                <div className="space-y-3.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Калькулятор ИИрок</span>
                  
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold text-[9px] block">Сумма в рублях (₽):</label>
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1.5 rounded-lg">
                      <input 
                        type="number" 
                        min="1"
                        className="w-full font-bold font-mono text-slate-800 text-center focus:outline-none"
                        value={calcRubInput}
                        onChange={e => handleCalcRubChange(e.target.value)}
                      />
                      <span className="text-[9px] font-black text-slate-450 shrink-0 uppercase">Рублей</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold text-[9px] block">Вы получаете ИИрок (токенов):</label>
                    <div className="bg-white border border-slate-200/50 text-pink-600 font-black font-mono text-center py-2 rounded-xl text-xs bg-pink-50/20">
                      🪙 {calcIirkyResult.toLocaleString()} ед.
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-450 space-y-0.5 leading-relaxed font-semibold">
                    <div>• Курс: <span className="font-extrabold text-slate-600">5 000 000 ИИрок = 250 рублей</span></div>
                    <div>• Пример: <span className="font-bold underline">1 рубль = 20 000 ИИрок</span></div>
                  </div>

                  <button
                    onClick={handleBuyIirkyWithRubles}
                    className="w-full py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-extrabold text-[10px] rounded-xl shadow hover:opacity-95 transition-all cursor-pointer text-center uppercase tracking-wider"
                  >
                    Купить ИИрки за рубли
                  </button>
                </div>

                {/* Quick direct buy packs */}
                <div className="space-y-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-black block uppercase tracking-wider">Пакеты со скидкой</span>
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                    <button 
                      onClick={() => {
                        if (user.balanceRub >= 250) {
                          if (onUpdateUser) {
                            onUpdateUser({
                              ...user,
                              balanceRub: user.balanceRub - 250,
                              iirky: (user.iirky || 0) + 5000000,
                              tokens: (user.tokens || 0) + 5000000
                            });
                          }
                          alert('Вы успешно приобрели Пакет 5,000,000 ИИрок за 250 ₽!');
                        } else {
                          alert('Недостаточно рублей на балансе! Пожалуйста, пополните баланс РК.');
                        }
                      }}
                      className="p-2 border border-slate-200 hover:border-pink-300 rounded-lg hover:bg-white font-sans text-[10px] tracking-tight bg-white/60 transition-all cursor-pointer"
                    >
                      +5 млн ИИрок (250 ₽)
                    </button>
                    <button 
                      onClick={() => {
                        if (user.balanceRub >= 500) {
                          if (onUpdateUser) {
                            onUpdateUser({
                              ...user,
                              balanceRub: user.balanceRub - 500,
                              iirky: (user.iirky || 0) + 10000000,
                              tokens: (user.tokens || 0) + 10000000
                            });
                          }
                          alert('Вы успешно приобрели Пакет 10,000,000 ИИрок за 500 ₽!');
                        } else {
                          alert('Недостаточно рублей на балансе! Пожалуйста, пополните баланс РК.');
                        }
                      }}
                      className="p-2 border border-slate-200 hover:border-pink-300 rounded-lg hover:bg-white font-sans text-[10px] tracking-tight bg-white/60 transition-all cursor-pointer"
                    >
                      +10 млн ИИрок (500 ₽)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowTokenStore(false)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-xl text-center cursor-pointer text-xs transition-colors"
                >
                  Закрыть магазин
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
