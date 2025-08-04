// API Helper Functions
// This file provides helpers for making API calls through the Vite proxy

const API_BASE_URL = import.meta.env.DEV ? '' : 'http://localhost:3000';

// Generic API request helper
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API endpoint helpers using the proxy routes
export const api = {
  // General API calls (proxied through /api route)
  get: <T>(endpoint: string) => 
    apiRequest<T>(`/api${endpoint}`, { method: 'GET' }),
  
  post: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(`/api${endpoint}`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  
  put: <T>(endpoint: string, data?: any) =>
    apiRequest<T>(`/api${endpoint}`, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
  
  delete: <T>(endpoint: string) =>
    apiRequest<T>(`/api${endpoint}`, { method: 'DELETE' }),

  // Database operations (proxied through /db route)
  db: {
    query: <T>(query: string, params?: any[]) =>
      apiRequest<T>('/db/query', {
        method: 'POST',
        body: JSON.stringify({ query, params }),
      }),
    
    execute: (query: string, params?: any[]) =>
      apiRequest('/db/execute', {
        method: 'POST',
        body: JSON.stringify({ query, params }),
      }),
  },

  // Authentication operations (proxied through /auth route)
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    register: (userData: { email: string; password: string; name?: string }) =>
      apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    logout: () =>
      apiRequest('/auth/logout', { method: 'POST' }),
    
    refresh: () =>
      apiRequest('/auth/refresh', { method: 'POST' }),
  },
};

// Example usage functions for your Career Guidance Management System
export const cgmisApi = {
  // Student management
  students: {
    getAll: () => api.get('/students'),
    getById: (id: string) => api.get(`/students/${id}`),
    create: (student: any) => api.post('/students', student),
    update: (id: string, student: any) => api.put(`/students/${id}`, student),
    delete: (id: string) => api.delete(`/students/${id}`),
  },

  // Session management  
  sessions: {
    getAll: () => api.get('/sessions'),
    getByStudentId: (studentId: string) => api.get(`/sessions/student/${studentId}`),
    create: (session: any) => api.post('/sessions', session),
    update: (id: string, session: any) => api.put(`/sessions/${id}`, session),
    delete: (id: string) => api.delete(`/sessions/${id}`),
  },

  // Analytics
  analytics: {
    getDashboardData: () => api.get('/analytics/dashboard'),
    getStudentProgress: (studentId: string) => api.get(`/analytics/student/${studentId}`),
    getSessionStatistics: () => api.get('/analytics/sessions'),
  },
};