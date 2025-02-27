import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUrlById } from '../services/urlService';
import { Link2 } from 'lucide-react';

const RedirectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  const fetchUrlAndRedirect = useCallback(async () => {
    if (!id) {
      navigate('/');
      return;
    }

    try {
      const urlEntry = await getUrlById(id);
      console.log('URL Entry:', urlEntry);
      
      if (!urlEntry) {
        setError('URL not found');
        return;
      }

      let isMounted = true;
      const timer = setInterval(() => {
        if (isMounted) {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              window.location.href = urlEntry.originalUrl;
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);

      return () => {
        isMounted = false;
        clearInterval(timer);
      };
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load URL');
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchUrlAndRedirect();
  }, [fetchUrlAndRedirect]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Link Not Found</h1>
          <p className="text-gray-600 mb-6">The short URL you're trying to access doesn't exist or has been removed.</p>
          <a href="/" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-blue-600 mb-4">
          <Link2 className="h-12 w-12 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Redirecting you</h1>
        <p className="text-gray-600 mb-6">You'll be redirected to your destination in {countdown} seconds...</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;