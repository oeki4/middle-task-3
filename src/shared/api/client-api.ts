// На клиенте используем только NEXT_PUBLIC_ переменные
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dummyjson.com';

/**
 * Клиентский инстанс для запросов (Client Components)
 */
export const clientApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    // 1. Дефолтные заголовки
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    // 3. Склеиваем URL
    const url = `${BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options, // Здесь можно передать кэширование, сигналы отмены и т.д.
            headers,
        });

        // 4. Глобальная обработка ошибок (например, на 401 можно выбросить логаут)
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Client Error: ${response.status}`);
        }

        // 5. Парсинг ответа
        return (await response.json()) as T;
    } catch (error) {
        console.error(`[Client API Error] ${url}:`, error);
        throw error;
    }
};
