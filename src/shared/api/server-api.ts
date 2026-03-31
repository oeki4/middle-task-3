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
  const startTime = new Date().toISOString();
  const start = performance.now();

  console.log(`[Server Request] ${startTime} - Fetching: ${url}`);

  try {
    const response = await fetch(url, { ...options, headers });
    const endTime = new Date().toISOString();
    const duration = (performance.now() - start).toFixed(2);

    console.log(`[Server Response] ${endTime} - Completed (${duration}ms): ${url} - Status: ${response.status}`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Server Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const endTime = new Date().toISOString();
    console.error(`[Server API Error] ${endTime} - ${url}:`, error);
    throw error;
  }
};

