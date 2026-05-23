import React, { useState } from 'react';
import { SocialChannel, SocialNetwork } from '../types';
import { 
  Plus, Check, AlertTriangle, ShieldCheck, ArrowRight, Sparkles, CreditCard, ExternalLink, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChannelListProps {
  channels: SocialChannel[];
  onAddChannel: (channel: Omit<SocialChannel, 'id' | 'subscribers' | 'isPremium' | 'status'>) => boolean | string;
  onRemoveChannel: (id: string) => void;
  tariff: 'free' | 'premium';
  userBalance: number;
  onBuySlot: (slotsCount: number) => void;
}

const NETWORK_LABELS: Record<SocialNetwork, { name: string; icon: string; bg: string; text: string }> = {
  telegram: { name: 'Telegram', icon: '✈️', bg: 'bg-sky-500/10 hover:bg-sky-500/20', text: 'text-sky-600' },
  vk: { name: 'ВКонтакте', icon: '🔵', bg: 'bg-blue-600/10 hover:bg-blue-600/20', text: 'text-blue-600' },
  max: { name: 'Max (Social)', icon: 'Ⓜ️', bg: 'bg-indigo-600/10 hover:bg-indigo-600/20', text: 'text-indigo-600' },
  instagram: { name: 'Instagram', icon: '📸', bg: 'bg-pink-600/10 hover:bg-pink-600/20', text: 'text-pink-600' },
  facebook: { name: 'Facebook', icon: '🔷', bg: 'bg-blue-700/10 hover:bg-blue-700/20', text: 'text-blue-700' },
  pinterest: { name: 'Pinterest', icon: '📌', bg: 'bg-red-600/10 hover:bg-red-600/20', text: 'text-red-600' },
  linkedin: { name: 'LinkedIn', icon: '💼', bg: 'bg-sky-700/10 hover:bg-sky-700/20', text: 'text-sky-700' },
  discord: { name: 'Discord', icon: '👾', bg: 'bg-indigo-500/10 hover:bg-indigo-500/20', text: 'text-indigo-500' },
  x: { name: 'X (Twitter)', icon: '🐦', bg: 'bg-slate-900/10 hover:bg-slate-900/20', text: 'text-slate-900' },
  ok: { name: 'Одноклассники', icon: '🟠', bg: 'bg-orange-500/10 hover:bg-orange-500/20', text: 'text-orange-500' },
  tenchat: { name: 'TenChat', icon: '🔴', bg: 'bg-red-500/10 hover:bg-red-500/20', text: 'text-red-500' },
  dzen: { name: 'Яндекс.Дзен', icon: '☯️', bg: 'bg-amber-600/10 hover:bg-amber-600/20', text: 'text-amber-700' },
  setka: { name: 'Сетка', icon: '🕸️', bg: 'bg-emerald-600/10 hover:bg-emerald-600/20', text: 'text-emerald-700' }
};

export default function ChannelList({ 
  channels, 
  onAddChannel, 
  onRemoveChannel, 
  tariff, 
  userBalance,
  onBuySlot 
}: ChannelListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [platform, setPlatform] = useState<SocialNetwork>('telegram');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('Бизнес/Маркетинг');
  const [errorMsg, setErrorMsg] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'plan' | 'pay' | 'success'>('plan');
  const [slotsToBuy, setSlotsToBuy] = useState(1);
  
  // Simulated Card Info
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const freeLimit = 3;
  const isOverLimit = channels.length >= freeLimit && tariff === 'free';

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      setErrorMsg('Пожалуйста, введите название и ссылку/username канала');
      return;
    }

    if (isOverLimit) {
      setErrorMsg('У вас исчерпан лимит бесплатных каналов (максимум 3). Купите дополнительный слот или Premium подписку!');
      setShowCheckoutModal(true);
      return;
    }

    const cleanUsername = username.startsWith('@') ? username : `@${username}`;
    const result = onAddChannel({
      name,
      username: cleanUsername,
      platform,
      category
    });

    if (typeof result === 'string') {
      setErrorMsg(result);
    } else {
      setName('');
      setUsername('');
      setErrorMsg('');
      setShowAddForm(false);
    }
  };

  const executeBuySlot = () => {
    setCheckoutStep('pay');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBuySlot(slotsToBuy);
    setCheckoutStep('success');
  };

  return (
    <div className="space-y-6">
      {/* Header and Tariff summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Подключенные каналы</h2>
          <p className="text-sm text-slate-500 mt-1">
            Управляйте источниками публикации. Подключено: <span className="font-semibold text-slate-700">{channels.length}</span> из {" "}
            <span className="font-semibold text-slate-700">{tariff === 'premium' ? 'безлимита' : `${freeLimit}`}</span> (Бесплатно)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {tariff === 'free' ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <span className="px-3 py-1.5 text-xs font-semibold bg-orange-100 text-orange-600 rounded-lg text-center">
                Тариф: Free (Лимит 3 канала)
              </span>
              <button 
                id="btn-upgrade-to-premium"
                onClick={() => {
                  setSlotsToBuy(1);
                  setCheckoutStep('plan');
                  setShowCheckoutModal(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer justify-center"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Расширить лимиты
              </button>
            </div>
          ) : (
            <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-600 rounded-lg flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4" /> Тариф: PREMIUM (Безлимитный SMM)
            </span>
          )}
        </div>
      </div>

      {/* Grid of existing channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((channel) => {
          const info = NETWORK_LABELS[channel.platform] || { name: channel.platform, icon: '🔗', bg: 'bg-slate-100', text: 'text-slate-600' };
          return (
            <motion.div 
              layout
              key={channel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-xl bg-white/80 border border-white/40 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${info.bg} ${info.text}`}>
                    <span>{info.icon}</span>
                    <span>{info.name}</span>
                  </span>
                  <button 
                    id={`btn-remove-channel-${channel.id}`}
                    onClick={() => onRemoveChannel(channel.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium py-1 px-2 rounded hover:bg-red-50 cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
                
                <h3 className="font-bold text-slate-800 text-base mt-3 flex items-center gap-1.5">
                  {channel.name} 
                  {channel.isPremium && <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400" />}
                </h3>
                <p className="text-sm font-mono text-slate-500">{channel.username}</p>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-2 text-slate-500">
                  <div>
                    <span className="block text-slate-400">Подписчики</span>
                    <span className="font-semibold text-slate-700">{channel.subscribers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Категория</span>
                    <span className="font-semibold text-slate-700 truncate block max-w-[100px]">{channel.category}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Автопостинг готов
                </span>
                <span className="text-slate-400 italic">200 ₽/мес свыше лимита</span>
              </div>
            </motion.div>
          );
        })}

        {/* Action card for Add Channel */}
        {!showAddForm && (
          <button 
            id="btn-show-add-channel-form"
            onClick={() => setShowAddForm(true)}
            className="p-5 rounded-xl border-2 border-dashed border-slate-300 hover:border-orange-400 bg-white/40 hover:bg-white/60 text-slate-600 hover:text-orange-500 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-full min-h-[160px]"
          >
            <div className="p-3 bg-white/80 rounded-full shadow-sm mb-2 text-orange-500">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm">Подключить канал / группу</span>
            <p className="text-xs text-slate-400 mt-1">Поддерживаем 11 платформ, включая TG, VK, X и др.</p>
          </button>
        )}
      </div>

      {/* Add channel Form Drawer/Tab */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="p-5 rounded-2xl bg-white/90 border border-white/50 shadow-md space-y-4"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <span className="text-base">🚀</span> Подключение нового источника
              </h3>
              <button 
                id="btn-close-add-form"
                onClick={() => {
                  setShowAddForm(false);
                  setErrorMsg('');
                }}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
              >
                Отмена
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateChannel} className="space-y-4">
              {/* Social Platform grid selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Выберите социальную сеть / платформу</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {(Object.keys(NETWORK_LABELS) as SocialNetwork[]).map((net) => {
                    const active = platform === net;
                    const items = NETWORK_LABELS[net];
                    return (
                      <button
                        id={`btn-select-platform-${net}`}
                        key={net}
                        type="button"
                        onClick={() => {
                          setPlatform(net);
                          setErrorMsg('');
                        }}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                          active 
                            ? 'border-orange-400 bg-orange-50 text-orange-600 ring-2 ring-orange-200 shadow-sm' 
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-2xl mb-1">{items.icon}</span>
                        <span className="text-xs font-medium truncate w-full">{items.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600">Название канала или паблика</label>
                  <input 
                    id="input-new-channel-name"
                    type="text"
                    required
                    placeholder="Напр. SMM Тренды"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none bg-white font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600">Юзернейм ссылки / ID канала</label>
                  <input 
                    id="input-new-channel-username"
                    type="text"
                    required
                    placeholder="Напр. t.me/smm_trends или @trends"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none bg-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600">Тематика канала</label>
                  <select 
                    id="select-new-channel-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none bg-white font-medium"
                  >
                    <option value="Бизнес/Маркетинг">Бизнес / Маркетинг</option>
                    <option value="Юмор/Развлечения">Юмор / Развлечения</option>
                    <option value="Технологии/ИИ">Технологии / ИИ</option>
                    <option value="Спорт/Здоровье">Спорт / Здоровье</option>
                    <option value="Криптовалюта">Криптовалюта</option>
                    <option value="Дизайн/Учеба">Дизайн / Учеба</option>
                    <option value="Новостной">Новостной</option>
                  </select>
                </div>
              </div>

              {/* Enforced platform manuals for Dzen & Setka in 3 click connection */}
              {(platform === 'dzen' || platform === 'setka') && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                    <HelpCircle className="w-4 h-4 text-blue-500" /> Подключение {NETWORK_LABELS[platform].name} в 3 простых клика:
                  </p>
                  <ol className="list-decimal list-inside pl-1 space-y-1 leading-relaxed">
                    <li>Откройте вашего бота управления в {NETWORK_LABELS[platform].name} Console.</li>
                    <li>Добавьте Вебхук адрес: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono break-all font-bold">https://iismm.ru/webhook/channel</code> в настройках.</li>
                    <li>Отправьте команду <code className="bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">/connect {username || '@username'}</code> боту — и готово!</li>
                  </ol>
                  <p className="text-[10px] text-slate-400 italic">Службы Дзен и Сетка работают без сторонних API ключей абсолютно со всеми авто-ботами.</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  id="btn-submit-add-channel"
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Добавить в комбайн</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slots Checkout Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <h3 className="font-bold text-lg">Расширение лимитов ИИSMM</h3>
                </div>
                <button 
                  id="btn-close-checkout-modal"
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-white/80 hover:text-white font-bold text-xl cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Modal body based on Checkout State */}
              <div className="p-5 space-y-4">
                {checkoutStep === 'plan' && (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Бесплатный тариф позволяет держать до 3 подключенных каналов. Вы можете снять ограничение, добавив слоты или оформив Premium-подписку.
                    </p>

                    <div className="border border-slate-100 rounded-xl p-3.5 bg-slate-50">
                      <h4 className="font-bold text-slate-800 text-sm mb-1.5">Вариант 1: Дополнительные слоты</h4>
                      <p className="text-xs text-slate-500 mb-3">Каждый дополнительный канал будет стоить всего 150 ₽ разово!</p>
                      
                      <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-xs font-semibold text-slate-600">Количество слотов:</span>
                        <div className="flex items-center gap-1.5">
                          <button 
                            id="btn-decrement-slots"
                            type="button" 
                            onClick={() => setSlotsToBuy(Math.max(1, slotsToBuy - 1))}
                            className="w-7 h-7 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-600 disabled:opacity-40"
                            disabled={slotsToBuy <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-800">{slotsToBuy}</span>
                          <button 
                            id="btn-increment-slots"
                            type="button" 
                            onClick={() => setSlotsToBuy(slotsToBuy + 1)}
                            className="w-7 h-7 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3.5 flex justify-between items-center text-xs text-slate-700 font-bold">
                        <span>Итого к оплате:</span>
                        <span className="text-base text-orange-600">{slotsToBuy * 150} ₽</span>
                      </div>
                    </div>

                    <button 
                      id="btn-checkout-proceed-slots"
                      onClick={executeBuySlot}
                      className="w-full py-2.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Купить {slotsToBuy} {slotsToBuy === 1 ? 'слот' : 'слота'} за {slotsToBuy * 150} ₽</span>
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-3 text-xs text-slate-400 font-semibold uppercase">или</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/50 text-center space-y-2">
                      <div className="font-extrabold text-slate-800 text-sm">🔥 Безлимитный Premium План</div>
                      <p className="text-xs text-slate-600">Без ограничений на количество каналов, доступ к ИИ-рерайту, автогенерации и автовыбору хэштегов!</p>
                      <div className="text-lg font-bold text-slate-900">490 ₽ / месяц</div>
                      <button 
                        id="btn-checkout-premium-option"
                        onClick={() => {
                          setSlotsToBuy(5); // Simulate substantial premium slots or unlock
                          executeBuySlot();
                        }}
                        className="py-1.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-lg shadow-sm w-full cursor-pointer"
                      >
                        Подключить Premium за 490 ₽
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'pay' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <h4 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Введите реквизиты оплаты (Симуляция)</h4>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Номер банковской карты</label>
                        <input 
                          id="input-card-number"
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4276 3800 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Срок действия</label>
                          <input 
                            id="input-card-expiry"
                            type="text"
                            required
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none font-mono text-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CVV код</label>
                          <input 
                            id="input-card-cvv"
                            type="password"
                            required
                            maxLength={3}
                            placeholder="***"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-orange-400 focus:outline-none font-mono text-center"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-500 text-center leading-relaxed">
                      🔒 Все операции проходят через сертифицированный шлюз и защищены 3D-Secure.
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button 
                        id="btn-checkout-back"
                        type="button" 
                        onClick={() => setCheckoutStep('plan')}
                        className="py-2.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg cursor-pointer text-center"
                      >
                        Назад
                      </button>
                      <button 
                        id="btn-submit-payment"
                        type="submit" 
                        className="py-2.5 text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 font-bold rounded-lg cursor-pointer"
                      >
                        Оплатить
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="inline-flex p-3.5 bg-emerald-100 text-emerald-600 rounded-full mb-1 border border-emerald-200">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-lg">Успешная транзакция!</h4>
                      <p className="text-sm text-slate-500 mt-1">Ограничения успешно обновлены. Ваши слоты на ИИSMM добавлены в профиль.</p>
                    </div>
                    <button 
                      id="btn-close-checkout-success"
                      onClick={() => {
                        setShowCheckoutModal(false);
                        setCheckoutStep('plan');
                        setErrorMsg('');
                      }}
                      className="inline-flex px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow hover:bg-slate-800 cursor-pointer"
                    >
                      Начать постинг
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
