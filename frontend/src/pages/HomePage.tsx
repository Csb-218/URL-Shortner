import React, { useState, useEffect } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { loadUrls } from '../services/urlService';
import { UrlEntry } from '../types';

const HomePage: React.FC = () => {
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('HomePage rendering')

  const loadUrlData = async () => {
    try {
      setLoading(true);
      const urlData = await loadUrls();
      setUrls(urlData.sort((a, b) => b.createdAt - a.createdAt));
      setError(null);
    } catch (err) {
      setError('Failed to load URLs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrlData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <UrlForm onUrlCreated={loadUrlData} />
      <UrlList urls={urls} onDelete={loadUrlData} />
    </div>
  );
};

export default HomePage;