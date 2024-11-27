// src/hooks/useApi.ts
import { useState, useEffect } from 'react';

// Define types for API response and error
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// The custom hook's return type (Generic to allow different response types)
export function useApi<T>(endpoint: string, options: RequestInit = {}): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve token from localStorage or other storage method
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', // Attach token if available
          ...options.headers, // Allow additional headers from the passed options
        };

        const response = await fetch(`${API_BASE}${endpoint}`, {
          ...options,
          headers,
        });

        if (!response.ok) throw new Error('Something went wrong');

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options, token]);

  return { data, loading, error };
}
