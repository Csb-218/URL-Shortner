import React, { useState } from 'react';
import { Clipboard, ExternalLink, Trash2 } from 'lucide-react';
import { UrlEntry } from '../types';
import { deleteUrl } from '../services/urlService';

interface UrlListProps {
  urls: UrlEntry[];
  onDelete: () => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onDelete }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (shortUrl: string, id: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      deleteUrl(id);
      onDelete();
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (urls.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
        <p className="text-center text-gray-500">No URLs have been shortened yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your shortened URLs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.map((url) => (
              <tr key={url.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">
                  <a 
                    href={url.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 flex items-center"
                  >
                    {url.originalUrl}
                    <ExternalLink className="h-4 w-4 ml-1 inline" />
                  </a>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a 
                    href={`s/${url.shortUrl.split('/').pop()}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.shortUrl.split('/').pop()}
                  </a>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(url.createdAt)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {url.clicks}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(url.shortUrl, url.id)}
                      className="text-gray-600 hover:text-blue-600"
                      title="Copy to clipboard"
                    >
                      <Clipboard className="h-5 w-5" />
                      {copiedId === url.id && (
                        <span className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-12 ml-[-20px]">
                          Copied!
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(url.id)}
                      className="text-gray-600 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;