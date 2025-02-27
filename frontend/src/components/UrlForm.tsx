import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { createShortUrl } from '../services/urlService';

interface UrlFormProps {
  onUrlCreated: () => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onUrlCreated }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError('');
    
    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }
    
    // Create short URL
    setIsLoading(true);
    try {
      await createShortUrl(url);
      setUrl('');
      onUrlCreated();
    } catch (err) {
      setError('Failed to create short URL');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <Link2 className="h-8 w-8 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter a long URL to make it shorter
          </label>
          <div className="flex">
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              className="flex-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-r-md border border-transparent bg-blue-600 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UrlForm;