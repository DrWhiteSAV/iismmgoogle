import React, { useState, useRef } from 'react';
import { CampaignPost, InlineButton, SocialNetwork } from '../types';
import { 
  Sparkles, Calendar, Plus, Trash2, ArrowRight, Eye, RefreshCw, Upload, Image as ImageIcon, Search, Check, AlertCircle, Link
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PostMakerProps {
  onPublishPost: (post: Omit<CampaignPost, 'id' | 'clicks' | 'views'>) => void;
  savedPosts: CampaignPost[];
  connectedChannels: Array<{ id: string; name: string; username: string; platform: SocialNetwork }>;
  tokens: number;
  onDeductTokens: (amount: number) => void;
}

export default function PostMaker({ 
  onPublishPost, 
  savedPosts, 
  connectedChannels,
  tokens,
  onDeductTokens
}: PostMakerProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<SocialNetwork[]>(['telegram']);
  
  // Scheduled post scheduling
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  
  // Custom colored inline buttons (Telegram special)
  const [buttons, setButtons] = useState<InlineButton[]>([]);
  const [btnText, setBtnText] = useState('');
  const [btnUrl, setBtnUrl] = useState('');
  const [btnColor, setBtnColor] = useState<'blue' | 'purple' | 'pink' | 'emerald' | 'orange' | 'red'>('blue');

  // Drag and drop image upload states
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI helper states
  const [aiPrompt, setAiPrompt] = useState('');
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const [searchGroundingSources, setSearchGroundingSources] = useState<Array<{ title: string; uri: string }>>([]);
  const [aiStyleTag, setAiStyleTag] = useState('профессиональный, захватывающий');
  const [aiGenerating, setAiGenerating] = useState(false);
  
  // AI Rewrite states
  const [styleReferenceUrl, setStyleReferenceUrl] = useState('');
  const [rewriting, setRewriting] = useState(false);

  // Toast / error messages
  const [apiNote, setApiNote] = useState<{ status: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Active view tab in maker
  const [activeTab, setActiveTab] = useState<'write' | 'ai' | 'rewrite'>('write');

  // Multi-networks array
  const AVAILABLE_NETS: Array<{ key: SocialNetwork; name: string; icon: string }> = [
    { key: 'telegram', name: 'Telegram', icon: '✈️' },
    { key: 'vk', name: 'VK', icon: '🔵' },
    { key: 'max', name: 'Max', icon: 'Ⓜ️' },
    { key: 'instagram', name: 'Instagram', icon: '📸' },
    { key: 'facebook', name: 'Facebook', icon: '🔷' },
    { key: 'x', name: 'X', icon: '🐦' },
    { key: 'pinterest', name: 'Pinterest', icon: '📌' },
    { key: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { key: 'ok', name: 'OK', icon: '🟠' },
    { key: 'tenchat', name: 'TenChat', icon: '🔴' }
  ];

  // Drag and Drop handles
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите только файлы изображений.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageFile(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearUploadedImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Colored buttons list manipulation
  const addColoredButton = () => {
    if (!btnText.trim() || !btnUrl.trim()) {
      alert('Введите название кнопки и ссылку!');
      return;
    }
    const newBtn: InlineButton = {
      id: Math.random().toString(),
      text: btnText,
      url: btnUrl,
      color: btnColor
    };
    setButtons([...buttons, newBtn]);
    setBtnText('');
    setBtnUrl('');
  };

  const removeButton = (id: string) => {
    setButtons(buttons.filter((b) => b.id !== id));
  };

  const togglePlatform = (net: SocialNetwork) => {
    if (platforms.includes(net)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter((p) => p !== net));
      }
    } else {
      setPlatforms([...platforms, net]);
    }
  };

  // Secure Server-side call: AI Generator
  const runAiPostGenerator = async () => {
    if (!aiPrompt.trim()) {
      setApiNote({ status: 'error', message: 'Введите тему для написания поста ИИ' });
      return;
    }

    if (tokens < 15) {
      setApiNote({ status: 'error', message: 'Недостаточно токенов для ИИ генерации (необходимо минимум 15 токенов)' });
      return;
    }

    setAiGenerating(true);
    setApiNote(null);
    setSearchGroundingSources([]);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: aiPrompt,
          platform: platforms.join(', '),
          enableSearch: enableWebSearch,
          styleDesc: aiStyleTag
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Произошла непредвиденная ошибка на сервере');
      }

      setContent(data.text);
      if (data.sources && data.sources.length > 0) {
        setSearchGroundingSources(data.sources);
      }
      onDeductTokens(15);
      
      setApiNote({
        status: 'success',
        message: data.isDemo 
          ? 'Пост сгенерирован в демонстрационном режиме. Добавьте свой GEMINI_API_KEY для реальных результатов.'
          : 'ИИ написал превосходный пост на основе ваших пожеланий! Списано 15 токенов.'
      });
      setActiveTab('write');
    } catch (err: any) {
      setApiNote({ status: 'error', message: `Ошибка ИИ: ${err.message}` });
    } finally {
      setAiGenerating(false);
    }
  };

  // Secure Server-side call: AI Style Rewrite
  const runStyleRewrite = async () => {
    if (!content.trim()) {
      setApiNote({ status: 'error', message: 'Сначала напишите или вставьте пост в редактор для последующего рерайта!' });
      return;
    }

    if (!styleReferenceUrl.trim()) {
      setApiNote({ status: 'error', message: 'Укажите ссылку на референсный канал автора' });
      return;
    }

    if (tokens < 20) {
      setApiNote({ status: 'error', message: 'Недостаточно токенов для ИИ рерайта (необходимо минимум 20 токенов)' });
      return;
    }

    setRewriting(true);
    setApiNote(null);

    try {
      const response = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content,
          styleUrlOrChannel: styleReferenceUrl,
          originalStyleDesc: 'проанализировать стиль письма оригинального автора по его ссылке и адаптировать текущий текст под его манеру'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка рерайта');
      }

      setContent(data.text);
      onDeductTokens(20);
      setApiNote({
        status: 'success',
        message: data.isDemo
          ? 'Рерайт произведен в ДЕМО режиме. Настройте GEMINI_API_KEY для реального копирования SMM манеры автора.'
          : 'Стиль автора успешно перенят! Текст отрерайтен. Списано 20 токенов.'
      });
      setActiveTab('write');
    } catch (err: any) {
      setApiNote({ status: 'error', message: `Ошибка рерайта: ${err.message}` });
    } finally {
      setRewriting(false);
    }
  };

  // Publish / Schedule action
  const handlePublishClick = () => {
    if (!content.trim()) {
      alert('Текст поста не может быть пустым!');
      return;
    }

    if (connectedChannels.length === 0) {
      alert('У вас нет подключенных каналов! Пожалуйста, подключите хотя бы один канал на вкладке "Каналы".');
      return;
    }

    onPublishPost({
      title: title || 'Без названия',
      content,
      imageUrl: imageFile || undefined,
      platforms,
      scheduledAt: isScheduled ? scheduledDate : undefined,
      status: isScheduled ? 'scheduled' : 'published',
      inlineButtons: buttons.length > 0 ? buttons : undefined,
      isAiGenerated: activeTab !== 'write'
    });

    // Reset fields
    setTitle('');
    setContent('');
    setImageFile(null);
    setButtons([]);
    setSearchGroundingSources([]);
    setIsScheduled(false);
    setScheduledDate('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN: Input Control Center */}
        <div className="flex-1 space-y-5">
          
          {/* Custom Navigation Tab inside builder */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              id="tab-write-editor"
              onClick={() => setActiveTab('write')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'write' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              ✍️ Ручной редактор
            </button>
            <button
              id="tab-ai-generator"
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                activeTab === 'ai' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sparkles className="w-3 h-3 text-orange-500 fill-orange-400" />
              ИИ-Автогенератор постов
            </button>
            <button
              id="tab-ai-rewriter"
              onClick={() => setActiveTab('rewrite')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'rewrite' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              🎭 ИИ Рерайт под автора
            </button>
          </div>

          {/* Interactive Notifications block */}
          {apiNote && (
            <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 font-medium ${
              apiNote.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
              apiNote.status === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              {apiNote.status === 'error' ? (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <span>{apiNote.message}</span>
                {apiNote.status === 'success' && (
                  <button 
                    id="btn-dismiss-note"
                    className="underline ml-2 text-slate-800"
                    onClick={() => setApiNote(null)}
                  >
                    закрыть
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tab 1: Manual Composer / Write */}
          {activeTab === 'write' && (
            <div className="space-y-4 p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Тема или заголовок кампании</label>
                <input 
                  id="input-post-title"
                  type="text"
                  placeholder="Заголовок для фильтрации в календаре (напр. Анонс курса)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none bg-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Основной текст поста</label>
                  <span className="text-[10px] text-slate-400 font-mono">{content.length} символов</span>
                </div>
                <textarea 
                  id="textarea-post-content"
                  rows={6}
                  placeholder="Введите текст вашей публикации. Поддерживается Markdown разметка (*жирный*, [ссылка](url), `код`)."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none bg-white font-sans leading-relaxed resize-none"
                />
              </div>

              {/* Drag and drop image upload panel */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Иллюстрация / Имидж поста</label>
                
                {imageFile ? (
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={imageFile} 
                        alt="Uploaded payload" 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-700 block">Медиа файл прикреплён</span>
                        <span className="text-[10px] text-slate-400 font-mono">Выбран локальный файл</span>
                      </div>
                    </div>
                    <button 
                      id="btn-remove-preview-image"
                      type="button"
                      onClick={clearUploadedImage}
                      className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isDragging 
                        ? 'border-orange-500 bg-orange-50/50' 
                        : 'border-slate-200 hover:border-orange-300 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <Upload className="w-6 h-6 text-slate-400 mb-1.5" />
                    <span className="text-xs font-semibold text-slate-600">Перетащите картинку сюда или нажмите для выбора</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Размеры: 16:9, 1:1, 4:3 (JPG, PNG)</span>
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: AI Autogenerator Form */}
          {activeTab === 'ai' && (
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-orange-600 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 fill-orange-200" /> ИИ-Автогенератор постов по расписанию
                </span>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Баланс: {tokens} токенов</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Опишите тему или 핵심-тезисы поста</label>
                <textarea 
                  id="textarea-ai-prompt"
                  rows={3}
                  placeholder="Напр. Напиши захватывающий анонс нашего нового курса по SMM и маркетингу с использованием ИИ-агентов. Сделай акцент на легком старте."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Желаемый стиль текста</label>
                  <input 
                    id="input-ai-style"
                    type="text"
                    value={aiStyleTag}
                    onChange={(e) => setAiStyleTag(e.target.value)}
                    placeholder="Напр. Игривый, Креативный, Экспертный"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 bg-white"
                  />
                </div>

                {/* Google Search Grounding Trigger (Requirement #6) */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-orange-50/50 border border-orange-100 mt-4 h-10">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Search className="w-3 h-3 text-orange-500" /> Grounding Search
                    </span>
                    <span className="text-[9px] text-slate-400">Поиск актуальных постов в интернете</span>
                  </div>
                  <input 
                    id="checkbox-enable-search"
                    type="checkbox"
                    checked={enableWebSearch}
                    onChange={(e) => setEnableWebSearch(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400 shrink-0 cursor-pointer"
                  />
                </div>
              </div>

              <button
                id="btn-trigger-ai-post-gen"
                type="button"
                disabled={aiGenerating}
                onClick={runAiPostGenerator}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {aiGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Сканируем тренды и пишем пост ИИ...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span>Сгенерировать ИИ-Пост (15 токенов)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Tab 3: AI Author Imitative Rewrite */}
          {activeTab === 'rewrite' && (
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-extrabold text-indigo-600 tracking-wider flex items-center gap-1.5">
                  🎭 ИИ Рерайт под авторский стиль
                </span>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">Баланс: {tokens} токенов</span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Для определения стиля написания ИИSMM достаточно ссылки на канал автора или его юзернейм. Мы автоматически скопируем ритмику речи, хэштеги и форматирование.
              </p>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Ссылка на канал автора или его юзернейм</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <input 
                    id="input-style-reference"
                    type="text"
                    required
                    placeholder="t.me/shishkarnem или vk.com/smm_creator"
                    value={styleReferenceUrl}
                    onChange={(e) => setStyleReferenceUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-400 bg-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-[11px] text-slate-600">
                ⚠️ <span className="font-bold">Как это работает:</span> Напишите свой черновик на вкладке «Ассистент», затем вернитесь сюда и раздайте стиль в один клик! Текущий текст в редакторе будет заменен адаптированным.
              </div>

              <button
                id="btn-trigger-ai-rewrite"
                type="button"
                disabled={rewriting}
                onClick={runStyleRewrite}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {rewriting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Анализируем канал автора и переписываем...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Сделать ИИ-Рерайт черновика (20 токенов)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Social publishing network selection checklist */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Опубликовать в платформы</label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_NETS.map((net) => {
                const active = platforms.includes(net.key);
                return (
                  <button
                    id={`btn-post-target-platform-${net.key}`}
                    key={net.key}
                    type="button"
                    onClick={() => togglePlatform(net.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                      active 
                        ? 'bg-slate-900 text-white shadow' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{net.icon}</span>
                    <span>{net.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colored Inline buttons for Telegram posts */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Цветные кнопки Telegram (Всегда бесплатно)</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Добавляйте интерактивные кнопки c переходами к вашим Telegram постам.</p>
            </div>

            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-100 rounded-xl">
                {buttons.map((btn) => (
                  <span 
                    key={btn.id}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-sm ${
                      btn.color === 'blue' ? 'bg-sky-500' :
                      btn.color === 'purple' ? 'bg-purple-500' :
                      btn.color === 'pink' ? 'bg-pink-500' :
                      btn.color === 'emerald' ? 'bg-emerald-500' :
                      btn.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  >
                    <span>{btn.text}</span>
                    <button 
                      id={`btn-delete-inline-button-${btn.id}`}
                      onClick={() => removeButton(btn.id)}
                      className="hover:scale-110 ml-1 cursor-pointer font-bold text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500">Текст кнопки</span>
                <input 
                  id="input-inline-btn-text"
                  type="text"
                  placeholder="Забрать паблик"
                  value={btnText}
                  onChange={(e) => setBtnText(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white font-medium"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500">Ссылка (URL)</span>
                <input 
                  id="input-inline-btn-url"
                  type="text"
                  placeholder="https://t.me/..."
                  value={btnUrl}
                  onChange={(e) => setBtnUrl(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white font-mono"
                />
              </div>
              <div className="flex gap-1.5 items-stretch">
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500">Цвет</span>
                  <select
                    id="select-inline-btn-color"
                    value={btnColor}
                    onChange={(e: any) => setBtnColor(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="blue">Голубой</option>
                    <option value="purple">Фиолетовый</option>
                    <option value="pink">Розовый</option>
                    <option value="emerald">Изумрудный</option>
                    <option value="orange">Оранжевый</option>
                    <option value="red">Алый</option>
                  </select>
                </div>
                <button
                  id="btn-add-inline-button"
                  type="button"
                  onClick={addColoredButton}
                  className="px-3 bg-slate-900 text-white rounded-lg text-xs font-bold shadow hover:bg-slate-800 cursor-pointer self-end h-[30px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Delayed scheduling Controls */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 block">Отложенная публикация по графику</span>
                <span className="text-[10px] text-slate-400">Выберите дату и точное время отправки поста</span>
              </div>
              <input 
                id="checkbox-enable-scheduling"
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400 cursor-pointer"
              />
            </div>

            {isScheduled && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-2"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    id="input-post-scheduled-date"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none bg-white font-mono"
                  />
                </div>
              </motion.div>
            )}
          </div>

          <button
            id="btn-trigger-publish"
            type="button"
            onClick={handlePublishClick}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white hover:opacity-90 font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {isScheduled ? (
              <>
                <Calendar className="w-5 h-5" />
                <span>Запланировать отложенный пост</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                <span>Мгновенный кросспостинг во все каналы</span>
              </>
            )}
          </button>

        </div>

        {/* RIGHT COLUMN: Real-time visual device preview */}
        <div className="w-full lg:w-[350px] shrink-0 space-y-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Визуальный предпросмотр инфо</span>
          
          {/* Glass simulated mobile preview layout from mock screenshots */}
          <div className="rounded-3xl border border-white/50 bg-gradient-to-b from-sky-100/60 via-orange-50/60 to-pink-100/60 shadow-xl p-4 min-h-[500px] flex flex-col justify-between backdrop-blur-md">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/30 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-ping"></div>
                  <span className="text-[10px] font-mono font-bold text-slate-600">PREVIEW</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500">ИИSMM Telegram view</span>
              </div>

              {/* Feed Preview Post card */}
              <div className="bg-white/90 rounded-2xl p-4 shadow-sm border border-white/40 space-y-3">
                {imageFile && (
                  <img 
                    src={imageFile} 
                    alt="Current file preview" 
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[160px] object-cover rounded-xl border border-slate-100"
                  />
                )}
                
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-800 text-sm leading-tight">
                    {title || 'Задайте заголовок'}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-serif">
                    {content || 'Здесь будет отображаться ваш готовый SMM месседж... Начните вводить или сгенерируйте с помощью ИИSMM.'}
                  </p>
                </div>

                {/* Grounding sources inside preview! */}
                {searchGroundingSources.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[9px] font-extrabold text-slate-400 tracking-wider block">ИСТОЧНИКИ ПОИСКА ИИ</span>
                    <div className="space-y-1">
                      {searchGroundingSources.map((src, idx) => (
                        <a 
                          key={idx}
                          href={src.uri} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          className="flex items-center gap-1 text-[10px] text-orange-600 hover:text-orange-850 truncate bg-orange-50/50 p-1 rounded font-medium"
                        >
                          <Link className="w-2.5 h-2.5" />
                          <span>{src.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colored inline buttons preview */}
                {buttons.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100">
                    {buttons.map((btn) => (
                      <a
                        key={btn.id}
                        href={btn.url}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className={`py-1.5 text-center text-[11px] font-bold rounded-lg text-white block truncate transition-transform active:scale-95 ${
                          btn.color === 'blue' ? 'bg-sky-500' :
                          btn.color === 'purple' ? 'bg-purple-500' :
                          btn.color === 'pink' ? 'bg-pink-500' :
                          btn.color === 'emerald' ? 'bg-emerald-500' :
                          btn.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                      >
                        {btn.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="text-[9px] text-slate-400 text-center italic mt-4 leading-normal">
              Посты мгновенно дублируются во все активные каналы социальных платформ в один клик. Разметка и цветные кнопки сохраняются.
            </p>
          </div>
          
        </div>

      </div>

      {/* HISTORICAL POST HISTORY */}
      <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-800 text-sm">История отправленных и отложенных постов</h3>
        {savedPosts.length === 0 ? (
          <p className="text-xs text-slate-400 leading-normal">Тут пока пусто. Отправьте ваш первый пост через комбайн, чтобы увидеть ленту статистики.</p>
        ) : (
          <div className="space-y-2.5">
            {savedPosts.map((post) => (
              <div key={post.id} className="p-3.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5 truncate flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{post.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      post.status === 'scheduled' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {post.status === 'scheduled' ? 'Отложенный' : 'Опубликован'}
                    </span>
                    {post.isAiGenerated && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded">ИИ</span>
                    )}
                  </div>
                  <p className="text-slate-500 truncate font-mono">{post.content}</p>
                  <p className="text-[10px] text-slate-400">
                    Каналы публикации: {post.platforms.map(p => p.toUpperCase()).join(', ')} 
                    {post.scheduledAt && ` • Назначено на: ${new Date(post.scheduledAt).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <span className="block text-[10px] text-slate-400">Просмотры</span>
                    <span className="font-bold text-slate-700">{(post.views || 0).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Клики (UTM)</span>
                    <span className="font-bold text-slate-700">{(post.clicks || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
