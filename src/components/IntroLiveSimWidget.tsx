import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Check, BarChart3, Radio, RefreshCw } from 'lucide-react';

export default function IntroLiveSimWidget() {
  const [activeStep, setActiveStep] = useState(0);
  const [views, setViews] = useState(1342);

  // Transition between SMM engine stages
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Slowly increment views in step 2 for a live statistics feel
  useEffect(() => {
    if (activeStep === 2) {
      const interval = setInterval(() => {
        setViews((prev) => prev + Math.floor(Math.random() * 5) + 2);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setViews(1342);
    }
  }, [activeStep]);

  return (
    <div id="intro-live-showroom" className="w-full bg-white/70 backdrop-blur-xl text-slate-800 rounded-3xl border border-white shadow-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden relative h-[420px] sm:h-[400px] group/sim">
      {/* Dynamic ambient glowing background sphere */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-pink-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-orange-400/15 rounded-full blur-2xl pointer-events-none" />



      {/* Active Stage Renderer */}
      <div className="flex-1 flex flex-col justify-center py-2">
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.div
              key="step-ai"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 px-2.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-[9px] font-bold text-pink-650 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin text-pink-500" />
                  Шаг 1: ИИ-Оптимизация Контента
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-2xl border border-slate-200/60 shadow-xs space-y-2">
                <span className="text-[10px] text-slate-400 font-mono block"># Исходный черновик в буфере:</span>
                <p className="text-slate-600 text-xs font-semibold leading-relaxed italic">
                  "Вот решили запустить бота, в боте можно планировать посты, рерайтить тексты и делать взаимный пиар..."
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-pink-50/50 p-3 rounded-2xl border border-pink-500/20 space-y-2 relative shadow-xs"
              >
                <div className="absolute top-2 right-2 text-pink-600 font-mono text-[8px] uppercase tracking-widest font-black">Gemini PRO</div>
                <span className="text-[10px] text-pink-650 font-mono font-bold block">✓ AIDA-Оптимальный Текст Сгенерирован:</span>
                <p className="text-slate-800 text-xs font-bold leading-relaxed">
                  "🚀 Революция в СММ! Нейросетевой комбайн <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">ИИSMM</span> заменяет целый штат маркетологов в один клик. Подключите свои каналы и забирайте +1,000,500 ИИрок бесплатно прямо сейчас! 🪙👑"
                </p>
              </motion.div>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div
              key="step-posting"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 px-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-[9px] font-bold text-orange-650 uppercase tracking-widest flex items-center gap-1">
                  <Radio className="w-3 h-3 text-orange-500 animate-pulse" />
                  Шаг 2: Экспресс-Кросспостинг
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: 'Telegram', status: 'Публикация...', color: 'text-sky-600', progress: 35 },
                  { name: 'ВКонтакте', status: 'Адаптировано', color: 'text-blue-600', progress: 100 },
                  { name: 'Одноклассники', status: 'Очередь', color: 'text-orange-600', progress: 50 },
                  { name: 'Сетка / TenChat', status: 'Адаптировано', color: 'text-green-600', progress: 100 }
                ].map((net, i) => (
                  <div key={i} className="bg-white/80 p-2.5 rounded-xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className={net.color}>{net.name}</span>
                      <span className="text-[9px] font-mono text-slate-400">{net.status}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${net.progress}%` }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 bg-sky-50/60 p-2 border border-sky-500/10 rounded-xl shadow-xs">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                </motion.div>
                <span className="text-[10px] font-bold text-sky-700 font-mono">Автоматический рерайт ссылок и картинок завершен</span>
              </div>
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              key="step-stats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[9px] font-bold text-indigo-650 uppercase tracking-widest flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-indigo-500" />
                  Шаг 3: Динамика роста & Охват
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/80 p-2 px-3 rounded-xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Охваты</span>
                  <span className="font-mono text-xs sm:text-sm font-black text-orange-600">+{views}</span>
                </div>
                <div className="bg-white/80 p-2 px-3 rounded-xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Сделок</span>
                  <span className="font-mono text-xs sm:text-sm font-black text-pink-600">23 шт</span>
                </div>
                <div className="bg-white/80 p-2 px-3 rounded-xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-center">
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Сообществ</span>
                  <span className="font-mono text-xs sm:text-sm font-black text-indigo-600">14 сетей</span>
                </div>
              </div>

              {/* Graphical Wave visualization lines */}
              <div className="bg-white/85 p-3 rounded-2xl border border-slate-200/60 shadow-xs space-y-2 relative h-16 flex items-end overflow-hidden">
                <div className="absolute top-2 left-3 text-[9px] text-slate-400 font-mono">Индекс ER вовлеченности (AIDA %):</div>
                <div className="w-full flex justify-between items-end h-8 gap-1 font-mono">
                  {[20, 35, 25, 55, 45, 75, 60, 95, 80, 110, 100].map((h, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={{ height: `${(h / 110) * 100}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-orange-400 to-pink-500 rounded-sm opacity-90"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SMM Platform Stepper Dots */}
      <div className="flex justify-between items-center border-t border-slate-200/50 pt-3 mt-4">
        <span className="text-[10px] text-slate-400 font-semibold uppercase">Сценарий ИИSMM</span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeStep ? 'w-6 bg-gradient-to-r from-orange-400 to-pink-500' : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
