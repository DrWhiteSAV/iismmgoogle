import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Play, ShieldCheck, Mail, MessageSquare, AlertTriangle, Lightbulb, 
  Smartphone, BookOpen, GraduationCap, Brush, Repeat, Trophy, ExternalLink, 
  ChevronRight, Calendar, Layers, Image as ImageIcon, Check, Heart, Users, BarChart3, Radio, FileText, Send, HelpCircle, ArrowRight, RefreshCw, Star, ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useVelocity, useSpring } from 'motion/react';
import { UserAccount } from '../types';
import ShinyLogo from '../components/ShinyLogo';
import LiquidGlassBackground from '../components/LiquidGlassBackground';
import { InteractiveFeatureSimulator } from '../components/InteractiveFeatureSimulator';
import { PlatformNetworkCloud } from '../components/PlatformNetworkCloud';
import { BetweenFeaturesDecoration } from '../components/BetweenFeaturesDecoration';
import IntroLiveSimWidget from '../components/IntroLiveSimWidget';
import FeaturesCarousel from '../components/FeaturesCarousel';

interface LandingPageProps {
  onLogin: () => void;
  user: UserAccount;
  onUpdateUser: (updated: UserAccount) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function LandingPage({ onLogin, user, onUpdateUser, currentPath, onNavigate }: LandingPageProps) {
  const pathToTab = (path: string): 'abilities' | 'blog' | 'ai_assistants' | 'analytics' | 'advantages' | 'posts' | 'canvas' | 'reposter' | 'prices' | 'projects' | 'academy' | 'market_exchange' => {
    switch (path) {
      case '/main':
      case '/': return 'abilities';
      case '/blog': return 'blog';
      case '/ai': return 'ai_assistants';
      case '/market-exchange': return 'market_exchange';
      case '/analytics': return 'analytics';
      case '/advantages': return 'advantages';
      case '/posts-info': return 'posts';
      case '/canvas': return 'canvas';
      case '/reposter': return 'reposter';
      case '/prices': return 'prices';
      case '/projects': return 'projects';
      case '/academy': return 'academy';
      default: return 'abilities';
    }
  };

  const tabToPath = (tab: string) => {
    switch (tab) {
      case 'abilities': return '/main';
      case 'blog': return '/blog';
      case 'ai_assistants': return '/ai';
      case 'market_exchange': return '/market-exchange';
      case 'analytics': return '/analytics';
      case 'advantages': return '/advantages';
      case 'posts': return '/posts-info';
      case 'canvas': return '/canvas';
      case 'reposter': return '/reposter';
      case 'prices': return '/prices';
      case 'projects': return '/projects';
      case 'academy': return '/academy';
      default: return '/main';
    }
  };

  const activeTab = pathToTab(currentPath);
  
  const setActiveTab = (tab: 'abilities' | 'blog' | 'ai_assistants' | 'analytics' | 'advantages' | 'posts' | 'canvas' | 'reposter' | 'prices' | 'projects' | 'academy' | 'market_exchange') => {
    onNavigate(tabToPath(tab));
  };

  // Interactive states for landing play pieces
  const [phonePreviewText, setPhonePreviewText] = useState('Анонс: Новый запуск ИИSMM в 2026 году!');
  const [selectedPlatform, setSelectedPlatform] = useState<'tg' | 'vk' | 'ok'>('tg');
  const [aiDemoInput, setAiDemoInput] = useState('Топ 3 нейросети для рекламы');
  const [aiDemoResult, setAiDemoResult] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Interactive demo states for simulated marketplace on landing page
  const [simName, setSimName] = useState('Магия Нейросетей ✨');
  const [simPrice, setSimPrice] = useState('500');
  const [simViews, setSimViews] = useState('2500');
  const [simSubmitted, setSimSubmitted] = useState(false);
  const [simEarning, setSimEarning] = useState(0);

  // Academy interactive course engine states
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [customSmmQuestion, setCustomSmmQuestion] = useState('');
  const [aiAnswerResult, setAiAnswerResult] = useState('');
  const [aiAnswering, setAiAnswering] = useState(false);
  const [lessonCompletedState, setLessonCompletedState] = useState<Record<string, boolean>>({
    'c0-l0': true
  });
  const [lessonQuizAnswers, setLessonQuizAnswers] = useState<Record<string, number>>({});
  const [lessonQuizFeedback, setLessonQuizFeedback] = useState<string | null>(null);

  // Mini quiz state for SMM Academy on landing page
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Auth modal simulator State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [customUsername, setCustomUsername] = useState('@smm_expert');

  // Canva Canvas interactive simulator on landing page
  const [canvasBgColor, setCanvasBgColor] = useState<string>('from-sky-100 to-pink-100');
  const [canvasWatermark, setCanvasWatermark] = useState('© ИИSMM @bot');
  const [canvasMainText, setCanvasMainText] = useState('КАК НАПИСАТЬ ИДЕАЛЬНЫЙ ПОСТ');

  // Paper plane scroll tracking with premium elastic physical response
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "99%"]);
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });
  const scrollVelocity = useVelocity(scrollYProgress);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    return scrollVelocity.on("change", (v) => {
      if (v < -0.005) {
        setIsScrollingUp(true);
      } else if (v > 0.005) {
        setIsScrollingUp(false);
      }
    });
  }, [scrollVelocity]);

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRunAiDemo = () => {
    if (!aiDemoInput.trim()) return;
    setAiGenerating(true);
    setTimeout(() => {
      setAiDemoResult(
        `✍️ ИИ-Ассистент ИИSMM подготовил публикацию по теме "${aiDemoInput}":\n\n` +
        `🚀 Нейросети меняют маркетинг со скоростью света! Вот 3 главных инструмента 2026 года для вашей рекламы:\n\n` +
        `1️⃣ Gemini 2 Custom - идеален для адаптации длинных аналитических текстов и UTM-меток.\n` +
        `2️⃣ SAV AI Writer - автоматически вырезает спам из репостов и подбирает хештеги.\n` +
        `3️⃣ Flux SMM Art - генерирует привлекательные обложки прямо на холсте.\n\n` +
        `#маркетинг #нейросети #иисмм`
      );
      setAiGenerating(false);
    }, 1200);
  };

  const handleFinishQuiz = () => {
    const correctAnswers = { 0: 1, 1: 2, 2: 0 }; // keys are questions index, vals are correct option indices
    let score = 0;
    if (selectedAnswers[0] === correctAnswers[0]) score += 1;
    if (selectedAnswers[1] === correctAnswers[1]) score += 1;
    if (selectedAnswers[2] === correctAnswers[2]) score += 1;
    setQuizScore(score);
    setQuizFinished(true);
    if (score === 3) {
      // Simulate adding bonus ИИрок to the starting user state when they actually log in
      onUpdateUser({
        ...user,
        iirky: (user.iirky || 1000000) + 100000 // Grant +100,000 ИИрок as promo code!
      });
    }
  };

  const handleConfirmLogin = () => {
    if (phoneNumber.length < 5 && step === 1) {
      alert('Пожалуйста, введите корректный номер телефона или никнейм!');
      return;
    }
    if (step === 1) {
      setStep(2);
      alert('Код подтверждения отправлен в ваш Telegram-бот @iismmAIbot. Пожалуйста, введите его.');
    } else {
      // Step 2, update user state
      onUpdateUser({
        ...user,
        telegramUsername: customUsername.startsWith('@') ? customUsername : '@' + customUsername,
        name: `ИИSMM Эксперт (${customUsername})`,
        iirky: (user.iirky || 1000000), // credit standard initial balance
        tariff: 'vip' // 7 days VIP default as per TMA starting trial
      });
      setShowTelegramModal(false);
      onLogin(); // Login successfully!
      alert(`🎉 Успешная ТМА-авторегистрация в 1-клик! Вам начислен стартовый баланс 1,000,000 ИИрок и 7 дней подписки VIP!`);
    }
  };

  // Nav labels matching the 12 informational pages
  const tabs = [
    { key: 'abilities', label: 'Возможности', icon: <Radio className="w-3.5 h-3.5" /> },
    { key: 'blog', label: 'Наш Блог', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { key: 'ai_assistants', label: 'AI Ассистенты', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: 'market_exchange', label: 'ИИ Биржа 🛡', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { key: 'analytics', label: 'Аналитика', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { key: 'advantages', label: 'Преимущества', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { key: 'posts', label: 'Посты', icon: <FileText className="w-3.5 h-3.5" /> },
    { key: 'canvas', label: 'Холст 🎨', icon: <Brush className="w-3.5 h-3.5" /> },
    { key: 'reposter', label: 'Репостер 🔄', icon: <Repeat className="w-3.5 h-3.5" /> },
    { key: 'prices', label: 'Тарифы', icon: <Trophy className="w-3.5 h-3.5" /> },
    { key: 'projects', label: 'Проекты', icon: <Layers className="w-3.5 h-3.5" /> },
    { key: 'academy', label: 'Академия', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <div ref={containerRef} className="min-h-screen text-slate-800 flex flex-col font-sans relative overflow-hidden">
      <LiquidGlassBackground />
      
      {/* 1. Global Navigation header block (Apple Liquid Glass) */}
      <header className="sticky top-0 z-40 bg-white/45 backdrop-blur-xl border-b border-white/30 shadow-xs px-4 py-3 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Mobile Screen Header Row (Compact & Clean with Centered Burger Menu) */}
          <div className="flex items-center justify-between w-full lg:hidden relative shrink-0">
            {/* LEFT: Mini Brand Logo */}
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { setActiveTab('abilities'); setMobileMenuOpen(false); }}>
              <ShinyLogo height={32} />
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

            {/* RIGHT: Quick Login button */}
            <button 
              id="header-btn-login-mobile"
              onClick={() => { setShowTelegramModal(true); setMobileMenuOpen(false); }}
              className="px-3 py-1.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 hover:scale-103 text-white text-[9px] uppercase font-black rounded-lg shadow-md border border-white/20 transition-all active:scale-97 flex items-center gap-1 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white fill-current shrink-0">
                <path d="M19.897 5.115l-17.1 6.59c-1.17.47-1.16 1.12-.22 1.41l4.39 1.37 10.16-6.41c.48-.29.92-.13.56.19l-8.24 7.44-.32 4.79c.47 0 .68-.21.94-.47l2.25-2.19 4.68 3.46c.86.48 1.48.23 1.69-.8l3.07-14.47c.31-1.26-.48-1.83-1.32-1.37z" />
              </svg>
              Войти ⚡
            </button>
          </div>

          {/* PC-only Brand Logo */}
          <div className="hidden lg:flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('abilities')}>
            <ShinyLogo height={44} />
          </div>

          {/* PC Navigation Items (displayed only on lg screens) */}
          <nav className="hidden lg:flex flex-wrap justify-center gap-1 max-w-full overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  id={`tab-landing-${tab.key}`}
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-tight cursor-pointer whitespace-nowrap transition-all uppercase ${
                    isActive 
                      ? 'bg-white/80 text-slate-900 shadow-md border border-white/50 scale-102 font-bold ring-1 ring-sky-300' 
                      : 'text-slate-600 hover:bg-white/20 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-orange-500 animate-pulse' : 'text-slate-400'}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* PC Header Authorization button */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              id="header-btn-login-pc"
              onClick={() => setShowTelegramModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 hover:scale-103 text-white font-black text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current shrink-0 animate-bounce">
                <path d="M19.897 5.115l-17.1 6.59c-1.17.47-1.16 1.12-.22 1.41l4.39 1.37 10.16-6.41c.48-.29.92-.13.56.19l-8.24 7.44-.32 4.79c.47 0 .68-.21.94-.47l2.25-2.19 4.68 3.46c.86.48 1.48.23 1.69-.8l3.07-14.47c.31-1.26-.48-1.83-1.32-1.37z" />
              </svg>
              Войти в Кабинет 👤
            </button>
          </div>

        </div>

        {/* Floating Slide-Down Burger Menu Panel for Landing Page (Animated & Beautiful) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden z-30 rounded-2xl bg-white/95 backdrop-blur-lg border border-slate-200/50 p-4 shadow-xl space-y-3 mt-3 absolute left-4 right-4"
            >
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-center border-b pb-1.5 mb-2 flex items-center justify-center gap-1">
                <span>📂</span> ИИSMM Разделы Платформы
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setMobileMenuOpen(false);
                      }}
                      className={`p-2.5 rounded-xl font-bold text-xs cursor-pointer border flex flex-col items-center justify-center text-center gap-1 transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-400 to-pink-500 border-orange-400 text-white shadow-md scale-[1.02]' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-700'
                      }`}
                    >
                      <span className={isActive ? 'text-white' : 'text-slate-500'}>{tab.icon}</span>
                      <span className="text-[9px] font-black uppercase tracking-tight">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowTelegramModal(true);
                  }}
                  className="w-full py-2 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-black rounded-xl text-[10px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Авторизоваться
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Main Page Render and Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center relative z-10">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22 }}
            className="w-full"
          >
            
            {/* INFORMATIVE SECTION 1: ВОЗМОЖНОСТИ (ГЛАВНАЯ) */}
            {activeTab === 'abilities' && (
              <>
                <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center py-6 space-y-12">
                  {/* CENTRED HIGH-FIDELITY PLATFORM NETWORK CLOUD — Logo surrounded by platform icons-planets */}
                  <div 
                    className="w-full relative overflow-visible flex flex-col justify-center items-center min-h-[340px] max-w-full transition-all duration-300 ease-out"
                    style={{
                      transform: `translateY(${scrollY * 0.42}px)`,
                      opacity: Math.max(0.18, 1 - scrollY / 650),
                      zIndex: scrollY > 60 ? -10 : 0,
                      pointerEvents: scrollY > 60 ? 'none' : 'auto',
                    }}
                  >
                    <PlatformNetworkCloud />
                  </div>

                  {/* PREMIUM HIGH-FIDELITY TWO-COLUMN COMMAND CENTER PANEL */}
                  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-gradient-to-br from-white/95 via-white/70 to-orange-50/10 backdrop-blur-xl border border-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden group">
                    
                    {/* Background glows representing intelligent pulses */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-orange-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Left Column: Text Content and High-CTAs */}
                    <div className="lg:col-span-7 space-y-6 text-left relative z-10 flex flex-col justify-center">
                      <div className="inline-flex w-fit items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100/80 border border-orange-200/50 px-3.5 py-1.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-orange-950 font-black text-[9px] uppercase tracking-wider">
                          УМНАЯ ИИ-ПЛАТФОРМА №1 В РОССИИ
                        </span>
                      </div>
                      
                      <h2 className="text-2.5xl sm:text-3.5xl lg:text-4.5xl font-black tracking-tight leading-[1.15] text-gradient-header">
                        Интеллектуальная автоматизация SMM во все популярные платформы
                      </h2>
                      
                      <p className="text-slate-655 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
                        Добро пожаловать в <strong className="text-slate-900">ИИSMM</strong> — продвинутый планировщик и конструктор автопубликаций в стильном, современном интерфейсе. Управляйте публикациями одной кнопкой абсолютно бесплатно!
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700 font-bold pt-1">
                        <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-slate-150/40">
                          <Check className="w-4 h-4 text-orange-500" />
                          <span>Gemini ИИ-Копирайтер 24/7</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-slate-150/40">
                          <Check className="w-4 h-4 text-pink-500" />
                          <span>Мультипостинг в 1 Клик</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-slate-150/40">
                          <Check className="w-4 h-4 text-indigo-500" />
                          <span>Escrow Безопасная Биржа</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-slate-150/40">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>Маркировка ОРД Автоматом</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <button 
                          onClick={() => setShowTelegramModal(true)}
                          className="px-6 py-3.5 btn-liquid-glass btn-glass-blue text-[11px] uppercase cursor-pointer"
                        >
                          Попробовать Бесплатно через TG 🚀
                        </button>
                        <button 
                          onClick={() => setActiveTab('prices')}
                          className="px-6 py-3.5 btn-liquid-glass btn-glass-peach text-[11px] uppercase cursor-pointer"
                        >
                          Посмотреть тарифы 💎
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Interactive Live Showroom Terminal Simulator */}
                    <div className="lg:col-span-5 w-full relative z-10">
                      <IntroLiveSimWidget />
                    </div>
                  </div>
                </div>

                <div className="text-center max-w-2xl mx-auto space-y-3 mt-16 mb-8">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-gradient-header">
                    10 УМНЫХ ВОЗМОЖНОСТЕЙ ПЛАТФОРМЫ ИИСММ
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Наш интерактивный пульт управления: переключайте слайды вручную или запустите автоматический тур по SMM инновациям ИИSMM.
                  </p>
                </div>

                <FeaturesCarousel />
            </>
          )}

          {/* INFORMATIVE SECTION 2: НАШ БЛОГ */}
            {activeTab === 'blog' && (
              <div className="space-y-6 py-4">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-[10px] font-black uppercase border border-orange-200">НОВОСТИ И ЛАЙФХАКИ</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-header">Блог о развития SMM и нейросетях в 2026</h2>
                  <p className="text-slate-500 text-xs">Практические инструкции, новости нашей платформы и стратегии повышения охватов.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Как получить 1,000,000 ИИрок в подарок и грамотно их использовать?',
                      desc: 'ИИрки — официальная внутренняя валюта нашего сервиса. 5,000,000 ИИрок стоят всего 250 рублей. Мы дарим стартовый миллион при входе через Telegram в 1 клик!',
                      tag: 'Валюта',
                      img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&q=80'
                    },
                    {
                      title: 'Секреты парсинга Telegram-каналов и кросспостинг без ручного труда',
                      desc: 'Интерфейсы репостеров позволяют забирать новости, производить автоматический ИИ-рерайт и постить в TenChat, VK и Сетку за одну секунду.',
                      tag: 'Кросспостинг',
                      img: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400&q=80'
                    },
                    {
                      title: 'Правило сбора Взаимного Пиара (ВП): экономим 90% рекламного бюджета',
                      desc: 'Сборы в общие папки позволяют каналам обмениваться аудиторией. Наш модуль сбора является бесплатным для организаторов.',
                      tag: 'Продвижение',
                      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80'
                    }
                  ].map((art, idx) => (
                    <div key={idx} className="bg-white/70 backdrop-blur rounded-2xl border border-white/60 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <img src={art.img} alt={art.title} className="w-full h-36 object-cover" referrerPolicy="no-referrer" />
                        <div className="p-5 space-y-2">
                          <span className="px-2 py-0.5 bg-orange-50 text-orange-870 rounded-full text-[9px] font-black uppercase font-mono">{art.tag}</span>
                          <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{art.title}</h3>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{art.desc}</p>
                        </div>
                      </div>
                      <div className="p-5 pt-0">
                        <button 
                          onClick={() => setShowTelegramModal(true)}
                          className="w-full py-2 bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1 transition-colors uppercase"
                        >
                          Регистрация для чтения ⚙️ <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 3: AI АССИСТЕНТЫ */}
            {activeTab === 'ai_assistants' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-7 space-y-5">
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-[10px] font-black uppercase border border-pink-200">ИИ КОНТЕНТ МЕНЕДЖЕРЫ</span>
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gradient-header">
                    Профессиональные нейросети создают контент за вас
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Забудьте про творческий кризис. В ИИSMM мы встроили мощные модели, соединенные с интеллектуальным поиском трендов (Grounding) и рерайтером по образцу. Укажите тему поста или ссылку на канал, и система перепишет её в заданном стиле, вставит абзацы, выделит ключевые фразы и подготовит UTM разметку.
                  </p>
                  
                  {/* Simulated playground */}
                  <div className="p-5 bg-white/70 backdrop-blur rounded-2xl border border-white/40 space-y-3.5">
                    <label className="text-[10px] font-bold text-slate-400 block uppercase block leading-none">Протестируйте AI-копирайтер прямо на лендинге:</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={aiDemoInput} 
                        onChange={e => setAiDemoInput(e.target.value)}
                        placeholder="Введите тему поста..." 
                        className="flex-1 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                      <button 
                        onClick={handleRunAiDemo}
                        disabled={aiGenerating}
                        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs rounded-xl shadow cursor-pointer transition-all flex items-center gap-1.5 uppercase shrink-0"
                      >
                        {aiGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                        <span>Пост с ИИ ⚡</span>
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {aiDemoResult && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          className="bg-slate-900/5 p-3 rounded-xl border border-slate-200/40 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed"
                        >
                          {aiDemoResult}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-tr from-sky-400/20 via-orange-300/20 to-pink-500/20 rounded-3xl p-8 border border-white/50 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Доступные роли ассистентов:</h4>
                  {[
                    { role: '🤖 ИИ Копирайтер длинных статей', desc: 'Умеет составлять лонгриды, подкрепленные аналитикой' },
                    { role: '⚡ Быстрый рерайтер постов', desc: 'Трансформирует посты конкурентов, убирая рекламу' },
                    { role: '🪙 ИИ SEO оптимизатор', desc: 'Автоматически генерирует адаптивные теги для Дзена и VK' }
                  ].map((r, i) => (
                    <div key={i} className="p-3.5 bg-white/80 rounded-2xl border border-white space-y-1">
                      <span className="font-bold text-xs text-pink-600 block">{r.role}</span>
                      <p className="text-[11px] text-slate-500 font-medium">{r.desc}</p>
                    </div>
                  ))}
                  <div className="pt-2 text-center">
                    <button 
                      onClick={() => setShowTelegramModal(true)}
                      className="px-5 py-2.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-md hover:opacity-95 active:scale-98 border border-white/20 transition-all"
                    >
                      Подключить AI ассистента бесплатно 🚀
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION: ИИ БИРЖА (MARKET EXCHANGE) */}
            {activeTab === 'market_exchange' && (
              <div className="space-y-8 py-4">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-[10px] font-black uppercase border border-orange-200">
                    БЕЗОПАСНАЯ ИИ-БИРЖА РЕКЛАМЫ (ESCROW)
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gradient-header">
                    Монетизируйте свои каналы или закупайте интеграции в 1 клик
                  </h2>
                  <p className="text-slate-500 text-xs">
                    Автоматизированная биржа с эскроу-гарантом @iiSmmBot: бот сам находит посты на площадках, проверяет удержание в топе 24/48 часов и мгновенно выплачивает деньги.
                  </p>
                </div>

                {/* 3 Columns of features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="apple-liquid-glass rounded-2xl p-5 bg-white/40 space-y-3 shadow-xl hover:scale-102 transition-all duration-300">
                    <span className="text-xl">📢</span>
                    <h4 className="font-extrabold text-slate-800 text-sm">Владельцам каналов</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Выставляйте свои каналы на биржу, задавайте желаемый ценник за пост и средний охват. Сделки полностью защищены эскроу.
                    </p>
                  </div>
                  <div className="apple-liquid-glass rounded-2xl p-5 bg-white/40 space-y-3 shadow-xl hover:scale-102 transition-all duration-300">
                    <span className="text-xl">💼</span>
                    <h4 className="font-extrabold text-slate-800 text-sm">Заказчикам рекламы</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Выбирайте проверенные площадки из каталога и резервируйте средства. Если владелец не опубликует пост, средства вернутся на баланс автоматически.
                    </p>
                  </div>
                  <div className="apple-liquid-glass rounded-2xl p-5 bg-white/40 space-y-3 shadow-xl hover:scale-102 transition-all duration-300">
                    <span className="text-xl">🤖</span>
                    <h4 className="font-extrabold text-slate-800 text-sm">Авто-контроль @iiSmmBot</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Никакого ручного контроля! ИИ-аудитор проверяет ссылку в закрепе, статистику кликов и защищает ваши рекламные вложения 24/7.
                    </p>
                  </div>
                </div>

                {/* Interactive Simulation Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                  <div className="lg:col-span-6 bg-gradient-to-br from-rose-50/70 to-orange-50/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="p-2 bg-orange-100 rounded-lg text-orange-850 text-xs font-bold">ИНТЕРАКТИВ</span>
                      <h3 className="font-extrabold text-slate-800 text-sm">Симулятор подачи канала на Биржу</h3>
                    </div>
                    
                    <p className="text-xs text-slate-500">
                      Попробуйте подать объявление, чтобы протестировать, как устроен наш интерфейс.
                    </p>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!simName.trim()) return;
                        setSimSubmitted(true);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div className="space-y-1">
                        <label className="block text-slate-600 font-bold uppercase text-[9px]">Название вашего рекламного канала</label>
                        <input
                          type="text"
                          value={simName}
                          onChange={(e) => setSimName(e.target.value)}
                          className="w-full bg-white border border-slate-200 p-2.5 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-slate-600 font-bold uppercase text-[9px]">Цена за пост (₽)</label>
                          <input
                            type="number"
                            value={simPrice}
                            onChange={(e) => setSimPrice(e.target.value)}
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-600 font-bold uppercase text-[9px]">Средний охват</label>
                          <input
                            type="number"
                            value={simViews}
                            onChange={(e) => setSimViews(e.target.value)}
                            className="w-full bg-white border border-slate-200 p-2.5 rounded-xl"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold rounded-xl shadow cursor-pointer text-center text-xs transition-colors"
                      >
                        Подать объявление на Биржу 🚀
                      </button>
                    </form>

                    <AnimatePresence>
                      {simSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3.5 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-900 space-y-1"
                        >
                          <p className="font-bold flex items-center gap-1">
                            <span className="text-base">🎉</span> Объявление успешно выставлено на Биржу!
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Ваша площадка "{simName}" попала в каталог. Теперь рекламодатели смогут заказывать у вас авторазмещение по безопасной сделке!
                          </p>
                          <button
                            type="button"
                            onClick={() => setSimSubmitted(false)}
                            className="text-[10px] text-pink-600 font-bold underline cursor-pointer"
                          >
                            Подать заново
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="lg:col-span-6 bg-gradient-to-br from-orange-50/70 to-pink-50/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="p-2 bg-orange-100 rounded-lg text-orange-850 text-xs font-bold">АКТУАЛЬНО</span>
                        <h3 className="font-extrabold text-slate-800 text-sm">Симулятор отклика на промо-заказы</h3>
                      </div>
                      <p className="text-xs text-slate-500">
                        Выполняйте сторонние рекламные заказы в 1 клик через ИИSMM и получайте мгновенные зачисления на ваш баланс.
                      </p>

                      <div className="p-4 bg-white/80 rounded-2xl border border-orange-100/50 space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-100 text-orange-850">
                            АКТИВНЫЙ РЕКЛАМНЫЙ ЗАКАЗ
                          </span>
                          <span className="text-xs font-black text-rose-500">
                            +450 ₽
                          </span>
                        </div>
                        
                        <div className="text-xs">
                          <span className="font-bold text-slate-800 block">Продвижение курсов Академии Маркетинга</span>
                          <p className="text-[10px] text-slate-500 italic mt-1">"🚀 СТАНЬ ИИ-КОПИРАЙТЕРОМ ЗА 2 НЕДЕЛИ! Запишись прямо сейчас!"</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSimEarning(prev => prev + 450);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Откликнуться и Разместить пост</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-white/40 border rounded-xl text-center text-xs space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Ваш демо-заработок в симуляторе</span>
                      <span className="text-xl font-black text-slate-800 font-mono">{simEarning} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 4: АНАЛИТИКА */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-6 space-y-5">
                  <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-[10px] font-black uppercase border border-orange-200/60">МАРКЕТИНГОВЫЙ СЧЕТЧИК</span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gradient-header">Прозрачный трекинг охватов и конверсий по UTM меткам</h2>
                  <p className="text-slate-650 text-sm leading-relaxed">
                    Планировщик автоматически маркирует каждую исходящую внешнюю ссылку в ваших рекламных кампаниях. Вы сможете отслеживать чистые переходы, клики по кнопкам, рост аудитории и статистику в интуитивно понятных графиках личного кабинета.
                  </p>
                  <div className="bg-white/60 backdrop-blur rounded-2xl border border-white p-4 space-y-3 font-semibold text-xs">
                    <div className="flex justify-between border-b pb-2 text-orange-850">
                      <span>Источник</span>
                      <span>Просмотры</span>
                      <span>Конверсия</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>🌐 tg_folder_promo</span>
                      <span className="font-bold text-slate-800">12,400</span>
                      <span className="text-pink-650 font-extrabold">14.2%</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>🔗 vk_cross_post</span>
                      <span className="font-bold text-slate-800">4,900</span>
                      <span className="text-pink-650 font-extrabold">8.1%</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-lg space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-widest border-b pb-2">Премиум графический модуль (Скриншот-Демо)</h3>
                  
                  {/* Curvy illustrative graph */}
                  <div className="h-40 w-full relative pt-4">
                    <svg className="w-full h-full overflow-visible">
                      <path d="M 0 100 Q 100 20 200 80 T 400 30" fill="none" stroke="#f97316" strokeWidth="4" />
                      <circle cx="200" cy="80" r="6" fill="#f43f5e" />
                      <circle cx="400" cy="30" r="6" fill="#ec4899" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-bold font-mono">
                    <span>Пн</span>
                    <span>Ср</span>
                    <span>Пт</span>
                    <span>Вс (96,000 охвата)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 text-center">Графика адаптирована в лаконичном стиле Apple Liquid Glass</p>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 5: ПРЕИМУЩЕСТВА */}
            {activeTab === 'advantages' && (
              <div className="space-y-6 py-4">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] font-black uppercase border border-amber-200">БЕЗОПАСНОСТЬ И УНИВЕРСАЛЬНОСТЬ</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-header">Почему SMM-специалисты выбирают ИИSMM?</h2>
                  <p className="text-slate-500 text-xs">Четыре столпа надежности, выделяющие нас на фоне отечественных аналогов.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { title: '🔒 Без ввода паролей', desc: 'Авторизация и привязка каналов происходят через защищенный API-шлюз бота @iismmAIbot.', icon: <ShieldCheck className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50 border-orange-200/50' },
                    { title: '🎨 Встроенный холст дизайна', desc: 'Создавайте обложки и защищайте креативы своими логотипами и водяными знаками без фотошопа.', icon: <Brush className="w-6 h-6 text-orange-400" />, bg: 'bg-orange-50 border-orange-200/50' },
                    { title: '🪙 Расчёт в ИИрках', desc: 'Ультра-дешевая валюта: 5,000,000 ИИрок стоят всего 250 рублей. Заменяет любые ежемесячные лимиты.', icon: <Sparkles className="w-6 h-6 text-pink-400" />, bg: 'bg-pink-50 border-pink-200/50' },
                    { title: '📁 Взаимное продвижение', desc: 'Встроенные рекламные сборы во взаимные промо-папки (полностью бесплатные для организаторов).', icon: <Users className="w-6 h-6 text-pink-550" />, bg: 'bg-pink-50 border-pink-200/50' }
                  ].map((card, idx) => (
                    <div key={idx} className="apple-liquid-glass rounded-2xl p-5 space-y-3.5 hover:scale-103 duration-300 shadow-xl bg-white/45 flex flex-col justify-between">
                      <div>
                        <div className={`p-2 w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${card.bg}`}>{card.icon}</div>
                        <h3 className="font-extrabold text-sm text-slate-800 leading-snug mt-3">{card.title}</h3>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 6: ПОСТЫ */}
            {activeTab === 'posts' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-7 space-y-5">
                  <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-[10px] font-black uppercase border border-orange-200">КАЛЕНДАРЬ ПОСТОВ</span>
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gradient-header">Мультипостинг и умный редактор отложенных постов</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Планируйте публикации на недели вперед с помощью удобной сетки автопубликации. Сервис позволяет добавлять ссылки, изображения с водяными знаками, кнопки и настраивать кросс-репосты в назначенное время для всех каналов.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {['Telegram', 'VKонтакте', 'OK', 'TenChat', 'Дзен', 'Сетка'].map((plat) => (
                      <span key={plat} className="px-2.5 py-1 bg-white/70 backdrop-blur border border-slate-200 font-mono text-[10px] font-bold rounded-lg text-slate-600 shadow-sm">• {plat}</span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={() => setShowTelegramModal(true)}
                      className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-500/20 uppercase cursor-pointer"
                    >
                      Зарегистрироваться и составить пост 🚀
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/70 backdrop-blur border border-white/50 rounded-3xl p-6 shadow-sm space-y-3.5">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Макет Календаря (Информационный):</h4>
                  <div className="grid grid-cols-3 gap-2.5 text-center font-mono text-[9px]">
                    <div className="p-2 border rounded-xl bg-orange-50/50">
                      <span className="block font-bold">ПН 12:00</span>
                      <span className="text-orange-600 font-extrabold">🚀 Пост 1</span>
                    </div>
                    <div className="p-2 border rounded-xl bg-pink-50/50">
                      <span className="block font-bold">СР 15:00</span>
                      <span className="text-pink-600 font-extrabold">📝 Пост 2</span>
                    </div>
                    <div className="p-2 border rounded-xl bg-orange-50/30">
                      <span className="block font-bold">ПТ 18:00</span>
                      <span className="text-slate-400 font-semibold">[Пусто]</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">Интерактивный календарь с поддержкой перетаскивания и ИИ-генерацией постов ждет вас в личном кабинете!</p>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 7: ХОЛСТ 🎨 */}
            {activeTab === 'canvas' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-7 space-y-5">
                  <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-[10px] font-black uppercase border border-orange-200/60">ДИЗАЙН ИНСТРУМЕНТ (ХОЛСТ)</span>
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gradient-header">Холст: Редактируйте дизайн обложек прямо внутри ИИSMM</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Аналог Canva, созданный специально для SMM-копирайтеров. Задайте пастельную основу (небесно-голубой, оранжево-персиковый, пудрово-розовый), напишите кричащий заголовок, нанесите водяные знаки для предотвращения копирования и вставьте водяной знак канала в один клик.
                  </p>

                  {/* Canvas controller interactive demo */}
                  <div className="bg-white/70 backdrop-blur rounded-2xl border border-white/50 p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 block uppercase">Заголовок обложки:</label>
                        <input 
                          type="text" 
                          value={canvasMainText} 
                          onChange={e => setCanvasMainText(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 block uppercase">Водяной знак:</label>
                        <input 
                          type="text" 
                          value={canvasWatermark} 
                          onChange={e => setCanvasWatermark(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => setCanvasBgColor('from-orange-100 to-pink-200')} className="px-2.5 py-1 bg-orange-100 rounded-lg text-[10px] font-bold text-orange-800 hover:bg-orange-200">Закатный пастельный</button>
                      <button onClick={() => setCanvasBgColor('from-orange-100 to-amber-200')} className="px-2.5 py-1 bg-orange-100 rounded-lg text-[10px] font-bold text-orange-850 hover:bg-orange-200">Персиковый пастельный</button>
                      <button onClick={() => setCanvasBgColor('from-pink-100 to-rose-200')} className="px-2.5 py-1 bg-pink-100 rounded-lg text-[10px] font-bold text-pink-800 hover:bg-pink-200">Розовый пастельный</button>
                    </div>
                  </div>
                </div>

                {/* Canva Canvas visual representation */}
                <div className="lg:col-span-5">
                  <div className={`p-8 bg-gradient-to-tr ${canvasBgColor} rounded-3xl border border-white/50 shadow-xl h-64 flex flex-col justify-between relative overflow-hidden filter backdrop-contrast-125`}>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 z-10">
                      <span className="font-extrabold tracking-wider uppercase">ИИSMM ХОЛСТ СТУДИЯ</span>
                      <span>1:1 Square</span>
                    </div>

                    <div className="text-center z-10 py-4">
                      <h3 className="text-lg font-black tracking-tight text-indigo-950 uppercase leading-snug drop-shadow-sm font-sans">
                        {canvasMainText}
                      </h3>
                      <span className="block text-[9px] text-indigo-800/80 font-mono mt-1 font-bold">Сгенерировано в холсте</span>
                    </div>

                    <div className="flex justify-between items-end text-[10px] font-bold text-indigo-900/60 z-10 font-mono">
                      <span>ИИSMM Canvas App</span>
                      <span className="bg-white/50 backdrop-blur px-2 py-0.5 rounded border border-white/20 text-slate-800 text-[9px]">{canvasWatermark}</span>
                    </div>

                    {/* Decorative glass bubbles */}
                    <div className="absolute right-4 top-4 w-12 h-12 rounded-full bg-white/20 blur-[1px] rotate-12"></div>
                    <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-orange-400/20 blur-md"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center font-semibold mt-3">Данный интерактивный Холст полнофункционален в личном кабинете!</p>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 8: РЕПОСТЕР 🔄 */}
            {activeTab === 'reposter' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-7 space-y-5">
                  <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-[10px] font-black uppercase border border-rose-200">АВТОМАТИКА ФИДОВ</span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gradient-header">Умный репостер новостей по правилам</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Настройте автоматический забор новостной ленты из RSS, ВКонтакте, Telegram-референс группы или конкурентного блога. Наш репостер применит встроенное ИИ-рерайтинг правило (SAV AI), удалит ссылки на внешних соперников, наложит водяной знак и тут же отправит в ваши дочерние паблики.
                  </p>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-500" /> Фильтрация по запрещенным ключевым словам в текстах</li>
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-500" /> Замена ссылок и удаление спам рекламы перед отправкой</li>
                    <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-500" /> Настройка задержки кросспостинга (от 1 до 60 минут)</li>
                  </ul>
                </div>

                <div className="lg:col-span-5 bg-white/60 backdrop-blur rounded-3xl p-6 border border-white/55 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest border-b pb-1.5">Схема авторепостера:</h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-dashed flex items-center justify-between font-mono">
                      <span className="font-bold">🌐 Источник (Блог конкурента)</span>
                      <span className="p-1.5 bg-orange-100 text-orange-850 rounded text-[9px] uppercase">Следим</span>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-4 h-4 text-pink-450 rotate-90" />
                    </div>
                    <div className="p-3 bg-pink-50 rounded-xl border border-pink-100 flex items-center justify-between font-mono text-[11px]">
                      <span className="font-black text-pink-850">⚙️ ИИ-Фильтры & ИИрки SAV rewriter</span>
                      <span className="p-1 bg-pink-200 text-pink-800 rounded font-black text-[9px] uppercase">Анализ</span>
                    </div>
                    <div className="flex justify-center">
                      <ArrowRight className="w-4 h-4 text-pink-450 rotate-90" />
                    </div>
                    <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between font-mono">
                      <span className="font-bold text-orange-850">✈️ Мои Telegram-каналы (С водяным знаком)</span>
                      <span className="p-1 px-2.5 bg-orange-200 text-orange-800 rounded font-black text-[9px] uppercase">Публикация</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 9: ТАРИФЫ */}
            {activeTab === 'prices' && (
              <div className="space-y-6 py-4">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-[10px] font-black uppercase border border-orange-200">ПРОЗРАЧНАЯ ОПЛАТА</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-header">Интеллектуальные тарифные планы ИИSMM</h2>
                  <p className="text-slate-500 text-xs">Выберите подходящую мощность для ваших соцсетей. Активация доступна за рубли или внутреннюю валюту (ИИрки).</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                  
                  {/* Free plan */}
                  <div className="apple-liquid-glass rounded-3xl p-6 border border-orange-200 shadow-sm flex flex-col justify-between space-y-6 bg-orange-50/20">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 bg-orange-100 text-orange-850 rounded-full text-[9px] font-black uppercase">Тестовый</span>
                        <span className="text-xs font-mono font-bold text-orange-600">0 ₽</span>
                      </div>
                      <h3 className="text-lg font-black tracking-tight text-slate-800">FREE ТАРИФ</h3>
                      <p className="text-xs text-slate-500 font-medium">Бесплатный базовый инструмент для личных страниц.</p>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-center gap-1.5">• Подключение до 3 каналов максимум</li>
                        <li className="flex items-center gap-1.5">• Наложение водяных знаков</li>
                        <li className="flex items-center gap-1.5">• 1,000,000 ИИрок в подарок при входе</li>
                        <li className="flex items-center gap-1.5 text-slate-400">• <span className="line-through">Умный ИИ рерайт постов</span></li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setShowTelegramModal(true)} 
                      className="w-full py-3 btn-liquid-glass btn-glass-peach text-xs uppercase"
                    >
                      Подключить FREE 🚀
                    </button>
                  </div>

                  {/* PRO plan */}
                  <div className="apple-liquid-glass rounded-3xl p-6 border-2 border-orange-400/50 shadow-md flex flex-col justify-between space-y-6 relative transform lg:-translate-y-1.5 bg-orange-50/30">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-sm">Самый Популярный</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 bg-orange-100 text-orange-850 rounded-full text-[9px] font-black uppercase">Безлимитный</span>
                        <div className="text-right">
                          <span className="text-xs font-mono font-black text-slate-800 block">490 ₽ / мес</span>
                          <span className="text-[9px] text-orange-750 block font-bold font-mono">или 250 ИИрок</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-black tracking-tight text-slate-800">⚡ PRO ТАРИФ</h3>
                      <p className="text-xs text-slate-500 font-medium">Для профессиональных SMM-маркетологов и паблик-холдеров.</p>
                      <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                        <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-600" /> Полный безлимит на каналы</li>
                        <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-600" /> ИИ Рерайт SAV и умная генерация</li>
                        <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-600" /> UTM Ссылки и расширенная аналитика</li>
                        <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-orange-600" /> Приоритетный отложенный фид</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setShowTelegramModal(true)} 
                      className="w-full py-3 btn-liquid-glass btn-glass-peach text-xs uppercase"
                    >
                      Купить PRO ⚡
                    </button>
                  </div>

                  {/* VIP Plan */}
                  <div className="apple-liquid-glass rounded-3xl p-6 border border-pink-300/40 shadow-sm flex flex-col justify-between space-y-6 bg-pink-50/20">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="px-2.5 py-0.5 bg-pink-100 text-pink-800 rounded-full text-[9px] font-black uppercase">Ультимейт</span>
                        <div className="text-right">
                          <span className="text-xs font-mono font-black text-slate-800 block">990 ₽ / мес</span>
                          <span className="text-[9px] text-pink-750 block font-bold font-mono">или 500 ИИрок</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-black tracking-tight text-slate-800">⭐ VIP СУПЕРВИЗОР</h3>
                      <p className="text-xs text-slate-500 font-medium">Максимальная бизнес-лицензия с умным авто-модератором.</p>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-center gap-1.5">• Все особенности безлимитного тарифа</li>
                        <li className="flex items-center gap-1.5">• Бот-чистильщик спам комментариев</li>
                        <li className="flex items-center gap-1.5">• VIP значок и приоритетная ИИ-очередь</li>
                        <li className="flex items-center gap-1.5">• Персональная поддержка SMM команды</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setShowTelegramModal(true)} 
                      className="w-full py-3 btn-liquid-glass btn-glass-pink text-xs uppercase"
                    >
                      Запустить VIP ⭐
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 10: ПРОЕКТЫ */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-7 space-y-5">
                  <span className="px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-[10px] font-black uppercase border border-orange-200">СБОРОЧНЫЕ КАМПАНИИ</span>
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gradient-header">Проекты и взаимный PR пабликов</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Мультибрендовые проекты позволяют объединить рекламу нескольких каналов. Инструмент "Взаимные папки продвижения" позволяет организовывать рекламные сборы, делить комиссии, привлекать новых участников и автоматически раздавать трафик.
                  </p>
                  <div className="p-4 bg-orange-100/50 rounded-2xl border border-orange-200 text-xs text-orange-900 font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>Для организаторов сборов модуль продвижения полностью бесплатен! Зарабатывайте на комиссиях папок.</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white/70 backdrop-blur rounded-3xl p-6 border border-white/50 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest border-b pb-1.5">Кабинет проектов (Спецификация):</h4>
                  <div className="space-y-3">
                    {[
                      { campaign: 'Маркетинг Май (Сборный пиар)', channels: '6 каналов', budget: '250 ₽ взнос' },
                      { campaign: 'Крипто Клуб (Взаимная папка)', channels: '4 канала', budget: '500 ₽ взнос' },
                      { campaign: 'Нейросети 2026 (Топ Лист)', channels: '8 каналов', budget: 'Бесплатное участие' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-white/80 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-850">{item.campaign}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.channels}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-orange-50 text-orange-800 font-mono text-[10px] rounded-lg font-bold">{item.budget}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setShowTelegramModal(true)} className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-black text-xs rounded-xl uppercase shadow transition-all">Создать свою папку 📂</button>
                </div>
              </div>
            )}

            {/* INFORMATIVE SECTION 11: АКАДЕМИЯ */}
            {activeTab === 'academy' && (() => {
              // 1. Academy Courses Data
              const academyCourses = [
                {
                  title: "🤖 Платформа ИИSMM & Автопостинг",
                  icon: "🤖",
                  description: "Освойте все тонкости публикации, автоматизации кросспостинга и умного календаря за 10 минут.",
                  lessons: [
                    {
                      id: "c0-l0",
                      title: "Урок 1: Подключение каналов и первый автопост",
                      excerpt: "Узнаем основы интеграции API, правила привязки до 3 бесплатных каналов и быстрый старт через бота.",
                      content: `Добро пожаловать в Академию ИИSMM! Наш первый урок посвящен связыванию ваших пабликов с платформой.\n\n📋 Шаги подключения:\n1. Откройте Telegram-бота @iismmAIbot и нажмите /start.\n2. Добавьте бота в администраторы вашего канала Telegram или предоставьте права доступа к сообществу ВКонтакте/Одноклассники.\n3. Пропишите уникальный ID канала в панели "📡 Каналы" ИИSMM.\n\n💡 Совет от ИИ: Публикуйте первый пост с кнопкой-ссылкой — это повышает ER (вовлеченность) на 17%.`,
                      question: "Сколько каналов можно бесплатно привязать на базовом тарифе ИИSMM?",
                      options: [
                        "А) Ни одного, только платные тарифы",
                        "Б) До 3-х каналов включительно",
                        "В) До 10 каналов",
                        "Г) Ограничений нет"
                      ],
                      correctIdx: 1,
                      feedback: "Правильно! Бесплатный тариф позволяет полноценно использовать до 3-х каналов одновременно."
                    },
                    {
                      id: "c0-l1",
                      title: "Урок 2: Разработка вотермарок и шаблонов на Холсте",
                      excerpt: "Как создавать защитные водяные знаки, использовать Apple Liquid Glass стиль для картинок и уникализировать визуал.",
                      content: `Защита авторского права в SMM в 2026 году — критически важная деталь.\n\n🎨 Правила Холста:\n• Водяной знак должен располагаться в углу изображения, занимая не более 5-7% площади.\n• Используйте полупрозрачный белый цвет с белой обводкой для универсальной видимости на любом фоне.\n• Вы можете задать автоматическое наложение водяного знака — система сама применит его ко всем картинкам ваших постов при кросспостинге.\n\n💡 Совет от ИИ: Уникализированные картинки с вотермарками получают в 1.5 раза больше органического поиска в Яндекс и Google Дзене.`,
                      question: "Какой процент от площади изображения должен занимать гармоничный водяной знак?",
                      options: [
                        "А) 50% в центре картинки",
                        "Б) Около 5-7% в одном из углов",
                        "В) 90% для полной защиты",
                        "Г) Водяные знаки вообще не нужны"
                      ],
                      correctIdx: 1,
                      feedback: "Правильно! Компактные 5-7% в углу защищают контент без визуального захламления!"
                    },
                    {
                      id: "c0-l2",
                      title: "Урок 3: Умный репостер и новостной авто-рерайт",
                      excerpt: "Осваиваем автопилотирование: забирайте контент доноров, делайте мгновенный рерайт и постите без штрафов за плагиат.",
                      content: `Запуск авто-репостера сокращает время ведения новостных пабликов в 10 раз!\n\n⚙️ Настройка автопилота:\n1. Перейдите во вкладку "Репостер" и укажите адрес открытого канала-источника.\n2. Включите опцию "ИИ-Рерайтер" для автоматического синонимического парафраза.\n3. Укажите стоп-слова, чтобы вырезать чужую рекламу и ссылки.\n\n⚡ Внимание на закон: Обязательно настраивайте правила уникализации контента, чтобы сети не понижали охваты за неоригинальность.`,
                      question: "Какая функция репостера оберегает паблик от понижения за неоригинальные посты?",
                      options: [
                        "А) Быстрое копирование без изменений",
                        "Б) ИИ-Рерайтер контента",
                        "В) Ссылка на оригинал огромным шрифтом",
                        "Г) Удаление всех картинок"
                      ],
                      correctIdx: 1,
                      feedback: "Правильно! Автоматический ИИ-Рерайтер адаптирует лексику и уникализирует текст."
                    }
                  ]
                },
                {
                  title: "📈 Вирусное SMM Продвижение от ИИ",
                  icon: "📈",
                  description: "Комплексное продвижение блогов, привлечение органической аудитории и искусство взаимного пиара.",
                  lessons: [
                    {
                      id: "c1-l0",
                      title: "Урок 1: Копирайтинг AIDA & зацепка внимания за 1.5 секунды",
                      excerpt: "Учимся писать первые 2 строки поста, которые заставят нажать кнопку «Читать далее» в любой соцсети.",
                      content: `Пользователь в 2026 году принимает решение за секунды!\n\n📌 Формула AIDA в ИИSMM:\n• Attention (Внимание): Крупный интригующий заголовок в первой строке.\n• Interest (Интерес): Факт, противоречие или статистика.\n• Desire (Желание): Описание выгоды читателя.\n• Action (Действие): Простая ссылка или кнопка.\n\n💡 Совет от ИИ: Избегайте черных фонов на картинках и избытка красных восклицательных знаков (это триггерит алгоритмы спам-фильтров).`,
                      question: "Что важнее всего поместить в самую первую строчку промо-публикации?",
                      options: [
                        "А) Десять смайликов подряд",
                        "Б) Интригующий заголовок (Attention)",
                        "В) Ссылку на свой профиль",
                        "Г) Длинное приветствие"
                      ],
                      correctIdx: 1,
                      feedback: "Правильно! Захватывающее внимание (Attention) — фундамент успеха любого поста."
                    },
                    {
                      id: "c1-l1",
                      title: "Урок 2: Организация Взаимного Пиара в Папках",
                      excerpt: "Используйте встроенный модуль Проектов, чтобы обмениваться аудиторией с другими SMM-админами абсолютно бесплатно.",
                      content: `Папка взаимного пиара — это подборка каналов схожей тематики, в которую пользователи добавляются в 1 клик.\n\n🚀 Как это работает в ИИSMM:\n1. Создайте проект-папку во вкладке "Папки Пиара".\n2. Пригласите от 3 до 8 каналов схожих масштабов аудитории.\n3. Все участники делают репост папки. В итоге каждый получает приток лояльных подписчиков совершенно бесплатно!\n\n💡 Совет от ИИ: Оптимальное количество участников в одной папке пиара — от 4 до 6. Больше вызовет баннерную слепоту.`,
                      question: "Какое рекомендуемое число блогов в одной папке взаимного пиара для максимального эффекта?",
                      options: [
                        "А) Не менее 100 блогов",
                        "Б) От 4 до 6 блогов",
                        "В) Только 1 блог",
                        "Г) Чем больше, тем лучше"
                      ],
                      correctIdx: 1,
                      feedback: "Правильно! Фокусированный подбор 4-6 близких тематических каналов дает лучшую конверсию."
                    },
                    {
                      id: "c1-l2",
                      title: "Урок 3: Безопасное бронирование на Рекламной Бирже",
                      excerpt: "Как продать свободные рекламные места, пройти модерацию и заработать первые рубли через Escrow софт.",
                      content: `На бирже ИИSMM сделки защищены системой безопасного депонирования (Escrow).\n\n💰 Правила работы биржи:\n• Рекламодатель резервирует место, и рубли холдируются на балансе системы.\n• Блогер берет заявку в работу и публикует пост.\n• Наш робот проверяет наличие публикации в течение 24 часов и мгновенно зачисляет средства бложеру.\n• Стандартная комиссия биржи при успешном закрытии сделки составляет 25% и идет на развитие и поддержание ИИ-инфраструктуры.\n\n🛡️ Важно: За накрутку ботов перед проверкой канал бессрочно блокируется без права вывода баланса!`,
                      question: "Сколько составляет комиссия биржи ИИSMM при успешном проведении сделки депонирования?",
                      options: [
                        "А) 50% от суммы сделки",
                        "Б) 25% фиксированно",
                        "В) Комиссии нет вообще",
                        "Г) 5% фиксированно"
                      ],
                      correctIdx: 1,
                      feedback: "Великолепно! Стандартная комиссия составляет 25%, покрывая гарантии Escrow-сделки."
                    }
                  ]
                }
              ];

              const currentCourse = academyCourses[selectedCourseIdx] || academyCourses[0];
              const currentLesson = currentCourse.lessons[selectedLessonIdx] || currentCourse.lessons[0];
              const lessonKey = `${selectedCourseIdx}-${selectedLessonIdx}`;

              // Calculate course completion
              const totalLessonsCount = academyCourses.reduce((acc, c) => acc + c.lessons.length, 0);
              const completedLessonsCount = Object.keys(lessonCompletedState).filter(k => lessonCompletedState[k]).length;
              const isCertified = completedLessonsCount >= 3;

              // Action triggers
              const handleAnswerSelect = (optionIdx: number) => {
                const newAnswers = { ...lessonQuizAnswers, [lessonKey]: optionIdx };
                setLessonQuizAnswers(newAnswers);

                if (optionIdx === currentLesson.correctIdx) {
                  setLessonCompletedState({ ...lessonCompletedState, [currentLesson.id]: true });
                  setLessonQuizFeedback(`🎉 ${currentLesson.feedback}`);
                } else {
                  setLessonQuizFeedback(`❌ Неверный ответ. Перечитайте материал урока и попробуйте другой вариант!`);
                }
              };

              // Simulated AI tutor response generator
              const handleAskAiCurator = () => {
                if (!customSmmQuestion.trim()) return;
                setAiAnswering(true);
                setAiAnswerResult('');
                
                setTimeout(() => {
                  const query = customSmmQuestion.toLowerCase();
                  let response = `🤖 ИИ-Куратор Академии ИИSMM: Рад помочь! По теме "${currentLesson.title}" сообщаю следующее:\n\n`;
                  
                  if (query.includes('канал') || query.includes('подключ') || query.includes('tg') || query.includes('vk')) {
                    response += `Для надежного кросспостинга обязательно проверьте, что боту @iismmAIbot даны права администратора на "Публикацию сообщений" и "Редактирование". Без этого API Telegram вернет ошибку доступа. Наша система обрабатывает отправки мгновенно или в запланированное вами время.`;
                  } else if (query.includes('вотермарк') || query.includes('водян') || query.includes('картин')) {
                    response += `Защищать визуал крайне полезно в Одноклассниках и VK, где встроенные алгоритмы Ленты ("Прометей" / "Умная лента") проверяют графический шум на уникальность. Минимальный водяной знак в правом нижнем углу со значением прозрачности 25% — наилучшее решение для сохранения эстетики паблика.`;
                  } else if (query.includes('деньги') || query.includes('комисси') || query.includes('вывод')) {
                    response += `Сделки по покупке и продаже تبلیغات (рекламы) на нашей бирже защищены смарт-депонированием. Рекламодатель спокоен, что деньги спишутся только за реальный пост, провисевший в топе нужный срок. Комиссия 25% используется для компенсации серверов и разработки новых ИИ-ассистентов.`;
                  } else if (query.includes('рерайт') || query.includes('репост') || query.includes('копир')) {
                    response += `ИИ-Рерайтер в ИИSMM использует релевантные языковые модели со SMM-приоритетом. Он не просто заменяет слова синонимами, а форматирует лонгрид по стилю AIDA, расставляет эмодзи, выделяет абзацы жирным и структурирует списки по канонам эффективных рекламных постов.`;
                  } else {
                    response += `Отличный рабочий вопрос! На практике в SMM для старта органического продвижения используйте бесплатные проекты взаимного пиара папок. Добавьте в папку 5 смежных блогов, запустите взаимные рассылки, и вы получите лояльную аудиторию абсолютно бесплатно в первый же день сотрудничества!`;
                  }
                  
                  setAiAnswerResult(response);
                  setAiAnswering(false);
                }, 1000);
              };

              return (
                <div className="lg:col-span-12 w-full space-y-6 pt-2">
                  {/* Academy Head Banner */}
                  <div className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-3xl p-6 border border-white/90 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1.5 max-w-xl">
                      <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-[10px] font-black uppercase border border-amber-200">ИНТЕРАКТИВНОЕ ИИОБУЧЕНИЕ</span>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-none text-gradient-header">Академия Своих Блогов ИИSMM</h2>
                      <p className="text-xs text-slate-500 font-medium">Бесплатный курс от ИИ по автоматизации автопостинга и комплексному SMM продвижению с выдачей диплома.</p>
                    </div>
                    {/* Progress Badge */}
                    <div className="p-4 bg-white/95 rounded-2xl border border-slate-100 text-center space-y-1 shrink-0">
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider font-mono">Пройдено Уроков:</p>
                      <p className="text-xl font-black text-slate-950 font-mono">{completedLessonsCount} / {totalLessonsCount}</p>
                      <p className="text-[9px] text-orange-605 font-bold font-mono">Бонус: +100,000 ИИрок🪙</p>
                    </div>
                  </div>

                  {/* Course Categories Selection Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {academyCourses.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedCourseIdx(idx); setSelectedLessonIdx(0); setLessonQuizFeedback(null); }}
                        className={`p-4 rounded-3xl border text-left transition-all ${
                          selectedCourseIdx === idx 
                            ? 'bg-white text-slate-900 border-slate-900 shadow-sm ring-2 ring-slate-900/5' 
                            : 'bg-white/60 hover:bg-white text-slate-600 border-slate-250/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{c.icon}</span>
                          <div>
                            <h4 className="font-extrabold text-xs uppercase tracking-wide text-slate-900">{c.title}</h4>
                            <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{c.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Main Academy Working Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                    {/* Left Sidebar: Lesson Selectors */}
                    <div className="lg:col-span-4 space-y-2.5">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider font-mono px-1">Список уроков курса:</span>
                      <div className="space-y-2">
                        {currentCourse.lessons.map((lesson, lIdx) => {
                          const isCurrent = selectedLessonIdx === lIdx;
                          const isCompleted = lessonCompletedState[lesson.id];
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => { setSelectedLessonIdx(lIdx); setLessonQuizFeedback(null); }}
                              className={`w-full p-3.5 rounded-2xl border text-left transition-all flex justify-between items-center ${
                                isCurrent 
                                  ? 'bg-white text-slate-950 border-slate-900 shadow-xs' 
                                  : 'bg-white/50 hover:bg-white/80 text-slate-700 border-slate-200/50'
                              }`}
                            >
                              <div className="space-y-1 pr-2">
                                <p className="font-black text-xs leading-tight text-slate-900">{lesson.title}</p>
                                <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">{lesson.excerpt}</p>
                              </div>
                              <div className="shrink-0">
                                {isCompleted ? (
                                  <span className="w-5 h-5 rounded-full bg-orange-100 border border-orange-200/60 flex items-center justify-center text-[10px] text-orange-800 font-bold">✓</span>
                                ) : (
                                  <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400">?</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Interactive AI Curator Panel */}
                      <div className="bg-white/95 rounded-3xl p-5 border border-white/90 shadow-xs space-y-3 mt-6">
                        <div className="flex items-center gap-2 border-b pb-2">
                          <span className="text-[10px] font-black text-slate-900 uppercase">💬 Чат с ИИ-Преподавателем</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal font-medium">Задайте любой вопрос по автоматизации постов, выводу денег, водяным знакам или охватам папок.</p>
                        
                        <div className="space-y-2">
                          <textarea
                            value={customSmmQuestion}
                            onChange={(e) => setCustomSmmQuestion(e.target.value)}
                            placeholder="Например: Как добавить бота в канал или вывести средства с биржи?"
                            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-hidden resize-none bg-slate-50 font-semibold"
                            rows={2}
                          />
                          <button
                            onClick={handleAskAiCurator}
                            disabled={aiAnswering || !customSmmQuestion.trim()}
                            className="w-full py-2 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white font-black text-[10px] rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 cursor-pointer border border-white/20 hover:opacity-95 shadow-md active:scale-98"
                          >
                            {aiAnswering ? 'ИИ Диктует... ⚡' : 'Задать вопрос ИИ-Куратору 🔮'}
                          </button>
                        </div>

                        {aiAnswerResult && (
                          <div className="p-3.5 bg-orange-50/70 border border-orange-100 rounded-2xl text-[11px] text-slate-800 leading-relaxed font-semibold font-sans whitespace-pre-wrap animate-fade-in shadow-2xs">
                            {aiAnswerResult}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side: Active Lesson Content & Quiz Test */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Active Lesson Text Reader */}
                      <div className="bg-white rounded-3xl p-6 border border-white/95 shadow-xs space-y-4">
                        <div className="flex flex-wrap justify-between items-center gap-2 border-b pb-3">
                          <h3 className="font-black text-md text-slate-950 uppercase tracking-tight">{currentLesson.title}</h3>
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-orange-50 text-orange-750 rounded-md text-[9px] font-bold border border-orange-100">ИИ Курс</span>
                            <span className="px-2 py-0.5 bg-pink-50 text-pink-750 rounded-md text-[9px] font-bold border border-pink-100">Бесплатно</span>
                          </div>
                        </div>

                        {/* Lesson text */}
                        <div className="text-xs text-slate-700 space-y-3 font-semibold font-sans leading-relaxed whitespace-pre-wrap">
                          {currentLesson.content}
                        </div>

                        {/* Interactive Quiz Zone */}
                        <div className="mt-6 pt-5 border-t border-slate-150 space-y-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-amber-500 text-sm">🎓</span>
                            <h4 className="font-extrabold text-xs text-slate-900 uppercase">Экспресс-Проверка пройденного материала:</h4>
                          </div>
                          <p className="font-bold text-slate-800 text-xs">{currentLesson.question}</p>

                          <div className="grid grid-cols-1 gap-2">
                            {currentLesson.options.map((opt, oIdx) => {
                              const selectedAnswer = lessonQuizAnswers[lessonKey];
                              const isThisSelected = selectedAnswer === oIdx;
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleAnswerSelect(oIdx)}
                                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all font-semibold ${
                                    isThisSelected 
                                      ? 'bg-gradient-to-r from-orange-450 to-pink-450 text-white border-pink-400 shadow-sm scale-101' 
                                      : 'bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {lessonQuizFeedback && (
                            <div className="p-3 rounded-xl border bg-amber-50/50 border-amber-200 text-slate-850 font-bold text-xs space-y-1">
                              <p className="leading-relaxed whitespace-pre-wrap">{lessonQuizFeedback}</p>
                              {lessonQuizFeedback.includes('🎉') && (
                                <p className="text-[10px] text-orange-605 font-bold font-mono">Урок зачтен! Прогресс обновлен.</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Certified SMM Specialist Diploma Generator */}
                      {isCertified ? (
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100/80 hover:to-amber-100/80 rounded-3xl p-6 border-2 border-dashed border-amber-300 text-center space-y-4 shadow-sm animate-fade-in transition-all">
                          <Trophy className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
                          <div className="space-y-1">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ваш Диплом SMM-Специалиста Готов!</h3>
                            <p className="text-xs text-slate-600 font-semibold max-w-lg mx-auto leading-relaxed">
                              Поздравляем! Вы успешно завершили 3 обучающих курса-модуля от ИИ Копирайтинга и Биржи ИИSMM. Скачайте сертифицированный диплом о прохождении курса.
                            </p>
                          </div>

                          {/* Dynamic Name Input in Diploma */}
                          <div className="max-w-xs mx-auto space-y-2">
                            <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Имя на дипломе:</label>
                            <input
                              type="text"
                              value={customUsername === '@smm_expert' ? 'Иван Шишкарёв' : customUsername.replace('@', '')}
                              onChange={(e) => setCustomUsername(e.target.value)}
                              placeholder="Имя Фамилия"
                              className="w-full px-3 py-2 text-center text-xs rounded-xl border border-slate-300 font-bold focus:outline-hidden focus:border-slate-500 bg-white"
                            />
                          </div>

                          {/* Diploma Layout Card */}
                          <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-md text-slate-800 space-y-5 max-w-xl mx-auto relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-bl-full opacity-10" />
                            
                            <div className="flex justify-between items-center text-left">
                              <ShinyLogo height={24} />
                              <span className="font-mono text-[9px] text-slate-400">ID: IISMM-2026-{completedLessonsCount}</span>
                            </div>

                            <div className="space-y-2">
                              <p className="font-mono text-[10px] text-amber-600 font-black uppercase tracking-widest leading-none">СЕРТИФИЦИРОВАННЫЙ ДИПЛОМ</p>
                              <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">СПЕЦИАЛИСТ ПО ИИ-SMM И АВТОМАТИЗАЦИИ</h2>
                              <div className="w-12 h-0.5 bg-amber-400 mx-auto my-1.5" />
                              <p className="text-[10px] text-slate-500 italic">Настоящим подтверждается, что</p>
                              <p className="text-md font-black text-slate-900 underline decoration-amber-400 decoration-2 font-serif">
                                {customUsername === '@smm_expert' ? 'Иван Шишкарёв' : customUsername}
                              </p>
                              <p className="text-[10px] text-slate-600 max-w-md mx-auto leading-normal px-4 font-semibold">
                                Успешно освоил(а) основы интеграции API через бота @iismmAIbot, кросспостинг в 7 сетей, навыки копирайтинга по формуле AIDA, а также безопасный вывод средств на рекламной Escrow Бирже.
                              </p>
                            </div>

                            <div className="flex justify-between items-end border-t pt-4 text-[9px] text-slate-550">
                              <div className="text-left font-semibold">
                                <p>Куратор курса: <span className="font-black text-slate-900">ИИ-Помощник Gemini</span></p>
                                <p className="text-slate-400">Дата выдачи: {new Date().toLocaleDateString('ru-RU')}</p>
                              </div>
                              <div className="text-right flex items-center gap-1.5">
                                <span className="p-1 bg-amber-500 text-white rounded-full text-[8px] font-black uppercase">SEAL</span>
                                <span className="font-serif italic font-bold text-slate-800">Verified AI</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => {
                                alert(`🎉 Диплом успешно сохранен! Ваш бонусный промокод на +100k ИИрок 'SMM_HERO_2026' скопирован в буфер обмена. Введите его в ЛК после входа!`);
                                navigator.clipboard.writeText('SMM_HERO_2026');
                              }}
                              className="px-6 py-2.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white font-black text-xs rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 mx-auto transition-all cursor-pointer shadow-md border border-white/20 hover:opacity-95 active:scale-98"
                            >
                              <span>💾 Скачать диплом и скопировать промокод</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-1.5 font-semibold">
                          <p className="text-xs text-slate-700">🎓 Пройдите еще уроки, чтобы разблокировать Фирменный Диплом Специалиста</p>
                          <p className="text-[10px] text-slate-400">Вам нужно верно ответить на квизы по урокам, чтобы набрать как минимум 3 зачета.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

          </motion.div>
        </AnimatePresence>

        {/* 3. Global Promotional Features Panel under each landing view */}
        <div className="mt-12 p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm text-center space-y-4 max-w-4xl mx-auto">
          <h3 className="text-xl font-black tracking-tight leading-none uppercase text-gradient-header inline-block">
            Вход за 1 Секунду без паролей через Telegram
          </h3>
          <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
            Мы начислим вам стартовые **1,000,000 ИИрок (токенов)**, подключим до 3 каналов на Free-тарифе и подарим 7 дней VIP-Супервизора абсолютно бесплатно без привязки карт!
          </p>
          <div className="flex justify-center pt-2">
            <button
              id="cta-btn-landing-auth"
              onClick={() => setShowTelegramModal(true)}
              className="px-8 py-4 hover:scale-103 text-white font-black text-xs rounded-2xl shadow-xl border border-white/40 transition-all uppercase tracking-wide flex items-center gap-2.5 cursor-pointer"
              style={{ background: 'linear-gradient(90deg, #38bdf8 0%, #ec4899 23%, #f97316 50%, #ec4899 77%, #38bdf8 100%)' }}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-white fill-current shrink-0">
                <path d="M19.897 5.115l-17.1 6.59c-1.17.47-1.16 1.12-.22 1.41l4.39 1.37 10.16-6.41c.48-.29.92-.13.56.19l-8.24 7.44-.32 4.79c.47 0 .68-.21.94-.47l2.25-2.19 4.68 3.46c.86.48 1.48.23 1.69-.8l3.07-14.47c.31-1.26-.48-1.83-1.32-1.37z" />
              </svg>
              Войти через Telegram в 1 клик 🚀
            </button>
          </div>
        </div>

      </main>

      {/* 4. Realistic Telegram Auth Glass Dialog Simulator */}
      {showTelegramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/15 backdrop-blur-3xl">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="w-full max-w-sm apple-liquid-glass-heavy rounded-[28px] overflow-hidden shadow-2xl border border-white/60 p-1 bg-white/70 backdrop-blur-2xl"
          >
            {/* Telegram Header */}
            <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 p-5 rounded-[24px] text-white flex items-center justify-between shadow-md border border-white/25">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-all hover:rotate-6 shadow-inner shrink-0">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-white fill-current">
                    <path d="M19.897 5.115l-17.1 6.59c-1.17.47-1.16 1.12-.22 1.41l4.39 1.37 10.16-6.41c.48-.29.92-.13.56.19l-8.24 7.44-.32 4.79c.47 0 .68-.21.94-.47l2.25-2.19 4.68 3.46c.86.48 1.48.23 1.69-.8l3.07-14.47c.31-1.26-.48-1.83-1.32-1.37z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight leading-none text-white">Вход по Telegram API</h4>
                  <span className="text-[10px] text-orange-50/90 block mt-1 font-mono">@iiSmmBot Secure Auth</span>
                </div>
              </div>
              <button 
                onClick={() => { setShowTelegramModal(false); setStep(1); }}
                className="text-white hover:text-orange-50 font-extrabold text-xs bg-white/10 hover:bg-white/20 p-1.5 px-2.5 rounded-full transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Simulated Auth steps */}
            <div className="p-6 space-y-4">
              {step === 1 ? (
                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-100 text-sky-950 text-[11px] leading-relaxed font-semibold shadow-xs">
                    Введите ваш номер телефона или юзернейм Telegram для мгновенного входа в Личный Кабинет.
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-450 font-extrabold uppercase block tracking-wider">Телефон или @username</label>
                    <input 
                      type="text" 
                      placeholder="+7 999 123 4567 или @username" 
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/85 border border-slate-200/80 p-2.5 rounded-xl text-xs focus:ring-2 focus:ring-sky-450 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-450 font-extrabold uppercase block tracking-wider">Желаемый никнейм для профиля</label>
                    <input 
                      type="text"
                      placeholder="@smm_expert"
                      value={customUsername}
                      onChange={e => setCustomUsername(e.target.value)}
                      className="w-full bg-white/85 border border-slate-200/80 p-2.5 rounded-xl text-xs focus:ring-2 focus:ring-pink-450 focus:border-transparent focus:outline-none transition-all placeholder:text-slate-400 font-mono font-semibold"
                    />
                  </div>
                  <button 
                    onClick={handleConfirmLogin}
                    className="w-full py-2.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 hover:opacity-95 text-white font-extrabold text-xs rounded-xl shadow-md border border-white/10 cursor-pointer transition-all text-center uppercase tracking-wider active:scale-98"
                  >
                    Далее ➔
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 bg-pink-50/80 rounded-2xl border border-pink-100 text-pink-950 text-[11px] leading-relaxed font-semibold shadow-xs">
                    Бот отправил одноразовый PIN-код в чат с вами в Telegram. Пожалуйста, введите код для верификации.
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-455 font-extrabold uppercase block tracking-wider">Код верификации (4 цифры)</label>
                    <input 
                      type="password" 
                      maxLength={4}
                      placeholder="••••" 
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                      className="w-full bg-white/85 border border-slate-200/80 p-2.5 rounded-xl text-center text-lg font-black tracking-widest focus:ring-2 focus:ring-pink-450 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-center cursor-pointer transition-all"
                    >
                      Назад
                    </button>
                    <button 
                      onClick={handleConfirmLogin}
                      className="flex-1 py-2.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 hover:opacity-95 text-white font-black rounded-xl text-center uppercase shadow-md border border-white/10 cursor-pointer transition-all active:scale-98"
                    >
                      Подтвердить ⚡
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Disclaimer */}
            <div className="p-4 bg-white/40 rounded-b-[24px] border-t gap-1 text-center text-[9px] text-slate-500">
              Нажимая кнопку, вы соглашаетесь с <span onClick={() => setShowTermsModal(true)} className="underline text-sky-600 hover:text-sky-700 font-bold cursor-pointer transition-all">условиями обслуживания ИИSMM API</span>.
            </div>
          </motion.div>
        </div>
      )}

      {/* 4.5 Terms of Service Elegant Glass Sheet Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/15 backdrop-blur-3xl">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-lg apple-liquid-glass-heavy rounded-[28px] overflow-hidden shadow-2xl border border-white/60 p-1 bg-white/80 backdrop-blur-2xl"
          >
            <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 p-5 rounded-[24px] text-white flex items-center justify-between shadow-md border border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-all shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-white fill-current">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight leading-none text-white">Условия обслуживания</h4>
                  <span className="text-[10px] text-orange-50/90 block mt-1 font-mono">Документ: ИИSMM_API_v2.0_2026</span>
                </div>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-white hover:text-orange-50 font-extrabold text-xs bg-white/10 hover:bg-white/20 p-1.5 px-2.5 rounded-full transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[350px] overflow-y-auto text-xs text-slate-700 leading-relaxed scrollbar-thin scrollbar-thumb-slate-200">
              <h5 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">1. Общие положения</h5>
              <p>
                Использование интеллектуальной платформы автоматического постинга и комбайна ИИSMM API регулируется данным соглашением. Подключая свой аккаунт через Telegram-бот <strong>@iiSmmBot</strong>, вы получаете доступ к автономному облачному генератору контента, планировщику, рерайтеру ссылок и внутреннему кошельку ИИрок.
              </p>

              <h5 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">2. Безопасность и Telegram API</h5>
              <p>
                Авторизация осуществляется моментально через официальный безопасный протокол и не запрашивает личные пароли от мессенджера Telegram. Система использует защищенный шлюз сквозного шифрования для публикации в ваши каналы, групповые чаты и личные блоги. Вы сохраняете полный контроль над правами бота-администратора.
              </p>

              <h5 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">3. Правила использования ИИрок и Эскроу</h5>
              <p>
                Внутренние токены (ИИрки) используются для оплаты генерации текстов, ИИ-дизайна холстов, SMM-анализа и участия в совместных закупках (Промо-пулах). Пулы регулируются смарт-контрактами эскроу-сделок, гарантируя возврат средств в случае невыполнения условий организаторами.
              </p>

              <h5 className="font-black text-slate-800 uppercase tracking-wider text-[10px]">4. Ограничение ответственности</h5>
              <p>
                Платформа ИИSMM не несет ответственности за характер публикуемого пользователями контента. Пожалуйста, соблюдайте нормы законодательства Российской Федерации и правила целевых социальных платформ (Telegram, ВК, Одноклассники, Сетка) при генерации текстов нейросетью.
              </p>

              <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-sky-950 text-[10px] font-semibold text-center mt-2">
                ⚡ ИИSMM — Автономия вашего медиа-бизнеса в цифровую эпоху 2026.
              </div>
            </div>

            <div className="p-4 bg-slate-50/50 rounded-b-[24px] border-t flex items-center justify-between gap-4">
              <span className="text-[9px] text-slate-400 font-mono">Обновлено: 26 мая 2026 г.</span>
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-sky-450 hover:opacity-95 text-white font-black text-[10px] uppercase tracking-wider rounded-xl cursor-pointer shadow-sm"
              >
                Согласен с условиями
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 5. Pure Landing Footer on landing page */}
      <footer className="mt-auto py-8 bg-white/45 backdrop-blur-xl text-slate-700 border-t border-white/60 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ShinyLogo height={32} />
            <span className="text-slate-500 font-medium">&copy; 2026 ИИSMM. Все права защищены.</span>
          </div>
          <div className="flex gap-4">
            <span className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer" onClick={() => setActiveTab('prices')}>Тарифы</span>
            <span className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer" onClick={() => setActiveTab('academy')}>Академия</span>
            <span className="text-slate-600 hover:text-slate-950 transition-colors cursor-pointer" onClick={() => setActiveTab('blog')}>Блог новостей</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">Платформа SMM-автопостинга v1.4.1</span>
        </div>
      </footer>

    </div>
  );
}
