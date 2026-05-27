import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, ShieldCheck, Repeat, Calendar, 
  FileText, Brush, Layers, BarChart3, MessageSquare, Check, ArrowRight
} from 'lucide-react';

interface InteractiveFeatureSimulatorProps {
  type: 'multiposting' | 'rewrite' | 'escrow' | 'parser' | 'grid' | 'ord' | 'watermark' | 'vp' | 'analytics' | 'bot';
}

export const InteractiveFeatureSimulator: React.FC<InteractiveFeatureSimulatorProps> = ({ type }) => {
  const [step, setStep] = useState(0);

  // Auto cycle steps every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Simulator config & frames
  const renderSimulatorContent = () => {
    switch (type) {
      case 'multiposting':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-orange-605">
              <span>✈️ Кросспостинг-Синхронизация</span>
              <span className="font-mono bg-orange-100 text-orange-850 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="multi-0"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 bg-white/90 rounded-xl border border-slate-100 space-y-2"
                >
                  <div className="font-bold text-slate-800">1. Написание единого черновика 📝</div>
                  <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg leading-relaxed">
                    "🚀 Новость недели: Наш ИИ-комбайн ИИSMM бесплатно дарит всем +100,000 ИИрок🪙 при подключении!"
                  </p>
                  <span className="text-[10px] text-orange-500 font-extrabold block">✍️ Симуляция ввода текста...</span>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="multi-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 bg-white/90 rounded-xl border border-orange-100 space-y-2.5 text-center py-4"
                >
                  <div className="font-bold text-slate-800">2. Адаптация и Отправка 📡</div>
                  <div className="flex justify-center gap-3 items-center py-1">
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold animate-pulse text-xs">TG</span>
                    <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold animate-pulse text-xs">VK</span>
                    <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-650 flex items-center justify-center font-bold animate-pulse text-xs">OK</span>
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold animate-pulse text-xs animate-bounce">СН</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block">Синхронный разлет по сетям...</span>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="multi-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3 bg-orange-50/25 rounded-xl border border-orange-200 space-y-2"
                >
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <span className="text-emerald-500">✔</span> 3. Успешно доставлено! 🎉
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between items-center p-1.5 bg-white rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">✈️ Telegram Канал</span>
                      <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-[9px] font-black">АКТИВЕН</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-white rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">🔵 ВКонтакте Паблик</span>
                      <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-[9px] font-black">АКТИВЕН</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-white rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">🕸️ Сетка (Sber CPM)</span>
                      <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-[9px] font-black">АКТИВЕН</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'rewrite':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-pink-600">
              <span>🎭 ИИ-Ассистент & Рерайтинг</span>
              <span className="font-mono bg-pink-50 text-pink-700 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="rew-0"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3 bg-white/90 rounded-xl border border-slate-100 space-y-1.5"
                >
                  <span className="text-[10px] font-bold text-slate-400 block">НАЧАЛЬНЫЙ СУХОЙ ТЕКСТ:</span>
                  <p className="bg-slate-50 p-2 rounded-lg text-slate-600 italic">
                    "Мы запустили бота. Он помогает продавать рекламу. Деньги будут в безопасности, пользуйтесь"
                  </p>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="rew-1"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3 bg-gradient-to-tr from-pink-50/20 to-orange-50/20 rounded-xl border border-pink-100 space-y-2 text-center py-4"
                >
                  <Sparkles className="w-5 h-5 text-pink-500 mx-auto animate-spin" />
                  <div className="font-bold text-slate-800">Gemini ИИ переписывает под стиль...</div>
                  <div className="text-[10px] text-slate-400 font-mono">Анализ референса t.me/shishkarnem...</div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="rew-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-3 bg-pink-50/20 rounded-xl border border-pink-200 space-y-2"
                >
                  <span className="text-[10px] font-black text-pink-600 block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> ВЫДАЮЩИЙСЯ ИИ-РЕРАЙТ ПОЛУЧЕН:
                  </span>
                  <p className="bg-white p-2.5 rounded-lg text-slate-800 font-semibold border border-pink-100 leading-normal">
                    "🚀 СОВЕРШИЛИ ПРОРЫВ! Наш бот-аудитор меняет законы рекламного рынка. Никакого ручного трекинга — только безопасные сделки в 1 клик! 🔥 Убедитесь сами..."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'escrow':
        return (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-orange-605">
              <span>🔒 Безопасный Гарант (Escrow)</span>
              <span className="font-mono bg-orange-100 text-orange-850 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="esc-0"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-2"
                >
                  <div className="flex justify-between items-center font-bold text-slate-800">
                    <span>Сделка #2951</span>
                    <span className="text-orange-600 font-mono">1,800 ₽</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Заказчик резервирует деньги в ИИSMM. Монеты замораживаются на безопасном Escrow-счете.
                  </p>
                  <span className="text-[9px] bg-orange-50 text-orange-800 px-2 py-1 rounded font-black block w-fit">💰 СЕЙФ ЗАБЛОКИРОВАН</span>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="esc-1"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="p-3 bg-white rounded-xl border border-orange-200/60 space-y-2.5"
                >
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-orange-500 font-bold" />
                    <span>Бот-Сканнер проверяет пост</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Наш робот зашел на канал блогера, нашел интеграцию, убедился в наличии ссылки и замерил 24 часа закрепа.
                  </p>
                  <span className="text-[9px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-black block w-fit animate-pulse font-mono flex items-center gap-1">
                    🔍 АВТОПРОКАЧКА СКАННЕРОМ...
                  </span>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="esc-2"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-2"
                >
                  <div className="font-bold text-sky-900 flex items-center gap-1">
                    <span>🎉</span> Пост проверен — Деньги Выплачены!
                  </div>
                  <p className="text-[10px] text-slate-650 leading-relaxed font-medium">
                    Условия выполнены на 100%. Эскроу разморожен. Исполнителю отправлено <span className="font-bold text-sky-800">1,800 ₽</span> автоматически.
                  </p>
                  <span className="text-[9px] bg-gradient-to-r from-orange-450 to-pink-450 text-white px-2 py-1 rounded font-black block w-fit shadow-sm border border-white/20">✔️ СДЕЛКА УСПЕШНО ЗАВЕРШЕНА</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'parser':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-rose-600">
              <span>🤖 Парсер & Умный Репостинг</span>
              <span className="font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="pr-0"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-1.5"
                >
                  <div className="font-extrabold text-slate-800">📡 Мониторинг группы донора</div>
                  <div className="p-2 bg-rose-50/50 rounded-lg text-[10px] text-slate-500 border border-rose-100 flex justify-between items-center">
                    <span>Входящий пост от конкурента</span>
                    <span className="text-[8px] bg-rose-150 text-rose-700 px-1.5 rounded font-bold font-mono">НОВЫЙ</span>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="pr-1"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="p-3 bg-white rounded-xl border border-orange-100 space-y-1.5"
                >
                  <div className="font-extrabold text-orange-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                    <span>ИИ-Очистка & Синонимический рерайт</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    ИИSMM удаляет чужие юзернеймы, убирает рекламу и переписывает новость уникальным слогом.
                  </p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="pr-2"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="p-3 bg-sky-50 border border-sky-100 rounded-xl space-y-1.5"
                >
                  <div className="font-extrabold text-sky-800 flex items-center gap-1">
                    <span>⚡</span> Безопасный кросс-пост выпущен!
                  </div>
                  <p className="text-[10px] text-slate-550 font-medium">
                    Отрерайченный пост автоматически улетел в ваши дочерние каналы с наложением вотермарок и UTM тегов.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'grid':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-amber-600">
              <span>📅 Сетка публикаций & Таймлайн</span>
              <span className="font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="gd-0"
                  initial={{ opacity: 0, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-2"
                >
                  <div className="font-bold text-slate-800">1. Сетка слотов (Прайм-тайм) ⏰</div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                    <div className="p-1 border bg-sky-50 border-sky-200 rounded text-sky-800 font-bold">12:00 Пусто</div>
                    <div className="p-1 border bg-slate-50 border-slate-150 rounded text-slate-400 font-bold">15:00 Слоты</div>
                    <div className="p-1 border bg-sky-50 border-sky-200 rounded text-sky-800 font-bold">18:00 Пусто</div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="gd-1"
                  initial={{ opacity: 0, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  className="p-3 bg-white rounded-xl border border-amber-100 space-y-2"
                >
                  <div className="font-bold text-slate-800">2. Умное распределение контента</div>
                  <p className="text-[10px] text-slate-500">
                    Наш алгоритм автоматически перетаскивает ваши готовые и отрерайченные посты в часы максимальной активности.
                  </p>
                  <span className="text-[9px] text-amber-600 font-bold block animate-bounce">⚡ Назначение поста в слот 18:00...</span>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="gd-2"
                  initial={{ opacity: 0, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  className="p-3 bg-amber-50/30 border border-amber-200 rounded-xl space-y-2"
                >
                  <div className="font-bold text-slate-800">3. Календарь готов к бою! 🚀</div>
                  <div className="p-2 bg-white rounded-lg border border-amber-100 text-[10px] font-mono flex justify-between items-center">
                    <span>📅 Пн, 18:00 (Гайд по ИИ)</span>
                    <span className="text-amber-700 font-extrabold uppercase text-[8px] animate-pulse">ОТЛОЖЕН ⏳</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'ord':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-orange-605">
              <span>🧾 Автоматическая маркировка ОРД</span>
              <span className="font-mono bg-orange-150/40 text-orange-850 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="ord-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-1.5"
                >
                  <div className="font-bold text-slate-800">1. Распознавание рекламного поста 🔍</div>
                  <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                    "Приобретайте наши курсы программирования. Скидки -50% для новичков!"
                  </p>
                  <span className="text-[9px] bg-orange-50 text-orange-800 rounded px-1.5 py-0.5 font-black uppercase">ИИ-Детекция: Реклама</span>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="ord-1"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-3 bg-white rounded-xl border border-orange-150 space-y-1.5 text-center py-4"
                >
                  <div className="font-bold text-slate-850">2. Генерация erid токена в ОРД 📡</div>
                  <div className="text-[10px] text-slate-400 font-mono animate-pulse">
                    Отправка договора №9402 в ОРД API...
                  </div>
                  <div className="h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-2/3 mx-auto mt-2 animate-ping" />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="ord-2"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-3 bg-orange-50/20 border border-orange-200 rounded-xl space-y-2"
                >
                  <div className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
                    <span className="text-emerald-500">✔</span> Токен erid напечатан на посте!
                  </div>
                  <div className="p-2 bg-white rounded border border-orange-100 text-[10px] leading-relaxed">
                    "... Скидки -50%. <br/>
                    <span className="text-slate-400 font-mono text-[9px] block border-t mt-1 pt-1 font-bold">
                      Реклама. ООО "ИИ-СММ", ИНН 77039581023, erid: 2VtzquWZbn7
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'watermark':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-pink-600">
              <span>🎨 Вотермарки & Студия Сторис</span>
              <span className="font-mono bg-pink-50 text-pink-700 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="wm-0"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-2"
                >
                  <div className="font-bold text-slate-800">1. Загрузка исходного креатива 🌇</div>
                  <div className="relative h-20 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 text-[10px] border border-dashed border-slate-200">
                    БЕЗ ВОТЕРМАРКИ (Картинка пуста)
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="wm-1"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-3 bg-white rounded-xl border border-pink-100 space-y-2"
                >
                  <div className="font-bold text-slate-850">2. Наложение брендового стимпа 📐</div>
                  <div className="relative h-20 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-lg flex items-center justify-center font-bold text-slate-500 text-[10px]">
                    Яркий Креатив Поста
                    <div className="absolute bottom-1 right-1 p-1 px-1.5 bg-white/95 text-[7px] text-pink-600 font-black rounded border border-pink-100 animate-bounce shadow">
                      © ИИSMM PRO
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="wm-2"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-3 bg-pink-50/15 border border-pink-200 rounded-xl space-y-1.5"
                >
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <span className="text-pink-600">✔</span> 3. Безопасность Stories подтверждена
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal font-medium">
                    Безопасная сетка проверила, что вотермарка расположена за пределами "опасных зон" и не перекрывается кнопками Instagram/VK.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'vp':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-orange-605">
              <span>📁 Модуль Совместного ВП & Папок</span>
              <span className="font-mono bg-orange-100 text-orange-850 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="vp-0"
                  initial={{ opacity: 0, rotate: -2 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 2 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-1.5"
                >
                  <div className="font-bold text-slate-800">1. Объединение 5 авторов 🤝</div>
                  <p className="text-[10px] text-slate-400">Публикуется общая папка, где собраны лучшие блоги по ИИ и разработке.</p>
                  <div className="flex flex-wrap gap-1 text-[8px] font-bold">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-650">@ai_coder</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-650">@neural_design</span>
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-650">@python_dev</span>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="vp-1"
                  initial={{ opacity: 0, rotate: -2 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 2 }}
                  className="p-3 bg-white rounded-xl border border-orange-100 space-y-2 text-center py-4"
                >
                  <div className="font-black text-orange-700 text-[14px]">t.me/addlist/...</div>
                  <p className="text-[10px] text-slate-500 leading-tight">Подписка на все каналы в один клик для подписчиков!</p>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="vp-2"
                  initial={{ opacity: 0, rotate: -2 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 2 }}
                  className="p-3 bg-orange-50/20 border border-orange-200 rounded-xl space-y-1.5"
                >
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <span className="text-emerald-500">✔</span> Органический буст активен!
                  </div>
                  <div className="text-center bg-white border border-orange-100 p-2 rounded-lg font-mono text-[10px]">
                    <span className="text-slate-400 text-[9px] block">Прирост аудитории по закону ВП:</span>
                    <span className="font-black text-orange-605 text-[13px] animate-pulse">+2,480 новых подписчиков</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-pink-600">
              <span>📈 Сквозная UTM-Аналитика & ER</span>
              <span className="font-mono bg-pink-50 text-pink-700 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="an-0"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-1.5"
                >
                  <div className="font-bold text-slate-800">1. Автоматическая UTM-разметка 🔗</div>
                  <div className="bg-slate-50 p-1.5 rounded text-[9px] font-mono text-slate-500 truncate">
                    "https://iismsm.ai/promo?source=telegram&campaign=may_ad"
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="an-1"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="p-3 bg-white rounded-xl border border-pink-100 space-y-1.5"
                >
                  <div className="font-bold text-slate-800">2. Сбор чистых кликов по кнопкам</div>
                  <div className="flex justify-between items-center font-mono text-[11px] bg-pink-50/30 p-1.5 rounded border border-pink-100/40">
                    <span className="font-bold">Кнопка "Купить"</span>
                    <span className="font-black text-pink-600 animate-pulse">482 клика 🌐</span>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="an-2"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  className="p-3 bg-pink-50/15 border border-pink-200 rounded-xl space-y-1.5"
                >
                  <div className="font-bold text-slate-850">3. Умный дашборд вовлечения</div>
                  <div className="flex justify-between items-center font-mono text-[10px] bg-white p-1 rounded border">
                    <span className="text-slate-500">Показатель конверсии:</span>
                    <span className="font-bold text-emerald-600">14.2% (Отлично!) ✔</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case 'bot':
        return (
          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-orange-605">
              <span>🤖 Мобильный пульт управления <a href="https://t.me/iismmAIbot" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-950 transition-colors">@iismmAIbot</a></span>
              <span className="font-mono bg-orange-100 text-orange-850 px-2 py-0.5 rounded">Шаг {step + 1}/3</span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="bt-0"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  className="p-3 bg-white rounded-xl border border-slate-100 space-y-2"
                >
                  <div className="font-bold text-slate-800">1. Запуск сессии в Telegram ✈️</div>
                  <p className="text-[10px] text-slate-500">Система присылает уведомления о выходе постов прямо на ваш смартфон.</p>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="bt-1"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  className="p-3 bg-white rounded-xl border border-orange-100 space-y-2"
                >
                  <div className="font-bold text-slate-850 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-550 animate-ping"></span>
                    <span>Нативное пуш-уведомление</span>
                  </div>
                  <div className="bg-gradient-to-tr from-white to-orange-50/50 text-slate-800 p-2.5 rounded-xl border border-orange-100/70 text-[10px] space-y-1 shadow-xs">
                    <span className="text-orange-600 block font-bold">
                      🔔 Бот <a href="https://t.me/iismmAIbot" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-950">@iismmAIbot</a>:
                    </span>
                    <p className="text-[9px] text-slate-650 font-medium">"Пост в Telegram канале @tech_trends успешно опубликован! Нажата кнопка «Пройти Опрос». ER растет!"</p>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="bt-2"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  className="p-3 bg-orange-50/20 border border-orange-200 rounded-xl space-y-1.5"
                >
                  <div className="font-bold text-slate-800">3. Управление из мессенджера</div>
                  <p className="text-[10px] text-slate-500">Управляйте тарифами, выводите баланс и общайтесь с аудиторией через встроенную консоль.</p>
                  <span className="text-[9px] bg-orange-100 text-orange-900 border border-orange-200/50 px-2.5 py-1 rounded font-black block w-fit">💬 КОНСОЛЬ АКТИВНА</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="apple-liquid-glass rounded-3xl p-5 border border-orange-100 bg-white/40 shadow-xl min-h-[160px] flex flex-col justify-between transition-all duration-300 hover:border-orange-200">
      {renderSimulatorContent()}
      
      {/* Visual slide dots indicating auto scrolling frames */}
      <div className="flex justify-center gap-1.5 pt-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-2 h-1 rounded-full transition-all duration-300 ${
              step === i ? 'w-5 bg-gradient-to-r from-orange-400 to-pink-500' : 'bg-slate-250'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
