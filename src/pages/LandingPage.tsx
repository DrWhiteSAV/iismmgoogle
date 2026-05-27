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
import BlogPage from './BlogPage';
import AIPage from './AIPage';

// Reusable Multi-Gradient Tariff Cards layout with precise specs
function TariffCards({ onAction }: { onAction: () => void }) {
  const plans = [
    {
      name: "FREE ТАРИФ",
      price: "0 ₽",
      sub: "Тестовый старт",
      badge: "Базовый",
      features: [
        "Репост - 3 канала бесплатно (+150₽ последующие)",
        "Свои посты с цветными кнопками по расписанию - 3 канала бесплатно (+100₽ последующий канал)",
        "Лимит 10 постов в день",
        "Участие и организация в папках и подборках. 25% комиссия с платных папок и подборок",
        "ИИрки для генерации постов и медиа. 1,000,000 ИИрок каждый месяц бесплатно (+250₽ за 5,000,000 ИИрок)",
        "Участие в Бирже объявлений. 25% комиссия за безопасность и контроль условий",
        "Оповещения в телеграм",
        "Доступ к базовым курсам SMM Академии",
        "Личные блоги на платформе - все посты автоматически доступны для показа на платформе",
        "1,000,000 ИИрок по рефералке тебе и другу"
      ],
      isPopular: false
    },
    {
      name: "PREMIUM ТАРИФ",
      price: "490 ₽ / мес",
      sub: "Рекомендуем для SMM",
      badge: "Популярный",
      features: [
        "Лимит 50 постов в день",
        "Автопостинг с ИИ, ИИ сам генерирует по расписанию",
        "Аналитика канала",
        "Холсты для медиа (Canva) и фирменный стиль постов",
        "Управление кабинетом через телеграм бота",
        "Публикация в ленте сообщества",
        "Доступ к закрытым курсам SMM академии",
        "Метка 💎 в имени участника в ленте и в личном блоге",
        "Личные переписки в директ админам каналов",
        "Подключение своих API ключей для агентов",
        "Личные вотермарки на фото и видео"
      ],
      isPopular: true
    },
    {
      name: "VIP СУПЕРВИЗОР",
      price: "4,900 ₽ / мес",
      sub: "Корпоративный холдинг",
      badge: "Максимум",
      features: [
        "Лимит 500 постов в сутки",
        "ИИ контент план для автопубликаций",
        "ИИ аналитика канала в реальном времени с самообучением",
        "Показ всех постов в блоге сайта",
        "Голосовое и видео управление кабинетом",
        "Доступ к академии через ИИ",
        "Мультиплеер - Управление кабинетом несколькими участниками",
        "Размещение лого с ссылкой на главном лендинге",
        "Рассылки рекламы в директ админам каналов - 5р за сообщение",
        "ИИ групповые чаты агентов - круглый стол ИИ-маркетологов",
        "Доступ к MCP серверу агентов"
      ],
      isPopular: false
    },
    {
      name: "ENTERPRISE",
      price: "Индивидуально",
      sub: "Полный аутсорсинг",
      badge: "VIP Клиент",
      features: [
        "Создание брендбука, стиля, стратегии",
        "Контент план от опытных SMM экспертов",
        "Личное менторство ИИSMM экспертов",
        "Ведение кабинета сотрудниками ИИSMM",
        "Индивидуальные разработки с ИИ-инструментами: сайты, приложения, платформы, маркетплейсы, агенты, боты, срм"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch px-4">
      {plans.map((plan, idx) => (
        <div 
          key={idx} 
          className={`apple-liquid-glass rounded-3xl p-6 border flex flex-col justify-between space-y-5 relative transition-all duration-300 hover:scale-102 ${
            plan.isPopular 
              ? 'border-pink-500/60 shadow-lg ring-1 ring-pink-400 bg-pink-50/10' 
              : 'border-slate-200/60 shadow-sm bg-white/35'
          }`}
        >
          {plan.isPopular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-sky-450 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-sm">
              ХИТ ПРОДАЖ 🔥
            </div>
          )}
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-100/30 p-2 rounded-xl border border-slate-200/10">
              <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider ${
                plan.isPopular ? 'bg-pink-100 text-pink-700' : 'bg-slate-100/80 text-slate-600'
              }`}>
                {plan.badge}
              </span>
              <span className="text-xs font-mono font-extrabold text-slate-800">{plan.price}</span>
            </div>
            
            <div>
              {/* Heading with requested multicolor gradient */}
              <h3 className="text-[13px] font-black tracking-tight text-multicolor-gradient uppercase">
                {plan.name}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">{plan.sub}</p>
            </div>

            <ul className="space-y-1.5 text-[10.5px] text-slate-600 font-semibold pt-2 border-t border-slate-200/55">
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-1.5 leading-normal">
                  <span className="text-sky-500 shrink-0 select-none">✦</span>
                  <span className="text-slate-700 font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Button with requested multicolor gradient */}
          <button 
            onClick={onAction} 
            className="w-full py-3.5 bg-multicolor-gradient hover:opacity-95 text-white font-black text-[10.5px] uppercase rounded-xl tracking-wider shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
          >
            Подключить {plan.name.split(' ')[0]} 🚀
          </button>
        </div>
      ))}
    </div>
  );
}

interface LandingPageProps {
  onLogin: () => void;
  user: UserAccount;
  onUpdateUser: (updated: UserAccount) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

// Global helper to parse markdown bold syntax **bold text** into strong JSX elements
export function renderWithBold(text: string): React.ReactNode {
  if (!text) return '';
  const regex = /\*\*(.*?)\*\*/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-extrabold text-slate-900">
        {match[1]}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

export default function LandingPage({ onLogin, user, onUpdateUser, currentPath, onNavigate }: LandingPageProps) {
  const pathToTab = (path: string): 'abilities' | 'blog' | 'ai_assistants' | 'canvas' | 'prices' | 'projects' | 'academy' | 'market_exchange' => {
    if (path.startsWith('/blog')) return 'blog';
    switch (path) {
      case '/main':
      case '/': return 'abilities';
      case '/blog': return 'blog';
      case '/ai': return 'ai_assistants';
      case '/market-exchange': return 'market_exchange';
      case '/canvas': return 'canvas';
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
      case 'canvas': return '/canvas';
      case 'prices': return '/prices';
      case 'projects': return '/projects';
      case 'academy': return '/academy';
      default: return '/main';
    }
  };

  const activeTab = pathToTab(currentPath);
  
  const setActiveTab = (tab: 'abilities' | 'blog' | 'ai_assistants' | 'canvas' | 'prices' | 'projects' | 'academy' | 'market_exchange') => {
    onNavigate(tabToPath(tab));
  };

  // Interactive states for landing play pieces
  const [phonePreviewText, setPhonePreviewText] = useState('Анонс: Новый запуск ИИSMM в 2026 году!');
  const [selectedPlatform, setSelectedPlatform] = useState<'tg' | 'vk' | 'ok'>('tg');
  const [aiDemoInput, setAiDemoInput] = useState('Топ 3 нейросети для рекламы');
  const [aiDemoResult, setAiDemoResult] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // States for Reviews / Testimonials carousel
  const [reviews, setReviews] = useState([
    { name: "Александр (SMM Sages)", rating: 5, text: "Фантастический софт! Раньше на ведение 3 каналов уходило по 4 часа каждый день, сейчас ИИ сам за полчаса генерирует шикарные посты по расписанию. Вы сэкономили мне море личного времени!" },
    { name: "Мария С.", rating: 5, text: "Очень крутая штука! Free тариф полностью функционален, ИИрки начисляются регулярно. Свои посты улетают в телеграмм пулей!" },
    { name: "Семён Т. (@semen_smm)", rating: 5, text: "VIP супервизор — это просто бомба. Круглый стол ИИ-копирайтеров спорит между собой и находит гениальные идеи для креативов! Мультиплеер работает шикарно." },
    { name: "Анна Ковалева", rating: 5, text: "Курсы в Академии безумно полезные, а метка 💎 в Ленте привлекает огромное количество новых лидов. Окупила подписку Premium за 3 дня!" },
    { name: "Dmitry Dev", rating: 5, text: "Настроил автопостинг и подключил свой API ключ — полет идеальный. Рад, что нашел такой классный сервис. Однозначно 5 звезд!" }
  ]);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Testimonial submission form modal states (No registration required)
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalRating, setModalRating] = useState(5);
  const [modalAvatar, setModalAvatar] = useState('👤');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalText.trim()) {
      alert('Пожалуйста, напишите текст отзыва!');
      return;
    }
    const safeName = modalName.trim() || 'Аноним';
    const newRev = {
      name: safeName,
      rating: modalRating,
      text: modalText
    };
    setReviews(prev => [...prev, newRev]);
    alert('🎉 Спасибо! Ваш отзыв успешно отправлен и будет опубликован на платформе!');
    // Clear and close
    setModalName('');
    setModalText('');
    setModalRating(5);
    setModalAvatar('👤');
    setShowReviewModal(false);
    // Focus on the newly added review
    setActiveReviewIdx(reviews.length);
  };

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

  // Nav labels matching the 7 informational pages (compact)
  const tabs = [
    { key: 'abilities', label: 'Возможности', icon: <Radio className="w-3.5 h-3.5" /> },
    { key: 'blog', label: 'Наш Блог', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { key: 'ai_assistants', label: 'AI Ассистенты', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: 'market_exchange', label: 'ИИ Биржа 🛡', icon: <ShoppingBag className="w-3.5 h-3.5 text-rose-500" /> },
    { key: 'canvas', label: 'Холст 🎨', icon: <Brush className="w-3.5 h-3.5" /> },
    { key: 'prices', label: 'Тарифы', icon: <Trophy className="w-3.5 h-3.5" /> },
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
              Войти 👤
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
                          className="px-6 py-3.5 text-white font-black text-[11px] uppercase tracking-wide rounded-2xl shadow-xl hover:scale-103 hover:shadow-2xl transition-all border border-white/40 cursor-pointer"
                          style={{ background: 'linear-gradient(90deg, #38bdf8 0%, #ec4899 25%, #f97316 50%, #ec4899 75%, #38bdf8 100%)' }}
                        >
                          Попробовать Бесплатно через TG 🚀
                        </button>
                        <button 
                          onClick={() => setActiveTab('prices')}
                          className="px-6 py-3.5 text-white font-black text-[11px] uppercase tracking-wide rounded-2xl shadow-xl hover:scale-103 hover:shadow-2xl transition-all border border-white/40 cursor-pointer"
                          style={{ background: 'linear-gradient(90deg, #38bdf8 0%, #ec4899 25%, #f97316 50%, #ec4899 75%, #38bdf8 100%)' }}
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

                {/* ADVANTAGES — ПРЕИМУЩЕСТВА СЕКЦИЯ */}
                <div id="advantages-section" className="pt-20 space-y-8 max-w-7xl mx-auto px-4">
                  <div className="text-center max-w-xl mx-auto space-y-3">
                    <span className="px-3 py-1 bg-sky-100 text-sky-850 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-200">БЕЗУПРЕЧНОЕ КАЧЕСТВО</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-header uppercase">Преимущества работы с ИИSMM</h2>
                    <p className="text-slate-500 text-xs sm:text-xs">Наши ключевые ценности и инновационные преимущества, которые выводят ваш бизнес в топ.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                    {[
                      {
                        title: "Работа без VPN и Лимитов 🌐",
                        desc: "Прямой доступ ко всем ИИ-генераторам и API со скоростью света. Не нужно регистрировать зарубежные аккаунты или держать включенным прокси.",
                        iconColor: "from-sky-450 to-blue-500",
                        accentBg: "bg-sky-50/50"
                      },
                      {
                        title: "Многозадачные AI-Ассистенты 🤖",
                        desc: "20+ специализированных ИИ-агентов. Они знают формулу AIDA, умеют шутить, пишут яркие прогревы, сценарии и анализируют тренды.",
                        iconColor: "from-pink-500 to-rose-500",
                        accentBg: "bg-pink-50/40"
                      },
                      {
                        title: "Безопасная Сделка Escrow 🛡",
                        desc: "Наша биржа рекламы полностью защищает средства рекламодателей и блогеров. Выплата происходит только после автоматической проверки публикации.",
                        iconColor: "from-orange-400 to-amber-500",
                        accentBg: "bg-orange-50/50"
                      },
                      {
                        title: "ИИ Автопланирование 📡",
                        desc: "Умное авторасписание самостоятельно определяет время публикации для получения пикового охвата. Вы отдыхаете — автоматика работает за вас.",
                        iconColor: "from-purple-500 to-indigo-600",
                        accentBg: "bg-purple-50/40"
                      }
                    ].map((adv, aIdx) => (
                      <div key={aIdx} className={`p-6 rounded-3xl border border-white/50 backdrop-blur-md shadow-xxs ${adv.accentBg} flex flex-col justify-start space-y-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xs`}>
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${adv.iconColor} p-0.5 flex items-center justify-center text-white text-lg font-bold shadow-sm`}>
                          ✦
                        </div>
                        <h4 className="font-extrabold text-slate-800 text-xs sm:text-xs leading-snug">{adv.title}</h4>
                        <p className="text-slate-500 text-[10.5px] leading-relaxed font-medium">{adv.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TARIFFS SECTION ON MAIN PAGE */}
                <div id="main-tariffs-section" className="pt-24 space-y-8 max-w-7xl mx-auto">
                  <div className="text-center max-w-xl mx-auto space-y-3 px-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest font-mono">ГИБКИЙ ВЫБОР</span>
                    {/* Headings with multicolor gradient */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-multicolor-gradient uppercase">Наши тарифные планы</h2>
                    <p className="text-slate-500 text-xs">Выберите подходящий уровень мощности. Переключайте тарифы в личном кабинете в любое время.</p>
                  </div>

                  <TariffCards onAction={() => setShowTelegramModal(true)} />
                </div>

                {/* REVIEWS TESTIMONIAL CAROUSEL */}
                <div id="reviews-carousel-section" className="pt-24 pb-12 max-w-4xl mx-auto px-4 space-y-8">
                  <div className="text-center max-w-md mx-auto space-y-3">
                    <span className="px-3 py-1 bg-pink-100 text-pink-850 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-200">ОТЗЫВЫ КЛИЕНТОВ</span>
                    {/* Headings with multicolor gradient */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-multicolor-gradient uppercase">Что говорят SMM эксперты</h2>
                    <p className="text-slate-500 text-xs">Мнения профессиональных блогеров, маркетологов и авторов каналов о платформе ИИSMM.</p>
                  </div>

                  {/* Active carousel card */}
                  <div className="apple-liquid-glass p-8 rounded-3xl border border-slate-200/50 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-400 via-pink-500 to-orange-400 p-0.5 shrink-0 flex items-center justify-center text-white text-3xl font-bold shadow-md animate-float">
                      💬
                    </div>
                    <div className="space-y-3 flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1">
                        {Array.from({ length: reviews[activeReviewIdx].rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-4 h-4 text-orange-400 fill-orange-400 shrink-0" />
                        ))}
                      </div>
                      <p className="text-slate-700 font-medium text-xs sm:text-xs leading-relaxed italic">
                        "{reviews[activeReviewIdx].text}"
                      </p>
                      <h4 className="font-black text-slate-800 text-xs sm:text-xs tracking-tight uppercase">
                        {reviews[activeReviewIdx].name}
                      </h4>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/40 border border-slate-200/20 px-6 py-4 rounded-3xl">
                    <div className="flex gap-1.5 justify-center">
                      {reviews.map((_, dotIdx) => (
                        <button 
                          key={dotIdx} 
                          onClick={() => setActiveReviewIdx(dotIdx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-slate-300/40 cursor-pointer ${
                            dotIdx === activeReviewIdx ? 'bg-pink-500 w-6' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Button with multicolor gradient */}
                    <button 
                      onClick={() => setShowReviewModal(true)}
                      className="px-5 py-2.5 bg-multicolor-gradient hover:opacity-95 text-white text-[10.5px] uppercase font-black tracking-wider rounded-xl shadow-md border border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                    >
                      Оставить отзыв ✍️
                    </button>
                  </div>
                </div>

                {/* POPUP MODAL FOR LEAVING REVIEWS (Anonymous & No register needed) */}
                <AnimatePresence>
                  {showReviewModal && (
                    <div className="fixed inset-0 z-55 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="apple-liquid-glass-heavy max-w-md w-full rounded-2xl p-6 border border-white/60 shadow-2xl relative space-y-4"
                      >
                        <button 
                          onClick={() => setShowReviewModal(false)}
                          className="absolute right-4 top-4 w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold transition-all border border-slate-200/50 cursor-pointer text-xs"
                        >
                          ✕
                        </button>

                        <div className="space-y-1.5">
                          {/* Heading with requested multicolor gradient */}
                          <h3 className="text-sm font-black text-multicolor-gradient uppercase tracking-tight">Оставить отзыв без регистрации</h3>
                          <p className="text-slate-500 text-[10.5px] font-medium leading-relaxed">Поделитесь вашим мнением о платформе ИИSMM. Ваше имя и текст будут видны моментально без какой-либо авторизации.</p>
                        </div>

                        <form onSubmit={handleReviewSubmit} className="space-y-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">Имя / Никнейм в Telegram:</label>
                            <input 
                              type="text"
                              value={modalName}
                              onChange={(e) => setModalName(e.target.value)}
                              placeholder="Например: Александр (@alex_smm)"
                              className="w-full text-xs p-3 bg-white/75 border border-slate-200/80 rounded-xl focus:ring-1 focus:ring-pink-500 focus:outline-none focus:border-pink-500/80 shadow-xxs font-medium"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Оценка (Звезды):</label>
                              <select 
                                value={modalRating} 
                                onChange={(e) => setModalRating(Number(e.target.value))}
                                className="w-full text-xs p-3 bg-white/75 border border-slate-200/80 rounded-xl focus:ring-1 focus:ring-pink-500 focus:outline-none font-bold text-orange-500 cursor-pointer shadow-xxs"
                              >
                                <option value="5" className="text-orange-500">⭐️⭐️⭐️⭐️⭐️ (5/5)</option>
                                <option value="4" className="text-orange-500">⭐️⭐️⭐️⭐️ (4/5)</option>
                                <option value="3" className="text-orange-500">⭐️⭐️⭐️ (3/5)</option>
                                <option value="2" className="text-orange-500">⭐️⭐️ (2/5)</option>
                                <option value="1" className="text-orange-500">⭐️ (1/5)</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider block">Аватар Эмодзи:</label>
                              <select 
                                value={modalAvatar} 
                                onChange={(e) => setModalAvatar(e.target.value)}
                                className="w-full text-xs p-3 bg-white/75 border border-slate-200/80 rounded-xl focus:ring-1 focus:ring-pink-500 focus:outline-none font-bold text-slate-700 cursor-pointer shadow-xxs"
                              >
                                <option value="👤">👤 Эксперт</option>
                                <option value="🤖">🤖 ИИ Агент</option>
                                <option value="💼">💼 Бизнесмен</option>
                                <option value="🚀">🚀 Маркетолог</option>
                                <option value="✨">✨ Блогер</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-wider">Текст вашего отзыва:</label>
                            <textarea 
                              rows={3}
                              value={modalText}
                              onChange={(e) => setModalText(e.target.value)}
                              placeholder="Пожалуйста, расскажите об опыте запуска постов, работы с ИИ-агентами или биржей сделок..."
                              className="w-full text-xs p-3 bg-white/75 border border-slate-200/80 rounded-xl focus:ring-1 focus:ring-pink-500 focus:outline-none focus:border-pink-500/80 shadow-xxs font-medium"
                              maxLength={350}
                              required
                            />
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-3 bg-multicolor-gradient hover:opacity-95 text-white font-black text-[11px] uppercase rounded-xl tracking-wider shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                          >
                            Опубликовать отзыв 🚀
                          </button>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
            </>
          )}

          {/* INFORMATIVE SECTION 2: НАШ БЛОГ */}
            {activeTab === 'blog' && (
              <BlogPage 
                currentPath={currentPath}
                onNavigate={onNavigate}
                onLogin={onLogin}
                isLoggedIn={false}
              />
            )}

            {/* INFORMATIVE SECTION 3: AI АССИСТЕНТЫ */}
            {activeTab === 'ai_assistants' && (
              <AIPage />
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
                    Автоматизированная биржа с эскроу-гарантом <a href="https://t.me/iismmAIbot" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline font-semibold">@iismmAIbot</a>: бот сам находит посты на площадках, проверяет удержание в топе 24/48 часов и мгновенно выплачивает деньги.
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
                    <h4 className="font-extrabold text-slate-800 text-sm">
                      Авто-контроль <a href="https://t.me/iismmAIbot" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline">@iismmAIbot</a>
                    </h4>
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
                        <label className="block text-slate-600 font-bold uppercase text-[9px]">Название рекламного канала:</label>
                        <input
                          type="text"
                          value={simName}
                          onChange={(e) => setSimName(e.target.value)}
                          className="w-full bg-white/80 border border-slate-200/80 p-2.5 rounded-xl text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="block text-slate-600 font-bold uppercase text-[9px]">Цена за пост (₽):</label>
                          <input
                            type="number"
                            value={simPrice}
                            onChange={(e) => setSimPrice(e.target.value)}
                            className="w-full bg-white/80 border border-slate-200/80 p-2.5 rounded-xl text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-600 font-bold uppercase text-[9px]">Средний охват:</label>
                          <input
                            type="number"
                            value={simViews}
                            onChange={(e) => setSimViews(Number(e.target.value))}
                            className="w-full bg-white/80 border border-slate-200/80 p-2.5 rounded-xl text-xs"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-black text-[10px] rounded-xl uppercase shadow-xs cursor-pointer flex items-center justify-center gap-1 transition-all"
                      >
                        Подать объявление 🚀
                      </button>
                    </form>

                    <AnimatePresence>
                      {simSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="p-3 bg-orange-50/80 rounded-xl border border-orange-200/50 text-xs text-orange-950 space-y-1"
                        >
                          <p className="font-bold flex items-center gap-1">
                            <span>🎉</span> Канал добавлен на Биржу!
                          </p>
                          <p className="text-[10px] text-slate-550 leading-snug">
                            Канал {"\"" + simName + "\""} успешно добавлен в каталог предложений платформы.
                          </p>
                          <button
                            type="button"
                            onClick={() => setSimSubmitted(false)}
                            className="text-[10px] text-pink-600 font-bold underline cursor-pointer"
                          >
                            Изменить данные
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
                          className="w-full py-2.5 bg-gradient-to-r from-orange-400 to-pink-500 hover:scale-101 text-white font-black text-[10px] rounded-xl uppercase shadow-xs cursor-pointer flex items-center justify-center gap-1 transition-all"
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

            {/* INFORMATIVE SECTION 9: ТАРИФЫ */}
            {activeTab === 'prices' && (
              <div className="space-y-8 py-4">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest font-mono">ПРОЗРАЧНАЯ ОПЛАТА</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient-header uppercase">Интеллектуальные тарифные планы ИИSMM</h2>
                  <p className="text-slate-500 text-xs">Выберите подходящую мощность для ваших соцсетей. Активация доступна за рубли или внутреннюю валюту (ИИрки).</p>
                </div>

                <TariffCards onAction={() => setShowTelegramModal(true)} />
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
            {renderWithBold("Мы начислим вам стартовые **1,000,000 ИИрок (токенов)** и подключим до 3 каналов на Free-тарифе абсолютно бесплатно без привязки карт!")}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-[2px]">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="w-full max-w-sm apple-liquid-glass-heavy rounded-[28px] overflow-hidden shadow-2xl border border-white/60 p-1 bg-white/70 backdrop-blur-md"
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
                  <span className="text-[10px] text-orange-50/90 block mt-1 font-mono">
                    <a href="https://t.me/iismmAIbot" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">@iismmAIbot</a> Secure Auth
                  </span>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent backdrop-blur-[2px]">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-lg apple-liquid-glass-heavy rounded-[28px] overflow-hidden shadow-2xl border border-white/60 p-1 bg-white/80 backdrop-blur-md"
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
                Использование интеллектуальной платформы автоматического постинга и комбайна ИИSMM API регулируется данным соглашением. Подключая свой аккаунт через Telegram-бот <strong><a href="https://t.me/iismmAIbot" target="_blank" rel="noopener noreferrer" className="text-pink-650 hover:underline">@iismmAIbot</a></strong>, вы получаете доступ к автономному облачному генератору контента, планировщику, рерайтеру ссылок и внутреннему кошельку ИИрок.
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
