import React from 'react';
import ShinyLogo from './ShinyLogo';
import { 
  Play, Radio, FileText, ShoppingBag, Users, BarChart3, Sparkles, ShieldCheck, Heart, LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  tariff: 'free' | 'pro' | 'vip';
  tokens: number;
  iirky: number;
  balanceRub: number;
  userName: string;
  telegramUsername?: string;
}

export default function Sidebar({ 
  currentPath, 
  onNavigate, 
  tariff, 
  tokens, 
  iirky,
  balanceRub,
  userName,
  telegramUsername
}: SidebarProps) {
  const menuItems = [
    { label: 'Быстрый Старт', path: '/start', icon: <Play className="w-4 h-4" /> },
    { label: 'Каналы & Лимиты', path: '/channels', icon: <Radio className="w-4 h-4" /> },
    { label: 'Редактор & ИИ Пост', path: '/posts', icon: <FileText className="w-4 h-4" /> },
    { label: 'Биржа & Лента', path: '/market', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Папки Продвижения', path: '/bundles', icon: <Users className="w-4 h-4" /> },
    { label: 'Кабинет Аналитики', path: '/profile', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const isAdmin = telegramUsername === '@shishkarnem' || userName.toLowerCase().includes('шишкар');
  if (isAdmin) {
    menuItems.push({ label: 'Админ-Центр 👑', path: '/admin', icon: <ShieldCheck className="w-4 h-4 text-rose-500 animate-pulse" /> });
  }

  return (
    <div className="hidden md:flex flex-col w-64 shrink-0 bg-white/20 backdrop-blur-sm border-r border-white/20 h-screen sticky top-0 justify-between p-4 z-20 gap-2">
      
      <div className="space-y-6">
        {/* Geometric Balance brand header */}
        <div className="flex items-center justify-center px-1 pt-1 cursor-pointer" onClick={() => onNavigate('/start')}>
          <ShinyLogo height={38} />
        </div>

        {/* Navigation list in Geometric style */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                id={`btn-sidebar-nav-${item.path.substring(1)}`}
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive 
                    ? 'bg-white/60 text-orange-600 font-bold shadow-sm ring-1 ring-white/50' 
                    : 'text-slate-600 hover:bg-white/40 hover:text-slate-900 transition-colors'
                }`}
              >
                <span className={isActive ? 'text-orange-500' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User balances, statuses, and footer in glassmorphic/orange styling */}
      <div className="space-y-3">
        
        {/* Dynamic balance widget */}
        <div className="bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex justify-between items-center text-[10px] text-orange-600 font-bold uppercase tracking-wider border-b pb-1.5 border-orange-100/50 font-sans">
            <span>Кабинет</span>
            <span className="text-slate-500">{userName.split(' ')[0]}</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-medium">Баланс РК:</span>
              <span className="font-extrabold text-slate-800 font-mono text-xs">{balanceRub} ₽</span>
            </div>
            <div className="relative group flex justify-between items-center cursor-help border-b border-dashed border-orange-200/50 pb-1">
              <span className="text-[10px] text-orange-600 font-bold flex items-center gap-0.5">
                Баланс ИИрок: <span className="text-[9px] text-orange-400 font-normal hover:text-orange-600 transition-colors">(?)</span>
              </span>
              <span className="font-bold text-orange-600 font-mono text-[11px]">🪙 {iirky.toLocaleString()}</span>
              
              {/* Tooltip on hover explaining ИИрки */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 w-52 p-3 bg-slate-900/95 backdrop-blur border border-slate-700 text-white text-[10px] rounded-xl opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-xl z-50 text-left font-normal leading-normal">
                <span className="font-extrabold text-orange-400 block mb-1">🪙 Что такое ИИрки?</span>
                Это токены, которые докупаются отдельно для работы с ИИ. Они используются для автоматического генеративного написания и глубокого рерайта постов.
              </div>
            </div>
          </div>

          <div className="pt-1">
            {tariff === 'vip' ? (
              <div className="flex items-center gap-1 text-[10px] text-amber-600 font-black uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> VIP Активен ⭐
              </div>
            ) : tariff === 'pro' ? (
              <div className="flex items-center gap-1 text-[10px] text-orange-600 font-black uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> PRO Активен ⚡
              </div>
            ) : (
              <div className="text-[10px] text-orange-600 font-black uppercase tracking-wider">
                Тариф: Free (Лимит 3)
              </div>
            )}
          </div>
        </div>

        {tariff === 'free' && (
          <div className="p-3.5 bg-orange-600/10 rounded-2xl border border-orange-200/50">
            <p className="text-[10px] font-extrabold text-orange-700 uppercase tracking-widest mb-1.5">Планы PRO / VIP</p>
            <p className="text-[11px] text-slate-600 leading-tight mb-2.5">Разблокируйте ИИ Рерайт и безлимитный постинг без лимитов</p>
            <button 
              onClick={() => onNavigate('/start')}
              className="w-full py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer text-center"
            >
              Выбрать тариф
            </button>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/20 pt-3">
          <span className="flex items-center gap-1">
            Лицензия ИИSMM &copy; 2026
          </span>
          <span className="font-mono text-[9px]">v1.4.1</span>
        </div>

      </div>

    </div>
  );
}
