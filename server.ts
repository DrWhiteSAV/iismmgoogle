import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ensure uploads folder exists in dist
const uploadsDir = path.join(process.cwd(), "dist", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded voice recorder files statically
app.use("/uploads", express.static(uploadsDir));

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

// Endpoint 3: Чат с ассистентом (AI Assistant Chat with custom prompt via ProTalk API with SSE Streaming support)
app.post("/api/ai/chat", async (req, res) => {
  const { prompt, history, systemInstruction } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Не передан запрос" });
  }

  const botId = process.env.PROTALK_BOT_ID || "66275";
  const botToken = process.env.PROTALK_BOT_TOKEN || "GaycdyJeSzd3Jja0E2S9jVTQiekUVkrE";
  const apiKey = `${botId}_${botToken}`;

  console.log(`Using ProTalk AI Assistant Chat with bot_id: ${botId}`);

  try {
    // Construct chat history messages for OpenAI style API
    const messages = [];
    if (systemInstruction) {
      messages.push({
        role: "system",
        content: systemInstruction
      });
    } else {
      messages.push({
        role: "system",
        content: "Ты — профессиональный ИИ-ассистент."
      });
    }

    // Additional reinforcement: Inject the assistant's specific instructions as user-assistant
    // conversation prefix to bypass ProTalk's automated "system" message filtering
    if (systemInstruction && prompt !== "/restart") {
      messages.push({
        role: "user",
        content: `[СИСТЕМНАЯ ИНСТРУКЦИЯ ДЛЯ ИИ - УСТАНОВКА РОЛИ]:\nДействуй строго по этой роли: ${systemInstruction}`
      });
      messages.push({
        role: "assistant",
        content: "Принято! Я полностью усвоил свою роль и буду отвечать в строгом соответствии с этой инструкцией."
      });
    }

    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Final prompt: for non-command requests, inline the role into the user prompt block
    let finalPrompt = prompt;
    if (prompt !== "/restart" && systemInstruction) {
      finalPrompt = `[Установка твоей роли: В рамках этого диалога ты — ${systemInstruction}]\n\nЗапрос пользователя: ${prompt}`;
    }

    messages.push({
      role: "user",
      content: finalPrompt
    });

    // Make the API call to ProTalk API with stream: true as requested
    const openAiResponse = await fetch("https://ai.pro-talk.ru/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "iismm_landing",
        messages: messages,
        temperature: 0.7,
        stream: true
      })
    });

    if (!openAiResponse.ok) {
      const errText = await openAiResponse.text();
      throw new Error(`ProTalk API Error (Status ${openAiResponse.status}): ${errText}`);
    }

    let accumulatedText = "";

    if (openAiResponse.body) {
      const reader = openAiResponse.body.getReader ? openAiResponse.body.getReader() : null;
      if (reader) {
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let buffer = "";

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            buffer += decoder.decode(value, { stream: !done });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              if (trimmed.startsWith("data: ")) {
                const dataContent = trimmed.substring(6).trim();
                if (dataContent === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(dataContent);
                  const deltaContent = parsed.choices?.[0]?.delta?.content;
                  if (deltaContent) {
                    accumulatedText += deltaContent;
                  }
                } catch (e) {
                  // Ignore JSON fragment parsing errors
                }
              }
            }
          }
        }

        // Parse trailing text if any
        if (buffer) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data: ")) {
            const dataContent = trimmed.substring(6).trim();
            if (dataContent !== "[DONE]") {
              try {
                const parsed = JSON.parse(dataContent);
                const deltaContent = parsed.choices?.[0]?.delta?.content;
                if (deltaContent) {
                  accumulatedText += deltaContent;
                }
              } catch (e) {}
            }
          }
        }
      } else {
        // Fallback for environment constraints where reader is unsupported
        const rawText = await openAiResponse.text();
        try {
          const parsed = JSON.parse(rawText);
          accumulatedText = parsed.choices?.[0]?.message?.content || "";
        } catch {
          const lines = rawText.split("\n");
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              const dataContent = trimmed.substring(6).trim();
              if (dataContent === "[DONE]") continue;
              try {
                const parsed = JSON.parse(dataContent);
                const deltaContent = parsed.choices?.[0]?.delta?.content;
                if (deltaContent) accumulatedText += deltaContent;
              } catch (e) {}
            }
          }
        }
      }
    }

    if (!accumulatedText.trim()) {
      // Direct backup request using stream: false in case stream chunk collection was altogether empty
      const directResponse = await fetch("https://ai.pro-talk.ru/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "iismm_landing",
          messages: messages,
          temperature: 0.7,
          stream: false
        })
      });
      if (directResponse.ok) {
        const directJson = await directResponse.json();
        accumulatedText = directJson.choices?.[0]?.message?.content || "";
      }
    }

    if (!accumulatedText.trim()) {
      throw new Error("Не удалось получить сгенерированный текст от ProTalk API.");
    }

    return res.json({
      text: accumulatedText
    });

  } catch (err: any) {
    console.error("ProTalk Chat error:", err);
    
    // Auto Graceful fallback to Gemini if ProTalk encounters error and Gemini is configured
    if (ai) {
      console.log("ProTalk failed, auto-falling back to Gemini model gracefully...");
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

        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: contents,
          config: {
            temperature: 0.7,
            systemInstruction: systemInstruction || "Ты — профессиональный ИИ-ассистент.",
          }
        });

        return res.json({
          text: fallbackResponse.text || "Извините, я не смог сформулировать ответ."
        });
      } catch (geminiErr: any) {
        console.error("Gemini fallback also failed:", geminiErr);
      }
    }

    res.status(500).json({ 
      error: `Ошибка при обращении к ИИ ProTalk: ${err.message || "Неизвестная ошибка"}` 
    });
  }
});

// Endpoint for saving base64 voice records as webm or wav static files
app.post("/api/ai/upload-voice", async (req, res) => {
  const { audioBase64, extension } = req.body;
  if (!audioBase64) {
    return res.status(400).json({ error: "Передан пустой аудиофайл (audioBase64 is required)" });
  }

  try {
    const filename = `voice_${Date.now()}.${extension || "webm"}`;
    const filePath = path.join(uploadsDir, filename);
    const buffer = Buffer.from(audioBase64, "base64");
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    console.log(`[ИИSMM] Аудиофайл успешно сохранён по ссылке: ${fileUrl}`);
    res.json({ url: fileUrl });
  } catch (err: any) {
    console.error("Ошибка при сохранении аудиофайла:", err);
    res.status(500).json({ error: `Не удалось сохранить голосовое сообщение: ${err.message}` });
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
