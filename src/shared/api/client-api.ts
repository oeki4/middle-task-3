import NProgress from 'nprogress';

// На клиенте используем только NEXT_PUBLIC_ переменные
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dummyjson.com';

// Настройка NProgress
NProgress.configure({ showSpinner: true });

// Счетчик активных запросов для корректного отображения лоадера
let activeRequests = 0;

const startProgress = () => {
    if (activeRequests === 0) {
        NProgress.start();
    }
    activeRequests++;
};

const stopProgress = () => {
    activeRequests--;
    if (activeRequests === 0) {
        NProgress.done();
    }
};

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
    const startTime = new Date().toISOString();
    const start = performance.now();

    console.log(`[Client Request] ${startTime} - Fetching: ${url}`);
    
    startProgress();

    try {
        const response = await fetch(url, {
            ...options, // Здесь можно передать кэширование, сигналы отмены и т.д.
            headers,
        });

        const endTime = new Date().toISOString();
        const duration = (performance.now() - start).toFixed(2);
        console.log(`[Client Response] ${endTime} - Completed (${duration}ms): ${url} - Status: ${response.status}`);

        // 4. Глобальная обработка ошибок (например, на 401 можно выбросить логаут)
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `Client Error: ${response.status}`);
        }

        // 5. Парсинг ответа
        return (await response.json()) as T;
    } catch (error) {
        const endTime = new Date().toISOString();
        console.error(`[Client API Error] ${endTime} - ${url}:`, error);
        throw error;
    } finally {
        stopProgress();
    }
};

