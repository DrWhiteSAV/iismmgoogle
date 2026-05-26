import React from 'react';
import { 
  Play, Radio, FileText, ShoppingBag, FolderHeart, BarChart3, HelpCircle, Users
} from 'lucide-react';

interface BottomNavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  tariff: 'free' | 'pro' | 'vip';
}

export default function BottomNavbar({ currentPath, onNavigate, tariff }: BottomNavbarProps) {
  const navItems = [
    { label: 'Старт', path: '/start', icon: <Play className="w-5 h-5" /> },
    { label: 'Каналы', path: '/channels', icon: <Radio className="w-5 h-5" /> },
    { label: 'Контент', path: '/posts', icon: <FileText className="w-5 h-5" /> },
    { label: 'Биржа', path: '/market', icon: <ShoppingBag className="w-5 h-5" /> },
    { label: 'Папки', path: '/bundles', icon: <Users className="w-5 h-5" /> },
    { label: 'Кабинет', path: '/profile', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/40 backdrop-blur-md border-t border-white/40 shadow-xl pb-safe-bottom">
      <nav id="bottom-navbar" className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              id={`btn-bottom-nav-${item.path.substring(1)}`}
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[48px] text-center transition-all cursor-pointer ${
                isActive 
                  ? 'text-orange-600 font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-white/60 text-orange-55 shadow-xs' : 'text-slate-400'}`}>
                {item.icon}
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight font-sans truncate max-w-[55px] uppercase font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
