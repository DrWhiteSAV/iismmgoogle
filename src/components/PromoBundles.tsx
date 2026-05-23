import React, { useState } from 'react';
import { PromoBundle } from '../types';
import { 
  Users, FolderLock, PlusCircle, Check, DollarSign, Wallet, ShieldAlert, Sparkles, Gift, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromoBundlesProps {
  bundles: PromoBundle[];
  joinedChannelsIds: string[];
  onAddBundle: (bundle: Omit<PromoBundle, 'id' | 'channelsCount' | 'joinedChannels'>) => void;
  onJoinBundle: (bundleId: string, channelId: string) => void;
  userBalance: number;
  userChannels: Array<{ id: string; name: string; username: string; platform: string }>;
  onAddFunds: (amount: number) => void;
}

export default function PromoBundles({
  bundles,
  joinedChannelsIds,
  onAddBundle,
  onJoinBundle,
  userBalance,
  userChannels,
  onAddFunds
}: PromoBundlesProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [rules, setRules] = useState('');
  const [entryFee, setEntryFee] = useState(200);
  const [maxChannels, setMaxChannels] = useState(10);
  const [selectedChannelForJoin, setSelectedChannelForJoin] = useState('');
  const [activeJoinBundleId, setActiveJoinBundleId] = useState<string | null>(null);

  // Financial commission display calculator (SMM commission logic)
  const COMMISSION_PERCENT = 15;
  const organizerCommission = 100 - COMMISSION_PERCENT;

  // Active collection categories
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'vp-folders' | 'weekly-directory'>('vp-folders');
  const [directoryJoined, setDirectoryJoined] = useState(false);

  const totalMembersValue = maxChannels - 1; 
  const potentialTotalRub = totalMembersValue * entryFee;
  const ourCommissionRub = Math.round(potentialTotalRub * (COMMISSION_PERCENT / 100));
  const organizerEarningsRub = potentialTotalRub - ourCommissionRub;

  // Form handle
  const handleCreateBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rules.trim()) {
      alert('Заполните название и правила взаимного продвижения!');
      return;
    }

    onAddBundle({
      title,
      organizerUsername: '@shishkarnem', // Simulation
      rules,
      entryFeeRub: Number(entryFee),
      maxChannels: Number(maxChannels),
      status: 'collecting',
      isFreeForOrganizer: true
    });

    setTitle('');
    setRules('');
    setEntryFee(200);
    setMaxChannels(10);
    setShowCreateForm(false);
  };

  const startJoinBundle = (bundleId: string) => {
    if (userChannels.length === 0) {
      alert('Сначала добавьте хотя бы один канал на вкладке "Каналы"!');
      return;
    }
    setActiveJoinBundleId(bundleId);
    setSelectedChannelForJoin(userChannels[0].id);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJoinBundleId) return;

    const bundle = bundles.find(b => b.id === activeJoinBundleId);
    if (!bundle) return;

    if (bundle.entryFeeRub > 0 && userBalance < bundle.entryFeeRub) {
      // Simulate funds insertion warning on checkout
      if (confirm(`Ваш баланс слишком мал (${userBalance} ₽). Пополнить баланс на ${bundle.entryFeeRub} ₽ для участия в продвижении?`)) {
        onAddFunds(bundle.entryFeeRub);
        onJoinBundle(activeJoinBundleId, selectedChannelForJoin);
        setActiveJoinBundleId(null);
        alert('Баланс пополнен, вы успешно вошли в сборные папки продвижения!');
      }
      return;
    }

    onJoinBundle(activeJoinBundleId, selectedChannelForJoin);
    setActiveJoinBundleId(null);
    alert('Канал успешно добавлен в папку взаимного продвижения! Бот отправит правила оформления публикации.');
  };

  return (
    <div className="space-y-6">
      
      {/* View Selector and banner ads */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Подборки и Продвижение</h2>
          <p className="text-sm text-slate-500 mt-1">Организуйте совместный рост, собирайте взносы или бесплатно участвуйте в еженедельных каталогах.</p>
        </div>
        
        <div className="flex gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200">
          <button
            id="tab-vp-folders"
            onClick={() => setActiveCategoryFilter('vp-folders')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
              activeCategoryFilter === 'vp-folders' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            📂 Взаимные папки (Оплата/Взносы)
          </button>
          <button
            id="tab-weekly"
            onClick={() => setActiveCategoryFilter('weekly-directory')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1 ${
              activeCategoryFilter === 'weekly-directory' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-orange-500" />
            Еженедельный Топ (Бесплатно)
          </button>
        </div>
      </div>

      {activeCategoryFilter === 'weekly-directory' ? (
        
        /* 100% FREE WEEKLY DIRECTORY MODULE */
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-indigo-500/10 border border-emerald-100 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600 block">✨</span>
              <h3 className="font-extrabold text-slate-800 text-base">Еженедельная бесплатная подборка каналов ИИSMM</h3>
            </div>
            <p className="text-sm text-slate-600 leading-normal max-w-3xl">
              Наш алгоритм собирает лучшие каналы по категориям и транслирует их в специальном встроенном каталоге. Участие гарантирует бесплатные переходы читателей из сторонних блогов без каких-либо взносов!
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 list-disc list-inside">
              <li>Обновление списка каждую пятницу в 12:00 по МСК</li>
              <li>Бесплатный UTM-трекер переходов включен для каждого участника</li>
              <li>Прямые переходы без скрытых комиссий</li>
            </ul>

            <div className="pt-2">
              {directoryJoined ? (
                <div className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <Check className="w-4 h-4" /> Вы подали заявку! Канал появится в следующей еженедельной подборке беспрепятственно.
                </div>
              ) : (
                <button
                  id="btn-join-weekly-direct"
                  type="button"
                  onClick={() => setDirectoryJoined(true)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                >
                  Подать заявку бесплатно (Всегда 0 ₽)
                </button>
              )}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-white/40 space-y-4">
            <h4 className="font-bold text-slate-800 text-sm">Пример готовой подборки для трансляции в мессенджерах</h4>
            
            {/* Visual template from bottom screenshots */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-w-lg space-y-3">
              <p className="text-xs text-slate-700 italic font-mono bg-white p-2.5 rounded-lg border border-slate-100 font-bold leading-relaxed">
                *ТОП КАНАЛОВ ДЛЯ ПРЕДПРИНИМАТЕЛЕЙ. Рекомендую!!!*<br />
                Реально затягивает. Даю немного, так как читаю их ежедневно самостоятельно. В каждом канале вы точно найдёте что-то своё!
              </p>
              
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg border border-slate-100 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">AI для бизнеса 🤖</span>
                    <span className="text-[10px] text-slate-400 font-mono">https://t.me/AI_and_Business</span>
                  </div>
                  <span className="text-[10px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded font-bold">11,200 подписчиков</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Botmother 👾</span>
                    <span className="text-[10px] text-slate-400 font-mono">https://t.me/botmothercom</span>
                  </div>
                  <span className="text-[10px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded font-bold">4,800 подписчиков</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : (

        /* VALUE CARD FOR MUTUAL DIRECTORY DIRECTORS AND HOSTS */
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Split rules and instructions */}
            <div className="bg-white/80 border border-white/40 backdrop-blur pb-4 rounded-xl p-5 space-y-3.5">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                <FolderLock className="w-5 h-5 text-orange-500" />
                Папки взаимного продвижения (Vzaimopiar)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Создайте или вступайте в закрытые папки продвижения. Участники добавляют свои каналы и вносят установленный взнос. ИИSMM берет на себя автоматическое урегулирование постов и начисление балансов.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="block text-slate-400">Для Организатора</span>
                  <span className="font-bold text-emerald-600">Всегда БЕСПЛАТНО</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="block text-slate-400">Наша комиссия</span>
                  <span className="font-bold text-orange-600">Всего 15% с взносов</span>
                </div>
              </div>
            </div>

            {/* Simulated Balance Box to trigger funding */}
            <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-100 rounded-xl p-5 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ваш рекламный баланс</span>
                <span className="text-2xl font-black text-slate-800">{userBalance} ₽</span>
                <p className="text-[11px] text-slate-500">Доходы от участников ваших папок и средства на оплату входов.</p>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  id="btn-add-balance-demo-1000"
                  onClick={() => onAddFunds(1000)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm cursor-pointer"
                >
                  Пополнить на +1000 ₽
                </button>
              </div>
            </div>

          </div>

          {/* Creation triggers */}
          {!showCreateForm ? (
            <div className="flex justify-end">
              <button
                id="btn-show-create-bundle"
                onClick={() => setShowCreateForm(true)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Организовать новый платный сбор</span>
              </button>
            </div>
          ) : (
            
            /* CREATE COMPACT FORM WITH LIVE BUDGET MATRIX logic #8 */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4"
            >
              <div className="flex justify-between items-center border-b border-rose-100 pb-2.5">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <span>📂</span> Параметры рекламной подборки
                </h4>
                <button 
                  id="btn-cancel-create-bundle"
                  onClick={() => setShowCreateForm(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer font-medium"
                >
                  Отмена
                </button>
              </div>

              <form onSubmit={handleCreateBundle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Название папки взаимного пиара</label>
                    <input 
                      id="input-bundle-title"
                      type="text"
                      required
                      placeholder="Напр. ТОП Блоги по инвестициям"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Взнос участника (₽)</label>
                    <input 
                      id="input-bundle-fee"
                      type="number"
                      required
                      min={0}
                      placeholder="От 100 до 10000"
                      value={entryFee}
                      onChange={(e) => setEntryFee(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Макс. число участников (блогов)</label>
                    <input 
                      id="input-bundle-max-channels"
                      type="number"
                      required
                      min={3}
                      value={maxChannels}
                      onChange={(e) => setMaxChannels(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white font-mono"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 block">Правила папки (обязательства к репосту)</label>
                    <textarea 
                      id="textarea-bundle-rules"
                      rows={2}
                      required
                      placeholder="Напр. Держать в закрепе 3 часа после публикации; не удалять из канала 2 дня; бот ИИSMM проверяет соблюдение..."
                      value={rules}
                      onChange={(e) => setRules(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Live commission calculator visual grid */}
                <div className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/20 text-xs space-y-2">
                  <div className="font-bold text-slate-700 flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" /> Сбор оплат с участников (Демонстрационная смета):
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="bg-white p-2 border border-slate-100 rounded-lg">
                      <span className="block text-slate-400">Общий бюджет взносов</span>
                      <span className="font-bold text-slate-800 font-mono">{potentialTotalRub} ₽</span>
                    </div>
                    <div className="bg-white p-2 border border-slate-100 rounded-lg">
                      <span className="block text-slate-400">Комиссия ИИSMM (15%)</span>
                      <span className="font-bold text-orange-600 font-mono">-{ourCommissionRub} ₽</span>
                    </div>
                    <div className="bg-white p-2 border border-slate-100 rounded-lg">
                      <span className="block text-slate-400">Ваш чистый сбор (85%)</span>
                      <span className="font-bold text-indigo-600 font-mono">{organizerEarningsRub} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    id="btn-submit-create-bundle"
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Запустить бесплатный сбор как Организатор
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* List of VP active channels folders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bundles.map((bundle) => {
              const userHasJoined = bundle.joinedChannels.some(id => joinedChannelsIds.includes(bundle.id + '-' + id));
              return (
                <div key={bundle.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                        Взносы: {bundle.entryFeeRub} ₽
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                        <Users className="w-3.5 h-3.5" />
                        {bundle.channelsCount}/{bundle.maxChannels} участников
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-800 text-base">{bundle.title}</h4>
                    <p className="text-slate-500 text-xs font-mono">Организатор: {bundle.organizerUsername}</p>
                    
                    <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                      <span className="font-bold text-slate-700 block text-[10px] tracking-wider uppercase">Обязательства:</span>
                      <p className="leading-relaxed font-sans">{bundle.rules}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {bundle.isFreeForOrganizer && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          Оргам бесплатно!
                        </span>
                      )}
                    </div>

                    {userHasJoined ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-1 shadow-sm">
                        <Check className="w-4 h-4" /> Вы участник
                      </span>
                    ) : (
                      <button
                        id={`btn-join-bundle-${bundle.id}`}
                        onClick={() => startJoinBundle(bundle.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95 ${
                          bundle.entryFeeRub > 0 
                            ? 'bg-slate-900 text-white hover:bg-slate-800' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {bundle.entryFeeRub > 0 ? `Вступить (${bundle.entryFeeRub} ₽)` : 'Вступить бесплатно'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Select Channel popout for entry fee joining */}
      <AnimatePresence>
        {activeJoinBundleId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-rose-100 text-slate-800">
                <h4 className="font-extrabold text-sm">Выберите Ваш канал для продвижения</h4>
                <button 
                  id="btn-close-join-modal"
                  onClick={() => setActiveJoinBundleId(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 block">Канал для публикации подборки:</label>
                  <select 
                    id="select-channel-to-join"
                    value={selectedChannelForJoin}
                    onChange={(e) => setSelectedChannelForJoin(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none bg-white font-medium"
                  >
                    {userChannels.map(c => (
                      <option key={c.id} value={c.id}>{c.platform.toUpperCase()} - {c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-rose-50 border border-slate-100 rounded-xl flex items-start gap-2 text-xs text-rose-700">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Назначенные правила</span>
                    <p className="mt-0.5">Вступая, вы соглашаетесь с удержанием комиссии и обязательным размещением постов папки по расписанию бота.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    id="btn-cancel-join-submit"
                    type="button" 
                    onClick={() => setActiveJoinBundleId(null)}
                    className="py-2 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold"
                  >
                    Отмена
                  </button>
                  <button 
                    id="btn-confirm-join-submit"
                    type="submit" 
                    className="py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  >
                    Подтвердить и Оплатить
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
