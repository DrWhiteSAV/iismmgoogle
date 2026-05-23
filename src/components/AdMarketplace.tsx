import React, { useState } from 'react';
import { AdListing, BulletinAd, SocialNetwork } from '../types';
import { 
  Megaphone, ShoppingBag, Eye, Star, CreditCard, ChevronRight, CheckCircle2, BadgeAlert, Plus, Layers, DollarSign, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdMarketplaceProps {
  adListings: AdListing[];
  bulletinAds: BulletinAd[];
  userTariff: 'free' | 'premium';
  userBalance: number;
  onPostBulletinAd: (ad: Omit<BulletinAd, 'id' | 'createdAt' | 'clicks'>) => void;
  onBuyAdSlot: (listingPrice: number) => void;
  onAddFunds: (amount: number) => void;
  onAdClick: (adId: string) => void;
}

export default function AdMarketplace({
  adListings,
  bulletinAds,
  userTariff,
  userBalance,
  onPostBulletinAd,
  onBuyAdSlot,
  onAddFunds,
  onAdClick
}: AdMarketplaceProps) {
  const [activeTab, setActiveTab] = useState<'exchange' | 'bulletin-feed'>('exchange');

  // Ad slot booking state
  const [bookingListing, setBookingListing] = useState<AdListing | null>(null);
  const [dealTermsAccepted, setDealTermsAccepted] = useState(false);

  // New Bulletin board ad state
  const [showBulletinForm, setShowBulletinForm] = useState(false);
  const [bullTitle, setBullTitle] = useState('');
  const [bullContent, setBullContent] = useState('');
  const [bullLink, setBullLink] = useState('');

  // SMM AD broker exchange escrow logic: 10% commission with transaction security
  const BROKER_COMMISSION_PERCENT = 10;

  const handleBookAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingListing) return;

    if (userBalance < bookingListing.priceRub) {
      if (confirm(`Ваш баланс маловат (${userBalance} ₽). Пополнить на ${bookingListing.priceRub} ₽ для мгновенной сделки по бирже?`)) {
        onAddFunds(bookingListing.priceRub);
        onBuyAdSlot(bookingListing.priceRub);
        setBookingListing(null);
        alert('УСПЕХ: Оплата заблокирована на безопасном эскроу-счете ИИSMM. Сделка поступила в бот-контроллер рекламы!');
      }
      return;
    }

    onBuyAdSlot(bookingListing.priceRub);
    setBookingListing(null);
    alert('УСПЕХ: Оплата заблокирована на безопасном эскроу-счете ИИSMM. Сделка поступила в бот-контроллер рекламы!');
  };

  const handlePostBulletin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bullTitle.trim() || !bullContent.trim() || !bullLink.trim()) {
      alert('Заполните заголовок, текст и ссылку объявления!');
      return;
    }

    // Free users must pay 200 rubles or upgrade to Premium
    if (userTariff === 'free') {
      if (confirm('Размещение в общей ленте без Premium-тарифа стоит 200 ₽ за объявление. Оплатить?')) {
        onAddFunds(200);
      } else {
        return;
      }
    }

    onPostBulletinAd({
      title: bullTitle,
      content: bullContent,
      linkUrl: bullLink,
      postedBy: '@shishkarnem' // Simulated
    });

    setBullTitle('');
    setBullContent('');
    setBullLink('');
    setShowBulletinForm(false);
    alert('Объявление опубликовано на общей доске ИИSMM и уже доступно рекламодателям!');
  };

  return (
    <div className="space-y-6">
      
      {/* Exchange vs Bulletin Feed toggle header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Биржа & Лента Объявлений</h2>
          <p className="text-sm text-slate-500 mt-1">
            Закупайте интеграции безопасно или рекламируйте свои продукты в платной всеобщей ленте.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            id="tab-exchange-listings"
            onClick={() => setActiveTab('exchange')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'exchange' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            📊 Биржа каналов (Безопасная сделка)
          </button>
          <button
            id="tab-bulletin-listings"
            onClick={() => {
              setActiveTab('bulletin-feed');
              setShowBulletinForm(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'bulletin-feed' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-orange-500" />
            Общая лента (Bulletin board)
          </button>
        </div>
      </div>

      {activeTab === 'exchange' ? (
        
        /* THE AD EXCHANGE / ADS BROKERAGE MODULE */
        <div className="space-y-4">
          
          <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 text-xs text-slate-700 leading-normal">
            <span className="p-2.5 bg-white rounded-xl shadow-sm border border-orange-100 text-base">🛡️</span>
            <div className="flex-1">
              <span className="font-bold text-slate-800 block text-[13px]">Безопасная SMM-сделка с эскроу-гарантом</span>
              <span>
                Средства резервируются на балансе и выплачиваются владельцу площадки только после успешного факта публикации и проверки размещения нашим ботом (гарантируем удержание 1/24/48 часов). ИИSMM удерживает 10% за проверку.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adListings.map((list) => (
              <div key={list.id} className="p-5 rounded-2xl bg-white/80 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-white font-mono uppercase">
                      {list.platform}
                    </span>
                    <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {list.priceRub} ₽
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base">{list.channelName}</h4>
                    <span className="text-xs text-slate-400 font-mono">{list.category}</span>
                  </div>

                  <p className="text-xs text-slate-600 italic">"{list.description}"</p>

                  <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2.5 text-xs">
                    <div>
                      <span className="block text-slate-400 text-[10px]">Подписчики</span>
                      <span className="font-bold text-slate-700">{list.subscribersCount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px]">Средний охват</span>
                      <span className="font-bold text-slate-700">{list.avgViews.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100">
                  <button
                    id={`btn-order-ad-${list.id}`}
                    onClick={() => setBookingListing(list)}
                    className="w-full py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Заказать интеграцию
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      ) : (

        /* PREMIUM BULLETIN BOARD OVERALL FEED MODULE */
        <div className="space-y-4">
          
          <div className="flex justify-between items-center bg-white/60 p-4.5 rounded-2xl border border-white/40">
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">Общая рекламная Лента</h3>
              <p className="text-xs text-slate-500">Доступно всем пользователям. Клик на карточку трекает UTM-переходы.</p>
            </div>
            
            {!showBulletinForm && (
              <button
                id="btn-show-bulletin-form"
                onClick={() => setShowBulletinForm(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Разместить объявление
              </button>
            )}
          </div>

          {/* Bulletin form */}
          {showBulletinForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow space-y-4"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1">
                  💡 Сверстать рекламное предложение
                </h4>
                <button 
                  id="btn-close-bulletin-form"
                  onClick={() => setShowBulletinForm(false)}
                  className="text-slate-400 text-lg cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handlePostBulletin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Заголовок предложения</label>
                  <input 
                    id="input-bulletin-title"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Напр. Взаимный пиар или Продажа мест в TG ботах"
                    value={bullTitle}
                    onChange={(e) => setBullTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">URL Перехода (куда ведет объявление)</label>
                    <input 
                      id="input-bulletin-url"
                      type="url"
                      required
                      placeholder="https://t.me/your_channel"
                      value={bullLink}
                      onChange={(e) => setBullLink(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white font-mono"
                    />
                  </div>
                  <div className="flex items-center p-3.5 bg-slate-50 border rounded-xl text-[11px] text-slate-500">
                    ℹ️ Для <span className="font-bold text-emerald-600 mx-1">Premium</span> бесплатно. Свободные тарифы берут 200 ₽ разово.
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Текст рекламного оффера</label>
                  <textarea 
                    id="textarea-bulletin-content"
                    rows={3}
                    required
                    placeholder="Напишите подробный цепляющий оффер рекламного предложения..."
                    value={bullContent}
                    onChange={(e) => setBullContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white resize-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    id="btn-submit-bulletin"
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-transform active:scale-95"
                  >
                    Разместить на Bulletin Board
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* List of active Ads */}
          <div className="space-y-3">
            {bulletinAds.map((ad) => (
              <div 
                key={ad.id} 
                onClick={() => onAdClick(ad.id)}
                className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm hover:shadow transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-100 text-orange-700">
                      PREMIUM SPONSOR
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Размещено {ad.postedBy} • {new Date(ad.createdAt).toLocaleString()}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm">{ad.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{ad.content}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-center md:text-right">
                    <span className="block text-[10px] text-slate-400">Переходы</span>
                    <span className="font-bold text-slate-800 text-xs">{ad.clicks} кликов</span>
                  </div>
                  
                  <a 
                    id={`btn-click-bulletin-ad-${ad.id}`}
                    href={ad.linkUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="px-3 py-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <span>Перейти</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Booking Checkout Modal */}
      <AnimatePresence>
        {bookingListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5 border border-slate-100 space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-rose-100">
                <h4 className="font-extrabold text-sm text-slate-850">Резервирование по Бирже</h4>
                <button 
                  id="btn-close-ad-booking-modal"
                  onClick={() => setBookingListing(null)}
                  className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleBookAdSubmit} className="space-y-4">
                <div className="p-3 bg-slate-50 border rounded-xl text-xs space-y-2">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Площадка:</span>
                    <span>{bookingListing.channelName}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>Цена для Вас:</span>
                    <span className="text-orange-600">{bookingListing.priceRub} ₽</span>
                  </div>
                  <div className="text-[10px] text-slate-400 italic">
                    *Включает налог и техническую гарантию сделки. Комиссия биржи (10%) списывается с получателя со стороны партнера.
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-600">Ссылка на рекламный креатив/пост:</span>
                  <input 
                    id="input-ad-creative-link"
                    type="text"
                    required
                    placeholder="Напр. Ссылка на пост в ваших черновиках или файл"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    id="checkbox-accept-deal-terms"
                    type="checkbox"
                    required
                    checked={dealTermsAccepted}
                    onChange={(e) => setDealTermsAccepted(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-orange-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 leading-normal">Соглашаюсь с резервированием баланса на время публикации.</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    id="btn-ad-booking-cancel"
                    type="button" 
                    onClick={() => setBookingListing(null)}
                    className="py-2.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold"
                  >
                    Назад
                  </button>
                  <button 
                    id="btn-ad-booking-submit"
                    type="submit" 
                    disabled={!dealTermsAccepted}
                    className="py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Заблокировать и купить
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
