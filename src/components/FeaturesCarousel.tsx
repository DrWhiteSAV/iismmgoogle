import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, Send, Sparkles, ShieldCheck, 
  Repeat, Calendar, FileText, Brush, Layers, BarChart3, MessageSquare, Check
} from 'lucide-react';
import { InteractiveFeatureSimulator } from './InteractiveFeatureSimulator';

interface FeatureItem {
  id: number;
  type: 'multiposting' | 'rewrite' | 'escrow' | 'parser' | 'grid' | 'ord' | 'watermark' | 'vp' | 'analytics' | 'bot';
  title: string;
  shortTitle: string;
  badge: string;
  badgeTheme: string;
  badgeColor: string;
  desc: string;
  bullets: string[];
  gradient: string;
  shadowGlow: string;
}

export default function FeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<number | null>(null);

  const features: FeatureItem[] = [
    {
      id: 1,
      type: 'multiposting',
      title: 'Умный Кросспостинг & Планирование в один клик',
      shortTitle: 'Кросспостинг',
      badge: 'Главное Ядро',
      badgeTheme: 'border-orange-200/50 text-orange-950 bg-orange-100/50',
      badgeColor: 'text-orange-500',
      desc: 'Публикуйте посты одновременно во все подключенные каналы и группы — Telegram, ВКонтакте, Одноклассники, Дзен, TenChat, Max и новую деловую соцсеть Сетка. Планировщик автоматически подгонит ссылки и форматирование под каноны каждой платформы.',
      bullets: [
        'Одновременная отправка в 6 сетей',
        'Умная индивидуальная разметка',
        'Автоудаление постов по таймеру',
        'Шаблоны готовых подборок'
      ],
      gradient: 'from-orange-500/10 via-pink-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(251,146,60,0.12)]'
    },
    {
      id: 2,
      type: 'rewrite',
      title: 'Глубокий ИИ-Рерайтер & Копирайтинг от Gemini',
      shortTitle: 'ИИ-Рерайтер',
      badge: 'ИИ-Модели',
      badgeTheme: 'border-pink-200/50 text-pink-700 bg-pink-100/50',
      badgeColor: 'text-pink-500',
      desc: 'Повышайте вовлечение и CTR текстов на 34% с помощью передовых нейросетей. По нашему методу ИИ проанализирует посты ваших конкурентов, сгенерирует вирусные интро по воронке AIDA, вырежет словесный мусор и расставит кликабельные крючки.',
      bullets: [
        'Глубокий рерайт постов в 1 клик',
        'Коррекция под 5 разных Tone of Voice',
        'Встроенный ИИ-Копирайтер LSI',
        'Авто-подбор тематических эмодзи'
      ],
      gradient: 'from-pink-500/10 via-orange-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(244,63,94,0.12)]'
    },
    {
      id: 3,
      type: 'escrow',
      title: 'Безопасная Биржа Рекламы (Escrow-Сделки)',
      shortTitle: 'Эскроу Биржа',
      badge: 'Безопасность',
      badgeTheme: 'border-amber-200/50 text-amber-800 bg-amber-100/50',
      badgeColor: 'text-amber-500',
      desc: 'Монетизируйте свои каналы или закупайте рекламу без риска нарваться на скамеров. Наш автоматический Escrow-выгульщик замораживает средства и выплачивает их исполнителю только после того, как робот зафиксирует 24 или 48 часов удержания поста.',
      bullets: [
        'Депонирование средств в системе',
        'Проверка выхода рекламы ботом',
        'Авто-арбитраж спорных ситуаций',
        'Мгновенная выплата прибыли'
      ],
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)]'
    },
    {
      id: 4,
      type: 'parser',
      title: 'Умный ИИ-Парсер & Авто-Репостинг конкурентов',
      shortTitle: 'ИИ-Парсер',
      badge: 'Автопилот',
      badgeTheme: 'border-sky-200/50 text-sky-800 bg-sky-100/50',
      badgeColor: 'text-sky-500',
      desc: 'Автоматизируйте ведение новостной ленты на 100%. Конфигуратор следит за открытыми Telegram-каналами ваших доноров, фильтрует рекламный мусор, производит авто-рерайт материалов в вашем ключевом стиле и мгновенно отправляет посты.',
      bullets: [
        'Фильтрация стороннего спама',
        'Вырезание рекламных ссылок донора',
        'Замена линков на ваши собственные',
        'Текстовый рерайт на полном автопилоте'
      ],
      gradient: 'from-sky-500/10 via-pink-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(56,189,248,0.12)]'
    },
    {
      id: 5,
      type: 'grid',
      title: 'Интерактивная Сетка & Таймлайн планирования',
      shortTitle: 'Календарь',
      badge: 'Таймлайн',
      badgeTheme: 'border-indigo-200/50 text-indigo-800 bg-indigo-100/50',
      badgeColor: 'text-indigo-500',
      desc: 'Управляйте сотнями публикаций на месяц вперед без путаницы. Красивый Liquid Glass календарь позволяет распределять посты по сетке, выставлять точное время под пики активности аудитории и планировать рекламные интеграции в 2 клика.',
      bullets: [
        'Календарь-сетка за месяц',
        'Подсветка Prime-Time слотов',
        'Удобное перетаскивание контента',
        'Шаблоны расписания под каналы'
      ],
      gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)]'
    },
    {
      id: 6,
      type: 'ord',
      title: 'Автоматическая Маркировка ОРД по закону РФ ФЗ-38',
      shortTitle: 'Маркировка ОРД',
      badge: 'Закон',
      badgeTheme: 'border-rose-200/50 text-rose-800 bg-rose-100/50',
      badgeColor: 'text-rose-500',
      desc: 'Забудьте про юристов и ручную передачу данных. ИИSMM автоматически определяет рекламные интеграции, генерирует erid токен через шлюз ОРД, формирует необходимые футеры к публикациям и высылает корректный отчет по завершению.',
      bullets: [
        'Авто-генерация erid токенов',
        'Соблюдение ФЗ-38 рекламы в РФ',
        'Авто-формирование уставных подписей',
        '1-клик отчетность в реестры'
      ],
      gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(244,63,94,0.12)]'
    },
    {
      id: 7,
      type: 'watermark',
      title: 'Студия Вотермарок & Безопасная зона Stories',
      shortTitle: 'Вотермарки',
      badge: 'Дизайн',
      badgeTheme: 'border-cyan-200/50 text-cyan-800 bg-cyan-100/50',
      badgeColor: 'text-cyan-500',
      desc: 'Брендируйте свои обложки и картинки прямо на лету перед постингом. Встроенный редактор накладывает красивые полупрозрачные водяные знаки вашего паблика, а Story Safe-Area гарантирует, что важные ссылки не перекроет интерфейс Instagram.',
      bullets: [
        'Редактор водяных знаков',
        'Авто-брендирование всех картинок',
        'Story Safe-Area зоны 9:16',
        'Защита креативов от копирования'
      ],
      gradient: 'from-cyan-500/10 via-sky-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)]'
    },
    {
      id: 8,
      type: 'vp',
      title: 'Кампании Взаимного Пиара & Сборы Папок',
      shortTitle: 'Взаимный Пиар',
      badge: 'Продвижение',
      badgeTheme: 'border-fuchsia-200/50 text-fuchsia-800 bg-fuchsia-100/50',
      badgeColor: 'text-fuchsia-500',
      desc: 'Организуйте эффективные совместные пиар-акции для объединения баз активных читателей. ИИSMM позволяет собирать защищенные общие папки рекомендаций — это самый действенный способ получить тысячи живых подписок абсолютно бесплатно.',
      bullets: [
        'Генерация общих промо-папок',
        'Взаимная подписка в 1 клик',
        'Защита участников от недолива',
        'Контроль удержания поста рекламы'
      ],
      gradient: 'from-fuchsia-500/10 via-purple-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(217,70,239,0.12)]'
    },
    {
      id: 9,
      type: 'analytics',
      title: 'Сквозная Маркетинговая UTM-Аналитика & ER',
      shortTitle: 'UTM Аналитика',
      badge: 'Резонанс',
      badgeTheme: 'border-teal-200/50 text-teal-800 bg-teal-100/50',
      badgeColor: 'text-teal-500',
      desc: 'Маркируйте каждую выходящую ссылку встроенным UTM-генератором, чтобы видеть реальное количество переходов и целевых действий. Наш личный кабинет чертит красивые диаграммы активности и вовлеченности (ER) ваших подписчиков.',
      bullets: [
        'Трекинг чистых уников и кликов',
        'Измерение индекса вовлечения (ER)',
        'Сводный график лучших дней недели',
        'Анализ эффективности закупки промо'
      ],
      gradient: 'from-teal-500/10 via-emerald-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(20,184,166,0.12)]'
    },
    {
      id: 10,
      type: 'bot',
      title: 'Мобильный пульт управления в Telegram @iiSmmBot',
      shortTitle: 'Telegram Бот',
      badge: 'Экосистема',
      badgeTheme: 'border-sky-200/50 text-sky-800 bg-sky-100/50',
      badgeColor: 'text-sky-500',
      desc: 'Полнофункциональный личный кабинет прямо в вашем мессенджере. Проверяйте балансы ИИрок, создавайте посты голосовым набором, получайте мгновенные Telegram-отчеты о совершенных авто-публикациях и одобряйте эскроу-сделки с телефона.',
      bullets: [
        'Голосовая диктовка постов с ИИ',
        'Пуш-уведомления об оплатах на ходу',
        'Удаленное управление планировщиком',
        '100% защита ключей шифрованием'
      ],
      gradient: 'from-sky-500/10 via-indigo-500/5 to-transparent',
      shadowGlow: 'hover:shadow-[0_20px_50px_rgba(14,165,233,0.12)]'
    }
  ];

  // Auto-play control loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setSlideDirection('right');
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 16000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeIndex]);

  const handleNext = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleTabClick = (index: number) => {
    setSlideDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  };

  const currentFeature = features[activeIndex];

  // Key visual icon matches
  const renderItemLogo = (type: string, css: string) => {
    switch (type) {
      case 'multiposting': return <Send className={css} />;
      case 'rewrite': return <Sparkles className={css} />;
      case 'escrow': return <ShieldCheck className={css} />;
      case 'parser': return <Repeat className={css} />;
      case 'grid': return <Calendar className={css} />;
      case 'ord': return <FileText className={css} />;
      case 'watermark': return <Brush className={css} />;
      case 'vp': return <Layers className={css} />;
      case 'analytics': return <BarChart3 className={css} />;
      case 'bot': return <MessageSquare className={css} />;
      default: return <Sparkles className={css} />;
    }
  };

  // Slide transition parameters in variants (fade-only transition from darkness/fade, no side-shifting)
  const slideVariants = {
    initial: {
      opacity: 0,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  const [radius, setRadius] = useState(1100);
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setRadius(420);
      } else if (w < 768) {
        setRadius(640);
      } else if (w < 1024) {
        setRadius(940);
      } else {
        setRadius(1200);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="abilities-carousel-container" className="w-full max-w-7xl mx-auto px-1 sm:px-4 mt-8 relative space-y-8 overflow-visible">
      
      {/* 1. Main 3D Carousel Stage */}
      <div id="abilities-3d-stage" className="w-full relative overflow-visible flex items-center justify-center p-2 sm:p-4">
        
        {/* The 3D Carousel container */}
        <div className="icon-cards pb-6 relative overflow-visible">
          <div 
            className="icon-cards__content relative"
            style={{
              transform: `translateZ(-${radius}px) rotateY(${-activeIndex * 36}deg)`,
            }}
          >
            {features.map((item, idx) => {
              const isActive = idx === activeIndex;
              const angle = idx * 36;
              const diff = Math.min(
                Math.abs(idx - activeIndex),
                features.length - Math.abs(idx - activeIndex)
              );
              
              let cardOpacity = 0;
              let scaleVal = 0.82;
              let pointerEventsStyle: 'auto' | 'none' = 'none';
              
              if (diff === 0) {
                cardOpacity = 1;
                scaleVal = 1.0;
                pointerEventsStyle = 'auto';
              } else if (diff === 1) {
                cardOpacity = 0.32;
                scaleVal = 0.85;
                pointerEventsStyle = 'auto'; // clicking neighbor card flips the carousel to it
              } else if (diff === 2) {
                cardOpacity = 0.06;
                scaleVal = 0.72;
              }
              
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (diff === 1) {
                      handleTabClick(idx);
                    }
                  }}
                  className={`icon-cards__item absolute inset-0 rounded-[32px] overflow-hidden border p-5 sm:p-8 flex flex-col justify-between transition-all duration-700 select-none ${
                    isActive 
                      ? 'border-white/90 shadow-[0_20px_60px_rgba(236,72,153,0.18)]' 
                      : 'border-white/20 shadow-none'
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scaleVal})`,
                    background: 'rgba(255, 255, 255, 0.93)',
                    borderColor: isActive ? 'rgba(236,72,153,0.35)' : 'rgba(148, 163, 184, 0.12)',
                    opacity: cardOpacity,
                    pointerEvents: pointerEventsStyle,
                    zIndex: isActive ? 40 : (diff === 1 ? 20 : 10),
                  }}
                >
                  {/* Internal card layout - clean and compact */}
                  <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 items-center">
                    
                    {/* Left details (Title + Description + Bullets) */}
                    <div className="lg:col-span-7 space-y-3 sm:space-y-4 w-full text-left relative z-10 font-sans h-full flex flex-col justify-between">
                      <div className="space-y-3">
                        {/* Top layout */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl sm:text-3.5xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-sky-450 bg-clip-text text-transparent leading-none">
                              {item.id < 10 ? `0${item.id}` : item.id}
                            </span>
                            <span className={`p-1 px-2.5 border text-[8px] uppercase font-bold tracking-widest rounded-full ${item.badgeTheme}`}>
                              {item.badge}
                            </span>
                          </div>
                          
                          {/* Active Pulsing Core Indicator */}
                          {isActive && (
                            <span className="flex items-center gap-1.5 text-[8px] tracking-wider uppercase font-extrabold text-slate-505">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                              Active core
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="text-sm sm:text-base font-black tracking-tight leading-snug text-slate-900 uppercase">
                            {item.title}
                          </h3>
                          <p className="text-slate-650 text-[10px] sm:text-xs leading-relaxed mt-1.5">
                            {item.desc}
                          </p>
                        </div>

                        {/* Checklist */}
                        <ul className="grid grid-cols-2 gap-2 pt-1">
                          {item.bullets.slice(0, 4).map((bullet, k) => (
                            <li key={k} className="flex items-center gap-2 text-slate-700 text-[10px] font-semibold">
                              <span className="p-0.5 rounded-full bg-slate-100 border border-slate-200/50 shrink-0">
                                {renderItemLogo(item.type, `w-3 h-3 ${item.badgeColor}`)}
                              </span>
                              <span className="leading-tight truncate">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom branding line inside card */}
                      <div className="flex items-center justify-between border-t border-slate-100/80 pt-2 shrink-0">
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold font-mono">
                          PLATFORM INTERACTION ZONE
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">
                          ИИSMM v2.0
                        </span>
                      </div>
                    </div>

                    {/* Right Sandbox/Simulator */}
                    <div className="lg:col-span-5 w-full h-full flex flex-col justify-center relative z-10">
                      <div className="bg-slate-50/50 hover:bg-slate-50/90 rounded-2xl border border-slate-200/40 p-3 shadow-inner text-slate-800 relative overflow-hidden flex flex-col h-full justify-center min-h-[170px] sm:min-h-[200px] transition-all">
                        {isActive ? (
                          <InteractiveFeatureSimulator type={item.type} />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center p-4 space-y-3">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shadow-xs">
                              {renderItemLogo(item.type, "w-6 h-6 text-slate-400")}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              НАЖМИТЕ ДЛЯ СИМУЛЯЦИИ
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. 3D Control Center & Jelly Checkbox & Progress Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 bg-white/45 backdrop-blur-xl border border-slate-200/60 p-4 rounded-3xl max-w-lg mx-auto shadow-sm relative z-40">
        
        {/* Navigation buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrev}
            className="p-2 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-500 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer active:scale-97 shadow-xs"
          >
            ◀ Назад
          </button>
          
          <div className="bg-slate-150/80 p-1.5 px-3 rounded-xl text-[10px] font-mono font-black text-slate-650 shadow-inner">
            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / 10
          </div>
          
          <button
            onClick={handleNext}
            className="p-2 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-orange-500 hover:bg-slate-50 transition-all font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer active:scale-97 shadow-xs"
          >
            Далее ▶
          </button>
        </div>

        {/* Dynamic Jelly Checkbox! */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none text-slate-800 hover:text-slate-900 transition-all">
          <input 
            type="checkbox" 
            checked={isPlaying} 
            onChange={() => setIsPlaying(!isPlaying)}
            className="hidden" 
          />
          <div className={`w-[22px] h-[22px] rounded-lg border-2 border-pink-500/80 bg-white flex items-center justify-center transition-all ${isPlaying ? 'bg-gradient-to-r from-orange-400 to-pink-500 border-transparent jelly-animate shadow-md' : 'shadow-inner'}`}>
            {isPlaying && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-[11px] uppercase font-black tracking-widest bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            3D Спин-Тур
          </span>
        </label>
      </div>

      {/* 3. Bottom Slide Dot Indicators */}
      <div className="flex justify-center items-center gap-2 pb-4">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleTabClick(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex 
                ? 'w-8 bg-gradient-to-r from-orange-400 to-pink-500 shadow-xs' 
                : 'w-2.5 bg-slate-200 hover:bg-slate-300'
            }`}
            aria-label={`Перейти к слайду ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
