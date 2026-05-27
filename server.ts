import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client successfully initialized.");
  } catch (err) {
    console.error("Error setting up Gemini Client:", err);
  }
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. The app will run in demo fallback mode.");
}

// Global state / API metadata
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!API_KEY,
    time: new Date().toISOString()
  });
});

// Endpoint 1: ИИ Рерайт под авторский стиль (AI Rewrite style helper)
app.post("/api/ai/rewrite", async (req, res) => {
  const { content, styleUrlOrChannel, originalStyleDesc } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Не передан текст для рерайта" });
  }

  if (!ai) {
    // Elegant fallback simulation if API KEY is missing
    const words = content.split(" ");
    const shuffled = [...words].reverse().join(" ");
    const demoStyle = styleUrlOrChannel ? `в стиле канала ${styleUrlOrChannel}` : "в новом креативном ключе";
    return res.json({
      text: `[Режим ДЕМО | Добавьте API KEY] Отрерайченный пост ${demoStyle}:\n\n✨ ЭКСКЛЮЗИВ: Рерайт выполнен успешно!\n\n${shuffled}\n\n🤖 Подпишитесь, чтобы читать больше подобных анализов! #${styleUrlOrChannel ? styleUrlOrChannel.replace(/[^a-zA-Z]/g, '') : 'smm'}`,
      isDemo: true
    });
  }

  try {
    const prompt = `Пожалуйста, выступи в роли профессионального копирайтера и SMM-специалиста. 
Твоя задача — переписать (сделать глубокий рерайт) следующего поста, адаптировав его под стиль автора.

Сведения об авторском стиле (источник стиля): ${styleUrlOrChannel || "креативный, профессиональный, вовлекающий"}
Дополнительное описание стиля: ${originalStyleDesc || "добавь подходящие эмодзи, раздели на логические абзацы, сохрани смысловую пользу, но сделай чтение увлекательным"}

Оригинальный пост для адаптации:
"""
${content}
"""

Напиши только готовый адаптированный текст поста. Используй красивую разметку, абзацы и хэштеги.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.85,
        systemInstruction: "Ты — искусственный интеллект-копирайтер ИИSMM. Переписывай посты так, чтобы они выглядели экспертно, вовлекали читателей, имели четкую структуру с абзацами и не содержали воды."
      }
    });

    res.json({
      text: response.text || "Не удалось получить ответ от ИИ."
    });
  } catch (err: any) {
    console.error("Rewrite error:", err);
    res.status(500).json({ error: err.message || "Ошибка генерации на сервере" });
  }
});

// Endpoint 2: Автопостинг/генерация постов и поиск идей в интернете (Google Grounding)
app.post("/api/ai/generate", async (req, res) => {
  const { topic, platform, enableSearch, styleDesc } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Тема поста обязательна" });
  }

  if (!ai) {
    // Demonstration content if API key is not passed
    const currentDate = new Date().toLocaleDateString();
    return res.json({
      text: `[Режим ДЕМО | Добавьте API KEY] ИИ-Пост на тему "${topic}" для ${platform || "Telegram"}:\n\n🔥 Тренды в SMM на ${currentDate}!\n\nИнтеграция ИИ в ежедневные бизнес-процессы показывает прирост вовлеченности на 150%. Наш продукт ИИSMM объединяет кросспостинг во все популярные каналы (VK, Telegram, Instagram, X) и гарантирует качественное распределение контента.\n\n🌐 Полезный источник: https://google.com/search?q=${encodeURIComponent(topic)}\n\n📎 Читайте подробности по ссылке ниже!`,
      sources: [
        { title: `Поиск в Google: ${topic}`, uri: `https://google.com/search?q=${encodeURIComponent(topic)}` }
      ],
      isDemo: true
    });
  }

  try {
    const prompt = `Создай вовлекающий и полезный пост для платформы "${platform || 'Telegram'}" на тему: "${topic}".
Стиль написания: ${styleDesc || 'профессиональный, захватывающий, легкий для чтения'}.
Пост должен быть структурирован, содержать эмодзи, привлекать внимание с первой строки и оканчиваться призывом к действию или вопросом.

${enableSearch ? "Обязательно найди актуальную информацию в интернете по этой теме перед написанием, чтобы подкрепить текст реальными фактами." : ""}`;

    // Configure tools if search is requested
    const tools: any[] = [];
    if (enableSearch) {
      tools.push({ googleSearch: {} });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: tools.length > 0 ? tools : undefined,
        temperature: 0.75,
        systemInstruction: "Ты — контент-завод ИИSMM. Твоя цель — писать посты с безупречной логикой, завлекающим вступлением, полезной сутью и завершающими стильными интерактивными кнопками."
      }
    });

    // Extract search grounding chunks
    const sources: Array<{ title: string; uri: string }> = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      for (const chunk of groundingChunks) {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Справочный материал",
            uri: chunk.web.uri
          });
        }
      }
    }

    res.json({
      text: response.text || "Пост успешно пуст.",
      sources: sources
    });
  } catch (err: any) {
    console.error("Generator error:", err);
    res.status(500).json({ error: err.message || "Ошибка генерации на сервере" });
  }
});

// Endpoint 3: Чат с ассистентом (AI Assistant Chat with custom prompt)
app.post("/api/ai/chat", async (req, res) => {
  const { prompt, history, systemInstruction } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Не передан запрос" });
  }

  if (!ai) {
    const reply = `[Режим ДЕМО | Добавьте API KEY] Спасибо за вопрос: "${prompt}". Я готов помочь вам составить идеальный контент, сценарий или стратегию! Подключите ключ в настройках для запуска полноценного искусственного интеллекта.`;
    return res.json({ text: reply, isDemo: true });
  }

  try {
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }
    
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: contents,
      config: {
        temperature: 0.7,
        systemInstruction: systemInstruction || "Ты — профессиональный ИИ-ассистент.",
      }
    });

    res.json({
      text: response.text || "Извините, я не смог сформулировать ответ."
    });
  } catch (err: any) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message || "Ошибка чата на сервере" });
  }
});

// Configure Vite or Static production serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for local UI development.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production serving static files from /dist ready.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ИИSMM server is active & listening at http://localhost:${PORT}`);
  });
}

bootstrap();
