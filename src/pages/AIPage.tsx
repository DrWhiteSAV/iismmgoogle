import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Check, Send, ArrowRight, ArrowLeft, RefreshCw, Mic, MicOff, Star, 
  Search, MessageSquare, Filter, ChevronRight, ChevronLeft, X, Play, Pause, HelpCircle,
  Bold, Italic, Link, List, Quote, Code, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlatformNetworkCloud } from '../components/PlatformNetworkCloud';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AIAgent {
  id: string;
  title: string;
  desc: string;
  tag: string;
  btnText: string;
  avatarEmoji: string;
  gradient: string;
  welcomeMessage: string;
  systemPrompt: string;
  interactiveChat: { user: string; assistant: string };
}

// Interactive chat typing simulation utility
function InteractiveChatPreview({ 
  userText, 
  assistantText, 
  isActive 
}: { 
  userText: string; 
  assistantText: string; 
  isActive: boolean;
}) {
  const [userLength, setUserLength] = useState(0);
  const [assistantLength, setAssistantLength] = useState(0);
  const [isTypingAssistant, setIsTypingAssistant] = useState(false);

  // Parse text into structured characters to correctly retain complex emojis
  const userChars = React.useMemo(() => Array.from(userText), [userText]);
  const assistantChars = React.useMemo(() => Array.from(assistantText), [assistantText]);

  useEffect(() => {
    if (!isActive) {
      setUserLength(userChars.length);
      setAssistantLength(assistantChars.length);
      setIsTypingAssistant(false);
      return;
    }

    // Reset layout indices
    setUserLength(0);
    setAssistantLength(0);
    setIsTypingAssistant(false);

    let userTimer: number;
    let assistantTimer: number;
    let delay1: number;
    let delay2: number;
    let loopTimer: number;

    const runSequence = () => {
      let currentLength = 0;
      setUserLength(0);
      setAssistantLength(0);
      setIsTypingAssistant(false);

      const typeUser = () => {
        userTimer = window.setTimeout(() => {
          if (currentLength < userChars.length) {
            currentLength++;
            setUserLength(currentLength);
            typeUser();
          } else {
            // User done typing. Wait 850ms, then show typing dots indicator
            delay1 = window.setTimeout(() => {
              setIsTypingAssistant(true);
              // Show typing anim dots for 1200ms
              delay2 = window.setTimeout(() => {
                setIsTypingAssistant(false);
                
                let currentAssistantLength = 0;
                const typeAssistant = () => {
                  assistantTimer = window.setTimeout(() => {
                    if (currentAssistantLength < assistantChars.length) {
                      currentAssistantLength++;
                      setAssistantLength(currentAssistantLength);
                      typeAssistant();
                    } else {
                      // Assistant done typing. Keep showing text for 6 seconds and then restart
                      loopTimer = window.setTimeout(() => {
                        runSequence();
                      }, 6000);
                    }
                  }, 25);
                };
                typeAssistant();
              }, 1200);
            }, 850);
          }
        }, 35);
      };

      typeUser();
    };

    runSequence();

    return () => {
      clearTimeout(userTimer);
      clearTimeout(assistantTimer);
      clearTimeout(delay1);
      clearTimeout(delay2);
      clearTimeout(loopTimer);
    };
  }, [isActive, userChars, assistantChars]);

  const displayedUser = userChars.slice(0, userLength).join('');
  const displayedAssistant = assistantChars.slice(0, assistantLength).join('');

  return (
    <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-200/30 text-[9px] space-y-1.5 font-sans overflow-y-auto no-scrollbar h-[142px] flex flex-col justify-between scrollbar-none">
      <div className="flex items-center gap-1.5 border-b border-slate-250/20 pb-1 text-[8.5px] text-slate-400 font-bold uppercase tracking-wide">
        <span className="animate-pulse">💬</span>
        <span>Как это работает</span>
      </div>
      <div className="space-y-1.5 flex-1 flex flex-col justify-end">
        {/* User Bubble */}
        {displayedUser && (
          <div className="flex flex-col items-end">
            <div className="bg-amber-100/70 text-amber-950 px-2.5 py-1.5 rounded-2xl rounded-tr-xs w-full font-medium leading-normal shadow-xxs whitespace-pre-line break-words">
              {displayedUser}
            </div>
          </div>
        )}

        {/* Assistant Typing Bubble */}
        {isTypingAssistant && (
          <div className="flex flex-col items-start mt-1">
            <div className="bg-white text-slate-500 px-3 py-1.5 rounded-2xl rounded-tl-xs border border-slate-200/50 shadow-xxs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {displayedAssistant && (
          <div className="flex flex-col items-start mt-1">
            <div className="bg-white text-slate-800 px-2.5 py-1.5 rounded-2xl rounded-tl-xs w-full border border-slate-200/50 shadow-xxs leading-normal whitespace-pre-line break-words">
              {displayedAssistant}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 3D Carousel component for AI agents with dynamic layout step sizes and minimized dragging influence
function AIAgent3DCarousel({
  agents,
  openAgentChat,
}: {
  agents: AIAgent[];
  openAgentChat: (agent: AIAgent) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Responsive radius calculation and mobile state for the 3D orbit
  const [radius, setRadius] = useState(650);
  const [isMobile, setIsMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 480);
      if (w < 485) {
        setRadius(435);
      } else if (w < 768) {
        setRadius(480);
      } else if (w < 1024) {
        setRadius(580);
      } else {
        setRadius(700);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth, hover-pausable autoplay timing loop with progress bar
  useEffect(() => {
    let intervalId: number;
    const AUTO_PLAY_DURATION = 10000; // 10 seconds per slide
    const PROGRESS_STEP_MS = 40; // update progress every 40ms

    if (isPlaying && agents.length > 1) {
      const startTime = Date.now();
      intervalId = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
        setProgress(pct);
        
        if (pct >= 100) {
          setActiveIndex((prev) => (prev + 1) % agents.length);
          setProgress(0);
        }
      }, PROGRESS_STEP_MS);
    } else {
      setProgress(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, activeIndex, agents.length]);

  const handleNext = () => {
    if (agents.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % agents.length);
  };

  const handlePrev = () => {
    if (agents.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? agents.length - 1 : prev - 1));
  };

  const swipeStartX = useRef<number | null>(null);
  const swipeEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeEndX.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    swipeEndX.current = e.touches[0].clientX;
    if (swipeStartX.current !== null) {
      setDragOffset(e.touches[0].clientX - swipeStartX.current);
    }
  };

  const handleTouchEnd = () => {
    if (swipeStartX.current === null || swipeEndX.current === null) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    const diff = swipeStartX.current - swipeEndX.current;
    const minDistance = 50; // in pixels
    if (diff > minDistance) {
      handleNext();
    } else if (diff < -minDistance) {
      handlePrev();
    }
    swipeStartX.current = null;
    swipeEndX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    swipeStartX.current = e.clientX;
    swipeEndX.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (swipeStartX.current !== null) {
      swipeEndX.current = e.clientX;
      setDragOffset(e.clientX - swipeStartX.current);
    }
  };

  const handleMouseUp = () => {
    if (swipeStartX.current === null || swipeEndX.current === null) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    const diff = swipeStartX.current - swipeEndX.current;
    const minDistance = 50; // in pixels
    if (diff > minDistance) {
      handleNext();
    } else if (diff < -minDistance) {
      handlePrev();
    }
    swipeStartX.current = null;
    swipeEndX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  if (agents.length === 0) {
    return (
      <div className="w-full text-center py-12 bg-white/50 border border-slate-200/40 rounded-3xl max-w-lg mx-auto">
        <span className="text-3xl block">🔍</span>
        <p className="text-xs text-slate-500 mt-2 font-bold uppercase">Ничего не найдено</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Попробуйте ввести другой поисковый запрос</p>
      </div>
    );
  }

  // Calculate dynamic angle step matching the quantity of filtered items
  const angleStep = 360 / Math.max(agents.length, 1);

  return (
    <div 
      className="relative w-full py-8 select-none overflow-visible flex flex-col items-center group/global3d cursor-grab active:cursor-grabbing"
      onMouseLeave={() => {
        handleMouseUp();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Floating Left Navigation button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-[3%] sm:left-[8%] lg:left-[15%] xl:left-[22%] top-[190px] z-40 w-11 h-11 rounded-full bg-white/95 border border-slate-200 text-slate-700 hover:text-pink-650 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer select-none"
        aria-label="Назад"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Floating Right Navigation button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-[3%] sm:right-[8%] lg:right-[15%] xl:right-[22%] top-[190px] z-40 w-11 h-11 rounded-full bg-white/95 border border-slate-200 text-slate-700 hover:text-pink-650 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer select-none"
        aria-label="Вперед"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 3D stage viewport wrapper */}
      <div 
        className="relative overflow-visible flex items-center justify-center w-[270px] sm:w-[310px] h-[465px]" 
        style={{ perspective: '1600px' }}
      >
        <div 
          className="absolute inset-0 transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(${-activeIndex * angleStep}deg)`,
            width: '100%',
            height: '100%',
          }}
        >
          {agents.map((agent, idx) => {
            const isActive = idx === activeIndex;
            const angle = idx * angleStep;
            const diff = Math.min(
              Math.abs(idx - activeIndex),
              agents.length - Math.abs(idx - activeIndex)
            );

            let cardOpacity = 0;
            let scaleVal = 0.82;
            let pointerEventsStyle: 'auto' | 'none' = 'none';

            if (diff === 0) {
              cardOpacity = 1;
              scaleVal = 1.0;
              pointerEventsStyle = 'auto';
            } else if (diff === 1 || agents.length === 2) {
              cardOpacity = isMobile ? 0.20 : 0.45;
              scaleVal = isMobile ? 0.64 : 0.86;
              pointerEventsStyle = 'auto';
            } else if (diff === 2) {
              cardOpacity = 0.08;
              scaleVal = 0.74;
            }

            // Halved dragging response amplitude
            const dragX = isActive ? dragOffset * 0.5 : 0;
            const dragRotate = isActive ? dragOffset * 0.02 : 0;
            const transitionStyle = (isActive && isDragging)
              ? 'opacity 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease'
              : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease';

            const handleCardClick = (e: React.MouseEvent) => {
              if (isActive) {
                // Clicking custom active buttons continues naturally
              } else if (diff === 1 || agents.length === 2) {
                e.stopPropagation();
                setActiveIndex(idx);
              }
            };

              return (
                <div
                  key={agent.id}
                  onClick={handleCardClick}
                  className={`absolute inset-0 w-full h-[450px] rounded-[32px] bg-white/95 border p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                    isActive 
                      ? 'border-pink-200/90 shadow-[0_20px_60px_rgba(236,72,153,0.14)] z-30' 
                      : 'border-slate-100 shadow-none z-10'
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${isActive ? radius : radius - 140}px) scale(${scaleVal}) translateX(${dragX}px) rotate(${dragRotate}deg)`,
                    backfaceVisibility: 'hidden',
                    opacity: cardOpacity,
                    visibility: diff > 1 ? 'hidden' : 'visible',
                    pointerEvents: pointerEventsStyle,
                    zIndex: isActive ? 40 : (diff === 1 ? 20 : 10),
                    transition: transitionStyle,
                  }}
                >
                {/* Glow layer */}
                <div className={`absolute top-[-40px] right-[-40px] w-32 h-32 bg-gradient-to-br ${agent.gradient} opacity-20 rounded-full blur-2xl pointer-events-none`} />

                <div className="space-y-3.5">
                  {/* Agent Icon, Badge & Brand Header */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 bg-gradient-to-br ${agent.gradient} rounded-2xl flex items-center justify-center text-lg shadow-sm text-white`}>
                      {agent.avatarEmoji}
                    </div>
                    {isActive ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(!isPlaying);
                        }}
                        className="relative overflow-hidden px-3.5 py-1.5 bg-gradient-to-r from-sky-400 to-pink-500 border border-white/40 rounded-full text-[9px] font-black uppercase tracking-wider text-white shadow-md cursor-pointer hover:scale-102 active:scale-98 transition-all pointer-events-auto select-none"
                      >
                        {/* Orange filling background */}
                        {isPlaying && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-amber-500 pointer-events-none"
                            style={{ 
                              width: `${progress}%`,
                              transition: 'width 40ms linear'
                            }}
                          />
                        )}
                        
                        <span className="relative z-10 flex items-center gap-1.5">
                          {isPlaying ? (
                            <>
                              <Pause className="w-2.5 h-2.5 text-white fill-white shrink-0" />
                              <span>Пауза</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-2.5 h-2.5 text-white fill-white shrink-0 animate-pulse" />
                              <span>Запуск</span>
                            </>
                          )}
                        </span>
                      </button>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg text-[8.5px] font-black uppercase font-mono tracking-wider border border-slate-200/40">
                        ИИ Агент
                      </span>
                    )}
                  </div>

                  {/* Agent text blocks */}
                  <div className="space-y-1 my-1.5 min-h-[50px] flex-grow">
                    <h3 className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                      {agent.title}
                    </h3>
                    <p className="text-[10.5px] text-slate-500 leading-normal font-medium whitespace-normal">
                      {agent.desc}
                    </p>
                  </div>

                  {/* Interactive dialogue preview box */}
                  <InteractiveChatPreview 
                    userText={agent.interactiveChat.user} 
                    assistantText={agent.interactiveChat.assistant} 
                    isActive={isActive} 
                  />
                </div>

                {/* Footer buttons */}
                <div className="pt-3 border-t border-slate-100/50 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAgentChat(agent);
                    }}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-orange-400 to-pink-550 hover:from-orange-500 hover:to-pink-650 text-white text-[9.5px] uppercase font-black tracking-wide rounded-xl shadow-xs hover:shadow-sm hover:scale-102 transition-all cursor-pointer flex items-center gap-0.5"
                  >
                    <span>Запустить</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sync navigation indicator dots */}
      <div className="flex justify-center items-center gap-1.5 mt-4 z-40 relative">
        {agents.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex 
                ? 'w-4 bg-gradient-to-r from-orange-400 to-pink-500' 
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
            aria-label={`Слайд ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AIPage() {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Voice recording standard states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<any | null>(null);
  const [voiceTextSimulated, setVoiceTextSimulated] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Textarea selection formatting states
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarCoords, setToolbarCoords] = useState({ top: 0, left: 0 });
  const [markdownLinkText, setMarkdownLinkText] = useState('');
  const [markdownLinkUrl, setMarkdownLinkUrl] = useState('');
  const [showLinkFields, setShowLinkFields] = useState(false);

  // Auto-resize input text area
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  const agents: AIAgent[] = [
    {
      id: "ideal_post",
      title: "Напишите лучший пост с помощью AI",
      desc: "Забудьте о творческом ступоре! AI-ассистент учитывает тренды и популярность запросов в вашей тематике, чтобы написать качественный пост. Вы можете дополнительно задать тон и стиль текста. Например: веселый и вовлекающий. Попробуйте поэкспериментировать с этой настройкой, порой можно получить очень неожиданные результаты. А еще он умеет писать посты по формуле, например, AIDA.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "📝",
      gradient: "from-orange-400 to-pink-500",
      welcomeMessage: "Привет! Я твой ИИ-копирайтер. Расскажи мне тему, и я сразу напишу идеальный, вовлекающий пост по формуле (например, AIDA) с яркими эмодзи! Какая тематика у нас сегодня?",
      systemPrompt: "Ты — профессиональный ИИ-копирайтер. Твоя специализация — создание вовлекающих и конвертящих постов. Ты отлично знаком с маркетинговыми формулами вроде AIDA, PAS и умеешь подбирать тон текста (веселый, авторитетный, интригующий). Пиши готовые шикарные посты по запросу.",
      interactiveChat: {
        user: "Напиши пост по AIDA про фитнес-трекер",
        assistant: "💪 Хватит считать шаги в уме!\n\n🆕 Новый фитнес-трекер SAV Active измеряет пульс и уровень стресса в реальном времени.\n\n✨ Представь, как ты достигаешь целей быстрее благодаря рекомендациям.\n\n👉 Заказывай со скидкой 20% по ссылке!"
      }
    },
    {
      id: "rewrite_text",
      title: "Перепишите текст легко и быстро",
      desc: "Иногда бывает сложно придумать новые формулировки или внести изменения в уже существующие материалы. Наш AI-ассистент способен переписать тексты, сохраняя основную суть и стиль, но придавая им новую свежесть и уникальность.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🔄",
      gradient: "from-sky-450 to-indigo-500",
      welcomeMessage: "Привет! Скидывай любой текст, статью или пост конкурента, и я мгновенно перепишу его, добавив оригинальной свежести и пользы без потери главного смысла!",
      systemPrompt: "Ты — эксперт по глубокому рерайтингу текстов. Сохраняй ключевую суть, но полностью изменяй структуру предложений, подбирай яркие синонимы, убирай канцеляризмы и делай текст живым и профессиональным.",
      interactiveChat: {
        user: "Перепиши: Наш салон красоты делает маникюр в центре города.",
        assistant: "💅 Секрет идеальных рук раскрыт! В самом центре города открылся уютный бьюти-остров. Забегайте к нам на чашечку кофе и премиальный маникюр, который держится неделями!"
      }
    },
    {
      id: "content_plan",
      title: "Создайте контент-план, который работает",
      desc: "Не знаете, как организовать свою контент-стратегию? AI-ассистент поможет разработать подробный контент-план для вашего проекта. Учтет все важные факторы: желаемое количество постов и дни публикации, подскажет актуальные темы постов для вашей аудитории и адаптирует идеи под публичные праздники.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "📅",
      gradient: "from-emerald-400 to-teal-600",
      welcomeMessage: "Привет! Назови мне свою нишу, регулярность публикаций, и я подготовлю подробный, рабочий контент-план со сбалансированным соотношением пользы и продаж!",
      systemPrompt: "Ты — опытный SMM-стратег. Создавай структурированные контент-планы с темами, кратким содержанием, хэштегами и типами постов (развлечения, польза, продажа), учитывая инфоповоды.",
      interactiveChat: {
        user: "Нужен контент-план для кофейни на 3 дня",
        assistant: "📅 День 1: Как отличить арабику от робусты?\n📅 День 2: Stories-игра: гадаем на кофейной гуще 🔮\n📅 День 3: Акция: Кофе + круассан за полцены!"
      }
    },
    {
      id: "chat_assistant",
      title: "Чат с AI-ассистентом",
      desc: "Получайте ответы на свои вопросы и решайте задачи в одном месте. Наш AI-ассистент поможет провести экспресс-анализ ниши и целевой аудитории, напишет SMM-стратегию, придуматет креативы для рекламы и многое другое. Решайте любые задачи, даже в тех сферах, где у вас мало опыта.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "💬",
      gradient: "from-pink-500 to-rose-500",
      welcomeMessage: "Привет! Я твой универсальный ИИ-бизнес-консультант. Спрашивай о чём угодно: о маркетинге, рекламе, продвижении или анализе целевой аудитории. Я помогу!",
      systemPrompt: "Ты — универсальный бизнес-консультант и SMM-ассистент. Отвечай экспертно, лаконично, структурированно, давай пошаговые практические инструкции владельцам малого и среднего бизнеса.",
      interactiveChat: {
        user: "Как провести быстрый анализ моей ца для фитнес-студии?",
        assistant: "🏋️ Раздели её на 3 сегмента: 1) Молодые мамы (ищут тонус и социализацию), 2) Офисные сотрудники (боли в спине, хотят разгрузиться вечером), 3) Профессионалы (результат, сушка)."
      }
    },
    {
      id: "post_ideas",
      title: "Найти идею поста",
      desc: "Укажите вашу нишу и получите свежие идеи для постов, на основе трендов и интересов вашей аудитории. Вдохновляйтесь и находите темы, которые будут интересны вашим читателям.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "💡",
      gradient: "from-amber-400 to-orange-500",
      welcomeMessage: "Привет! Поделись своей тематикой, и я нагенерирую кучу свежих, оригинальных идей для постов, которые будут разрывать охваты!",
      systemPrompt: "Ты — креативный продюсер контента. Придумывай вирусные, вовлекущие и практичные темы для публикаций в соцсетях с броскими заголовками и описанием формата.",
      interactiveChat: {
        user: "Тема: курсы английского языка",
        assistant: "💡 Тощие идеи:\n\n1. Разбор: Английский сленг из Тиктока, о котором умалчивают учебники 🤫\n2. Реалити: 'Я учу по 15 слов в день неделю: честный результат'"
      }
    },
    {
      id: "video_scripts",
      title: "Сценарии для видео",
      desc: "Создавайте профессиональные сценарии для ваших видео. Введите идеи, и получите структурированный и интересный сценарий для съемок.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🎬",
      gradient: "from-purple-500 to-indigo-600",
      welcomeMessage: "Привет! Нам нужен крутой ролик! Задавай тему, и я напишу сценарий по таймингу с захватывающим вступлением, визуальным содержанием и CTA!",
      systemPrompt: "Ты — профессиональный сценарист коротких видео (Reels, Shorts, TikTok). Твоя сила — в динамике, четких секундах, интригующем хуке (первые 3 сек) и ярком завершении.",
      interactiveChat: {
        user: "Сценарий про тайм-менеджмент на 15 секунд",
        assistant: "🎬 Хук (0-3 с): (Покажи перечеркнутую задачу) 'Твои планы летят к чертям?'\n⏱ Основное (3-12 с): Помидорная техника: 25 мин фокуса, 5 отдыха.\n⏱ CTA (12-15 с): Подписывайся!"
      }
    },
    {
      id: "video_ideas",
      title: "Идеи для видео",
      desc: "Укажите вашу тематику, и получите множество креативных и оригинальных идей для видео, которые привлекут внимание вашей аудитории.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🎥",
      gradient: "from-red-400 to-rose-600",
      welcomeMessage: "Привет! На какую тему сделаем видео-подборку? Я найду тренды и неизбитые весёлые форматы, которые привлекут просмотры!",
      systemPrompt: "Ты — ИИ-продюсер видеоконтента. Придумывай вирусные идеи для коротких динамичных съемок с описанием кадра и аудиоряда.",
      interactiveChat: {
        user: "Идеи видео для домашнего кондитера",
        assistant: "🧁 Залетающие идеи:\n\n1. Срез торта крупным планом под хрустящий ASMR звук 🤤\n2. Ожидание/реальность: Самый сложный декор, который почти сломался."
      }
    },
    {
      id: "stories_games",
      title: "Идеи игр Stories",
      desc: "Развлекайте, обучайте и удерживайте внимание ваших подписчиков с помощью интерактивных игр в Stories.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🎮",
      gradient: "from-yellow-450 to-orange-500",
      welcomeMessage: "Привет! Готов повысить охваты в Stories? Какая у нас тематика блога? Придумаю крутые геймифицированные цепочки Stories!",
      systemPrompt: "Ты — специалист по интерактивным Stories. Твоя задача — расписывать игры и опросы для подписчиков с детальной повозрастной цепочкой слайдов.",
      interactiveChat: {
        user: "Игра для магазина одежды в сторис",
        assistant: "👗 Игра 'Найди лишнее': Покажите 3 стильные вещи и 1 абсолютно нелепую деталь в коллаже. Читатели голосуют стикером-ползунком, получая купон!"
      }
    },
    {
      id: "quiz",
      title: "Викторина/квиз",
      desc: "Создавайте увлекательные викторины и квизы для вашего блога и соцсетей. Наш инструмент поможет вам составить вопросы и варианты ответов.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать 7 дней бесплатно",
      avatarEmoji: "🧩",
      gradient: "from-teal-400 to-cyan-500",
      welcomeMessage: "Привет! Давай устроим интеллектуальный баттл для твоих подписчиков. Какая тема у нас для квиза?",
      systemPrompt: "Ты — составитель образовательных и вовлекающих квизов. Пиши интересные вопросы с 3-4 вариантами ответа, указывая верный и давая забавное фактологическое пояснение.",
      interactiveChat: {
        user: "Квиз про историю кофе",
        assistant: "☕️ Кто первым открыл эффекты кофе?\n1. Итальянские монахи ❌\n2. Эфиопские козы🐐 (Правильный!) ✅\n*Пояснение:* Козы объелись ягод дикого куста и лихо скакали!"
      }
    },
    {
      id: "headlines",
      title: "Заголовок статьи",
      desc: "Найдите идеальный заголовок для вашей статьи. Введите ключевые слова и получите варианты, которые привлекут внимание вашей аудитории.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🏷️",
      gradient: "from-pink-400 to-indigo-500",
      welcomeMessage: "Привет! Скидывай тему статьи или ключевые слова, и я выдам 5 зубодробительных, интригующих заголовков, по которым захочется кликнуть!",
      systemPrompt: "Ты — эксперт-заголовщик. Твоя цель — создавать взрывные и кликабельные заголовки, используя цифры, секреты, противоборства и боли целевой аудитории.",
      interactiveChat: {
        user: "Ключевики: экономия денег в кризис",
        assistant: "🏷️ 1. 'Как откладывать 10 000 рублей в месяц, не отказывая себе в удовольствиях'\n2. '5 скрытых дыр бюджета, куда утекает твоя зарплата'"
      }
    },
    {
      id: "article_plan",
      title: "План статьи",
      desc: "Укажите тему будущей статьи и получите подробный план, который облегчит процесс написания материала.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🗺️",
      gradient: "from-blue-400 to-violet-600",
      welcomeMessage: "Привет! Напиши мне тему твоей будущей статьи, и я разработаю логичный, поэтапный скелет текста с тезисами для каждого раздела!",
      systemPrompt: "Ты — профессиональный редактор. Составляй подробные планы статей с разбором введения, подразделов с тезисами и логическим выводом.",
      interactiveChat: {
        user: "Статья про пользу медитации перед сном",
        assistant: "📝 План:\n\n1. Введение: Почему овечки больше не помогают уснуть?\n2. Физиология: Как вечерняя медитация гасит стресс и гормон кортизол."
      }
    },
    {
      id: "intro_paragraph",
      title: "Вводный абзац",
      desc: "Получите помощь в создании захватывающего вводного абзаца, который увлечет внимание ваших читателей с первых секунд.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "📣",
      gradient: "from-rose-400 to-pink-650",
      welcomeMessage: "Привет! Напиши главную тему, и я набросаю потрясающий лид-абзац, от которого у читателей побегут мурашки, а руки сами потянутся скроллить дальше!",
      systemPrompt: "Ты — копирайтер, специализирующийся на завлекающем вступлении (лиде). Твои тексты эмоциональны, бросают вызов, обозначают ключевое решение.",
      interactiveChat: {
        user: "Статья про фриланс для новичков",
        assistant: "📣 Представь: ты просыпаешься в 10 утра, завариваешь кофе и открываешь ноутбук у окна вместо поездки в метро. Мечта? Но как начать, если у тебя ноль опыта?"
      }
    },
    {
      id: "several_paragraphs",
      title: "Несколько абзацев",
      desc: "Добавьте тему или вводный абзац будущего текста, а наш ai-ассистент поможет вам создать связное и логичное продолжение.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🖋️",
      gradient: "from-violet-400 to-purple-600",
      welcomeMessage: "Привет! Дай мне зачин твоего текста, и я напишу красивое, последовательное продолжение с безупречной логикой повествования!",
      systemPrompt: "Ты — ИИ-писатель. Помогай развивать мысли пользователя в текстах, сохраняя стиль изначального предложения и делая повествование гладким.",
      interactiveChat: {
        user: "Продолжи: Многие считают, что инвестиции доступны только богатым...",
        assistant: "🖋️ ...Однако это иллюзия, мешающая вашему капиталу расти. Сегодня начать инвестировать можно с 1000 рублей, используя силу сложного процента!"
      }
    },
    {
      id: "draft_post",
      title: "Пост из черновика",
      desc: "Укажите тему будущей статьи и получите подробный план, который облегчит процесс написания материала.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🧱",
      gradient: "from-sky-500 to-cyan-600",
      welcomeMessage: "Привет! Отправляй свои мысли, сырые факты или голосовые тезисы. Я оформлю их в структурированный рекламный или информационный лонгрид!",
      systemPrompt: "Ты — литературный редактор. Превращай грубое тезисное сырье или сырые наброски в лаконичный, привлекательный и гармоничный пост.",
      interactiveChat: {
        user: "Черновик: Книги полезны. Они развивают мозг. Читайте по 15 страниц.",
        assistant: "🧱 КУДА УХОДИТ ТВОЙ ФОКУС? 📖\n\nПочему 15 минут чтения с утра развивают мозг лучше, чем часы скроллинга Reels? Дело в системности мышления..."
      }
    },
    {
      id: "fix_errors",
      title: "Исправить ошибки",
      desc: "Наш инструмент поможет вам обнаружить грамматические, орфографические и стилистические ошибки в тексте и исправит их.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "❌",
      gradient: "from-green-400 to-emerald-600",
      welcomeMessage: "Привет! Отправь мне свой текст с опечатками, и я верну его идеально чистым, объяснив основные грамматические или стилистические ошибки!",
      systemPrompt: "Ты — строгий, но дружелюбный ИИ-корректор русского языка. Выравнивай орфографию, пунктуацию, стилистику, кратко описывай суть исправлений.",
      interactiveChat: {
        user: "Я ложу кофе на стол и пошел в магазин.",
        assistant: "✅ **Исправлено:** Я кладу кофе на стол и иду в магазин.\n\n*Правило:* Глагол 'ложить' употребляется только с приставками. Также исправлено время."
      }
    },
    {
      id: "final_paragraph",
      title: "Финальный абзац",
      desc: "Завершите ваш текст сильным финальным абзацем, который не оставит ваших читателей равнодушными.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🏁",
      gradient: "from-orange-500 to-red-650",
      welcomeMessage: "Привет! Напиши, о чём была статья/пост, и я сформирую мощный, запоминающийся финальный аккорд с ярким призывом к размышлению!",
      systemPrompt: "Ты — мастер концовок. Создавай проникновенные, мотивирующие или интригующие заключительные абзацы, завершающие логику статьи.",
      interactiveChat: {
        user: "Статья об утренних подъёмах",
        assistant: "🏁 Утро — это роскошь, которую большинство из нас просыпает. Не насилуйте режим: заведите будильник завтра всего на 15 минут раньше. Попробуйте утренний кайф!"
      }
    },
    {
      id: "pub_from_plan",
      title: "Публикация из плана",
      desc: "AI-ассистент опираясь на ваш заголовок и план статьи напишет полноценную публикацию, которую захочется дочитать до конца.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "📰",
      gradient: "from-indigo-400 to-pink-500",
      welcomeMessage: "Привет! Скидывай заголовок и пункты плана, а я расширю их в цельную, легкую для чтения и захватывающую статью!",
      systemPrompt: "Ты — профессиональный журналист-копирайтер. Пиши длинные качественные структурированные публикации по заданному плану.",
      interactiveChat: {
        user: "Заголовок: Мифы о похудении. План: 1. Миф о голоде, 2. Вода.",
        assistant: "🥗 МИФЫ О ПОХУДЕНИИ\n\nДумаете, голодание ускоряет сброс веса? На самом деле организм входит в стресс и откладывает каждую калорию про запас! Пейте воду..."
      }
    },
    {
      id: "text_conclusion",
      title: "Вывод по тексту",
      desc: "Получите четкий и понятно сформулированный вывод по тексту. Вы можете использовать его как черновик для создания заключительного абзаца, который подытожит основные идеи вашего текста.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "🧭",
      gradient: "from-teal-500 to-emerald-600",
      welcomeMessage: "Привет! Пришли мне длинную статью или документ, я бережно выжму всю воду и предоставлю лаконичный резюмирующий вывод!",
      systemPrompt: "Ты — ИИ-аналитик. Выделяй ключевой лейтмотив и факты из текста в 1-3 четких и понятных тезиса вывода.",
      interactiveChat: {
        user: "Текст про безопасность микроволновок",
        assistant: "🧭 **Резюме:** Наука подтвердила безопасность СВЧ-излучения для еды. Опасения вокруг микроволновок — миф, порожденный страхом неизвестности."
      }
    },
    {
      id: "cold_email",
      title: "Холодное письмо",
      desc: "Идеальный инструмент для тех, кому нужно регулярно создавать много эффективных рассылок, а также для тех, кто не понимает как правильно писать письма, чтобы их дочитывали до конца.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "📨",
      gradient: "from-sky-450 to-pink-500",
      welcomeMessage: "Привет! Кому будем писать холодное предложение? Опиши свой оффер и целевого получателя, я напишу шедевр, который откроют и прочитают до конца!",
      systemPrompt: "Ты — эксперт холодных продаж. Пиши вовлекающие письма с мощными интригующими заголовками в теме, кратким обозначением пользы без спам-триггеров.",
      interactiveChat: {
        user: "Письмо блогеру о взаимном пиаре",
        assistant: "📨 Тема: Коллаборация, которая удвоит наши просмотры? 😉\n\nПривет! У тебя крутые Reels по дизайну. Предлагаю сделать гостевой обмен..."
      }
    },
    {
      id: "editor_advice",
      title: "Совет главреда",
      desc: "Получите экспертные советы от нашего виртуального главного редактора. Улучшите качество вашего текста с помощью профессиональных рекомендаций.",
      tag: "ChatGPT без VPN",
      btnText: "Попробовать бесплатно",
      avatarEmoji: "💂",
      gradient: "from-amber-500 to-red-550",
      welcomeMessage: "Привет! Загружай свой пост. Я проверю его на канцелярит, пафос, словесный мусор и покажу, как переписать сухие и тяжелые куски!",
      systemPrompt: "Ты — суровый, но опытный главный редактор. Твоя задача — анализировать предложения на штампы, воду и канцелярит, предлагая динамичный аналог.",
      interactiveChat: {
        user: "Мы осуществляем процесс обучения студентов...",
        assistant: "💂 **Рекомендация:** Уберите глагольную отглагольную структуру. Стало: 'Мы обучаем студентов'. Это звучит живее и сокращает чтение!"
      }
    }
  ];

  const openAgentChat = (agent: AIAgent) => {
    setSelectedAgent(agent);
    setChatMessages([
      { role: 'assistant', text: agent.welcomeMessage }
    ]);
    setUserInput('');

    // Send reset command /restart to ProTalk in background, ensuring a clean state and no legacy dialogues are kept.
    // Each dialog acts as a completely brand new session.
    fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: '/restart',
        history: [], // Do not convey old dialogs/messages
        systemInstruction: agent.systemPrompt
      })
    }).then(() => {
      console.log(`ProTalk agent session reset with /restart successful for ${agent.title}`);
    }).catch(err => {
      console.warn('Background reset /restart call logged:', err);
    });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isGenerating || !selectedAgent) return;

    const userMsg = userInput;
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsGenerating(true);

    try {
      const historyPayload = chatMessages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: userMsg,
          history: historyPayload,
          systemInstruction: selectedAgent.systemPrompt
        })
      });

      if (!response.ok) {
        throw new Error('Не удалось получить ответ с сервера');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠️ Произошла ошибка при обращении к ИИ на сервере. Ошибка: ${err.message || 'Пожалуйста, проверьте настройки ключа.'}`
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecording = async () => {
    if (isRecording) {
      // If we clicked microphone icon again while recording, stop and send
      await handleStopAndSendVoice();
      return;
    }

    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Ваш браузер не поддерживает MediaRecorder или доступ к микрофону заблокирован.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      let recorder: MediaRecorder;
      const options = { mimeType: 'audio/webm' };
      try {
        recorder = new MediaRecorder(stream, options);
      } catch (e) {
        console.warn("MimeType audio/webm not supported, falling back to default voice recorder.");
        recorder = new MediaRecorder(stream);
      }

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      setVoiceTextSimulated("Идёт запись реального голоса... Говорите в микрофон.");

      const interval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);

    } catch (err: any) {
      console.warn("Falling back to simulated voice recording due to system/container device permissions:", err);
      // Fallback Mode (Simulated recording fallback for full browser stack protection)
      setIsRecording(true);
      setRecordingSeconds(0);
      setVoiceTextSimulated("Слушаю ваш голос (тестовый режим)...");

      const interval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
    }
  };

  const handleCancelVoice = () => {
    if (!isRecording) return;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
    if (recordingInterval) clearInterval(recordingInterval);
    setRecordingSeconds(0);
    audioChunksRef.current = [];
    setVoiceTextSimulated('');
    console.log("Голосовая запись прервана и удалена.");
  };

  const handleStopAndSendVoice = async () => {
    if (!isRecording) return;
    
    setIsRecording(false);
    if (recordingInterval) clearInterval(recordingInterval);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsGenerating(true);

    try {
      let audioBlob: Blob;
      let extension = "webm";

      if (audioChunksRef.current.length > 0) {
        audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      } else {
        // Fallback simulation text query if no physical wave bytes collected
        const simulatedVoiceRequests = [
          "Напиши крутой вовлекающий пост для блога кондитера про шоколадные капкейки",
          "Отрерайть мне этот скучный рекламный текст, сделай его молодежным и дерзким",
          "Придумай пару оригинальных идей для игры со зрителями в сторис на тему фитнеса",
          "Составь подробный план статьи об изучении китайского языка с нуля"
        ];
        const randomRequest = simulatedVoiceRequests[Math.floor(Math.random() * simulatedVoiceRequests.length)];
        
        // Let's craft and write a physical dummy WAV file so that there is always a real voice file going to the server
        const dummyBase64 = "UklGRiQAAABXQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
        const binaryString = atob(dummyBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        audioBlob = new Blob([bytes], { type: 'audio/wav' });
        extension = "wav";
        
        console.log(`Fallback transcribed text: "${randomRequest}"`);
      }

      // Convert captured audio blob to base64 format
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.readAsDataURL(audioBlob);
      });

      const audioBase64 = await base64Promise;

      // Upload speech audio file to backend
      const uploadResp = await fetch('/api/ai/upload-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64, extension })
      });

      if (!uploadResp.ok) {
        throw new Error(`Произошла ошибка при загрузке аудиофайла на сервер. Статус: ${uploadResp.status}`);
      }

      const uploadData = await uploadResp.json();
      const audioUrl = uploadData.url; // Relative path, e.g. /uploads/voice_xxx.webm

      const voiceText = `🎤 [Голосовое сообщение](${audioUrl})`;
      setChatMessages(prev => [...prev, { role: 'user', text: voiceText }]);

      const finalQuery = `Пользователь прикрепил аудиосообщение: ${audioUrl}. Ответь на запрос пользователя, основываясь на своей системной роли.`;

      // Build history
      const historyPayload = chatMessages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const chatResponse = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalQuery,
          history: historyPayload,
          systemInstruction: selectedAgent.systemPrompt
        })
      });

      if (!chatResponse.ok) {
        throw new Error('Не удалось запустить ИИ ProTalk для обработки голосового ввода.');
      }

      const chatData = await chatResponse.json();
      setChatMessages(prev => [...prev, { role: 'assistant', text: chatData.text }]);

    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠️ Ошибка при обработке аудиосообщения: ${err.message || 'Ошибка запуска распознавания.'}`
      }]);
    } finally {
      setIsGenerating(false);
      setRecordingSeconds(0);
      audioChunksRef.current = [];
    }
  };

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    if (start !== end) {
      const selectedText = el.value.substring(start, end);
      setSelectionRange({ start, end });
      setMarkdownLinkText(selectedText);

      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();
      const relativeTop = rect.top - (parentRect?.top || 0);
      const relativeLeft = rect.left - (parentRect?.left || 0);

      // Place the toolbar overlay above selection
      setToolbarCoords({
        top: relativeTop - 45,
        left: Math.max(10, relativeLeft + (rect.width / 4))
      });
      setShowToolbar(true);
    } else {
      // Keep visible if user is typing link fields
      if (!showLinkFields) {
        setShowToolbar(false);
      }
    }
  };

  const applyFormat = (syntax: 'bold' | 'italic' | 'list' | 'quote' | 'code' | 'link') => {
    if (!selectionRange || !textareaRef.current) return;
    const { start, end } = selectionRange;
    const text = userInput;
    const selected = text.substring(start, end);
    let formatted = '';

    if (syntax === 'bold') {
      formatted = `**${selected}**`;
    } else if (syntax === 'italic') {
      formatted = `*${selected}*`;
    } else if (syntax === 'code') {
      formatted = `\`${selected}\``;
    } else if (syntax === 'list') {
      formatted = `\n- ${selected}`;
    } else if (syntax === 'quote') {
      formatted = `\n> ${selected}`;
    } else if (syntax === 'link') {
      const linkT = markdownLinkText || selected;
      const linkU = markdownLinkUrl || 'https://';
      formatted = `[${linkT}](${linkU})`;
    }

    const newText = text.substring(0, start) + formatted + text.substring(end);
    setUserInput(newText);

    // Reset selection and toolbar states
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const cursorPosition = start + formatted.length;
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 50);

    setShowToolbar(false);
    setShowLinkFields(false);
    setMarkdownLinkText('');
    setMarkdownLinkUrl('');
    setSelectionRange(null);
  };

  useEffect(() => {
    return () => {
      if (recordingInterval) clearInterval(recordingInterval);
    };
  }, [recordingInterval]);

  const filteredAgents = agents.filter(agent => 
    agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-16 relative">
      {/* 1. Hero Section with network cloud logo and orbital planets */}
      <div className="w-full relative overflow-visible flex flex-col justify-center items-center py-2 gap-4 text-center max-w-2xl mx-auto">
        <PlatformNetworkCloud />
        
        <div className="space-y-2.5 px-4 relative z-10">
          <span className="px-2.5 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest font-mono">
            ИНТЕЛЛЕКТУАЛЬНЫЙ ЦЕНТР ИИSMM
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
            Выберите своего персонального AI-ассистента
          </h1>
          <p className="text-slate-500 text-xs sm:text-xs font-medium max-w-lg mx-auto leading-relaxed">
            20 специализированных интеллектуальных агентов, готовых взять на себя рутину копирайтинга, сценариев, квизов и генерации идей на движке <strong className="text-pink-500 font-extrabold uppercase font-mono text-[10px]">Gemini 3.1 Flash Lite</strong>.
          </p>
        </div>
      </div>

      {/* Search and Filters Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 px-4 pt-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию или описанию AI-агента..."
            className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none transition-all shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Carousel of AI agents implemented inside 3D coordinate space */}
      <div className="relative max-w-full px-4 overflow-visible">
        <AIAgent3DCarousel agents={filteredAgents} openAgentChat={openAgentChat} />
      </div>

      {/* 4. Overlay Chat Modal with interactive assistant and input/voice handlers */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-transparent backdrop-blur-[2px]">
            {/* Backdrop click to dismiss */}
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedAgent(null)} />
            
            {/* Modal Box Styled in Apple Liquid Glass */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[32px] w-full max-w-2xl h-[92vh] sm:h-[80vh] flex flex-col justify-between overflow-hidden shadow-[0_32px_80px_rgba(236,72,153,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-white/60 relative z-10"
            >
              
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/40 bg-white/20 backdrop-blur-md flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${selectedAgent.gradient} rounded-xl flex items-center justify-center text-lg text-white shadow-sm`}>
                    {selectedAgent.avatarEmoji}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 leading-tight">
                      {selectedAgent.title}
                    </h3>
                    <p className="text-[10px] text-slate-505 font-semibold uppercase tracking-wider font-mono flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Активен
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAgent(null)}
                  className="p-1.5 hover:bg-white/40 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer border border-white/20 bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Thread container (Scrollable list of messages) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white/10 no-scrollbar">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-3xl text-xs leading-relaxed transition-all ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-pink-500/10 via-white/95 to-amber-500/10 text-slate-800 border border-pink-100 rounded-tr-xs shadow-[0_4px_16px_rgba(219,39,119,0.05)]'
                          : 'bg-white/85 backdrop-blur-md border border-white/70 text-slate-805 rounded-tl-xs shadow-[0_4px_16px_rgba(0,0,0,0.02)]'
                      }`}
                    >
                      <MarkdownRenderer content={msg.text} />
                    </div>
                  </div>
                ))}
                
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="bg-white/80 border border-white/90 p-3.5 rounded-3xl rounded-tl-xs flex items-center gap-2 text-xs text-pink-500 backdrop-blur-md">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span className="font-semibold uppercase tracking-wider text-[10px] animate-pulse">Ассистент пишет...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Voice Simulated Panel Box */}
              <AnimatePresence>
                {isRecording && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-pink-500/10 backdrop-blur-md px-5 py-3 border-t border-white/40 flex items-center justify-between text-xs font-sans shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                  >
                    {/* CANCEL AUDIO BUTTON */}
                    <button
                      type="button"
                      onClick={handleCancelVoice}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50/90 hover:bg-rose-100 text-rose-600 font-extrabold text-[10px] rounded-xl transition border border-rose-100/50 cursor-pointer shadow-xxs"
                      title="Прервать и удалить запись"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Прервать</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-600"></span>
                      </span>
                      <div className="text-left">
                        <span className="font-extrabold uppercase tracking-wider text-[8px] text-pink-700 block select-none">Запись звука</span>
                        <span className="font-mono text-xs font-black text-slate-800">{recordingSeconds}с / 120с</span>
                      </div>
                    </div>

                    {/* CONFIRM/SEND AUDIO BUTTON */}
                    <button
                      type="button"
                      onClick={handleStopAndSendVoice}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-600 font-extrabold text-[10px] rounded-xl transition border border-emerald-100/50 cursor-pointer shadow-xxs"
                      title="Остановить и отправить голосовое"
                    >
                      <span>Отправить voice</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Form Footer with expandable input text area & mic buttons */}
              <div className="p-4 sm:p-5 border-t border-white/40 bg-white/30 backdrop-blur-md shrink-0">
                <div className="flex items-end gap-2.5">
                  
                  {/* Voice recording button */}
                  <button
                    type="button"
                    onClick={startVoiceRecording}
                    className={`p-3 rounded-2xl flex items-center justify-center shadow-xs transition-all relative border cursor-pointer shrink-0 ${
                      isRecording 
                        ? 'bg-pink-600 border-pink-605 text-white animate-pulse' 
                        : 'bg-white/50 hover:bg-white/80 border-white/60 text-slate-500 hover:text-pink-500 backdrop-blur-md'
                    }`}
                    title="Голосовой ввод"
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Expandable text input field */}
                  <div className="flex-1 relative">
                    
                    {/* FORMATTING TOOLBAR POPOVER */}
                    <AnimatePresence>
                      {showToolbar && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute z-60 bg-white/95 backdrop-blur-md border border-pink-200/50 p-2.5 rounded-2xl shadow-[0_16px_40px_rgba(219,39,119,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] flex flex-col gap-2 w-[270px] font-sans text-xs text-slate-800"
                          style={{ 
                            bottom: 'calc(100% + 12px)', 
                            left: `${Math.max(10, Math.min(toolbarCoords.left - 100, (textareaRef.current?.getBoundingClientRect().width || 400) - 280))}px` 
                          }}
                        >
                          {!showLinkFields ? (
                            <div className="flex items-center gap-1">
                              <button 
                                type="button" 
                                onClick={() => applyFormat('bold')} 
                                className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition cursor-pointer" 
                                title="Жирный (**текст**)"
                              >
                                <Bold className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => applyFormat('italic')} 
                                className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition cursor-pointer" 
                                title="Курсив (*текст*)"
                              >
                                <Italic className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => applyFormat('code')} 
                                className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition cursor-pointer" 
                                title="Моноширинный (`код`)"
                              >
                                <Code className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => applyFormat('list')} 
                                className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition cursor-pointer" 
                                title="Маркированный список (- пункт)"
                              >
                                <List className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => applyFormat('quote')} 
                                className="p-1.5 text-slate-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition cursor-pointer" 
                                title="Цитата (> текст)"
                              >
                                <Quote className="w-3.5 h-3.5" />
                              </button>
                              <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                              <button 
                                type="button" 
                                onClick={() => setShowLinkFields(true)} 
                                className="p-1.5 text-pink-500 hover:text-pink-700 hover:bg-pink-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
                                title="Вставить ссылку"
                              >
                                <Link className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => setShowToolbar(false)} 
                                className="text-[11px] text-slate-400 hover:text-slate-600 ml-auto px-1.5 cursor-pointer font-extrabold"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-2.5 p-1 bg-white/20 rounded-xl">
                              <div className="text-[9px] text-pink-600 font-extrabold uppercase tracking-wider">Формат Ссылки</div>
                              <input 
                                type="text" 
                                placeholder="Текст ссылки" 
                                value={markdownLinkText} 
                                onChange={(e) => setMarkdownLinkText(e.target.value)} 
                                className="w-full text-[10.5px] bg-slate-50 border border-slate-200 px-2 py-1.5 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white"
                              />
                              <input 
                                type="text" 
                                placeholder="Адрес ссылки (например, https://)" 
                                value={markdownLinkUrl} 
                                onChange={(e) => setMarkdownLinkUrl(e.target.value)} 
                                className="w-full text-[10.5px] bg-slate-50 border border-slate-200 px-2 py-1.5 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-pink-500 focus:bg-white"
                              />
                              <div className="flex justify-end gap-1.5 pt-0.5">
                                <button 
                                  type="button" 
                                  onClick={() => setShowLinkFields(false)} 
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[10px] font-bold rounded-lg transition text-slate-600 border border-slate-200 cursor-pointer"
                                >
                                  Назад
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => applyFormat('link')} 
                                  className="px-2.5 py-1 bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-extrabold rounded-lg transition cursor-pointer shadow-sm"
                                >
                                  Вставить
                                </button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <textarea
                      ref={textareaRef}
                      rows={1}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onSelect={handleTextareaSelect}
                      onKeyDown={handleKeyDown}
                      placeholder={isRecording ? "Говорите..." : "Задайте вопрос ассистенту... (выделите текст для форматирования)"}
                      disabled={isRecording}
                      className="w-full pl-4 pr-12 py-3 bg-white/60 border border-white/80 text-xs rounded-2xl focus:ring-1 focus:ring-pink-400 focus:outline-none focus:bg-white/95 resize-none transition-all duration-150 max-h-32 text-slate-700 font-medium leading-relaxed shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]"
                      style={{ overflowY: 'auto' }}
                    />
                    
                    {/* Clear Button */}
                    {userInput && (
                      <button
                        onClick={() => setUserInput('')}
                        className="absolute right-3.5 bottom-3.5 text-slate-300 hover:text-slate-500 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Submit message button */}
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isGenerating || isRecording}
                    className={`p-3 rounded-2xl flex items-center justify-center text-white shadow-md transition-all shrink-0 cursor-pointer ${
                      userInput.trim() && !isGenerating && !isRecording
                        ? 'bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 hover:scale-102 hover:shadow-lg active:scale-98'
                        : 'bg-white/20 text-slate-300 border border-white/30 pointer-events-none'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
