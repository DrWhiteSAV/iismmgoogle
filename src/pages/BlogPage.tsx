import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowLeft, Calendar, User, Eye, Heart, Share2, Play, Pause, ChevronLeft, ChevronRight, BookOpen, Sparkles, Flame, CheckCircle2, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Unified type declarations for SMM blog posts
export type PostFormat = 'photo' | 'video' | 'text' | 'album';

export interface AlbumItem {
  type: 'photo' | 'video';
  url: string;
}

export interface BlogPost {
  id: string;
  category: 'day' | 'blogger' | 'news' | 'popular';
  title: string;
  desc: string;
  content: string;
  format: PostFormat;
  tag: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  views: number;
  likes: number;
  image?: string;
  videoUrl?: string;
  album?: AlbumItem[];
}

interface BlogPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogin?: () => void;
  isLoggedIn?: boolean;
}

// Full suite of 15 premium-quality, high-resolution blog posts
export const MOCK_BLOG_POSTS: BlogPost[] = [
  // FEATURED POST OF THE DAY
  {
    id: '382910',
    category: 'day',
    title: '⚡ РЕВОЛЮЦИЯ СЕТЕЙ: Как бесплатно набрать первый 1,000,000 охвата через ИИSMM в 2026 году',
    desc: 'Пошаговый ультимативный гайд по выстраиванию долгосрочной ИИ-автономии в 5 социальных сетях одновременно без затрат на копирайтеров.',
    content: `Добро пожаловать в новую эру контент-маркетинга! В 2026 году традиционные методы продвижения уходят в прошлое. Теперь балом правят автоматизированные нейросети и умные кросспостинг-планировщики.


Сегодня мы подробно разберем, как наша интеллектуальная платформа ИИSMM помогает совершить квантовый скачок и собрать свой первый миллион просмотров без рекламных вложений.

### Шаг 1: Активация Приветственного Бонуса
При первой авторизации через Telegram в 1 клик, каждый новый веб-мастер получает на баланс ровно 1,000,000 ИИрок (нашу внутреннюю расчётную валюту). Этот миллион эквивалентен огромному ресурсу генераций через передовые ИИ-модели, включая Gemini Flash 2.5. Используйте их, чтобы составить начальный контент-план на 30 дней вперед.

### Шаг 2: Создание конвейера с помощью ИИ-Рерайтера
Используйте модуль «ИИ-Копирайтер» для переработки топовых публикаций. Вы можете просто скопировать ссылку на любой успешный пост ваших конкурентов. Наш ИИ глубоко проанализирует контекст у конкурентов, выявит виральные триггеры, сделает красивейший рерайт, расставит тематические эмодзи и подготовит варианты структуры.

### Шаг 3: Мультипостинг с авто-маркировкой ОРД
Это главное преимущество ИИSMM. Создав один пост, вы можете опубликовать его в Telegram-каналах, группах VK, профиле TenChat, Сетке и Одноклассниках. Всего — в 1 клик! При этом система автоматически сгенерирует токен маркировки рекламы (ERID) через интеграцию с ОРД, защищая вас от любых юридических рисков совершенно бесплатно.

Анализируйте динамику просмотров, вовлекайте аудиторию в опросы прямо со смартфона, подключайте нативный Telegram-пульт управления и получайте удовольствие от лавинообразного роста охватов!`,
    format: 'album',
    tag: 'Пост дня',
    readTime: '6 мин',
    date: '26 Мая 2026',
    author: {
      name: 'Иван Шишкарёв',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Основатель ИИSMM'
    },
    views: 124500,
    likes: 8430,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80' },
      { type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-with-social-media-icons-34440-large.mp4' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
      { type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-screen-developer-working-late-at-night-42217-large.mp4' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80' }
    ]
  },

  // SECTION 1: ПОСТЫ НАШИХ БЛОГЕРОВ (10 posts)
  {
    id: '482911',
    category: 'blogger',
    title: '📈 Как я вырастила Telegram-канал до 50k подписчиков при нулевом бюджете',
    desc: 'Кейс о системном взаимном пиаре и автоматическом продвижении через рекламные папки ИИSMM.',
    content: `Многие думают, что сейчас без бюджета в Telegram делать нечего. Это миф! Главное — использовать умную работу по кооперации.

Я создала 3 тематические рекламные папки через ИИSMM, пригласила туда авторов схожего масштаба. Платформа выступила независимым арбитром: проверяла статистику каналов на спам и ботов. Мы запустили мега-сбор, увеличив нашу базу читателей в 4 раза всего за одну неделю!`,
    format: 'photo',
    tag: 'Кейсы блогов',
    readTime: '4 мин',
    date: '25 Мая 2026',
    author: {
      name: 'Алина Вернер',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      role: 'SMM-Блогер'
    },
    views: 18400,
    likes: 2100,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  },
  {
    id: '839201',
    category: 'blogger',
    title: '🎬 Создаем Reels и Shorts при помощи ИИ за 3 минуты в прямом эфире',
    desc: 'Полное руководство от блогера по превращению длинных статей в ультра-виральные вертикальные видео.',
    content: `Вы знали, что ИИ умеет мгновенно нарезать ваши текстовые статьи на сценарии для клипов? Всё, что вам нужно:
1. Загрузить исходную статью в ИИ-раздел ИИSMM.
2. Использовать шаблон "Сценарий для Reels".
3. Получить поминутный план, включающий раскадровки и озвучку.

Смотрите пример рендеринга видео в нашем интерактивном плеере ниже!`,
    format: 'video',
    tag: 'Видео-урок',
    readTime: '3 мин',
    date: '24 Мая 2026',
    author: {
      name: 'Максим Криптонов',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'Tech-Евангелист'
    },
    views: 32900,
    likes: 4120,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-38392-large.mp4',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80'
  },
  {
    id: '193850',
    category: 'blogger',
    title: '🧠 Золотые часы постинга: Когда публикации собирают рекордный ER?',
    desc: 'Анализ миллионов просмотров. Детальный разбор лучших периодов для постинга без медиафайлов.',
    content: `Чистый текст без картинок — восходящий тренд 2026 года в Telegram и TenChat. Подписчики устали от безликих картинок со стоков.

Наши исследования показали, что сухие экспертные посты, опубликованные в интервале с 10:15 до 11:30 утра по вторникам и четвергам, имеют показатель дочитываемости на 34% выше, чем посты с пестрыми баннерами. Отсутствие отвлекающих карточек концентрирует фокус на тексте, а грамотные абзацы делают чтение комфортным.`,
    format: 'text',
    tag: 'Аналитика',
    readTime: '5 мин',
    date: '23 Мая 2026',
    author: {
      name: 'Дарья Соколова',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      role: 'Маркетолог'
    },
    views: 9400,
    likes: 850
  },
  {
    id: '582910',
    category: 'blogger',
    title: '📸 Тест-драйв: Выжимаем максимум вовлеченности через карусели изображений',
    desc: 'Мы протестировали рекламные альбомы в 10 нишах. Делимся шокирующими результатами конверсий.',
    content: `Альбомы из медиафайлов обожают алгоритмы клипового вовлечения. Пользователь дольше задерживает палец на публикации, листая влево-вправо, что дает сильный сигнал алгоритму Smart Feed (Умной Ленты).

Используйте объединенные альбомы в ИИSMM! Наша платформа оптимизирует размер каждого кадра перед выгрузкой, чтобы ваши изображения грузились мгновенно даже в условиях слабого мобильного интернета в метро.`,
    format: 'album',
    tag: 'Секреты продвижения',
    readTime: '7 мин',
    date: '22 Мая 2026',
    author: {
      name: 'Сергей Листов',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Фотограф ИИSMM'
    },
    views: 22100,
    likes: 1950,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' }
    ]
  },
  {
    id: '291048',
    category: 'blogger',
    title: '💎 Пакетные размещения по бартеру: Инструкция уклонения от скама',
    desc: 'Как блогеры и закупщики рекламы страхуют свои сделки на встроенной Escrow Бирже.',
    content: `Бартер в SMM всегда ассоциируется с рисками. Вы выложили качественный обзор, а рекламодатель заблокировал вас или не выполнил ответный пиар.

Через ИИSMM Escrow вы фиксируете взаимные обязательства. ИИ замораживает гарантийный залог в ИИрках или рублях. Если одна из сторон улизнет от размещения или удалит рекламный пост раньше срока — средства сгорают или выплачиваются пострадавшему!`,
    format: 'photo',
    tag: 'Юридический ликбез',
    readTime: '5 мин',
    date: '20 Мая 2026',
    author: {
      name: 'Елена Рудковская',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      role: 'Юрист & Блогер'
    },
    views: 14200,
    likes: 1790,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80'
  },
  {
    id: 'blogger-6',
    category: 'blogger',
    title: '💸 Мой личный рекорд: 320,000 ₽ чистыми на микро-канале про недвижимость через ИИSMM',
    desc: 'Делюсь связкой авто-постинга и генеративного согревания холодных лидов через комментарии.',
    content: `Продажи премиальной загородной недвижимости не требуют 100 тысяч подписчиков. У меня всего 1,200 живых читателей в канале.

Секрет кроется в интеллектуальном отборе целевой аудитории с помощью нашего инструмента Smart-Match и ежедневной автоматической выкладке постов, созданных с учетом психологических триггеров. Для каждого объекта ИИ сгенерировал 5 ярких офферов, настроив точечный ERID-токен за полторы секунды!`,
    format: 'photo',
    tag: 'Кейсы монетизации',
    readTime: '6 мин',
    date: '18 Мая 2026',
    author: {
      name: 'Тимур Ред',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
      role: 'SMM Риелтор'
    },
    views: 15300,
    likes: 1250,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80'
  },
  {
    id: 'blogger-7',
    category: 'blogger',
    title: '⏱️ Как сэкономить 40 часов в неделю: Чек-лист полной ИИ-автономии SMM агентства',
    desc: 'Опыт внедрения ИИ-рерайтера в рабочие процессы команды из 12 человек. Детальный таймлайн.',
    content: `В нашем агентстве мы полностью делегировали написание черновых планов нейросетям платформы ИИSMM.

Раньше три копирайтера тратили всю рабочую неделю на составление текстовых воронок для наших заказчиков. Теперь они работают как редакторы: ИИ генерирует 15 уникальных вариантов публикаций на основе ссылок на популярные посты в США, а редакторы лишь слегка адаптируют сленг под локальный рынок. Таймлайн экономии времени просто поражает!`,
    format: 'text',
    tag: 'Тайм-менеджмент',
    readTime: '4 мин',
    date: '15 Мая 2026',
    author: {
      name: 'Вера Павлова',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      role: 'CEO Digital-Бюро'
    },
    views: 11200,
    likes: 980
  },
  {
    id: 'blogger-8',
    category: 'blogger',
    title: '🔗 Взаимный пиар здорового человека: Как составить убойное промо-предложение',
    desc: 'Разбор лучших рекламных заголовков для бесплатного обмена аудиторией с конверсией в подписку от 12%.',
    content: `Забудьте про скучные папки с заголовками типа "Полезные СММ-каналы". Это уже давно не работает.

Я протестировала новый инструмент создания сокетов взаимного обмена. ИИ за пять секунд создал 10 промо-креативов с интригующими тестами-викторинами. Когда пользователь переходит по ссылке, ИИ-бот проверяет подписку на оба канала-партнера, гарантируя максимально честный обмен базами подписчиков.`,
    format: 'album',
    tag: 'Коллаборации',
    readTime: '5 мин',
    date: '12 Мая 2026',
    author: {
      name: 'Юрий Кравц',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      role: 'PR Специалист'
    },
    views: 16700,
    likes: 1850,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&q=80' }
    ]
  },
  {
    id: 'blogger-9',
    category: 'blogger',
    title: '🎯 Парсим и пиарим: Как привлекать лояльных подписчиков из смежных ниш бесплатно',
    desc: 'Пошаговый кейс парсинга виральных статей конкурентов, авто-рерайта и выкладки в сетку вещания.',
    content: `Если вы ведете блог про дизайн, ваша целевая аудитория также активна в темах про разработку сайтов, копирайтинг и фриланс.

Наш парсер-модуль отбирает самые виральные материалы со свежими лайками, а внутренний ИИ-драфт ИИSMM пересобирает аргументы автора под ваш уникальный фирменный стиль. Готовый переработанный материал выгружается во все паблики в 1 клик!`,
    format: 'photo',
    tag: 'Секреты продвижения',
    readTime: '5 мин',
    date: '10 Мая 2026',
    author: {
      name: 'Анна Громова',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      role: 'SMM аналитик'
    },
    views: 14100,
    likes: 1100,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80'
  },
  {
    id: 'blogger-10',
    category: 'blogger',
    title: '🚀 Теневой бан в Telegram: Мифы и правда о жестких алгоритмах мессенджера',
    desc: 'Как избежать ограничений за частые публикации и правильно настроить тайм-слоты отправки.',
    content: `Почему некоторые каналы при выпуске 5 постов подряд внезапно теряют охваты в 10 раз? Мессенджер активно борется со спамом в лентах.

Используйте встроенный умный планировщик ИИSMM. Он нативно распределяет отправку креативов, избегая спам-триггеров алгоритма Telegram. Дополнительно система автоматически ротирует ссылки и форматирование, сохраняя высокую репутацию вашего профиля в глазах роботов-модераторов.`,
    format: 'video',
    tag: 'Безопасность',
    readTime: '6 мин',
    date: '07 Мая 2026',
    author: {
      name: 'Игорь Зайцев',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      role: 'SMM-Арбитражник'
    },
    views: 19500,
    likes: 2200,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mobile-phone-screen-close-up-of-person-scrolling-social-media-41883-large.mp4',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80'
  },

  // SECTION 2: НАШИ НОВОСТИ О ИИSMM (10 news posts)
  {
    id: '492049',
    category: 'news',
    title: '🚀 Анонс: Авто-Маркировка ОРД и Генератор ERID токенов в один клик',
    desc: 'Узнайте о новой встроенной функции маркировки рекламы, которая спасает SMM-специалистов от штрафов.',
    content: `Каждый рекламный интегратор обязан маркировать посты в РФ. Это хлопотно, отнимает кучу времени... Но только не в ИИSMM!

Мы рады представить модуль «Авто-ОРД». Теперь перед нажатием кнопки «Опубликовать ко всем каналам» достаточно поставить галочку «Рекламная публикация». Наша система мгновенно создаст договор, сама получит креатив, сгенерирует ERID-токен и вставит его в самый конец текста с правильным URL-аттрибутом. Полная автоматизация юр. процессов!`,
    format: 'photo',
    tag: 'Новости Продукта',
    readTime: '4 мин',
    date: '18 Мая 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Разработчики'
    },
    views: 45000,
    likes: 3820,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
  },
  {
    id: '729104',
    category: 'news',
    title: '🤖 Громкое обновление: Подключен ИИ-синтезатор автоответов на отзывы',
    desc: 'Как запустить автоматические дружелюбные комментарии от вашего бренда во всех сетях.',
    content: `Выпускаем в релиз долгожданный модуль авто-интерактива. Теперь при обнаружении новых комментариев читателей под постами, наш интеллектуальный робот на базе Gemini подстраивается под тональность вопроса и формирует ответ за 1.8 секунды!

Это колоссально стимулирует вовлечение (ER), увеличивает благожелательность ядра аудитории и поднимает каналы в поисковой выдаче СММ-платформ.`,
    format: 'video',
    tag: 'Обновления',
    readTime: '3 мин',
    date: '16 Мая 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Разработчики'
    },
    views: 31200,
    likes: 2980,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-keyboard-40346-large.mp4',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80'
  },
  {
    id: '928103',
    category: 'news',
    title: '📢 Как устроен Телеграм-бот @iismmAIbot: Полный гайд по навигации',
    desc: 'Разбираем функционал карманного пульта управления вашим SMM бизнесом без открытия ПК.',
    content: `Наш верный Telegram-бот @iismmAIbot — это полноценный шлюз всей платформы.
С его помощью вы можете:
- Запрашивать баланс ИИрок
- Читать оповещения о публикации постов
- Модерировать комментарии к вашему каналу в реальном времени
- Одобрять эскроу-сделки по бартеру

Все действия синхронизируются с веб-интерфейсом мгновенно.`,
    format: 'text',
    tag: 'ЧаВо / Инструкция',
    readTime: '5 мин',
    date: '14 Мая 2026',
    author: {
      name: 'Алексей Никитин',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      role: 'Техподдержка'
    },
    views: 19800,
    likes: 1240
  },
  {
    id: '104829',
    category: 'news',
    title: '🪐 Презентация: Модуль «Бесконечный Календарь» с шаблонами виральности',
    desc: 'Заполните сетку вещания за 5 секунд кликами по готовым ИИ-концептам продвижения.',
    content: `Трудно придумать, о чем писать? Мы встроили генеративный модуль «Бесконечный Календарь». Нажмите одну кнопку и ИИ заполнит вашу сетку вещания индивидуальными шаблонами вовлечения: опросы, сторителлинг, провокационные темы, экспертные чек-листы. 

Все шаблоны разработаны ведущими маркетологами СНГ и адаптированы под сумасшедшую динамику внимания пользователей в 2026 году.`,
    format: 'album',
    tag: 'Анонсы',
    readTime: '6 мин',
    date: '11 Мая 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Продукт-Менеджер'
    },
    views: 29800,
    likes: 3100,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' }
    ]
  },
  {
    id: '203921',
    category: 'news',
    title: '🤝 Партнерская программа: Забираем 35% со всех оплат приглашенных навсегда',
    desc: 'Как рекомендовать лучший SMM софт на рынке и получать пассивный доход в рублях или ИИрках.',
    content: `С гордостью напоминаем об условиях нашей реферальной программы. Скопируйте персональную реферальную ссылку в Кабинете.

Вы будете гарантированно получать 35% в реальных рублях со всех покупок тарифов PRO/VIP и пакетов токенов ваших приглашенных пользователей. Выплаты производятся автоматически через Telegram Stars или СБП в течение 24 часов после запроса. Начните зарабатывать на рекомендациях качественного ПО!`,
    format: 'photo',
    tag: 'Заработок',
    readTime: '3 мин',
    date: '08 Мая 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Партнерский отдел'
    },
    views: 41200,
    likes: 5800,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80'
  },
  {
    id: 'news-6',
    category: 'news',
    title: '🔌 Интеграция с TenChat: Наш автоматический планировщик покоряет деловую сеть',
    desc: 'Публикуйте экспертные статьи со сквозным форматированием и авто-тегами в Ленту TenChat.',
    content: `Рады представить очередное расширение экосистемы кросспостинга. Наш планировщик ИИSMM теперь официально сертифицирован для прямой публикации в деловую сеть TenChat!

Вам больше не нужно копировать верстку вручную. Платформа сохраняет все жирные выделения шрифта, абзацы и подгружает релевантные тематические хэштеги, повышая дочитываемость ваших экспертных статьей на 40% автоматически.`,
    format: 'photo',
    tag: 'Тех-Релиз',
    readTime: '5 мин',
    date: '05 Мая 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Разработчики'
    },
    views: 25700,
    likes: 3100,
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&q=80'
  },
  {
    id: 'news-7',
    category: 'news',
    title: '⚡ Молниеносное ускорение: Время генерации постов сокращено до 1.5 секунд',
    desc: 'Мы внедрили новые кэширующие ядра и обновили SDK Gemini API во всей архитектуре.',
    content: `Мы перевели всю серверную инфраструктуру ИИSMM на современные выделенные инстансы с оптимизированной СУБД.

Благодаря прямому проксированию запросов и обновленному SDK от Google DeepMind, средняя скорость создания рекламного поста с нуля упала до рекордных полутора секунд! Теперь вы создаете недельный контент-план еще быстрее и комфортнее.`,
    format: 'text',
    tag: 'Оптимизация',
    readTime: '3 мин',
    date: '01 Мая 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'DevOps Инженеры'
    },
    views: 28400,
    likes: 3500
  },
  {
    id: 'news-8',
    category: 'news',
    title: '🎉 Миллион пользователей на платформе: Дарим промокод на VIP-пакет',
    desc: 'Празднуем запуск новой версии 2.0 и делимся планами глобальной международной экспансии.',
    content: `Проект ИИSMM перешагнул рубеж в 1,000,000 зарегистрированных СММщиков! В честь этого знакового события мы удваиваем любые пополнения баланса ИИрок до конца недели.

Используйте специальный подарочный промокод «MIL2026» в Личном Кабинете, чтобы протестировать безлимитную генерацию видео-конспектов и экспорт воркеров без ограничений по трафику!`,
    format: 'album',
    tag: 'Юбилей',
    readTime: '4 мин',
    date: '28 Апреля 2026',
    author: {
      name: 'Иван Шишкарёв',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Основатель ИИSMM'
    },
    views: 49000,
    likes: 6300,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80' }
    ]
  },
  {
    id: 'news-9',
    category: 'news',
    title: '🎨 Студия кастомизации: Накладывайте брендовые водяные знаки прямо в браузере',
    desc: 'Представляем новый визуальный перетаскиваемый вотермарк-редактор с поддержкой прозрачности PNG.',
    content: `Защитите ваши авторские изображения от копирования недобросовестными пабликами за одну секунду.

Наша новая Студия Вотермарков в реальном времени накладывает логотип вашей компании на все генерируемые изображения перед выгрузкой в Telegram-канал. Вы можете свободно масштабировать лого, регулировать прозрачность PNG и задавать углы поворота водяного знака.`,
    format: 'photo',
    tag: 'Обновления',
    readTime: '4 мин',
    date: '25 Апреля 2026',
    author: {
      name: 'Команда ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Разработчики'
    },
    views: 34100,
    likes: 2900,
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&q=80'
  },
  {
    id: 'news-10',
    category: 'news',
    title: '🎓 Запуск академии ИИSMM: Бесплатные курсы по автоматизации онлайн-бизнеса',
    desc: 'Пройдите 8 коротких видео-лекций, получите сертификат сертифицированного ИИ-маркетолога.',
    content: `Хотите кратно повысить свой ценник на рынке SMM-услуг? Рады объявить о запуске нашей официальной бесплатной Академии!

На протяжении 8 пошаговых видео-уроков вы научитесь настраивать авто-постинг, управлять маркировкой ОРД через встроенный API-ключ ИИSMM и настраивать автоматические ИИ-ответы на комментарии клиентов. Каждому выпускнику выдается верифицированный цифровой сертификат!`,
    format: 'video',
    tag: 'Академия',
    readTime: '5 мин',
    date: '20 Апреля 2026',
    author: {
      name: 'Методологи ИИSMM',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80',
      role: 'Методическое Бюро'
    },
    views: 41900,
    likes: 4800,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-laptop-and-writing-in-notebook-41689-large.mp4',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80'
  },

  // SECTION 3: САМОЕ ПОПУЛЯРНОЕ (10 posts)
  {
    id: '829104',
    category: 'popular',
    title: '🔥 Гайд: Как обойти алгоритмы и сделать так, чтобы посты попадали в рекомендации',
    desc: 'Раскрываем внутреннее устройство "Умных лент" Telegram, VK и Дзена на пальцах.',
    content: `Каждая современная платформа нацелена на удержание внимания пользователя. Чем дольше человек задерживает взгляд на вашей записи — тем шире алгоритм открывает органический виральный охват.

Используйте гибридные интерактивные альбомы, встроенные кастомные опросы и цепляющие текстовые заголовки. Наша платформа ИИSMM помогает выдерживать идеальный формат структуры постов, чтобы вовлеченность с первых секунд взлетала до небес.`,
    format: 'video',
    tag: 'Секреты Алгоритмов',
    readTime: '5 мин',
    date: '06 Мая 2026',
    author: {
      name: 'Михаил Регистратов',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      role: 'Топ-Маркетолог'
    },
    views: 98100,
    likes: 12450,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-in-a-dim-room-38328-large.mp4',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80'
  },
  {
    id: '302910',
    category: 'popular',
    title: '🛡 Как безопасно покупать рекламу в Telegram в обход мошенников',
    desc: 'Опыт закупки на сотни тысяч рублей. Наглядный разбор защиты бюджетов через Escrow.',
    content: `Биржи часто страдают от недобросовестных админов каналов, которые завышают статистику подписчиков фальшивыми ботами.

С помощью ИИSMM вы можете заказывать рекламу без страха. Биржа автоматически собирает историческую вовлеченность канала-исполнителя. Деньги переводятся только по факту честного нахождения поста в ленте в течение оговоренных 24 часов. Всё прозрачно и защищено умными смарт-контами эскроу!`,
    format: 'photo',
    tag: 'Интеграции',
    readTime: '6 мин',
    date: '04 Мая 2026',
    author: {
      name: 'Илья Кросс',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Трейдер & СММщик'
    },
    views: 89000,
    likes: 9120,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=600&q=80'
  },
  {
    id: '910248',
    category: 'popular',
    title: '💬 Секреты убойного копирайтинга: 10 триггеров удержания внимания',
    desc: 'Какие слова и фразы заставляют людей дочитывать статьи до конца без зевков.',
    content: `Простые текстовые приемы, которые заставят вашу целевую аудиторию жадно читать каждую строчку:
1. Заинтригуйте с первой строчки ("Этого вам никогда не расскажут...").
2. Обращайтесь лично к болям клиента.
3. Добавляйте твердые цифры и проверяемые пруфы.
4. Разбавляйте длинные абзацы короткими, бьющими в цель емкими выводами.

Все эти золотые правила копирайтинга уже заложены в пресеты ИИ-драфта в ИИSMM!`,
    format: 'text',
    tag: 'Копирайтинг',
    readTime: '3 мин',
    date: '02 Мая 2026',
    author: {
      name: 'Юлия Текст',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Главред Блога'
    },
    views: 74200,
    likes: 6700
  },
  {
    id: '410392',
    category: 'popular',
    title: '🎨 Тренды дизайна постов 2026: Прощай минимализм, привет футуризм и Liquid Glass',
    desc: 'Учимся оформлять свои блоги в современном неоновом стиле с высокой конверсией.',
    content: `В 2026 году плоский стерильный дизайн окончательно перестал привлекать клики. В моду вошел футуристический неоновый стиль с элементами жидкого стекла (Liquid Glass), переливчатыми градиентами и мягким размытием фона (Backdrop Blur).

Каналы, которые перешли на новые стеклянные обложки, получили рост CTR рекламных нативных постов на 48%! Экспериментируйте с визуалами смелее.`,
    format: 'photo',
    tag: 'Дизайн Брендинг',
    readTime: '5 мин',
    date: '28 Апреля 2026',
    author: {
      name: 'Кристина Арт',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      role: 'UX/UI Дизайнер'
    },
    views: 65000,
    likes: 7100,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80'
  },
  {
    id: '502918',
    category: 'popular',
    title: '📁 Обзор: Как работает автоматический подбор рекламных связок',
    desc: 'Интеллектуальное сопоставление каналов на основе тематических векторов.',
    content: `Наши разработчики настроили уникальный аналитический алгоритм "Smart-Match". Он оценивает семантические палитры всех каналов, зарегистрированных в ИИSMM, и предлагает вам лучшие рекламные коллаборации.

Вы больше не тратите время на ручные поиски пабликов для взаимопиара. Доверьте подбор нашему ИИ и растите охваты с легкостью!`,
    format: 'album',
    tag: 'СММ Оптимизация',
    readTime: '4 мин',
    date: '24 Апреля 2026',
    author: {
      name: 'Дмитрий Вектор',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      role: 'Архитектор ИИ'
    },
    views: 59300,
    likes: 4920,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' }
    ]
  },
  {
    id: 'popular-6',
    category: 'popular',
    title: '💰 Как выстроить стабильный поток клиентов из соцсетей с ROI более 400%',
    desc: 'Подробный разбор закупки рекламного трафика и сквозного трекинга вовлеченности через UTM-ярлыки.',
    content: `Простейший способ похоронить рекламный бюджет — запустить раскрутку без четких ссылок аналитики.

Наш модуль UTM-трекинга в ИИSMM автоматически маркирует каждую реферальную ссылку. Вы в реальном времени контролируете, какой пост, какой блогер и в какое время дал вам клиентов с окупаемостью (ROI) более 400%! Интегрируйте умные таблицы сквозного учета за один клик.`,
    format: 'photo',
    tag: 'Бизнес-Стратегия',
    readTime: '6 мин',
    date: '18 Апреля 2026',
    author: {
      name: 'Артур Давыдов',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      role: 'Трафик-Директор'
    },
    views: 74900,
    likes: 8700,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  },
  {
    id: 'popular-7',
    category: 'popular',
    title: '🛡️ Безопасная сделка: Что делать, если админ удалил оплаченный пост раньше срока',
    desc: 'Как работает наш автоматический бот-цербер и возвращает деньги на баланс рекламодателя.',
    content: `К сожалению, некоторые админы грешат удалением рекламных креативов через пару часов ради красивой ленты.

В ИИSMM за каждой сделкой приглядывает умный бот-цербер. Каждые 15 минут в фоновом режиме он проверяет наличие рекламного поста в канале-получателе. Если пост удален или видоизменен раньше оговоренного срока — система мгновенно замораживает выплату исполнителю и переводит всю компенсацию обратно рекламодателю!`,
    format: 'text',
    tag: 'Escrow Защита',
    readTime: '4 мин',
    date: '14 Апреля 2026',
    author: {
      name: 'Егор Орлов',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      role: 'Руководитель СБ'
    },
    views: 62450,
    likes: 5100
  },
  {
    id: 'popular-8',
    category: 'popular',
    title: '🎯 Топ-10 механик вовлечения холодной аудитории, о которых молчат SMM-гуру',
    desc: 'Игры в комментариях, интерактивные викторины, сторителлинг-цепочки и прочие скрытые уловки.',
    content: `Просто постить сухие статьи — путь к падению активности. Новейшие тренды 2026 года требуют ураганного вовлечения.

Наш ИИ-генератор предлагает 10 интерактивных игровых шаблонов под ключ. Сюда входят загадки с продолжением темы в следующем посте, вирусные опросы, ИИ-розыгрыши звезд прямо в Telegram. Вы получите всплеск активности в комментариях в первый же вечер после запуска!`,
    format: 'album',
    tag: 'Продвижение',
    readTime: '5 мин',
    date: '10 Апреля 2026',
    author: {
      name: 'Лиза Смирнова',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'SMM Креатор'
    },
    views: 81300,
    likes: 9500,
    album: [
      { type: 'photo', url: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&q=80' },
      { type: 'photo', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' }
    ]
  },
  {
    id: 'popular-9',
    category: 'popular',
    title: '🤖 Будущее контента: Как генеративные нейросети трансформируют медиарынок',
    desc: 'Почему копирайтеры без навыков работы с ИИ потеряют работу до конца текущего года?',
    content: `Рынок диктует жесткие правила. Те, кто пишут тексты по старинке вручную по 3 часа за абзац, больше не могут конкурировать со скоростью и многозадачностью ИИ-ассистентов.

В 2026 году эра "просто копирайтеров" окончательно уходит. На смену им приходят ИИ-редакторы, способные за 2 минуты выпустить серию красивых лонгридов в 5 пабликов сразу, увязав их точным ERID-токеном рекламы. Будьте в авангарде технологического роста вместе с софтом ИИSMM!`,
    format: 'photo',
    tag: 'ИИ Тренды',
    readTime: '6 мин',
    date: '06 Апреля 2026',
    author: {
      name: 'Профессор Ковалев',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      role: 'AI Исследователь'
    },
    views: 92800,
    likes: 11200,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80'
  },
  {
    id: 'popular-10',
    category: 'popular',
    title: '📈 Как запустить бренд-медиа с нуля до 100k читателей за 3 месяца',
    desc: 'Реальный кейс разработки и выкладки вирусного контента через систему планирования ИИSMM.',
    content: `Запустить собственное авторитетное медиа больше не требует миллионных вложений в редакторский состав.

Мы на собственном примере вырастили наш официальный портал ИИSMM до 100,000 лояльных читателей всего из одной умной контент-сетки воронки. Система автоматически анализирует вовлекающие инфоповоды, пишет экспертный каркас и публикует материалы в лучшие тайм-слоты активности целевой аудитории. Повторите этот успех для собственного бренда по нашей инструкции!`,
    format: 'video',
    tag: 'Кейсы брендов',
    readTime: '6 мин',
    date: '02 Апреля 2026',
    author: {
      name: 'Данил Марков',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Chief Editor'
    },
    views: 85200,
    likes: 9900,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-38392-large.mp4',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
  }
];

interface BlogSectionCarouselProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
  renderPostCover: (post: BlogPost) => React.ReactNode;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  statsLabel: (post: BlogPost) => string;
  btnLabel: string;
  rainbowTextStyle: React.CSSProperties;
}

function BlogSectionCarousel({
  posts,
  onPostClick,
  renderPostCover,
  badgeBg,
  badgeText,
  badgeBorder,
  statsLabel,
  btnLabel,
  rainbowTextStyle
}: BlogSectionCarouselProps) {
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
        setRadius(435); // Increased to push secondary cards further to the sides and prevent overlaps
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

    if (isPlaying && posts.length > 1) {
      const startTime = Date.now();
      intervalId = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
        setProgress(pct);
        
        if (pct >= 100) {
          setActiveIndex((prev) => (prev + 1) % posts.length);
          setProgress(0);
        }
      }, PROGRESS_STEP_MS);
    } else {
      setProgress(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, activeIndex, posts.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
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

  return (
    <div 
      className="relative w-full py-6 select-none overflow-visible flex flex-col items-center group/global3d cursor-grab active:cursor-grabbing"
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
      {/* Floating Left Chevron Navigation Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-1 sm:left-4 md:left-[10%] xl:left-[15%] top-[190px] z-40 w-11 h-11 rounded-full bg-white/95 border border-slate-200 text-slate-700 hover:text-pink-600 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer select-none"
        aria-label="Назад"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Floating Right Chevron Navigation Arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-1 sm:right-4 md:right-[10%] xl:right-[15%] top-[190px] z-40 w-11 h-11 rounded-full bg-white/95 border border-slate-200 text-slate-700 hover:text-pink-600 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer select-none"
        aria-label="Вперед"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 3D stage viewport wrapper */}
      <div 
        className="relative overflow-visible flex items-center justify-center w-[270px] sm:w-[310px] h-[415px]" 
        style={{ perspective: '1600px' }}
      >
        <div 
          className="absolute inset-0 transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(${-activeIndex * 36}deg)`,
            width: '100%',
            height: '100%',
          }}
        >
          {posts.map((post, idx) => {
            const isActive = idx === activeIndex;
            const angle = idx * 36;
            const diff = Math.min(
              Math.abs(idx - activeIndex),
              posts.length - Math.abs(idx - activeIndex)
            );

            // Configure scale, opacity, projection layer, and clicks
            let cardOpacity = 0;
            let scaleVal = 0.82;
            let pointerEventsStyle: 'auto' | 'none' = 'none';

            if (diff === 0) {
              cardOpacity = 1;
              scaleVal = 1.0;
              pointerEventsStyle = 'auto';
            } else if (diff === 1) {
              cardOpacity = isMobile ? 0.20 : 0.45;
              scaleVal = isMobile ? 0.64 : 0.86; // Scale down more on mobile to clear active card margins
              pointerEventsStyle = 'auto'; // allow edge click to slide to this card
            } else if (diff === 2) {
              cardOpacity = 0.08;
              scaleVal = 0.74;
            }

            const dragX = isActive ? dragOffset * 0.5 : 0;
            const dragRotate = isActive ? dragOffset * 0.02 : 0;
            const transitionStyle = (isActive && isDragging)
              ? 'opacity 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease'
              : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease';

            const handleCardClick = (e: React.MouseEvent) => {
              if (isActive) {
                onPostClick(post.id);
              } else if (diff === 1) {
                e.stopPropagation();
                setActiveIndex(idx);
              }
            };

              return (
                <div
                  key={post.id}
                  onClick={handleCardClick}
                  className={`absolute inset-0 w-full h-[400px] rounded-[24px] bg-white/95 border flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                    isActive 
                      ? 'border-pink-200/90 shadow-[0_16px_45px_rgba(236,72,153,0.14)] z-30' 
                      : 'border-slate-100 shadow-none z-10'
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${isActive ? radius : radius - 140}px) scale(${scaleVal}) translateX(${dragX}px) rotate(${dragRotate}deg)`,
                    backfaceVisibility: 'hidden',
                    opacity: cardOpacity,
                    visibility: diff > 1 ? 'hidden' : 'visible',
                    pointerEvents: pointerEventsStyle,
                    transition: transitionStyle,
                  }}
                >
                  {/* Visual Cover Header */}
                  <div className="relative">
                    {renderPostCover(post)}
                  </div>

                  {/* SMM Details Summary */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-2">
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
                        <span className={`px-2 py-0.5 ${badgeBg} ${badgeText} border ${badgeBorder} rounded-full text-[8.5px] font-black uppercase font-mono`}>
                          {post.tag}
                        </span>
                      )}
                    <h4 style={rainbowTextStyle} className="font-extrabold text-xs leading-snug uppercase line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed line-clamp-5">
                      {post.desc}
                    </p>
                  </div>
                </div>

                {/* Footnotes action footer */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between text-[9px] font-black text-slate-400 border-t border-slate-50 min-h-[48px] bg-slate-50/40">
                  <span className="font-mono">{statsLabel(post)}</span>
                  <span style={rainbowTextStyle} className="uppercase flex items-center gap-0.5 font-black">
                    {btnLabel} <ChevronRight className="w-3 h-3 text-pink-500" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sync navigation indicator dot rail */}
      <div className="flex justify-center items-center gap-1.5 mt-5 z-40 relative">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex 
                ? 'w-7 bg-gradient-to-r from-orange-400 to-pink-500 shadow-xs' 
                : 'w-2 bg-slate-200 hover:bg-slate-300'
            }`}
            aria-label={`Перейти к слайду ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function BlogPage({ currentPath, onNavigate, onLogin, isLoggedIn }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [detailPost, setDetailPost] = useState<BlogPost | null>(null);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState<{ [postId: string]: number }>({});
  const [isVideoPlaying, setIsVideoPlaying] = useState<{ [postId: string]: boolean }>({});
  
  const [commentsByPost, setCommentsByPost] = useState<{ [postId: string]: Array<{ name: string; avatar: string; role: string; date: string; text: string }> }>({
    '382910': [
      {
        name: 'Артём Маслов',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        role: 'SMM-Директор',
        date: 'Сегодня, 11:42',
        text: 'Потрясающий гайд! Платформа ИИSMM действительно экономит до 90% времени при автогенерации постов на неделю. Встроенный кросспостинг — это просто бомба! 🔥'
      },
      {
        name: 'София Миронова',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        role: 'Фрилансер-Копирайтер',
        date: 'Вчера, 18:15',
        text: 'Маркировка рекламы ОРД через ERID за один клик спасла от кучи головной боли. Спасибо разработчикам за такой невероятно полезный софт!'
      }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState<{ [postId: string]: boolean }>({});
  
  // Track dynamic post view links like /blog/id2128393
  useEffect(() => {
    const checkDetailRoute = () => {
      // Expecting /blog/id... or /blog/id-blog-1 etc.
      if (currentPath.startsWith('/blog/') && currentPath.length > 6) {
        const postId = currentPath.substring(6);
        const found = MOCK_BLOG_POSTS.find(p => p.id === postId);
        if (found) {
          setDetailPost(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setDetailPost(null);
        }
      } else {
        setDetailPost(null);
      }
    };

    checkDetailRoute();
  }, [currentPath]);

  const handleBackToMain = () => {
    onNavigate('/blog');
  };

  const navigateToPost = (postId: string) => {
    onNavigate(`/blog/${postId}`);
  };

  const toggleVideoPlay = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoPlaying(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handlePrevSlide = (postId: string, maxItems: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = activeAlbumIndex[postId] || 0;
    const prev = (current - 1 + maxItems) % maxItems;
    setActiveAlbumIndex(prevMap => ({
      ...prevMap,
      [postId]: prev
    }));
  };

  const handleNextSlide = (postId: string, maxItems: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = activeAlbumIndex[postId] || 0;
    const next = (current + 1) % maxItems;
    setActiveAlbumIndex(prevMap => ({
      ...prevMap,
      [postId]: next
    }));
  };

  const getFilteredResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return MOCK_BLOG_POSTS.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.desc.toLowerCase().includes(query) || 
      post.tag.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  };

  const filteredResults = getFilteredResults();
  const isSearching = searchQuery.trim().length > 0;

  const postOfDay = MOCK_BLOG_POSTS.find(p => p.category === 'day') || MOCK_BLOG_POSTS[0];
  const bloggerPosts = MOCK_BLOG_POSTS.filter(p => p.category === 'blogger');
  const newsPosts = MOCK_BLOG_POSTS.filter(p => p.category === 'news');
  const popularPosts = MOCK_BLOG_POSTS.filter(p => p.category === 'popular');

  const rainbowTextStyle = {
    background: 'linear-gradient(90deg, #38bdf8 0%, #ec4899 25%, #f97316 50%, #ec4899 75%, #38bdf8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  const rainbowButtonStyle = {
    background: 'linear-gradient(90deg, #38bdf8 0%, #ec4899 25%, #f97316 50%, #ec4899 75%, #38bdf8 100%)',
    boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.3)'
  };

  const renderPostCover = (post: BlogPost, isCompact: boolean = false, isFeatured: boolean = false) => {
    const albumIndex = activeAlbumIndex[post.id] || 0;
    const heightStyle = isFeatured ? "w-full h-full min-h-[220px] lg:min-h-[350px]" : "w-full h-36 sm:h-44";

    if (post.format === 'text') {
      return null;
    }

    const gradientOverlay = (
      <div 
        className={`absolute pointer-events-none z-10 select-none ${
          isFeatured 
            ? 'inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-white/10 to-white' 
            : 'bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/45 to-transparent'
        }`} 
      />
    );

    if (post.format === 'photo') {
      return (
        <div className={`${heightStyle} relative overflow-hidden bg-slate-100 border-b border-slate-100`}>
          <img 
            src={post.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'} 
            alt={post.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 text-[8px] uppercase font-black tracking-widest bg-white/90 text-slate-800 px-2 py-0.5 rounded-full z-10 font-mono font-bold">📸 Фото</div>
          {gradientOverlay}
        </div>
      );
    }

    if (post.format === 'video') {
      const isPlaying = isVideoPlaying[post.id];
      return (
        <div className={`${heightStyle} relative bg-slate-900 border-b border-slate-100 overflow-hidden group`}>
          {isPlaying ? (
            <video 
              src={post.videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={post.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80'} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          )}
          
          <div className="absolute top-2 right-2 text-[8px] uppercase font-black tracking-widest bg-white/90 text-slate-800 px-2 py-0.5 rounded-full z-10 font-mono font-bold">🎥 Видео</div>
          
          <button 
            type="button"
            onClick={(e) => toggleVideoPlay(post.id, e)}
            className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 hover:text-pink-500 transition-all flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 z-20 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          {gradientOverlay}
        </div>
      );
    }

    if (post.format === 'album') {
      const albumItems = post.album || [];
      const currentItem = albumItems[albumIndex] || { type: 'photo', url: '' };

      return (
        <div className={`${heightStyle} relative bg-transparent border-b border-slate-100/40 overflow-hidden group`}>
          {currentItem.type === 'video' ? (
            <video 
              src={currentItem.url} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={currentItem.url} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}

          <div className="absolute top-2 right-2 p-[1px] rounded-md bg-gradient-to-r from-sky-400 via-pink-500 via-orange-500 to-sky-400 z-10 shadow-xs">
            <div className="bg-white/90 backdrop-blur-md text-slate-800 px-2 py-0.5 rounded-[5px] text-[8px] font-black font-mono uppercase tracking-widest flex items-center gap-1">
              <span style={rainbowTextStyle}>🗂 Альбом {albumIndex + 1}/{albumItems.length}</span>
            </div>
          </div>

          {albumItems.length > 1 && (
            <>
              <button 
                type="button"
                onClick={(e) => handlePrevSlide(post.id, albumItems.length, e)}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 text-slate-800 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm z-20 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={(e) => handleNextSlide(post.id, albumItems.length, e)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/80 text-slate-800 hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm z-20 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
            {albumItems.map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1 h-1 rounded-full transition-all ${idx === albumIndex ? 'w-2 bg-pink-500' : 'bg-white/60'}`} 
              />
            ))}
          </div>
          {gradientOverlay}
        </div>
      );
    }

    return null;
  };

  return (
    <div id="iismm-blog-system" className="w-full max-w-7xl mx-auto px-1 sm:px-4 py-3 sm:py-6 relative z-10">
      
      <AnimatePresence mode="wait">
        
        {/* --- 1. POST DETAIL VIEW SCREEN --- */}
        {detailPost ? (
          <motion.div
            key="blog-detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-4 sm:p-8 shadow-xl max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

            {/* Back Button */}
            <button 
              onClick={handleBackToMain}
              className="inline-flex items-center gap-2 px-4 py-2 text-[10px] sm:text-xs font-black uppercase text-slate-700 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100 rounded-xl border border-slate-200/40 cursor-pointer active:scale-95 transition-all mb-6 group/back select-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-1 transition-transform" />
              Назад к публикациям
            </button>

            {/* Top Tag & Stats bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
              <span className="px-3 py-1 bg-gradient-to-r from-sky-400/15 via-pink-400/15 to-orange-400/15 text-slate-800 rounded-full text-[10px] font-black uppercase border border-pink-100">
                {detailPost.tag}
              </span>

              <div className="flex items-center gap-3.5 text-slate-400 text-xs font-mono">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {detailPost.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {(likedPosts[detailPost.id] ? detailPost.likes + 1 : detailPost.likes).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {detailPost.date}</span>
              </div>
            </div>

            {/* Title with the requested gradient */}
            <h1 className="text-xl sm:text-3.5xl font-black leading-tight tracking-tight uppercase" style={rainbowTextStyle}>
              {detailPost.title}
            </h1>

            {/* Brief Author Intro card */}
            <div className="flex items-center gap-3.5 bg-slate-50/70 border border-slate-150/40 p-3 sm:p-4 rounded-2xl mt-5 mb-6">
              <img src={detailPost.author.avatar} alt={detailPost.author.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-white shadow-sm" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{detailPost.author.name}</h4>
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-mono mt-0.5">{detailPost.author.role}</p>
              </div>
            </div>

            {/* Main Visual Frame */}
            {detailPost.format !== 'text' && (
              <div className={`w-full rounded-2xl mb-6 overflow-hidden relative max-h-[480px] ${detailPost.format === 'album' ? 'bg-transparent border-0' : 'border border-slate-150/50 bg-slate-900'}`}>
                
                {detailPost.format === 'photo' && (
                  <img 
                    src={detailPost.image} 
                    alt={detailPost.title} 
                    className="w-full max-h-[450px] object-cover mx-auto"
                    referrerPolicy="no-referrer"
                  />
                )}

                {detailPost.format === 'video' && (
                  <div className="w-full h-[320px] sm:h-[450px] relative bg-slate-950 flex items-center justify-center">
                    <video 
                      src={detailPost.videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      controls 
                      playsInline 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 text-[9px] uppercase font-black bg-black/60 px-2.5 py-1 rounded text-white font-mono tracking-wider">🎥 Превью Видео</div>
                  </div>
                )}

                {detailPost.format === 'album' && (
                  <div className="w-full h-[320px] sm:h-[420px] relative bg-transparent overflow-hidden group/album">
                    {(() => {
                      const albumIndex = activeAlbumIndex[detailPost.id] || 0;
                      const item = detailPost.album?.[albumIndex] || { type: 'photo', url: '' };
                      return (
                        <>
                          {item.type === 'video' ? (
                            <video 
                              src={item.url} 
                              autoPlay 
                              loop 
                              muted 
                              controls
                              playsInline 
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <img 
                              src={item.url} 
                              alt={detailPost.title} 
                              className="w-full h-full object-contain mx-auto"
                              referrerPolicy="no-referrer"
                            />
                          )}

                          <div className="absolute top-3 right-3 p-[1px] rounded-lg bg-gradient-to-r from-sky-400 via-pink-500 via-orange-500 to-sky-400 shadow-sm z-10">
                            <div className="bg-white/90 backdrop-blur-md text-slate-800 px-3 py-1.5 rounded-[7px] text-[10px] font-black font-mono uppercase tracking-widest flex items-center gap-1.5">
                              <span style={rainbowTextStyle}>🗂 Элемент {albumIndex + 1} из {detailPost.album?.length}</span>
                            </div>
                          </div>

                          {(detailPost.album?.length || 0) > 1 && (
                            <>
                              <button 
                                onClick={(e) => handlePrevSlide(detailPost.id, detailPost.album?.length || 0, e)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-slate-800 hover:text-pink-500 hover:scale-110 active:scale-90 flex items-center justify-center transition-all shadow-md z-20 cursor-pointer"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={(e) => handleNextSlide(detailPost.id, detailPost.album?.length || 0, e)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-slate-800 hover:text-pink-500 hover:scale-110 active:scale-90 flex items-center justify-center transition-all shadow-md z-20 cursor-pointer"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-white/50 px-3 py-1.5 rounded-full flex gap-1.5 z-10 shadow-xs">
                            {detailPost.album?.map((_, idx) => (
                              <span 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === albumIndex ? 'w-3.5 bg-pink-500' : 'bg-slate-400/65'}`} 
                              />
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* Post Description Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50/40 to-sky-50/40 border border-indigo-150/10 mb-6 italic text-slate-650 text-xs sm:text-sm font-medium leading-relaxed">
              <strong>Краткое ревью:</strong> {detailPost.desc}
            </div>

            {/* Dynamic Blog Content Rendering */}
            <div className="text-slate-750 text-xs sm:text-base leading-relaxed space-y-5 font-sans whitespace-pre-line border-t border-slate-100 pt-6">
              {detailPost.content}
            </div>

            {/* Bottom action trigger block */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-black text-slate-400 font-mono tracking-widest block leading-none">Оценка:</span>
                <button 
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert('Чтобы поставить лайк, пожалуйста, войдите в систему через Telegram.');
                      onLogin?.();
                      return;
                    }
                    setLikedPosts(prev => ({
                      ...prev,
                      [detailPost.id]: !prev[detailPost.id]
                    }));
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    likedPosts[detailPost.id] 
                      ? 'bg-pink-500 text-white border-pink-500 shadow-sm' 
                      : 'bg-pink-50/50 hover:bg-pink-100/70 border-pink-150 text-pink-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedPosts[detailPost.id] ? 'fill-current text-white' : 'text-pink-500 animate-pulse'}`} />
                  Мне нравится ({likedPosts[detailPost.id] ? detailPost.likes + 1 : detailPost.likes})
                </button>
              </div>

              <button 
                onClick={handleBackToMain}
                className="w-full sm:w-auto px-5 py-2.5 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-103 active:scale-97 transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
                style={rainbowButtonStyle}
              >
                <ArrowLeft className="w-4 h-4" />
                Назад к списку статей
              </button>
            </div>

            {/* --- COMMENT SECTION BLOCK --- */}
            <div className="border-t border-slate-100 pt-8 mt-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-indigo-50 pb-2">
                <MessageSquare className="w-4 h-4 text-pink-500 animate-bounce" />
                <h3 className="font-extrabold text-[11px] sm:text-xs text-slate-800 uppercase tracking-widest font-mono">
                  Обсуждение публикации ({(commentsByPost[detailPost.id] || []).length})
                </h3>
              </div>

              {/* Comments stream */}
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {(commentsByPost[detailPost.id] || []).length > 0 ? (
                  (commentsByPost[detailPost.id] || []).map((cmt, idx) => (
                    <div key={idx} className="bg-slate-50/60 border border-slate-150/40 p-4 rounded-2xl space-y-2 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={cmt.avatar} alt={cmt.name} className="w-8 h-8 rounded-full object-cover border border-white shadow-xs" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-extrabold text-slate-850 text-xs block leading-none">{cmt.name}</span>
                            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider font-mono block mt-1">{cmt.role}</span>
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono font-medium">{cmt.date}</span>
                      </div>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium pl-10">
                        {cmt.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-slate-50/30 border border-slate-150/30 rounded-2xl text-slate-400 text-xs italic">
                    Комментариев пока нет. Станьте первым, кто оставит свой экспертный отзыв! 🚀
                  </div>
                )}
              </div>

              {/* Comment submission form */}
              <div className="bg-slate-50/50 border border-slate-150/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 font-mono">Ваш комментарий:</label>
                    <textarea
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Напишите здесь ваше авторитетное мнение, кейс или вопрос автору гайда..."
                      rows={3}
                      className="w-full bg-white border border-slate-200/60 focus:border-pink-500 rounded-xl p-3 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-pink-400 transition-all shadow-inner"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (!newCommentText.trim()) return;
                          const userComment = {
                            name: 'Вы (Успешный Вебмастер)',
                            avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&auto=format&fit=crop&q=80',
                            role: 'Партнер ИИSMM',
                            date: 'Только что',
                            text: newCommentText.trim()
                          };
                          setCommentsByPost(prev => ({
                            ...prev,
                            [detailPost.id]: [...(prev[detailPost.id] || []), userComment]
                          }));
                          setNewCommentText('');
                        }}
                        className="px-5 py-2.5 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-103 active:scale-97 transition-all cursor-pointer shadow-md shadow-pink-500/10"
                        style={rainbowButtonStyle}
                      >
                        Опубликовать
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">✍️ ХОТИТЕ ОСТАВИТЬ ОТЗЫВ ИЛИ ЛАЙК?</h4>
                      <p className="text-[11px] text-slate-450 max-w-md mx-auto">
                        Комментирование и оценки доступны только авторизованным SMM-специалистам. Войдите через наш официальный Telegram AI-бот за одну секунду.
                      </p>
                    </div>
                    <button
                      onClick={onLogin}
                      className="inline-flex items-center gap-2 px-5 py-3 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md cursor-pointer href-link"
                      style={rainbowButtonStyle}
                    >
                      <User className="w-4 h-4 fill-current text-white/90" />
                      Авторизоваться через Telegram
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          
          /* --- 2. MAIN INDEX BLOG PORTAL --- */
          <motion.div
            key="blog-main-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-2xl mx-auto space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-sky-100 to-pink-100 rounded-full border border-pink-200/50">
                <BookOpen className="w-3.5 h-3.5 text-pink-500" />
                <span className="text-slate-800 text-[9px] font-black uppercase tracking-widest font-mono">
                  ПОЛНАЯ БАЗА ЗНАНИЙ
                </span>
              </div>
              
              <h1 className="text-2.5xl sm:text-4.5xl font-black uppercase leading-none tracking-tight" style={rainbowTextStyle}>
                НАШ БЛОГ SMM И ИИ
              </h1>
              
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                Свежие кейсы маркетологов, важные обновления экосистемы ИИSMM и легальные способы автоматизации маркировок рекламы.
              </p>
            </motion.div>

            {/* --- SECTION 1: ПОИСК ПО ПОСТАМ --- */}
            <motion.div 
              id="section-search-posts" 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-white/70 backdrop-blur-md rounded-xl border border-slate-150/45 p-2 sm:p-2.5 shadow-xs max-w-md mx-auto"
            >
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Поиск постов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50/95 hover:bg-slate-50 border border-slate-200/50 focus:border-pink-500 rounded-lg px-3 py-1.5 pl-9 text-xs text-slate-800 font-semibold focus:outline-hidden transition-all placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                
                {searchQuery.trim() && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-450 hover:text-slate-700 font-bold text-[10px] bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded transition-all cursor-pointer"
                  >
                    очистить
                  </button>
                )}
              </div>
              
              {isSearching && (
                <div className="flex items-center justify-end text-[10px] text-slate-450 mt-1.5 px-1 font-mono">
                  <span className="text-pink-600 font-bold">Найденных постов: {filteredResults.length}</span>
                </div>
              )}
            </motion.div>

            {/* SEARCH RESULTS CONDITIONAL GRID */}
            {isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-6"
              >
                <div className="flex items-center gap-2 border-b border-pink-100 pb-3">
                  <span className="p-1 px-2 bg-pink-500 text-white font-black text-[9px] uppercase rounded">ПОИСК</span>
                  <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Результаты поиска по запросу «{searchQuery}»</h3>
                </div>

                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredResults.map((post) => (
                      <div 
                        key={post.id}
                        onClick={() => navigateToPost(post.id)}
                        className="bg-white/70 hover:bg-white backdrop-blur rounded-2xl border border-white/60 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group hover:scale-[1.01]"
                      >
                        <div>
                          {renderPostCover(post)}
                          <div className="p-4 sm:p-5 space-y-2">
                            <span className="px-2 py-0.5 bg-slate-150 text-slate-650 rounded-full text-[8.5px] font-black uppercase font-mono">{post.tag}</span>
                            <h4 style={rainbowTextStyle} className="font-extrabold text-xs sm:text-sm leading-snug uppercase line-clamp-2">{post.title}</h4>
                            <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed line-clamp-5">{post.desc}</p>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 pt-0 flex items-center justify-between text-[9px] font-black text-slate-400 border-t border-slate-50 mt-3 pt-3">
                          <span className="font-mono">{post.readTime} чтение</span>
                          <span style={rainbowTextStyle} className="uppercase flex items-center gap-0.5 font-black">
                            Подробнее <ChevronRight className="w-3 h-3 text-pink-500 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white/40 border border-slate-200/40 rounded-3xl space-y-2 max-w-md mx-auto">
                    <span className="text-3xl block">🔍</span>
                    <h4 className="font-black text-slate-850 text-sm">Ничего не найдено</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">Попробуйте ввести другие ключевые слова, более близкие к тематике SMM или ИИ.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              
              /* SYSTEM STANDARD MULTI-SECTION VIEW COMPOSITION */
              <div className="space-y-16">
                
                {/* --- SECTION 2: ПОСТ ДНЯ (Large featured hero item) --- */}
                <motion.div 
                  id="section-post-of-the-day" 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-1.5 border-b border-indigo-100 pb-2">
                    <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                    <h2 style={rainbowTextStyle} className="font-black text-xs sm:text-sm uppercase tracking-widest leading-none">
                      Пост дня
                    </h2>
                  </div>

                  <div 
                    onClick={() => navigateToPost(postOfDay.id)}
                    className="bg-white/80 hover:bg-white border border-white/80 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-0 cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[350px]">
                      {renderPostCover(postOfDay, false, true)}
                    </div>

                    <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-4 relative col-span-1">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 bg-rose-50 border border-rose-100 text-rose-700 rounded-full text-[9px] font-black uppercase font-mono">
                            {postOfDay.tag}
                          </span>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider font-mono">
                            🔥 РЕКОМЕНДОВАНО
                          </span>
                        </div>

                        <h3 style={rainbowTextStyle} className="text-sm sm:text-xl font-black leading-snug uppercase line-clamp-3">
                          {postOfDay.title}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-5">
                          {postOfDay.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-3">
                        <div className="flex items-center gap-2">
                          <img src={postOfDay.author.avatar} alt={postOfDay.author.name} className="w-8 h-8 rounded-full object-cover border border-white shadow-sm" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-extrabold text-slate-800 text-[11px] block">{postOfDay.author.name}</span>
                            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-black font-mono block leading-none">{postOfDay.author.role}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider font-mono text-pink-650" style={rainbowTextStyle}>
                          <span>Подробнее</span>
                          <ChevronRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* --- SECTION 3: ПОСТЫ НАШИХ БЛОГЕРОВ (5 in a row horizontal/scroller) --- */}
                <motion.div 
                  id="section-blogger-posts" 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-pink-500" />
                      <h2 style={rainbowTextStyle} className="font-black text-xs sm:text-sm uppercase tracking-widest leading-none">
                        Посты наших blogеров
                      </h2>
                    </div>
                  </div>

                  <BlogSectionCarousel 
                    posts={bloggerPosts}
                    onPostClick={navigateToPost}
                    renderPostCover={renderPostCover}
                    badgeBg="bg-sky-50"
                    badgeText="text-sky-700"
                    badgeBorder="border-sky-100"
                    statsLabel={(p) => `${p.readTime} чнение`}
                    btnLabel="Подробнее"
                    rainbowTextStyle={rainbowTextStyle}
                  />
                </motion.div>

                {/* --- SECTION 4: НАШИ НОВОСТИ О ИИSMM (5 news articles about services) --- */}
                <motion.div 
                  id="section-iismm-news-posts" 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-pink-100 pb-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                      <h2 style={rainbowTextStyle} className="font-black text-xs sm:text-sm uppercase tracking-widest leading-none">
                        Наши новости о ИИSMM
                      </h2>
                    </div>
                  </div>

                  <BlogSectionCarousel 
                    posts={newsPosts}
                    onPostClick={navigateToPost}
                    renderPostCover={renderPostCover}
                    badgeBg="bg-orange-50"
                    badgeText="text-orange-700"
                    badgeBorder="border-orange-150/40"
                    statsLabel={(p) => `${p.readTime} чнение`}
                    btnLabel="Подробнее"
                    rainbowTextStyle={rainbowTextStyle}
                  />
                </motion.div>

                {/* --- SECTION 5: САМОЕ ПОПУЛЯРНОЕ (5 ultra-views posts) --- */}
                <motion.div 
                  id="section-popular-posts" 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-orange-100 pb-2">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500 animate-pulse animate-bounce" />
                      <h2 style={rainbowTextStyle} className="font-black text-xs sm:text-sm uppercase tracking-widest leading-none">
                        Самое популярное
                      </h2>
                    </div>
                  </div>

                  <BlogSectionCarousel 
                    posts={popularPosts}
                    onPostClick={navigateToPost}
                    renderPostCover={renderPostCover}
                    badgeBg="bg-purple-50"
                    badgeText="text-purple-700"
                    badgeBorder="border-purple-100"
                    statsLabel={(p) => `${p.views.toLocaleString()} просмотров`}
                    btnLabel="Подробнее"
                    rainbowTextStyle={rainbowTextStyle}
                  />
                </motion.div>

              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
