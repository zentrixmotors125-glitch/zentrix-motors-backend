/**
 * API utility with retry logic for 504 Gateway Timeout and 502 Bad Gateway errors.
 * Useful for handling cold starts on free-tier hosting like Render.
 */

interface RequestOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

export const apiFetch = async (endpoint: string, options: RequestOptions = {}): Promise<Response> => {
  const { retries = 3, retryDelay = 2000, ...fetchOptions } = options;
  const url = endpoint.startsWith('/') ? endpoint : `/api/${endpoint}`;

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);
      
      // Retry on 504 (Gateway Timeout) or 502 (Bad Gateway)
      if (response.status === 504 || response.status === 502) {
        if (attempt < retries) {
          console.warn(`Attempt ${attempt + 1} failed with ${response.status}. Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
      }
      
      return response;
    } catch (error: any) {
      lastError = error;
      if (attempt < retries) {
        console.warn(`Attempt ${attempt + 1} failed with error: ${error.message}. Retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${retries} retries`);
};

export const api = {
  get: async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const response = await apiFetch(endpoint, { ...options, method: 'GET' });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GET ${endpoint} failed: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  post: async <T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> => {
    const isFormData = data instanceof FormData;
    const response = await apiFetch(endpoint, {
      ...options,
      method: 'POST',
      headers: isFormData ? options?.headers : { 'Content-Type': 'application/json', ...options?.headers },
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`POST ${endpoint} failed: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  put: async <T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> => {
    const isFormData = data instanceof FormData;
    const response = await apiFetch(endpoint, {
      ...options,
      method: 'PUT',
      headers: isFormData ? options?.headers : { 'Content-Type': 'application/json', ...options?.headers },
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`PUT ${endpoint} failed: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  delete: async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const response = await apiFetch(endpoint, { ...options, method: 'DELETE' });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DELETE ${endpoint} failed: ${response.status} ${errorText}`);
    }
    return response.json();
  },
};
