// ===============================
// МОДУЛЬ ПОДКЛЮЧЕНИЯ К TELEGRAM BOT API
// ===============================

// ВСТАВЬ СВОЙ ТОКЕН ТОЛЬКО СЮДА
export const BOT_TOKEN = "7777813297:AAEFmjdOg-cXTZrIgfX-VBf68_cygi3-PG0"; 

// Если не используешь сервер-прокси — оставь пустым
export const BACKEND_PROXY_URL = "";

async function callBot(method, params = {}) {
    if (!BOT_TOKEN || BOT_TOKEN.includes("ВСТАВЬ")) {
        console.warn("BOT_TOKEN не указан — используется демо режим.");
        return null;
    }

    // Прямая ссылка на Telegram API
    const directUrl = https://api.telegram.org/bot${BOT_TOKEN}/${method};

    // Если есть прокси — отправляем через него
    const url = BACKEND_PROXY_URL
        ? ${BACKEND_PROXY_URL}?url=${encodeURIComponent(directUrl)}
        : directUrl;

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
    });

    return res.json();
}

// ================================
// Публичные методы
// ================================

export async function sendMessage(chatId, text) {
    return callBot("sendMessage", { chat_id: chatId, text });
}

export async function getMe() {
    return callBot("getMe");
}

// Получение Telegram user ID из Mini App
export function getTelegramUserId() {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        return window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    return null;
}
