const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dummyjson.com';

/**
 * Серверный инстанс для запросов (Server Components / Server Actions)
 */
export const serverApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }


  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Server Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[Server API Error] ${url}:`, error);
    throw error;
  }
};
