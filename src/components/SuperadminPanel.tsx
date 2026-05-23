import React, { useState } from 'react';
import { 
  Users, Trash2, Shield, Plus, ToggleLeft, ToggleRight, Sparkles, AlertCircle, CheckCircle, Database, Coins, TrendingUp, Settings2, HelpCircle 
} from 'lucide-react';
import { UserAccount } from '../types';

interface SuperadminPanelProps {
  currentUser: UserAccount;
  onUpdateCurrentUser: (updated: UserAccount) => void;
  allChannelsCount: number;
}

interface SimulatedUser {
  id: string;
  name: string;
  telegramUsername: string;
  telegramId: string;
  tariff: 'free' | 'premium';
  tokens: number;
  balanceRub: number;
  earningsRub: number;
  channelsCount: number;
  status: 'active' | 'suspended';
}

export default function SuperadminPanel({ 
  currentUser, 
  onUpdateCurrentUser,
  allChannelsCount
}: SuperadminPanelProps) {
  // Initialize simulated users database
  const [users, setUsers] = useState<SimulatedUser[]>([
    {
      id: 'usr-928',
      name: currentUser.name,
      telegramUsername: currentUser.telegramUsername,
      telegramId: '169262990',
      tariff: currentUser.tariff,
      tokens: currentUser.tokens,
      balanceRub: currentUser.balanceRub,
      earningsRub: currentUser.earningsRub,
      channelsCount: allChannelsCount,
      status: 'active'
    },
    {
      id: 'usr-412',
      name: 'SAV AI Developer',
      telegramUsername: '@SAV_AI',
      telegramId: '412451551',
      tariff: 'premium',
      tokens: 340,
      balanceRub: 1500,
      earningsRub: 23000,
      channelsCount: 4,
      status: 'active'
    },
    {
      id: 'usr-887',
      name: 'Ботмазер Администратор',
      telegramUsername: '@botmothercom',
      telegramId: '887291122',
      tariff: 'free',
      tokens: 50,
      balanceRub: 0,
      earningsRub: 0,
      channelsCount: 1,
      status: 'active'
    },
    {
      id: 'usr-981',
      name: 'Алексей Тест-блог',
      telegramUsername: '@test_blogger',
      telegramId: '981125211',
      tariff: 'premium',
      tokens: 1000,
      balanceRub: 2400,
      earningsRub: 4500,
      channelsCount: 5,
      status: 'active'
    },
    {
      id: 'usr-552',
      name: 'Мария SMM Контент',
      telegramUsername: '@masha_smm',
      telegramId: '552124511',
      tariff: 'free',
      tokens: 12,
      balanceRub: 80,
      earningsRub: 600,
      channelsCount: 2,
      status: 'active'
    }
  ]);

  // System statistics
  const [stats, setStats] = useState({
    apiRequests: 12480,
    totalRevenueRub: 54930,
    failedPosts: 4,
    aiSuccessfulRewrites: 342,
    botToken: '8897583774:AAGWCOVN0_mQ6V7L5UnnmkzZAqfaPkDSkk4',
    botName: '@iismmAIbot',
    webhookStatus: 'active',
  });

  // New user form state
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserTg, setNewUserTg] = useState('');
  const [newUserTgId, setNewUserTgId] = useState('');
  const [newUserTariff, setNewUserTariff] = useState<'free' | 'premium'>('free');
  const [newUserTokens, setNewUserTokens] = useState(100);
  const [newUserBalance, setNewUserBalance] = useState(500);

  // Edit fields values helper
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editTokens, setEditTokens] = useState<number>(0);
  const [editBalance, setEditBalance] = useState<number>(0);

  // Action: Add User
  const handleCreateSimulatedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserTg) {
      alert('Заполните 필수 поля!');
      return;
    }

    const created: SimulatedUser = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      telegramUsername: newUserTg.startsWith('@') ? newUserTg : `@${newUserTg}`,
      telegramId: newUserTgId || String(Math.floor(Math.random() * 90000000) + 10000000),
      tariff: newUserTariff,
      tokens: Number(newUserTokens),
      balanceRub: Number(newUserBalance),
      earningsRub: 0,
      channelsCount: 0,
      status: 'active'
    };

    setUsers([...users, created]);
    setShowAddUser(false);
    setNewUserName('');
    setNewUserTg('');
    setNewUserTgId('');
    alert(`Пользователь ${created.telegramUsername} успешно добавлен в систему!`);
  };

  // Action: Modify user fields
  const handleUpdateValues = (userId: string) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const withUpdates = {
          ...u,
          tokens: Number(editTokens),
          balanceRub: Number(editBalance)
        };
        
        // If updating CURRENT user, update the global state too
        if (userId === currentUser.id) {
          onUpdateCurrentUser({
            ...currentUser,
            tokens: Number(editTokens),
            balanceRub: Number(editBalance)
          });
        }
        return withUpdates;
      }
      return u;
    });

    setUsers(updatedUsers);
    setEditingUserId(null);
    alert('Баланс и токены обновлены!');
  };

  // Action: Delete/Suspend user logic
  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'active' ? 'suspended' : 'active'
        };
      }
      return u;
    }));
  };

  // Action: Force change Tariff (Premium <-> Free)
  const handleToggleTariff = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newTariff = u.tariff === 'free' ? 'premium' : 'free';
        
        if (userId === currentUser.id) {
          onUpdateCurrentUser({
            ...currentUser,
            tariff: newTariff
          });
        }
        
        return {
          ...u,
          tariff: newTariff
        };
      }
      return u;
    }));
  };

  // Action: Delete user from array
  const handleDeleteUser = (id: string) => {
    if (id === currentUser.id) {
      alert('Невозможно удалить самого себя!');
      return;
    }
    if (confirm('Вы действительно хотите навсегда удалить этот профиль пользователя?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const totalSystemTokens = users.reduce((sum, u) => sum + u.tokens, 0);
  const totalSystemBalance = users.reduce((sum, u) => sum + u.balanceRub, 0);

  return (
    <div id="superadmin-panel" className="space-y-6">
      
      {/* Superadmin Header Section */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-slate-800 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                Панель Суперкомандования <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/30">ID: 169262990</span>
              </h2>
              <p className="text-xs text-slate-400">Управляйте профилями пользователей, проверяйте работу бота и балансы ИИSMM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono text-emerald-400 uppercase font-black tracking-wider">Суперадмин: {currentUser.telegramUsername}</span>
          </div>
        </div>

        {/* Global Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Всего профилей</span>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-white">{users.length}</span>
              <span className="text-[10px] text-emerald-400 font-bold">100% норм</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Всего токенов</span>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-indigo-400">{totalSystemTokens} ед</span>
              <span className="text-[10px] text-slate-400">в обороте</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Система Балансов</span>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-emerald-400">{totalSystemBalance} ₽</span>
              <span className="text-[10px] text-emerald-500 font-bold">+15% ком.</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Запросы к Gemini API</span>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-amber-500">{stats.apiRequests}</span>
              <span className="text-[10px] text-zinc-400 font-mono">3.5 Flash</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Credentials & Settings Block */}
      <div className="bg-white/60 backdrop-blur border border-white rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-indigo-600" /> Системные Настройки & Телеграм Бот
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-white/90 rounded-2xl border border-slate-100 space-y-2.5 shadow-xs">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Telegram Бот Юзернейм</span>
            <div className="flex items-center gap-2 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100">
              <Database className="w-4 h-4 text-indigo-600 shrink-0" />
              <a href="https://t.me/iismmAIbot" target="_blank" rel="referrer noopener" className="font-mono text-indigo-700 font-bold underline">
                @iismmAIbot
              </a>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Официальный бот для авторегистрации через Telegram и проверки прав на публикацию.
            </p>
          </div>

          <div className="p-4 bg-white/90 rounded-2xl border border-slate-100 space-y-1.5 shadow-xs">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Токен бота телеграм (API Secrets)</span>
            <input 
              type="password" 
              value={stats.botToken} 
              readOnly 
              className="w-full bg-slate-50 border p-2 rounded-lg font-mono text-[10px] tracking-widest text-slate-700 focus:outline-none"
            />
            <span className="text-[9px] text-slate-400 italic block">8897583774:AAGWCOVN0_mQ6V7L5UnnmkzZAqfaPkDSkk4</span>
          </div>

          <div className="p-4 bg-white/90 rounded-2xl border border-slate-100 space-y-2 shadow-xs">
            <span className="font-bold text-slate-500 text-[10px] uppercase">Системные проверки Telegram</span>
            <div className="space-y-1 bg-slate-50/80 p-2.5 rounded-xl text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Вебхуки обновлений:</span>
                <span className="text-emerald-600 font-black">АКТИВЕН ✔️</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Автопосты TG задержка:</span>
                <span className="text-indigo-600 font-bold">1.2 сек</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">База пользователей:</span>
                <span className="text-slate-700 font-bold">SQLite-Virtual-Cortex</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Profiles Management Section */}
      <div className="bg-white/60 backdrop-blur rounded-3xl border border-white p-6 shadow-xl space-y-5">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" /> Профили пользователей SMM Комбайна
            </h3>
            <p className="text-xs text-slate-500">Изменяйте балансы в реальном времени, подключайте статус Premium, блокируйте временно</p>
          </div>
          
          <button
            onClick={() => setShowAddUser(!showAddUser)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddUser ? 'Скрыть Форму' : 'Зарегистрировать нового'}</span>
          </button>
        </div>

        {/* User Registration Form Modal inside page */}
        {showAddUser && (
          <form onSubmit={handleCreateSimulatedUser} className="p-5 bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-4 text-xs font-medium">
            <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider border-b border-indigo-100 pb-2">Регистрация в базе данных через бота</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block">Имя пользователя / логин</label>
                <input 
                  type="text" 
                  required
                  placeholder="Михаил Маркетолог"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block">Телеграм Юзернейм (с @)</label>
                <input 
                  type="text" 
                  required
                  placeholder="@michail_smm"
                  value={newUserTg}
                  onChange={e => setNewUserTg(e.target.value)}
                  className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block">Телеграм ID (числовой)</label>
                <input 
                  type="text" 
                  placeholder="245124115"
                  value={newUserTgId}
                  onChange={e => setNewUserTgId(e.target.value)}
                  className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block">Тариф системы</label>
                <select 
                  value={newUserTariff}
                  onChange={e => setNewUserTariff(e.target.value as 'free' | 'premium')}
                  className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="free">Free Плавающий</option>
                  <option value="premium">Premium Безлимит</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block">Изначальные Токены ИИ</label>
                <input 
                  type="number" 
                  value={newUserTokens}
                  onChange={e => setNewUserTokens(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block">Баланс Кабинета (₽)</label>
                <input 
                  type="number" 
                  value={newUserBalance}
                  onChange={e => setNewUserBalance(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl"
              >
                Отмена
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
              >
                Создать пользователя в системе
              </button>
            </div>
          </form>
        )}

        {/* Profiles Interactive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-[10px] text-slate-500 uppercase font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Пользователь (Ник • ID)</th>
                <th className="p-4">Тариф</th>
                <th className="p-4">Токены ИИ</th>
                <th className="p-4">Баланс (₽)</th>
                <th className="p-4">Каналы</th>
                <th className="p-4">Статус</th>
                <th className="p-4 text-center">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {users.map((item) => {
                const isEditing = editingUserId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 border text-indigo-700 font-extrabold flex items-center justify-center text-[10px]">
                          {item.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 flex items-center gap-1">
                            {item.name}
                            {item.telegramUsername === currentUser.telegramUsername && (
                              <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1 rounded font-black">ВЫ</span>
                            )}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                            {item.telegramUsername} • ID: <span className="font-semibold">{item.telegramId}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {item.tariff === 'premium' ? (
                        <button 
                          onClick={() => handleToggleTariff(item.id)}
                          className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded-full flex items-center gap-0.5 border border-emerald-200 hover:bg-emerald-200 transition-all cursor-pointer"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-500" /> PREMIUM
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleToggleTariff(item.id)}
                          className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[9px] font-black rounded-full hover:bg-orange-100 hover:text-orange-700 border transition-all cursor-pointer"
                        >
                          БЕСПЛАТНЫЙ
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={editTokens} 
                          onChange={e => setEditTokens(Number(e.target.value))} 
                          className="w-16 bg-slate-50 border px-1 py-1 rounded text-center text-xs text-slate-800"
                        />
                      ) : (
                        <span className="font-mono font-bold text-slate-800">{item.tokens}</span>
                      )}
                    </td>
                    <td className="p-4">
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={editBalance} 
                          onChange={e => setEditBalance(Number(e.target.value))} 
                          className="w-16 bg-slate-50 border px-1 py-1 rounded text-center text-xs text-slate-800"
                        />
                      ) : (
                        <span className="font-mono font-bold text-slate-800">{item.balanceRub} ₽</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-150 px-2 py-0.5 rounded font-mono text-slate-600 font-bold">{item.channelsCount || 0}</span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        className={`text-[10px] font-bold uppercase cursor-pointer ${
                          item.status === 'active' ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      >
                        ● {item.status === 'active' ? 'АКТИВЕН' : 'ЗАБЛОКИРОВАН'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {isEditing ? (
                          <>
                            <button 
                              onClick={() => handleUpdateValues(item.id)}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[9px] cursor-pointer"
                            >
                              ОК
                            </button>
                            <button 
                              onClick={() => setEditingUserId(null)}
                              className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[9px] cursor-pointer"
                            >
                              Отмена
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingUserId(item.id);
                              setEditTokens(item.tokens);
                              setEditBalance(item.balanceRub);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 font-extrabold cursor-pointer hover:underline"
                          >
                            Редактировать
                          </button>
                        )}
                        <span className="text-slate-200">|</span>
                        <button
                          onClick={() => handleDeleteUser(item.id)}
                          className="text-rose-600 hover:text-rose-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
