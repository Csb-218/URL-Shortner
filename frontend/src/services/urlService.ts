import { UrlEntry } from '../types';

const API_BASE_URL = "http://localhost:3000"; // Adjust this to your backend URL

// Load URLs from backend
export const loadUrls = async (): Promise<UrlEntry[]> => {
  const response = await fetch(`${API_BASE_URL}/api`);
  if (!response.ok) {
    throw new Error('Failed to load URLs');
  }
  return response.json();
};

// Create a new short URL
export const createShortUrl = async (originalUrl: string): Promise<UrlEntry> => {
  const response = await fetch(`${API_BASE_URL}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ originalUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to create short URL');
  }

  return response.json();
};

// Get URL by ID
export const getUrlById = async (id: string): Promise<UrlEntry | undefined> => {
  const response = await fetch(`${API_BASE_URL}/api/${id}`);
  console.log(import.meta.env.VITE_API_BASE_URL,API_BASE_URL,`${API_BASE_URL}/api/${id}`)
  if (!response.ok) {
    if (response.status === 404) {
      return undefined;
    }
    throw new Error('Failed to get URL');
  }
  return response.json();
};

// Increment click count
export const incrementClicks = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/${id}/clicks`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to increment clicks');
  }
};

// Delete URL
export const deleteUrl = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete URL');
  }
};